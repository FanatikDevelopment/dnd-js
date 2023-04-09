<%_ if (Object.keys(structs ?? {}).length) { _%>
/**
 * Types
 */
  <%_ for (const struct of structs) { _%>
<%- struct -%>
  <%_ } _%>
<%_ } _%>
<%_ if (Object.keys(consts ?? {}).length) { _%>
/**
 * Consts
 */
  <%_ for (const v of consts) { _%>
<%- v %>
  <%_ } _%>
<%_ } _%>
<%_ if (Object.keys(inputs ?? {}).length) { _%>
/**
  * Inputs
  */
  <%_ for (const v of inputs) { _%>
<%- v %>
  <%_ } _%>
<%_ } _%>
<%_ if (Object.keys(uniforms ?? {}).length) { _%>
/**
  * Uniform
  */
  <%_ for (const v of uniforms) { _%>
<%- v %>
  <%_ } _%>
<%_ } _%>
<%_ if (Object.keys(outputs ?? {}).length) { _%>
/**
  * Outputs
  */
  <%_ for (const v of outputs) { _%>
<%- v %>
  <%_ } _%>
<%_ } _%>
