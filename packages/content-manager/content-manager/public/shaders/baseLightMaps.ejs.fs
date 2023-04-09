vec4 exec() {
  vec3 normal = normalize((v_normal).xyz);
  vec4 result = vec4(0.0);
  for (int index = 0; index < u_nbDirectionalLights; ++index) {
    vec3 lightFactors =
        getDirectionnalLightFactors(u_directionalLights[index], v_position.xyz,
                                    normal, u_viewPosition.xyz,
                                    u_material.shininess) *
        getLightAttenuationFactor(u_directionalLights[index], v_position.xyz);

    vec4 diffuseFrag = texture(u_material.diffuse, v_uv);
    vec4 specularFrag = texture(u_material.specular, v_uv);

    vec3 ambientLightColor = diffuseFrag.rgb *
                             u_directionalLights[index].ambient.rgb *
                             max(lightFactors.x, lightFactors.y);

    vec3 diffuseLightColor =
        diffuseFrag.rgb * u_directionalLights[index].diffuse * lightFactors.y;
    vec3 specularColor =
        specularFrag.rgb * u_directionalLights[index].specular * lightFactors.z;
    result =
        result + vec4(ambientLightColor + diffuseLightColor + specularColor,
                      diffuseFrag.a);
  }

  for (int index = 0; index < u_nbPointLights; ++index) {
    vec3 lightFactors =
        getPointLightFactors(u_pointLights[index], v_position.xyz, normal,
                             u_viewPosition.xyz, u_material.shininess) *
        getLightAttenuationFactor(u_pointLights[index], v_position.xyz);

    vec4 diffuseFrag = texture(u_material.diffuse, v_uv);
    vec4 specularFrag = texture(u_material.specular, v_uv);

    vec3 ambientLightColor = diffuseFrag.rgb *
                             u_pointLights[index].ambient.rgb *
                             max(lightFactors.x, lightFactors.y);

    vec3 diffuseLightColor =
        diffuseFrag.rgb * u_pointLights[index].diffuse * lightFactors.y;
    vec3 specularColor =
        specularFrag.rgb * u_pointLights[index].specular * lightFactors.z;
    result =
        result + vec4(ambientLightColor + diffuseLightColor + specularColor,
                      diffuseFrag.a);
  }

  for (int index = 0; index < u_nbSpotLights; ++index) {
    vec3 lightFactors =
        getSpotLightFactors(u_spotLights[index], v_position.xyz, normal,
                            u_viewPosition.xyz, u_material.shininess) *
        getLightAttenuationFactor(u_spotLights[index], v_position.xyz);

    vec4 diffuseFrag = texture(u_material.diffuse, v_uv);
    vec4 specularFrag = texture(u_material.specular, v_uv);

    vec3 ambientLightColor = diffuseFrag.rgb * u_spotLights[index].ambient.rgb *
                             max(lightFactors.x, lightFactors.y);

    vec3 diffuseLightColor =
        diffuseFrag.rgb * u_spotLights[index].diffuse * lightFactors.y;
    vec3 specularColor =
        specularFrag.rgb * u_spotLights[index].specular * lightFactors.z;
    result =
        result + vec4(ambientLightColor + diffuseLightColor + specularColor,
                      diffuseFrag.a);
  }

  return result;
}
