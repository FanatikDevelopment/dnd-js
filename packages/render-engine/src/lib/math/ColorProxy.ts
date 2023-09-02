import { ReadonlyVec4, vec4 } from 'gl-matrix';
import { Color, ColorOptions } from './types';
import { isColorOptions, isVec4Options } from './utils';

export default class ColorProxy implements Color {
  private _arr: vec4;

  constructor(vec?: ColorOptions) {
    this._arr = vec4.create();
    this.reset(vec);
  }

  reset(vec?: ColorOptions) {
    if (vec instanceof Float32Array || Array.isArray(vec)) {
      this._arr = vec4.clone(vec as ReadonlyVec4);
    } else if (isColorOptions(vec)) {
      this._arr = vec4.set(
        vec4.create(),
        vec.r ?? this._arr[0],
        vec.g ?? this._arr[1],
        vec.b ?? this._arr[2],
        vec.a ?? this._arr[3]
      );
    } else {
      this._arr = vec4.set(this._arr, 0, 0, 0, 1);
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

  get r(): number {
    return this._arr[0];
  }

  set r(value: number) {
    this._arr[0] = value;
  }

  get g(): number {
    return this._arr[1];
  }

  set g(value: number) {
    this._arr[1] = value;
  }

  get b(): number {
    return this._arr[2];
  }

  set b(value: number) {
    this._arr[2] = value;
  }

  get a(): number {
    return this._arr[3];
  }

  set a(value: number) {
    this._arr[3] = value;
  }

  get arr(): vec4 {
    return this._arr;
  }

  set arr(value: vec4) {
    vec4.copy(this._arr, value);
  }
}
