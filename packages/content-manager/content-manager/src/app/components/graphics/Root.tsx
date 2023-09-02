import { Paper } from '@mui/material';
import { quat } from 'gl-matrix';
import { useEffect, useRef, useState } from 'react';
import { RendererProxy, ShaderProgramProxy } from '@dnd-js/render-engine';
import { circleIndices, circleVertices } from '../../engine/geo-primitive';
import { tryGetRenderer } from '../../features/renderer.slice';
import { useRenderer } from '../../hooks/useRenderer';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import useScene from '../../hooks/useScene';
import useShaderFactory from '../../hooks/useShaderFactory';
import { BaseFragShader, BaseVertShader } from './shaders';

export type VertexAttributeName = 'position' | 'uv' | 'normal' | 'color';

export type MeshAttribute = {
  name: VertexAttributeName;
  size: number;
  type: number;
  normalize: boolean;
};

export interface MeshHeader {
  type: 'faces' | 'lines' | 'points';
  attributes: MeshAttribute[];
  vertexCount: number;
  interlaced: boolean;
  indexed: boolean;
}

export class Mesh {
  public vbo: WebGLBuffer | null;

  public ibo: WebGLBuffer | null;

  public vao: WebGLVertexArrayObject | null;

  constructor(
    public header: MeshHeader,
    public data: Float32Array,
    public indices?: Uint16Array
  ) {
    this.vbo = null;
    this.ibo = null;
    this.vao = null;
  }

  init({
    renderer,
    program,
  }: {
    renderer: RendererProxy;
    program: ShaderProgramProxy;
  }) {
    this.vbo = this.createAttributeBuffer(renderer);
    this.ibo = this.createIndexBuffer(renderer);
    this.vao = this.createVertexArray({ renderer, program });
  }

  createAttributeBuffer(renderer: RendererProxy): WebGLBuffer {
    return renderer.createBufferObject({
      data: this.data,
      target: renderer.gl.ARRAY_BUFFER,
    });
  }

  createIndexBuffer(renderer: RendererProxy): WebGLBuffer | null {
    if (!this.indices) {
      return null;
    }

    return renderer.createBufferObject({
      data: this.indices,
      target: renderer.gl.ELEMENT_ARRAY_BUFFER,
    });
  }

  createVertexArray({
    renderer,
    program,
  }: {
    renderer: RendererProxy;
    program: ShaderProgramProxy;
  }): WebGLVertexArrayObject {
    return renderer.createVertexArrayObject({
      init: (_, vao) => {
        const vertexBuffer = this.createAttributeBuffer(renderer);
        const indexBuffer = this.createIndexBuffer(renderer);

        const gl = renderer.gl;

        gl.bindVertexArray(vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        if (this.header.indexed) {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        }

        const stride = !this.header.interlaced
          ? 0
          : this.header.attributes.reduce(
              (result, current) => result + current.size,
              0
            ) * 4;
        let offset = 0;
        this.header.attributes.forEach(({ name, type, size, normalize }) => {
          const formattedName = `a_${name}`;
          gl.enableVertexAttribArray(program.getAttribLocation(formattedName));
          gl.vertexAttribPointer(
            program.getAttribLocation(formattedName),
            size,
            type,
            normalize,
            stride,
            offset
          );

          offset += !this.header.interlaced
            ? size * this.header.vertexCount * 4
            : size * 4;
        });

        gl.bindVertexArray(null);
      },
    });
  }

  draw(renderer: RendererProxy, modes: MeshHeader['type'][]) {
    const gl = renderer.gl;
    gl.bindVertexArray(this.vao);

    const drawImpl = (mode: MeshHeader['type']) => {
      let primitiveType = gl.POINTS;
      if (mode === 'faces') {
        if (this.header.type === 'faces') {
          primitiveType = gl.TRIANGLES;
        } else if (this.header.type === 'lines') {
          primitiveType = gl.LINES;
        }
      }

      if (mode === 'lines') {
        if (this.header.type === 'faces') {
          primitiveType = gl.LINE_LOOP;
        } else if (this.header.type === 'lines') {
          primitiveType = gl.LINES;
        }
      }

      if (!this.header.indexed) {
        gl.drawArrays(primitiveType, 0, this.header.vertexCount);
      } else {
        gl.drawElements(
          primitiveType,
          this.indices!.length,
          gl.UNSIGNED_SHORT,
          0
        );
      }
    };

    (['faces', 'lines', 'points'] as const)
      .filter((current) => modes.includes(current))
      .forEach((current) => drawImpl(current));
  }
}

export default function Root() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const meshRef = useRef<Mesh | null>(null);

  const { width, height } = useResizeObserver({ elm: canvasRef });
  const { renderer } = useRenderer({ elm: canvasRef });
  const { camera, transform } = useScene();
  const { shaderFactory, createShaderProgram } = useShaderFactory({ renderer });
  const [program, setProgram] = useState<ShaderProgramProxy | null>(null);

  const resizeCanvas = () => {
    const renderer = tryGetRenderer('editor');
    if (!renderer) {
      return;
    }

    const { x, y } = camera.surface;
    renderer.canvas.width = width;
    renderer.canvas.height = height;
    renderer.resizeViewport({ width, height });
    camera.surface = {
      x,
      y,
      width,
      height,
    };
  };

  const setShaderUp = () => {
    createShaderProgram({
      name: 'test',
      vertex: {
        props: BaseVertShader.builder.build(),
        template: BaseVertShader.template,
      },
      fragment: {
        props: BaseFragShader.builder.build(),
        template: BaseFragShader.template,
      },
    }).then((prog) => setProgram(prog));
  };

  const setMeshUp = () => {
    if (!renderer) {
      return;
    }

    quat.rotateX(
      transform.orientationQuat,
      transform.orientationQuat,
      Math.PI / 2
    );

    const pts = circleVertices(5);
    const indices = circleIndices(5);

    const mesh = new Mesh(
      {
        attributes: [
          {
            name: 'position',
            normalize: false,
            size: 3,
            type: renderer.gl.FLOAT,
          },
          {
            name: 'color',
            normalize: false,
            size: 3,
            type: renderer.gl.FLOAT,
          },
        ],
        indexed: true,
        interlaced: true,
        type: 'faces',
        vertexCount: 6,
      },
      new Float32Array(pts.map((v) => [...v, 0.7, 0.7, 0]).flat()),
      new Uint16Array(indices)
    );
    meshRef.current = mesh;
  };

  useEffect(resizeCanvas, [width, height]);
  useEffect(setShaderUp, [program, createShaderProgram]);
  useEffect(setMeshUp, [renderer]);

  useEffect(() => {
    if (!renderer || !program || !meshRef.current) {
      return;
    }

    meshRef.current.init({ renderer, program });

    const render = () => {
      if (!renderer || !program) {
        return;
      }

      const gl = renderer.gl;
      program.use();

      const bindMatrices = () => {
        gl.uniformMatrix4fv(
          program.getUniformLocation('u_projectionMat'),
          false,
          camera.projectionMatrix
        );
        gl.uniformMatrix4fv(
          program.getUniformLocation('u_viewMat'),
          false,
          camera.viewMatrix
        );
        gl.uniform3f(program.getUniformLocation('u_color'), 0.7, 0.7, 0.7);
        gl.uniform1f(program.getUniformLocation('u_colorFactor'), 0);
        gl.uniformMatrix4fv(
          program.getUniformLocation('u_worldMat'),
          false,
          transform.localMatrix
        );
      };

      bindMatrices();

      // draw
      renderer.clear();
      meshRef.current?.draw(renderer, ['faces']);

      gl.uniform3f(program.getUniformLocation('u_color'), 1, 1, 0);
      gl.uniform1f(program.getUniformLocation('u_colorFactor'), 0);
      meshRef.current?.draw(renderer, ['lines']);

      gl.uniform3f(program.getUniformLocation('u_color'), 1, 0, 0);
      gl.uniform1f(program.getUniformLocation('u_colorFactor'), 0);
      meshRef.current?.draw(renderer, ['points']);
    };

    render();
  }, [renderer, program, meshRef]);

  return (
    <Paper
      sx={{
        position: 'absolute',
        inset: 0,
        borderRadius: 0,
        overflow: 'clip',
      }}
    >
      <canvas
        style={{ width: '100%', height: '100%' }}
        ref={canvasRef}
      ></canvas>
    </Paper>
  );
}
