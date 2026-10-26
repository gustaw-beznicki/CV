// Deer geometry shared by Logo.astro (the small marks) and Blueprint.astro
// (the hero's technical drawing). Hand-traced from the brand artwork, in a
// 0–100 coordinate space (y down).

export type Pt = [number, number];

// Shared head vertices (viewBox 0 0 100 100).
const P: Record<string, Pt> = {
  A: [49, 48],
  B: [61, 42],
  C: [74, 43.6],
  D: [88, 66],
  E: [82, 76],
  F: [77, 96],
  G: [65, 86],
  H: [48, 78],
  I: [56, 62],
  J: [68, 57],
  K: [73, 74],
  M: [62, 77],
};
const v = (...pts: (string | Pt)[]): Pt[] =>
  pts.map((p) => (typeof p === "string" ? P[p] : p));

export const polygons: Pt[][] = [
  // head
  v("A", "B", "J", "I"),
  v("B", "C", "J"),
  v("C", "D", [78, 62], "J"),
  v("J", [78, 62], "K"),
  v([78, 62], "D", "E", "K"),
  v("A", "I", "H"),
  v("I", "J", "K"),
  v("H", "I", "M"),
  v("I", "K", "M"),
  v("H", "M", "G"),
  v("M", "K", "G"),
  v("K", "E", "F"),
  v("K", "F", "G"),
  // right antler
  [
    [71.4, 1.8],
    [74.1, 11.9],
    [76.6, 10.1],
  ],
  [
    [62.6, 5.3],
    [71.9, 10.7],
    [71.5, 13.7],
    [67.4, 11.9],
  ],
  [
    [75.8, 3.4],
    [79.4, 11.2],
    [76.9, 12.6],
  ],
  [
    [87.9, 19.6],
    [79.9, 17.3],
    [81.7, 24],
  ],
  [
    [72.3, 14.2],
    [79, 13],
    [80.4, 17.3],
    [74.6, 24.9],
    [70.5, 21.9],
  ],
  [
    [52, 10.7],
    [70.3, 23.4],
    [68.5, 26.5],
  ],
  [
    [55, 22.3],
    [70.1, 26.3],
    [69.2, 29],
  ],
  [
    [71, 25.8],
    [79, 23.7],
    [76.4, 35.6],
    [69.2, 35],
  ],
  [
    [77.6, 31.2],
    [84.7, 33.8],
    [76.5, 36.5],
  ],
  v([68.3, 36.1], [76.5, 36.8], "C", "B"),
  // left antler
  [
    [13.2, 23.7],
    [18.1, 32],
    [15.8, 33.3],
  ],
  [
    [23.8, 20.8],
    [22.4, 32.6],
    [19.4, 31.5],
  ],
  [
    [33.8, 18.3],
    [35.4, 40],
    [31.3, 39.7],
  ],
  [
    [39.3, 27.6],
    [40.7, 40.9],
    [37.2, 40],
  ],
  [
    [12.3, 45.7],
    [23.8, 42.2],
    [21.7, 48.6],
  ],
  [
    [24.7, 41.8],
    [38.1, 41.8],
    [43.4, 45.7],
    [36.3, 51.1],
    [23, 48.9],
  ],
  [
    [15.8, 34.5],
    [30, 37.5],
    [36, 41],
    [22, 40],
  ],
  [
    [26.5, 53.9],
    [46.1, 50.4],
    [48.8, 58.2],
    [36.3, 56.4],
  ],
  v([43.4, 45.7], "A", [49.8, 53.9], [38, 51]),
];

const MAX_AREA = 70; // bigger shards are split for more facets

// Deterministic pseudo-random in [0, 1) so builds are reproducible.
export const rand = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const area = (p: Pt[]) =>
  Math.abs(
    p.reduce((s, a, i) => {
      const b = p[(i + 1) % p.length];
      return s + a[0] * b[1] - b[0] * a[1];
    }, 0),
  ) / 2;

// Split large shards: quads along the shorter diagonal, pentagons by an ear,
// triangles by (slightly off-centre) bisection of the longest edge.
export const split = (poly: Pt[], seed: number): Pt[][] => {
  if (area(poly) < MAX_AREA) return [poly];
  if (poly.length === 4) {
    const [a, b, c, d] = poly;
    const ac = Math.hypot(a[0] - c[0], a[1] - c[1]);
    const bd = Math.hypot(b[0] - d[0], b[1] - d[1]);
    return ac < bd
      ? [...split([a, b, c], seed * 3 + 1), ...split([a, c, d], seed * 3 + 2)]
      : [...split([b, c, d], seed * 3 + 1), ...split([b, d, a], seed * 3 + 2)];
  }
  if (poly.length > 4) {
    const n = poly.length;
    return [
      ...split([poly[n - 1], poly[0], poly[1]], seed * 3 + 1),
      ...split([poly[1], ...poly.slice(2)], seed * 3 + 2),
    ];
  }
  let li = 0;
  let best = 0;
  for (let i = 0; i < 3; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % 3];
    const l = Math.hypot(a[0] - b[0], a[1] - b[1]);
    if (l > best) {
      best = l;
      li = i;
    }
  }
  const a = poly[li];
  const b = poly[(li + 1) % 3];
  const c = poly[(li + 2) % 3];
  const t = 0.42 + rand(seed) * 0.16;
  const m: Pt = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  return [...split([a, m, c], seed * 3 + 1), ...split([m, b, c], seed * 3 + 2)];
};

/** The deer as its final set of shards (big ones split into facets). */
export const shards: Pt[][] = polygons.flatMap((p, i) => split(p, i + 11));
