// Hand-written SVG drawings for the day's stories. Lead drawings use a 320x150 box, card icons 64x64,
// list glyphs 16x16. No images, fonts or models are loaded: everything is drawn here.

const svg = (w, h, body, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" ${extra}>${body}</svg>`;

const label = (x, y, t, o = {}) =>
  `<text x="${x}" y="${y}" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="${o.size ?? 9}" font-weight="${o.weight ?? 800}" fill="${o.fill ?? '#334155'}" text-anchor="${o.anchor ?? 'middle'}" letter-spacing="${o.ls ?? 1}">${t}</text>`;

const burst = (x, y, r, c1 = '#f97316', c2 = '#fde047') => {
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI * 2 * i) / 16;
    const rr = i % 2 ? r * 0.5 : r;
    pts.push(`${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${c1}"/><circle cx="${x}" cy="${y}" r="${r * 0.32}" fill="${c2}"/>`;
};

const smoke = (x, y, s = 1) =>
  `<g fill="#64748b" opacity="0.85">
    <circle cx="${x}" cy="${y}" r="${9 * s}"/><circle cx="${x + 9 * s}" cy="${y - 12 * s}" r="${11 * s}"/>
    <circle cx="${x + 2 * s}" cy="${y - 26 * s}" r="${13 * s}"/><circle cx="${x + 16 * s}" cy="${y - 38 * s}" r="${12 * s}"/>
  </g>`;

// ---------- lead 1: the Kerch Bridge with a fallen road span ----------
export function kerch() {
  const piers = [];
  for (let x = 12; x <= 312; x += 26) {
    if (x > 200 && x < 262) continue;
    piers.push(`<rect x="${x}" y="84" width="5" height="34" fill="#475569"/>`);
  }
  const body = `
  <defs><linearGradient id="ksky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cbd5e1"/><stop offset="1" stop-color="#e2e8f0"/></linearGradient></defs>
  <rect width="320" height="150" fill="url(#ksky)"/>
  <rect y="112" width="320" height="38" fill="#7aa5c9"/>
  <path d="M0 118 q10 -3 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#bcd5ea" stroke-width="1.5" fill="none"/>
  <path d="M0 132 q10 -3 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#bcd5ea" stroke-width="1.5" fill="none"/>
  <path d="M0 112 L0 96 L18 100 L30 112 Z" fill="#a3b18a"/>
  <path d="M320 112 L320 94 L300 99 L290 112 Z" fill="#a3b18a"/>
  ${piers.join('')}
  <!-- rail deck (still standing) -->
  <rect x="0" y="88" width="320" height="4" fill="#334155"/>
  <!-- road deck with the navigation arch -->
  <rect x="0" y="80" width="204" height="6" fill="#1e293b"/>
  <rect x="258" y="80" width="62" height="6" fill="#1e293b"/>
  <path d="M120 80 Q150 38 180 80" stroke="#1e293b" stroke-width="4" fill="none"/>
  <path d="M128 80 L128 66 M140 80 L140 54 M150 80 L150 51 M160 80 L160 54 M172 80 L172 66" stroke="#1e293b" stroke-width="2"/>
  <!-- the fallen span -->
  <path d="M206 82 L256 82 L262 86 L212 120 L200 116 Z" fill="#1e293b" transform="rotate(0)"/>
  <path d="M204 86 L210 118" stroke="#334155" stroke-width="3"/>
  <path d="M190 122 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0" stroke="#e0f2fe" stroke-width="2" fill="none"/>
  ${smoke(236, 70, 1.05)}
  ${burst(232, 82, 12)}
  <!-- incoming missile -->
  <path d="M62 14 L214 74" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="4 4"/>
  <g transform="translate(58 12) rotate(21.5)"><rect x="-12" y="-2.5" width="22" height="5" rx="2" fill="#0f172a"/><path d="M10 -2.5 L15 0 L10 2.5Z" fill="#dc2626"/><path d="M-12 -2.5 L-16 -6 L-9 -2.5Z M-12 2.5 L-16 6 L-9 2.5Z" fill="#0f172a"/></g>
  ${label(32, 108, 'CRIMEA', { size: 9, fill: '#1f2937' })}
  ${label(294, 108, 'RUSSIA', { size: 9, fill: '#1f2937' })}
  ${label(110, 144, 'KERCH STRAIT', { size: 9, fill: '#f8fafc', ls: 2 })}
  ${label(232, 34, 'ROAD SPAN DOWN', { size: 8, fill: '#b91c1c' })}
  `;
  return svg(320, 150, body);
}

// ---------- lead 2: the Gulf: drones at Bahrain, US strike on Qeshm, tankers ablaze ----------
export function gulf() {
  const body = `
  <rect width="320" height="150" fill="#9cc3e0"/>
  <!-- Iran -->
  <path d="M40 0 L320 0 L320 64 L300 70 L280 64 L262 60 L240 52 L215 40 L190 32 L160 24 L130 18 L100 12 L70 10 L55 6 Z" fill="#efe3c8" stroke="#c9b48a"/>
  <!-- Arabian side -->
  <path d="M0 18 L28 22 L46 30 L60 46 L74 66 L82 88 L96 104 L118 112 L150 116 L184 112 L212 104 L232 96 L250 92 L262 96 L270 110 L286 130 L300 150 L0 150 Z" fill="#f3e9d2" stroke="#c9b48a"/>
  <!-- Musandam tip / Oman -->
  <path d="M262 96 L272 82 L278 90 L276 102 Z" fill="#f3e9d2" stroke="#c9b48a"/>
  <!-- Qatar -->
  <path d="M118 112 L114 92 L124 84 L132 96 L130 112 Z" fill="#f3e9d2" stroke="#c9b48a"/>
  <!-- Bahrain island -->
  <ellipse cx="104" cy="90" rx="4" ry="6" fill="#f3e9d2" stroke="#8a6d3b"/>
  <!-- Qeshm island -->
  <path d="M232 56 L262 64 L258 69 L228 61 Z" fill="#efe3c8" stroke="#8a6d3b"/>
  ${label(190, 14, 'IRAN', { size: 12, fill: '#7c5e2a', ls: 4 })}
  ${label(60, 132, 'SAUDI ARABIA', { size: 8, fill: '#7c5e2a' })}
  ${label(214, 132, 'UAE', { size: 8, fill: '#7c5e2a' })}
  ${label(36, 40, 'KUWAIT', { size: 8, fill: '#1f2937', anchor: 'middle' })}
  <circle cx="36" cy="27" r="3" fill="#1f2937"/>
  <!-- Kuwait intercepts -->
  ${burst(48, 22, 6, '#f59e0b', '#fff7ed')}
  <!-- drones from Iran to Bahrain, intercepted -->
  <path d="M170 30 Q140 50 110 84" stroke="#b91c1c" stroke-width="2" stroke-dasharray="5 3" fill="none"/>
  <path d="M150 28 Q126 46 106 82" stroke="#b91c1c" stroke-width="2" stroke-dasharray="5 3" fill="none"/>
  ${burst(116, 72, 9, '#ef4444', '#fef08a')}
  ${label(86, 104, 'BAHRAIN', { size: 8, fill: '#1f2937' })}
  <g transform="translate(96 66)"><rect x="-1" y="0" width="2" height="8" fill="#1f2937"/><path d="M-6 0 A6 6 0 0 1 6 0 Z" fill="#1f2937"/></g>
  <!-- US strike on Qeshm -->
  <path d="M190 104 Q220 90 240 64" stroke="#1d4ed8" stroke-width="2.4" fill="none"/>
  <path d="M240 64 l-8 3 l5 5 z" fill="#1d4ed8"/>
  ${burst(246, 60, 10, '#f97316', '#fde68a')}
  ${label(248, 82, 'QESHM', { size: 8, fill: '#1f2937' })}
  ${label(178, 100, 'US STRIKE', { size: 7, fill: '#1d4ed8' })}
  <!-- tankers on fire near Hormuz -->
  <g transform="translate(290 98)"><path d="M-14 0 L14 0 L10 6 L-10 6 Z" fill="#334155"/><rect x="4" y="-5" width="6" height="5" fill="#334155"/></g>
  ${smoke(286, 92, 0.55)}
  ${burst(288, 96, 6, '#ef4444', '#fde047')}
  ${label(296, 118, 'HORMUZ', { size: 7, fill: '#1f2937' })}
  ${label(150, 70, 'GULF', { size: 9, fill: '#f8fafc', ls: 3 })}
  `;
  return svg(320, 150, body);
}

// ---------- lead 3: measles back in the Americas ----------
function virus(cx, cy, r, fill = '#dc2626') {
  const spikes = [];
  for (let i = 0; i < 14; i++) {
    const a = (Math.PI * 2 * i) / 14;
    const x1 = cx + Math.cos(a) * r, y1 = cy + Math.sin(a) * r;
    const x2 = cx + Math.cos(a) * (r + 8), y2 = cy + Math.sin(a) * (r + 8);
    spikes.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${fill}" stroke-width="3"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="3.4" fill="${fill}"/>`);
  }
  return `${spikes.join('')}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>
    <circle cx="${cx - r * 0.35}" cy="${cy - r * 0.3}" r="${r * 0.2}" fill="#fecaca"/><circle cx="${cx + r * 0.3}" cy="${cy + r * 0.25}" r="${r * 0.16}" fill="#fecaca"/><circle cx="${cx + r * 0.25}" cy="${cy - r * 0.4}" r="${r * 0.1}" fill="#fecaca"/>`;
}

const usFlag = (x, y, w = 36) => {
  const h = w * 0.6, s = h / 7;
  let stripes = '';
  for (let i = 0; i < 7; i++) stripes += `<rect x="${x}" y="${y + i * s}" width="${w}" height="${s}" fill="${i % 2 ? '#fff' : '#b91c1c'}"/>`;
  return `${stripes}<rect x="${x}" y="${y}" width="${w * 0.42}" height="${s * 4}" fill="#1e3a8a"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#94a3b8" stroke-width="0.6"/>`;
};
const mexFlag = (x, y, w = 36) => {
  const h = w * 0.6, t = w / 3;
  return `<rect x="${x}" y="${y}" width="${t}" height="${h}" fill="#047857"/><rect x="${x + t}" y="${y}" width="${t}" height="${h}" fill="#fff"/><rect x="${x + 2 * t}" y="${y}" width="${t}" height="${h}" fill="#c81e1e"/><circle cx="${x + w / 2}" cy="${y + h / 2}" r="${h * 0.16}" fill="#8b5a2b"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#94a3b8" stroke-width="0.6"/>`;
};
const bolFlag = (x, y, w = 36) => {
  const h = w * 0.6, t = h / 3;
  return `<rect x="${x}" y="${y}" width="${w}" height="${t}" fill="#d52b1e"/><rect x="${x}" y="${y + t}" width="${w}" height="${t}" fill="#f9e300"/><rect x="${x}" y="${y + 2 * t}" width="${w}" height="${t}" fill="#007934"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#94a3b8" stroke-width="0.6"/>`;
};

export function measles() {
  // Only figures reported on the day: 5,400+ US cases in 2026, eight deaths, the most since 1991.
  const chart = `
    <rect x="192" y="64" width="120" height="74" rx="6" fill="#fff" stroke="#fecaca"/>
    ${label(252, 92, '5,400+', { size: 22, fill: '#b91c1c', ls: 0 })}
    ${label(252, 106, 'US CASES IN 2026', { size: 7.5, fill: '#7f1d1d', ls: 0.5 })}
    ${label(252, 124, 'Most since 1991 · 8 deaths', { size: 7.5, fill: '#475569', weight: 700, ls: 0 })}`;
  const body = `
  <rect width="320" height="150" fill="#fdf2f2"/>
  ${virus(66, 72, 26)}
  ${virus(124, 36, 10, '#ef4444')}
  ${virus(130, 112, 8, '#f87171')}
  <g transform="rotate(-8 92 128)">
    <rect x="14" y="116" width="158" height="24" rx="3" fill="#fdf2f2" stroke="#b91c1c" stroke-width="2.4"/>
    ${label(93, 132, 'MEASLES-FREE: WITHDRAWN', { size: 9, fill: '#b91c1c', ls: 0.3 })}
  </g>
  ${usFlag(196, 12)}${mexFlag(236, 12)}${bolFlag(276, 12)}
  ${label(258, 46, 'NOW ENDEMIC', { size: 8, fill: '#7f1d1d' })}
  ${chart}
  `;
  return svg(320, 150, body);
}

// ---------- 64x64 card icons ----------
const icon = (body, bg = '#eef2f7') => svg(64, 64, `<rect width="64" height="64" rx="10" fill="${bg}"/>${body}`);

const flagRect = (x, y, w, h, stripes, vertical = false) => stripes.map((c, i) =>
  vertical
    ? `<rect x="${x + (w / stripes.length) * i}" y="${y}" width="${w / stripes.length}" height="${h}" fill="${c}"/>`
    : `<rect x="${x}" y="${y + (h / stripes.length) * i}" width="${w}" height="${h / stripes.length}" fill="${c}"/>`).join('')
  + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#94a3b8" stroke-width="0.6"/>`;

export const ICONS = {
  quad: () => icon(`
    <ellipse cx="32" cy="38" rx="20" ry="9" fill="#a16207"/><rect x="29" y="40" width="6" height="14" fill="#854d0e"/>
    ${usFlag(6, 8, 20)}
    ${flagRect(38, 8, 20, 12, ['#ff9933', '#ffffff', '#138808'])}<circle cx="48" cy="14" r="2" fill="#1e3a8a"/>
    <rect x="6" y="46" width="20" height="12" fill="#fff" stroke="#94a3b8" stroke-width="0.6"/><circle cx="16" cy="52" r="3.6" fill="#bc002d"/>
    <rect x="38" y="46" width="20" height="12" fill="#1e3a8a"/><rect x="38" y="46" width="9" height="6" fill="#1e3a8a" stroke="#fff" stroke-width="0.8"/><circle cx="53" cy="54" r="1.2" fill="#fff"/><circle cx="51" cy="49" r="1" fill="#fff"/>
  `),
  knesset: () => icon(`
    ${flagRect(6, 8, 30, 20, ['#fff'])}<rect x="6" y="10.5" width="30" height="2.4" fill="#1d4ed8"/><rect x="6" y="23" width="30" height="2.4" fill="#1d4ed8"/>
    <path d="M21 13 L25 20 L17 20Z M21 22 L17 15 L25 15Z" fill="none" stroke="#1d4ed8" stroke-width="1.1"/>
    <g transform="rotate(-35 44 36)"><rect x="34" y="28" width="22" height="11" rx="2" fill="#7c2d12"/><rect x="43" y="39" width="4" height="20" fill="#92400e"/></g>
    <rect x="30" y="52" width="28" height="6" rx="1" fill="#78350f"/>
  `),
  chip: () => icon(`
    <rect x="16" y="16" width="32" height="32" rx="3" fill="#0f172a"/><rect x="23" y="23" width="18" height="18" fill="#76b900"/>
    ${[20, 27, 34, 41].map((p) => `<rect x="${p}" y="10" width="3" height="6" fill="#64748b"/><rect x="${p}" y="48" width="3" height="6" fill="#64748b"/><rect x="10" y="${p}" width="6" height="3" fill="#64748b"/><rect x="48" y="${p}" width="6" height="3" fill="#64748b"/>`).join('')}
    <path d="M40 56 L56 40" stroke="#16a34a" stroke-width="4"/><path d="M58 38 L48 40 L56 48Z" fill="#16a34a"/>
  `),
  strike: () => icon(`
    ${flagRect(6, 6, 22, 14, ['#0055a4', '#ffffff', '#ef4135'], true)}
    <rect x="30" y="8" width="28" height="12" rx="2" fill="#dc2626"/>
    <text x="44" y="17" font-family="Arial" font-size="7" font-weight="900" fill="#fff" text-anchor="middle">GRÈVE</text>
    <line x1="34" y1="20" x2="34" y2="30" stroke="#475569" stroke-width="1.6"/><line x1="54" y1="20" x2="54" y2="30" stroke="#475569" stroke-width="1.6"/>
    ${[8, 19, 30, 41, 52].map((x, i) => `<circle cx="${x + 2}" cy="${38 + (i % 2) * 3}" r="5" fill="${['#334155', '#475569', '#1e293b', '#475569', '#334155'][i]}"/><rect x="${x - 4}" y="${44 + (i % 2) * 3}" width="12" height="16" rx="5" fill="${['#334155', '#475569', '#1e293b', '#475569', '#334155'][i]}"/>`).join('')}
  `),
  serbia: () => icon(`
    ${flagRect(6, 6, 52, 9, ['#c6363c', '#0c4076', '#ffffff'])}
    <path d="M14 34 Q32 16 50 34Z" fill="#0f766e"/><rect x="30" y="18" width="4" height="6" fill="#0f766e"/>
    <rect x="12" y="34" width="40" height="4" fill="#cbd5e1"/>
    ${[15, 22, 29, 36, 43].map((x) => `<rect x="${x + 1}" y="38" width="4" height="14" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.5"/>`).join('')}
    <rect x="10" y="52" width="44" height="5" fill="#94a3b8"/>
  `),
  cop: () => icon(`
    <circle cx="27" cy="34" r="20" fill="#60a5fa"/>
    <path d="M14 24 Q20 18 26 22 Q30 30 22 34 Q16 38 14 30Z M30 40 Q38 34 42 42 Q38 50 32 50Z M34 18 Q42 20 44 28 Q38 26 34 22Z" fill="#4ade80"/>
    <rect x="40" y="10" width="18" height="24" rx="2" fill="#fff" stroke="#94a3b8"/>
    <path d="M43 16 h12 M43 20 h12 M43 24 h8" stroke="#94a3b8" stroke-width="1.4"/>
    <path d="M42 14 L56 30 M56 14 L42 30" stroke="#dc2626" stroke-width="2.2"/>
    <rect x="50" y="38" width="6" height="18" rx="3" fill="#fff" stroke="#b91c1c" stroke-width="1.2"/><circle cx="53" cy="56" r="4.5" fill="#dc2626"/><rect x="52" y="44" width="2" height="12" fill="#dc2626"/>
  `),
  plane: () => icon(`
    <rect y="44" width="64" height="20" fill="#f1f5f9"/><path d="M0 44 Q16 40 32 44 T64 44" fill="#e2e8f0"/>
    <path d="M6 30 L14 34 M58 26 L52 32" stroke="#cbd5e1" stroke-width="2"/>
    <g transform="rotate(28 32 34)">
      <rect x="12" y="30" width="40" height="8" rx="4" fill="#475569"/><path d="M24 31 L34 16 L38 16 L32 31Z M24 37 L34 52 L38 52 L32 37Z" fill="#334155"/>
      <path d="M12 30 L6 24 L10 24 L16 30Z" fill="#334155"/>
    </g>
    ${burst(46, 48, 9)}
    ${smoke(42, 38, 0.6)}
  `, '#e0eaf5'),
  garment: () => icon(`
    <path d="M6 40 L6 22 L18 30 L18 22 L30 30 L30 22 L42 30 L42 14 L50 14 L50 40Z" fill="#94a3b8"/>
    <rect x="6" y="40" width="44" height="18" fill="#64748b"/>
    <path d="M14 18 L22 6 L30 18 Z" fill="#fff" stroke="#0f172a" stroke-width="1.2" transform="translate(16 0)"/>
    <circle cx="52" cy="22" r="8" fill="#cbd5e1" opacity="0.9"/><circle cx="58" cy="30" r="6" fill="#e2e8f0"/><circle cx="46" cy="30" r="5" fill="#e2e8f0"/>
    ${flagRect(8, 44, 18, 11, ['#006a4e'])}<circle cx="16" cy="49.5" r="3.2" fill="#f42a41"/>
    <rect x="31" y="46" width="15" height="8" rx="1" fill="#fff"/><text x="38.5" y="52.4" font-family="Arial" font-size="5" font-weight="900" fill="#b91c1c" text-anchor="middle">WAGES</text>
  `),
  press: () => icon(`
    ${flagRect(6, 6, 28, 18, ['#002b7f', '#ffffff', '#ce1126', '#ce1126', '#ffffff', '#002b7f'])}
    <rect x="38" y="12" width="12" height="22" rx="6" fill="#334155"/><rect x="42" y="34" width="4" height="10" fill="#334155"/><path d="M34 26 Q44 40 54 26" stroke="#334155" stroke-width="2" fill="none"/>
    <rect x="8" y="34" width="24" height="16" rx="2" fill="#fff" stroke="#334155" stroke-width="1.4"/>
    <text x="20" y="45" font-family="Arial" font-size="7" font-weight="900" fill="#0f172a" text-anchor="middle">PRESS</text>
    <path d="M32 50 L40 60 L44 50 L48 60 L56 50" stroke="#0f172a" stroke-width="3" fill="none"/>
  `),
};

// ---------- 16x16 list glyphs ----------
const g = (body) => svg(16, 16, body);
export const GLYPHS = {
  tech: () => g(`<rect x="1" y="3" width="14" height="9" rx="1.5" fill="#334155"/><rect x="3" y="5" width="10" height="5" fill="#93c5fd"/><path d="M6 13 h4 M5 15 h6" stroke="#334155" stroke-width="1.4"/><path d="M11 1 L5 14" stroke="#dc2626" stroke-width="1.6"/>`),
  shield: () => g(`<path d="M8 1 L14 3 L14 8 Q14 13 8 15 Q2 13 2 8 L2 3Z" fill="#1e3a8a"/><path d="M5 8 h6" stroke="#facc15" stroke-width="2"/>`),
  atom: () => g(`<circle cx="8" cy="8" r="7" fill="#facc15"/><path d="M8 8 L4 2 A7 7 0 0 1 12 2Z M8 8 L15 8 A7 7 0 0 1 11 14.2Z M8 8 L5 14.2 A7 7 0 0 1 1 8Z" fill="#111827"/><circle cx="8" cy="8" r="1.8" fill="#facc15"/>`),
  trade: () => g(`<rect x="1" y="5" width="9" height="8" fill="#b45309"/><rect x="6" y="2" width="9" height="8" fill="#f59e0b"/><path d="M3 9 h5 M8 6 h5" stroke="#fff" stroke-width="1"/>`),
  chip: () => g(`<rect x="3" y="3" width="10" height="10" rx="1" fill="#0f172a"/><rect x="6" y="6" width="4" height="4" fill="#ef4444"/><path d="M5 1v2M8 1v2M11 1v2M5 13v2M8 13v2M11 13v2M1 5h2M1 8h2M1 11h2M13 5h2M13 8h2M13 11h2" stroke="#64748b" stroke-width="1.2"/>`),
  flag: () => g(`<rect x="1" y="3" width="14" height="10" fill="#012169"/><path d="M1 3 L15 13 M15 3 L1 13" stroke="#fff" stroke-width="2.4"/><path d="M8 3 v10 M1 8 h14" stroke="#fff" stroke-width="3.6"/><path d="M8 3 v10 M1 8 h14" stroke="#c8102e" stroke-width="2"/>`),
  grave: () => g(`<path d="M3 15 L3 6 Q8 0 13 6 L13 15Z" fill="#64748b"/><path d="M8 5 v6 M6 7 h4" stroke="#fff" stroke-width="1.2"/>`),
  scale: () => g(`<path d="M8 2 v12 M3 14 h10 M2 5 h12" stroke="#334155" stroke-width="1.4"/><path d="M2 5 L0.5 9 h3Z M14 5 L12.5 9 h3Z" fill="#a16207"/>`),
  pick: () => g(`<path d="M2 4 Q8 0 14 4" stroke="#475569" stroke-width="2" fill="none"/><path d="M8 2 L8 15" stroke="#92400e" stroke-width="2"/>`),
  car: () => g(`<path d="M2 10 L3.5 6 Q4 5 5 5 L11 5 Q12 5 12.5 6 L14 10 L14 13 L2 13Z" fill="#334155"/><rect x="5" y="2" width="6" height="3" rx="1" fill="#94a3b8"/><circle cx="5" cy="13" r="1.8" fill="#0f172a"/><circle cx="11" cy="13" r="1.8" fill="#0f172a"/><rect x="4" y="7" width="8" height="2" fill="#93c5fd"/>`),
  globe: () => g(`<circle cx="8" cy="8" r="7" fill="#3b82f6"/><path d="M4 4 Q7 3 7 7 Q5 9 3 8Z M9 9 Q12 8 13 11 Q10 14 9 12Z" fill="#86efac"/>`),
  ball: () => g(`<circle cx="8" cy="8" r="7" fill="#fff" stroke="#0f172a" stroke-width="1.2"/><path d="M8 5 L11 7 L10 10.5 L6 10.5 L5 7Z" fill="#0f172a"/>`),
  plane: () => g(`<path d="M8 1 L9.2 6 L15 9 L15 10.5 L9.2 8.6 L9 13 L11 14.5 L11 15.5 L8 14.6 L5 15.5 L5 14.5 L7 13 L6.8 8.6 L1 10.5 L1 9 L6.8 6Z" fill="#1d4ed8"/>`),
  bank: () => g(`<path d="M1 6 L8 1.5 L15 6Z" fill="#334155"/><path d="M3 7 v5 M6.3 7 v5 M9.7 7 v5 M13 7 v5" stroke="#334155" stroke-width="1.8"/><rect x="1" y="13" width="14" height="2" fill="#334155"/>`),
  dice: () => g(`<rect x="1.5" y="1.5" width="13" height="13" rx="3" fill="#7c3aed"/><circle cx="5" cy="5" r="1.4" fill="#fff"/><circle cx="8" cy="8" r="1.4" fill="#fff"/><circle cx="11" cy="11" r="1.4" fill="#fff"/>`),
  chart: () => g(`<rect x="1" y="9" width="3" height="6" fill="#94a3b8"/><rect x="6" y="5" width="3" height="10" fill="#94a3b8"/><rect x="11" y="7" width="3" height="8" fill="#16a34a"/><path d="M1 4 L7 2 L14 5" stroke="#16a34a" stroke-width="1.4" fill="none"/>`),
  people: () => g(`<circle cx="5" cy="5" r="2.5" fill="#00209f"/><circle cx="11" cy="5" r="2.5" fill="#d21034"/><path d="M1 15 Q1 9 5 9 Q9 9 9 15Z" fill="#00209f"/><path d="M7 15 Q7 9 11 9 Q15 9 15 15Z" fill="#d21034"/>`),
  leaf: () => g(`<path d="M2 14 Q2 2 14 2 Q14 14 2 14Z" fill="#16a34a"/><path d="M2 14 L11 5" stroke="#bbf7d0" stroke-width="1.2"/>`),
  robot: () => g(`<rect x="3" y="4" width="10" height="9" rx="2" fill="#475569"/><circle cx="6.2" cy="8" r="1.4" fill="#fde047"/><circle cx="9.8" cy="8" r="1.4" fill="#fde047"/><path d="M8 1 v3" stroke="#475569" stroke-width="1.4"/><path d="M6 11 h4" stroke="#fff" stroke-width="1"/>`),
  golf: () => g(`<path d="M5 1 v13" stroke="#334155" stroke-width="1.4"/><path d="M5.7 1.5 L13 4 L5.7 6.5Z" fill="#dc2626"/><ellipse cx="7" cy="14.2" rx="6" ry="1.6" fill="#16a34a"/><circle cx="11" cy="12.4" r="1.4" fill="#fff" stroke="#94a3b8" stroke-width="0.5"/>`),
  star: () => g(`<rect width="16" height="16" rx="3" fill="#1e293b"/><path d="M14 2 L5 11" stroke="#fde68a" stroke-width="1.6"/><circle cx="4.5" cy="11.5" r="2" fill="#fef9c3"/><circle cx="12" cy="12" r="0.8" fill="#fff"/><circle cx="3" cy="4" r="0.7" fill="#fff"/>`),
};
