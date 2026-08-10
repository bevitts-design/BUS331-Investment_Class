import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getManagedCourseMap,
  readCourseMap,
  renderCourseMap,
  validateCourseMap,
} from "./lib/course-map.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.dirname(scriptDir);
const args = parseArgs(process.argv.slice(2));
const sourcePath = path.resolve(repoRoot, args.source ?? "course-map.json");
const indexPath = path.resolve(repoRoot, args.index ?? "index.html");
const data = await readCourseMap(sourcePath);
const { warnings } = await validateCourseMap(data, { repoRoot });
const indexHtml = await readFile(indexPath, "utf8");
const actualManagedHtml = getManagedCourseMap(indexHtml);
const expectedManagedHtml = renderCourseMap(data);

if (actualManagedHtml === null) throw new Error(`${indexPath} is missing the managed course-map markers.`);
if (actualManagedHtml !== expectedManagedHtml) {
  throw new Error(`${path.relative(repoRoot, indexPath)} is stale. Run scripts/build-index.mjs.`);
}

const visibleChapters = data.chapters.filter((chapter) => chapter.visible);
const hiddenChapters = data.chapters.filter((chapter) => !chapter.visible);
const renderedChapterCount = [...actualManagedHtml.matchAll(/data-course-chapter=/g)].length;
if (renderedChapterCount !== data.chapters.length) {
  throw new Error(`${path.relative(repoRoot, indexPath)} renders ${renderedChapterCount} chapter cards; expected ${data.chapters.length}.`);
}

for (const chapter of data.chapters) {
  const markup = getChapterMarkup(actualManagedHtml, chapter.id);
  if (!markup) throw new Error(`Chapter ${chapter.id} is missing from ${path.relative(repoRoot, indexPath)}.`);

  const shouldBeAvailable = chapter.visible && chapter.status === "live";
  if (shouldBeAvailable) {
    if (!markup.includes('data-course-access="available"')) {
      throw new Error(`Available chapter ${chapter.id} is missing its available-access marker.`);
    }
    for (const link of chapter.links) {
      if (!markup.includes(`href="${escapeHtml(link.url)}"`)) {
        throw new Error(`Available chapter ${chapter.id} is missing its functional link: ${link.url}.`);
      }
    }
  } else {
    const requiredLockedMarkers = [
      "<article",
      'class="lesson-card lesson-card-unavailable"',
      'data-course-access="locked"',
      "aria-labelledby=",
      "aria-describedby=",
      "Coming soon — access not yet available",
    ];
    for (const marker of requiredLockedMarkers) {
      if (!markup.includes(marker)) throw new Error(`Locked chapter ${chapter.id} is missing accessibility/status markup: ${marker}.`);
    }
    if (/<a\b|\bhref=|\btabindex=/i.test(markup)) {
      throw new Error(`Locked chapter ${chapter.id} exposes an interactive link or keyboard target.`);
    }
  }
}

console.log(`Validated all ${data.chapters.length} chapter cards: ${visibleChapters.length} available, ${hiddenChapters.length} locked.`);
for (const warning of warnings) console.warn(`Warning: ${warning}`);

function getChapterMarkup(html, chapterId) {
  const id = escapeRegExp(chapterId);
  return html.match(new RegExp(`<(?<tag>a|article)\\b[^>]*data-course-chapter="${id}"[^>]*>[\\s\\S]*?<\\/\\k<tag>>`))?.[0] ?? null;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function parseArgs(values) {
  const result = {};
  for (let index = 0; index < values.length; index += 1) {
    const key = values[index];
    if (key !== "--source" && key !== "--index") throw new Error(`Unknown argument: ${key}`);
    const value = values[index + 1];
    if (!value) throw new Error(`${key} requires a value.`);
    result[key.slice(2)] = value;
    index += 1;
  }
  return result;
}
