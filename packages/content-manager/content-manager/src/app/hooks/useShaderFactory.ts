import React, { useRef } from 'react';
import { RendererProxy, ShaderProgramProxy } from '../engine/core';
import { ShaderProps } from '../engine/shader-factory/types';
import ShaderProgramFactory from '../engine/shader-factory/ShaderProgramFactory';

type Props = {
  renderer: RendererProxy | null;
};

export default function useShaderFactory({ renderer }: Props) {
  const factory = useRef<ShaderProgramFactory>(new ShaderProgramFactory());
  const programs = useRef<Map<string, ShaderProgramProxy>>(
    new Map<string, ShaderProgramProxy>()
  );

  const createShaderProgram = async ({
    name,
    vertex,
    fragment,
  }: {
    name: string;
    vertex: { props: ShaderProps; template: string | { path: string } };
    fragment: { props: ShaderProps; template: string | { path: string } };
  }) => {
    if (!renderer) {
      return null;
    }

    const prog = await factory.current.produceProgram(renderer, {
      vertex,
      fragment,
    });

    programs.current.set(name, prog);
    return prog;
  };

  return {
    shaderFactory: factory.current,
    shaderPrograms: programs.current,
    createShaderProgram,
  };
}
