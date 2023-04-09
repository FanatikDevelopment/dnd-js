vec3 formatLightDirection(Light light) { return normalize(-light.direction); }

float getLightAttenuationFactor(Light light, vec3 position) {
  float d = distance(position, light.position);
  return 1.0 / (light.attenuation.x + light.attenuation.y * d +
                light.attenuation.z * d * d);
}

float getAmbientLightFactor(Light light) { return light.ambient.a; }

float getDiffuseLightFactor(Light light, vec3 lightDir, vec3 normal) {
  return max(dot(normal, lightDir), 0.0);
}

float getSpecularLightFactor(Light light, vec3 lightDir, vec3 position,
                             vec3 normal, vec3 viewPos, float shininess) {
  vec3 viewDir = normalize(viewPos - position);
  vec3 reflectDir = reflect(-lightDir, normal);

  return pow(max(dot(viewDir, reflectDir), 0.0), shininess);
}

vec3 getDirectionnalLightFactors(Light light, vec3 position, vec3 normal,
                                 vec3 viewPos, float shininess) {
  return vec3(getAmbientLightFactor(light),
              getDiffuseLightFactor(light, light.direction, normal),
              getSpecularLightFactor(light, light.direction, position, normal,
                                     viewPos, shininess));
}

vec3 getPointLightFactors(Light light, vec3 position, vec3 normal, vec3 viewPos,
                          float shininess) {
  vec3 lightDir = normalize(light.position.xyz - v_position.xyz);
  return vec3(getAmbientLightFactor(light),
              getDiffuseLightFactor(light, lightDir, normal),
              getSpecularLightFactor(light, lightDir, position, normal, viewPos,
                                     shininess));
}

float isInCutOff(float theta, float cutOff) {
  return sign(theta - cutOff) / 2.0 + 1.0;
}

float cutOffEpsilon(float inCutOff, float outCutOff) {
  return inCutOff - outCutOff;
}

float cutOffAttenuation(float theta, float inCutOff, float outCutOff) {
  return (theta - outCutOff) / (inCutOff - outCutOff);
}

vec3 getSpotLightFactors(Light light, vec3 position, vec3 normal, vec3 viewPos,
                         float shininess) {
  vec3 lightDir = normalize(light.position.xyz - v_position.xyz);
  float theta = dot(lightDir, normalize(-light.direction));
  vec4 isIn = vec4(
      isInCutOff(theta, light.cutOff.x), isInCutOff(theta, light.cutOff.y),
      isInCutOff(theta, light.cutOff.z), isInCutOff(theta, light.cutOff.w));
  isIn.w = (1.0 - isIn.z) * isIn.w;
  isIn.y = isIn.y - isIn.x;

  float factor =
      isIn.x +
      (isIn.y * cutOffAttenuation(theta, light.cutOff.x, light.cutOff.y)) -
      clamp(isIn.w * cutOffAttenuation(theta, light.cutOff.z, light.cutOff.w),
            0.0, 1.0) -
      isIn.z;
  return vec3(getAmbientLightFactor(light),
              getDiffuseLightFactor(light, lightDir, normal) * factor,
              getSpecularLightFactor(light, lightDir, position, normal, viewPos,
                                     shininess) *
                  factor);
}
