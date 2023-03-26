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

  private _cameraMatrix: mat4;
  private _projectionMatrix: mat4;
  private _cameraUpToDate: boolean;
  private _projectionUpToDate: boolean;

  constructor(options: CameraProxyOptions) {
    this._type = options.type;
    this._surface = Object.assign({ x: 0, y: 0 }, options.surface) as Rect;
    this._near = options.near ?? 0.01;
    this._far = options.far ?? 1000;
    this._fov = options.fov ?? glMatrix.toRadian(70);

    this._position = options.position;
    this._target = options.target;
    this._up = options.up;

    this._cameraMatrix = mat4.create();
    this._projectionMatrix = mat4.create();
    this._cameraUpToDate = false;
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
    this._cameraUpToDate = false;
  }

  public get target(): vec3 {
    return this._target;
  }

  public set target(value: vec3) {
    this._target = value;
    this._cameraUpToDate = false;
  }

  public get up(): vec3 {
    return this._up;
  }

  public set up(value: vec3) {
    this._up = value;
    this._cameraUpToDate = false;
  }

  public get cameraMatrix(): mat4 {
    if (!this._cameraUpToDate) {
      this.updateCameraMatrix();
    }

    return this._cameraMatrix;
  }

  public get projectionMatrix(): mat4 {
    if (!this._projectionUpToDate) {
      this.updateProjectionMatrix();
    }

    return this._projectionMatrix;
  }

  public updateCameraMatrix(): mat4 {
    mat4.lookAt(this._cameraMatrix, this._position, this._target, this._up);
    this._cameraUpToDate = true;
    return this._cameraMatrix;
  }

  public updateProjectionMatrix(): mat4 {
    switch (this.type) {
      case 'orthographic':
        mat4.ortho(
          this._projectionMatrix,
          this.surface.x,
          this.surface.x + this.surface.width,
          this.surface.y,
          this.surface.y + this.surface.height,
          this._near,
          this._far
        );
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
        mat4.frustum(
          this._projectionMatrix,
          this._surface.x,
          this._surface.x + this._surface.width,
          this._surface.y,
          this._surface.y + this._surface.height,
          this._near,
          this._far
        );
        break;
    }

    this._projectionUpToDate = true;
    return this._projectionMatrix;
  }
}
