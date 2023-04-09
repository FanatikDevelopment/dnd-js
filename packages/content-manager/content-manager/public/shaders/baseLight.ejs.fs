vec4 exec() {
  vec3 ambientLightColor =
      u_material.ambient * getAmbientLightFragColor(u_light);

  vec3 normal = normalize((v_normal).xyz);
  vec3 lightDir = normalize(u_light.position - v_position.xyz);
  vec3 directionalLightColor =
      u_material.diffuse * getDiffuseLightFragColor(normal, lightDir, u_light);

  vec3 specularColor =
      u_material.specular * getSpecularLightFragColor(v_position.xyz, normal,
                                                      u_viewPosition.xyz,
                                                      lightDir, u_light);

  vec4 frag = texture(u_texture, v_uv);
  frag.rgb =
      frag.rgb * (ambientLightColor + directionalLightColor + specularColor);

  return frag;
}
