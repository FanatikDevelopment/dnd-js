import { vec3 } from 'gl-matrix';
import { Vec3, Vec3Options, Vec3Proxy } from '../math';

export interface Material {
  ambient: Vec3;
  diffuse: Vec3;
  specular: Vec3;
  emissive: Vec3;
  shininess: number;
}

export interface MaterialOptions {
  ambient?: Vec3Options;
  diffuse?: Vec3Options;
  specular?: Vec3Options;
  emissive?: Vec3Options;
  shininess?: number;
}

export default class MaterialProxy implements Material {
  public ambient: Vec3Proxy;
  public diffuse: Vec3Proxy;
  public specular: Vec3Proxy;
  public emissive: Vec3Proxy;
  public shininess: number;

  public diffuseMap: WebGLTexture | null;
  public specularMap: WebGLTexture | null;

  constructor(options?: MaterialOptions) {
    this.ambient = new Vec3Proxy(options?.ambient ?? [1, 1, 1]);
    this.diffuse = new Vec3Proxy(options?.diffuse ?? [1, 1, 1]);
    this.specular = new Vec3Proxy(options?.specular ?? [1, 1, 1]);
    this.emissive = new Vec3Proxy(options?.emissive ?? [1, 1, 1]);
    this.shininess = 32.0;

    this.diffuseMap = null;
    this.specularMap = null;
  }
}
