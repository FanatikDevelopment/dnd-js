import { Vec3, Vec3Options } from '../../math';

export interface Material {
  ambient: Vec3;
  diffuse: Vec3;
  specular: Vec3;
  emissive: Vec3;
  shininess: number;
}

export interface MaterialOptions {
  ambient?: Vec3Options;
  diffuse?: Vec3Options;
  specular?: Vec3Options;
  emissive?: Vec3Options;
  shininess?: number;
}
