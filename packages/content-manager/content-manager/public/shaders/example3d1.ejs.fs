uniform sampler2D u_texture;

uniform vec4 u_baseColor;

in vec4 v_worldPosition;
in vec2 v_uv;

vec4 exec() {
  vec4 textureColor = texture(u_texture, v_uv);
  return mix(u_baseColor, textureColor, textureColor.a);
}
