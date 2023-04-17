export type VertexAttributeName = 'position' | 'uv' | 'normal' | 'color';

export type Vertex<T extends VertexAttributeName = VertexAttributeName> = {
  [k in T]: number[] | undefined;
};

export interface MeshAttribute<
  T extends VertexAttributeName = VertexAttributeName
> {
  name: T;
  size: number;
  type: number;
  normalize: boolean;
}

export type MeshAttributeOptions<
  T extends VertexAttributeName = VertexAttributeName
> = Partial<MeshAttribute<T>>;

export type MeshPrimitive =
  | 'triangles'
  | 'triangle-fan'
  | 'triangle-strip'
  | 'lines'
  | 'line-loop'
  | 'line-strip'
  | 'points';

export interface MeshHeader<
  T extends VertexAttributeName = VertexAttributeName
> {
  primitive: MeshPrimitive;
  attributes: MeshAttribute<T>[];
  vertexCount: number;
  interlaced: boolean;
  indexed: boolean;
}

export type MeshHeaderOptions<
  T extends VertexAttributeName = VertexAttributeName
> = Partial<MeshHeader<T>>;
