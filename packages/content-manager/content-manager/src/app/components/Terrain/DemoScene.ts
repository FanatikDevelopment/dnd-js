import { mat4 } from 'gl-matrix';
import { v4 as uuid } from 'uuid';

import {
  createTexture,
  loadImage,
  RendererProxy,
  SceneProxy,
  SceneProxyOptions,
  ShaderProgramProxy,
} from './engine/core';
import CameraProxy from './engine/core/CameraProxy';
import { createCube, meshToArray } from './engine/geo-primitive';

const vertShaderUrl = '/shaders/base.vs';
const fragShaderUrl = '/shaders/base.fs';

const textureUrl = '/dnd-js-logo.png';

const vertexData = meshToArray(createCube({ size: 1 }), {
  layout: ['positions', 'uvs'],
  interlaced: true,
});

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
    const vertShaderSrc = await fetch(vertShaderUrl).then((r) => r.text());
    const fragShaderSrc = await fetch(fragShaderUrl).then((r) => r.text());

    const image = await loadImage(textureUrl);

    this.programs.set(
      mesh.programId,
      new ShaderProgramProxy(this.renderer, {
        sources: [
          {
            type: 'vertex',
            source: vertShaderSrc,
          },
          {
            type: 'fragment',
            source: fragShaderSrc,
          },
        ],
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
    this.bufferObjects.set(
      mesh.bufferObjectId,
      this.renderer.createBufferObject({
        data: vertexData,
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
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

          // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
          const type = gl.FLOAT; // the data is 32bit floats
          const normalize = false; // don't normalize the data
          const stride = 20; // 0 = move forward size * sizeof(type) each iteration to get the next position

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

    this.renderer.clear();
  }

  async resize(): Promise<void> {
    this._camera.surface.width = this.renderer.gl.canvas.width;
    this._camera.surface.height = this.renderer.gl.canvas.height;
  }

  async render(): Promise<void> {
    const vao = this.vertexArrayObjects.get(mesh.vertexArrayId);
    const program = this.programs.get(mesh.programId);
    const texture = this.textures.get(mesh.textureId);
    if (!program || !vao || !texture) {
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
      this._camera.cameraMatrix
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

    // draw
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 36;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(() => this.render());
  }
}
