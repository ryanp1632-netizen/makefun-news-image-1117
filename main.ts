// Sum up Tuesday 17 November 2026's world news in one image.
//
// The picture is drawn ahead of time by render/build.mjs (hand-written SVG drawings laid out in HTML and
// screenshotted by headless Chrome) and committed as entry.png. The grader runs with no network, so this
// program only checks that the committed file is a whole PNG within the contest's limits and copies it to
// /output/entry.png (MAKEFUN_OUTPUT_DIR stands in for /output when run locally).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1_048_576;
const MAX_SIDE = 1024;
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function checkPng(bytes: Buffer): { width: number; height: number } {
  if (bytes.length > MAX_BYTES) throw new Error(`entry.png is ${bytes.length} bytes, over ${MAX_BYTES}`);
  PNG_SIGNATURE.forEach((b, i) => {
    if (bytes[i] !== b) throw new Error('entry.png does not start with the PNG signature');
  });
  if (bytes.toString('latin1', 12, 16) !== 'IHDR') throw new Error('entry.png has no IHDR chunk first');
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (width > MAX_SIDE || height > MAX_SIDE) throw new Error(`entry.png is ${width}x${height}, over ${MAX_SIDE}`);
  if (bytes.toString('latin1', bytes.length - 8, bytes.length - 4) !== 'IEND') throw new Error('entry.png is cut short (no IEND)');
  return { width, height };
}

const image = readFileSync(new URL('./entry.png', import.meta.url));
const { width, height } = checkPng(image);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');
mkdirSync(outDir, { recursive: true });
writeFileSync(target, image);

// Read the copy back: the judge sees exactly these bytes, so a short or altered write must fail loudly.
const written = readFileSync(target);
if (!written.equals(image)) throw new Error(`${target} does not match entry.png after copying`);
console.log(`wrote ${target} (${width}x${height}, ${image.length} bytes)`);
