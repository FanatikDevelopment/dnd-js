import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CameraOptions,
  RectOptions,
  TransformOptions,
  TransformProxy,
} from '../engine/math';

import { CameraProxy } from '@dnd-js/render-engine';
import { RootState } from '../store';
import { getRenderer } from './renderer.slice';

interface SceneProxy {
  camera: CameraProxy;
  transform: TransformProxy;
}

const sceneRegister = new Map<string, SceneProxy>();

export function registerScene(key: string, scene: SceneProxy) {
  if (!key) {
    throw new Error('Cannot register scene without a key');
  }

  sceneRegister.set(key, scene);
}

export function unregisterScene(key: string): SceneProxy | undefined {
  const scene = sceneRegister.get(key);
  sceneRegister.delete(key);
  return scene;
}

export function tryGetScene(key?: string): SceneProxy | undefined {
  if (!key) {
    return undefined;
  }

  const result = sceneRegister.get(key);
  if (result) {
    return result;
  }

  return undefined;
}

export function getScene(key?: string): SceneProxy {
  if (!key) {
    throw new Error('Cannot get scene without a key');
  }

  const result = tryGetScene(key);
  if (!result) {
    throw new Error(`Cannot get scene with key '${key}'`);
  }

  return result;
}

export const SCENE_FEATURE_KEY = 'scene';

/*
 * Update these interfaces according to your requirements.
 */
export interface SceneState {
  rendererId?: string;
  sceneId?: string;
}

export const initialSceneState: SceneState = {};

export const sceneSlice = createSlice({
  name: SCENE_FEATURE_KEY,
  initialState: initialSceneState,
  reducers: {
    initScene: (
      state,
      action: PayloadAction<{ rendererId: string; sceneId: string }>
    ) => {
      const renderer = getRenderer(action.payload.rendererId);
      const scene = getScene(action.payload.sceneId);
      state.rendererId = action.payload.rendererId;
      state.sceneId = action.payload.sceneId;
      scene.camera.setOptions({
        surface: {
          width: renderer.canvas.width,
          height: renderer.canvas.height,
        },
      });
    },

    resizeScene: (state, action: PayloadAction<RectOptions>) => {
      const scene = getScene(state.sceneId);
      scene.camera.setOptions({ surface: action.payload });
    },

    updateCamera: (state, action: PayloadAction<CameraOptions>) => {
      const scene = getScene(state.sceneId);
      scene.camera.setOptions(action.payload);
    },

    updateTransform: (state, action: PayloadAction<TransformOptions>) => {
      const scene = getScene(state.sceneId);
      scene.transform.setOptions(action.payload);
    },
  },
});

export const { initScene, resizeScene, updateCamera, updateTransform } =
  sceneSlice.actions;

export const selectSceneRendererId = (state: RootState) =>
  (state[SCENE_FEATURE_KEY] as SceneState).rendererId;

export const selectSceneId = (state: RootState) =>
  (state[SCENE_FEATURE_KEY] as SceneState).sceneId;

export const selectSceneCamera = (state: RootState) =>
  tryGetScene((state[SCENE_FEATURE_KEY] as SceneState).sceneId)?.camera;

export const selectSceneTransform = (state: RootState) =>
  tryGetScene((state[SCENE_FEATURE_KEY] as SceneState).sceneId)?.transform;

export default sceneSlice.reducer;
