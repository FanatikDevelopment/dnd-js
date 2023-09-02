import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RendererProxy } from '@dnd-js/render-engine';
import { Rect, RectOptions } from '../engine/math';
import { RootState } from '../store';

const rendererRegister = new Map<string, RendererProxy>();

export function registerRenderer(key: string, renderer: RendererProxy) {
  if (!key) {
    throw new Error('Cannot register renderer without a key');
  }

  rendererRegister.set(key, renderer);
}

export function unregisterRenderer(key: string): RendererProxy | undefined {
  const renderer = rendererRegister.get(key);
  rendererRegister.delete(key);
  return renderer;
}

export function tryGetRenderer(key?: string): RendererProxy | undefined {
  if (!key) {
    return undefined;
  }

  const result = rendererRegister.get(key);
  if (result) {
    return result;
  }

  return undefined;
}

export function getRenderer(key?: string): RendererProxy {
  if (!key) {
    throw new Error('Cannot get renderer without a key');
  }

  const result = tryGetRenderer(key);
  if (!result) {
    throw new Error(`Cannot get renderer with key '${key}'`);
  }

  return result;
}

export const RENDERER_FEATURE_KEY = 'renderer';

export interface RendererState {
  id?: string;
  viewport: Rect;
}

export const initialRendererState: RendererState = {
  viewport: { x: 0, y: 0, width: 800, height: 600 },
};

export const rendererSlice = createSlice({
  name: RENDERER_FEATURE_KEY,
  initialState: initialRendererState,
  reducers: {
    setRendererId: (state, action: PayloadAction<string>) => {
      getRenderer(action.payload);
      state.id = action.payload;
    },

    resizeRendererViewport: (state, action: PayloadAction<RectOptions>) => {
      const renderer = getRenderer(state.id);
      renderer.resizeViewport(action.payload);
    },
  },
});

export const selectRendererId = (state: RootState) =>
  (state[RENDERER_FEATURE_KEY] as RendererState).id;

export const selectRenderer = (state: RootState) =>
  tryGetRenderer((state[RENDERER_FEATURE_KEY] as RendererState).id);

export const selectRendererViewport = (state: RootState) =>
  (state[RENDERER_FEATURE_KEY] as RendererState).viewport;

export const { setRendererId, resizeRendererViewport } = rendererSlice.actions;

export default rendererSlice.reducer;
