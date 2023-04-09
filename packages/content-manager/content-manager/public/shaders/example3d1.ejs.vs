in vec4 a_position;
in vec2 a_uv;

uniform mat4 u_modelMat;
uniform mat4 u_projectionMat;
uniform mat4 u_cameraMat;

out vec4 v_worldPosition;
out vec2 v_uv;

vec4 getWorldPosition(vec4 pos) { return u_modelMat * pos; }

vec4 getProjectedPosition(vec4 worldPos) {
  return u_projectionMat * u_cameraMat * worldPos;
}

vec2 formatUv(vec2 uv) { return vec2(uv.x, 1.0 - uv.y); }

vec4 exec() {
  v_uv = formatUv(a_uv);
  v_worldPosition = getWorldPosition(a_position);
  return getProjectedPosition(v_worldPosition);
}
