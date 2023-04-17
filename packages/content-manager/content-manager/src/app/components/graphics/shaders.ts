import ShaderBuilder from '../../engine/shader-factory/ShaderBuilder';
import ShaderProgramFactory from '../../engine/shader-factory/ShaderProgramFactory';

export const BaseVertShader = {
  builder: new ShaderBuilder()
    .withInputs({
      a_position: {
        type: 'vec4',
        location: 0,
      },
      a_color: {
        type: 'vec3',
        location: 1,
      },
    })
    .withOutputs({
      v_color: {
        type: 'vec3',
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
      u_color: {
        type: 'vec3',
      },
      u_colorFactor: {
        type: 'float',
      },
    })
    .withMain({
      source: `
gl_PointSize = 5.0;
position = u_projectionMat * u_viewMat * u_worldMat * a_position;
v_color = mix(u_color, a_color, u_colorFactor);
`,
    }),
  template: {
    path: '/shaders/base.ejs.vs',
  },
};

export const BaseFragShader = {
  builder: new ShaderBuilder()
    .withInputs({
      v_color: {
        type: 'vec3',
      },
    })
    .withMain({
      source: `
fragColor = vec4(v_color, 1.0);
`,
    }),
  template: {
    path: '/shaders/base.ejs.fs',
  },
};

export const ShaderFactory = new ShaderProgramFactory();
