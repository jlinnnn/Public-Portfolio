// Generates cohesive, on-brand SVG cover art for each project.
// Shared dark editorial frame; per-project geometric motif.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = dirname(fileURLToPath(import.meta.url));
const W = 1200, H = 675;

const RED = 'hsl(11,90%,55%)';
const BG = '#0a0a0a';
const PANEL = '#121212';
const LINE = '#333333';
const LINE2 = '#4d4d4d';
const FG = '#f5f5f5';
const MUT = '#8a8a8a';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// shared chrome: grid, inset frame, corner index, category, footer labels
function frame({ idx, category, name, year }) {
  return `
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="${LINE}" stroke-width="1"/>
  <line x1="28" y1="92" x2="${W - 28}" y2="92" stroke="${LINE}" stroke-width="1"/>
  <line x1="28" y1="${H - 64}" x2="${W - 28}" y2="${H - 64}" stroke="${LINE}" stroke-width="1"/>
  <text x="52" y="72" font-family="${MONO}" font-size="26" font-weight="700" fill="${RED}">${idx}</text>
  <text x="92" y="71" font-family="${MONO}" font-size="16" letter-spacing="4" fill="${MUT}">// ${category}</text>
  <text x="52" y="${H - 34}" font-family="${MONO}" font-size="16" letter-spacing="3" fill="${FG}">${name}</text>
  <text x="${W - 52}" y="${H - 34}" text-anchor="end" font-family="${MONO}" font-size="14" letter-spacing="3" fill="${MUT}">JL // ${year}</text>`;
}

const defs = `
  <defs>
    <pattern id="dots" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.2" fill="#ffffff" opacity="0.05"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${RED}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${RED}" stop-opacity="0"/>
    </linearGradient>
  </defs>`;

// ---- per-project motifs (drawn in central band y:120..600, x:80..1120) ----

const motifs = {
  // DeepVaR — probabilistic forecast cone with downside VaR region
  deepvar() {
    const cx = 250, cy = 360;
    let pts = '';
    for (let i = 0; i <= 40; i++) { const x = cx + i * 20; const y = cy - i * 2 + Math.sin(i / 2) * 8; pts += `${x},${y} `; }
    // fan cone
    const coneTop = `M ${cx},${cy} L 1060,140 L 1060,300 Z`;
    const coneBot = `M ${cx},${cy} L 1060,420 L 1060,600 Z`;
    return `
    <path d="M ${cx},${cy} L 1060,140 L 1060,600 Z" fill="url(#fade)" opacity="0.5"/>
    <path d="${coneBot}" fill="${RED}" opacity="0.14"/>
    <polyline points="${pts}" fill="none" stroke="${FG}" stroke-width="2.5"/>
    <line x1="1060" y1="140" x2="1060" y2="600" stroke="${LINE2}" stroke-width="1" stroke-dasharray="4 4"/>
    <line x1="${cx}" y1="360" x2="1060" y2="510" stroke="${RED}" stroke-width="2"/>
    <text x="1000" y="500" text-anchor="end" font-family="${MONO}" font-size="15" fill="${RED}">95% VaR</text>
    <text x="1000" y="180" text-anchor="end" font-family="${MONO}" font-size="14" fill="${MUT}">P90</text>
    <circle cx="${cx}" cy="360" r="5" fill="${FG}"/>`;
  },

  // Fatal Compassion — concentric threat rings + hotspots over a grid
  fatal() {
    let rings = '';
    for (let r = 60; r <= 240; r += 45) rings += `<circle cx="600" cy="360" r="${r}" fill="none" stroke="${LINE2}" stroke-width="1" opacity="${1 - r / 340}"/>`;
    const spots = [[600, 360, 9], [470, 300, 6], [720, 430, 7], [540, 470, 5], [690, 280, 4], [820, 360, 5]];
    let s = '';
    for (const [x, y, r] of spots) s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${RED}"/><circle cx="${x}" cy="${y}" r="${r + 8}" fill="none" stroke="${RED}" stroke-width="1" opacity="0.4"/>`;
    let cross = '';
    for (let x = 360; x <= 840; x += 40) cross += `<line x1="${x}" y1="150" x2="${x}" y2="570" stroke="${LINE}" stroke-width="0.6" opacity="0.5"/>`;
    for (let y = 180; y <= 560; y += 40) cross += `<line x1="360" y1="${y}" x2="840" y2="${y}" stroke="${LINE}" stroke-width="0.6" opacity="0.5"/>`;
    return `${cross}${rings}${s}
    <text x="600" y="600" text-anchor="middle" font-family="${MONO}" font-size="14" fill="${MUT}">4,337 INCIDENTS · 75+ COUNTRIES</text>`;
  },

  // Flight Delays — flight arcs between airport nodes + delay histogram
  flights() {
    const nodes = [[220, 300], [430, 220], [640, 340], [520, 470], [820, 260], [930, 420], [340, 470]];
    let arcs = '';
    const pairs = [[0, 1], [1, 2], [2, 4], [0, 6], [6, 3], [3, 2], [4, 5], [2, 5]];
    for (const [a, b] of pairs) {
      const [x1, y1] = nodes[a], [x2, y2] = nodes[b];
      const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - 60;
      arcs += `<path d="M ${x1},${y1} Q ${mx},${my} ${x2},${y2}" fill="none" stroke="${LINE2}" stroke-width="1.2"/>`;
    }
    arcs += `<path d="M 220,300 Q 430,140 820,260" fill="none" stroke="${RED}" stroke-width="2"/>`;
    let dots = '';
    for (const [x, y] of nodes) dots += `<circle cx="${x}" cy="${y}" r="4.5" fill="${FG}"/>`;
    let bars = '';
    const vals = [40, 70, 55, 95, 60, 120, 48];
    vals.forEach((v, i) => { const x = 1000; const bx = 980; bars += `<rect x="${bx}" y="${540 - i * 28}" width="${v}" height="14" fill="${i === 5 ? RED : LINE2}"/>`; });
    return `${arcs}${dots}
    <g transform="translate(-70,0)">${bars}</g>
    <text x="600" y="600" text-anchor="middle" font-family="${MONO}" font-size="14" fill="${MUT}">APRIL 2019 · U.S. DOT</text>`;
  },

  // NLP Bias — tilted balance scale with headline tokens on each side
  nlp() {
    return `
    <line x1="600" y1="200" x2="600" y2="340" stroke="${LINE2}" stroke-width="2"/>
    <g transform="rotate(-9 600 210)">
      <line x1="420" y1="210" x2="780" y2="210" stroke="${FG}" stroke-width="2.5"/>
      <line x1="440" y1="210" x2="440" y2="270" stroke="${LINE2}" stroke-width="1.5"/>
      <line x1="760" y1="210" x2="760" y2="270" stroke="${LINE2}" stroke-width="1.5"/>
      <rect x="392" y="270" width="96" height="70" fill="${RED}" opacity="0.85"/>
      <rect x="712" y="270" width="96" height="46" fill="${PANEL}" stroke="${LINE2}"/>
      <text x="440" y="312" text-anchor="middle" font-family="${MONO}" font-size="16" fill="#fff">86%</text>
      <text x="760" y="298" text-anchor="middle" font-family="${MONO}" font-size="14" fill="${MUT}">14%</text>
    </g>
    <circle cx="600" cy="200" r="6" fill="${RED}"/>
    <g font-family="${MONO}" font-size="12" fill="${MUT}">
      <text x="360" y="420">"struck"</text><text x="360" y="446">"strikes"</text><text x="360" y="472">"responds"</text>
      <text x="720" y="420">"fired barrages"</text><text x="720" y="446">"projectiles"</text><text x="720" y="472">"graphic"</text>
    </g>
    <text x="600" y="560" text-anchor="middle" font-family="${MONO}" font-size="13" fill="${MUT}">PRO-ISRAELI ← SENTIMENT · POLARITY · BIAS → PRO-PALESTINIAN</text>`;
  },

  // DataPulse — KMeans scatter clusters + KPI tile
  datapulse() {
    const clusters = [[[420, 260], RED], [[560, 420], '#d0d0d0'], [[760, 320], LINE2], [[640, 220], '#9a9a9a']];
    let pts = '';
    for (const [[cx, cy], col] of clusters) {
      for (let i = 0; i < 22; i++) {
        const a = Math.random() * 6.28, r = Math.random() * 70;
        pts += `<circle cx="${(cx + Math.cos(a) * r).toFixed(0)}" cy="${(cy + Math.sin(a) * r).toFixed(0)}" r="3.4" fill="${col}" opacity="0.9"/>`;
      }
    }
    return `
    <line x1="330" y1="150" x2="330" y2="520" stroke="${LINE}" stroke-width="1"/>
    <line x1="330" y1="520" x2="900" y2="520" stroke="${LINE}" stroke-width="1"/>
    ${pts}
    <rect x="900" y="180" width="180" height="90" fill="${PANEL}" stroke="${LINE2}"/>
    <text x="920" y="214" font-family="${MONO}" font-size="13" fill="${MUT}">SEGMENTS</text>
    <text x="920" y="250" font-family="${MONO}" font-size="30" font-weight="700" fill="${RED}">04</text>
    <text x="360" y="540" font-family="${MONO}" font-size="13" fill="${MUT}">RECENCY →</text>
    <text x="316" y="170" text-anchor="end" font-family="${MONO}" font-size="13" fill="${MUT}">FREQ</text>`;
  },

  // BetterYou — activity pulse line + weekly plan grid + reward points
  betteryou() {
    let pulse = 'M 180,380 ';
    const seg = [[40, 0], [30, 0], [15, -70], [15, 120], [20, -50], [40, 0], [30, 0], [15, -90], [15, 150], [20, -60], [60, 0], [30, 0], [15, -70], [15, 120], [20, -50], [60, 0]];
    let x = 180, y = 380; for (const [dx, dy] of seg) { x += dx; y += dy; pulse += `L ${x},${y} `; }
    let grid = '';
    for (let c = 0; c < 7; c++) for (let r = 0; r < 3; r++) {
      const on = (c + r) % 3 === 0;
      grid += `<rect x="${720 + c * 44}" y="${430 + r * 40}" width="34" height="30" fill="${on ? RED : PANEL}" stroke="${LINE2}" opacity="${on ? 0.85 : 1}"/>`;
    }
    return `
    <path d="${pulse}" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linejoin="round"/>
    <line x1="180" y1="380" x2="700" y2="380" stroke="${LINE}" stroke-width="1" stroke-dasharray="3 5"/>
    ${grid}
    <text x="720" y="415" font-family="${MONO}" font-size="13" fill="${MUT}">WEEKLY PLAN</text>
    <circle cx="300" cy="220" r="26" fill="none" stroke="${RED}" stroke-width="2"/>
    <text x="300" y="227" text-anchor="middle" font-family="${MONO}" font-size="16" fill="${FG}">+PTS</text>
    <text x="200" y="500" font-family="${MONO}" font-size="13" fill="${MUT}">LLaMA 3.1 · REWARD ENGINE</text>`;
  },

  // Polymarket — terminal window with probability bars
  polymarket() {
    const rows = [['ELECTION 2028', 62], ['RATE CUT SEP', 78], ['BTC > 150K', 34], ['AI AGI 2027', 18], ['SUPERBOWL', 47]];
    let r = '';
    rows.forEach(([label, p], i) => {
      const y = 230 + i * 56;
      r += `<text x="230" y="${y + 4}" font-family="${MONO}" font-size="15" fill="${MUT}">${label}</text>
      <rect x="470" y="${y - 14}" width="440" height="20" fill="${PANEL}" stroke="${LINE}"/>
      <rect x="470" y="${y - 14}" width="${(p / 100 * 440).toFixed(0)}" height="20" fill="${i === 1 ? RED : LINE2}"/>
      <text x="930" y="${y + 2}" font-family="${MONO}" font-size="15" fill="${FG}">${p}%</text>`;
    });
    return `
    <rect x="150" y="150" width="900" height="400" rx="6" fill="${PANEL}" stroke="${LINE2}"/>
    <line x1="150" y1="188" x2="1050" y2="188" stroke="${LINE2}"/>
    <circle cx="176" cy="169" r="5" fill="${RED}"/><circle cx="196" cy="169" r="5" fill="${LINE2}"/><circle cx="216" cy="169" r="5" fill="${LINE2}"/>
    <text x="600" y="174" text-anchor="middle" font-family="${MONO}" font-size="13" fill="${MUT}">polymarket recommend --top 5</text>
    ${r}`;
  },

  // Nintendo Bot — browser window automation flow: search -> cart -> done
  nintendo() {
    const steps = [['SEARCH', 240], ['ADD TO CART', 520], ['DECLINE PLAN', 800]];
    let s = '';
    steps.forEach(([label, x], i) => {
      s += `<rect x="${x - 90}" y="330" width="180" height="70" rx="4" fill="${PANEL}" stroke="${i === 1 ? RED : LINE2}" stroke-width="${i === 1 ? 2 : 1}"/>
      <text x="${x}" y="372" text-anchor="middle" font-family="${MONO}" font-size="14" fill="${FG}">${label}</text>`;
      if (i < 2) s += `<line x1="${x + 90}" y1="365" x2="${x + 190}" y2="365" stroke="${LINE2}" stroke-width="1.5" marker-end="url(#arw)"/>`;
    });
    return `
    <defs><marker id="arw" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="${LINE2}"/></marker></defs>
    <rect x="150" y="150" width="900" height="140" rx="6" fill="${PANEL}" stroke="${LINE2}"/>
    <circle cx="176" cy="170" r="5" fill="${RED}"/><circle cx="196" cy="170" r="5" fill="${LINE2}"/><circle cx="216" cy="170" r="5" fill="${LINE2}"/>
    <rect x="250" y="158" width="620" height="24" rx="12" fill="${BG}" stroke="${LINE}"/>
    <text x="270" y="175" font-family="${MONO}" font-size="13" fill="${MUT}">target.com/s?searchTerm=nintendo+switch</text>
    ${s}
    <text x="520" y="470" text-anchor="middle" font-family="${MONO}" font-size="13" fill="${MUT}">SELENIUM · STALE-ELEMENT-SAFE · STOPS AT CART</text>`;
  },

  // Lunar Lander — descending lander between flags + reward curve
  lunar() {
    // terrain
    const terrain = 'M 150,560 L 300,520 L 430,545 L 520,500 L 640,510 L 760,470 L 900,500 L 1050,540';
    // reward curve
    let rc = 'M 720,520 ';
    for (let i = 0; i <= 30; i++) { const x = 720 + i * 11; const y = 520 - (1 / (1 + Math.exp(-(i - 12) / 3))) * 150 - Math.sin(i) * 4; rc += `L ${x.toFixed(0)},${y.toFixed(0)} `; }
    return `
    <path d="${terrain}" fill="none" stroke="${LINE2}" stroke-width="1.5"/>
    <path d="${terrain} L 1050,600 L 150,600 Z" fill="#141414"/>
    <line x1="500" y1="497" x2="500" y2="470" stroke="${RED}" stroke-width="1.5"/><path d="M 500,470 L 522,477 L 500,484 Z" fill="${RED}"/>
    <line x1="560" y1="500" x2="560" y2="473" stroke="${RED}" stroke-width="1.5"/><path d="M 560,473 L 582,480 L 560,487 Z" fill="${RED}"/>
    <g transform="translate(360,250)">
      <polygon points="0,-18 16,-6 16,10 -16,10 -16,-6" fill="${PANEL}" stroke="${FG}" stroke-width="2"/>
      <line x1="-16" y1="10" x2="-24" y2="26" stroke="${FG}" stroke-width="2"/><line x1="16" y1="10" x2="24" y2="26" stroke="${FG}" stroke-width="2"/>
      <polygon points="-6,10 6,10 0,34" fill="${RED}"/>
    </g>
    <line x1="360" y1="284" x2="530" y2="460" stroke="${RED}" stroke-width="1" stroke-dasharray="4 5"/>
    <path d="${rc}" fill="none" stroke="${FG}" stroke-width="2"/>
    <line x1="720" y1="370" x2="1050" y2="370" stroke="${LINE}" stroke-width="1" stroke-dasharray="3 5"/>
    <text x="1040" y="362" text-anchor="end" font-family="${MONO}" font-size="13" fill="${RED}">+200 SOLVED</text>
    <text x="360" y="180" text-anchor="middle" font-family="${MONO}" font-size="13" fill="${MUT}">DQN · 534 EPISODES</text>`;
  },
};

const projects = [
  { file: 'cover-deepvar.svg', idx: '01', category: 'RISK MODELING', name: 'DEEPVAR', year: '2025', motif: 'deepvar' },
  { file: 'cover-fatal-compassion.svg', idx: '02', category: 'THREAT INTELLIGENCE', name: 'FATAL COMPASSION', year: '2025', motif: 'fatal' },
  { file: 'cover-flight-delays.svg', idx: '03', category: 'DATA ANALYSIS', name: 'FLIGHT DELAYS', year: '2025', motif: 'flights' },
  { file: 'cover-nlp-bias.svg', idx: '04', category: 'NLP · MEDIA BIAS', name: 'NYT BIAS', year: '2024', motif: 'nlp' },
  { file: 'cover-datapulse.svg', idx: '05', category: 'RETAIL ANALYTICS', name: 'DATAPULSE', year: '2024', motif: 'datapulse' },
  { file: 'cover-betteryou.svg', idx: '06', category: 'AI · HEALTH', name: 'BETTERYOU', year: '2024', motif: 'betteryou' },
  { file: 'cover-polymarket.svg', idx: '07', category: 'QUANT · MARKETS', name: 'POLYMARKET CLI', year: '2025', motif: 'polymarket' },
  { file: 'cover-nintendo.svg', idx: '08', category: 'AUTOMATION', name: 'SWITCH BOT', year: '2024', motif: 'nintendo' },
  { file: 'cover-lunar-lander.svg', idx: '09', category: 'REINFORCEMENT LEARNING', name: 'LUNAR LANDER', year: '2024', motif: 'lunar' },
];

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="${MONO}">
  ${defs}
  ${frame(p)}
  ${motifs[p.motif]()}
</svg>`;
  writeFileSync(join(OUT, p.file), svg.trim());
  console.log('wrote', p.file);
}
console.log('done');
