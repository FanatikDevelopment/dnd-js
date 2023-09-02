import { Color, Rect, RectOptions } from '../math/types';

export interface RendererOptions {
  clearColor?: Color;
  clearBufferBits?: number;
}

export type ShaderType = 'vertex' | 'fragment';

export interface ShaderOptions {
  type: ShaderType;
  source: string;
}

export interface ShaderProgramOptions {
  shaders?: WebGLShader[];
  sources?: ShaderOptions[];
}

export interface ShaderProgramProxyOptions extends ShaderProgramOptions {
  attributeLocations?: Map<string, number> | [string, number][];
  uniformLocations?:
    | Map<string, WebGLUniformLocation | null>
    | [string, WebGLUniformLocation | null][];
}

export interface BufferObjectOptions {
  data: BufferSource;
  target?: number;
  usage?: number;
}

export type TextureWrapType = { s: number; t: number; r?: number };
export type TextureFiltersType = { min: number; mag: number };

export interface BaseTextureOptions {
  inputFormat: number;
  inputType: number;
  index?: number;
  target?: number;
  wrap?: TextureWrapType;
  filters?: TextureFiltersType;
  mipLevel?: number;
  textureFormat?: number;
}

export type TextureOptions = BaseTextureOptions &
  (
    | {
        image: HTMLImageElement;
      }
    | { border?: number; width: number; height: number; data?: ArrayBufferView }
  );

export type RendererClearFunc = () => void;
export type RendererResizeFunc = (rect?: Rect | RectOptions) => void;
export type RendererInitFunc = <T = void>(
  f: (rend: Renderer) => T
) => Promise<T>;
export type RendererRenderFunc = <T = void>(
  f: (rend: Renderer) => T
) => Promise<T>;

export interface Renderer {
  readonly canvas: HTMLCanvasElement | OffscreenCanvas;
  readonly gl: WebGL2RenderingContext;

  clearColor: Color;

  clearBufferBits: number;

  clear: RendererClearFunc;
  resizeViewport: RendererResizeFunc;

  init: RendererInitFunc;
  render: RendererRenderFunc;
}

export interface VertexArrayOptions {
  init: (
    renderer: Renderer,
    vao: WebGLVertexArrayObject,
    ...args: any[]
  ) => any;
  params?: any[];
}
