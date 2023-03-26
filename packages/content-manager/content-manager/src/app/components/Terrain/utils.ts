type ShaderType = 'vertex' | 'fragment';

export interface ShaderOptions {
  type: ShaderType;
  source: string;
}

export interface ShaderProgramOptions {
  shaders?: WebGLShader[];
  sources?: ShaderOptions[];
}

export interface BufferObjectOptions {
  data: BufferSource;
  target?: number;
  usage?: number;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
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
