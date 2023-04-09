import { vec4 } from 'gl-matrix';
import {
  BufferObjectOptions,
  Color,
  Rect,
  ShaderOptions,
  ShaderProgramOptions,
  TextureOptions,
} from './types';

export function isColor(obj: any): obj is Color {
  return 'r' in obj && 'g' in obj && 'b' in obj && 'a' in obj;
}

export function color2vec4({ r, g, b, a }: Color): vec4 {
  return [r, g, b, a];
}

export function vec42color([r, g, b, a]: vec4): Color {
  return { r, g, b, a };
}

export function setClearColor(gl: WebGL2RenderingContext, color: Color) {
  gl.clearColor(color.r, color.g, color.b, color.a);
}

export function resizeViewport(gl: WebGL2RenderingContext, rect?: Rect) {
  gl.viewport(
    rect?.x ?? 0,
    rect?.y ?? 0,
    rect?.width ?? gl.canvas.width,
    rect?.height ?? gl.canvas.height
  );
}

export function createShader(
  gl: WebGL2RenderingContext,
  { type, source }: ShaderOptions
): WebGLShader {
  let glType = gl.VERTEX_SHADER;
  if (type === 'fragment') {
    glType = gl.FRAGMENT_SHADER;
  }

  const shader = gl.createShader(glType);
  if (!shader) {
    throw new Error('Shader creation failure: cannot create shader');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    const msg = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader creation failure: Compilation Error => ${msg}`);
  }

  return shader;
}

export function createShaderProgram(
  gl: WebGL2RenderingContext,
  options: ShaderProgramOptions
): WebGLProgram {
  const program = gl.createProgram();
  if (!program) {
    throw new Error('ShaderProgram creation failure: cannot create program');
  }

  const shaders = [];
  if (options.shaders) {
    shaders.push(...options.shaders);
  }

  if (options.sources) {
    shaders.push(
      ...options.sources.map((current) => createShader(gl, current))
    );
  }

  shaders.forEach((current) => gl.attachShader(program, current));
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    const msg = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);

    throw new Error(`ShaderProgram creation failure: Linking Error => ${msg}`);
  }

  return program;
}

export function createBufferObject(
  gl: WebGL2RenderingContext,
  { data, target, usage }: BufferObjectOptions
) {
  const vbo = gl.createBuffer();
  if (!vbo) {
    throw new Error('Vertex Buffer creation failure: Creation Error');
  }

  const glTarget = target ?? gl.ARRAY_BUFFER;
  const glUsage = usage ?? gl.STATIC_DRAW;
  gl.bindBuffer(glTarget, vbo);

  gl.bufferData(glTarget, data, glUsage);

  return vbo;
}

export async function loadImage(uri: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.src = uri;

  const promise = new Promise<HTMLImageElement>((resolve) => {
    image.onload = () => resolve(image);
  });

  return promise;
}

export function createTexture(
  gl: WebGL2RenderingContext,
  options: TextureOptions
): WebGLTexture {
  const texture = gl.createTexture();
  if (!texture) {
    throw new Error('Texture Creation Failed: cannot create Texture');
  }

  const index = gl.TEXTURE0 + (options.index ?? 0);
  const target = options.target ?? gl.TEXTURE_2D;
  const wrap = options.wrap ?? { s: gl.CLAMP_TO_EDGE, t: gl.CLAMP_TO_EDGE };
  const filters = options.filters ?? { min: gl.NEAREST, mag: gl.NEAREST };

  gl.activeTexture(index);
  gl.bindTexture(target, texture);

  gl.texParameteri(target, gl.TEXTURE_WRAP_S, wrap.s);
  gl.texParameteri(target, gl.TEXTURE_WRAP_T, wrap.t);
  if (wrap.r) {
    gl.texParameteri(target, gl.TEXTURE_WRAP_R, wrap.r);
  }

  gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, filters.min);
  gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, filters.mag);

  if ('image' in options) {
    gl.texImage2D(
      target,
      options.mipLevel ?? 0,
      options.textureFormat ?? gl.RGBA,
      options.inputFormat,
      options.inputType,
      options.image
    );
  } else {
    gl.texImage2D(
      target,
      options.mipLevel ?? 0,
      options.textureFormat ?? gl.RGBA,
      options.width,
      options.height,
      options.border ?? 0,
      options.inputFormat,
      options.inputType,
      options.data ?? null
    );
  }

  return texture;
}
