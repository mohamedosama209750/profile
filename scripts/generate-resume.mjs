import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Generates public/resume.pdf from the profile data with no dependencies.
 * Run with: npm run resume
 */

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const profile = JSON.parse(
  readFileSync(join(root, 'src/modules/profile/data/profile.json'), 'utf8'),
);

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

const COLORS = {
  navy: '#14213d',
  amber: '#fca311',
  gray: '#e5e5e5',
  white: '#ffffff',
};
const hexToRgb = (hex) => {
  const value = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
  return `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)}`;
};
const C = Object.fromEntries(Object.entries(COLORS).map(([key, hex]) => [key, hexToRgb(hex)]));

// Helvetica advance widths (units per 1000 em) for ASCII 32-126.
const REGULAR_WIDTHS = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556,
  556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722,
  722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722,
  667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556,
  556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500,
  500, 334, 260, 334, 584,
];
const BOLD_WIDTHS = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556,
  556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611, 975, 722, 722, 722,
  722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778, 667, 778, 722, 667, 611, 722,
  667, 944, 667, 667, 611, 333, 278, 333, 584, 556, 333, 556, 611, 556, 611, 556, 333, 611,
  611, 278, 278, 556, 278, 889, 611, 611, 611, 611, 389, 556, 333, 611, 556, 778, 556, 556,
  500, 389, 280, 389, 584,
];

function measure(value, size, bold = false) {
  const widths = bold ? BOLD_WIDTHS : REGULAR_WIDTHS;
  let total = 0;
  for (const char of value) {
    const code = char.charCodeAt(0);
    total += code >= 32 && code <= 126 ? widths[code - 32] : 556;
  }
  return (total * size) / 1000;
}

function wrap(value, size, maxWidth, bold = false) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && measure(candidate, size, bold) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines;
}

const content = [];
const annotations = [];

const num = (value) => Number(value.toFixed(2));
const escape = (value) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

function text(x, y, size, font, color, value, { align = 'left', spacing = 0 } = {}) {
  const width = measure(value, size, font === 'F2');
  const startX = align === 'right' ? x - width : x;

  if (startX < MARGIN - 0.5 || startX + width > PAGE_W - MARGIN + 0.5) {
    throw new Error(`Text overflows the page margins: "${value}" (${startX.toFixed(1)}..${(startX + width).toFixed(1)})`);
  }

  content.push(
    `BT /${font} ${size} Tf ${spacing} Tc ${color} rg 1 0 0 1 ${num(startX)} ${num(
      y,
    )} Tm (${escape(value)}) Tj ET`,
  );
  return width;
}

function rect(x, y, width, height, color) {
  content.push(
    `q ${color} rg ${num(x)} ${num(y)} ${num(width)} ${num(height)} re f Q`,
  );
}

function line(x1, y1, x2, y2, color, width = 0.6) {
  content.push(
    `q ${color} RG ${width} w ${num(x1)} ${num(y1)} m ${num(x2)} ${num(y2)} l S Q`,
  );
}

function link(x, y, width, height, url) {
  annotations.push({ rect: [num(x), num(y), num(x + width), num(y + height)], url });
}

function heading(label, y) {
  rect(MARGIN, y - 1.5, 6, 6, C.amber);
  text(MARGIN + 14, y, 9.5, 'F2', C.navy, label.toUpperCase(), { spacing: 1.6 });
}

const clean = (value) => value.replace(/[—–]/g, '-').replace(/[’‘]/g, "'").replace(/[“”]/g, '"');

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
const headerTop = 696;
rect(0, headerTop, PAGE_W, PAGE_H - headerTop, C.navy);
rect(0, headerTop - 4, PAGE_W, 4, C.amber);

text(MARGIN, 786, 30, 'F2', C.white, profile.name.toUpperCase());
text(MARGIN, 762, 11.5, 'F1', C.amber, clean(profile.role));
text(MARGIN, 739, 9.5, 'F1', C.gray, `${profile.location}  |  ${profile.handle}`);

const headerLinks = [
  { display: 'github.com/mohamedosama209750', url: 'https://github.com/mohamedosama209750' },
  {
    display: 'linkedin.com/in/mohamed-osama-936244333',
    url: 'https://www.linkedin.com/in/mohamed-osama-936244333/',
  },
];

let linkX = MARGIN;
headerLinks.forEach((item, index) => {
  const width = text(linkX, 717, 9, 'F1', C.gray, item.display);
  line(linkX, 714.6, linkX + width, 714.6, C.gray, 0.5);
  link(linkX, 714, width, 11, item.url);
  linkX += width;
  if (index < headerLinks.length - 1) {
    const gap = 18;
    text(linkX + gap / 2, 717, 9, 'F1', C.amber, '|');
    linkX += gap;
  }
});

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------
let y = 664;
heading('Profile', y);
y -= 21;

const BODY_SIZE = 10;
const LEADING = 13.6;

for (const paragraph of profile.about) {
  for (const textLine of wrap(clean(paragraph), BODY_SIZE, CONTENT_W)) {
    text(MARGIN, y, BODY_SIZE, 'F1', C.navy, textLine);
    y -= LEADING;
  }
  y -= 7;
}

// ---------------------------------------------------------------------------
// Snapshot
// ---------------------------------------------------------------------------
y -= 4;
const statsTop = y;
const columnWidth = CONTENT_W / profile.stats.length;
profile.stats.forEach((stat, index) => {
  const x = MARGIN + index * columnWidth;
  rect(x, statsTop, 22, 2.5, C.amber);
  text(x, statsTop - 20, 20, 'F2', C.navy, stat.value);
  wrap(clean(stat.label), 8.5, columnWidth - 12).forEach((textLine, lineIndex) => {
    text(x, statsTop - 34 - lineIndex * 10.5, 8.5, 'F1', C.navy, textLine);
  });
});
y = statsTop - 58;

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------
heading('Core Skills', y);
y -= 20;

const skillLine = profile.skills.map((skill) => skill.name).join('   /   ');
for (const textLine of wrap(clean(skillLine), BODY_SIZE, CONTENT_W)) {
  text(MARGIN, y, BODY_SIZE, 'F1', C.navy, textLine);
  y -= LEADING;
}

text(
  MARGIN,
  y - 2,
  9,
  'F1',
  C.navy,
  `Tools: ${profile.toolbox.join(' / ')}`,
);
y -= 24;

// ---------------------------------------------------------------------------
// Selected projects
// ---------------------------------------------------------------------------
heading('Selected Projects', y);
y -= 23;

const projectGap = 22;
profile.projects.forEach((project) => {
  const titleWidth = text(MARGIN, y, 11.5, 'F2', C.navy, clean(project.title));
  text(PAGE_W - MARGIN, y, 9, 'F1', C.navy, project.year, { align: 'right' });
  const roleX = MARGIN + titleWidth + 12;
  text(roleX, y + 1, 8.5, 'F2', C.navy, clean(project.role));
  y -= 12.5;

  for (const textLine of wrap(clean(project.description), 9.5, CONTENT_W)) {
    text(MARGIN, y, 9.5, 'F1', C.navy, textLine);
    y -= 12;
  }

  y -= projectGap;
});

// ---------------------------------------------------------------------------
// Links
// ---------------------------------------------------------------------------
heading('Links', y + 6);
y -= 14;

profile.socials.forEach((social) => {
  text(MARGIN, y, 9.5, 'F2', C.navy, social.label);
  const url = social.url.replace(/\/$/, '');
  const display = url.replace(/^https?:\/\//, '');
  const width = text(MARGIN + 72, y, 9.5, 'F1', C.navy, display);
  line(MARGIN + 72, y - 2.2, MARGIN + 72 + width, y - 2.2, C.navy, 0.5);
  link(MARGIN + 72, y - 3, width, 12, social.url);
  y -= 19;
});

text(
  MARGIN,
  y - 12,
  9,
  'F1',
  C.navy,
  'References and full project case studies available on request.',
);
y -= 30;

if (y < 110) {
  throw new Error(`Resume content overflows the page (cursor at ${y.toFixed(1)}).`);
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
rect(0, 0, PAGE_W, 72, C.navy);
rect(0, 72, PAGE_W, 3, C.amber);
text(MARGIN, 32, 9, 'F1', C.gray, `${profile.name}  |  ${profile.location}  |  ${profile.handle}`);
text(PAGE_W - MARGIN, 32, 9, 'F1', C.gray, 'Page 1 of 1', { align: 'right' });

// ---------------------------------------------------------------------------
// PDF assembly
// ---------------------------------------------------------------------------
const stream = content.join('\n');
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R /Annots [${annotations
    .map((_, index) => `${7 + index} 0 R`)
    .join(' ')}] >>`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`,
];

for (const annotation of annotations) {
  objects.push(
    `<< /Type /Annot /Subtype /Link /Rect [${annotation.rect.join(' ')}] /Border [0 0 0] /A << /S /URI /URI (${annotation.url}) >> >>`,
  );
}

const chunks = [];
let byteLength = 0;
const offsets = [];
const push = (value) => {
  const buffer = Buffer.from(value, 'latin1');
  chunks.push(buffer);
  byteLength += buffer.length;
};

push('%PDF-1.4\n');
objects.forEach((body, index) => {
  offsets[index] = byteLength;
  push(`${index + 1} 0 obj\n${body}\nendobj\n`);
});

const xrefOffset = byteLength;
push(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`);
offsets.forEach((offset) => {
  push(`${String(offset).padStart(10, '0')} 00000 n \n`);
});
push(
  `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`,
);

mkdirSync(join(root, 'public'), { recursive: true });
writeFileSync(join(root, 'public/resume.pdf'), Buffer.concat(chunks));

console.log(
  `Wrote public/resume.pdf (${objects.length} objects, ${annotations.length} links, cursor ${y.toFixed(
    1,
  )}pt).`,
);
