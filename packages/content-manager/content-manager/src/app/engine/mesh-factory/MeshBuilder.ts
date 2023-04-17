import {
  MeshAttribute,
  MeshHeader,
  MeshHeaderOptions,
  MeshPrimitive,
  Vertex,
  VertexAttributeName,
} from './types';

/*
export interface MeshAttribute<
  T extends VertexAttributeName = VertexAttributeName
> {
  name: T;
  size: number;
  type: number;
  normalize: boolean;
}
*/

export interface MeshData<T extends VertexAttributeName = VertexAttributeName> {
  header: MeshHeader<T>;
  data: ArrayBuffer;
  indices?: ArrayBuffer;
}

export type MeshDataOptions<T extends VertexAttributeName = VertexAttributeName> {
  header?: MeshHeaderOptions<T>;
  data?: ArrayBuffer;
  indices?: ArrayBuffer;
}

export type MeshBuilderOptions<
  T extends VertexAttributeName = VertexAttributeName
> = Partial<MeshData<T>>;

export default class MeshBuilder<
  T extends VertexAttributeName = VertexAttributeName
> {
  private _base: MeshData<T>;
  private _result: Partial
  private _vertices: Vertex<T>[];

  constructor(options?: MeshBuilderOptions<T>) {
    this._base = {
      header: Object.assign<MeshHeader<T>, MeshHeaderOptions<T>>(
        {
          primitive: 'triangles',
          attributes: [],
          indexed: false,
          interlaced: false,
          vertexCount: Number.NaN,
        },
        options?.header ?? {}
      ),
      data: new ArrayBuffer(0),
    };
    this._header = Object.assign<MeshHeader<T>, MeshHeaderOptions<T>>(
      {
        primitive: 'triangles',
        attributes: [],
        indexed: false,
        interlaced: false,
        vertexCount: Number.NaN,
      },
      options?.header ?? {}
    );

    this._dataBuffers = options?.dataBuffers ?? [];
    this._vertices = options?.vertices ?? [];
  }

  get primitive(): MeshPrimitive {
    return this._header.primitive;
  }

  set primitive(value: MeshPrimitive) {
    this._header.primitive = value;
  }

  get indexed(): boolean {
    return this._header.indexed;
  }

  set indexed(value: boolean) {
    this._header.indexed = value;
  }

  get interlaced(): boolean {
    return this._header.interlaced;
  }

  set interlaced(value: boolean) {
    this._header.interlaced = value;
  }

  get vertexCount(): boolean {
    return this._header.interlaced;
  }

  set vertexCount(value: boolean) {
    this._header.interlaced = value;
  }

  get dataBuffers(): ArrayBuffer[] {
    return this._dataBuffers;
  }

  set dataBuffers(value: ArrayBuffer[]) {
    this._dataBuffers = value;
  }

  withAttribute(...attributes: MeshAttribute<T>[]): this {
    this._header.attributes.push(...attributes);
    return this;
  }

  withoutAttribute(...names: T[]): this {
    this._header.attributes = this._header.attributes.filter(
      (current) => !names.includes(current.name)
    );
    return this;
  }

  withData(...buffers: ArrayBuffer[]): this {
    this._dataBuffers.push(...buffers);
    return this;
  }

  withoutData(...indices: number[]): this {
    this._header.attributes = this._header.attributes.filter(
      (_, index) => !indices.includes(index)
    );
    return this;
  }
}
