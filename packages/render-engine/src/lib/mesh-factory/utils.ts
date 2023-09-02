import { MeshPrimitiveName, VertexAttributeTypeName } from './types';

export function vertexAttributeTypeToGL(
  type: VertexAttributeTypeName,
  gl: WebGL2RenderingContext
): number {
  switch (type) {
    case 'float':
      return gl.FLOAT;
    case 'int':
      return gl.INT;
    case 'uint':
      return gl.UNSIGNED_INT;
    case 'short':
      return gl.SHORT;
    case 'ushort':
      return gl.UNSIGNED_SHORT;
    case 'byte':
      return gl.BYTE;
    case 'ubyte':
      return gl.UNSIGNED_BYTE;
  }
}

export function vertexAttributeTypeSize(type: VertexAttributeTypeName): number {
  switch (type) {
    case 'float':
    case 'int':
    case 'uint':
      return 4;
    case 'short':
    case 'ushort':
      return 2;
    case 'byte':
    case 'ubyte':
      return 1;
  }
}

export function meshPrimitiveNameToGL(
  primitive: MeshPrimitiveName,
  gl: WebGL2RenderingContext
): number {
  switch (primitive) {
    case 'triangles':
      return gl.TRIANGLES;
    case 'triangle_strip':
      return gl.TRIANGLE_STRIP;
    case 'triangle_fan':
      return gl.TRIANGLE_FAN;
    case 'lines':
      return gl.LINES;
    case 'line_strip':
      return gl.LINE_STRIP;
    case 'line_loop':
      return gl.LINE_LOOP;
    case 'points':
      return gl.POINTS;
  }
}
