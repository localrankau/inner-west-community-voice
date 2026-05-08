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
  'Inner West births have fallen 41% from their peak — and 21% since 2001, steeper than the national trend. As the suburb''s population grows, its children are disappearing. The data tells a story that the housing debate isn''t.',
  $POST_CONTENT$<style>
/* ── Children exodus post ── */
@keyframes ce-grow { from { width: 0 } to { width: var(--w, 0%) } }
.ce-bar { width: 0; animation: ce-grow 1.2s cubic-bezier(0.22,1,0.36,1) forwards; }
@media (max-width:600px) {
  .ce-stats { grid-template-columns: repeat(2,1fr) !important; }
}
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

<p>From a peak of around 3,150 births in 2008–10, the Inner West recorded just 1,850 in 2024 — a 41% fall. The number of children aged 0–14 living in the area has dropped by nearly 5,000 since its 2018 peak. This is happening while the council's total population has continued to grow. Children aren't just declining in absolute terms. They're becoming a shrinking fraction of a growing suburb.</p>

<!-- ══ SECTION: DENSITY TRAP ══ -->
<h2>The density trap</h2>

<p>Across all 30 Greater Sydney councils, one pattern holds with remarkable consistency: the denser the suburb, the fewer children.</p>

<!-- CHART 1: Density vs children — CSS horizontal bars -->
<div style="background:#f8f7f4;border:1px solid #e4e1db;border-left:4px solid #1e3a8a;border-radius:0 10px 10px 0;padding:24px 22px;margin:28px 0;">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1e3a8a;margin-bottom:6px;">ABS 2021 Census · Selected Sydney LGAs</div>
  <div style="font-family:'Fraunces',Georgia,serif;font-size:17px;font-weight:700;color:#1a1a1a;margin:0 0 18px;letter-spacing:-0.01em;line-height:1.3;">Population density vs share of residents aged 0–14</div>

  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:12.5px;color:#333;">Camden <span style="color:#888;font-size:11px;">700 /km²</span></span>
      <span style="font-size:13px;font-weight:700;color:#6d28d9;">25.3%</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:17px;overflow:hidden;">
      <div class="ce-bar" style="--w:97.3%;height:100%;background:#6d28d9;border-radius:4px;animation-delay:0.05s;"></div>
    </div>
  </div>

  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:12.5px;color:#333;">Blacktown <span style="color:#888;font-size:11px;">1,837 /km²</span></span>
      <span style="font-size:13px;font-weight:700;color:#6d28d9;">22.7%</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:17px;overflow:hidden;">
      <div class="ce-bar" style="--w:87.3%;height:100%;background:#7c3aed;border-radius:4px;animation-delay:0.12s;"></div>
    </div>
  </div>

  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:12.5px;color:#777;font-style:italic;">Greater Sydney average <span style="color:#aaa;font-size:11px;">~450 /km²</span></span>
      <span style="font-size:13px;font-weight:700;color:#6b7280;">18.5%</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:17px;overflow:hidden;">
      <div class="ce-bar" style="--w:71.2%;height:100%;background:#9ca3af;border-radius:4px;animation-delay:0.19s;"></div>
    </div>
  </div>

  <div style="margin-bottom:11px;background:rgba(239,68,68,0.06);border-radius:6px;padding:7px 8px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:12.5px;color:#b91c1c;font-weight:700;">★ Inner West <span style="color:#ef4444;font-size:11px;font-weight:400;">5,423 /km²</span></span>
      <span style="font-size:13px;font-weight:700;color:#b91c1c;">14.6%</span>
    </div>
    <div style="background:#fecaca;border-radius:4px;height:17px;overflow:hidden;">
      <div class="ce-bar" style="--w:56.2%;height:100%;background:#dc2626;border-radius:4px;animation-delay:0.26s;"></div>
    </div>
  </div>

  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:12.5px;color:#333;">North Sydney <span style="color:#888;font-size:11px;">6,151 /km²</span></span>
      <span style="font-size:13px;font-weight:700;color:#1e3a8a;">12.7%</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:17px;overflow:hidden;">
      <div class="ce-bar" style="--w:48.8%;height:100%;background:#1e3a8a;border-radius:4px;animation-delay:0.33s;"></div>
    </div>
  </div>

  <div style="margin-bottom:4px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
      <span style="font-size:12.5px;color:#333;">City of Sydney <span style="color:#888;font-size:11px;">8,893 /km²</span></span>
      <span style="font-size:13px;font-weight:700;color:#1e40af;">7.6%</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:17px;overflow:hidden;">
      <div class="ce-bar" style="--w:29.2%;height:100%;background:#1d4ed8;border-radius:4px;animation-delay:0.40s;"></div>
    </div>
  </div>

  <div style="font-size:10.5px;color:#bbb;margin-top:14px;">Source: ABS 2021 Census QuickStats by LGA. Bar length = % residents aged 0–14. Full 30-LGA dataset available in IW Pulse research charts.</div>
</div>

<p>Camden, at 700 people per km², has 25.3% of residents under 14. The City of Sydney — the densest council in Greater Sydney at nearly 9,000 per km² — has just 7.6%. The Inner West, at 5,423 per km², sits at 14.6%: well below the Greater Sydney average of 18.5%.</p>

<p>This is correlation, not causation. Dense suburbs don't drive families away directly. But the correlation reflects two consistent pressures: affordability and housing type. As density increases, so do prices — and families on tight budgets are priced out first. And as density increases, the housing mix shifts steadily toward the smaller, investor-targeted apartments that don't suit a family with school-age children.</p>

<!-- ══ SECTION: BIRTHS COLLAPSE ══ -->
<h2>The births collapse — and the national comparison</h2>

<!-- CHART A: SVG indexed births vs Australia TFR -->
<div style="background:#f8f7f4;border:1px solid #e4e1db;border-left:4px solid #ea580c;border-radius:0 10px 10px 0;padding:24px 22px 16px;margin:28px 0;">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#ea580c;margin-bottom:6px;">ABS Births cat. 3301.0 · 2001–2024 · Indexed (2001 = 100)</div>
  <div style="font-family:'Fraunces',Georgia,serif;font-size:17px;font-weight:700;color:#1a1a1a;margin:0 0 4px;letter-spacing:-0.01em;line-height:1.3;">IWC annual births vs Australia TFR — who's falling faster?</div>
  <div style="font-size:11.5px;color:#888;margin-bottom:16px;">Both series indexed to 100 in 2001. A value of 80 = 20% below the 2001 level.</div>

  <svg viewBox="0 0 660 240" style="width:100%;max-width:100%;display:block;overflow:visible;" aria-label="Indexed births comparison: IWC vs Australia TFR 2001-2024">
    <!-- Baby Bonus shaded band (2004=x124 to 2014=x372) -->
    <rect x="124" y="20" width="248" height="175" fill="rgba(253,224,71,0.2)" stroke="rgba(202,138,4,0.35)" stroke-width="1"/>
    <text x="248" y="35" text-anchor="middle" font-size="9" fill="#92400e" font-weight="700">Baby Bonus 2004–2014</text>

    <!-- Horizontal gridlines -->
    <line x1="50" y1="78" x2="620" y2="78" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4,3"/>
    <line x1="50" y1="125" x2="620" y2="125" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="5,3"/>
    <line x1="50" y1="172" x2="620" y2="172" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4,3"/>

    <!-- Y-axis labels -->
    <text x="44" y="81" text-anchor="end" font-size="9" fill="#9ca3af">120</text>
    <text x="44" y="128" text-anchor="end" font-size="9" fill="#6b7280" font-weight="600">100</text>
    <text x="44" y="175" text-anchor="end" font-size="9" fill="#9ca3af">80</text>

    <!-- Shaded area under IWC births line -->
    <polygon
      points="50,125 75,122 100,120 124,112 149,95 174,88 199,63 223,46 248,56 273,46 298,60 322,72 347,63 372,112 397,90 421,111 446,114 471,95 496,140 520,150 545,122 570,160 595,174 620,175 620,195 50,195"
      fill="rgba(234,88,12,0.08)"/>

    <!-- Australia TFR line (green dashed) -->
    <polyline
      points="50,125 75,122 100,122 124,119 149,117 174,115 199,98 223,86 248,102 273,104 298,105 322,109 347,113 372,116 397,119 421,123 446,123 471,123 496,135 520,145 545,129 570,139 595,156 620,159"
      fill="none" stroke="#16a34a" stroke-width="2" stroke-dasharray="7,4" stroke-linejoin="round"/>

    <!-- IWC births line (orange) -->
    <polyline
      points="50,125 75,122 100,120 124,112 149,95 174,88 199,63 223,46 248,56 273,46 298,60 322,72 347,63 372,112 397,90 421,111 446,114 471,95 496,140 520,150 545,122 570,160 595,174 620,175"
      fill="none" stroke="#ea580c" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- End labels -->
    <text x="626" y="178" font-size="9.5" fill="#ea580c" font-weight="700">IWC −21%</text>
    <text x="626" y="162" font-size="9.5" fill="#16a34a" font-weight="700">Aus −14%</text>

    <!-- Year labels -->
    <text x="50"  y="212" text-anchor="middle" font-size="9" fill="#9ca3af">2001</text>
    <text x="174" y="212" text-anchor="middle" font-size="9" fill="#9ca3af">2006</text>
    <text x="298" y="212" text-anchor="middle" font-size="9" fill="#9ca3af">2011</text>
    <text x="421" y="212" text-anchor="middle" font-size="9" fill="#9ca3af">2016</text>
    <text x="545" y="212" text-anchor="middle" font-size="9" fill="#9ca3af">2021</text>
    <text x="620" y="212" text-anchor="middle" font-size="9" fill="#9ca3af">2024</text>

    <!-- Legend -->
    <line x1="50" y1="230" x2="78" y2="230" stroke="#ea580c" stroke-width="2.5"/>
    <text x="83" y="233" font-size="9.5" fill="#555">IWC annual births (indexed)</text>
    <line x1="240" y1="230" x2="268" y2="230" stroke="#16a34a" stroke-width="2" stroke-dasharray="6,3"/>
    <text x="273" y="233" font-size="9.5" fill="#555">Australia TFR (indexed)</text>
  </svg>

  <div style="font-size:10.5px;color:#bbb;margin-top:12px;">Source: ABS Births cat. 3301.0; ABS Demographic Statistics cat. 3101.0. IWC values approximate ±50 (read from ABS Data by Region). Both series indexed: 2001 = 100.</div>
</div>

<p>There's a visible bump in the births data between 2004 and 2014. That's the Baby Bonus era — the Howard and Rudd governments' $5,000–$7,500 payment per birth. Inner West births peaked at around 3,150 in 2008–10 before the payment was wound back from 2009 and abolished entirely in 2014. When it ended, births fell sharply, recovered briefly in 2016–18, then collapsed to a 23-year low in 2024.</p>

<p>The more revealing comparison is with Australia's national Total Fertility Rate. Index both to 2001=100 and the picture sharpens: Australia's TFR fell about 14% by 2024. The Inner West's birth count fell 21% over the same period. The Inner West isn't simply tracking the national trend. It's declining faster — and the gap has widened. That's a structural signal: families who might have children are leaving the Inner West, or being priced out before they reach that stage of life.</p>

<!-- ══ SECTION: WHAT'S BEING BUILT ══ -->
<h2>What's actually being built</h2>

<p>The standard response to this kind of data is: build more housing. Increase supply, reduce prices, make it affordable for families again. In theory, it's sound. In practice, the housing being built in the Inner West isn't what families need.</p>

<p>Nationally, 40% of housing demand is for three or more bedrooms. But new apartment supply delivers just 25% three-bedroom units. In the City of Sydney — a clear preview of the Inner West's trajectory — only 14.4% of existing housing stock is three or more bedrooms, compared to 29.7% across Greater Sydney. RMIT urban planner Liam Davies has documented why: developers building high-rise for investors focus on one and two-bedroom apartments because they yield higher returns per square metre. Three-bedroom Sydney apartments jumped 18% in price in the year to March 2024 — a market signal that demand exists but supply is not following. The market is delivering what's most profitable, not what young families actually need.</p>

<!-- ══ SECTION: YIMBY COUNTER ══ -->
<h2>The supply argument, examined</h2>

<p>Advocates of aggressive densification argue the solution is simply more supply — and that concerns about housing type or family suitability are just NIMBYism dressed in demographics. That's a serious argument. Here's a serious answer.</p>

<p>The councils delivering the most new housing in Sydney are Parramatta and Blacktown. Parramatta built 79% of its annual NSW Government housing target last financial year; Blacktown delivered 58%. Both have substantially higher child populations than the Inner West — Parramatta at 15.3%, Blacktown at 22.7%. More housing supply is being delivered <em>where children already live</em>. Less supply is being built — and more investor apartments are already concentrated — where children are disappearing. Quantity of supply matters, but type and affordability floor matter too. A suburb full of one-bedroom investor apartments doesn't attract families, regardless of how many units are built.</p>

<p>There's also an infrastructure dimension that rarely features in the supply debate. Inner West primary schools are operating close to capacity. Childcare waitlists in suburbs like Marrickville and Newtown stretch to 18 months or more. Supply cannot solve a capacity crisis in the services families depend on — and without those services, new housing doesn't translate into new families.</p>

<!-- ══ SECTION: WHAT COMES NEXT ══ -->
<h2>What comes next</h2>

<p>The 2026 census will be the first hard population count since this decline accelerated. If the trend holds, the Inner West will record a measurable fall in its child population for the first time in modern history — even as its total population continues to grow. No one voted for that outcome. Understanding what's driving it — and what combination of housing policy, infrastructure investment, and planning decisions could reverse it — is the conversation the Inner West needs to have before the next round of rezoning locks in another decade of outcomes.</p>

<p style="border-top:1px solid #e5e7eb;padding-top:18px;margin-top:28px;font-size:13px;color:#555;line-height:1.7;"><strong>IW Pulse</strong> is tracking the data behind Inner West's demographic shift. If you have access to school enrolment data, childcare waitlist figures, or ABS time-series data not referenced here, <a href="mailto:hello@iwpulse.com.au" style="color:#1e3a8a;text-decoration:underline;">get in touch</a>. All data cited in this article is publicly available from the ABS and NSW Planning Portal.</p>
$POST_CONTENT$,
  'Demographics',
  ARRAY['Inner West', 'Sydney'],
  true,
  NOW(),
  5
)
ON CONFLICT (slug) DO UPDATE SET
  title            = EXCLUDED.title,
  excerpt          = EXCLUDED.excerpt,
  content          = EXCLUDED.content,
  category         = EXCLUDED.category,
  suburbs          = EXCLUDED.suburbs,
  published        = EXCLUDED.published,
  published_at     = EXCLUDED.published_at,
  read_time_minutes = EXCLUDED.read_time_minutes;
