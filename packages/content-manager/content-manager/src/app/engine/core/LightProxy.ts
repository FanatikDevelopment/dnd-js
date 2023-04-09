import { vec4 } from 'gl-matrix';
import { Vec3Proxy } from '../math';
import { Vec3, Vec3Options, Vec4, Vec4Options } from '../math/types';
import Vec4Proxy from '../math/Vec4Proxy';

export interface Light {
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

export default class LightProxy {
  public position: Vec3Proxy;
  public direction: Vec3Proxy;
  public color: Vec3Proxy;
  public attenuation: Vec3Proxy;
  public cutOff: Vec4Proxy;
  public ambientStrength: number;

  constructor(options?: LightOptions) {
    this.position = new Vec3Proxy(options?.position);
    this.direction = new Vec3Proxy(options?.direction ?? [0, 0, 1]);
    this.color = new Vec3Proxy(options?.color ?? [1, 1, 1]);
    this.attenuation = new Vec3Proxy(options?.attenuation ?? [1, 0, 0]);
    this.ambientStrength = options?.ambientStrength ?? 1.0;

    const angle = Math.PI / 128;

    this.cutOff = new Vec4Proxy(
      options?.cutOff ?? [Math.cos(angle * 2), Math.cos(angle * 4), 1.0, 1.0]
    );
  }
}
