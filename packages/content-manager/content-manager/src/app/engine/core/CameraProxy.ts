import { glMatrix, mat4, vec3 } from 'gl-matrix';
import { Camera, CameraType, Rect, RectOptions } from './types';

export interface CameraProxyOptions extends Camera {
  surface: RectOptions;
  near?: number;
  far?: number;
  fov?: number;
}

export default class CameraProxy implements Camera {
  private _type: CameraType;
  private _surface: Rect;
  private _near: number;
  private _far: number;
  private _fov: number;

  private _position: vec3;
  private _target: vec3;
  private _up: vec3;

  private _viewMatrix: mat4;
  private _projectionMatrix: mat4;
  private _viewUpToDate: boolean;
  private _projectionUpToDate: boolean;

  constructor(options: CameraProxyOptions) {
    this._type = options.type;
    this._surface = Object.assign({ x: 0, y: 0 }, options.surface) as Rect;
    this._near = options.near ?? 0.1;
    this._far = options.far ?? 1000;
    this._fov = options.fov ?? glMatrix.toRadian(70);

    this._position = options.position;
    this._target = options.target;
    this._up = options.up;

    this._viewMatrix = mat4.create();
    this._projectionMatrix = mat4.create();
    this._viewUpToDate = false;
    this._projectionUpToDate = false;
  }

  public setOptions(options: Partial<CameraProxyOptions>): this {
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
      this.position = options.position;
    }

    if (options.target) {
      this.target = options.target;
    }

    if (options.up) {
      this.up = options.up;
    }

    return this;
  }

  public get type(): CameraType {
    return this._type;
  }

  public set type(value: CameraType) {
    this._type = value;
    this._projectionUpToDate = false;
  }

  public get surface(): Rect {
    return this._surface;
  }

  public set surface(value: Rect) {
    this._surface = value;
    this._projectionUpToDate = false;
  }

  public get near(): number {
    return this._near;
  }

  public set near(value: number) {
    this._near = value;
    this._projectionUpToDate = false;
  }

  public get far(): number {
    return this._far;
  }

  public set far(value: number) {
    this._far = value;
    this._projectionUpToDate = false;
  }

  public get fov(): number {
    return this._fov;
  }

  public set fov(value: number) {
    this._fov = value;
    this._projectionUpToDate = false;
  }

  public get position(): vec3 {
    return this._position;
  }

  public set position(value: vec3) {
    this._position = value;
    this._viewUpToDate = false;
  }

  public get target(): vec3 {
    return this._target;
  }

  public set target(value: vec3) {
    this._target = value;
    this._viewUpToDate = false;
  }

  public get up(): vec3 {
    return this._up;
  }

  public set up(value: vec3) {
    this._up = value;
    this._viewUpToDate = false;
  }

  public get viewMatrix(): mat4 {
    if (!this._viewUpToDate) {
      this.updateViewMatrix();
    }

    return this._viewMatrix;
  }

  public get projectionMatrix(): mat4 {
    if (!this._projectionUpToDate) {
      this.updateProjectionMatrix();
    }

    return this._projectionMatrix;
  }

  public updateViewMatrix(): mat4 {
    mat4.lookAt(this._viewMatrix, this._position, this._target, this._up);
    this._viewUpToDate = true;
    return this._viewMatrix;
  }

  public updateProjectionMatrix(): mat4 {
    switch (this.type) {
      case 'orthographic':
        {
          const w = this.surface.width / 2;
          const h = this.surface.height / 2;

          mat4.ortho(
            this._projectionMatrix,
            this.position[0] - w,
            this.position[0] + w,
            this.position[1] - h,
            this.position[1] + h,
            this.position[2] - this.near,
            this.position[2] - this.far
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
            this.position[0] - w,
            this.position[0] + w,
            this.position[1] - h,
            this.position[1] + h,
            this.position[2] - this.near,
            this.position[2] - this.far
          );
        }
        break;
    }

    this._projectionUpToDate = true;
    return this._projectionMatrix;
  }
}
