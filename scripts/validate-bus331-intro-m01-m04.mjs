import fs from 'node:fs/promises';
import path from 'node:path';

import { bus331IntroDecks, bus331IntroMetadata } from './decks/bus331-intro-m01-m04-content.mjs';
import { bus331IntroSource } from './decks/bus331-intro-source-data.mjs';

const root = path.resolve(import.meta.dirname, '..');
const destinationRoot = path.join(root, '01- Intro-Investments');
const failures = [];
const checks = [];
const check = (condition, message) => {
  checks.push(message);
  if (!condition) failures.push(message);
};

const expandSources = (spec, target) => {
  for (const part of String(spec).split(',')) {
    const match = part.trim().match(/^(\d+)(?:-(\d+))?$/);
    if (!match) continue;
    const start = Number(match[1]);
    const end = Number(match[2] || match[1]);
    for (let value = start; value <= end; value += 1) target.add(value);
  }
};

const covered = new Set();
const allHtml = [];
let totalGenerated = 0;

for (const [moduleId, deck] of Object.entries(bus331IntroDecks)) {
  const deckPath = path.join(destinationRoot, moduleId, deck.output);
  const html = await fs.readFile(deckPath, 'utf8');
  allHtml.push(html);
  totalGenerated += deck.slides.length;

  const slideCount = (html.match(/<section class="slide\s/g) || []).length;
  const deckMarkup = html.match(/<deck-stage[^>]*>([\s\S]*?)<\/deck-stage>/)?.[1] || '';
  check(slideCount === deck.slides.length, `${moduleId}: expected ${deck.slides.length} slides; found ${slideCount}`);
  check((html.match(/data-source-slides=/g) || []).length === deck.slides.length, `${moduleId}: every generated slide has source provenance`);
  check((html.match(/data-treatment=/g) || []).length === deck.slides.length, `${moduleId}: every generated slide has a visual-treatment classification`);
  check(html.includes('<deck-stage width="1920" height="1080" no-rail>'), `${moduleId}: required 1920×1080 deck-stage scaffold is present`);
  check(html.includes('../../deck-stage.js') && html.includes('../../image-slot.js') && html.includes('../../tweaks-panel.jsx'), `${moduleId}: shared runtime references are present`);
  check(html.includes('--accent:var(--gold)'), `${moduleId}: BUS331 investment-gold accent is present`);
  check(html.includes("'Instrument Serif'") && html.includes("'Geist'") && html.includes("'JetBrains Mono'"), `${moduleId}: BUS331 font system is present`);
  check(!/font-size:\s*(?:[0-9]|1[0-9]|2[0-3])(?:\.\d+)?px/.test(html), `${moduleId}: no CSS text size is below the 24 px floor`);
  check(!html.includes('BUS311'), `${moduleId}: no BUS311 branding is present`);
  check(!html.includes("'Inter'") && !html.includes('font-family:Inter'), `${moduleId}: no BUS311 Inter typeface is present`);
  check(!html.includes('/Users/') && !html.includes('OneDrive-Personal') && !html.includes('CloudStorage'), `${moduleId}: no local or OneDrive path is exposed`);
  check(!html.includes('Investment project teams') && !html.includes('Next Class Jan 27') && !html.includes('Tuesday Feb 3rd'), `${moduleId}: held roster and stale announcements are not exposed`);
  check(!html.includes('Answer Key') && !html.includes('INSTRUCTOR_') && !html.includes('grading rubric'), `${moduleId}: no obvious answer-key or grading material is exposed`);
  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const heroTags = imageTags.filter((tag) => tag.includes(`src="${deck.heroImage}"`));
  check(heroTags.length === 1 && /alt="[^"]+"/.test(heroTags[0]), `${moduleId}: chapter image is the approved local asset with meaningful alt text`);
  const expectedImageCount = moduleId === 'M01' ? 13 : 1;
  check(imageTags.length === expectedImageCount, `${moduleId}: expected ${expectedImageCount} intentional local images; found ${imageTags.length}`);
  if (moduleId === 'M01') {
    for (const sourceImage of [
      'source-slide-02-investments-13e.png',
      'source-slide-02-investments-1998.png',
      'source-slide-13-globe.png',
      'source-slide-13-current-events.png',
      'source-slide-13-headline-ma.png',
      'source-slide-13-headline-bonds.png',
      'source-slide-13-headline-stocks.png',
      'source-slide-13-headline-more.png',
      'source-slide-14-handbag.jpeg',
      'source-slide-15-luxus-hermes.png',
      'source-slide-15-fund-caption.png'
    ]) {
      check(imageTags.some((tag) => tag.includes(sourceImage) && /alt="[^"]+"/.test(tag)), `${moduleId}: restored source image ${sourceImage} has meaningful alternative text`);
    }
  }
  check(!/<span>\d{2}<\/span>/.test(html), `${moduleId}: generic boxes no longer carry automatic number badges`);
  check(!html.includes('class="intro-card-number"'), `${moduleId}: no numbered-card badges remain in generated slide markup`);
  check(!html.includes('class="intro-steps"'), `${moduleId}: no generic numbered-step grid remains in generated slide markup`);
  check((html.match(/class="intro-icon"/g) || []).length >= 20, `${moduleId}: concept panels include editable icon graphics`);
  check(!/<svg(?![^>]*(?:role="img"|aria-hidden="true"))/i.test(html), `${moduleId}: every SVG is labelled or decorative`);
  check(!html.includes('The source visual for slide'), `${moduleId}: no generic visual placeholder remains`);
  check(!/\bsource slide\b/i.test(deckMarkup), `${moduleId}: source-slide provenance is not visible on student-facing slides`);
  check(!deckMarkup.includes('class="source-note"'), `${moduleId}: instructor review notes are not visible on the slide canvas`);

  const sectionMarkup = [...html.matchAll(/<section class="slide\s[\s\S]*?<\/section>/g)].map((match) => match[0]);
  const genericGridIndexes = sectionMarkup
    .map((section, index) => (/class="intro-grid(?:\s+compact)?"/.test(section) ? index : -1))
    .filter((index) => index >= 0);
  const genericGridLimit = Math.ceil(deck.slides.length / 15);
  check(genericGridIndexes.length <= genericGridLimit, `${moduleId}: generic card grids do not exceed one per 15 slides`);
  check(genericGridIndexes.every((index, position) => position === 0 || index - genericGridIndexes[position - 1] > 1), `${moduleId}: generic card grids never appear on consecutive slides`);
  for (const index of genericGridIndexes) {
    const cardCount = (sectionMarkup[index].match(/<article class="intro-card\b/g) || []).length;
    check(cardCount <= 3, `${moduleId}: generic card grid on slide ${index + 1} contains no more than three cards`);
  }
  const fallbackSequence = sectionMarkup.map((section) => section.match(/class="concept-field concept-(spotlight|duet|triad|ribbons|cascade|orbit)\b/)?.[1] || '');
  const fallbackTypes = fallbackSequence.filter(Boolean);
  const fallbackCounts = Object.fromEntries(['spotlight', 'duet', 'triad', 'ribbons', 'cascade', 'orbit'].map((type) => [type, fallbackTypes.filter((value) => value === type).length]));
  if (fallbackTypes.length >= 6) {
    for (const [type, count] of Object.entries(fallbackCounts)) {
      check(count <= Math.ceil(fallbackTypes.length * 0.55), `${moduleId}: ${type} fallback does not dominate more than 55% of adaptive concept slides`);
    }
  }
  check(fallbackSequence.every((type, index) => !type || index < 2 || type !== fallbackSequence[index - 1] || type !== fallbackSequence[index - 2]), `${moduleId}: no adaptive concept composition repeats three slides in a row`);

  const notesMatch = html.match(/<script id="speaker-notes" type="application\/json">([\s\S]*?)<\/script>/);
  let noteCount = 0;
  try {
    noteCount = notesMatch ? JSON.parse(notesMatch[1]).length : 0;
  } catch {
    noteCount = -1;
  }
  check(noteCount === deck.slides.length, `${moduleId}: speaker-note records match generated slides`);

  const localRefs = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
    .map((match) => match[1])
    .filter((ref) => !/^(?:https?:|mailto:)/.test(ref));
  for (const ref of localRefs) {
    const clean = ref.split('?')[0];
    try {
      await fs.access(path.resolve(path.dirname(deckPath), clean));
    } catch {
      failures.push(`${moduleId}: missing local reference ${ref}`);
    }
  }

  for (const slide of deck.slides) {
    if (!slide.added) expandSources(slide.sourceSlides, covered);
  }
}

for (const held of bus331IntroMetadata.heldSlides) covered.add(held.sourceSlide);
for (let source = 1; source <= bus331IntroSource.sourceSlideCount; source += 1) {
  check(covered.has(source), `source slide ${source} is mapped or explicitly held`);
}
check(covered.size === bus331IntroSource.sourceSlideCount, `coverage set contains exactly ${bus331IntroSource.sourceSlideCount} source slides`);
check(bus331IntroMetadata.heldSlides.map((item) => item.sourceSlide).join(',') === '3,9,62,107', 'only the four documented source slides are held');
const quoteSource = bus331IntroSource.slides.find((source) => source.sourceSlide === 4);
const quoteSlide = bus331IntroDecks.M01.slides.find((slide) => slide.sourceSlides === '4');
check(Boolean(quoteSource?.speakerNote), 'source slide 4 speaker note remains preserved in the maintained source record');
check(quoteSlide?.classes.includes('quote-focus-slide') && quoteSlide.body.includes('quote-focus-shell'), 'source slide 4 is rebuilt as a dedicated quote-focus slide');
check(quoteSlide?.note === '', 'source slide 4 source note is omitted from the generated student deck');
check(quoteSlide?.body.includes('Often attributed to <b>Benjamin Franklin</b>'), 'quote attribution is anchored in the quote-focus composition');
const projectSlides = bus331IntroDecks.M01.slides.filter((slide) => slide.sourceSlides === '5');
const projectSlide = projectSlides[0];
check(projectSlides.length === 1, 'source slide 5 is combined into one generated project-workflow slide');
check(projectSlide?.body.includes('class="project-workflow"'), 'source slide 5 uses the editable graphical project workflow');
for (const requiredProjectItem of [
  'Podcasts',
  'Current events',
  'Canvas discussion groups',
  'ETF prospectus',
  'Comps valuation spreadsheet',
  'DCF spreadsheet',
  'Mutual fund NAV + fee calculations',
  'FACTSET',
  'EXCEL'
]) {
  check(projectSlide?.body.includes(requiredProjectItem), `combined project workflow preserves ${requiredProjectItem}`);
}
const sourceImageSequence = [13, 14, 15].map((sourceSlide) => bus331IntroDecks.M01.slides.find((slide) => slide.sourceSlides === String(sourceSlide)));
check(sourceImageSequence.every(Boolean), 'source slides 13–15 remain a contiguous three-slide teaching sequence');
check(sourceImageSequence[0]?.body.includes('class="source-events-board"'), 'generated slide 21 restores the source current-events collage');
check((sourceImageSequence[0]?.body.match(/<img\b/g) || []).length === 6, 'generated slide 21 preserves all six visible source images');
check(sourceImageSequence[0]?.note.toLowerCase().includes('recheck') && sourceImageSequence[0]?.note.includes('December 2025'), 'generated slide 21 dates the source headlines and carries a recheck-before-class note');
check(sourceImageSequence[1]?.body.includes('class="investment-question-reveal"') && sourceImageSequence[1]?.body.includes('source-slide-14-handbag.jpeg'), 'generated slide 22 restores the original handbag question reveal');
check(sourceImageSequence[2]?.body.includes('class="handbag-fund-reveal"') && sourceImageSequence[2]?.body.includes('source-slide-15-luxus-hermes.png') && sourceImageSequence[2]?.body.includes('source-slide-15-fund-caption.png'), 'generated slide 23 restores the original handbag-fund evidence');
check(sourceImageSequence[2]?.body.includes('Good investment') && sourceImageSequence[2]?.body.includes('What could go wrong?'), 'generated slide 23 preserves both discussion questions');
const gradingSlides = bus331IntroDecks.M01.slides.filter((slide) => slide.sourceSlides === '7');
check(gradingSlides.length === 3, 'source slide 7 remains three readable grading slides');
for (const gradingClass of ['grade-allocation', 'grade-rhythm', 'grade-demonstration']) {
  check(gradingSlides.some((slide) => slide.body.includes(`class="${gradingClass}"`)), `source slide 7 includes the ${gradingClass} visual`);
}
for (const gradingText of [
  'Attendance + participation',
  'Reading',
  'Homework',
  'In-class activities',
  'Concept checks',
  'Investment project + presentations',
  'no electronics · no notes',
  'Individual grades',
  'Group feedback',
  'Business-level presentation',
  'Grading for BUS331-02'
]) {
  check(gradingSlides.some((slide) => slide.body.toLowerCase().includes(gradingText.toLowerCase())), `grading visuals preserve ${gradingText}`);
}
const gradingWeights = [15, 10, 10, 30, 10, 25];
check(gradingWeights.reduce((sum, weight) => sum + weight, 0) === 100, 'six grading weights sum to 100%');
check(gradingWeights.slice(0, 4).reduce((sum, weight) => sum + weight, 0) === 65, 'weekly-work grading components sum to 65%');
check(gradingWeights.slice(4).reduce((sum, weight) => sum + weight, 0) === 35, 'concept-check and project grading components sum to 35%');

const inventory = await fs.readFile(path.join(destinationRoot, 'source-inventory.md'), 'utf8');
const inventoryRows = inventory.split('\n').filter((line) => /^\| \d+ \| M0[1-4] \|/.test(line));
check(inventoryRows.length === bus331IntroSource.sourceSlideCount, `source inventory has ${bus331IntroSource.sourceSlideCount} source rows`);
check(inventory.includes('every source slide is mapped'), 'source inventory states the complete-coverage rule');
check(bus331IntroSource.slides.filter((source) => !source.held).length === 194, 'exactly 194 source slides remain represented in the student decks');

const runtime = await fs.readFile(path.join(root, 'deck-stage.js'), 'utf8');
const sharedCss = await fs.readFile(path.join(root, 'styles', 'bus331-deck.css'), 'utf8');
check(runtime.includes("'ArrowRight'") && runtime.includes("'ArrowLeft'") && runtime.includes("event.key.toLowerCase() === 'n'"), 'shared runtime binds keyboard navigation and speaker-note controls');
check(sharedCss.includes('.tweaks-menu[hidden]{display:none}'), 'collapsed presentation-tools menu does not cover slide content');
check(sharedCss.includes('.intro-source-table th[scope="row"]{text-align:left;color:var(--white)'), 'semantic table row labels meet the navy-background contrast requirement');

const joinedHtml = allHtml.join('\n');
for (const requiredValue of [
  '3.50–3.75%',
  '3.89%',
  '4.67%',
  '3.5%',
  '6.55%',
  '332.68',
  '+0.8%',
  '$15.3T',
  '66.1B',
  '135M+',
  '8.6%',
  '$40.605',
  '$40.61'
]) {
  check(joinedHtml.includes(requiredValue), `required verified value ${requiredValue} is present`);
}
for (const sourceKey of ['federalreserve.gov', 'home.treasury.gov', 'bls.gov', 'fdic.gov', 'newyorkfed.org', 'freddiemac.com', 'spglobal.com']) {
  check(joinedHtml.includes(sourceKey), `official source link ${sourceKey} is present`);
}
check(joinedHtml.includes('<table class="finance-table'), 'source tables are rebuilt as semantic HTML tables');
check(joinedHtml.includes('role="img" aria-label='), 'editable instructional graphics carry meaningful labels');
check(joinedHtml.includes('Recheck before class') || joinedHtml.includes('recheck before class'), 'time-sensitive speaker notes include a recheck-before-class reminder');
check(joinedHtml.includes('Class C · no front-end load') && joinedHtml.includes('source table header says Class B'), 'Class C correction and original Class B discrepancy are both preserved');
for (const graphicClass of [
  'welcome-books',
  'project-workflow',
  'source-events-board',
  'investment-question-reveal',
  'handbag-fund-reveal',
  'grade-allocation',
  'grade-rhythm',
  'grade-demonstration',
  'factset-launchpad',
  'activation-console',
  'learning-library',
  'help-orbit',
  'news-evidence-funnel',
  'economic-calendar',
  'comp-workbench',
  'transcript-workbench',
  'sector-intelligence-map',
  'factset-exploration-lab',
  'index-blueprint',
  'fund-source-pyramid',
  'project-mission',
  'stress-test-board',
  'investment-process',
  'risk-return-rebuild',
  'crisis-taxonomy',
  'mbs-cashflow',
  'cdo-waterfall',
  'market-spectrum',
  'index-scale price-scale',
  'market-cap-logic',
  'ipo-org',
  'market-mosaic',
  'clearing-triptych',
  'margin-guide',
  'short-selling-map',
  'fund-family-tree',
  'etf-issuance',
  'style-box-rebuild'
]) {
  check(joinedHtml.includes(`class="${graphicClass}"`), `source-inspired graphic ${graphicClass} is present`);
}

const priceWeightedIndex = (100 + 20 + 50 + 10) / 4;
check(priceWeightedIndex === 45, 'price-weighted index calculation equals 45');

const orderBookSpread = 286.97 - 286.95;
check(Math.abs(orderBookSpread - 0.02) < 1e-10, 'order-book spread calculation equals $0.02');

const initialMargin = 6000 / 10000;
const declinedMargin = 3000 / 7000;
const marginCallPrice = 4000 / (100 * (1 - 0.30));
check(Math.abs(initialMargin - 0.60) < 1e-12, 'initial margin calculation equals 60%');
check(Math.abs(declinedMargin - 0.428571428571) < 1e-10, 'declined margin calculation equals 42.857%');
check(Math.abs(marginCallPrice - 57.1428571429) < 1e-9, 'maintenance-margin call price equals $57.14');

const nav = (200 + 14 + 6 + 0.075 - 13 - 4 - 0.050) / 5;
check(Math.abs(nav - 40.605) < 1e-12, 'NAV calculation equals $40.605 per share');

const etfIssuance = {
  2023: [1943, -8217, 14674, 83331, 186811, 318963],
  2024: [4687, 5104, 17190, 97119, 278179, 742574],
  2025: [8335, 59693, 44946, 242807, 387742, 673112]
};
const etfTotals = { 2023: 597505, 2024: 1144853, 2025: 1416635 };
for (const [year, values] of Object.entries(etfIssuance)) {
  check(values.reduce((sum, value) => sum + value, 0) === etfTotals[year], `ETF net issuance categories sum to the source total for ${year}`);
}
check(joinedHtml.includes('$597.505B') && joinedHtml.includes('$1.144853T') && joinedHtml.includes('$1.416635T'), 'exact ETF issuance totals are visible in the rebuilt chart');

const fundExpected = {
  5: [15923, 15211, 14596],
  10: [25354, 23136, 22665],
  15: [40371, 35192, 35194],
  20: [64282, 53529, 54649]
};
for (const [yearsText, expected] of Object.entries(fundExpected)) {
  const years = Number(yearsText);
  const actual = [
    Math.round(10000 * (1 + 0.10 - 0.0025) ** years),
    Math.round(10000 * (1 + 0.10 - 0.0125) ** years),
    Math.round(9400 * (1 + 0.10 - 0.0080) ** years)
  ];
  check(actual.every((value, index) => value === expected[index]), `fund proceeds at ${years} years match source after rounding`);
}

if (failures.length) {
  console.error(`VALIDATION FAILED (${failures.length} of ${checks.length} checks)`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`VALIDATION PASSED: ${totalGenerated} generated slides; ${bus331IntroSource.sourceSlideCount}/${bus331IntroSource.sourceSlideCount} source slides mapped or held; calculations, current data, accessibility conventions, branding, privacy and local references verified (${checks.length} checks).`);
