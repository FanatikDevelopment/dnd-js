import RendererProxy from './RendererProxy';

export interface VertexArrayOptions {
  init: (
    renderer: RendererProxy,
    vao: WebGLVertexArrayObject,
    ...args: any[]
  ) => any;
  params?: any[];
}

export default class VertexArrayProxy {}
