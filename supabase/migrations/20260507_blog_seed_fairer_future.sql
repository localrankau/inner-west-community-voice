-- Seed: Fairer Future blog post
-- Run this in Supabase SQL Editor (or via supabase db push) to publish the post.
-- Uses dollar-quoting so no HTML characters need escaping.

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
  'The Numbers Don''t Lie: Inside the Inner West''s Most Controversial Development Plan',
  'fairer-future-inner-west-development-plan',
  '3,146 submissions. 85% opposition. One vote margin. And a plan that''s still not final. A data-driven investigation into Inner West Council''s Our Fairer Future rezoning — and what residents can still do before it''s law.',
  $POST_CONTENT$<style>
/* ── Fairer Future post: animated bars + responsive grid ── */
@keyframes ff-grow { from { width: 0 } to { width: var(--w, 0%) } }
.ff-bar { width: 0; animation: ff-grow 1.15s cubic-bezier(0.22,1,0.36,1) forwards; }
@media (max-width:640px) {
  .ff-stats  { grid-template-columns: repeat(2,1fr) !important; }
  .ff-2col   { grid-template-columns: 1fr !important; }
  .ff-vote   { grid-template-columns: 1fr !important; }
}
</style>

<!-- ══ STAT STRIP ══ -->
<div class="ff-stats" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:0 0 44px;">
  <div style="background:#0B3A66;color:#fff;border-radius:10px;padding:22px 14px;text-align:center;">
    <div style="font-family:'Fraunces',Georgia,serif;font-size:40px;font-weight:700;letter-spacing:-0.04em;line-height:1;">3,146</div>
    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;opacity:0.75;margin-top:7px;">Submissions received</div>
  </div>
  <div style="background:#0B3A66;color:#fff;border-radius:10px;padding:22px 14px;text-align:center;">
    <div style="font-family:'Fraunces',Georgia,serif;font-size:40px;font-weight:700;letter-spacing:-0.04em;line-height:1;">85%</div>
    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;opacity:0.75;margin-top:7px;">Said too big</div>
  </div>
  <div style="background:#0B3A66;color:#fff;border-radius:10px;padding:22px 14px;text-align:center;">
    <div style="font-family:'Fraunces',Georgia,serif;font-size:40px;font-weight:700;letter-spacing:-0.04em;line-height:1;">8–7</div>
    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;opacity:0.75;margin-top:7px;">Vote margin</div>
  </div>
  <div style="background:#062547;color:#fff;border-radius:10px;padding:22px 14px;text-align:center;">
    <div style="font-family:'Fraunces',Georgia,serif;font-size:40px;font-weight:700;letter-spacing:-0.04em;line-height:1;">118</div>
    <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;opacity:0.75;margin-top:7px;">Had no concerns</div>
  </div>
</div>

<!-- ══ OPENING ══ -->
<p>Here is the most striking fact about Inner West Council's "Our Fairer Future" plan: the community told them, in their own consultation survey, that they didn't want it. Of 3,146 submissions received during the public exhibition period, 85 per cent of respondents said the housing uplift was too large. Eighty-four per cent wanted building heights and densities reduced. The number-one concern, raised by 1,095 people, was traffic congestion. Only 118 people — fewer than four per cent — said they had no concerns at all.</p>

<p>Despite this, on 30 September 2025, Inner West Council adopted the plan at an Extraordinary Council Meeting. The vote was 8 to 7: every Labor councillor in favour, every Greens, Liberal, and independent councillor against. A single vote decided the future shape of a local government area already ranked as the fourth most densely populated council in New South Wales.</p>

<p>The plan has been submitted to the NSW Department of Planning, Housing and Infrastructure (DPHI) for approval. As of May 2026, it has not been gazetted — meaning it is not yet law. There is still a window for the community to be heard. This article explains what the plan contains, what Council's own data says about community support, and how you can make your voice count before a final decision is made.</p>

<!-- ══ SECTION 2 ══ -->
<h2>What Is the "Fairer Future" Plan?</h2>

<p>The "Our Fairer Future" plan is Inner West Council's alternative to the NSW State Government's Transport Oriented Development (TOD) and Low &amp; Mid-Rise Housing (LMR) reforms. The State Government set housing targets for the Inner West. Council's response was not to push back on those targets but to exceed them — substantially. The plan proposes approximately 31,000 new dwellings in Phase 1 alone, more than double the State's target of roughly 15,000. An additional 8,500 dwellings are earmarked for the Bays Precinct, and a further 8,000 along the Parramatta Road Corridor were announced separately through a partnership with the State Government. Combined across all phases, the total proposed for the Inner West stands at approximately 47,500 new dwellings.</p>

<p>Context matters here. The Inner West already has the fourth-highest population density of all 125 councils in NSW. This is not a sprawling greenfield area being opened up for the first time. It is a densely built-out urban zone where every additional dwelling places pressure on roads, trains, schools, parks, and stormwater systems that are, in many cases, already operating at or beyond capacity.</p>

<p>The plan concentrates enormous density in just a few suburbs. Marrickville and Dulwich Hill make up approximately 20 per cent of the Inner West's land area but were initially allocated 38 per cent of all new housing growth. Critics have called these areas "sacrifice zones." And where the State Government's TOD framework envisaged buildings up to six storeys near train stations, Council's plan proposes towers of up to fifteen storeys in some locations.</p>

<!-- ══ SECTION 3: SURVEY DATA ══ -->
<h2>What Council's Own Survey Data Shows</h2>

<p>Between May and July 2025, Council exhibited the draft master plans and invited community feedback. They received 3,146 submissions — 1,623 through the online survey and 1,523 in written form. The results are Council's own data, published in their official engagement outcomes report. And they paint a picture of a community in deep opposition to the scale of what is being proposed.</p>

<!-- CHART 1 -->
<div style="background:#faf8f5;border:1px solid #e0dcd6;border-left:4px solid #0B3A66;border-radius:0 10px 10px 0;padding:26px 22px;margin:36px 0;">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#0B3A66;margin-bottom:8px;">Council's own survey · 3,146 submissions</div>
  <h3 style="font-family:'Fraunces',Georgia,serif;font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 20px;letter-spacing:-0.01em;line-height:1.3;">"What concerns do you have about the draft master plans?"</h3>

  <!-- Bar: Traffic -->
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Increased traffic congestion</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">1,095</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:100%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.10s;"></div>
    </div>
  </div>
  <!-- Bar: Parking -->
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Insufficient parking</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">1,053</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:96.2%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.17s;"></div>
    </div>
  </div>
  <!-- Bar: Local character -->
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Impact on local character</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">979</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:89.4%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.24s;"></div>
    </div>
  </div>
  <!-- Bar: Infrastructure -->
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Pressure on infrastructure (schools, hospitals)</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">950</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:86.8%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.31s;"></div>
    </div>
  </div>
  <!-- Bar: Too big -->
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Uplift is too big and too high</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">910</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:83.1%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.38s;"></div>
    </div>
  </div>
  <!-- Bar: Open space -->
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Lack of open space</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">826</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:75.4%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.45s;"></div>
    </div>
  </div>
  <!-- Bar: Environment -->
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Environmental impacts</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">749</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:68.4%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.52s;"></div>
    </div>
  </div>
  <!-- Bar: Property values -->
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Property values and rates</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">546</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:49.9%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.59s;"></div>
    </div>
  </div>
  <!-- Bar: Not enough (muted) -->
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#888;max-width:72%;line-height:1.3;">Uplift is not enough</span>
      <span style="font-size:13px;font-weight:700;color:#aaa;">166</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:15.2%;height:100%;background:#bbb;border-radius:4px;animation-delay:0.66s;"></div>
    </div>
  </div>
  <!-- Bar: No concerns (muted) -->
  <div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#aaa;max-width:72%;line-height:1.3;">No concerns</span>
      <span style="font-size:13px;font-weight:700;color:#ccc;">118</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:10.8%;height:100%;background:#ccc;border-radius:4px;animation-delay:0.73s;"></div>
    </div>
  </div>
</div>

<p>The data is unambiguous. Traffic congestion was the top concern (1,095 responses), followed closely by insufficient parking (1,053). Impact on local character drew 979 responses, and pressure on infrastructure like schools and hospitals drew 950. Nine hundred and ten people said the uplift was simply too big and too high. At the bottom: just 166 said the uplift was not enough, and only 118 said they had no concerns. In a survey of over three thousand submissions, fewer than four per cent were unconcerned.</p>

<p>When asked what would make the proposal better, the single most popular answer was to reduce building height and density — 923 responses. Compare that to the 182 people who wanted height and density increased, a ratio of roughly five to one.</p>

<!-- CHART 2 -->
<div style="background:#faf8f5;border:1px solid #e0dcd6;border-left:4px solid #0B3A66;border-radius:0 10px 10px 0;padding:26px 22px;margin:36px 0;">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#0B3A66;margin-bottom:8px;">5:1 ratio — residents wanted density reduced, not increased</div>
  <h3 style="font-family:'Fraunces',Georgia,serif;font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 20px;letter-spacing:-0.01em;line-height:1.3;">"What would make this proposal better?"</h3>

  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Reduced building height and density</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">923</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:100%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.10s;"></div>
    </div>
  </div>
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">More green and public spaces</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">799</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:86.6%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.17s;"></div>
    </div>
  </div>
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Additional social infrastructure</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">649</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:70.3%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.24s;"></div>
    </div>
  </div>
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Greater sustainability outcomes</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">518</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:56.1%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.31s;"></div>
    </div>
  </div>
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">More not-for-profit (affordable) housing</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">483</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:52.3%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.38s;"></div>
    </div>
  </div>
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#aaa;max-width:72%;line-height:1.3;">Increased building height and density</span>
      <span style="font-size:13px;font-weight:700;color:#bbb;">182</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:19.7%;height:100%;background:#bbb;border-radius:4px;animation-delay:0.45s;"></div>
    </div>
  </div>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#aaa;max-width:72%;line-height:1.3;">No changes required</span>
      <span style="font-size:13px;font-weight:700;color:#ccc;">110</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:11.9%;height:100%;background:#ccc;border-radius:4px;animation-delay:0.52s;"></div>
    </div>
  </div>
</div>

<p>Perhaps most telling was the question about positive outcomes. While "increased housing supply" did receive the most responses (713), the second-highest answer was "no positive outcomes" — chosen by 600 people. That is more than "boost to local economy" (417), "walkable neighbourhoods" (398), or "affordable housing" (329). When the second most common view of your plan's benefits is that it has none, that is not a mandate.</p>

<!-- CHART 3 -->
<div style="background:#faf8f5;border:1px solid #e0dcd6;border-left:4px solid #0B3A66;border-radius:0 10px 10px 0;padding:26px 22px;margin:36px 0;">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#0B3A66;margin-bottom:8px;">"No positive outcomes" was the second-highest response</div>
  <h3 style="font-family:'Fraunces',Georgia,serif;font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 20px;letter-spacing:-0.01em;line-height:1.3;">"What positive outcomes do you think the draft masterplan will bring?"</h3>

  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Increased housing supply</span>
      <span style="font-size:13px;font-weight:700;color:#2D7A4A;">713</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:100%;height:100%;background:#2D7A4A;border-radius:4px;animation-delay:0.10s;"></div>
    </div>
  </div>
  <!-- No positive outcomes — highlighted (bad signal) -->
  <div style="margin-bottom:11px;padding:8px 10px;background:rgba(123,45,74,0.06);border-radius:6px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#0B3A66;max-width:72%;line-height:1.3;font-weight:600;">No positive outcomes</span>
      <span style="font-size:13px;font-weight:700;color:#0B3A66;">600</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:84.2%;height:100%;background:#0B3A66;border-radius:4px;animation-delay:0.17s;"></div>
    </div>
  </div>
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">More vibrant town centres</span>
      <span style="font-size:13px;font-weight:700;color:#2D7A4A;">452</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:63.4%;height:100%;background:#2D7A4A;border-radius:4px;animation-delay:0.24s;"></div>
    </div>
  </div>
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Boost to local economy</span>
      <span style="font-size:13px;font-weight:700;color:#2D7A4A;">417</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:58.5%;height:100%;background:#2D7A4A;border-radius:4px;animation-delay:0.31s;"></div>
    </div>
  </div>
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">More walkable and connected neighbourhoods</span>
      <span style="font-size:13px;font-weight:700;color:#2D7A4A;">398</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:55.8%;height:100%;background:#2D7A4A;border-radius:4px;animation-delay:0.38s;"></div>
    </div>
  </div>
  <div style="margin-bottom:11px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">New social and recreational infrastructure</span>
      <span style="font-size:13px;font-weight:700;color:#2D7A4A;">376</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:52.7%;height:100%;background:#2D7A4A;border-radius:4px;animation-delay:0.45s;"></div>
    </div>
  </div>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
      <span style="font-size:13px;color:#2a2a2a;max-width:72%;line-height:1.3;">Increased not-for-profit (affordable) housing</span>
      <span style="font-size:13px;font-weight:700;color:#2D7A4A;">329</span>
    </div>
    <div style="background:#e8e4e0;border-radius:4px;height:20px;overflow:hidden;">
      <div class="ff-bar" style="--w:46.2%;height:100%;background:#2D7A4A;border-radius:4px;animation-delay:0.52s;"></div>
    </div>
  </div>
</div>

<!-- ══ SECTION 4: SECOND CONSULTATION ══ -->
<h2>The "Second Consultation" Problem</h2>

<p>After the plan was adopted, Council launched a second round of consultation called "Building Our Community," focused on how to allocate the approximately $500 million infrastructure contributions fund that will be generated over fifteen years of development. On the surface, this sounds like genuine engagement. In practice, the survey did not include any option to oppose the Fairer Future plan itself.</p>

<p>The "Building Our Community" survey asked residents to prioritise infrastructure spending — green space, transport links, community facilities — using button-select options and dollar-allocation sliders. It was structured entirely around the assumption that the plan would proceed. There was no mechanism to say "I don't want this plan." The question had been reframed from "do you want this?" to "what do you want with this?" — effectively silencing dissent by excluding it from the options.</p>

<p>This is a pattern. Council frames engagement as consultation but structures it in ways that preclude opposition. The community has noticed. And trust is eroding because of it.</p>

<!-- ══ SECTION 5: AFFORDABLE HOUSING ══ -->
<h2>The Affordable Housing Question</h2>

<p>One of the central justifications for the plan is the housing crisis. And it is real — Sydney has an acute affordability problem, and the Inner West is not immune. But the plan's actual delivery of affordable housing tells a different story from the marketing.</p>

<p>Council originally promised a 5 per cent affordable housing contribution. This was subsequently revised down to just 2–3 per cent — a 3 per cent contribution on private development in upzoned areas. And "affordable housing" under this plan is defined as 80 per cent of market rent. As of late 2024, the median weekly rent in the Inner West was approximately $700. Eighty per cent of that is $560 per week. That is not affordable for essential workers, young people, or anyone on a median income. It is a discount, not a solution.</p>

<p>The plan builds zero public housing directly. Council has proposed a "compact" with the NSW Government for 1,000 new public housing dwellings and claims it will deliver 350 social housing dwellings by redeveloping five Council-owned car parks. These are aspirational targets, not funded commitments. Meanwhile, critics argue that the plan will actually reduce affordability by demolishing existing low-cost housing stock — older apartment buildings, boarding houses, and shop-top housing — and replacing it with new-build apartments at market rates.</p>

<!-- ══ SECTION 6: THE VOTE ══ -->
<h2>The Vote and the Process</h2>

<p>The plan was adopted at an Extraordinary Council Meeting on 30 September 2025. The vote split precisely along party lines: eight Labor councillors in favour, and seven councillors — five Greens, one Liberal, and one independent — against. It was the narrowest possible margin.</p>

<!-- VOTE TABLE -->
<div style="background:#faf8f5;border:1px solid #e0dcd6;border-radius:10px;padding:26px 22px;margin:36px 0;">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:8px;">Extraordinary Council Meeting · 30 September 2025</div>
  <h3 style="font-family:'Fraunces',Georgia,serif;font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 20px;letter-spacing:-0.01em;">The Vote — 8 vs 7. A single-vote margin.</h3>
  <div class="ff-vote" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
    <!-- FOR -->
    <div>
      <div style="background:#c0392b;color:#fff;border-radius:8px 8px 0 0;padding:10px 14px;font-size:14px;font-weight:700;text-align:center;letter-spacing:0.02em;">FOR — 8 Labor</div>
      <div style="border:1px solid #c0392b;border-top:none;border-radius:0 0 8px 8px;padding:12px 14px;">
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #fde8e6;color:#2a2a2a;">Darcy Byrne <span style="font-size:11px;color:#888;">(Mayor)</span></div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #fde8e6;color:#2a2a2a;">Chloe Smith <span style="font-size:11px;color:#888;">(Deputy Mayor)</span></div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #fde8e6;color:#2a2a2a;">Jo Carlisle</div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #fde8e6;color:#2a2a2a;">Vicki Clay</div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #fde8e6;color:#2a2a2a;">Jessica D'Arienzo</div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #fde8e6;color:#2a2a2a;">Kerrie Fergusson</div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #fde8e6;color:#2a2a2a;">Mat Howard</div>
        <div style="font-size:13px;padding:5px 0;color:#2a2a2a;">Philippa Scott</div>
      </div>
    </div>
    <!-- AGAINST -->
    <div>
      <div style="background:#2c6e49;color:#fff;border-radius:8px 8px 0 0;padding:10px 14px;font-size:14px;font-weight:700;text-align:center;letter-spacing:0.02em;">AGAINST — 7</div>
      <div style="border:1px solid #2c6e49;border-top:none;border-radius:0 0 8px 8px;padding:12px 14px;">
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #d0e8d6;color:#2a2a2a;">Izabella Antoniou <span style="font-size:11px;color:#888;">(Greens)</span></div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #d0e8d6;color:#2a2a2a;">Liz Atkins <span style="font-size:11px;color:#888;">(Greens)</span></div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #d0e8d6;color:#2a2a2a;">Olivia Barlow <span style="font-size:11px;color:#888;">(Greens)</span></div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #d0e8d6;color:#2a2a2a;">Andrew Blake <span style="font-size:11px;color:#888;">(Greens)</span></div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #d0e8d6;color:#2a2a2a;">Ismet Tastan <span style="font-size:11px;color:#888;">(Greens)</span></div>
        <div style="font-size:13px;padding:5px 0;border-bottom:1px solid #d0e8d6;color:#2a2a2a;">Vittoria Raciti <span style="font-size:11px;color:#888;">(Liberal)</span></div>
        <div style="font-size:13px;padding:5px 0;color:#2a2a2a;">Victor Macri <span style="font-size:11px;color:#888;">(Independent)</span></div>
      </div>
    </div>
  </div>
</div>

<p>Reports indicate that Council restricted public access to the meeting, with claims that hundreds of residents were prevented from entering. The meeting reportedly began with speakers supportive of the plan — including paid ALP staffers and YIMBY advocates — before opponents were heard. A four-hour public forum at Ashfield Civic Centre the week before had drawn more than eighty speakers and dozens of protesters. Greens Councillor Izabella Antoniou stated that residents do not trust Council to deliver this uplift in density, and that more needs to be done to rebuild broken trust.</p>

<!-- ══ SECTION 7: LEICHHARDT BURDEN ══ -->
<h2>The Leichhardt Burden: How Marrickville's Density Got Dumped Next Door</h2>

<p>At the September 2025 vote, Labor Councillor Mat Howard moved an amendment to remove approximately 20 per cent of the uplift locations from Marrickville. Council framed this as "listening to community feedback." But the density was not removed — it was shifted. Approximately 2,000 dwellings were reallocated from Marrickville to the Parramatta Road Corridor — a State-led rezoning stretching from Foster Street in Leichhardt through Annandale, Petersham, Stanmore, and Camperdown to Booth Street. Of the ~8,000 corridor dwellings, Leichhardt's estimated share is approximately 5,000.</p>

<p>Labor Ward Councillor Philippa Scott, who represents Leichhardt, supported this motion — effectively voting to redirect Marrickville's rejected density onto her own constituents. The community group Leichhardt Matters claims Leichhardt is now targeted for the largest increase in housing of any suburb in NSW, with Council and State Government together setting targets of close to 10,000 new dwellings for the suburb — 4,887 under Fairer Future Stage 1, plus approximately 5,000 from the Parramatta Road Corridor.</p>

<p>Leichhardt currently has a population of around 15,000 people. An additional 10,000 dwellings could mean 20,000 or more additional residents — more than doubling the suburb's population. Leichhardt has no heavy rail and no Metro station. Its only mass transit is the Light Rail, which the community argues is simply not built for mass transport at that scale. The suburb already has the second-lowest amount of open space per person in NSW, and there is no available land to increase that. Leichhardt Matters estimates that 70 per cent of existing housing in the suburb could face demolition to achieve these targets. The plan even cancels the one small park mandated at Hay Street, Leichhardt, as part of the earlier Parramatta Road Corridor strategy.</p>

<!-- LEICHHARDT TRIPLE HIT DIAGRAM -->
<div style="background:#faf8f5;border:1px solid #e0dcd6;border-radius:10px;padding:26px 22px;margin:36px 0;">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#0B3A66;margin-bottom:8px;">~10,000 new dwellings for a suburb of 15,000 people</div>
  <h3 style="font-family:'Fraunces',Georgia,serif;font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 18px;letter-spacing:-0.01em;">Leichhardt's Triple Hit</h3>
  <div>
    <div style="background:#0B3A66;color:#fff;border-radius:8px 8px 0 0;padding:16px 18px;font-size:13px;line-height:1.5;border-bottom:2px solid rgba(255,255,255,0.25);">
      <strong style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;opacity:0.7;margin-bottom:4px;">Layer 1 — Council</strong>
      Fairer Future Stage 2 — light rail stops, Norton St upzoning
    </div>
    <div style="background:#9e3a5e;color:#fff;padding:16px 18px;font-size:13px;line-height:1.5;border-bottom:2px solid rgba(255,255,255,0.25);">
      <strong style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;opacity:0.7;margin-bottom:4px;">Layer 2 — State Government</strong>
      Parramatta Road Corridor — 8,000 dwellings corridor-wide (Leichhardt's share: ~5,000)
    </div>
    <div style="background:#c0735a;color:#fff;border-radius:0 0 8px 8px;padding:16px 18px;font-size:13px;line-height:1.5;">
      <strong style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;opacity:0.7;margin-bottom:4px;">Layer 3 — Density Transfer</strong>
      Marrickville rebalance — ~2,000 dwellings shifted here
    </div>
  </div>
  <div style="margin-top:14px;background:#1a1a1a;color:#fff;border-radius:8px;padding:14px 18px;text-align:center;font-family:'Fraunces',Georgia,serif;font-size:17px;font-weight:700;letter-spacing:-0.02em;">
    Total: ~10,000 new dwellings → could more than double Leichhardt's population
  </div>
</div>

<!-- ══ SECTION 8: SUBURB INEQUALITY ══ -->
<h2>The Suburb Inequality Problem: Why Are Some Suburbs Exempt?</h2>

<p>The Inner West LGA contains approximately 25 suburbs. But the plan targets only a handful of them for significant upzoning — primarily Marrickville, Dulwich Hill, Ashfield, Leichhardt, and parts of the Parramatta Road corridor. Meanwhile, suburbs like Haberfield, Balmain, Balmain East, and Birchgrove are largely exempt from any significant density increase.</p>

<!-- SUBURB BURDEN TABLE -->
<div class="ff-2col" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:36px 0;">
  <div>
    <div style="background:#0B3A66;color:#fff;border-radius:8px 8px 0 0;padding:12px 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">Targeted for Density</div>
    <div style="border:1px solid #0B3A66;border-top:none;border-radius:0 0 8px 8px;padding:12px 16px;">
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #f0e0e8;color:#2a2a2a;">Marrickville</div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #f0e0e8;color:#2a2a2a;">Dulwich Hill</div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #f0e0e8;color:#2a2a2a;">Ashfield</div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #f0e0e8;color:#2a2a2a;">Leichhardt</div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #f0e0e8;color:#2a2a2a;">Parramatta Rd Corridor</div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #f0e0e8;color:#2a2a2a;">Lewisham</div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #f0e0e8;color:#2a2a2a;">Petersham</div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #f0e0e8;color:#2a2a2a;">Stanmore</div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #f0e0e8;color:#2a2a2a;">Sydenham</div>
      <div style="font-size:14px;padding:5px 0;color:#2a2a2a;">Tempe</div>
    </div>
  </div>
  <div>
    <div style="background:#e8e4e0;color:#666;border-radius:8px 8px 0 0;padding:12px 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">Largely Exempt</div>
    <div style="border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px;padding:12px 16px;">
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #eee;color:#2a2a2a;">Haberfield <span style="font-size:11px;color:#999;">— State Heritage exclusion</span></div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #eee;color:#2a2a2a;">Balmain <span style="font-size:11px;color:#999;">— Heritage Conservation Area</span></div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #eee;color:#2a2a2a;">Balmain East <span style="font-size:11px;color:#999;">— Heritage Conservation Area</span></div>
      <div style="font-size:14px;padding:5px 0;border-bottom:1px solid #eee;color:#2a2a2a;">Birchgrove <span style="font-size:11px;color:#999;">— Heritage Conservation Area</span></div>
      <div style="font-size:14px;padding:5px 0;color:#2a2a2a;">Rozelle <span style="font-size:11px;color:#999;">— Limited density</span></div>
    </div>
  </div>
</div>

<p>Haberfield is explicitly excluded from upzoning under Council's own Planning Principle 10, because Council is pursuing State Heritage listing for the suburb. Heritage protection is a legitimate aim — but the practical effect is that Haberfield's wealthier homeowners are shielded from the plan while neighbouring suburbs absorb the entire burden. Balmain and Birchgrove have extensive Heritage Conservation Areas that similarly protect them from upzoning.</p>

<p>The result is a two-tier system. Suburbs with heritage protections and political influence remain low-density. Suburbs without those protections become sacrifice zones for the entire LGA's housing targets. Council claims the plan provides "a fairer and more even distribution of density" — but the data tells a different story. When Marrickville's density was scaled back, it went to Leichhardt, not to Balmain or Haberfield. If this is truly a "fairer future," the question is: fairer for whom?</p>

<!-- ══ SECTION 9: THE DOUBLE-DOWN ══ -->
<h2>The Double-Down: Council Approved the State Government to Add Even More</h2>

<p>The timeline reveals how Leichhardt was hit from multiple directions. First, the Fairer Future plan included Leichhardt in Stage 2 of master planning, with upzoning around light rail stops and Norton Street. Then, on 14 September 2025 — just two weeks before the final vote — Inner West Council announced a "partnership" with the NSW State Government (Premier Chris Minns and Planning Minister Paul Scully) to deliver up to 8,000 additional homes along the Parramatta Road Corridor, from Foster Street in Leichhardt to Booth Street in Camperdown. This is a state-led rezoning, meaning Council effectively handed control of this corridor to the State.</p>

<p>On 30 September, the 8-7 vote approved both the Fairer Future plan and the Parramatta Road partnership in the same session. The amendment to "rebalance" Marrickville then redirected approximately 2,000 dwellings into this very corridor. Between February and March 2026, Council ran an "early engagement" consultation on the Parramatta Road corridor, again structured to collect preferences on amenities rather than allow opposition to the rezoning itself. A state-drafted plan is expected in late 2026.</p>

<p>The net effect: Leichhardt is being hit by both Council's Fairer Future plan and the State Government's Parramatta Road rezoning — a double layer of density that no other suburb in the Inner West faces. Council approved the Fairer Future, then effectively invited the State to pile on more.</p>

<!-- ══ SECTION 10: COMMUNITY ACTION ══ -->
<h2>What the Community Is Saying and Doing</h2>

<p>Opposition is grassroots, non-partisan, and growing. Several community groups have formed to challenge the plan or advocate for their suburbs.</p>

<p><a href="https://leichhardtmatters.net" target="_blank" rel="noopener noreferrer" style="color:#0B3A66;font-weight:600;text-decoration:none;border-bottom:2px solid #0B3A66;"><strong>Leichhardt Matters</strong></a> is a non-partisan community group focused on excessive development in Leichhardt. They argue that Leichhardt is being targeted for the biggest housing increase of any suburb in NSW, that 70 per cent of existing housing could face demolition, that the Light Rail is inadequate for mass transport at this scale, and that the suburb has the second-lowest open space per person in the state.</p>

<p><a href="https://savemarrickville.com.au" target="_blank" rel="noopener noreferrer" style="color:#0B3A66;font-weight:600;text-decoration:none;border-bottom:2px solid #0B3A66;"><strong>Save Marrickville</strong></a> has campaigned for years against Marrickville being treated as a sacrifice zone. Their advocacy contributed to the 20 per cent reduction in Marrickville's uplift — though, as we've seen, the density was shifted rather than removed.</p>

<p>The <strong>Better Future Coalition</strong>, which includes community activists, NSW Socialists, and Action for Public Housing, organised a 200-person protest at the 22 September 2025 council meeting and has held ongoing rallies. West Leichhardt residents have prior experience with Council overriding community submissions — during the Phase I Parramatta Road Corridor strategy, Council proposed demolishing 60 homes across four side streets. Residents warned about biodiversity, flooding, and infrastructure. Sydney Water and the SES confirmed those warnings. Council sent the unamended plan to the Department of Planning anyway.</p>

<!-- ══ SECTION 11: WHAT HAPPENS NEXT ══ -->
<h2>What Happens Next — And Why Your Voice Still Matters</h2>

<p>The plan has been submitted to the NSW Department of Planning, Housing and Infrastructure for review and approval. As of May 2026, it has not been gazetted — it is not yet law. Until DPHI approves the plan, it cannot be relied upon for any property or development matters. This is the window.</p>

<p>DPHI can modify, reject, or require further community consultation before approving the plan. But they need to see evidence of genuine community concern — not anonymous social media posts, but verified residents with real names and real postcodes. That is what carries weight with state planners.</p>

<blockquote>The plan is with the Department. It has not been approved. There is still time to be counted.</blockquote>

<!-- ══ CTA BOX ══ -->
<div style="background:linear-gradient(135deg,#0B3A66 0%,#062547 100%);border-radius:12px;padding:36px 32px;margin:44px 0 28px;text-align:center;color:#fff;">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;opacity:0.7;margin-bottom:14px;">Take action</div>
  <h3 style="font-family:'Fraunces',Georgia,serif;font-size:26px;font-weight:600;margin:0 0 12px;letter-spacing:-0.02em;line-height:1.2;">Make your voice count</h3>
  <p style="font-size:16px;line-height:1.65;margin:0 0 8px;opacity:0.9;">We need <strong>25 verified Inner West residents</strong> to register as supporters on the Parramatta Road Corridor issue. Once the threshold is met, a formal submission — with all verified names and postcodes — is automatically sent to Council's planning department.</p>
  <p style="font-size:14px;line-height:1.55;margin:0 0 26px;opacity:0.7;">This is not a petition. It's a verified community submission that lands directly on the desks of the people making decisions.</p>
  <a href="https://www.iwpulse.com" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#fff;color:#0B3A66;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:-0.01em;box-shadow:0 4px 14px rgba(0,0,0,0.2);">View the issue on IW Pulse →</a>
</div>

<!-- ══ SOURCES ══ -->
<hr>
<p style="font-size:13px;color:#aaa;line-height:1.7;"><em>Sources: Inner West Council official engagement outcomes report (3,146 submissions); Your Say Inner West exhibition page; Council Extraordinary Meeting minutes, 30 September 2025; Council media releases; CityHub, Central News, and Green Left reporting (2025); Save Marrickville (savemarrickville.com.au); Leichhardt Matters (leichhardtmatters.net); Your Say Inner West Parramatta Road Corridor engagement page. All survey data referenced in this article is drawn from Council's own published results.</em></p>
<p style="font-size:12px;color:#ccc;margin-top:8px;">Published on iwpulse.com · May 2026 · Independent, non-partisan community journalism</p>$POST_CONTENT$,
  'Rezoning & Development',
  ARRAY['Leichhardt', 'Marrickville', 'Dulwich Hill', 'Ashfield', 'Petersham', 'Stanmore', 'Sydenham', 'Tempe', 'Lewisham'],
  TRUE,
  '2026-05-07T10:00:00+10:00',
  12
)
ON CONFLICT (slug) DO UPDATE SET
  title             = EXCLUDED.title,
  excerpt           = EXCLUDED.excerpt,
  content           = EXCLUDED.content,
  category          = EXCLUDED.category,
  suburbs           = EXCLUDED.suburbs,
  published         = EXCLUDED.published,
  published_at      = EXCLUDED.published_at,
  read_time_minutes = EXCLUDED.read_time_minutes,
  updated_at        = NOW();
