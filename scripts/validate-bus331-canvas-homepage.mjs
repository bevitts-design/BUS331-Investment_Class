import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const file = path.join(root, 'canvas', 'bus331-homepage.html');
const html = await fs.readFile(file, 'utf8');
const renderedText = html
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&nbsp;/g, '\u00A0')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"');

const count = (pattern) => (html.match(pattern) || []).length;
const requiredText = [
  'Investments',
  'BUS331-02',
  'Tuesday / Thursday',
  '8:00–9:15 a.m.',
  'GSB 255',
  'Investments via Connect',
  '13th Edition',
  'Zvi Bodie',
  'Bethany Evitts',
  'bevitts@endicott.edu',
  '617-877-2001',
  'FactSet',
  'fully charged laptop',
  'Excel spreadsheets',
  'From evidence to portfolio action',
  'Market + company data',
  'Risk + return + value',
  'Select + size + monitor',
  'Results become new evidence',
  'Course portals',
  'Course Hub',
  'Investment Committee Project',
  'Open the Course Hub',
  'Open the Project'
];

assert.equal(count(/<h1\b/g), 1, 'Canvas fragment must have exactly one h1');
assert.ok(count(/<h2\b/g) >= 5, 'Canvas fragment needs a navigable heading hierarchy');
assert.equal(count(/<img\b/g), 0, 'Canvas fragment must not depend on a cover or hero image');
assert.equal(count(/role="img"/g), 1, 'Only the accessible course-signal graphic may use role="img"');
assert.ok(!/aria-label="Investments, 13th Edition, by Zvi Bodie"/.test(html), 'Materials must not contain a synthetic book-cover graphic');
assert.ok(/<nav\b[^>]*aria-label=/s.test(html), 'Section navigation needs an accessible name');
assert.ok(/role="img"[^>]*aria-label=/s.test(html), 'Course-signal graphic needs an accessible name');
assert.ok(!/height:\s*\d+%/i.test(html), 'Canvas-safe graphics must not rely on percentage heights');

for (const text of requiredText) {
  assert.ok(renderedText.includes(text), `Missing required student-facing detail: ${text}`);
}

for (const requiredLink of [
  'https://endicott.instructure.com/courses/58601/assignments/syllabus',
  'https://endicott.instructure.com/courses/58601/pages/professor-evitts-office-hours-fall-2026',
  'https://endicott.instructure.com/courses/58601/pages/bus331-investment-course-hub-link',
  'https://endicott.instructure.com/courses/58601/pages/bus331-investment-project-home-page-link',
  'mailto:bevitts@endicott.edu',
  'tel:+16178772001'
]) {
  assert.ok(html.includes(requiredLink), `Missing authoritative link: ${requiredLink}`);
}

assert.ok(!html.includes('https://calendar.app.google/'), 'Canvas homepage must not retain the retired Google booking link');
assert.ok(!/data-api-(?:endpoint|returntype)/.test(html), 'Syllabus page links must not retain obsolete Canvas file metadata');
assert.ok(!/<(?:script|style|link|html|head|body)\b/i.test(html), 'Canvas fragment must not use scripts, stylesheets, or document-level tags');
assert.ok(!/href=["']#["']/i.test(html), 'Canvas fragment must not contain empty placeholder links');
assert.ok(!/(answer key|grading map|student information|proprietary FactSet capture)/i.test(html), 'Canvas fragment crossed the student/instructor boundary');
assert.ok(!/[^\x00-\x7F]/.test(html), 'Generated Canvas fragment should be ASCII-safe and use entities for punctuation');

console.log('BUS331 Canvas homepage validation passed');
console.log(`  headings: h1=${count(/<h1\b/g)}, h2=${count(/<h2\b/g)}, h3=${count(/<h3\b/g)}`);
console.log(`  links: ${count(/<a\b/g)}; images: ${count(/<img\b/g)}`);
console.log('  Canvas-safe course-signal loop and authoritative course details preserved');
