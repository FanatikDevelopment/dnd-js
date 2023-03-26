import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import DemoScene from './DemoScene';

import { Renderer } from './engine';

/* eslint-disable-next-line */
export interface TerrainProps {}

export function Terrain(props: TerrainProps) {
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderer = useRef<Renderer | null>(null);
  const scene = useRef<DemoScene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    if (renderer.current || resizeObserver.current || scene.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('webgl2');
    if (!ctx) {
      return;
    }

    const resizeCanvas = () => {
      if (!canvasRef.current) {
        return;
      }

      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
      if (scene.current) {
        scene.current.resize();
      }
    };

    resizeCanvas();

    resizeObserver.current = new ResizeObserver(() => {
      resizeCanvas();
      renderer.current?.resizeViewport();
      scene.current?.render();
    });

    resizeObserver.current.observe(canvasRef.current);

    renderer.current = new Renderer(ctx, {
      clearBufferBits: ctx.COLOR_BUFFER_BIT,
    });

    scene.current = new DemoScene(renderer.current, {
      state: 'init',
    });

    renderer.current
      .init(() => scene.current!.init())
      .then(() => scene.current!.render());
  }, []);

  return (
    <Box width="100%" height="90vh">
      <canvas
        ref={canvasRef}
        style={{ border: 'solid 1px black', width: '100%', height: '100%' }}
      ></canvas>
    </Box>
  );
}

export default Terrain;
