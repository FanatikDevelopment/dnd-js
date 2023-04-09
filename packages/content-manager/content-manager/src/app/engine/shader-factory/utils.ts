import { AsyncClientFunction, compile, Data } from 'ejs';

import {
  ShaderInputProps,
  ShaderInternalSnippetProps,
  ShaderOutputProps,
  ShaderProps,
  ShaderQualifiedVarProps,
  ShaderSnippetProps,
  ShaderStructProps,
  ShaderTemplateConfig,
  ShaderUniformProps,
  ShaderVarProps,
} from './types';

export function formatShaderVar(name: string, v: ShaderVarProps): string {
  const formattedValue = v.value ? ` = ${v.value}` : '';

  return `${v.type} ${name}${(v.dimensions ?? [])
    .map((current) => `[${current}]`)
    .join('')}${formattedValue};`;
}

export function formatShaderStruct(name: string, s: ShaderStructProps): string {
  const members: string[] = [];
  for (const m in s) {
    members.push(formatShaderVar(m, s[m]));
  }

  return `struct ${name} {
  ${members.join('\n  ')}
}`;
}

export function formatShaderQualifiedVar(
  name: string,
  role: 'in' | 'out' | 'uniform',
  v: ShaderQualifiedVarProps
): string {
  const layout =
    v.location !== undefined ? `layout(location=${v.location}) ` : '';
  return `${layout}${role} ${formatShaderVar(name, v)}`;
}

export const formatShaderInput = (name: string, v: ShaderInputProps): string =>
  formatShaderQualifiedVar(name, 'in', v);

export const formatShaderOutput = (
  name: string,
  v: ShaderOutputProps
): string => formatShaderQualifiedVar(name, 'out', v);

export const formatShaderUniform = (
  name: string,
  v: ShaderUniformProps
): string => formatShaderQualifiedVar(name, 'uniform', v);

export async function fetchSnippets(
  snippets: ShaderSnippetProps[]
): Promise<ShaderInternalSnippetProps[]> {
  return Promise.all(
    snippets.map(async (snippet) => {
      if ('source' in snippet) {
        return snippet;
      }

      return fetch(snippet.path)
        .then((r) => r.text())
        .then((source) => ({ source, data: snippet.data }));
    })
  );
}

export function fetchFileSync(path: string): string {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', path, false);
  xhr.send(null);

  if (xhr.status === 200) {
    return xhr.responseText;
  }

  throw new Error('failed to get file ' + path);
}

export function defaultFileLoader(path: string, data?: Data): string {
  const template = fetchFileSync(path);
  const compiled = compileTemplate(template, defaultFileLoader);

  return compiled(data);
}

export function compileTemplate<T>(
  str: string,
  fileLoader: (path: string, data?: Data) => string = defaultFileLoader
): (data: T) => string {
  const result = compile(str, { client: true });

  return (data: T) => result(data as Data, undefined, fileLoader);
}

export function compileShaderTemplate(
  str: string,
  fileLoader: (path: string, data?: Data) => string = defaultFileLoader
): (conf: { config: ShaderTemplateConfig }) => string {
  return compileTemplate<{ config: ShaderTemplateConfig }>(str, fileLoader);
}

export async function formatShaderConfig(
  shader: ShaderProps
): Promise<ShaderTemplateConfig> {
  const headers = fetchSnippets(shader.headers);
  const sources = fetchSnippets(shader.sources);
  const main = fetchSnippets(shader.main);
  return {
    meta: (await headers)
      .map(({ source, data }) => compileTemplate(source)(data))
      .join('\n'),
    vars: {
      structs: Object.entries(shader.structs).map(([key, t]) =>
        formatShaderStruct(key, t)
      ),
      consts: Object.entries(shader.consts).map(([key, v]) =>
        formatShaderVar(key, v)
      ),
      inputs: Object.entries(shader.inputs).map(([key, v]) =>
        formatShaderInput(key, v)
      ),
      uniforms: Object.entries(shader.uniforms).map(([key, v]) =>
        formatShaderUniform(key, v)
      ),
      outputs: Object.entries(shader.outputs).map(([key, v]) =>
        formatShaderOutput(key, v)
      ),
    },
    head: (await sources)
      .map(({ source, data }) => compileTemplate(source)(data))
      .join('\n'),
    body: (await main)
      .map(({ source, data }) => compileTemplate(source)(data))
      .join('\n'),
  };
}
