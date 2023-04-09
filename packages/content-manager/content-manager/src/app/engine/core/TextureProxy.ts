import { TextureOptions } from '../types';

export interface TextureProxyOptions extends TextureOptions {}

export default class TextureProxy {
  constructor(
    public readonly renderer: Renderer,
    options: TextureProxyOptions
  ) {}
}
