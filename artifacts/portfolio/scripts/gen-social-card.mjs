// Generates the 1200x630 social preview card (og:image) in the site's visual language.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const W = 1200, H = 630;
const RED = 'hsl(11,90%,55%)';
const BG = '#0a0a0a';
const LINE = '#333333';
const FG = '#f5f5f5';
const MUT = '#8a8a8a';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const SERIF = 'Playfair Display, Georgia, serif';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <pattern id="dots" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.2" fill="#ffffff" opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="${LINE}"/>

  <line x1="80" y1="150" x2="140" y2="150" stroke="${RED}" stroke-width="2"/>
  <text x="158" y="157" font-family="${MONO}" font-size="18" letter-spacing="6" fill="${RED}">PORTFOLIO</text>

  <text x="80" y="290" font-family="${SERIF}" font-size="104" font-weight="700" fill="${FG}">Joshua Lin</text>
  <text x="80" y="352" font-family="${MONO}" font-size="28" letter-spacing="4" fill="${MUT}">DATA ANALYST</text>

  <line x1="80" y1="410" x2="80" y2="500" stroke="${LINE}" stroke-width="2"/>
  <text x="104" y="445" font-family="${MONO}" font-size="19" fill="#c9c9c9">Mathematician by foundation, data scientist by</text>
  <text x="104" y="478" font-family="${MONO}" font-size="19" fill="#c9c9c9">training, software developer by passion.</text>

  <text x="80" y="566" font-family="${MONO}" font-size="18" letter-spacing="3" fill="${MUT}">jlinnnn.com</text>
  <circle cx="1092" cy="560" r="5" fill="${RED}"/>
  <text x="1078" y="566" text-anchor="end" font-family="${MONO}" font-size="16" letter-spacing="3" fill="${MUT}">JL.</text>
</svg>`;

writeFileSync(join(OUT, 'social-card.svg'), svg);
console.log('wrote public/social-card.svg');
