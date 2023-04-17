import { useRef } from 'react';
import { TransformProxy } from '../engine/math';
import CameraProxy from '../engine/math/CameraProxy';

export interface Scene {
  camera: CameraProxy;
  transform: TransformProxy;
}

export default function useScene() {
  const scene = useRef<Scene>({
    camera: new CameraProxy({
      type: 'orthographic',
      position: [0, 0, 3],
      surface: { x: 0, y: 0, width: 800, height: 600 },
      target: [0, 0, 0],
      up: [0, 1, 0],
    }),
    transform: new TransformProxy(),
  });

  return {
    scene: scene.current,
    camera: scene.current.camera,
    transform: scene.current.transform,
  };
}
