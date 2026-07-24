import fs from 'node:fs/promises';
import path from 'node:path';

const [auditPath, outputPath] = process.argv.slice(2);
if (!auditPath || !outputPath) {
  throw new Error('Usage: node scripts/bootstrap-bus331-intro-source.mjs <audit.json> <output.mjs>');
}

const audit = JSON.parse(await fs.readFile(auditPath, 'utf8'));
const heldSlides = new Map([
  [9, 'Named student team assignments are withheld from the student-facing deck to protect student privacy.'],
  [62, 'The dated next-class announcement is stale and is held for instructor review.'],
  [107, 'The dated Tuesday February 3 announcement is stale and is held for instructor review.']
]);
const licensedVisualSlides = new Set([
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  75, 78, 79, 80, 82, 85, 86, 87, 93, 106, 109, 110, 111, 114, 119,
  120, 129, 134, 135, 136, 137, 138, 141, 142, 144, 145, 153, 155,
  156, 163, 164, 165, 166, 169, 170, 171, 173, 174, 175, 176, 177,
  183, 184, 186, 187, 188, 191, 192, 193, 195, 196
]);
const activitySlides = new Set([11, 12, 13, 14, 15, 33, 37, 38, 61, 65, 130, 178, 194, 195, 196, 197]);
const sectionSlides = new Set([1, 32, 63, 66, 89, 97, 112, 115, 128, 131, 140, 161, 167, 172, 179, 194, 198]);
const dataSlides = new Set([
  47, 48, 49, 50, 53, 54, 55, 56, 57, 58, 59, 60, 67, 69, 70, 71,
  75, 78, 79, 80, 81, 82, 85, 86, 87, 93, 95, 96, 106, 109, 110,
  111, 120, 121, 122, 123, 124, 125, 126, 127, 138, 144, 145, 149,
  151, 152, 153, 155, 156, 159, 164, 165, 166, 170, 183, 186, 187, 188, 191, 193
]);
const tableSlides = new Set(audit.slides.filter((slide) => slide.tables.length).map((slide) => slide.slide));

const cleanBlocks = (slideNumber, values) => values
  .map((value) => value.replace(/^©\s*(?:McGraw Hill|2025 Factset Research Systems Inc\.)$/gim, '').trim())
  .filter((value) => value && value !== String(slideNumber));

const moduleFor = (slideNumber) => {
  if (slideNumber <= 62) return 'M01';
  if (slideNumber <= 130) return 'M02';
  if (slideNumber <= 178) return 'M03';
  return 'M04';
};

const slides = audit.slides.map((item) => {
  const holdReason = heldSlides.get(item.slide) || '';
  const title = item.slide === 3 ? 'Meet your instructor'
    : item.slide === 9 ? 'Investment project teams'
    : item.slide === 198 ? 'BUS331 Investments'
      : item.title.replace(/^Visual source slide \d+$/, `Source visual ${item.slide}`);
  let textBlocks = cleanBlocks(item.slide, item.textBlocks);
  let speakerNote = item.speakerNote;
  if (item.slide === 3) {
    textBlocks = [
      'Education: Chartered Financial Analyst; MBA, Boston College; BA, Economics, Colby College.',
      'Experience: more than 30 years across fixed income, funds, investment technology, product management and academic instruction.',
      'Personal-family details and the source family photograph are retained only for instructor review.'
    ];
    speakerNote = 'The source slide includes a family photograph and personal family details. These are not copied into the public student deck pending instructor approval.';
  }
  if (item.slide === 9) {
    textBlocks = ['Investment project teams', 'The source contains named student team assignments.'];
    speakerNote = holdReason;
  }

  const kind = sectionSlides.has(item.slide) ? 'section'
    : activitySlides.has(item.slide) ? 'activity'
      : tableSlides.has(item.slide) ? 'table'
        : dataSlides.has(item.slide) ? 'data'
          : 'concept';
  const treatment = kind === 'section' || (textBlocks.length <= 1 && item.visuals.length === 0)
    ? 'sparse text'
    : kind === 'data' || kind === 'table' ? 'data-led'
      : 'HTML/SVG-led';

  return {
    sourceSlide: item.slide,
    module: moduleFor(item.slide),
    title,
    kind,
    treatment,
    textBlocks,
    tables: item.tables,
    speakerNote,
    visualCount: item.visuals.length,
    sourceVisualHeld: licensedVisualSlides.has(item.slide),
    held: Boolean(holdReason),
    holdReason
  };
});

const content = `// Maintained, path-safe source record for BUS331 Chapters 1-4.
// Bootstrapped from the instructor-provided PPTX; update this module rather than the generated HTML.

export const bus331IntroSource = ${JSON.stringify({
  sourceFile: audit.sourceFile,
  sourceSlideCount: audit.sourceSlideCount,
  slides
}, null, 2)};
`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, content);
console.log(`Wrote ${outputPath} with ${slides.length} path-safe source records.`);
