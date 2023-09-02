import { Quat, QuatOptions, Vec3, Vec3Options } from '../../math/types';

export interface Transform {
  position: Vec3;
  orientation: Quat;
  scale: Vec3;
}

export interface TransformOptions {
  position: Vec3Options;
  orientation: QuatOptions;
  scale: Vec3Options;
}
