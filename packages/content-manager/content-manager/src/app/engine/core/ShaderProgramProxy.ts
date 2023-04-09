import RendererProxy from './RendererProxy';
import { ShaderProgramOptions } from './types';

export interface ShaderProgramProxyOptions extends ShaderProgramOptions {
  attributeLocations?: Map<string, number> | [string, number][];
  uniformLocations?:
    | Map<string, WebGLUniformLocation | null>
    | [string, WebGLUniformLocation | null][];
}

export default class ShaderProgramProxy {
  public readonly program: WebGLProgram;
  private _attributeLocations: Map<string, number>;
  private _uniformLocations: Map<string, WebGLUniformLocation | null>;

  constructor(
    public readonly renderer: RendererProxy,
    options: ShaderProgramProxyOptions
  ) {
    this.program = this.renderer.createShaderProgram(options);
    this._attributeLocations = new Map<string, number>(
      options?.attributeLocations
    );
    this._uniformLocations = new Map<string, WebGLUniformLocation | null>(
      options?.uniformLocations
    );

    this.updateAttribLocations();
    this.updateUniformLocations();
  }

  public use() {
    this.renderer.gl.useProgram(this.program);
  }

  getAttribLocation(key: string): number {
    const current = this._attributeLocations.get(key);
    if (current) {
      return current;
    }

    const location = this.renderer.gl.getAttribLocation(this.program, key);
    this._attributeLocations.set(key, location);
    return location;
  }

  getUniformLocation(key: string): WebGLUniformLocation | null {
    const current = this._uniformLocations.get(key);
    if (current) {
      return current;
    }

    const location = this.renderer.gl.getUniformLocation(this.program, key);
    this._uniformLocations.set(key, location);
    return location;
  }

  public pruneAttribLocations(): void {
    [...this._attributeLocations.entries()]
      .filter(([_, value]) => value >= 0)
      .forEach(([key]) => this._attributeLocations.delete(key));
  }

  public pruneUniformLocations(): void {
    [...this._uniformLocations.entries()]
      .filter(([_, value]) => value !== null)
      .forEach(([key]) => this._uniformLocations.delete(key));
  }

  public updateAttribLocations(force?: boolean): void {
    this._attributeLocations.forEach((value, key) => {
      if (value < 0 || force) {
        this._attributeLocations.set(
          key,
          this.renderer.gl.getAttribLocation(this.program, key)
        );
      }
    });
  }

  public updateUniformLocations(force?: boolean): void {
    this._uniformLocations.forEach((value, key) => {
      if (value === null || force) {
        this._uniformLocations.set(
          key,
          this.renderer.gl.getUniformLocation(this.program, key)
        );
      }
    });
  }
}
