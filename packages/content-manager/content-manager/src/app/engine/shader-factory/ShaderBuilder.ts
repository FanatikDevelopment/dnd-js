import {
  ShaderConstProps,
  ShaderInputProps,
  ShaderOutputProps,
  ShaderProps,
  ShaderSnippetProps,
  ShaderStructProps,
  ShaderUniformProps,
} from '../shader-factory/types';

export default class ShaderBuilder {
  public readonly base: ShaderProps;

  private config: Partial<ShaderProps>;

  constructor(props?: Partial<ShaderProps>) {
    this.base = Object.assign<ShaderProps, Partial<ShaderProps>>(
      {
        structs: {},
        consts: {},
        inputs: {},
        uniforms: {},
        outputs: {},
        headers: [],
        sources: [],
        main: [],
      },
      props ?? {}
    );

    this.config = {};
  }

  reset(): void {
    this.config = {};
  }

  get types(): Record<string, ShaderStructProps> {
    this.config.structs = this.config.structs ?? { ...this.base.structs };

    return this.config.structs;
  }

  set structs(value: Record<string, ShaderStructProps>) {
    this.config.structs = value;
  }

  get consts(): Record<string, ShaderConstProps> {
    this.config.consts = this.config.consts ?? { ...this.base.consts };

    return this.config.consts;
  }

  set consts(value: Record<string, ShaderConstProps>) {
    this.config.consts = value;
  }

  get inputs(): Record<string, ShaderInputProps> {
    this.config.inputs = this.config.inputs ?? { ...this.base.inputs };

    return this.config.inputs;
  }

  set inputs(value: Record<string, ShaderInputProps>) {
    this.config.inputs = value;
  }

  get uniforms(): Record<string, ShaderUniformProps> {
    this.config.uniforms = this.config.uniforms ?? { ...this.base.uniforms };

    return this.config.uniforms;
  }

  set uniforms(value: Record<string, ShaderUniformProps>) {
    this.config.uniforms = value;
  }

  get outputs(): Record<string, ShaderOutputProps> {
    this.config.outputs = this.config.outputs ?? { ...this.base.outputs };

    return this.config.outputs;
  }

  set outputs(value: Record<string, ShaderOutputProps>) {
    this.config.outputs = value;
  }

  get headers(): ShaderSnippetProps[] {
    this.config.headers = this.config.headers ?? [...this.base.headers];

    return this.config.headers;
  }

  set headers(value: ShaderSnippetProps[]) {
    this.config.headers = value;
  }

  get sources(): ShaderSnippetProps[] {
    this.config.sources = this.config.sources ?? [...this.base.sources];

    return this.config.sources;
  }

  set sources(value: ShaderSnippetProps[]) {
    this.config.sources = value;
  }

  get main(): ShaderSnippetProps[] {
    this.config.main = this.config.main ?? [...this.base.main];

    return this.config.main;
  }

  set main(value: ShaderSnippetProps[]) {
    this.config.main = value;
  }

  withStructs(...structs: Record<string, ShaderStructProps>[]): this {
    this.structs = Object.assign(this.structs, ...structs);
    return this;
  }

  withoutStructs(...structs: string[]): this {
    this.structs = Object.fromEntries(
      Object.entries(this.structs).filter(([key]) => !structs.includes(key))
    );
    return this;
  }

  withConsts(...consts: Record<string, ShaderConstProps>[]): this {
    this.consts = Object.assign(this.consts, ...consts);
    return this;
  }

  withoutConsts(...consts: string[]): this {
    this.consts = Object.fromEntries(
      Object.entries(this.consts).filter(([key]) => !consts.includes(key))
    );
    return this;
  }

  withInputs(...inputs: Record<string, ShaderInputProps>[]): this {
    this.inputs = Object.assign(this.inputs, ...inputs);
    return this;
  }

  withoutInputs(...inputs: string[]): this {
    this.inputs = Object.fromEntries(
      Object.entries(this.inputs).filter(([key]) => !inputs.includes(key))
    );
    return this;
  }

  withUniforms(...uniforms: Record<string, ShaderUniformProps>[]): this {
    this.uniforms = Object.assign(this.uniforms, ...uniforms);
    return this;
  }

  withoutUniforms(...uniforms: string[]): this {
    this.uniforms = Object.fromEntries(
      Object.entries(this.uniforms).filter(([key]) => !uniforms.includes(key))
    );
    return this;
  }

  withOutputs(...outputs: Record<string, ShaderOutputProps>[]): this {
    this.outputs = Object.assign(this.outputs, ...outputs);
    return this;
  }

  withoutOutputs(...outputs: string[]): this {
    this.outputs = Object.fromEntries(
      Object.entries(this.outputs).filter(([key]) => !outputs.includes(key))
    );
    return this;
  }

  withHeaders(...headers: ShaderSnippetProps[]): this {
    this.headers.push(...headers);
    return this;
  }

  withSources(...sources: ShaderSnippetProps[]): this {
    this.sources.push(...sources);
    return this;
  }

  withMain(...main: ShaderSnippetProps[]): this {
    this.main.push(...main);
    return this;
  }

  withFragments(...fragments: Partial<ShaderProps>[]): this {
    fragments.forEach(({ headers, sources, ...fragment }) => {
      for (const key in fragment) {
        Object.assign(
          this[key as keyof ShaderBuilder],
          fragment[key as keyof Omit<ShaderProps, 'headers' | 'sources'>]
        );
      }

      this.headers.push(...(headers ?? []));
      this.sources.push(...(sources ?? []));
    });
    return this;
  }

  build(): ShaderProps {
    return Object.assign({}, this.base, this.config) as ShaderProps;
  }
}
