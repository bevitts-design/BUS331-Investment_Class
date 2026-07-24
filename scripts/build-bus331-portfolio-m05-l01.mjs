import fs from 'node:fs/promises';
import path from 'node:path';

import { chapter5Deck } from './decks/bus331-portfolio-m05-l01-content.mjs';

const root = path.resolve(import.meta.dirname, '..');
const outputDir = path.join(root, '02-PORTFOLIO-THEORY', 'M05');
const output = path.join(outputDir, 'bus331-portfolio-m05-l01-slides.html');
const inventoryOutput = path.join(outputDir, 'source-inventory.md');
const css = await fs.readFile(path.join(root, 'styles', 'bus331-deck.css'), 'utf8');

const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

const slides = chapter5Deck.slides.map((item, index) => {
  const number = String(index + 1).padStart(2, '0');
  return `<section class="slide ${esc(item.classes)}" data-label="${number} ${esc(item.label)}" data-source-slides="${esc(item.slides)}" data-treatment="${esc(item.treatment)}">${item.body}</section>`;
}).join('\n');

const notes = JSON.stringify(chapter5Deck.slides.map((item) => item.note || '')).replace(/<\//g, '<\\/');
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="course" content="BUS331 Investments">
  <meta name="source-file" content="${esc(chapter5Deck.sourceFile)}">
  <title>Chapter 5 — Risk, Return and the Historical Record — BUS331</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>
<body>
  <deck-stage width="1920" height="1080" no-rail>
${slides}
  </deck-stage>
  <script id="speaker-notes" type="application/json">${notes}</script>
  <script src="../../deck-stage.js"></script>
  <script src="../../image-slot.js"></script>
  <script src="../../tweaks-panel.jsx"></script>
</body>
</html>
`;

const sourceMap = new Map();
const expand = (spec) => {
  const values = [];
  for (const part of String(spec).split(',')) {
    const match = part.trim().match(/^(\d+)(?:-(\d+))?$/);
    if (!match) continue;
    const start = Number(match[1]);
    const end = Number(match[2] || match[1]);
    for (let value = start; value <= end; value += 1) values.push(value);
  }
  return values;
};
chapter5Deck.slides.forEach((item, index) => {
  expand(item.slides).forEach((source) => {
    const rows = sourceMap.get(source) || [];
    rows.push(`${String(index + 1).padStart(2, '0')} ${item.label}`);
    sourceMap.set(source, rows);
  });
});
const held = new Map(chapter5Deck.heldSourceSlides.map((item) => [item.slide, item]));
const inventoryRows = [];
for (let source = 1; source <= chapter5Deck.sourceSlideCount; source += 1) {
  const mapped = sourceMap.get(source) || [];
  const heldItem = held.get(source);
  const decision = heldItem ? 'hold pending approval' : mapped.length > 1 ? 'split and rebuild' : 'rebuild';
  const destination = heldItem ? 'Not in public pilot' : mapped.join('; ');
  const note = heldItem ? heldItem.reason : 'All substantive source content retained in editable HTML/SVG.';
  inventoryRows.push(`| ${source} | ${decision} | ${destination} | ${note} |`);
}
const inventory = `# BUS331 Chapter 5 source inventory

- Source: \`${chapter5Deck.sourceFile}\`
- Source slides: ${chapter5Deck.sourceSlideCount}
- Public pilot slides: ${chapter5Deck.slides.length}
- Conversion mode: fast branded rebuild
- Preservation rule: no source information may be omitted without instructor approval.

| Source slide | Decision | Pilot destination | Note |
| ---: | --- | --- | --- |
${inventoryRows.join('\n')}

## Recommended 75-minute sections

${chapter5Deck.recommendedSections.map((item) => `- **${item.label}:** source slides ${item.sourceSlides}`).join('\n')}
`;

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(output, html);
await fs.writeFile(inventoryOutput, inventory);
console.log(`Built ${path.relative(root, output)} (${chapter5Deck.slides.length} slides)`);
console.log(`Built ${path.relative(root, inventoryOutput)} (${chapter5Deck.sourceSlideCount} source rows)`);
