export const planeVertices: [number, number, number][] = [
  [0, 0, 0], // 0
  [0, 0, 1], // 1
  [1, 0, 0], // 2
  [1, 0, 1], // 3
];

export const planeUvs: [number, number][] = [
  [0, 0], // 0
  [0, 1], // 1
  [1, 0], // 2
  [1, 1], // 3
];

export const planeIndices: number[] = [0, 1, 2, 2, 1, 3];

export const circleVertices = (count: number): [number, number, number][] => {
  const angle = (2 * Math.PI) / count;
  const result: [number, number, number][] = [[0, 0, 0]];
  result.push(
    ...[...Array(count + 1)].map((_, index): [number, number, number] => [
      Math.cos(index * angle),
      0,
      Math.sin(index * angle),
    ])
  );

  return result;
};

export const circleIndices = (count: number): number[] => {
  const result = [...Array(count)]
    .map((_, index) => [0, index + 1, index + 2])
    .flat();

  result[result.length - 1] = 1;
  return result;
};

export const cubeVertices: [number, number, number][] = [
  //Front
  [0, 0, 1], // 0
  [1, 0, 1], // 1
  [0, 1, 1], // 2
  [1, 1, 1], // 3

  //Back
  [1, 0, 0], // 4
  [0, 0, 0], // 5
  [1, 1, 0], // 6
  [0, 1, 0], // 7

  //Left
  [0, 0, 0], // 5
  [0, 0, 1], // 0
  [0, 1, 0], // 7
  [0, 1, 1], // 2

  //Right
  [1, 0, 1], // 1
  [1, 0, 0], // 4
  [1, 1, 1], // 3
  [1, 1, 0], // 6

  //Bottom
  [0, 0, 0], // 5
  [1, 0, 0], // 4
  [0, 0, 1], // 0
  [1, 0, 1], // 1

  //Top
  [1, 1, 0], // 6
  [0, 1, 0], // 7
  [1, 1, 1], // 3
  [0, 1, 1], // 2
].map(([x, y, z]) => [x - 0.5, y - 0.5, z - 0.5]);

export const cubeUvs: [number, number][] = [...Array(6)]
  .map<[number, number][]>(() => [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ])
  .flat();

export const cubeNormals = [
  [0, 0, 1],
  [0, 0, -1],
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
].reduce<[number, number, number][]>((result, current) => {
  result.push(
    ...[...Array(4)].map<[number, number, number]>(
      () => current as [number, number, number]
    )
  );
  return result;
}, []);

export const cubeIndices = [...Array(6)]
  .map((_, index: number) => {
    const offset = index * 4;
    return [offset, offset + 1, offset + 2, offset + 2, offset + 1, offset + 3];
  })
  .flat();

export interface MeshData {
  positions: [number, number, number][];
  normals: [number, number, number][];
  uvs: [number, number][];
  indices: number[];
}

export function createCube({ size }: { size?: number }): MeshData {
  return {
    positions: cubeVertices.map(([x, y, z]) => [
      x * (size ?? 1),
      y * (size ?? 1),
      z * (size ?? 1),
    ]),
    normals: cubeNormals.map(([x, y, z]) => [x, y, z]),
    uvs: cubeUvs.map(([t, s]) => [t, s]),
    indices: cubeIndices,
  };
}

export function meshToArray(
  meshData: MeshData,
  {
    interlaced,
    layout,
    indexed,
  }: {
    interlaced?: boolean;
    indexed?: boolean;
    layout: Exclude<keyof MeshData, 'indices'>[];
  }
): Float32Array {
  const selector =
    (component: Exclude<keyof MeshData, 'indices'>) =>
    (index: number): number[] =>
      meshData[component][index];

  const selectors = layout.map((current) => selector(current));
  const indices = indexed ? [...new Set(meshData.indices)] : meshData.indices;

  const browse = () => {
    if (interlaced) {
      return indices.map((index) => {
        return selectors.map((f) => f(index));
      });
    }

    return selectors.map((f) => indices.map((index) => f(index)));
  };

  const data = browse();

  return new Float32Array(data.flat(2));
}
