import { Data } from 'ejs';
import {
  RendererProxy,
  ShaderProgramProxy,
  ShaderProgramProxyOptions,
} from '../core';
import { ShaderProps } from './types';
import {
  compileShaderTemplate,
  compileTemplate,
  fetchFileSync,
  formatShaderConfig,
} from './utils';

export default class ShaderProgramFactory {
  private _fileCache: Map<string, string>;

  constructor() {
    this._fileCache = new Map<string, string>();
  }

  get fileCache(): Map<string, string> {
    return this._fileCache;
  }

  async loadFile(path: string): Promise<string> {
    let file = this._fileCache.get(path);
    if (!file) {
      file = await fetch(path).then((r) => r.text());
      if (!file) {
        throw new Error('Unable to load file');
      }

      this._fileCache.set(path, file);
    }

    return file;
  }

  loadFileSync(path: string): string {
    let file = this._fileCache.get(path);
    if (!file) {
      file = fetchFileSync(path);
      if (!file) {
        throw new Error('Unable to load file');
      }

      this._fileCache.set(path, file);
    }

    return file;
  }

  async produceShader(
    props: ShaderProps,
    template: { path: string } | string
  ): Promise<string> {
    let str = '';
    if (typeof template === 'string') {
      str = template;
    } else {
      str = await this.loadFile(template.path);
    }

    const fileLoader = (path: string, data?: Data): string => {
      const template = this.loadFileSync(path);
      const compiled = compileTemplate(template, fileLoader);

      return compiled(data);
    };

    return compileShaderTemplate(
      str,
      fileLoader
    )({
      config: await formatShaderConfig(props),
    });
  }

  async produceProgram(
    renderer: RendererProxy,
    props: {
      vertex: { props: ShaderProps; template: { path: string } | string };
      fragment: { props: ShaderProps; template: { path: string } | string };
    } & Pick<
      ShaderProgramProxyOptions,
      'attributeLocations' | 'uniformLocations'
    >
  ): Promise<ShaderProgramProxy> {
    const shaderArr = [props.vertex, props.fragment];

    const [vertex, fragment] = await Promise.all(
      shaderArr.map(({ props, template }) =>
        this.produceShader(props, template)
      )
    );

    return new ShaderProgramProxy(renderer, {
      attributeLocations: [
        ...shaderArr
          .map<[string, number][]>((args) => {
            const { props } = args;
            const inputs = Object.entries(props.inputs);
            return inputs.map(([name, data]) => [name, data.location ?? -1]);
          })
          .flat(),
        ...(props.attributeLocations ?? []),
      ],
      uniformLocations: [
        ...shaderArr
          .map<[string, WebGLUniformLocation | null][]>(({ props }) => {
            const uniforms = Object.entries(props.uniforms);
            return uniforms.map(([name, data]) => [
              name,
              data.location ?? null,
            ]);
          })
          .flat(),
        ...(props.uniformLocations ?? []),
      ],
      sources: [
        {
          type: 'vertex',
          source: vertex,
        },
        {
          type: 'fragment',
          source: fragment,
        },
      ],
    });
  }
}
