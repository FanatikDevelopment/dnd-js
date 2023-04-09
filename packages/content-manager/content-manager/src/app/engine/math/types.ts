import {
  vec2,
  vec3,
  quat,
  ReadonlyQuat,
  ReadonlyVec3,
  ReadonlyVec2,
  ReadonlyVec4,
} from 'gl-matrix';

export interface Vec2 {
  x: number;
  y: number;
}

export type Vec2Options = Partial<Vec2> | ReadonlyVec2;

export interface IVec2 extends Vec2 {
  arr: vec2;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export type Vec3Options = Partial<Vec3> | ReadonlyVec3;

export interface IVec3 extends Vec3 {
  arr: vec3;
}

export interface Vec4 {
  x: number;
  y: number;
  z: number;
  w: number;
}

export type Vec4Options = Partial<Vec4> | ReadonlyVec4;

export interface IVec4 {
  arr: quat;
}

export interface Quat {
  x: number;
  y: number;
  z: number;
  w: number;
}

export type QuatOptions = Partial<Quat> | ReadonlyQuat;

export interface IQuat {
  arr: quat;
}

export interface Rect extends Vec2 {
  width: number;
  height: number;
}

export type RectOptions = Partial<Rect> & Pick<Rect, 'width' | 'height'>;

export interface Transform {
  position: vec3;
  orientation: quat;
  scale: vec3;
}

export type CameraType = 'perspective' | 'orthographic' | 'frustum';

export interface Camera {
  type: CameraType;
  surface: Rect;
  position: Vec3;
  target: Vec3;
  up: Vec3;
  near: number;
  far: number;
  fov: number;
}

export type CameraOptions = Partial<
  Omit<Camera, 'surface' | 'position' | 'target' | 'up'> & {
    surface: RectOptions;
    position: Vec3Options;
    target: Vec3Options;
    up: Vec3Options;
  }
>;

export type LightType = 'ambient' | 'directional' | 'point';

export interface Light {
  type: LightType;
  position: Vec3;
  orientation: Quat;
  Color: Vec3;
  strength: number;
}
