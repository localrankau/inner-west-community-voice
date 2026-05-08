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

<p>Camden, at 700 people per km², has 25.3% of residents under 14. The City of Sydney - the densest council in Greater Sydney at nearly 9,000 per km² - has just 7.6%. The Inner West, at 5,423 per km², sits at 14.6%: well below the Greater Sydney average of 18.5%.</p>

<p>This is correlation, not causation. Dense suburbs don't drive families away directly. But the correlation reflects two consistent pressures: affordability and housing type. As density increases, so do prices - and families on tight budgets are priced out first. And as density increases, the housing mix shifts steadily toward the smaller, investor-targeted apartments that don't suit a family with school-age children.</p>

<!-- ══ SECTION: BIRTHS COLLAPSE ══ -->
<h2>The births collapse - and the national comparison</h2>

<!-- CHART A SVG: 3-line chart - IWC Children 0-14, IWC Births, Australia TFR 2001-2024
     All coordinates calculated from exact data:
     Plot area x:90-980 (890px wide), y:50-450 (400px tall)
     x step = 890/23 per year; yLeft range 20000-32500; yRight range 1200-3600; yTFR range 1.2-2.4 -->
<div style="background:#f8f7f4;border:1px solid #e4e1db;border-left:4px solid #ea580c;border-radius:0 10px 10px 0;padding:24px 22px 16px;margin:28px 0;">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#ea580c;margin-bottom:6px;">ABS Births cat. 3301.0 · IWC 2001–2024</div>
  <div style="font-family:'Fraunces',Georgia,serif;font-size:17px;font-weight:700;color:#1a1a1a;margin:0 0 4px;letter-spacing:-0.01em;line-height:1.3;">IWC children &amp; births vs Australia fertility rate</div>
  <div style="font-size:11.5px;color:#888;margin-bottom:14px;">Baby Bonus period (2004–2014) shaded.</div>
<svg viewBox="0 0 1120 530" style="width:100%;height:auto;max-width:100%;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="c2-clip">
      <rect x="90" y="50" width="890" height="400"/>
    </clipPath>
  </defs>
  <!-- Legend row -->
  <rect x="90" y="12" width="12" height="12" fill="#1e3a8a" rx="2"/>
  <text x="108" y="23" font-size="12" font-family="system-ui,sans-serif" fill="#333">IWC Children 0–14</text>
  <rect x="320" y="12" width="12" height="12" fill="#ea580c" rx="2"/>
  <text x="338" y="23" font-size="12" font-family="system-ui,sans-serif" fill="#333">IWC Annual Births</text>
  <line x1="560" y1="18" x2="590" y2="18" stroke="#16a34a" stroke-width="2" stroke-dasharray="6,3"/>
  <circle cx="575" cy="18" r="3" fill="#16a34a"/>
  <text x="598" y="23" font-size="12" font-family="system-ui,sans-serif" fill="#333">Australia TFR (national)</text>
  <!-- Left Y-axis (Children 0-14: 20000-32500) -->
  <line x1="90" y1="50" x2="90" y2="450" stroke="#999" stroke-width="1.5"/>
  <line x1="86" y1="50" x2="90" y2="50" stroke="#999" stroke-width="1.5"/>
  <line x1="86" y1="162" x2="90" y2="162" stroke="#999" stroke-width="1.5"/>
  <line x1="86" y1="258" x2="90" y2="258" stroke="#999" stroke-width="1.5"/>
  <line x1="86" y1="354" x2="90" y2="354" stroke="#999" stroke-width="1.5"/>
  <line x1="86" y1="450" x2="90" y2="450" stroke="#999" stroke-width="1.5"/>
  <text x="82" y="54" font-size="10" font-family="system-ui,sans-serif" fill="#1e3a8a" text-anchor="end">32,500</text>
  <text x="82" y="166" font-size="10" font-family="system-ui,sans-serif" fill="#1e3a8a" text-anchor="end">29,000</text>
  <text x="82" y="262" font-size="10" font-family="system-ui,sans-serif" fill="#1e3a8a" text-anchor="end">26,000</text>
  <text x="82" y="358" font-size="10" font-family="system-ui,sans-serif" fill="#1e3a8a" text-anchor="end">23,000</text>
  <text x="82" y="454" font-size="10" font-family="system-ui,sans-serif" fill="#1e3a8a" text-anchor="end">20,000</text>
  <text transform="translate(18,250) rotate(-90)" font-size="11" font-family="system-ui,sans-serif" fill="#1e3a8a" font-weight="600" text-anchor="middle">IWC Children aged 0–14</text>
  <!-- X-axis -->
  <line x1="90" y1="450" x2="980" y2="450" stroke="#999" stroke-width="1.5"/>
  <!-- Right Y-axis (Births: 1200-3600) -->
  <line x1="980" y1="50" x2="980" y2="450" stroke="#ea580c" stroke-width="1.5"/>
  <line x1="980" y1="50" x2="984" y2="50" stroke="#ea580c" stroke-width="1.5"/>
  <line x1="980" y1="150" x2="984" y2="150" stroke="#ea580c" stroke-width="1.5"/>
  <line x1="980" y1="250" x2="984" y2="250" stroke="#ea580c" stroke-width="1.5"/>
  <line x1="980" y1="350" x2="984" y2="350" stroke="#ea580c" stroke-width="1.5"/>
  <line x1="980" y1="450" x2="984" y2="450" stroke="#ea580c" stroke-width="1.5"/>
  <text x="988" y="54" font-size="10" font-family="system-ui,sans-serif" fill="#ea580c">3,600</text>
  <text x="988" y="154" font-size="10" font-family="system-ui,sans-serif" fill="#ea580c">3,000</text>
  <text x="988" y="254" font-size="10" font-family="system-ui,sans-serif" fill="#ea580c">2,400</text>
  <text x="988" y="354" font-size="10" font-family="system-ui,sans-serif" fill="#ea580c">1,800</text>
  <text x="988" y="454" font-size="10" font-family="system-ui,sans-serif" fill="#ea580c">1,200</text>
  <text transform="translate(1060,250) rotate(90)" font-size="11" font-family="system-ui,sans-serif" fill="#ea580c" font-weight="600" text-anchor="middle">IWC Annual Births</text>
  <!-- TFR axis (right offset: 1.2-2.4) -->
  <line x1="1075" y1="50" x2="1075" y2="450" stroke="#16a34a" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="1073" y1="50" x2="1075" y2="50" stroke="#16a34a" stroke-width="1"/>
  <line x1="1073" y1="183" x2="1075" y2="183" stroke="#16a34a" stroke-width="1"/>
  <line x1="1073" y1="317" x2="1075" y2="317" stroke="#16a34a" stroke-width="1"/>
  <line x1="1073" y1="450" x2="1075" y2="450" stroke="#16a34a" stroke-width="1"/>
  <text x="1079" y="54" font-size="9" font-family="system-ui,sans-serif" fill="#16a34a">2.4</text>
  <text x="1079" y="187" font-size="9" font-family="system-ui,sans-serif" fill="#16a34a">2.0</text>
  <text x="1079" y="321" font-size="9" font-family="system-ui,sans-serif" fill="#16a34a">1.6</text>
  <text x="1079" y="454" font-size="9" font-family="system-ui,sans-serif" fill="#16a34a">1.2</text>
  <!-- Grid lines (horizontal, light) -->
  <line x1="90" y1="162" x2="980" y2="162" stroke="#f0f0f0" stroke-width="1"/>
  <line x1="90" y1="258" x2="980" y2="258" stroke="#f0f0f0" stroke-width="1"/>
  <line x1="90" y1="354" x2="980" y2="354" stroke="#f0f0f0" stroke-width="1"/>
  <!-- Baby Bonus box (2004=x206, 2014=x591) -->
  <rect x="206" y="50" width="385" height="400" fill="rgba(254,240,138,0.18)" stroke="rgba(234,179,8,0.4)" stroke-width="1" clip-path="url(#c2-clip)"/>
  <text x="398" y="76" font-size="9" font-family="system-ui,sans-serif" fill="#92400e" font-weight="bold" text-anchor="middle">Baby Bonus</text>
  <text x="398" y="88" font-size="9" font-family="system-ui,sans-serif" fill="#92400e" font-weight="bold" text-anchor="middle">2004–2014</text>
  <!-- Fill: Children (blue, semi-transparent) -->
  <polygon points="90,450 90,344 129,351 167,351 206,351 244,351 283,341 321,322 360,290 398,242 437,236 475,223 514,178 552,156 591,146 629,156 668,149 706,146 745,136 783,162 822,194 860,236 899,287 937,293 976,271 976,450" fill="rgba(30,58,138,0.08)" clip-path="url(#c2-clip)"/>
  <!-- Fill: Births (orange, semi-transparent) -->
  <polygon points="90,450 90,258 129,253 167,250 206,237 244,208 283,197 321,153 360,125 398,142 437,125 475,150 514,170 552,155 591,237 629,200 668,235 706,240 745,208 783,283 822,300 860,253 899,317 937,340 976,342 976,450" fill="rgba(234,88,12,0.07)" clip-path="url(#c2-clip)"/>
  <!-- Line: Children 0-14 (blue solid) -->
  <polyline points="90,344 129,351 167,351 206,351 244,351 283,341 321,322 360,290 398,242 437,236 475,223 514,178 552,156 591,146 629,156 668,149 706,146 745,136 783,162 822,194 860,236 899,287 937,293 976,271" stroke="#1e3a8a" stroke-width="2.5" fill="none" stroke-linejoin="round" clip-path="url(#c2-clip)"/>
  <!-- Dots: Children -->
  <circle cx="90" cy="344" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="129" cy="351" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="167" cy="351" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="206" cy="351" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="244" cy="351" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="283" cy="341" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="321" cy="322" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="360" cy="290" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="398" cy="242" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="437" cy="236" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="475" cy="223" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="514" cy="178" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="552" cy="156" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="591" cy="146" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="629" cy="156" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="668" cy="149" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="706" cy="146" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="745" cy="136" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="783" cy="162" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="822" cy="194" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="860" cy="236" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="899" cy="287" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="937" cy="293" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <circle cx="976" cy="271" r="3" fill="#1e3a8a" stroke="white" stroke-width="1.5"/>
  <!-- Line: Annual Births (orange solid) -->
  <polyline points="90,258 129,253 167,250 206,237 244,208 283,197 321,153 360,125 398,142 437,125 475,150 514,170 552,155 591,237 629,200 668,235 706,240 745,208 783,283 822,300 860,253 899,317 937,340 976,342" stroke="#ea580c" stroke-width="2.5" fill="none" stroke-linejoin="round" clip-path="url(#c2-clip)"/>
  <!-- Dots: Births -->
  <circle cx="90" cy="258" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="129" cy="253" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="167" cy="250" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="206" cy="237" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="244" cy="208" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="283" cy="197" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="321" cy="153" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="360" cy="125" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="398" cy="142" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="437" cy="125" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="475" cy="150" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="514" cy="170" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="552" cy="155" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="591" cy="237" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="629" cy="200" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="668" cy="235" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="706" cy="240" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="745" cy="208" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="783" cy="283" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="822" cy="300" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="860" cy="253" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="899" cy="317" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="937" cy="340" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <circle cx="976" cy="342" r="3" fill="#ea580c" stroke="white" stroke-width="1.5"/>
  <!-- Line: Australia TFR (green dashed) -->
  <polyline points="90,273 129,265 167,266 206,258 244,254 283,247 321,206 360,176 398,216 437,221 475,223 514,233 552,243 591,250 629,259 668,269 706,270 745,270 783,297 822,323 860,283 899,307 937,350 976,356" stroke="#16a34a" stroke-width="2" stroke-dasharray="7,4" fill="none" stroke-linejoin="round" clip-path="url(#c2-clip)"/>
  <!-- Dots: TFR -->
  <circle cx="90" cy="273" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="129" cy="265" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="167" cy="266" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="206" cy="258" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="244" cy="254" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="283" cy="247" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="321" cy="206" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="360" cy="176" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="398" cy="216" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="437" cy="221" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="475" cy="223" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="514" cy="233" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="552" cy="243" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="591" cy="250" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="629" cy="259" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="668" cy="269" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="706" cy="270" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="745" cy="270" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="783" cy="297" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="822" cy="323" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="860" cy="283" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="899" cy="307" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="937" cy="350" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <circle cx="976" cy="356" r="2.5" fill="#16a34a" stroke="white" stroke-width="1.5"/>
  <!-- X-axis year labels (every 2 years, rotated 45deg) -->
  <text transform="translate(90,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2001</text>
  <text transform="translate(167,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2003</text>
  <text transform="translate(244,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2005</text>
  <text transform="translate(321,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2007</text>
  <text transform="translate(398,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2009</text>
  <text transform="translate(475,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2011</text>
  <text transform="translate(552,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2013</text>
  <text transform="translate(629,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2015</text>
  <text transform="translate(706,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2017</text>
  <text transform="translate(783,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2019</text>
  <text transform="translate(860,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2021</text>
  <text transform="translate(937,465) rotate(30)" font-size="10" font-family="system-ui,sans-serif" fill="#666">2023</text>
</svg>
  <div style="font-size:10.5px;color:#bbb;margin-top:12px;">Source: ABS Births cat. 3301.0; ABS Regional Population by Age and Sex; ABS Demographic Statistics. IWC values approximate ±50.</div>
</div>

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
