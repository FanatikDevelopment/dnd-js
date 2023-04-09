vec4 exec() {
  v_uv = vec2(a_uv.x, 1.0 - a_uv.y);
  v_normal = vec4(u_normMat * a_normal, 0);
  v_position = u_worldMat * a_position;
  return u_projectionMat * u_viewMat * v_position;
}
