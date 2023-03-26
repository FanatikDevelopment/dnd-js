#version 300 es

precision mediump float;

uniform vec4 u_color;

in vec3 v_position;

in vec3 v_color;

out vec4 outColor;

void main() { outColor = vec4(mix(v_color, u_color.rgb, v_position.z), 1); }
