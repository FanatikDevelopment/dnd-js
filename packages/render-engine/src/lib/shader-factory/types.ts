import { Data } from 'ejs';

export type ShaderVarProps = {
  type: string;
  dimensions?: number[];
  value?: string;
};

export type ShaderVarRole = 'in' | 'out' | 'uniform';

export type ShaderConstProps = ShaderVarProps &
  Required<Pick<ShaderVarProps, 'value'>>;

export type ShaderQualifiedVarProps = Omit<ShaderVarProps, 'value'> & {
  location?: number;
};

export type ShaderInputProps = ShaderQualifiedVarProps;

export type ShaderOutputProps = ShaderQualifiedVarProps;

export type ShaderUniformProps = ShaderQualifiedVarProps;

export type ShaderStructProps = Record<string, ShaderVarProps>;

export type ShaderInternalSnippetProps = { source: string; data?: Data };
export type ShaderExternalSnippetProps = { path: string; data?: Data };

export type ShaderSnippetProps =
  | ShaderInternalSnippetProps
  | ShaderExternalSnippetProps;

export interface ShaderProps {
  structs: Record<string, ShaderStructProps>;
  consts: Record<string, ShaderConstProps>;
  inputs: Record<string, ShaderInputProps>;
  uniforms: Record<string, ShaderUniformProps>;
  outputs: Record<string, ShaderOutputProps>;
  headers: ShaderSnippetProps[];
  sources: ShaderSnippetProps[];
  main: ShaderSnippetProps[];
}

export interface ShaderTemplateConfig {
  meta: string;
  vars: {
    structs: string[];
    consts: string[];
    inputs: string[];
    uniforms: string[];
    outputs: string[];
  };
  head: string;
  body: string;
}
