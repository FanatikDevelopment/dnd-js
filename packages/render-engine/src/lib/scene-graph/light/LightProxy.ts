import Vec3Proxy from '../../math/Vec3Proxy';
import Vec4Proxy from '../../math/Vec4Proxy';
import { LightOptions } from './types';

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
