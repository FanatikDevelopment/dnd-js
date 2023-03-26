import { vec4 } from 'gl-matrix';
import { Color } from '../types';
import RendererProxy from './RendererProxy';
import { color2vec4, isColor, vec42color } from './utils';

export interface BaseMaterialOptions {
  renderer: RendererProxy;
  baseColor: vec4 | Color;
  baseColorTexture: string;
}

export default class BaseMaterial {
  public readonly renderer: RendererProxy;

  private _baseColor: vec4;

  constructor(options: BaseMaterialOptions) {
    this.renderer = options.renderer;
    if (isColor(options.baseColor)) {
      this._baseColor = color2vec4(options.baseColor);
    } else {
      this._baseColor = options.baseColor;
    }
  }

  get baseColor(): Color {
    return vec42color(this._baseColor);
  }

  set baseColor(value: Color) {
    this._baseColor = color2vec4(value);
  }
}
