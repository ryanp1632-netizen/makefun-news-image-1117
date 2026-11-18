// Builds entry.png: lays out the day's stories as one 1024x1024 front page in HTML with the SVG drawings
// from art.mjs and the map from worldmap.mjs, then screenshots it with headless Chrome.
//   node render/build.mjs            -> out/page.html, out/shot.png, entry.png
// Set CHROME to the browser binary if it is not at the usual Windows path.

import { writeFileSync, mkdirSync, copyFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { DAY, LEADS, CARDS, ALSO, SOURCES } from './stories.mjs';
import * as art from './art.mjs';
import { worldMap } from './worldmap.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'out');
mkdirSync(outDir, { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const LEAD_RED = '#c8102e';
const CARD_BLUE = '#1d3d6e';

const storyCount = LEADS.length + CARDS.length + ALSO.length;

const leadHtml = LEADS.map((s) => `
  <article class="lead">
    <div class="art">${art[s.art]()}</div>
    <div class="body">
      <div class="tag"><span class="num red">${s.n}</span>${esc(s.region)}</div>
      <h2>${esc(s.head)}</h2>
      <p>${esc(s.sub)}</p>
    </div>
  </article>`).join('');

const cardHtml = CARDS.map((s) => `
  <article class="card">
    <div class="icon">${art.ICONS[s.art]()}</div>
    <div class="body">
      <div class="tag"><span class="num blue">${s.n}</span>${esc(s.region)}</div>
      <h3>${esc(s.head)}</h3>
      <p>${esc(s.sub)}</p>
    </div>
  </article>`).join('');

const alsoHtml = ALSO.map((a) => `<li><span class="glyph">${art.GLYPHS[a.icon]()}</span><span><b>${esc(a.where)}:</b> ${esc(a.text)}</span></li>`).join('');

const pins = [
  ...LEADS.map((s) => ({ ...s, color: LEAD_RED })),
  ...CARDS.map((s) => ({ ...s, color: CARD_BLUE })),
];
// Nudge pins that would sit on top of each other.
const nudge = { 1: { dx: 8, dy: -10 }, 2: { dx: 10, dy: 6 }, 5: { dx: -12, dy: 6 }, 9: { dx: -6, dy: 10 }, 7: { dx: -10, dy: -8 }, 8: { dx: 4, dy: -12 } };
for (const p of pins) Object.assign(p, nudge[p.n] ?? {});
const dots = ALSO.filter((a) => a.lat || a.lon);
// Crop to the inhabited latitudes and the longitudes the stories span, so the pins spread out.
const MAP_W = 340, MAP_H = 206;
const map = worldMap(MAP_W, MAP_H, { pins, dots, box: { west: -136, east: 160, north: 70, south: -42 } });

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1024px; height: 1024px; overflow: hidden; }
  body { background: #f4f1ea; color: #0f172a; font-family: 'Segoe UI', Inter, Arial, sans-serif; padding: 14px 18px 0; }
  .top { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; }
  .top .kicker { color: ${LEAD_RED}; }
  .top .count { color: #475569; }
  h1 { font-family: 'Segoe UI Black', 'Segoe UI', Arial, sans-serif; font-weight: 900; font-size: 52px; line-height: 1; letter-spacing: -0.5px; margin: 2px 0 5px; color: #0f1d3a; }
  .rule { height: 4px; background: #0f1d3a; margin-bottom: 8px; }
  .leads { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .lead { background: #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 2px rgba(15,23,42,.12); }
  .lead .art svg { display: block; width: 100%; height: auto; }
  .lead .body { padding: 7px 11px 8px; }
  .tag { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; color: ${LEAD_RED}; }
  .card .tag { color: ${CARD_BLUE}; font-size: 10px; }
  .num { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; color: #fff; font-size: 11px; font-weight: 800; letter-spacing: 0; }
  .num.red { background: ${LEAD_RED}; } .num.blue { background: ${CARD_BLUE}; width: 16px; height: 16px; font-size: 9.5px; }
  h2 { font-size: 21px; line-height: 1.12; font-weight: 800; margin: 5px 0 4px; letter-spacing: -0.2px; }
  .lead p { font-size: 12.5px; line-height: 1.3; color: #334155; }
  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px 12px; margin-top: 7px; }
  .card { background: #fff; border-radius: 6px; display: flex; gap: 9px; padding: 5px 9px; box-shadow: 0 1px 2px rgba(15,23,42,.12); }
  .card .icon svg { width: 56px; height: 56px; display: block; }
  h3 { font-size: 15px; line-height: 1.15; font-weight: 800; margin: 2px 0 2px; }
  .card p { font-size: 11px; line-height: 1.22; color: #475569; }
  .bottom { display: grid; grid-template-columns: ${MAP_W + 16}px 1fr; gap: 12px; margin-top: 7px; }
  .panel { background: #fff; border-radius: 6px; padding: 7px 8px; box-shadow: 0 1px 2px rgba(15,23,42,.12); }
  .panel h4 { font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #475569; display: flex; justify-content: space-between; margin-bottom: 5px; }
  .panel h4 .hint { font-weight: 700; letter-spacing: .3px; text-transform: none; color: #64748b; }
  .key { display: inline-block; width: 8px; height: 8px; border-radius: 50%; vertical-align: middle; margin: 0 2px 0 6px; }
  .map svg { display: block; border-radius: 4px; }
  ul { list-style: none; columns: 2; column-gap: 12px; }
  li { display: flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 500; line-height: 1; padding: 1.2px 0; border-bottom: 1px solid #eef0f3; white-space: nowrap; break-inside: avoid; }
  li:last-child { border-bottom: 0; }
  li b { font-weight: 800; color: #0f1d3a; }
  .glyph svg { display: block; width: 14px; height: 14px; }
  .also h4 { color: ${LEAD_RED}; }
  .map { display: flex; flex-direction: column; }
  .legend { font-size: 10.5px; font-weight: 700; color: #334155; margin: 7px 0 0; }
  .legend .key:first-child { margin-left: 0; }
  .src { margin-top: auto; font-size: 10.5px; line-height: 1.35; color: #64748b; border-top: 1px solid #eef0f3; padding-top: 5px; }
</style></head><body>
  <div class="top"><span class="kicker">The world’s news in one picture</span><span class="count">${storyCount} stories · 6 continents</span></div>
  <h1>${DAY.weekday.toUpperCase()} ${DAY.date.toUpperCase()}</h1>
  <div class="rule"></div>
  <section class="leads">${leadHtml}</section>
  <section class="cards">${cardHtml}</section>
  <section class="bottom">
    <div class="panel map"><h4>Where it happened <span class="hint">Numbers match the stories<span class="key" style="background:#f59e0b"></span>also</span></h4>${map}
      <div class="legend"><span class="key" style="background:${LEAD_RED}"></span>Lead stories 1–3<span class="key" style="background:${CARD_BLUE}"></span>Stories 4–12<span class="key" style="background:#f59e0b"></span>Also on ${DAY.short}</div>
      <p class="src">${esc(SOURCES)}. Every story happened or was announced on ${DAY.weekday} ${DAY.date}. Words and drawings are our own, made in code.</p></div>
    <div class="panel also"><h4>Also on ${DAY.short}</h4><ul>${alsoHtml}</ul></div>
  </section>
</body></html>`;

const pagePath = join(outDir, 'page.html');
writeFileSync(pagePath, html);

const chrome = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const shot = join(outDir, 'shot.png');
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--window-size=1024,1024', `--screenshot=${shot}`, pathToFileURL(pagePath).href,
], { stdio: 'ignore' });
copyFileSync(shot, join(root, 'entry.png'));
console.log(`entry.png: ${statSync(join(root, 'entry.png')).size} bytes, ${storyCount} stories`);
