import fs from 'node:fs/promises';
import path from 'node:path';

import { bus331IntroDecks, bus331IntroMetadata } from './decks/bus331-intro-m01-m04-content.mjs';
import { bus331IntroSource } from './decks/bus331-intro-source-data.mjs';

const root = path.resolve(import.meta.dirname, '..');
const destinationRoot = path.join(root, '01- Intro-Investments');
const css = await fs.readFile(path.join(root, 'styles', 'bus331-deck.css'), 'utf8');

const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

const destinationBySource = new Map();
const generatedCounts = {};

for (const [moduleId, deck] of Object.entries(bus331IntroDecks)) {
  const outputDir = path.join(destinationRoot, moduleId);
  const output = path.join(outputDir, deck.output);
  generatedCounts[moduleId] = deck.slides.length;
  const slides = deck.slides.map((item, index) => {
    const number = String(index + 1).padStart(3, '0');
    const destination = `${moduleId} ${number} ${item.label}`;
    for (const source of String(item.sourceSlides).split(',').map(Number).filter(Number.isFinite)) {
      const values = destinationBySource.get(source) || [];
      if (!item.added) values.push(destination);
      destinationBySource.set(source, values);
    }
    return `<section class="slide ${esc(item.classes)}" data-label="${number} ${esc(item.label)}" data-source-slides="${esc(item.sourceSlides)}" data-treatment="${esc(item.treatment)}" data-action="${esc(item.action)}"${item.added ? ' data-added="instructional"' : ''}>${item.body}</section>`;
  }).join('\n');
  const notes = JSON.stringify(deck.slides.map((item) => item.note || '')).replace(/<\//g, '<\\/');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="course" content="BUS331 Investments">
  <meta name="module" content="${moduleId}">
  <meta name="source-file" content="${esc(bus331IntroMetadata.sourceFile)}">
  <title>${esc(moduleId)} — ${esc(deck.title)} — BUS331</title>
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
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(output, html);
  console.log(`Built ${path.relative(root, output)} (${deck.slides.length} slides)`);
}

const inventoryRows = bus331IntroSource.slides.map((source) => {
  const destinations = destinationBySource.get(source.sourceSlide) || [];
  const elements = [
    `${source.visualCount} visual${source.visualCount === 1 ? '' : 's'}`,
    `${source.tables.length} table${source.tables.length === 1 ? '' : 's'}`,
    source.speakerNote ? 'speaker note' : 'no source note',
    source.kind === 'activity' ? 'activity / exercise' : source.kind
  ].join('; ');
  const restoredSourceImage = [13, 14, 15].includes(source.sourceSlide);
  const decision = source.held ? 'Held for instructor review'
    : source.sourceVisualHeld ? 'Editable rebuild; source capture held'
      : restoredSourceImage ? 'Source images restored in branded rebuild'
      : destinations.length > 1 ? 'Split and rebuilt'
        : 'Rebuilt';
  const destination = source.held ? 'Not exposed in student deck' : destinations.join('<br>');
  const note = source.held ? source.holdReason
    : source.sourceVisualHeld ? 'Substantive content is preserved; the original licensed/vendor capture is not embedded.'
      : restoredSourceImage ? 'Original embedded source images are preserved with editable headings, prompts and accessibility text.'
      : 'Substantive source text and notes are retained in the maintained source module.';
  return `| ${source.sourceSlide} | ${source.module} | ${esc(source.title).replace(/\|/g, '\\|')} | ${elements} | ${decision} | ${destination} | ${note} |`;
});

const allDivisions = Object.entries(bus331IntroMetadata.modules)
  .flatMap(([moduleId, meta]) => meta.divisions.map((division) => `- **${moduleId}:** ${division.label} (begins at source slide ${division.source})`))
  .join('\n');
const totalGenerated = Object.values(generatedCounts).reduce((sum, value) => sum + value, 0);
const sourceNoteCount = bus331IntroSource.slides.filter((source) => source.speakerNote).length;
const tableCount = bus331IntroSource.slides.reduce((sum, source) => sum + source.tables.length, 0);
const visualCount = bus331IntroSource.slides.reduce((sum, source) => sum + source.visualCount, 0);
const inventory = `# BUS331 Chapters 1–4 source inventory

- Source: \`${bus331IntroMetadata.sourceFile}\`
- Source slides: ${bus331IntroMetadata.sourceSlideCount}
- Generated student slides: ${totalGenerated} (${Object.entries(generatedCounts).map(([key, value]) => `${key}: ${value}`).join('; ')})
- Source elements audited: ${sourceNoteCount} substantive speaker-note pages; ${tableCount} tables; ${visualCount} visual objects/fills
- Coverage rule: every source slide is mapped to generated student content or explicitly held for instructor review.
- Public-deck rule: named student data, stale dated announcements and licensed FactSet captures are not embedded. Original source images on slides 13–15 are restored at the instructor's direction and documented for rights review.

| Source slide | Module | Source title / topic | Source elements | Decision | HTML destination | Preservation note |
| ---: | --- | --- | --- | --- | --- | --- |
${inventoryRows.join('\n')}

## Proposed 75-minute lesson divisions

${allDivisions}

The chapter content remains one navigable deck per module. The lesson divisions are internal section breaks, not separate lesson files.
`;
await fs.mkdir(destinationRoot, { recursive: true });
await fs.writeFile(path.join(destinationRoot, 'source-inventory.md'), inventory);
console.log(`Built ${path.relative(root, path.join(destinationRoot, 'source-inventory.md'))} (${bus331IntroMetadata.sourceSlideCount} source rows)`);
