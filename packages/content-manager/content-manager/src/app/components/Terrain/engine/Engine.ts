import Renderer, { RendererOptions } from './core/RendererProxy';
import SceneProxy from './core/SceneProxy';

export interface EngineOptions {
  rendererOptions?: RendererOptions;
}

export default class Engine {
  public readonly renderer: Renderer;

  private _scene: SceneProxy | null;

  constructor(gl: WebGL2RenderingContext, options?: EngineOptions) {
    this.renderer = new Renderer(gl, options?.rendererOptions);
    this._scene = null;
  }

  get gl(): WebGL2RenderingContext {
    return this.renderer.gl;
  }

  get scene(): SceneProxy | null {
    return this._scene;
  }

  set scene(value: SceneProxy | null) {
    this._scene = value;
  }
}
