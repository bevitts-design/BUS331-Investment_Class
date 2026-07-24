import fs from 'node:fs/promises';
import path from 'node:path';

import { chapter5Deck } from './decks/bus331-portfolio-m05-l01-content.mjs';

const root = path.resolve(import.meta.dirname, '..');
const deckPath = path.join(root, '02-PORTFOLIO-THEORY', 'M05', 'bus331-portfolio-m05-l01-slides.html');
const html = await fs.readFile(deckPath, 'utf8');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

const slideMatches = [...html.matchAll(/<section class="slide\s/g)];
check(slideMatches.length === chapter5Deck.slides.length, `expected ${chapter5Deck.slides.length} slides; found ${slideMatches.length}`);
check((html.match(/data-source-slides=/g) || []).length === chapter5Deck.slides.length, 'every slide must include source provenance');
check(html.includes('<deck-stage width="1920" height="1080" no-rail>'), 'missing required deck-stage scaffold');
check(html.includes('../../deck-stage.js') && html.includes('../../image-slot.js') && html.includes('../../tweaks-panel.jsx'), 'missing shared runtime references');
check(html.includes("--accent:var(--gold)"), 'BUS331 gold accent is missing');
check(html.includes("'Instrument Serif'") && html.includes("'Geist'") && html.includes("'JetBrains Mono'"), 'required fonts are missing');
check(!/font-size:(?:[0-9]|1[0-9]|2[0-3])px/.test(html), 'slide CSS contains text below the 24px floor');
check(!html.includes('BUS311'), 'BUS311 branding leaked into the BUS331 deck');
check(!html.includes('font-family:Inter') && !html.includes("'Inter'"), 'Inter is not allowed in BUS331 slide content');
check(!html.includes('/Users/') && !html.includes('OneDrive-Personal'), 'local source path leaked into output');
check(!html.includes('Answer Key'), 'the held spreadsheet answer key leaked into the public pilot');
check(html.includes('3.50–3.75%') && html.includes('2.35%'), 'verified July 2026 rate snapshot is missing');
check(html.includes('data-treatment="HTML/SVG-led"'), 'visual-treatment classification is missing');
check(!/<svg(?![^>]*(?:role="img"|aria-hidden="true"))/.test(html.replace(/<div[^>]+role="img"[^>]*>[\s\S]*?<\/div>/g, '')), 'an unlabelled SVG may be present');

const covered = new Set();
const expand = (spec) => {
  for (const part of String(spec).split(',')) {
    const match = part.trim().match(/^(\d+)(?:-(\d+))?$/);
    if (!match) continue;
    const start = Number(match[1]);
    const end = Number(match[2] || match[1]);
    for (let value = start; value <= end; value += 1) covered.add(value);
  }
};
chapter5Deck.slides.forEach((item) => expand(item.slides));
chapter5Deck.heldSourceSlides.forEach((item) => covered.add(item.slide));
for (let source = 1; source <= chapter5Deck.sourceSlideCount; source += 1) check(covered.has(source), `source slide ${source} is not mapped or held`);

const hpr = ((12500 - 10000) + 300) / 10000;
const ear = (1 + hpr) ** (1 / 1.5) - 1;
const apr = ((1 + hpr) ** (1 / 18) - 1) * 12;
const continuous = Math.log(1 + hpr) / 1.5;
check(Math.abs(hpr - 0.28) < 1e-10, 'HPR calculation failed');
check(Math.abs(ear - 0.1788900796) < 1e-9, 'EAR calculation failed');
check(Math.abs(apr - 0.1657070787) < 1e-9, 'APR calculation failed');
check(Math.abs(continuous - 0.1645733853) < 1e-9, 'continuous-return calculation failed');

const localRefs = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map((match) => match[1]).filter((ref) => !/^(?:https?:|mailto:)/.test(ref));
for (const ref of localRefs) {
  const clean = ref.split('?')[0];
  try { await fs.access(path.resolve(path.dirname(deckPath), clean)); }
  catch { failures.push(`missing local reference: ${ref}`); }
}

if (failures.length) {
  console.error('VALIDATION FAILED');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`VALIDATION PASSED: ${chapter5Deck.slides.length} pilot slides; ${chapter5Deck.sourceSlideCount}/${chapter5Deck.sourceSlideCount} source slides mapped or held; formulas and local references verified.`);
