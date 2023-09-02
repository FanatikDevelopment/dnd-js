import {
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

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export type Vec3Options = Partial<Vec3> | ReadonlyVec3;

export interface Vec4 {
  x: number;
  y: number;
  z: number;
  w: number;
}

export type Vec4Options = Partial<Vec4> | ReadonlyVec4;

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type ColorOptions = Partial<Color> | ReadonlyVec4;

export interface Quat {
  x: number;
  y: number;
  z: number;
  w: number;
}

export type QuatOptions = Partial<Quat> | ReadonlyQuat;

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Vec2, Size {}

export type RectOptions = Partial<Vec2> & Size;
