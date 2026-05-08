-- Seed: "Where Have All the Children Gone?" blog post
-- Run via: supabase db push  OR paste into Supabase SQL Editor.
-- Dollar-quoting avoids any HTML character escaping.

INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  suburbs,
  published,
  published_at,
  read_time_minutes
)
VALUES (
  'Where Have All the Children Gone? Inner West''s Quiet Family Exodus',
  'where-have-all-the-children-gone',
  'Inner West births have fallen 41% from their peak - and 21% since 2001, steeper than the national trend. As the suburb''s population grows, its children are disappearing. The data tells a story that the housing debate isn''t.',
  $POST_CONTENT$<style>
/* ── Children exodus post ── */
@keyframes ce-grow { from { width: 0 } to { width: var(--w, 0%) } }
@media (max-width:600px) { .ce-stats { grid-template-columns: repeat(2,1fr) !important; } }
</style>

<!-- ══ STAT STRIP ══ -->
<div class="ce-stats" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 0 40px;">
  <div style="background:#1e3a8a;color:#fff;border-radius:10px;padding:20px 14px;text-align:center;">
    <div style="font-family:'Fraunces',Georgia,serif;font-size:36px;font-weight:700;letter-spacing:-0.04em;line-height:1;">−41%</div>
    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;margin-top:7px;">Births from 2008 peak</div>
  </div>
  <div style="background:#1e3a8a;color:#fff;border-radius:10px;padding:20px 14px;text-align:center;">
    <div style="font-family:'Fraunces',Georgia,serif;font-size:36px;font-weight:700;letter-spacing:-0.04em;line-height:1;">−5,200</div>
    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;margin-top:7px;">Children since 2018</div>
  </div>
  <div style="background:#0f2b5c;color:#fff;border-radius:10px;padding:20px 14px;text-align:center;">
    <div style="font-family:'Fraunces',Georgia,serif;font-size:36px;font-weight:700;letter-spacing:-0.04em;line-height:1;">14.6%</div>
    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;opacity:0.8;margin-top:7px;">Children under 14 (vs 25% outer SW)</div>
  </div>
</div>

<!-- ══ OPENING ══ -->
<p>The Inner West is growing. More people, more apartments, more cafes. But one number doesn't fit the story: the number of children being born here each year has collapsed.</p>

<p>From a peak of around 3,150 births in 2008–10, the Inner West recorded just 1,850 in 2024 - a 41% fall. The number of children aged 0–14 living in the area has dropped by nearly 5,000 since its 2018 peak. This is happening while the council's total population has continued to grow. Children aren't just declining in absolute terms. They're becoming a shrinking fraction of a growing suburb.</p>

<!-- ══ SECTION: DENSITY TRAP ══ -->
<h2>The density trap</h2>

<p>Across all 30 Greater Sydney councils, one pattern holds with remarkable consistency: the denser the suburb, the fewer children.</p>

<!-- CHART 1: Density vs children - SVG scatter -->
<div style="background:#f8f7f4;border:1px solid #e4e1db;border-left:4px solid #1e3a8a;border-radius:0 10px 10px 0;padding:24px 22px;margin:28px 0;">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1e3a8a;margin-bottom:6px;">ABS 2021 Census · 30 Sydney LGAs</div>
  <div style="font-family:'Fraunces',Georgia,serif;font-size:17px;font-weight:700;color:#1a1a1a;margin:0 0 4px;letter-spacing:-0.01em;line-height:1.3;">Population density vs share of residents aged 0–14</div>
  <div style="font-size:11.5px;color:#888;margin-bottom:14px;">Each dot is a Sydney LGA. Inner West (red star) and key councils labeled.</div>
  <svg viewBox="0 0 900 480" style="width:100%;height:auto;max-width:100%;" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.c1-grid { stroke:#f0f0f0; stroke-width:1; } .c1-axis { stroke:#999; stroke-width:1.5; } .c1-label { font-size:11px; fill:#666; } .c1-title { font-size:12px; font-weight:600; fill:#555; } .c1-dot { stroke-width:1.5; } .c1-dot-iw { stroke-width:2.5; } .c1-iw-label { font-size:11px; font-weight:bold; fill:#b91c1c; }</style></defs>
    <!-- Grid -->
    <line x1="80" y1="50" x2="80" y2="420" class="c1-axis"/>
    <line x1="80" y1="420" x2="880" y2="420" class="c1-axis"/>
    <!-- Dots by region -->
    <circle cx="450" cy="242" r="5.5" class="c1-dot" fill="rgba(249,115,22,0.85)" stroke="rgba(234,88,12,1)"/>
    <circle cx="650" cy="158" r="5.5" class="c1-dot" fill="rgba(249,115,22,0.85)" stroke="rgba(234,88,12,1)"/>
    <circle cx="580" cy="150" r="5.5" class="c1-dot" fill="rgba(249,115,22,0.85)" stroke="rgba(234,88,12,1)"/>
    <circle cx="390" cy="164" r="5.5" class="c1-dot" fill="rgba(249,115,22,0.85)" stroke="rgba(234,88,12,1)"/>
    <circle cx="340" cy="172" r="5.5" class="c1-dot" fill="rgba(249,115,22,0.85)" stroke="rgba(234,88,12,1)"/>
    <circle cx="325" cy="168" r="5.5" class="c1-dot" fill="rgba(249,115,22,0.85)" stroke="rgba(234,88,12,1)"/>
    <circle cx="460" cy="256" r="5.5" class="c1-dot" fill="rgba(236,72,153,0.8)" stroke="rgba(219,39,119,1)"/>
    <circle cx="385" cy="145" r="5.5" class="c1-dot" fill="rgba(236,72,153,0.8)" stroke="rgba(219,39,119,1)"/>
    <circle cx="245" cy="256" r="5.5" class="c1-dot" fill="rgba(236,72,153,0.8)" stroke="rgba(219,39,119,1)"/>
    <circle cx="540" cy="244" r="5.5" class="c1-dot" fill="rgba(20,184,166,0.85)" stroke="rgba(13,148,136,1)"/>
    <circle cx="220" cy="240" r="5.5" class="c1-dot" fill="rgba(20,184,166,0.85)" stroke="rgba(13,148,136,1)"/>
    <circle cx="230" cy="172" r="5.5" class="c1-dot" fill="rgba(20,184,166,0.85)" stroke="rgba(13,148,136,1)"/>
    <circle cx="225" cy="190" r="5.5" class="c1-dot" fill="rgba(20,184,166,0.85)" stroke="rgba(13,148,136,1)"/>
    <circle cx="170" cy="176" r="5.5" class="c1-dot" fill="rgba(20,184,166,0.85)" stroke="rgba(13,148,136,1)"/>
    <circle cx="105" cy="198" r="5.5" class="c1-dot" fill="rgba(59,130,246,0.85)" stroke="rgba(37,99,235,1)"/>
    <circle cx="95" cy="192" r="5.5" class="c1-dot" fill="rgba(59,130,246,0.85)" stroke="rgba(37,99,235,1)"/>
    <circle cx="120" cy="178" r="5.5" class="c1-dot" fill="rgba(59,130,246,0.85)" stroke="rgba(37,99,235,1)"/>
    <circle cx="230" cy="168" r="5.5" class="c1-dot" fill="rgba(22,163,74,0.85)" stroke="rgba(15,118,55,1)"/>
    <circle cx="335" cy="204" r="5.5" class="c1-dot" fill="rgba(22,163,74,0.85)" stroke="rgba(15,118,55,1)"/>
    <circle cx="220" cy="206" r="5.5" class="c1-dot" fill="rgba(22,163,74,0.85)" stroke="rgba(15,118,55,1)"/>
    <circle cx="270" cy="148" r="5.5" class="c1-dot" fill="rgba(22,163,74,0.85)" stroke="rgba(15,118,55,1)"/>
    <circle cx="195" cy="156" r="5.5" class="c1-dot" fill="rgba(22,163,74,0.85)" stroke="rgba(15,118,55,1)"/>
    <circle cx="145" cy="164" r="5.5" class="c1-dot" fill="rgba(22,163,74,0.85)" stroke="rgba(15,118,55,1)"/>
    <circle cx="125" cy="256" r="5.5" class="c1-dot" fill="rgba(139,92,246,0.85)" stroke="rgba(109,40,217,1)"/>
    <circle cx="235" cy="252" r="5.5" class="c1-dot" fill="rgba(139,92,246,0.85)" stroke="rgba(109,40,217,1)"/>
    <circle cx="175" cy="256" r="5.5" class="c1-dot" fill="rgba(139,92,246,0.85)" stroke="rgba(109,40,217,1)"/>
    <circle cx="215" cy="252" r="5.5" class="c1-dot" fill="rgba(139,92,246,0.85)" stroke="rgba(109,40,217,1)"/>
    <circle cx="240" cy="244" r="5.5" class="c1-dot" fill="rgba(139,92,246,0.85)" stroke="rgba(109,40,217,1)"/>
    <circle cx="165" cy="252" r="5.5" class="c1-dot" fill="rgba(139,92,246,0.85)" stroke="rgba(109,40,217,1)"/>
    <circle cx="195" cy="244" r="5.5" class="c1-dot" fill="rgba(234,179,8,0.85)" stroke="rgba(202,138,4,1)"/>
    <circle cx="100" cy="252" r="5.5" class="c1-dot" fill="rgba(156,163,175,0.85)" stroke="rgba(107,114,128,1)"/>
    <!-- Inner West: red star -->
    <g transform="translate(410,246)">
      <path d="M 0,-6 L 1.8,-1.8 L 6,-0.5 L 2.4,1.8 L 3.6,6 L 0,3 L -3.6,6 L -2.4,1.8 L -6,-0.5 L -1.8,-1.8 Z" fill="rgba(220,38,38,0.92)" stroke="rgba(185,28,28,1)" stroke-width="1.5"/>
    </g>
    <!-- City of Sydney: large red dot -->
    <circle cx="760" cy="362" r="6" class="c1-dot c1-dot-iw" fill="rgba(220,38,38,0.92)" stroke="rgba(185,28,28,1)"/>
    <!-- Labels -->
    <text x="410" y="265" text-anchor="middle" class="c1-iw-label">★ Inner West</text>
    <text x="410" y="280" text-anchor="middle" class="c1-iw-label" font-size="10">5,423/km² | 14.6%</text>
    <text x="760" y="380" text-anchor="middle" class="c1-label" font-weight="bold">City of Sydney</text>
    <text x="760" y="393" text-anchor="middle" class="c1-label" font-size="10">8,893/km² | 7.6%</text>
    <text x="95" y="270" text-anchor="middle" class="c1-label" font-size="10">Camden</text>
    <text x="95" y="283" text-anchor="middle" class="c1-label" font-size="9">25.3%</text>
    <!-- Axes labels -->
    <text x="480" y="450" text-anchor="middle" class="c1-title">Population Density (persons per km²)</text>
    <text x="30" y="230" text-anchor="middle" class="c1-title" transform="rotate(-90 30 230)">% Population Aged 0–14 Years</text>
    <!-- Trend arrow -->
    <line x1="150" y1="260" x2="700" y2="100" stroke="rgba(150,150,150,0.3)" stroke-width="2" stroke-dasharray="6,4"/>
    <text x="710" y="85" font-size="10" fill="#aaa">More density → fewer children</text>
  </svg>
  <div style="display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:16px;padding:0 0 8px;">
    <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#444;"><div style="width:10px;height:10px;border-radius:50%;background:rgba(249,115,22,0.85);border:1.5px solid rgba(234,88,12,1);"></div>Eastern Sydney</div>
    <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#444;"><div style="width:10px;height:10px;border-radius:50%;background:rgba(236,72,153,0.8);border:1.5px solid rgba(219,39,119,1);"></div>Inner suburbs</div>
    <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#444;"><div style="width:10px;height:10px;border-radius:50%;background:rgba(20,184,166,0.85);border:1.5px solid rgba(13,148,136,1);"></div>Lower North Shore</div>
    <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#444;"><div style="width:10px;height:10px;border-radius:50%;background:rgba(59,130,246,0.85);border:1.5px solid rgba(37,99,235,1);"></div>Upper North / Beaches</div>
    <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#444;"><div style="width:10px;height:10px;border-radius:50%;background:rgba(22,163,74,0.85);border:1.5px solid rgba(15,118,55,1);"></div>Western Sydney</div>
    <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#444;"><div style="width:10px;height:10px;border-radius:50%;background:rgba(139,92,246,0.85);border:1.5px solid rgba(109,40,217,1);"></div>Outer / Growth SW</div>
  </div>
  <div style="font-size:10.5px;color:#bbb;margin-top:12px;">Source: ABS 2021 Census QuickStats; ABS Regional Population 2023-24.</div>
</div>
</script>

<p>Camden, at 700 people per km², has 25.3% of residents under 14. The City of Sydney - the densest council in Greater Sydney at nearly 9,000 per km² - has just 7.6%. The Inner West, at 5,423 per km², sits at 14.6%: well below the Greater Sydney average of 18.5%.</p>

<p>This is correlation, not causation. Dense suburbs don't drive families away directly. But the correlation reflects two consistent pressures: affordability and housing type. As density increases, so do prices - and families on tight budgets are priced out first. And as density increases, the housing mix shifts steadily toward the smaller, investor-targeted apartments that don't suit a family with school-age children.</p>

<!-- ══ SECTION: BIRTHS COLLAPSE ══ -->
<h2>The births collapse - and the national comparison</h2>

<!-- CHART A: Time series - Chart.js -->
<div style="background:#f8f7f4;border:1px solid #e4e1db;border-left:4px solid #ea580c;border-radius:0 10px 10px 0;padding:24px 22px 16px;margin:28px 0;">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#ea580c;margin-bottom:6px;">ABS Births cat. 3301.0 · IWC 2001–2024</div>
  <div style="font-family:'Fraunces',Georgia,serif;font-size:17px;font-weight:700;color:#1a1a1a;margin:0 0 4px;letter-spacing:-0.01em;line-height:1.3;">IWC children &amp; births vs Australia fertility rate</div>
  <div style="font-size:11.5px;color:#888;margin-bottom:14px;">Hover for year detail. Baby Bonus period (2004–2014) shaded.</div>
  <div style="position:relative;height:380px;">
    <canvas id="iwcChartABlog"></canvas>
  </div>
  <div style="font-size:10.5px;color:#bbb;margin-top:12px;">Source: ABS Births cat. 3301.0; ABS Regional Population by Age and Sex; ABS Demographic Statistics. IWC values approximate ±50.</div>
</div>
<svg viewBox="0 0 1080 500" style="width:100%;height:auto;max-width:100%;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .c2-axis { stroke:#999; stroke-width:1.5; }
      .c2-grid { stroke:#f0f0f0; stroke-width:1; }
      .c2-label { font-size:10px; fill:#666; font-family:system-ui; }
      .c2-axis-label { font-size:11px; font-weight:600; fill:#333; font-family:system-ui; }
      .c2-line-children { stroke:#1e3a8a; stroke-width:2.5; fill:none; }
      .c2-line-births { stroke:#ea580c; stroke-width:2.5; fill:none; }
      .c2-line-tfr { stroke:#16a34a; stroke-width:2; fill:none; stroke-dasharray:7,4; }
      .c2-dot-children { fill:#1e3a8a; stroke:#fff; stroke-width:2; }
      .c2-dot-births { fill:#ea580c; stroke:#fff; stroke-width:2; }
      .c2-dot-tfr { fill:#16a34a; stroke:#fff; stroke-width:2; }
      .c2-legend { font-size:12px; font-weight:500; fill:#333; font-family:system-ui; }
      .c2-annotation-box { fill:rgba(254,240,138,0.18); stroke:rgba(234,179,8,0.4); stroke-width:1; }
      .c2-annotation-text { font-size:9px; font-weight:bold; fill:#92400e; font-family:system-ui; text-anchor:middle; }
      .c2-title { font-size:13px; font-weight:600; fill:#555; font-family:system-ui; }
    </style>
  </defs>
  <!-- Legend -->
  <text x="60" y="24" class="c2-legend">
    <tspan fill="#1e3a8a">■</tspan> IWC Children 0-14
    <tspan x="300" fill="#ea580c">■</tspan> IWC Annual Births
    <tspan x="550" fill="#16a34a">■ - -</tspan> Australia TFR
  </text>
  <!-- Axes -->
  <line x1="60" y1="50" x2="60" y2="450" class="c2-axis"/>
  <line x1="60" y1="450" x2="1050" y2="450" class="c2-axis"/>
  <line x1="1050" y1="50" x2="1050" y2="450" class="c2-axis"/>
  <!-- Left axis: Children 0-14 (20000-32500) -->
  <text x="15" y="55" class="c2-axis-label" text-anchor="end">32500</text>
  <text x="15" y="160" class="c2-axis-label" text-anchor="end">29000</text>
  <text x="15" y="265" class="c2-axis-label" text-anchor="end">25500</text>
  <text x="15" y="370" class="c2-axis-label" text-anchor="end">22000</text>
  <text x="15" y="455" class="c2-axis-label" text-anchor="end">20000</text>
  <text x="25" y="240" class="c2-axis-label" text-anchor="middle" transform="rotate(-90 25 240)" fill="#1e3a8a">IWC Children aged 0–14</text>
  <!-- Right axis: Births (1200-3600) -->
  <text x="1065" y="55" class="c2-axis-label">3600</text>
  <text x="1065" y="160" class="c2-axis-label">3000</text>
  <text x="1065" y="265" class="c2-axis-label">2400</text>
  <text x="1065" y="370" class="c2-axis-label">1800</text>
  <text x="1065" y="455" class="c2-axis-label">1200</text>
  <text x="1045" y="240" class="c2-axis-label" text-anchor="middle" transform="rotate(90 1045 240)" fill="#ea580c">IWC Annual Births</text>
  <!-- Right offset axis: TFR (1.2-2.4) -->
  <text x="1070" y="140" class="c2-axis-label" font-size="9">2.4</text>
  <text x="1070" y="245" class="c2-axis-label" font-size="9">2.0</text>
  <text x="1070" y="350" class="c2-axis-label" font-size="9">1.6</text>
  <text x="1070" y="455" class="c2-axis-label" font-size="9">1.2</text>
  <!-- Grid lines (major) -->
  <line x1="60" y1="160" x2="1050" y2="160" class="c2-grid"/>
  <line x1="60" y1="270" x2="1050" y2="270" class="c2-grid"/>
  <line x1="60" y1="380" x2="1050" y2="380" class="c2-grid"/>
  <!-- Baby Bonus annotation box (2004-2014 era) -->
  <rect x="140" y="60" width="410" height="380" class="c2-annotation-box"/>
  <text x="345" y="100" class="c2-annotation-text">Baby Bonus</text>
  <text x="345" y="112" class="c2-annotation-text">2004-2014</text>
  <!-- Data lines and points for Children 0-14 (left axis, 20000-32500 range) -->
  <polyline points="80,420 95,433 110,433 125,433 140,433 155,418 170,402 185,375 200,325 215,307 230,275 245,212 260,162 275,130 290,162 305,142 320,158 335,115 350,75 365,78 380,102 395,142 410,147 425,175" class="c2-line-children"/>
  <circle cx="80" cy="420" r="3" class="c2-dot-children"/>
  <circle cx="95" cy="433" r="3" class="c2-dot-children"/>
  <circle cx="110" cy="433" r="3" class="c2-dot-children"/>
  <circle cx="125" cy="433" r="3" class="c2-dot-children"/>
  <circle cx="140" cy="433" r="3" class="c2-dot-children"/>
  <circle cx="155" cy="418" r="3" class="c2-dot-children"/>
  <circle cx="170" cy="402" r="3" class="c2-dot-children"/>
  <circle cx="185" cy="375" r="3" class="c2-dot-children"/>
  <circle cx="200" cy="325" r="3" class="c2-dot-children"/>
  <circle cx="215" cy="307" r="3" class="c2-dot-children"/>
  <circle cx="230" cy="275" r="3" class="c2-dot-children"/>
  <circle cx="245" cy="212" r="3" class="c2-dot-children"/>
  <circle cx="260" cy="162" r="3" class="c2-dot-children"/>
  <circle cx="275" cy="130" r="3" class="c2-dot-children"/>
  <circle cx="290" cy="162" r="3" class="c2-dot-children"/>
  <circle cx="305" cy="142" r="3" class="c2-dot-children"/>
  <circle cx="320" cy="158" r="3" class="c2-dot-children"/>
  <circle cx="335" cy="115" r="3" class="c2-dot-children"/>
  <circle cx="350" cy="75" r="3" class="c2-dot-children"/>
  <circle cx="365" cy="78" r="3" class="c2-dot-children"/>
  <circle cx="380" cy="102" r="3" class="c2-dot-children"/>
  <circle cx="395" cy="142" r="3" class="c2-dot-children"/>
  <circle cx="410" cy="147" r="3" class="c2-dot-children"/>
  <circle cx="425" cy="175" r="3" class="c2-dot-children"/>
  <!-- Data lines and points for Births (right axis, 1200-3600 range) -->
  <polyline points="80,405 95,398 110,390 125,377 140,360 155,348 170,312 185,280 200,298 215,280 230,305 245,340 260,320 275,360 290,315 305,365 320,375 335,362 350,340 365,330 380,368 395,405 410,415 425,420" class="c2-line-births"/>
  <circle cx="80" cy="405" r="3" class="c2-dot-births"/>
  <circle cx="95" cy="398" r="3" class="c2-dot-births"/>
  <circle cx="110" cy="390" r="3" class="c2-dot-births"/>
  <circle cx="125" cy="377" r="3" class="c2-dot-births"/>
  <circle cx="140" cy="360" r="3" class="c2-dot-births"/>
  <circle cx="155" cy="348" r="3" class="c2-dot-births"/>
  <circle cx="170" cy="312" r="3" class="c2-dot-births"/>
  <circle cx="185" cy="280" r="3" class="c2-dot-births"/>
  <circle cx="200" cy="298" r="3" class="c2-dot-births"/>
  <circle cx="215" cy="280" r="3" class="c2-dot-births"/>
  <circle cx="230" cy="305" r="3" class="c2-dot-births"/>
  <circle cx="245" cy="340" r="3" class="c2-dot-births"/>
  <circle cx="260" cy="320" r="3" class="c2-dot-births"/>
  <circle cx="275" cy="360" r="3" class="c2-dot-births"/>
  <circle cx="290" cy="315" r="3" class="c2-dot-births"/>
  <circle cx="305" cy="365" r="3" class="c2-dot-births"/>
  <circle cx="320" cy="375" r="3" class="c2-dot-births"/>
  <circle cx="335" cy="362" r="3" class="c2-dot-births"/>
  <circle cx="350" cy="340" r="3" class="c2-dot-births"/>
  <circle cx="365" cy="330" r="3" class="c2-dot-births"/>
  <circle cx="380" cy="368" r="3" class="c2-dot-births"/>
  <circle cx="395" cy="405" r="3" class="c2-dot-births"/>
  <circle cx="410" cy="415" r="3" class="c2-dot-births"/>
  <circle cx="425" cy="420" r="3" class="c2-dot-births"/>
  <!-- Data lines and points for Australia TFR (right offset axis, 1.2-2.4 range) -->
  <polyline points="80,165 95,158 110,159 125,154 140,150 155,144 170,118 185,95 200,111 215,118 230,122 245,137 260,147 275,157 290,175 305,182 320,182 335,187 350,197 365,217 380,230 395,245 410,260 425,280" class="c2-line-tfr"/>
  <circle cx="80" cy="165" r="2.5" class="c2-dot-tfr"/>
  <circle cx="95" cy="158" r="2.5" class="c2-dot-tfr"/>
  <circle cx="110" cy="159" r="2.5" class="c2-dot-tfr"/>
  <circle cx="125" cy="154" r="2.5" class="c2-dot-tfr"/>
  <circle cx="140" cy="150" r="2.5" class="c2-dot-tfr"/>
  <circle cx="155" cy="144" r="2.5" class="c2-dot-tfr"/>
  <circle cx="170" cy="118" r="2.5" class="c2-dot-tfr"/>
  <circle cx="185" cy="95" r="2.5" class="c2-dot-tfr"/>
  <circle cx="200" cy="111" r="2.5" class="c2-dot-tfr"/>
  <circle cx="215" cy="118" r="2.5" class="c2-dot-tfr"/>
  <circle cx="230" cy="122" r="2.5" class="c2-dot-tfr"/>
  <circle cx="245" cy="137" r="2.5" class="c2-dot-tfr"/>
  <circle cx="260" cy="147" r="2.5" class="c2-dot-tfr"/>
  <circle cx="275" cy="157" r="2.5" class="c2-dot-tfr"/>
  <circle cx="290" cy="175" r="2.5" class="c2-dot-tfr"/>
  <circle cx="305" cy="182" r="2.5" class="c2-dot-tfr"/>
  <circle cx="320" cy="182" r="2.5" class="c2-dot-tfr"/>
  <circle cx="335" cy="187" r="2.5" class="c2-dot-tfr"/>
  <circle cx="350" cy="197" r="2.5" class="c2-dot-tfr"/>
  <circle cx="365" cy="217" r="2.5" class="c2-dot-tfr"/>
  <circle cx="380" cy="230" r="2.5" class="c2-dot-tfr"/>
  <circle cx="395" cy="245" r="2.5" class="c2-dot-tfr"/>
  <circle cx="410" cy="260" r="2.5" class="c2-dot-tfr"/>
  <circle cx="425" cy="280" r="2.5" class="c2-dot-tfr"/>
  <!-- X-axis year labels (every 2 years) -->
  <text x="80" y="475" class="c2-label" text-anchor="middle">2001</text>
  <text x="140" y="475" class="c2-label" text-anchor="middle">2004</text>
  <text x="200" y="475" class="c2-label" text-anchor="middle">2007</text>
  <text x="260" y="475" class="c2-label" text-anchor="middle">2010</text>
  <text x="320" y="475" class="c2-label" text-anchor="middle">2013</text>
  <text x="380" y="475" class="c2-label" text-anchor="middle">2016</text>
  <text x="425" y="475" class="c2-label" text-anchor="middle">2024</text>
</svg>

<p>There's a visible bump in the births data between 2004 and 2014. That's the Baby Bonus era - the Howard and Rudd governments' $5,000–$7,500 payment per birth. Inner West births peaked at around 3,150 in 2008–10 before the payment was wound back from 2009 and abolished entirely in 2014. When it ended, births fell sharply, recovered briefly in 2016–18, then collapsed to a 23-year low in 2024.</p>

<p>The more revealing comparison is with Australia's national Total Fertility Rate. Index both to 2001=100 and the picture sharpens: Australia's TFR has fallen about 14% since 2001. The Inner West's birth count has fallen 21% over the same period. The Inner West isn't simply tracking the national trend. It's declining faster - and the gap has widened. Families who might have children are leaving the Inner West, or being priced out before they reach that stage of life.</p>

<!-- ══ SECTION: WHAT'S BEING BUILT ══ -->
<h2>What's actually being built</h2>

<p>The standard response to this kind of data is: build more housing. Increase supply, reduce prices, make it affordable for families again. In theory, it's sound. In practice, the housing being built in the Inner West isn't what families need.</p>

<p>Nationally, 40% of housing demand is for three or more bedrooms. But new apartment supply delivers just 25% three-bedroom units. In the City of Sydney - a clear preview of the Inner West's trajectory - only 14.4% of existing housing stock is three or more bedrooms, compared to 29.7% across Greater Sydney. RMIT urban planner Liam Davies has documented why: developers building high-rise for investors focus on one and two-bedroom apartments because they yield higher returns per square metre. Three-bedroom Sydney apartments jumped 18% in price in the year to March 2024 - a market signal that demand exists but supply is not following. The market is delivering what's most profitable, not what young families actually need.</p>

<!-- ══ SECTION: YIMBY COUNTER ══ -->
<h2>The supply argument, examined</h2>

<p>Advocates of aggressive densification argue the solution is simply more supply - and that concerns about housing type or family suitability are just NIMBYism dressed in demographics. That's a serious argument. Here's a serious answer.</p>

<p>The councils delivering the most new housing in Sydney are Parramatta and Blacktown. Parramatta built 79% of its annual NSW Government housing target last financial year; Blacktown delivered 58%. Both have substantially higher child populations than the Inner West - Parramatta at 15.3%, Blacktown at 22.7%. More housing supply is being delivered <em>where children already live</em>. Less supply is being built - and more investor apartments are already concentrated - where children are disappearing. Quantity of supply matters, but type and affordability floor matter too. A suburb full of one-bedroom investor apartments doesn't attract families, regardless of how many units are built.</p>

<p>There's also an infrastructure dimension that rarely features in the supply debate. Inner West primary schools are operating close to capacity. Childcare waitlists in suburbs like Marrickville and Newtown stretch to 18 months or more. Supply cannot solve a capacity crisis in the services families depend on - and without those services, new housing doesn't translate into new families.</p>

<!-- ══ SECTION: FAIRER FUTURE ══ -->
<h2>The Fairer Future Plan: denser, but fairer for whom?</h2>

<p>Inner West Council's response to the housing crisis is the "Our Fairer Future" plan - 31,000 new dwellings in Phase 1 alone, more than double the NSW Government's own target for the area. Council presents it as the solution to affordability. The data in this article suggests it will make the family exodus worse, not better.</p>

<p>The plan proposes density without the conditions that could make it family-friendly. There is no mandate for a minimum proportion of three-bedroom dwellings - the family-sized housing this article shows is already critically undersupplied. Without that requirement, the market will do what it always does: deliver one and two-bedroom investor apartments that maximise return per square metre. More of the same housing type, at greater scale, produces more of the same demographic outcome.</p>

<p>The affordability case is weaker still. Council's plan defines "affordable housing" as 80 per cent of market rent. In the Inner West, where median rents sit around $700 per week, that means "affordable" is $560 per week. That figure is out of reach for young families, essential workers, and anyone on a median income. It is a discount. It is not a solution. And the plan delivers zero additional public housing directly - only aspirational targets dependent on state government cooperation that has not been funded.</p>

<!-- Callout: City of Sydney preview -->
<div style="background:#fff3f3;border:1px solid #fca5a5;border-left:4px solid #dc2626;border-radius:0 10px 10px 0;padding:20px 22px;margin:28px 0;">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#dc2626;margin-bottom:6px;">Where this trajectory leads</div>
  <div style="font-family:'Fraunces',Georgia,serif;font-size:16px;font-weight:700;color:#1a1a1a;margin:0 0 10px;line-height:1.3;">City of Sydney: 8,893 people/km² - 7.6% children under 14</div>
  <p style="font-size:13.5px;color:#555;line-height:1.65;margin:0;">The City of Sydney is the densest council in Greater Sydney and has the lowest share of children of any major LGA. The Inner West is currently at 5,423/km² and 14.6% children. The Fairer Future Plan accelerates density without changing the housing mix or affordability floor. The City of Sydney is not a warning. It is a preview.</p>
</div>

<p>A plan that adds 31,000 dwellings - predominantly small apartments, at rents families cannot afford, without the schools, childcare places, or parks to support them - is not a fairer future for families. It is a continuation of the conditions already driving them out. The Inner West already has fewer children per resident than almost any comparable council in Sydney. The question the plan does not answer is: after another decade of this kind of density, how many will be left?</p>

<p><a href="https://www.iwpulse.com/?blog=fairer-future-inner-west-development-plan" style="color:#1e3a8a;font-weight:600;text-decoration:underline;">Read IW Pulse's full analysis of the Fairer Future Plan</a> - including the 8-7 council vote, the consultation data showing 85% of respondents opposed the scale of the uplift, and the suburb-by-suburb breakdown of where the density lands.</p>

<!-- ══ SECTION: WHAT COMES NEXT ══ -->
<h2>What comes next</h2>

<p>The 2026 census will be the first hard population count since this decline accelerated. If the trend holds, the Inner West will record a measurable fall in its child population for the first time in modern history - even as its total population continues to grow. No one voted for that outcome. Understanding what's driving it - and what combination of housing policy, infrastructure investment, and planning decisions could reverse it - is the conversation the Inner West needs to have before the next round of rezoning locks in another decade of outcomes.</p>

<p style="border-top:1px solid #e5e7eb;padding-top:18px;margin-top:28px;font-size:13px;color:#555;line-height:1.7;"><strong>IW Pulse</strong> is tracking the data behind Inner West's demographic shift. If you have access to school enrolment data, childcare waitlist figures, or ABS time-series data not referenced here, <a href="mailto:hello@iwpulse.com.au" style="color:#1e3a8a;text-decoration:underline;">get in touch</a>. All data cited in this article is publicly available from the ABS and NSW Planning Portal.</p>
$POST_CONTENT$,
  'Demographics',
  ARRAY['Inner West', 'Sydney'],
  true,
  NOW(),
  5
)
ON CONFLICT (slug) DO UPDATE SET
  title             = EXCLUDED.title,
  excerpt           = EXCLUDED.excerpt,
  content           = EXCLUDED.content,
  category          = EXCLUDED.category,
  suburbs           = EXCLUDED.suburbs,
  published         = EXCLUDED.published,
  published_at      = EXCLUDED.published_at,
  read_time_minutes = EXCLUDED.read_time_minutes;
