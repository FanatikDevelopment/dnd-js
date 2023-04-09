#version 300 es

// clang-format off
<%_ if (meta) { _%>
<%- meta %>
<% } _%>


<%- include('/shaders/utils/globals.ejs.glsl', vars ?? {}); %>

<%_ if (head) { _%>
<%- head %>
<% } _%>

void main() {
  <%_ if (body) { _%>
  <%- body %>
  <% } _%>
}
