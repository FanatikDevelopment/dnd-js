vec4 applyKernel(vec2 uv, sampler2D tex, float kernel[9], float kernelWeight) {
  vec2 onePixel = vec2(1) / vec2(textureSize(tex, 0));
  vec4 sum = texture(tex, uv + onePixel * vec2(-1, -1)) * kernel[0] +
             texture(tex, uv + onePixel * vec2(0, -1)) * kernel[1] +
             texture(tex, uv + onePixel * vec2(1, -1)) * kernel[2] +
             texture(tex, uv + onePixel * vec2(-1, 0)) * kernel[3] +
             texture(tex, uv + onePixel * vec2(0, 0)) * kernel[4] +
             texture(tex, uv + onePixel * vec2(1, 0)) * kernel[5] +
             texture(tex, uv + onePixel * vec2(-1, 1)) * kernel[6] +
             texture(tex, uv + onePixel * vec2(0, 1)) * kernel[7] +
             texture(tex, uv + onePixel * vec2(1, 1)) * kernel[8];

  return sum / kernelWeight;
}
