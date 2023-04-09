import { ReadonlyVec2, vec2 } from 'gl-matrix';
import { IVec2, Vec2Options } from './types';
import { isVec2Options } from './utils';

export default class Vec2Proxy implements IVec2 {
  private _arr: vec2;

  constructor(vec?: Vec2Options) {
    this._arr = vec2.create();
    this.reset(vec);
  }

  reset(vec?: Vec2Options): this {
    if (vec instanceof Float32Array || Array.isArray(vec)) {
      this._arr = vec2.clone(vec as ReadonlyVec2);
    } else if (isVec2Options(vec)) {
      this._arr = vec2.set(
        vec2.create(),
        vec.x ?? this._arr[0],
        vec.y ?? this._arr[1]
      );
    } else {
      this._arr = vec2.zero(this._arr);
    }
    return this;
  }

  bind<T extends any[]>(
    f: (that: vec2, ...args: T) => vec2
  ): (...a: T) => vec2 {
    return (...a: T) => {
      return f(this._arr, ...a);
    };
  }

  apply<T extends any[]>(f: (that: vec2, ...a: T) => vec2, args: T): vec2 {
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

  get arr(): vec2 {
    return this._arr;
  }

  set arr(value: vec2) {
    vec2.copy(this._arr, value);
  }
}
