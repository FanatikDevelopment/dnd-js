#version 300 es

in vec4 a_position;
in vec2 a_uv;

uniform mat4 u_modelMat;
uniform mat4 u_projectionMat;
uniform mat4 u_cameraMat;

out vec4 v_worldPosition;
out vec2 v_uv;

void main() {
  mat4 viewMat = u_projectionMat * u_cameraMat;
  v_worldPosition = u_modelMat * a_position;
  v_uv = a_uv;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = viewMat * v_worldPosition;
}
