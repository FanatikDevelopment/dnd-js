import { mat4 } from 'gl-matrix';
import { v4 as uuid } from 'uuid';

import {
  createBufferObject,
  createTexture,
  loadImage,
  RendererProxy,
  SceneProxy,
  SceneProxyOptions,
  ShaderProgramProxy,
} from '../../engine/core';
import CameraProxy from '../../engine/core/CameraProxy';
import ShaderBuilder from '../../engine/core/ShaderFactory';
import { createCube, meshToArray } from '../../engine/geo-primitive';
import ShaderProgramFactory from '../../engine/shader-factory/ShaderProgramFactory';

// Define several convolution kernels
const kernels = {
  normal: new Float32Array([0, 0, 0, 0, 1, 0, 0, 0, 0]),
  gaussianBlur: new Float32Array([
    0.045, 0.122, 0.045, 0.122, 0.332, 0.122, 0.045, 0.122, 0.045,
  ]),
  unsharpen: new Float32Array([-1, -1, -1, -1, 9, -1, -1, -1, -1]),
  emboss: new Float32Array([-2, -1, 0, -1, 1, 1, 0, 1, 2]),
};

function computeKernelWeight(kernel: Float32Array) {
  const weight = kernel.reduce(function (prev, curr) {
    return prev + curr;
  });
  return weight <= 0 ? 1 : weight;
}

const textureUrl = '/dnd-js-logo.png';

const vertexShaderFactory = new ShaderBuilder();
const fragmentShaderFactory = new ShaderBuilder();

const baseVertShader = {
  props: new ShaderBuilder()
    .withHeaders({
      path: '/shaders/example3d1.ejs.vs',
    })
    .withSources({
      source: `
position = exec();
`,
    })
    .build(),
  template: {
    path: '/shaders/base.ejs.vs',
  },
};

const baseFragShader = {
  props: new ShaderBuilder()
    .withHeaders({
      path: '/shaders/example3d1.ejs.fs',
    })
    .withSources({
      source: `
fragColor = exec();
`,
    })
    .build(),
  template: {
    path: '/shaders/base.ejs.fs',
  },
};

const blurVertShader = {
  props: new ShaderBuilder()
    .withInputs({
      a_position: { type: 'vec4' },
      a_uv: { type: 'vec2' },
    })
    .withOutputs({
      v_uv: { type: 'vec2' },
    })
    .withSources({
      source: `
v_uv = a_uv;
position = a_position;
`,
    })
    .build(),
  template: {
    path: '/shaders/base.ejs.vs',
  },
};
const blurFragShader = {
  props: new ShaderBuilder()
    .withInputs({ v_uv: { type: 'vec2' } })
    .withUniforms({
      u_texture: {
        type: 'sampler2D',
      },
      u_kernel: {
        type: 'float',
        dimensions: [9],
      },
      u_kernelWeight: {
        type: 'float',
      },
    })
    .withHeaders({ path: '/shaders/utils/applyKernel.ejs.glsl' })
    .withSources({
      source: `
fragColor = applyKernel(v_uv, u_texture, u_kernel, u_kernelWeight);
`,
    })
    .build(),
  template: {
    path: '/shaders/base.ejs.fs',
  },
};

const shaderFactory = new ShaderProgramFactory();

const vertexData = meshToArray(createCube({ size: 1 }), {
  layout: ['positions', 'uvs'],
  interlaced: true,
});

let postProcessFbo: WebGLFramebuffer | null = null;
const postProcessTexId = uuid();

let postProcessTex: WebGLTexture | null;

const postProcessBoId = uuid();
const postProcessVaoId = uuid();

const blurProgramId = uuid();

export interface Mesh {
  programId: string;
  bufferObjectId: string;
  vertexArrayId: string;
  textureId: string;
}

const mesh: Mesh = {
  programId: uuid(),
  bufferObjectId: uuid(),
  vertexArrayId: uuid(),
  textureId: uuid(),
};

export default class DemoScene extends SceneProxy {
  private modelMatrix = mat4.create();
  private _camera: CameraProxy;

  constructor(renderer: RendererProxy, options: SceneProxyOptions) {
    super(renderer, options);

    this._camera = new CameraProxy({
      type: 'perspective',
      surface: { width: 800, height: 600 },
      position: [0, 0, 10],
      target: [0, 0, 0],
      up: [0, 1, 0],
    });
  }

  async init(): Promise<void> {
    const image = await loadImage(textureUrl);

    this.programs.set(
      mesh.programId,
      await shaderFactory.produceProgram(this.renderer, {
        vertex: baseVertShader,
        fragment: baseFragShader,
        attributeLocations: [
          ['a_position', -1],
          ['a_uv', -1],
        ],
        uniformLocations: [
          ['u_projectionMat', null],
          ['u_cameraMat', null],
          ['u_modelMat', null],
          ['u_texture', null],
          ['u_baseColor', null],
        ],
      })
    );

    vertexShaderFactory.reset();
    fragmentShaderFactory.reset();

    this.programs.set(
      blurProgramId,
      await shaderFactory.produceProgram(this.renderer, {
        vertex: blurVertShader,
        fragment: blurFragShader,
        attributeLocations: [
          ['a_position', -1],
          ['a_uv', -1],
        ],
        uniformLocations: [
          ['u_texture', null],
          ['u_kernel', null],
          ['u_kernelWeight', null],
        ],
      })
    );

    this.bufferObjects.set(
      mesh.bufferObjectId,
      this.renderer.createBufferObject({
        data: vertexData,
      })
    );

    this.bufferObjects.set(
      postProcessBoId,
      createBufferObject(this.renderer.gl, {
        data: new Float32Array([
          // 0
          -1, -1, 0, 0,
          // 1
          1, -1, 1, 0,
          // 2
          -1, 1, 0, 1,
          // 2
          -1, 1, 0, 1,
          // 1
          1, -1, 1, 0,
          // 3
          1, 1, 1, 1,
        ]),
      })
    );

    this.textures.set(
      mesh.textureId,
      createTexture(this.renderer.gl, {
        image,
        inputFormat: this.renderer.gl.RGBA,
        inputType: this.renderer.gl.UNSIGNED_BYTE,
      })
    );

    postProcessTex = createTexture(this.renderer.gl, {
      width: this.renderer.gl.canvas.width,
      height: this.renderer.gl.canvas.height,
      inputFormat: this.renderer.gl.RGBA,
      inputType: this.renderer.gl.UNSIGNED_BYTE,
    });

    postProcessFbo = this.renderer.gl.createFramebuffer();
    if (!postProcessFbo) {
      throw new Error(`Cannot create FrameBuffer: Creation failure`);
    }

    this.renderer.gl.bindFramebuffer(
      this.renderer.gl.FRAMEBUFFER,
      postProcessFbo
    );

    const attachmentPoint = this.renderer.gl.COLOR_ATTACHMENT0;
    this.renderer.gl.framebufferTexture2D(
      this.renderer.gl.FRAMEBUFFER,
      attachmentPoint,
      this.renderer.gl.TEXTURE_2D,
      postProcessTex,
      0
    );

    this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, null);
    this.textures.set(postProcessTexId, postProcessTex);

    this.vertexArrayObjects.set(
      mesh.vertexArrayId,
      this.renderer.createVertexArrayObject({
        init: (renderer: RendererProxy, vao: WebGLVertexArrayObject) => {
          const program = this.programs.get(mesh.programId);
          const vertexBuffer = this.bufferObjects.get(mesh.bufferObjectId);

          if (!program || !vertexBuffer) {
            return;
          }

          const gl = renderer.gl;

          gl.bindVertexArray(vao);
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

          gl.enableVertexAttribArray(program.getAttribLocation('a_position'));
          gl.enableVertexAttribArray(program.getAttribLocation('a_uv'));
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

          const type = gl.FLOAT;
          const normalize = false;
          const stride = 20;

          let size = 3;
          let offset = 0;
          gl.vertexAttribPointer(
            program.getAttribLocation('a_position'),
            size,
            type,
            normalize,
            stride,
            offset
          );

          size = 2;
          offset = 12;
          gl.vertexAttribPointer(
            program.getAttribLocation('a_uv'),
            size,
            type,
            normalize,
            stride,
            offset
          );
          gl.bindVertexArray(null);
        },
      })
    );

    this.vertexArrayObjects.set(
      postProcessVaoId,
      this.renderer.createVertexArrayObject({
        init: (renderer: RendererProxy, vao: WebGLVertexArrayObject) => {
          const program = this.programs.get(blurProgramId);
          const vertexBuffer = this.bufferObjects.get(postProcessBoId);

          if (!program || !vertexBuffer) {
            return;
          }

          const gl = renderer.gl;

          gl.bindVertexArray(vao);
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

          gl.enableVertexAttribArray(program.getAttribLocation('a_position'));
          gl.enableVertexAttribArray(program.getAttribLocation('a_uv'));
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

          const type = gl.FLOAT;
          const normalize = false;
          const stride = 16;

          const size = 2;
          let offset = 0;
          gl.vertexAttribPointer(
            program.getAttribLocation('a_position'),
            size,
            type,
            normalize,
            stride,
            offset
          );

          offset = 8;
          gl.vertexAttribPointer(
            program.getAttribLocation('a_uv'),
            size,
            type,
            normalize,
            stride,
            offset
          );
          gl.bindVertexArray(null);
        },
      })
    );

    this.renderer.clear();
  }

  async resize(): Promise<void> {
    const { width, height } = this.renderer.gl.canvas;
    this._camera.surface = Object.assign({}, this._camera.surface, {
      width,
      height,
    });
  }

  async render(): Promise<void> {
    const vao = this.vertexArrayObjects.get(mesh.vertexArrayId);
    const ppVao = this.vertexArrayObjects.get(postProcessVaoId);
    const program = this.programs.get(mesh.programId);
    const blurProgram = this.programs.get(blurProgramId);
    const texture = this.textures.get(mesh.textureId);
    const postProcessTex = this.textures.get(postProcessTexId);
    if (
      !program ||
      !vao ||
      !ppVao ||
      !texture ||
      !blurProgram ||
      !postProcessTex
    ) {
      return;
    }

    const gl = this.renderer.gl;
    program.use();
    gl.bindVertexArray(vao);

    gl.uniformMatrix4fv(
      program.getUniformLocation('u_projectionMat'),
      false,
      this._camera.projectionMatrix
    );
    gl.uniformMatrix4fv(
      program.getUniformLocation('u_cameraMat'),
      false,
      this._camera.viewMatrix
    );
    gl.uniformMatrix4fv(
      program.getUniformLocation('u_modelMat'),
      false,
      this.modelMatrix
    );

    gl.uniform4f(program.getUniformLocation('u_baseColor'), 1, 0, 0, 1);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(program.getUniformLocation('u_texture'), 0);

    this.renderer.gl.bindFramebuffer(
      this.renderer.gl.FRAMEBUFFER,
      postProcessFbo
    );

    // draw
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 36;
    this.renderer.clear();
    gl.drawArrays(primitiveType, offset, count);

    blurProgram.use();
    gl.bindVertexArray(ppVao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, postProcessTex);
    gl.uniform1i(blurProgram.getUniformLocation('u_texture'), 0);
    gl.uniform1fv(
      blurProgram.getUniformLocation('u_kernel'),
      kernels.gaussianBlur
    );
    gl.uniform1f(
      blurProgram.getUniformLocation('u_kernelWeight'),
      computeKernelWeight(kernels.gaussianBlur)
    );

    this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, null);

    this.renderer.clear();
    gl.drawArrays(primitiveType, 0, 6);

    requestAnimationFrame(() => this.render());
  }
}
