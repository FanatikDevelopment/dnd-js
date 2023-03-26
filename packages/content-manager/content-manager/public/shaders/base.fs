#version 300 es

precision mediump float;

uniform sampler2D u_texture;

uniform vec4 u_baseColor;

in vec4 v_worldPosition;
in vec2 v_uv;

out vec4 outColor;

void main() {
  vec4 textureColor = texture(u_texture, v_uv);
  outColor = mix(u_baseColor, textureColor, textureColor.a);
}
