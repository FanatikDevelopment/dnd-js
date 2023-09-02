import { vec2, vec3, vec4 } from 'gl-matrix';
import ColorProxy from './ColorProxy';
import QuatProxy from './QuatProxy';
import { Color, Quat, Vec2, Vec3, Vec4 } from './types';
import Vec2Proxy from './Vec2Proxy';
import Vec3Proxy from './Vec3Proxy';
import Vec4Proxy from './Vec4Proxy';

export function isVec2(o: any): o is Vec2 {
  return o instanceof Vec2Proxy || (o && 'x' in o && 'y' in o);
}

export function isVec3(o: any): o is Vec3 {
  return o instanceof Vec3Proxy || (o && 'x' in o && 'y' in o && 'z' in o);
}

export function isQuat(o: any): o is Quat {
  return (
    o instanceof QuatProxy ||
    (o && 'x' in o && 'y' in o && 'z' in o && 'w' in o)
  );
}

export function isVec4(o: any): o is Vec4 {
  return (
    o instanceof Vec4Proxy ||
    (o && 'x' in o && 'y' in o && 'z' in o && 'w' in o)
  );
}

export function isColor(o: any): o is Color {
  return (
    o instanceof ColorProxy ||
    (o && 'r' in o && 'g' in o && 'b' in o && 'a' in o)
  );
}

export function isVec2Options(o: any): o is Vec2 {
  return o && ('x' in o || 'y' in o);
}

export function isVec3Options(o: any): o is Vec3 {
  return o && ('x' in o || 'y' in o || 'z' in o);
}

export function isQuatOptions(o: any): o is Quat {
  return o && ('x' in o || 'y' in o || 'z' in o || 'w' in o);
}

export function isVec4Options(o: any): o is Vec4 {
  return o && ('x' in o || 'y' in o || 'z' in o || 'w' in o);
}

export function isColorOptions(o: any): o is Color {
  return o && ('r' in o || 'g' in o || 'b' in o || 'a' in o);
}

export function color2vec4({ r, g, b, a }: Color): vec4 {
  return [r, g, b, a];
}

export function vec42color([r, g, b, a]: vec4): Color {
  return { r, g, b, a };
}

export function toPolarCoordinates(
  v: vec2,
  options?: {
    origin: vec2;
  }
): vec2 {
  const buffer = options?.origin ?? vec2.zero(vec2.create());

  return vec2.sub(
    buffer,
    vec2.set(vec2.create(), vec2.len(v), Math.atan2(v[1], v[0])),
    buffer
  );
}

export function fromPolarCoordinates(
  v: vec2,
  options?: {
    origin: vec2;
  }
): vec2 {
  const buffer = options?.origin ?? vec2.zero(vec2.create());

  return vec2.add(
    buffer,
    vec2.set(vec2.create(), v[0] * Math.cos(v[1]), v[0] * Math.sin(v[1])),
    buffer
  );
}

export function toCylindricalCoordinates(
  v: vec3,
  options?: {
    origin: vec3;
  }
): vec3 {
  const buffer = options?.origin ?? vec3.zero(vec3.create());
  const [x, y, z] = v;
  const rho = vec2.len([x, y]);

  let phy = 0;
  if (x === 0 && y === 0) {
    throw new Error('Cannot convert from cylindrical coordinates: bad input');
  }

  phy = Math.asin(y / rho);
  if (x < 0) {
    phy = Math.PI - phy;
  }

  return vec3.sub(buffer, vec3.set(vec3.create(), rho, phy, z), buffer);
}

export function fromCylindricalCoordinates(
  v: vec3,
  options?: {
    origin: vec3;
  }
): vec3 {
  const buffer = options?.origin ?? vec3.zero(vec3.create());

  return vec3.add(
    buffer,
    vec3.set(vec3.create(), v[0] * Math.cos(v[1]), v[0] * Math.sin(v[1]), v[2]),
    buffer
  );
}

export function toSphericalCoordinates(
  v: vec3,
  options?: {
    origin: vec3;
  }
): vec3 {
  const buffer = options?.origin ?? vec3.zero(vec3.create());
  const [x, y, z] = v;
  const rho = vec3.len(v);
  const theta = Math.acos(z / rho);

  let phy = 0;
  if (x === 0) {
    if (y === 0) {
      throw new Error('Cannot convert from spherical coordinates: bad input');
    }

    phy = Math.PI / (y < 0 ? -2 : 2);
  } else if (x > 0) {
    phy = Math.atan(y / x);
  } else {
    phy = Math.atan(y / x) + (y < 0 ? -Math.PI : Math.PI);
  }

  return vec3.sub(buffer, vec3.set(vec3.create(), rho, theta, phy), buffer);
}

export function fromSphericalCoordinates(
  v: vec3,
  options?: {
    origin: vec3;
  }
): vec3 {
  const buffer = options?.origin ?? vec3.zero(vec3.create());
  const [rho, theta, phy] = v;

  return vec3.add(
    buffer,
    vec3.set(
      vec3.create(),
      rho * Math.sin(theta) * Math.cos(phy),
      rho * Math.sin(theta) * Math.sin(phy),
      rho * Math.cos(theta)
    ),
    buffer
  );
}

export function cylindricalToSpherical(
  v: vec3,
  options?: {
    origin: vec3;
  }
): vec3 {
  const buffer = options?.origin ?? vec3.zero(vec3.create());
  const [rho, phy, z] = v;
  const rhoS = vec2.len([rho, z]);
  const theta = Math.atan(rho / z);

  return vec3.add(buffer, vec3.set(vec3.create(), rhoS, theta, phy), buffer);
}

export function sphericalToCylindrical(
  v: vec3,
  options?: {
    origin: vec3;
  }
): vec3 {
  const buffer = options?.origin ?? vec3.zero(vec3.create());
  const [rho, theta, phy] = v;
  const rhoC = rho * Math.sin(theta);
  const z = rho * Math.cos(theta);

  return vec3.add(buffer, vec3.set(vec3.create(), rhoC, phy, z), buffer);
}

export function rowMapper<T>(
  inPoints: T[],
  outPoints: T[],
  options?: { loop?: boolean }
): number[][] {
  const result: number[][] = [];
  let i = 0;
  let j = 0;
  const imax = inPoints.length;
  const jmax = outPoints.length;
  for (
    let index = 0, indexMax = Math.min(imax, jmax);
    index < indexMax;
    ++index, ++i, ++j
  ) {
    result.push(
      [index, 0],
      [index, 1],
      [index + 1, 1],
      [index, 0],
      [index + 1, 1],
      [index + 1, 0]
    );
  }

  for (let index = j; index < jmax; ++index, ++j) {
    result.push([i, 0], [index, 1], [index + 1, 1]);
  }

  for (let index = i; index < imax; ++index, ++i) {
    result.push([index, 0], [j, 1], [index + 1, 0]);
  }

  if (options?.loop) {
    const left = result.slice(-2);
    const right = result.slice(0, 2);
    result.push(left[0], left[1], right[1], left[0], right[1], right[0]);
  }

  return result;
}

export function vertexGridIndices<T>(
  grid: T[][],
  options?: {
    loop?: boolean;
  }
) {
  const indices2d: number[][] = [];
  for (let y = 0, y0Max = grid.length - 1; y < y0Max; ++y) {
    indices2d.push(
      ...rowMapper(grid[y], grid[y + 1], options).map(([x, oldY]) => [
        x,
        y + oldY,
      ])
    );
  }

  const rowWidths = grid.map((current) => current.length);
  const rowOffsets = rowWidths
    .reduce(
      (result, current) => [...result, result.slice(-1)[0] + current],
      [0]
    )
    .slice(1);

  return indices2d.map((current) => current[0] + rowOffsets[current[1]]);
}

export function getLinePoint(pts: [vec3, vec3], factor: number): vec3 {
  const buffer = vec3.create();
  return vec3.lerp(buffer, pts[0], pts[1], factor);
}

export function getFaceNormal(pts: [vec3, vec3, vec3]) {
  return vec3.cross(
    vec3.create(),
    vec3.sub(vec3.create(), pts[0], pts[1]),
    vec3.sub(vec3.create(), pts[1], pts[2])
  );
}

export function getProjectedPoint(p: vec3, line: [vec3, vec3]) {
  const v = vec3.sub(vec3.create(), line[1], line[0]);
  const lineToP = vec3.sub(vec3.create(), p, line[0]);
  const buffer1 = vec3.create();
  const buffer2 = vec3.create();

  return vec3.mul(
    buffer2,
    vec3.div(buffer1, vec3.mul(buffer1, lineToP, v), vec3.mul(buffer2, v, v)),
    v
  );
}

export function getSquareDistancePointLine(p: vec3, line: [vec3, vec3]) {
  const lineToP = vec3.sub(vec3.create(), p, line[0]);
  const projP = getProjectedPoint(p, line);
  return vec3.sub(
    vec3.create(),
    vec3.mul(lineToP, lineToP, lineToP),
    vec3.mul(projP, projP, projP)
  );
}

/* export function getDistancePointLine(p: vec3, line: [vec3, vec3]) {
  return (
    vec3.create(),
    vec3.mul(lineToP, lineToP, lineToP),
    vec3.mul(projP, projP, projP)
  );
} */

export function getCenter(
  pts: vec3[],
  options: {
    weights?: number[] | ((v: vec3, index: number, arr: vec3[]) => number);
  }
) {
  let weightCb: (v: vec3, index: number, arr: vec3[]) => number = () => 1.0;
  if (options?.weights) {
    if (typeof options.weights === 'function') {
      weightCb = options.weights;
    } else if (Array.isArray(options.weights)) {
      weightCb = (_: vec3, index: number) =>
        (options.weights as number[])[index];
    }
  }

  const result = vec3.zero(vec3.create());
  const buffer = vec3.zero(vec3.create());
  let weightTotal = 0;
  pts.forEach((current, index, arr) => {
    const w = weightCb(current, index, arr);
    vec3.add(result, result, vec3.scale(buffer, current, w));
    weightTotal += w;
  });

  return vec3.scale(result, result, 1 / weightTotal);
}
