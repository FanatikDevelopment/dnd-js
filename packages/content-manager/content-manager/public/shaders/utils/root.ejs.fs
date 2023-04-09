<%- include('/shaders/utils/root.ejs.glsl', {
  meta: `
precision highp float;
${meta ?? ''}
`,
  vars: {
    ...(vars ?? {}),
    outputs: [
      'out vec4 fragColor;',
      ...(vars.outputs ?? [])
    ],
  },
  head: head ?? undefined,
  body: `
  fragColor = vec4(1.0, 1.0, 0.0, 1.0);
  ${body ?? ''}
`
}); %>
