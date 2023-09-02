export type VertexAttributeName = 'position' | 'uv' | 'normal' | 'color';
export type VertexAttributeTypeName =
  | 'float'
  | 'int'
  | 'uint'
  | 'short'
  | 'ushort'
  | 'byte'
  | 'ubyte';

export type MeshAttribute<T extends VertexAttributeName = VertexAttributeName> =
  {
    name: T;
    type: VertexAttributeTypeName;
    size: number;
    normalize: boolean;
  };

export type MeshPrimitiveName =
  | 'triangles'
  | 'triangle_strip'
  | 'triangle_fan'
  | 'lines'
  | 'line_strip'
  | 'line_loop'
  | 'points';

export interface MeshHeader<
  T extends VertexAttributeName = VertexAttributeName
> {
  primitive: MeshPrimitiveName;
  attributes: MeshAttribute<T>[];
  vertexCount: number;
  interlaced: boolean;
  indexed: boolean;
}

export type MeshHeaderOptions<
  T extends VertexAttributeName = VertexAttributeName
> = Partial<MeshHeader<T>>;

export interface BaseMesh<T extends VertexAttributeName = VertexAttributeName>
  extends MeshHeader<T> {
  readonly attribOffsets: Map<T, number>;
  readonly stride: number;
}
