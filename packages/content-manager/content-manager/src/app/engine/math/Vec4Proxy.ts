import { ReadonlyVec4, vec4 } from 'gl-matrix';
import { IVec4, Vec4Options } from './types';
import { isVec4Options } from './utils';

export default class Vec4Proxy implements IVec4 {
  private _arr: vec4;

  constructor(vec?: Vec4Options) {
    this._arr = vec4.create();
    this.reset(vec);
  }

  reset(vec?: Vec4Options) {
    if (vec instanceof Float32Array || Array.isArray(vec)) {
      this._arr = vec4.clone(vec as ReadonlyVec4);
    } else if (isVec4Options(vec)) {
      this._arr = vec4.set(
        vec4.create(),
        vec.x ?? this._arr[0],
        vec.y ?? this._arr[1],
        vec.z ?? this._arr[2],
        vec.w ?? this._arr[3]
      );
    } else {
      this._arr = vec4.zero(this._arr);
    }
  }

  bind<T extends any[]>(
    f: (that: vec4, ...args: T) => vec4
  ): (...a: T) => vec4 {
    return (...a: T) => {
      return f(this._arr, ...a);
    };
  }

  apply<T extends any[]>(f: (that: vec4, ...a: T) => vec4, args: T): vec4 {
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

  get arr(): vec4 {
    return this._arr;
  }

  set arr(value: vec4) {
    vec4.copy(this._arr, value);
  }
}
