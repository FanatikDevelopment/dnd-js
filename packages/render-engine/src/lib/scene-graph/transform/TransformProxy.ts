import { mat3, mat4, quat, vec3 } from 'gl-matrix';

import { Quat, Vec3 } from '../../math/types';
import QuatProxy from '../../math/QuatProxy';
import Vec3Proxy from '../../math/Vec3Proxy';

import { Transform, TransformOptions } from './types';

export default class TransformProxy implements Transform {
  private _position: Vec3Proxy;
  private _orientation: QuatProxy;
  private _scale: Vec3Proxy;

  private _localMatrix: mat4;
  private _normalMatrix: mat3;
  private _isUpToDate: boolean;

  constructor(options?: TransformOptions) {
    this._position = new Vec3Proxy(options?.position);
    this._orientation = new QuatProxy(options?.orientation);
    this._scale = new Vec3Proxy(options?.scale ?? [1, 1, 1]);

    this._localMatrix = mat4.identity(mat4.create());
    this._normalMatrix = mat3.identity(mat3.create());
    this._isUpToDate = false;
  }

  setOptions(options: TransformOptions) {
    this._position.reset(options.position);
    this._orientation.reset(options.orientation);
    this._scale.reset(options.scale);

    this._isUpToDate = false;
  }

  invalidate(): void {
    this._isUpToDate = false;
  }

  update(buffer_mat?: mat4): void {
    mat4.fromRotationTranslationScale(
      this._localMatrix,
      this.orientationQuat,
      this.positionVec,
      this.scaleVec
    );

    const m = buffer_mat ?? mat4.create();
    mat3.fromMat4(
      this._normalMatrix,
      mat4.transpose(m, mat4.invert(m, this._localMatrix))
    );

    this._isUpToDate = true;
  }

  get position(): Vec3 {
    return this._position;
  }

  set position(value: Vec3) {
    vec3.set(this._position.arr, value.x, value.y, value.z);
    this._isUpToDate = false;
  }

  get orientation(): Quat {
    return this._orientation;
  }

  set orientation(value: Quat) {
    quat.set(this._orientation.arr, value.x, value.y, value.z, value.w);
    this._isUpToDate = false;
  }

  get scale(): Vec3 {
    return this._scale;
  }

  set scale(value: Vec3) {
    vec3.set(this._scale.arr, value.x, value.y, value.z);
    this._isUpToDate = false;
  }

  get positionVec(): vec3 {
    return this._position.arr;
  }

  set positionVec(value: vec3) {
    vec3.copy(this._position.arr, value);
    this._isUpToDate = false;
  }

  get orientationQuat(): quat {
    return this._orientation.arr;
  }

  set orientationQuat(value: quat) {
    quat.copy(this._orientation.arr, value);
    this._isUpToDate = false;
  }

  get scaleVec(): vec3 {
    return this._scale.arr;
  }

  set scaleVec(value: vec3) {
    vec3.copy(this._scale.arr, value);
    this._isUpToDate = false;
  }

  get isUpToDate(): boolean {
    return this._isUpToDate;
  }

  get localMatrix(): mat4 {
    if (!this._isUpToDate) {
      this.update();
    }
    return this._localMatrix;
  }

  get normalMatrix(): mat3 {
    if (!this._isUpToDate) {
      this.update();
    }
    return this._normalMatrix;
  }
}
