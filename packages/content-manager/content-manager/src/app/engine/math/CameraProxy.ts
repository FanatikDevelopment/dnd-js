import { glMatrix, mat4, vec3 } from 'gl-matrix';
import { Camera, CameraOptions, CameraType, Rect, Vec3 } from './types';
import Vec3Proxy from './Vec3Proxy';

export default class CameraProxy implements Camera {
  private _type: CameraType;
  private _surface: Rect;
  private _near: number;
  private _far: number;
  private _fov: number;

  private _position: Vec3Proxy;
  private _target: Vec3Proxy;
  private _up: Vec3Proxy;

  private _viewMatrix: mat4;
  private _projectionMatrix: mat4;
  private _viewUpToDate: boolean;
  private _projectionUpToDate: boolean;

  constructor(options?: CameraOptions) {
    this._type = 'perspective';
    this._surface = { x: 0, y: 0, width: 800, height: 600 };
    this._near = 0.1;
    this._far = 1000;
    this._fov = glMatrix.toRadian(70);

    this._position = new Vec3Proxy({ x: 1, y: 2, z: 3 });
    this._target = new Vec3Proxy();
    this._up = new Vec3Proxy({ y: 1 });

    this._viewMatrix = mat4.create();
    this._projectionMatrix = mat4.create();
    this._viewUpToDate = false;
    this._projectionUpToDate = false;

    this.setOptions(options);
  }

  reset(options?: CameraOptions): this {
    this._type = 'perspective';
    this._surface = { x: 0, y: 0, width: 800, height: 600 };
    this._near = 0.1;
    this._far = 1000;
    this._fov = glMatrix.toRadian(70);

    this._position = new Vec3Proxy({ y: 2, z: 3 });
    this._target = new Vec3Proxy();
    this._up = new Vec3Proxy({ y: 1 });

    this._viewMatrix = mat4.create();
    this._projectionMatrix = mat4.create();
    this._viewUpToDate = false;
    this._projectionUpToDate = false;

    return this.setOptions(options);
  }

  setOptions(options?: CameraOptions): this {
    if (!options) {
      return this;
    }

    if (options.type) {
      this.type = options.type;
    }

    if (options.surface) {
      this.surface = Object.assign(this._surface, options.surface) as Rect;
    }

    if (options.near) {
      this.near = options.near;
    }

    if (options.far) {
      this.far = options.far;
    }

    if (options.fov) {
      this.fov = options.fov;
    }

    if (options.position) {
      this._position.reset(options.position);
    }

    if (options.target) {
      this._target.reset(options.target);
    }

    if (options.up) {
      this._up.reset(options.up);
    }

    this._viewUpToDate = false;
    this._projectionUpToDate = false;

    return this;
  }

  updateViewMatrix(): mat4 {
    mat4.lookAt(
      this._viewMatrix,
      this._position.arr,
      this._target.arr,
      this._up.arr
    );
    this._viewUpToDate = true;
    return this._viewMatrix;
  }

  updateProjectionMatrix(): mat4 {
    switch (this.type) {
      case 'orthographic':
        {
          const dist = vec3.dist(this.positionVec, this.targetVec);
          const ratio = this.surface.width / this.surface.height;
          const w = (dist * ratio) / 2;
          const h = dist / 2;

          mat4.ortho(
            this._projectionMatrix,
            this.position.x - w,
            this.position.x + w,
            this.position.y - h,
            this.position.y + h,
            this.position.z + this.near,
            this.position.z - this.far
          );
        }
        break;

      case 'perspective':
        mat4.perspective(
          this._projectionMatrix,
          this._fov,
          this._surface.width / this._surface.height,
          this._near,
          this._far
        );
        break;

      case 'frustum':
        {
          const w = this.surface.width / 2;
          const h = this.surface.height / 2;
          mat4.frustum(
            this._projectionMatrix,
            this.position.x - w,
            this.position.x + w,
            this.position.y - h,
            this.position.y + h,
            this.position.z - this.near,
            this.position.z - this.far
          );
        }
        break;
    }

    this._projectionUpToDate = true;
    return this._projectionMatrix;
  }

  get type(): CameraType {
    return this._type;
  }

  set type(value: CameraType) {
    this._type = value;
    this._projectionUpToDate = false;
  }

  get surface(): Rect {
    return this._surface;
  }

  set surface(value: Rect) {
    this._surface = value;
    this._projectionUpToDate = false;
  }

  get near(): number {
    return this._near;
  }

  set near(value: number) {
    this._near = value;
    this._projectionUpToDate = false;
  }

  get far(): number {
    return this._far;
  }

  set far(value: number) {
    this._far = value;
    this._projectionUpToDate = false;
  }

  get fov(): number {
    return this._fov;
  }

  set fov(value: number) {
    this._fov = value;
    this._projectionUpToDate = false;
  }

  get position(): Vec3 {
    return this._position;
  }

  set position(value: Vec3) {
    this._position.reset(value);
    this._viewUpToDate = false;
  }

  get target(): Vec3 {
    return this._target;
  }

  set target(value: Vec3) {
    this._target.reset(value);
    this._viewUpToDate = false;
  }

  get up(): Vec3 {
    return this._up;
  }

  set up(value: Vec3) {
    this._up.reset(value);
    this._viewUpToDate = false;
  }

  get positionVec(): vec3 {
    return this._position.arr;
  }

  set positionVec(value: vec3) {
    this._position.reset(value);
    this._viewUpToDate = false;
  }

  get targetVec(): vec3 {
    return this._target.arr;
  }

  set targetVec(value: vec3) {
    this._target.reset(value);
    this._viewUpToDate = false;
  }

  get upVec(): vec3 {
    return this._up.arr;
  }

  set upVec(value: vec3) {
    this._up.reset(value);
    this._viewUpToDate = false;
  }

  get viewMatrix(): mat4 {
    if (!this._viewUpToDate) {
      this.updateViewMatrix();
    }

    return this._viewMatrix;
  }

  get projectionMatrix(): mat4 {
    if (!this._projectionUpToDate) {
      this.updateProjectionMatrix();
    }

    return this._projectionMatrix;
  }
}
