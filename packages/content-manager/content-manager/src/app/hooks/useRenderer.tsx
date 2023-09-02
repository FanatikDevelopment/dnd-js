import { useEffect, useRef } from 'react';
import { registerRenderer } from '../features/renderer.slice';

import { RendererProxy, RendererOptions } from '@dnd-js/render-engine';

function initCanvas(
  canvas: HTMLCanvasElement
): WebGL2RenderingContext | undefined {
  const ctx = canvas.getContext('webgl2');
  if (!ctx) {
    return;
  }

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  return ctx;
}

export function useRenderer({
  elm,
  options,
}: {
  elm: React.MutableRefObject<HTMLCanvasElement | null>;
  options?: RendererOptions;
}) {
  const rendererRef = useRef<RendererProxy | null>(null);

  useEffect(() => {
    if (elm.current === null || rendererRef.current) {
      return;
    }

    const canvas = elm.current;
    const ctx = initCanvas(canvas);
    if (!ctx) {
      return;
    }

    rendererRef.current = new RendererProxy(ctx, options);
    registerRenderer('editor', rendererRef.current);
  }, [elm, options]);

  return { renderer: rendererRef.current };
}
