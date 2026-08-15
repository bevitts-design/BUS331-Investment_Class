import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  END_MARKER,
  START_MARKER,
  readCourseMap,
  renderCourseMap,
  replaceManagedCourseMap,
  validateCourseMap,
} from "../scripts/lib/course-map.mjs";

const validMap = () => ({
  schemaVersion: 1,
  course: { code: "BUS331", title: "Investments" },
  sections: [{ id: "section-a", badge: "Section A", title: "First Section", displayOrder: 10 }],
  chapters: [{
    id: "chapter-a",
    sectionId: "section-a",
    code: "BUS331-CH01",
    title: "Visible chapter",
    topic: "A safe topic",
    status: "live",
    visible: true,
    displayOrder: 10,
    links: [{ label: "Open lesson", url: "https://example.com", style: "primary" }],
    futureField: { preserved: true },
  }],
  futureRootField: "allowed",
});

test("unknown fields are accepted and visible chapters render", async () => {
  const map = validMap();
  await validateCourseMap(map, { checkLocalLinks: false });
  const html = renderCourseMap(map);
  assert.match(html, /data-course-chapter="chapter-a"/);
  assert.match(html, /data-course-access="available"/);
  assert.match(html, /href="https:\/\/example.com"/);
  assert.match(html, /Visible chapter/);
});

test("hidden chapters remain listed as accessible noninteractive locked cards", async () => {
  const map = validMap();
  map.chapters[0].visible = false;
  await validateCourseMap(map, { checkLocalLinks: false });
  const html = renderCourseMap(map);
  assert.match(html, /data-course-section="section-a"/);
  assert.match(html, /<article class="lesson-card lesson-card-unavailable"/);
  assert.match(html, /data-course-chapter="chapter-a"/);
  assert.match(html, /data-course-access="locked"/);
  assert.match(html, /aria-labelledby="chapter-chapter-a-title"/);
  assert.match(html, /aria-describedby="chapter-chapter-a-topic chapter-chapter-a-status"/);
  assert.match(html, /BUS331-CH01/);
  assert.match(html, /Visible chapter/);
  assert.match(html, /A safe topic/);
  assert.match(html, /Coming soon — access not yet available/);
  assert.doesNotMatch(html, /<a\b|href=|tabindex=/);
  assert.doesNotMatch(html, /https:\/\/example.com/);
});

test("visibility controls access while every chapter card remains present", async () => {
  const map = validMap();
  map.chapters.push({
    ...map.chapters[0],
    id: "chapter-b",
    title: "Locked chapter",
    visible: false,
    displayOrder: 20,
    links: [{ label: "Open locked chapter", url: "https://locked.example.com", style: "primary" }],
  });
  await validateCourseMap(map, { checkLocalLinks: false });
  const html = renderCourseMap(map);
  assert.equal([...html.matchAll(/data-course-chapter=/g)].length, 2);
  assert.match(html, /href="https:\/\/example.com"/);
  assert.doesNotMatch(html, /https:\/\/locked\.example\.com/);
});

test("an available chapter must be live with a functional link", async () => {
  const map = validMap();
  map.chapters[0].status = "comingSoon";
  map.chapters[0].links = [];
  await assert.rejects(
    () => validateCourseMap(map, { checkLocalLinks: false }),
    /available but its status is not live[\s\S]*available but has no functional chapter link/,
  );
});

test("malformed visibility is rejected", async () => {
  const map = validMap();
  map.chapters[0].visible = "yes";
  await assert.rejects(() => validateCourseMap(map, { checkLocalLinks: false }), /visible must be true or false/);
});

test("private and instructor-only links are rejected", async () => {
  const map = validMap();
  map.chapters[0].links[0].url = "BUS331-instructor/answer-key.xlsx";
  await assert.rejects(
    () => validateCourseMap(map, { checkLocalLinks: false }),
    /private or non-public path/,
  );
});

test("the maintained BUS331 map preserves all fifteen public chapter cards", async () => {
  const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
  const map = await readCourseMap(path.join(repoRoot, "course-map.json"));
  await validateCourseMap(map, { repoRoot });
  assert.equal(map.course.code, "BUS331");
  assert.equal(map.chapters.length, 15);
  assert.equal(new Set(map.chapters.map((chapter) => chapter.id)).size, 15);
  assert.deepEqual(
    map.chapters.filter((chapter) => chapter.status === "comingSoon").map((chapter) => chapter.code),
    ["BUS331-CH16", "BUS331-CH22"],
  );
  assert.equal(map.chapters.filter((chapter) => chapter.visible).length, 2);
});

test("managed replacement preserves surrounding homepage content", () => {
  const original = `before\n${START_MARKER}\nold\n${END_MARKER}\nafter`;
  const rendered = renderCourseMap(validMap());
  const replaced = replaceManagedCourseMap(original, rendered);
  assert.ok(replaced.startsWith("before\n"));
  assert.ok(replaced.endsWith("\nafter"));
  assert.match(replaced, /Visible chapter/);
});
