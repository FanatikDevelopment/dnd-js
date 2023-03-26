#version 300 es

in vec4 a_position;
in vec3 a_color;

uniform vec2 u_resolution;

out vec3 v_position;
out vec3 v_color;

void main() {
  vec2 zero2Two = a_position.xy / u_resolution * 2.0;
  vec2 clipSpace = zero2Two - 1.0;
  v_position = vec3(clipSpace, 0);
  v_color = a_color;
  gl_Position = vec4(v_position, 1);
}
