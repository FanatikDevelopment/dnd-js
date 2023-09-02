import { Color, Rect, RectOptions } from '../math/types';
import {
  BufferObjectOptions,
  Renderer,
  RendererOptions,
  ShaderOptions,
  ShaderProgramOptions,
  VertexArrayOptions,
} from './types';

import {
  createShader,
  createShaderProgram,
  createBufferObject,
  resizeViewport,
  setClearColor,
} from './utils';

export default class RendererProxy implements Renderer {
  private _clearColor: Color;
  private _clearBufferBits: number;

  public constructor(
    public readonly gl: WebGL2RenderingContext,
    options?: RendererOptions
  ) {
    this._clearColor = options?.clearColor ?? {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    };

    this._clearBufferBits =
      options?.clearBufferBits !== undefined
        ? options.clearBufferBits
        : gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;

    setClearColor(gl, this._clearColor);
  }

  public get canvas(): HTMLCanvasElement | OffscreenCanvas {
    return this.gl.canvas;
  }

  public async init<T = void>(f: (rend: Renderer) => T): Promise<T> {
    this.resizeViewport();

    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.cullFace(this.gl.BACK);

    return Promise.resolve(f(this));
  }

  public clear(): void {
    this.gl.clear(this.clearBufferBits);
  }

  public async render<T = void>(f: (rend: Renderer) => T): Promise<T> {
    this.clear();

    return Promise.resolve(f(this));
  }

  public resizeViewport(rect?: Rect | RectOptions): void {
    return resizeViewport(this.gl, rect);
  }

  public useProgram(program: WebGLProgram | null): void {
    this.gl.useProgram(program);
  }

  public createShader(options: ShaderOptions): WebGLShader {
    return createShader(this.gl, options);
  }

  public createShaderProgram(options: ShaderProgramOptions): WebGLProgram {
    return createShaderProgram(this.gl, options);
  }

  public createBufferObject(options: BufferObjectOptions) {
    return createBufferObject(this.gl, options);
  }

  public createVertexArrayObject(
    options: VertexArrayOptions
  ): WebGLVertexArrayObject {
    const vertexArray = this.gl.createVertexArray();
    if (!vertexArray) {
      throw new Error(
        `Vertex Array creation failure: cannot create VertexArray`
      );
    }

    const args: Parameters<typeof options.init> = [
      this,
      vertexArray,
      ...(options.params ?? []),
    ];
    options.init(...args);
    return vertexArray;
  }

  public get clearColor(): Color {
    return this._clearColor;
  }

  public set clearColor(color: Color) {
    setClearColor(this.gl, color);
    this._clearColor = color;
  }

  public get clearBufferBits(): number {
    return this._clearBufferBits;
  }

  public set clearBufferBits(bits: number) {
    this._clearBufferBits = bits;
  }
}
