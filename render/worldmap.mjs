// A coarse world map, traced by hand as lon/lat outlines and drawn in an equirectangular projection.
// Good enough to place story pins by region; not a survey map.

const LAND = [
  // North America
  [[-168, 66], [-162, 70], [-140, 70], [-120, 72], [-95, 72], [-80, 73], [-62, 66], [-55, 52], [-66, 45], [-70, 42], [-76, 35], [-81, 31], [-80, 25], [-82, 28], [-84, 30], [-90, 29], [-97, 26], [-97, 21], [-92, 18], [-88, 21], [-87, 16], [-83, 10], [-79, 8], [-82, 8], [-86, 12], [-92, 14], [-100, 17], [-106, 23], [-110, 24], [-112, 30], [-115, 30], [-110, 23], [-117, 32], [-122, 37], [-124, 42], [-124, 48], [-130, 54], [-140, 60], [-150, 60], [-158, 57], [-165, 60]],
  // Greenland
  [[-50, 60], [-42, 60], [-20, 70], [-20, 80], [-40, 83], [-60, 81], [-70, 77], [-55, 70]],
  // Iceland
  [[-24, 64], [-14, 64], [-14, 66.5], [-22, 66.5]],
  // South America
  [[-79, 8], [-72, 12], [-62, 10], [-52, 5], [-35, -5], [-39, -15], [-48, -26], [-58, -35], [-65, -41], [-68, -52], [-75, -50], [-73, -40], [-71, -30], [-70, -18], [-76, -14], [-81, -5], [-80, 0], [-78, 7]],
  // Eurasia
  [[-9, 37], [-9, 43], [-1, 46], [-4, 48], [2, 51], [8, 54], [8, 57], [5, 59], [6, 62], [14, 67], [20, 70], [28, 71], [40, 68], [44, 66], [55, 68], [60, 70], [70, 73], [80, 73], [100, 77], [112, 74], [130, 72], [150, 71], [170, 70], [180, 68], [180, 65], [170, 60], [163, 58], [156, 51], [160, 61], [150, 59], [140, 54], [137, 47], [130, 42], [127, 39], [126, 35], [122, 37], [121, 31], [122, 28], [117, 23], [110, 21], [108, 16], [109, 11], [105, 9], [103, 10], [101, 14], [100, 7], [103, 1], [100, 3], [98, 8], [98, 16], [94, 17], [92, 22], [88, 22], [80, 15], [78, 8], [73, 17], [72, 21], [67, 24], [61, 25], [57, 26], [56, 24], [59, 22], [55, 17], [52, 16], [45, 13], [43, 13], [39, 21], [35, 28], [33, 30], [34, 31], [35, 33], [36, 36], [32, 36], [28, 36], [26, 39], [26, 40.5], [23, 40], [23, 37], [21, 38], [20, 40], [19, 42], [15, 45], [12, 45.5], [14, 42], [16, 40], [16, 38], [15.5, 38], [12, 42], [10, 44], [7, 43.5], [3, 43], [3, 42], [0, 40], [-1, 37], [-5, 36]],
  // Africa
  [[-17, 21], [-16, 28], [-10, 30], [-6, 36], [3, 37], [10, 37], [11, 33], [20, 31], [30, 31], [32, 31], [34, 27], [38, 18], [43, 12], [51, 12], [51, 10], [44, 0], [40, -5], [40, -15], [35, -24], [33, -26], [28, -33], [20, -35], [18, -33], [14, -22], [12, -6], [9, -1], [9, 4], [4, 6], [-8, 4], [-14, 8], [-17, 15]],
  // Madagascar
  [[44, -25], [47, -25], [50, -15], [49, -12], [44, -17]],
  // Britain and Ireland
  [[-5, 50], [1, 51], [2, 53], [-1, 55], [-2, 57], [-4, 59], [-6, 58], [-5, 55], [-3, 54], [-5, 52]],
  [[-10, 52], [-6, 52], [-6, 55], [-8, 55], [-10, 54]],
  // Japan
  [[130, 31], [132, 34], [135, 34], [140, 35], [141, 38], [142, 41], [140, 41], [139, 38], [136, 36], [132, 35], [130, 33]],
  [[140, 42], [145, 43], [142, 46], [140, 44]],
  // South-east Asia and New Guinea
  [[95, 5], [98, 4], [106, -6], [104, -5], [100, 0]],
  [[106, -6], [114, -8], [106, -7.5]],
  [[109, 1], [111, -3], [116, -4], [119, 1], [117, 7], [113, 3]],
  [[120, -2], [125, 1], [122, -5]],
  [[131, -1], [138, -2], [147, -6], [150, -10], [142, -9], [138, -8], [132, -3]],
  [[120, 18], [122, 18], [124, 13], [126, 7], [122, 7], [120, 14]],
  [[80, 6], [82, 7], [81, 9.5], [80, 9]],
  [[120.5, 22], [122, 25], [121, 25]],
  // Australia and New Zealand
  [[114, -22], [114, -34], [118, -35], [124, -33], [131, -31], [138, -35], [141, -38], [147, -38], [150, -37], [153, -29], [153, -25], [146, -19], [142, -10], [141, -17], [136, -12], [131, -11], [126, -14], [122, -18]],
  [[172, -34], [175, -37], [178, -38], [174, -41], [171, -44], [167, -46], [170, -43], [173, -41], [174, -39]],
];

// Seas cut out of the Eurasia outline.
const WATER = [
  [[28, 41], [28, 44], [30, 46], [33, 46], [36, 45], [38, 47], [40, 46], [42, 42], [36, 41.5], [31, 41]],
  [[47, 45], [50, 47], [53, 46], [54, 41], [53, 37], [50, 37], [49, 40], [47, 43]],
  [[48, 30], [50, 30], [56, 27], [56.5, 26], [54, 24], [51, 24], [50, 26], [48, 28]],
];

export function makeProjection(w, h, box = { west: -170, east: 180, north: 78, south: -50 }) {
  const sx = w / (box.east - box.west);
  const sy = h / (box.north - box.south);
  return ([lon, lat]) => [(lon - box.west) * sx, (box.north - lat) * sy];
}

export function worldMap(w, h, { pins = [], dots = [], box } = {}) {
  const p = makeProjection(w, h, box);
  const path = (ring) => 'M' + ring.map((pt) => p(pt).map((v) => v.toFixed(1)).join(' ')).join(' L') + ' Z';
  const land = LAND.map((r) => `<path d="${path(r)}"/>`).join('');
  const water = WATER.map((r) => `<path d="${path(r)}"/>`).join('');
  const dotSvg = dots.map(({ lon, lat }) => {
    const [x, y] = p([lon, lat]);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" fill="#f59e0b" stroke="#fff" stroke-width="1.2"/>`;
  }).join('');
  const pinSvg = [...pins].reverse().map(({ n, lon, lat, color, dx = 0, dy = 0, r = 8.5 }) => {
    const [x0, y0] = p([lon, lat]);
    const x = x0 + dx, y = y0 + dy;
    const moved = Math.hypot(dx, dy) > r * 0.6;
    const lead = moved ? `<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#334155" stroke-width="0.9"/><circle cx="${x0.toFixed(1)}" cy="${y0.toFixed(1)}" r="1.8" fill="#334155"/>` : '';
    const fs = (n > 9 ? 1.0 : 1.18) * r;
    return `${lead}<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}" stroke="#fff" stroke-width="1.4"/>
      <text x="${x.toFixed(1)}" y="${(y + fs * 0.36).toFixed(1)}" font-family="Arial, sans-serif" font-size="${fs.toFixed(1)}" font-weight="700" fill="#fff" text-anchor="middle">${n}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="#eef4fa"/>
    <g fill="#c9d6e6" stroke="#b3c3d8" stroke-width="0.6" stroke-linejoin="round">${land}</g>
    <g fill="#eef4fa">${water}</g>
    ${dotSvg}${pinSvg}
  </svg>`;
}

// Spread pins that would overlap: push apart pairwise, pull gently back to their places, keep inside the frame.
export function spreadPins(pins, w, h, box, rounds = 220) {
  const p = makeProjection(w, h, box);
  const pts = pins.map((q) => { const [x, y] = p([q.lon, q.lat]); return { q, x0: x, y0: y, x, y, r: q.r ?? 8.5 }; });
  for (let k = 0; k < rounds; k++) {
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j];
      let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
      const need = a.r + b.r + 1.2;
      if (d < need) {
        if (d < 0.01) { dx = Math.cos(i + j); dy = Math.sin(i + j); d = 1; }
        const push = (need - d) / 2;
        a.x -= (dx / d) * push; a.y -= (dy / d) * push; b.x += (dx / d) * push; b.y += (dy / d) * push;
      }
    }
    for (const t of pts) {
      t.x += (t.x0 - t.x) * 0.02; t.y += (t.y0 - t.y) * 0.02;
      t.x = Math.min(w - t.r - 1, Math.max(t.r + 1, t.x)); t.y = Math.min(h - t.r - 1, Math.max(t.r + 1, t.y));
    }
  }
  return pts.map((t) => ({ ...t.q, dx: t.x - t.x0, dy: t.y - t.y0 }));
}
