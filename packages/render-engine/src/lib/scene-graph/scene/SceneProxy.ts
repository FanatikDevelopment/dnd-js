import { Transform } from '../transform';
import { z } from 'zod';

const indexSchema = z.number().int().finite().nonnegative();

const vectorSchema = z.number().finite().array();
const matrixSchema = vectorSchema.length(16);
const vec3Schema = vectorSchema.length(3);
const quatSchema = vectorSchema.length(4);
const transformSchema = z.object({
  translation: vec3Schema,
  rotation: quatSchema,
  scale: vec3Schema,
});

const nodeSchema = z.object({
  children: indexSchema.array(),
});

const worldMatrix = z.object({ matrix: matrixSchema });

const gltfSchema = z.object({
  scene: indexSchema,
  scenes: z.object({ nodes: indexSchema.array() }),
  node: z
    .object({
      children: indexSchema.array(),
    })
    .merge(transformSchema),
});

interface SceneNode {
  id: number;
  children: SceneNode[];
  transform: Transform;
  meshId?: number;
  skinId?: number;
  cameraId?: number;
}

type MeshMorphTarget = Record<string, number>;

interface MeshPrimitive {
  mode: number;
  indices: number;
  attributes: Map<string, number>;
  materialId: number;
  targets?: MeshMorphTarget[];
}

interface Mesh {
  primitives: MeshPrimitive[];
  weight?: number[];
}

interface BufferView {
  bufferId: number;
  byteOffset: number;
  byteLength: number;
  byteStride?: number;
  target?: number;
}

interface Accessor {
  bufferViewId?: number;
  byteOffset: number;
  type: string;
  componentType: number;
  count: number;
  min: number[];
  max: number[];
}

interface SparseAccessor {
  count: number;
  values: {
    bufferViewId: number;
  };
  min: number[];
  max: number[];
}

export default class SceneProxy {
  constructor(public root: SceneNode) {}
}
