import {
  BaseMesh,
  MeshAttribute,
  MeshHeader,
  MeshHeaderOptions,
  MeshPrimitiveName,
  VertexAttributeName,
} from './types';
import { vertexAttributeTypeSize } from './utils';

export default class MeshProxy<
  T extends VertexAttributeName = VertexAttributeName
> implements BaseMesh<T>
{
  public primitive: MeshPrimitiveName;
  private _attributes: MeshAttribute<T>[];
  public _vertexCount: number;
  public _interlaced: boolean;
  public _indexed: boolean;
  private _attribOffsets: Map<T, number>;
  private _stride: number;
  private _data: number[][];

  constructor(options: MeshHeaderOptions<T>) {
    this.primitive = options.primitive ?? 'triangles';
    this._attributes = options.attributes ?? [];
    this._vertexCount = options.vertexCount ?? 0;
    this._interlaced = options.interlaced ?? true;
    this._indexed = options.indexed ?? false;
    this._attribOffsets = new Map<T, number>();
    this._stride = 0;
    this._data = [];
  }

  get attributes(): MeshAttribute<T>[] {
    return this._attributes;
  }

  set attributes(value: MeshAttribute<T>[]) {
    this._attributes = value;
  }

  get vertexCount(): number {
    return this._vertexCount;
  }

  set vertexCount(value: number) {
    this._vertexCount = value;
  }

  get interlaced(): boolean {
    return this._interlaced;
  }

  set interlaced(value: boolean) {
    this._interlaced = value;
  }
  get indexed(): boolean {
    return this._indexed;
  }

  set indexed(value: boolean) {
    this._indexed = value;
  }

  get attribOffsets(): Map<T, number> {
    return this._attribOffsets;
  }

  get stride(): number {
    return this._stride;
  }

  mapFields(): void {
    this._stride = this.attributes.reduce((result, { name, type, size }) => {
      this._attribOffsets.set(name, result);
      return result + vertexAttributeTypeSize(type) * size;
    }, 0);
  }
}

class VertexProxy {
  private _offset: number;
  private _fieldIndices: Map<VertexAttributeName, number>;
  constructor(public readonly mesh: MeshProxy, offset: number) {
    this._offset = offset;
    this._fieldIndices = new Map<VertexAttributeName, number>();
  }
}
