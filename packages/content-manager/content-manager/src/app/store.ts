import { configureStore } from '@reduxjs/toolkit';
import rendererReducer, {
  RENDERER_FEATURE_KEY,
} from './features/renderer.slice';

import sceneReducer, { SCENE_FEATURE_KEY } from './features/scene.slice';

export const store = configureStore({
  reducer: {
    [RENDERER_FEATURE_KEY]: rendererReducer,
    [SCENE_FEATURE_KEY]: sceneReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
