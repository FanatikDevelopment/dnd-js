import { Vec3, Vec3Options, Vec4, Vec4Options } from '../../math/types';

export type LightType = 'ambient' | 'directional' | 'point';

export interface Light {
  type: LightType;
  position: Vec3;
  direction: Vec3;
  color: Vec3;
  cutOff: Vec4;
  attenuation: Vec3;
  ambientStrength: number;
}

export interface LightOptions {
  position?: Vec3Options;
  direction?: Vec3Options;
  color?: Vec3Options;
  cutOff?: Vec4Options;
  attenuation?: Vec3Options;
  ambientStrength?: number;
}
