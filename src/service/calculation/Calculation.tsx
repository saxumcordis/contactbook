type dot = {
  x: number;
  y: number;
};

type rectangle = {
  A: dot;
  B: dot;
  C: dot;
  D: dot;
};

const newDot = (u: dot, v: dot) => u.x * v.x + u.y * v.y;

export const isDotInRectangle = (dot: dot, rectangle: rectangle) => {
  const AB = vector(rectangle.A, rectangle.B);
  const AM = vector(rectangle.A, dot);
  const BC = vector(rectangle.B, rectangle.C);
  const BM = vector(rectangle.B, dot);
  const dotABAM = newDot(AB, AM);
  const dotABAB = newDot(AB, AB);
  const dotBCBM = newDot(BC, BM);
  const dotBCBC = newDot(BC, BC);
  return (
    0 <= dotABAM && dotABAM <= dotABAB && 0 <= dotBCBM && dotBCBM <= dotBCBC
  );
};

const vector = (p1: dot, p2: dot) => {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  };
};
