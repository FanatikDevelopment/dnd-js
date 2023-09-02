import { ReadonlyVec3, vec3 } from 'gl-matrix';
import { Vec3, Vec3Options } from './types';
import { isVec3Options } from './utils';

export default class Vec3Proxy implements Vec3 {
  private _arr: vec3;

  constructor(vec?: Vec3Options) {
    this._arr = vec3.create();
    this.reset(vec);
  }

  reset(vec?: Vec3Options): this {
    if (vec instanceof Float32Array || Array.isArray(vec)) {
      this._arr = vec3.clone(vec as ReadonlyVec3);
    } else if (isVec3Options(vec)) {
      this._arr = vec3.set(
        vec3.create(),
        vec.x ?? this._arr[0],
        vec.y ?? this._arr[1],
        vec.z ?? this._arr[2]
      );
    } else {
      this._arr = vec3.zero(this._arr);
    }
    return this;
  }

  bind<T extends any[]>(
    f: (that: vec3, ...args: T) => vec3
  ): (...a: T) => vec3 {
    return (...a: T) => {
      return f(this._arr, ...a);
    };
  }

  apply<T extends any[]>(f: (that: vec3, ...a: T) => vec3, args: T): vec3 {
    return f(this._arr, ...args);
  }

  get x(): number {
    return this._arr[0];
  }

  set x(value: number) {
    this._arr[0] = value;
  }

  get y(): number {
    return this._arr[1];
  }

  set y(value: number) {
    this._arr[1] = value;
  }

  get z(): number {
    return this._arr[2];
  }

  set z(value: number) {
    this._arr[2] = value;
  }

  get arr(): vec3 {
    return this._arr;
  }

  set arr(value: vec3) {
    vec3.copy(this._arr, value);
  }
}
