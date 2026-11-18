// Builds entry.png: one 1024x1024 front page of the day's news, laid out in HTML with hand-written SVG
// drawings, then screenshotted by headless Chrome.
//   node render/build.mjs                   -> out/page.html, out/shot.png, entry.png
//   STORIES=path/to/other.mjs node render/build.mjs   (lay out another stories file, for testing)
// Set CHROME to the browser binary if it is not at the usual Windows path.

import { writeFileSync, mkdirSync, copyFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { worldMap, spreadPins } from './worldmap.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const storiesUrl = process.env.STORIES ? pathToFileURL(resolve(process.env.STORIES)).href : './stories.mjs';
const { DAY, FIGURES, LEADS, CARDS, ALSO, SOURCES, CATS } = await import(storiesUrl);
const outDir = join(root, 'out');
mkdirSync(outDir, { recursive: true });

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const NAVY = '#0f1d3a';

// Number every story in reading order: leads, cards, then the short list.
let n = 0;
for (const s of [...LEADS, ...CARDS, ...ALSO]) s.n = ++n;
const storyCount = n;
const col = (s) => CATS[s.cat].color;

// A card banner: background, the story's drawing, and a dark caption bar along the bottom.
const BW = 190, BH = 62;
const banner = (s) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BW} ${BH}" width="100%" style="display:block">
  <rect width="${BW}" height="${BH}" fill="${s.bg ?? '#e8eef6'}"/>${s.draw}
  <rect y="${BH - 15}" width="${BW}" height="15" fill="${NAVY}" fill-opacity=".92"/>
  <text x="${BW / 2}" y="${BH - 4.6}" font-family="Arial, sans-serif" font-size="8.4" font-weight="700" letter-spacing=".5" fill="#fff" text-anchor="middle">${esc(s.caption.toUpperCase())}</text>
</svg>`;

const numDot = (s, cls = '') => `<span class="num ${cls}" style="background:${col(s)}">${s.n}</span>`;

const leadHtml = LEADS.map((s) => `
  <article class="lead">
    <div class="art">${s.art}<span class="place">${esc(s.place)}</span></div>
    <div class="body">
      <div class="tag" style="color:${col(s)}">${numDot(s)}${esc(s.region)}</div>
      <h2>${esc(s.head)}</h2>
      <p>${esc(s.sub)}</p>
    </div>
  </article>`).join('');

const cardHtml = CARDS.map((s) => `
  <article class="card">
    ${banner(s)}
    <div class="body">
      <div class="tag" style="color:${col(s)}">${numDot(s, 'sm')}${esc(s.region)}</div>
      <h3>${esc(s.head)}</h3>
      <p>${esc(s.sub)}</p>
    </div>
  </article>`).join('');

const alsoHtml = ALSO.map((a) => `<li>${numDot(a, 'xs')}<span><b>${esc(a.where)}</b> ${esc(a.text)}</span></li>`).join('');

const figHtml = FIGURES.map((f) => `<span><b>${esc(f.big)}</b> ${esc(f.small)}</span>`).join('<i>|</i>');

// Map: every story with a place gets its numbered pin, coloured by kind of story.
const MAP_W = 352, MAP_H = 206;
const BOX = DAY.mapBox ?? { west: -128, east: 158, north: 68, south: -42 };
const pinned = [
  ...LEADS.map((s) => ({ ...s, r: 8.5 })),
  ...CARDS.map((s) => ({ ...s, r: 7.5 })),
  ...ALSO.map((s) => ({ ...s, r: 6.2 })),
].filter((s) => s.lon != null && s.lat != null).map((s) => ({ ...s, color: col(s) }));
const pins = spreadPins(pinned, MAP_W, MAP_H, BOX);
const map = worldMap(MAP_W, MAP_H, { pins, box: BOX });
const legend = Object.values(CATS).map((c) => `<span><i style="background:${c.color}"></i>${esc(c.name)}</span>`).join('');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1024px; height: 1024px; overflow: hidden; }
  body { background: #f5f2ea; color: #0f172a; font-family: 'Segoe UI', Arial, sans-serif; }
  .mast { background: ${NAVY}; color: #fff; padding: 8px 18px 6px; }
  .mast .row { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; }
  .mast .kicker { color: #f2c14e; } .mast .count { color: #cbd5e1; }
  h1 { font-family: Georgia, 'Times New Roman', serif; font-weight: 700; font-size: 52px; line-height: 1; letter-spacing: -0.5px; margin: 2px 0 0; }
  .ticker { background: #b91c1c; color: #fff; font-size: 12.5px; font-weight: 600; padding: 4px 18px; white-space: nowrap; overflow: hidden; display: flex; gap: 9px; align-items: baseline; }
  .ticker b { font-weight: 900; } .ticker i { font-style: normal; opacity: .55; }
  main { padding: 8px 18px 0; }
  .leads { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .lead, .card, .panel { background: #fff; border-radius: 5px; overflow: hidden; box-shadow: 0 1px 2px rgba(15,23,42,.14); }
  .lead .art { position: relative; }
  .lead .art svg { display: block; width: 100%; height: auto; }
  .place { position: absolute; left: 0; top: 0; background: ${NAVY}; color: #fff; font-size: 9.5px; font-weight: 800; letter-spacing: .8px; padding: 3px 7px; text-transform: uppercase; }
  .lead .body { padding: 5px 11px 6px; }
  .tag { display: flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 800; letter-spacing: .7px; text-transform: uppercase; }
  .num { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 18px; height: 18px; border-radius: 50%; color: #fff; font-size: 10.5px; font-weight: 800; letter-spacing: 0; }
  .num.sm { width: 16px; height: 16px; font-size: 9.5px; }
  .num.xs { width: 16px; height: 16px; font-size: 8.6px; }
  h2 { font-family: Georgia, 'Times New Roman', serif; font-size: 19px; line-height: 1.1; font-weight: 700; margin: 3px 0 3px; }
  .lead p { font-size: 11.5px; line-height: 1.28; color: #334155; }
  .cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px 9px; margin-top: 7px; }
  .card .body { padding: 4px 7px 5px; }
  .card .tag { font-size: 9px; letter-spacing: .5px; }
  h3 { font-family: Georgia, 'Times New Roman', serif; font-size: 14px; line-height: 1.1; font-weight: 700; margin: 2px 0 2px; }
  .card p { font-size: 10.5px; line-height: 1.24; color: #475569; }
  .bottom { display: grid; grid-template-columns: ${MAP_W + 14}px 1fr; gap: 10px; margin-top: 7px; }
  .panel { padding: 5px 7px; }
  .panel h4 { font-size: 11px; font-weight: 900; letter-spacing: 1.1px; text-transform: uppercase; color: ${NAVY}; margin-bottom: 4px; display: flex; justify-content: space-between; }
  .panel h4 span { font-weight: 600; letter-spacing: .2px; text-transform: none; color: #64748b; }
  .map svg { display: block; border-radius: 3px; }
  .legend { display: flex; flex-wrap: wrap; gap: 3px 10px; font-size: 10px; font-weight: 700; color: #334155; margin-top: 5px; }
  .legend i { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 4px; vertical-align: -1px; }
  ul { list-style: none; columns: 2; column-gap: 12px; }
  li { display: flex; align-items: center; gap: 6px; font-size: 11.3px; line-height: 1.1; padding: 0.4px 0; border-bottom: 1px solid #eef0f3; white-space: nowrap; break-inside: avoid; }
  li b { font-weight: 800; color: ${NAVY}; }
  footer { text-align: center; font-size: 10px; color: #475569; margin-top: 5px; line-height: 1.3; }
  footer b { color: ${NAVY}; }
</style></head><body>
  <header class="mast">
    <div class="row"><span class="kicker">The world’s news in one picture</span><span class="count">${storyCount} stories · 6 continents · one day</span></div>
    <h1>${esc(DAY.weekday)} ${esc(DAY.date)}</h1>
  </header>
  <div class="ticker">${figHtml}</div>
  <main>
    <section class="leads">${leadHtml}</section>
    <section class="cards">${cardHtml}</section>
    <section class="bottom">
      <div class="panel map"><h4>Where it happened <span>Pins match the story numbers</span></h4>${map}<div class="legend">${legend}</div></div>
      <div class="panel also"><h4>Also on ${esc(DAY.weekday)} ${esc(DAY.date)}</h4><ul>${alsoHtml}</ul></div>
    </section>
    <footer><b>Every story here happened or was announced on ${esc(DAY.weekday)} ${esc(DAY.date)}.</b> Disputed claims are attributed. ${esc(SOURCES)}. Words and drawings are our own, made in code.</footer>
  </main>
</body></html>`;

const pagePath = join(outDir, 'page.html');
writeFileSync(pagePath, html);

const chrome = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const shot = join(outDir, 'shot.png');
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--window-size=1024,1024', `--screenshot=${shot}`, pathToFileURL(pagePath).href,
], { stdio: 'ignore' });
const dest = process.env.OUT ?? join(root, 'entry.png');
copyFileSync(shot, dest);
console.log(`${dest}: ${statSync(dest).size} bytes, ${storyCount} stories`);
