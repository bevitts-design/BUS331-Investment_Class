import fs from 'node:fs/promises';
import path from 'node:path';

import { bus331Homepage as page } from './canvas/bus331-homepage-content.mjs';

const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'canvas', 'bus331-homepage.html');

const esc = (value = '') => String(value)
  .replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]))
  .replace(/[^\x00-\x7F]/g, (char) => `&#${char.codePointAt(0)};`);

const topicColors = [
  ['#E1F0ED', '#1B6F73'],
  ['#F3E8D4', '#8A622C'],
  ['#F4E5DF', '#9C4A2B'],
  ['#E5EDF3', '#355773'],
  ['#E1F0ED', '#1B6F73']
];

const topicCards = page.courseTopics.map((topic, index) => {
  const [background, accent] = topicColors[index % topicColors.length];
  return `
        <div style="box-sizing:border-box;flex:1 1 180px;min-width:0;padding:18px;border:1px solid #DDD7CA;border-top:5px solid ${accent};border-radius:12px;background:${background};">
          <h3 style="margin:0 0 6px;color:#0A2540;font-size:18px;line-height:1.25;">${esc(topic.label)}</h3>
          <p style="margin:0;color:#34495E;font-size:15px;line-height:1.5;">${esc(topic.detail)}</p>
        </div>`;
}).join('');

const signalColors = [
  { border: '#6FA1C3', background: '#153D57', label: '#C6E2F2' },
  { border: '#57B8AC', background: '#10464C', label: '#BDE9E3' },
  { border: '#E6B85C', background: '#4A3A20', label: '#FFE2A6' }
];

const signalStageCells = page.signal.stages.map((stage, index) => {
  const color = signalColors[index];
  const connector = index < page.signal.stages.length - 1
    ? '<td aria-hidden="true" style="width:7%;padding:0 2px;color:#E6B85C;font-size:20px;font-weight:700;text-align:center;vertical-align:middle;">&#8594;</td>'
    : '';
  return `<td style="width:29%;padding:0;vertical-align:top;">
              <div style="box-sizing:border-box;padding:10px 8px 11px;border:1px solid rgba(255,255,255,.18);border-top:4px solid ${color.border};border-radius:8px;background:${color.background};">
                <p style="margin:0 0 5px;color:${color.label};font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;">${esc(stage.label)}</p>
                <p style="margin:0;color:#FFFFFF;font-size:13px;font-weight:700;line-height:1.35;">${esc(stage.detail)}</p>
              </div>
            </td>${connector}`;
}).join('');

const html = `<!-- GENERATED FILE: edit scripts/canvas/bus331-homepage-content.mjs, then run scripts/build-bus331-canvas-homepage.mjs -->
<div style="box-sizing:border-box;max-width:1100px;margin:0 auto;background:#FAF8F3;color:#172432;font-family:Arial,Helvetica,sans-serif;line-height:1.55;">
  <div style="box-sizing:border-box;padding:12px 20px;background:#071D30;color:#DDE8EE;border-bottom:4px solid #B8843D;">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;">
      <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;">BUS331 &#183; Investments</p>
      <nav aria-label="Homepage sections" style="display:flex;flex-wrap:wrap;gap:8px 18px;font-size:13px;">
        <a href="#bus331-course" style="color:#FFFFFF;text-decoration:underline;">Course</a>
        <a href="#bus331-materials" style="color:#FFFFFF;text-decoration:underline;">Materials</a>
        <a href="#bus331-contact" style="color:#FFFFFF;text-decoration:underline;">Contact</a>
      </nav>
    </div>
  </div>

  <header id="bus331-start" style="box-sizing:border-box;padding:34px 24px;background:linear-gradient(135deg,#0A2540 0%,#123A5A 58%,#1B6F73 100%);color:#FFFFFF;">
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:30px;">
      <div style="box-sizing:border-box;flex:1 1 460px;min-width:0;">
        <p style="display:inline-block;margin:0 0 14px;padding:6px 11px;border:1px solid rgba(255,255,255,.35);border-radius:999px;color:#F2D69B;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">${esc(page.course.code)} &#183; Build evidence into decisions</p>
        <h1 style="margin:0 0 14px;color:#FFFFFF;font-size:clamp(36px,6vw,62px);line-height:1.02;letter-spacing:-.035em;">${esc(page.course.name)}</h1>
        <p style="max-width:620px;margin:0 0 23px;color:#E2EBF0;font-size:18px;line-height:1.55;">${esc(page.welcome.intro)}</p>
        <div style="display:flex;flex-wrap:wrap;gap:10px;">
          <a href="${esc(page.syllabus.href)}" style="display:inline-block;padding:12px 18px;border:2px solid #E6B85C;border-radius:8px;background:#E6B85C;color:#071D30;font-weight:700;text-decoration:none;">${esc(page.syllabus.label)}</a>
          <a href="${esc(page.instructor.officeHours.href)}" target="_blank" rel="noopener" style="display:inline-block;padding:12px 18px;border:2px solid rgba(255,255,255,.7);border-radius:8px;color:#FFFFFF;font-weight:700;text-decoration:none;">Schedule Office Hours</a>
        </div>
      </div>

      <div role="img" aria-label="The BUS331 investment process moves from market and company evidence through risk, return, and valuation analysis to portfolio decisions and action; monitoring results creates new evidence and restarts the process" style="box-sizing:border-box;flex:1 1 300px;min-width:250px;max-width:430px;padding:22px;border:1px solid rgba(255,255,255,.22);border-radius:18px;background:rgba(4,20,34,.62);box-shadow:0 18px 40px rgba(0,0,0,.22);">
        <p style="margin:0;color:#9BD8CF;font-size:12px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;">${esc(page.signal.eyebrow)}</p>
        <p style="margin:4px 0 17px;color:#FFFFFF;font-size:22px;font-weight:700;line-height:1.2;">${esc(page.signal.title)}</p>
        <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;">
          <tbody>
            <tr>${signalStageCells}</tr>
          </tbody>
        </table>
        <div style="box-sizing:border-box;margin-top:12px;padding:8px 10px;border:1px solid rgba(230,184,92,.55);border-radius:999px;background:rgba(230,184,92,.11);color:#FFE2A6;text-align:center;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;"><span aria-hidden="true" style="font-size:15px;vertical-align:-1px;">&#8634;</span>&nbsp; ${esc(page.signal.feedback)}</p>
        </div>
      </div>
    </div>
  </header>

  <main>
    <section id="bus331-course" aria-labelledby="bus331-course-heading" style="box-sizing:border-box;padding:28px 24px;background:#FFFFFF;border-bottom:1px solid #DDD7CA;">
      <h2 id="bus331-course-heading" style="margin:0 0 18px;color:#0A2540;font-size:28px;line-height:1.2;">Your course at a glance</h2>
      <div style="display:flex;flex-wrap:wrap;gap:12px;">
        <div style="box-sizing:border-box;flex:1 1 210px;padding:17px;border-left:5px solid #B8843D;border-radius:7px;background:#F3E8D4;">
          <p style="margin:0 0 3px;color:#6E4E22;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">When</p>
          <p style="margin:0;color:#0A2540;font-size:18px;font-weight:700;">${esc(page.course.meetingDays)}</p>
          <p style="margin:2px 0 0;color:#34495E;">${esc(page.course.meetingTime)}</p>
        </div>
        <div style="box-sizing:border-box;flex:1 1 210px;padding:17px;border-left:5px solid #1B6F73;border-radius:7px;background:#E1F0ED;">
          <p style="margin:0 0 3px;color:#15565A;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Where</p>
          <p style="margin:0;color:#0A2540;font-size:18px;font-weight:700;">${esc(page.course.room)}</p>
          <p style="margin:2px 0 0;color:#34495E;">In-person class meetings</p>
        </div>
        <div style="box-sizing:border-box;flex:1 1 210px;padding:17px;border-left:5px solid #9C4A2B;border-radius:7px;background:#F4E5DF;">
          <p style="margin:0 0 3px;color:#7A3822;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Course</p>
          <p style="margin:0;color:#0A2540;font-size:18px;font-weight:700;">${esc(page.course.name)}</p>
          <p style="margin:2px 0 0;color:#34495E;">${esc(page.course.code)}</p>
        </div>
      </div>
    </section>

    <section aria-labelledby="bus331-welcome-heading" style="box-sizing:border-box;padding:34px 24px;background:#FAF8F3;">
      <div style="display:flex;flex-wrap:wrap;gap:28px;align-items:flex-start;">
        <div style="box-sizing:border-box;flex:2 1 470px;min-width:0;">
          <p style="margin:0 0 7px;color:#8A622C;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">Welcome to BUS331</p>
          <h2 id="bus331-welcome-heading" style="margin:0 0 16px;color:#0A2540;font-size:30px;line-height:1.2;">Learn to see the market&#8212;and explain your decision</h2>
          <p style="margin:0 0 13px;color:#34495E;">${esc(page.welcome.instructorBio)}</p>
          <p style="margin:0 0 13px;color:#34495E;">${esc(page.welcome.courseDescription)}</p>
          <p style="margin:0;padding:15px 18px;border-left:5px solid #1B6F73;background:#E1F0ED;color:#0A2540;font-weight:700;">${esc(page.welcome.closing)}</p>
        </div>
        <aside id="bus331-contact" aria-labelledby="bus331-contact-heading" style="box-sizing:border-box;flex:1 1 270px;min-width:0;padding:22px;border-radius:14px;background:#0A2540;color:#FFFFFF;">
          <p style="margin:0 0 7px;color:#E6B85C;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">Your professor</p>
          <h2 id="bus331-contact-heading" style="margin:0 0 15px;color:#FFFFFF;font-size:24px;line-height:1.2;">${esc(page.instructor.name)}</h2>
          <p style="margin:0 0 10px;color:#D9E5EB;"><strong style="color:#FFFFFF;">Email</strong><br><a href="mailto:${esc(page.instructor.email)}" style="color:#F2D69B;text-decoration:underline;overflow-wrap:anywhere;">${esc(page.instructor.email)}</a></p>
          <p style="margin:0 0 15px;color:#D9E5EB;"><strong style="color:#FFFFFF;">Phone</strong><br><a href="tel:+16178772001" style="color:#F2D69B;text-decoration:underline;">${esc(page.instructor.phone)}</a></p>
          <a href="${esc(page.instructor.officeHours.href)}" target="_blank" rel="noopener" style="display:inline-block;padding:10px 14px;border-radius:7px;background:#1B6F73;color:#FFFFFF;font-weight:700;text-decoration:none;">${esc(page.instructor.officeHours.label)}</a>
        </aside>
      </div>
    </section>

    <section aria-labelledby="bus331-topics-heading" style="box-sizing:border-box;padding:34px 24px;background:#FFFFFF;">
      <p style="margin:0 0 7px;color:#8A622C;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">The investment toolkit</p>
      <h2 id="bus331-topics-heading" style="margin:0 0 18px;color:#0A2540;font-size:28px;line-height:1.2;">What we will connect</h2>
      <div style="display:flex;flex-wrap:wrap;gap:12px;">${topicCards}
      </div>
    </section>

    <section id="bus331-materials" aria-labelledby="bus331-materials-heading" style="box-sizing:border-box;padding:34px 24px;background:#F2EEE5;border-top:1px solid #DDD7CA;">
      <div style="box-sizing:border-box;max-width:760px;padding:24px 26px;border-left:6px solid #B8843D;border-radius:10px;background:#FFFFFF;box-shadow:0 10px 24px rgba(10,37,64,.08);">
        <div style="min-width:0;">
          <p style="margin:0 0 7px;color:#8A622C;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">Required text</p>
          <h2 id="bus331-materials-heading" style="margin:0 0 7px;color:#0A2540;font-size:28px;line-height:1.2;">${esc(page.textbook.title)}</h2>
          <p style="margin:0 0 15px;color:#34495E;"><strong>${esc(page.textbook.edition)}</strong><br>Author: ${esc(page.textbook.author)}</p>
          <a title="${esc(page.syllabus.pageTitle)}" href="${esc(page.syllabus.href)}" style="display:inline-block;padding:11px 16px;border-radius:7px;background:#B8843D;color:#071D30;font-weight:700;text-decoration:none;">${esc(page.syllabus.label)}</a>
        </div>
      </div>
    </section>

    <section aria-labelledby="bus331-ready-heading" style="box-sizing:border-box;padding:28px 24px;background:#9C4A2B;color:#FFFFFF;">
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:18px;">
        <div aria-hidden="true" style="display:flex;width:58px;height:58px;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,.55);border-radius:50%;background:rgba(255,255,255,.1);font-size:30px;">&#9638;</div>
        <div style="flex:1 1 300px;min-width:0;">
          <p style="margin:0 0 5px;color:#FFE0D3;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">Ready for class</p>
          <h2 id="bus331-ready-heading" style="margin:0 0 6px;color:#FFFFFF;font-size:25px;line-height:1.2;">${esc(page.readiness.title)}</h2>
          <p style="margin:0;color:#FFF3EE;">${esc(page.readiness.detail)}</p>
        </div>
      </div>
    </section>
  </main>

  <footer style="box-sizing:border-box;padding:18px 24px;background:#071D30;color:#BFD0DA;text-align:center;font-size:13px;">
    <p style="margin:0;"><strong style="color:#FFFFFF;">${esc(page.course.name)} &#183; ${esc(page.course.code)}</strong> &nbsp;|&nbsp; ${esc(page.course.meetingDays)}, ${esc(page.course.meetingTime)} &nbsp;|&nbsp; ${esc(page.course.room)}</p>
  </footer>
</div>
`;

await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, html);
console.log(`Built ${path.relative(root, output)}`);
