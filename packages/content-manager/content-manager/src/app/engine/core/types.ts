import { quat, vec2, vec3 } from 'gl-matrix';

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type ShaderType = 'vertex' | 'fragment';

export interface Vector2 {
  x: number;
  y: number;
}

export type Vector2Options = Partial<Vector2> | vec2;

export interface IVector2 extends Vector2 {
  arr: vec2;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export type Vector3Options = Partial<Vector3> | vec3;

export interface IVector3 extends Vector3 {
  arr: vec3;
}

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

export type QuaternionOptions = Partial<Quaternion> | quat;

export interface IQuaternion {
  arr: quat;
}

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

export interface BaseTextureOptions {
  inputFormat: number;
  inputType: number;
  index?: number;
  target?: number;
  wrap?: TextureWrapType;
  filters?: TextureFiltersType;
  mipLevel?: number;
  textureFormat?: number;
}

export type TextureOptions = BaseTextureOptions &
  (
    | {
        image: HTMLImageElement;
      }
    | { border?: number; width: number; height: number; data?: ArrayBufferView }
  );

export type CameraType = 'perspective' | 'orthographic' | 'frustum';

export interface Camera {
  type: CameraType;
  position: vec3;
  target: vec3;
  up: vec3;
}
