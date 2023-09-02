import { quat, ReadonlyQuat } from 'gl-matrix';
import { IQuat, QuatOptions } from './types';
import { isQuatOptions } from './utils';

export default class QuatProxy implements IQuat {
  private _arr: quat;

  constructor(q?: QuatOptions) {
    this._arr = quat.create();
    this.reset(q);
  }

  reset(q?: QuatOptions) {
    if (q instanceof Float32Array || Array.isArray(q)) {
      this._arr = quat.clone(q as ReadonlyQuat);
    } else if (isQuatOptions(q)) {
      this._arr = quat.set(
        quat.create(),
        q.x ?? this._arr[0],
        q.y ?? this._arr[1],
        q.z ?? this._arr[2],
        q.w ?? this._arr[3]
      );
    } else {
      this._arr = quat.identity(this._arr);
    }
  }

  bind<T extends any[]>(
    f: (that: quat, ...args: T) => quat
  ): (...a: T) => quat {
    return (...a: T) => {
      return f(this._arr, ...a);
    };
  }

  apply<T extends any[]>(f: (that: quat, ...a: T) => quat, args: T): quat {
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

  get w(): number {
    return this._arr[2];
  }

  set w(value: number) {
    this._arr[2] = value;
  }

  get arr(): quat {
    return this._arr;
  }

  set arr(value: quat) {
    quat.copy(this._arr, value);
  }
}
