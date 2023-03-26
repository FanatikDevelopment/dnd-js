import RendererProxy from './RendererProxy';
import ShaderProgramProxy from './ShaderProgramProxy';

export interface SceneProxyOptions {
  state?: string;
}

export default class SceneProxy {
  public state: string;

  public bufferObjects: Map<string, WebGLBuffer>;
  public vertexArrayObjects: Map<string, WebGLVertexArrayObject>;
  public programs: Map<string, ShaderProgramProxy>;
  public textures: Map<string, WebGLTexture>;

  constructor(
    public readonly renderer: RendererProxy,
    options?: SceneProxyOptions
  ) {
    this.state = options?.state ?? 'not initialized';
    this.bufferObjects = new Map<string, WebGLBuffer>();
    this.vertexArrayObjects = new Map<string, WebGLVertexArrayObject>();
    this.programs = new Map<string, ShaderProgramProxy>();
    this.textures = new Map<string, WebGLTexture>();
  }

  public async init(): Promise<void> {
    // Will be implemented in child class
    return;
  }

  public async resize(): Promise<void> {
    // Will be implemented in child class
    return;
  }

  public async render(): Promise<void> {
    // Will be implemented in child class
    return;
  }
}
