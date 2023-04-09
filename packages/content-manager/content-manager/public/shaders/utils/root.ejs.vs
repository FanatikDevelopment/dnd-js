<%- include('/shaders/utils/root.ejs.glsl', {
  meta: meta ?? undefined,
  head: head ?? undefined,
  vars: vars ?? undefined,
  body:
  `
  vec4 position = vec4(0.0, 0.0, 0.0, 1.0);
  ${body ?? ''}
  gl_Position = position;
  `
}); %>
