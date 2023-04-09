import { glMatrix, mat4, quat, vec3 } from 'gl-matrix';
import { v4 as uuid } from 'uuid';

import {
  createTexture,
  loadImage,
  RendererProxy,
  SceneProxy,
  SceneProxyOptions,
} from '../../engine/core';
import CameraProxy from '../../engine/math/CameraProxy';
import { createCube, meshToArray } from '../../engine/geo-primitive';
import ShaderBuilder from '../../engine/shader-factory/ShaderBuilder';
import ShaderProgramFactory from '../../engine/shader-factory/ShaderProgramFactory';
import { TransformProxy } from '../../engine/math';
import MaterialProxy from '../../engine/core/MaterialProxy';
import LightProxy from '../../engine/core/LightProxy';

const baseVertShader = {
  props: new ShaderBuilder()
    .withInputs({
      a_position: {
        type: 'vec4',
        location: 0,
      },
      a_uv: {
        type: 'vec2',
        location: 1,
      },
      a_normal: {
        type: 'vec3',
        location: 2,
      },
    })
    .withOutputs({
      v_position: {
        type: 'vec4',
      },
      v_uv: {
        type: 'vec2',
      },
      v_normal: {
        type: 'vec4',
      },
    })
    .withUniforms({
      u_worldMat: {
        type: 'mat4',
      },
      u_projectionMat: {
        type: 'mat4',
      },
      u_viewMat: {
        type: 'mat4',
      },
      u_normMat: {
        type: 'mat3',
      },
    })
    .withSources({
      path: '/shaders/baseLight.ejs.vs',
    })
    .withMain({
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
    .withHeaders(
      {
        path: '/shaders/structs/TexturedMaterial.ejs.glsl',
      },
      {
        path: '/shaders/structs/Light.ejs.glsl',
      }
    )
    .withInputs({
      v_position: {
        type: 'vec4',
      },
      v_uv: {
        type: 'vec2',
      },
      v_normal: {
        type: 'vec4',
      },
    })
    .withUniforms({
      u_material: {
        type: 'TexturedMaterial',
      },
      u_directionalLights: {
        type: 'Light[16]',
      },
      u_nbDirectionalLights: {
        type: 'int',
      },
      u_pointLights: {
        type: 'Light[16]',
      },
      u_nbPointLights: {
        type: 'int',
      },
      u_spotLights: {
        type: 'Light[16]',
      },
      u_nbSpotLights: {
        type: 'int',
      },
      u_viewPosition: {
        type: 'vec3',
      },
    })
    .withSources(
      {
        path: 'shaders/utils/baseLight.ejs.glsl',
      },
      {
        path: 'shaders/baseLightMaps.ejs.fs',
      }
    )
    .withMain({
      source: `
fragColor = exec();
`,
    })
    .build(),
  template: {
    path: '/shaders/base.ejs.fs',
  },
};

const lightVertShader = {
  props: new ShaderBuilder()
    .withInputs({
      a_position: {
        type: 'vec4',
        location: 0,
      },
    })
    .withUniforms({
      u_worldMat: {
        type: 'mat4',
      },
      u_projectionMat: {
        type: 'mat4',
      },
      u_viewMat: {
        type: 'mat4',
      },
    })
    .withMain({
      source: `
position = u_projectionMat * u_viewMat * u_worldMat * a_position;
`,
    })
    .build(),
  template: {
    path: '/shaders/base.ejs.vs',
  },
};

const lightFragShader = {
  props: new ShaderBuilder()
    .withUniforms({
      u_color: {
        type: 'vec3',
      },
    })
    .withMain({
      source: `
fragColor.rgb = u_color;
`,
    })
    .build(),
  template: {
    path: '/shaders/base.ejs.fs',
  },
};

const shaderFactory = new ShaderProgramFactory();
const vertexData = meshToArray(createCube({ size: 1 }), {
  layout: ['positions', 'uvs', 'normals'],
  interlaced: true,
});

export interface Mesh {
  programId: string;
  bufferObjectId: string;
  vertexArrayId: string;
}

const mesh: Mesh = {
  programId: uuid(),
  bufferObjectId: uuid(),
  vertexArrayId: uuid(),
};

const diffuseMapUrl = '/crate.png';
const specularMapUrl = '/crate_specular.png';

const material = new MaterialProxy({
  shininess: 32.0,
  ambient: [0.2, 0.2, 0.2],
  diffuse: [0.8, 0.8, 0.8],
  specular: [1.2, 1.2, 1.2],
});

const directionalLights = [
  new LightProxy({
    direction: vec3.set(vec3.create(), 0, 1, -1),
    color: vec3.set(vec3.create(), 0, 1, 0),
    attenuation: vec3.set(vec3.create(), 1, 0, 0),
    ambientStrength: 0.2,
  }),
];

const pointLights = [
  new LightProxy({
    position: vec3.set(vec3.create(), 10, 10, 10),
    color: vec3.set(vec3.create(), 0.7, 0, 0),
    attenuation: vec3.set(vec3.create(), 1, 0.014, 0.007),
    ambientStrength: 0.1,
  }),
  new LightProxy({
    position: vec3.set(vec3.create(), 10, -10, 10),
    color: vec3.set(vec3.create(), 0.7, 0, 0),
    attenuation: vec3.set(vec3.create(), 1, 0.014, 0.007),
    ambientStrength: 0.1,
  }),

  new LightProxy({
    position: vec3.set(vec3.create(), -10, 10, 10),
    color: vec3.set(vec3.create(), 0, 0.7, 0),
    attenuation: vec3.set(vec3.create(), 1, 0.014, 0.007),
    ambientStrength: 0.1,
  }),
  new LightProxy({
    position: vec3.set(vec3.create(), -10, -10, 10),
    color: vec3.set(vec3.create(), 0, 0.7, 0),
    attenuation: vec3.set(vec3.create(), 1, 0.014, 0.007),
    ambientStrength: 0.1,
  }),

  new LightProxy({
    position: vec3.set(vec3.create(), 10, 10, -10),
    color: vec3.set(vec3.create(), 0, 0, 0.7),
    attenuation: vec3.set(vec3.create(), 1, 0.014, 0.007),
    ambientStrength: 0.1,
  }),
  new LightProxy({
    position: vec3.set(vec3.create(), 10, -10, -10),
    color: vec3.set(vec3.create(), 0, 0, 0.7),
    attenuation: vec3.set(vec3.create(), 1, 0.014, 0.007),
    ambientStrength: 0.1,
  }),

  new LightProxy({
    position: vec3.set(vec3.create(), -10, 10, -10),
    color: vec3.set(vec3.create(), 0.7, 0.7, 0),
    attenuation: vec3.set(vec3.create(), 1, 0.014, 0.007),
    ambientStrength: 0.1,
  }),
  new LightProxy({
    position: vec3.set(vec3.create(), -10, -10, -10),
    color: vec3.set(vec3.create(), 0.7, 0.7, 0),
    attenuation: vec3.set(vec3.create(), 1, 0.014, 0.007),
    ambientStrength: 0.1,
  }),
];

const spotLights = [
  new LightProxy({
    position: vec3.set(vec3.create(), 0, 0, 5),
    direction: vec3.set(vec3.create(), 0, 0, -1),
    color: vec3.set(vec3.create(), 1, 1, 1),
    attenuation: vec3.set(vec3.create(), 1, 0.14, 0.07),
    cutOff: [
      Math.cos(glMatrix.toRadian(3)),
      Math.cos(glMatrix.toRadian(5)),
      1.0,
      1.0,
    ],
  }),
  new LightProxy({
    position: vec3.set(vec3.create(), 0, 5, 0),
    direction: vec3.set(vec3.create(), 0, -1, 0),
    color: vec3.set(vec3.create(), 1, 0, 0),
    attenuation: vec3.set(vec3.create(), 1, 0.014, 0.007),
    cutOff: [
      Math.cos(glMatrix.toRadian(3)),
      Math.cos(glMatrix.toRadian(5)),
      1.0,
      1.0,
    ],
    ambientStrength: 0.1,
  }),
];

const lightAngles = [0, 0];

export default class DemoScene extends SceneProxy {
  public transform: TransformProxy;
  private _camera: CameraProxy;

  constructor(renderer: RendererProxy, options: SceneProxyOptions) {
    super(renderer, options);
    this.transform = new TransformProxy();

    this._camera = new CameraProxy({
      type: 'perspective',
      surface: { width: 800, height: 600 },
      position: [0, 0, 1.5],
      target: [0, 0, 0],
      up: [0, 1, 0],
    });
  }

  get camera(): CameraProxy {
    return this._camera;
  }

  async init(): Promise<void> {
    const imageLoader = Promise.all([
      loadImage(diffuseMapUrl).then((image) => {
        material.diffuseMap = createTexture(this.renderer.gl, {
          image,
          inputFormat: this.renderer.gl.RGBA,
          inputType: this.renderer.gl.UNSIGNED_BYTE,
        });
      }),
      loadImage(specularMapUrl).then((image) => {
        material.specularMap = createTexture(this.renderer.gl, {
          image,
          inputFormat: this.renderer.gl.RGBA,
          inputType: this.renderer.gl.UNSIGNED_BYTE,
        });
      }),
    ]);

    console.log(
      await shaderFactory.produceShader(
        baseFragShader.props,
        baseFragShader.template
      )
    );

    this.programs.set(
      mesh.programId,
      await shaderFactory.produceProgram(this.renderer, {
        vertex: baseVertShader,
        fragment: baseFragShader,
        uniformLocations: [
          ['u_material.ambient', null],
          ['u_material.diffuse', null],
          ['u_material.specular', null],
          ['u_material.shininess', null],
        ],
      })
    );

    this.programs.set(
      'light',
      await shaderFactory.produceProgram(this.renderer, {
        vertex: lightVertShader,
        fragment: lightFragShader,
      })
    );

    this.bufferObjects.set(
      mesh.bufferObjectId,
      this.renderer.createBufferObject({
        data: vertexData,
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
          gl.enableVertexAttribArray(program.getAttribLocation('a_uv'));
          gl.enableVertexAttribArray(program.getAttribLocation('a_normal'));
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

          const type = gl.FLOAT;
          const normalize = false;
          const stride = 32;

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

          size = 3;
          offset = 20;
          gl.vertexAttribPointer(
            program.getAttribLocation('a_normal'),
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
      'light',
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

          const type = gl.FLOAT;
          const normalize = false;
          const stride = 32;

          const size = 3;
          const offset = 0;
          gl.vertexAttribPointer(
            program.getAttribLocation('a_position'),
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
    await imageLoader;
    this.state = 'running';
  }

  updateModelMatrix(): void {
    this.transform.update();
  }

  async resize(): Promise<void> {
    this.state = 'resizing';
    const { width, height } = this.renderer.gl.canvas;
    this._camera.surface = Object.assign({}, this._camera.surface, {
      width,
      height,
    });
    this.state = 'running';
  }

  async render(): Promise<void> {
    const vao = this.vertexArrayObjects.get(mesh.vertexArrayId);
    const program = this.programs.get(mesh.programId);

    if (!program || !vao) {
      return;
    }

    const gl = this.renderer.gl;
    program.use();
    gl.bindVertexArray(vao);

    const bindMatrices = () => {
      gl.uniformMatrix4fv(
        program.getUniformLocation('u_projectionMat'),
        false,
        this._camera.projectionMatrix
      );
      gl.uniformMatrix4fv(
        program.getUniformLocation('u_viewMat'),
        false,
        this._camera.viewMatrix
      );
      gl.uniformMatrix4fv(
        program.getUniformLocation('u_worldMat'),
        false,
        this.transform.localMatrix
      );
      gl.uniformMatrix3fv(
        program.getUniformLocation('u_normMat'),
        false,
        this.transform.normalMatrix
      );
    };

    const bindLights = () => {
      gl.uniform1i(
        program.getUniformLocation(`u_nbDirectionalLights`),
        directionalLights.length
      );
      gl.uniform1i(
        program.getUniformLocation(`u_nbPointLights`),
        pointLights.length
      );
      gl.uniform1i(
        program.getUniformLocation(`u_nbSpotLights`),
        spotLights.length
      );

      directionalLights.forEach((light, index) => {
        gl.uniform3fv(
          program.getUniformLocation(`u_directionalLights[${index}].direction`),
          light.direction.arr
        );

        gl.uniform4f(
          program.getUniformLocation(`u_directionalLights[${index}].ambient`),
          light.color.x,
          light.color.y,
          light.color.z,
          light.ambientStrength
        );

        gl.uniform3fv(
          program.getUniformLocation(`u_directionalLights[${index}].diffuse`),
          light.color.arr
        );

        gl.uniform3fv(
          program.getUniformLocation(`u_directionalLights[${index}].specular`),
          light.color.arr
        );

        gl.uniform3fv(
          program.getUniformLocation(
            `u_directionalLights[${index}].attenuation`
          ),
          light.attenuation.arr
        );
      });

      pointLights.forEach((light, index) => {
        gl.uniform3fv(
          program.getUniformLocation(`u_pointLights[${index}].position`),
          light.position.arr
        );
        gl.uniform3fv(
          program.getUniformLocation(`u_pointLights[${index}].direction`),
          light.direction.arr
        );

        gl.uniform4f(
          program.getUniformLocation(`u_pointLights[${index}].ambient`),
          light.color.x,
          light.color.y,
          light.color.z,
          light.ambientStrength
        );

        gl.uniform3fv(
          program.getUniformLocation(`u_pointLights[${index}].diffuse`),
          light.color.arr
        );

        gl.uniform3fv(
          program.getUniformLocation(`u_pointLights[${index}].specular`),
          light.color.arr
        );

        gl.uniform3fv(
          program.getUniformLocation(`u_pointLights[${index}].attenuation`),
          light.attenuation.arr
        );
      });
      spotLights.forEach((light, index) => {
        gl.uniform3fv(
          program.getUniformLocation(`u_spotLights[${index}].position`),
          light.position.arr
        );
        gl.uniform3fv(
          program.getUniformLocation(`u_spotLights[${index}].direction`),
          light.direction.arr
        );

        gl.uniform4f(
          program.getUniformLocation(`u_spotLights[${index}].ambient`),
          light.color.x,
          light.color.y,
          light.color.z,
          light.ambientStrength
        );

        gl.uniform3fv(
          program.getUniformLocation(`u_spotLights[${index}].diffuse`),
          light.color.arr
        );

        gl.uniform3fv(
          program.getUniformLocation(`u_spotLights[${index}].specular`),
          light.color.arr
        );

        gl.uniform3fv(
          program.getUniformLocation(`u_spotLights[${index}].attenuation`),
          light.attenuation.arr
        );

        gl.uniform4fv(
          program.getUniformLocation(`u_spotLights[${index}].cutOff`),
          light.cutOff.arr
        );
      });
    };

    const bindMaterial = () => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, material.diffuseMap);
      gl.uniform1i(program.getUniformLocation('u_material.diffuse'), 0);

      gl.activeTexture(gl.TEXTURE0 + 1);
      gl.bindTexture(gl.TEXTURE_2D, material.specularMap);
      gl.uniform1i(program.getUniformLocation('u_material.specular'), 1);
      gl.uniform1f(
        program.getUniformLocation('u_material.shininess'),
        material.shininess
      );
    };

    bindMatrices();
    bindLights();
    bindMaterial();

    gl.uniform3fv(
      program.getUniformLocation('u_viewPosition'),
      this.camera.positionVec
    );

    // draw
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 36;
    this.renderer.clear();
    gl.drawArrays(primitiveType, offset, count);

    this.renderLight();

    requestAnimationFrame(() => this.render());
  }

  renderLight() {
    const vao = this.vertexArrayObjects.get('light');
    const program = this.programs.get('light');

    if (!program || !vao) {
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
      program.getUniformLocation('u_viewMat'),
      false,
      this._camera.viewMatrix
    );

    [...spotLights, ...pointLights].forEach((light) => {
      gl.uniformMatrix4fv(
        program.getUniformLocation('u_worldMat'),
        false,
        mat4.fromRotationTranslationScale(
          mat4.create(),
          quat.identity(quat.create()),
          light.position.arr,
          [0.1, 0.1, 0.1]
        )
      );

      gl.uniform3fv(program.getUniformLocation('u_color'), light.color.arr);

      // draw
      const primitiveType = gl.TRIANGLES;
      const offset = 0;
      const count = 36;

      gl.drawArrays(primitiveType, offset, count);
    });

    /* lightAngles[0] += 1 / 180;
    lightAngles[1] += 1.3 / 180;
    const x = Math.sin(lightAngles[0]) * 5;
    const y = Math.sin(lightAngles[1]) * 3;
    const z = Math.cos(lightAngles[0]) * 5;

    light.position.x = x;
    light.position.y = y;
    light.position.z = z;*/
  }
}
