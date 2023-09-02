import { Rect, RectOptions, Vec3, Vec3Options } from '../../math/types';

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
