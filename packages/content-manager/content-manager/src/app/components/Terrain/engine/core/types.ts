import { vec3 } from 'gl-matrix';

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

export type RectOptions = Partial<Rect> & Pick<Rect, 'width' | 'height'>;

export type ShaderType = 'vertex' | 'fragment';

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

export type TextureWrapType = { s: number; t: number; r?: number };
export type TextureFiltersType = { min: number; mag: number };

export interface TextureOptions {
  image: HTMLImageElement;
  inputFormat: number;
  inputType: number;
  index?: number;
  target?: number;
  wrap?: TextureWrapType;
  filters?: TextureFiltersType;
  mipLevel?: number;
  textureFormat?: number;
}

export type CameraType = 'perspective' | 'orthographic' | 'frustum';

export interface Camera {
  type: CameraType;
  position: vec3;
  target: vec3;
  up: vec3;
}
