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

<!-- CHART 1: Density vs children - Chart.js scatter -->
<div style="background:#f8f7f4;border:1px solid #e4e1db;border-left:4px solid #1e3a8a;border-radius:0 10px 10px 0;padding:24px 22px;margin:28px 0;">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1e3a8a;margin-bottom:6px;">ABS 2021 Census · 30 Sydney LGAs</div>
  <div style="font-family:'Fraunces',Georgia,serif;font-size:17px;font-weight:700;color:#1a1a1a;margin:0 0 4px;letter-spacing:-0.01em;line-height:1.3;">Population density vs share of residents aged 0–14</div>
  <div style="font-size:11.5px;color:#888;margin-bottom:14px;">Each dot is a Sydney LGA. Hover for detail. Inner West highlighted in red.</div>
  <div style="position:relative;height:420px;">
    <canvas id="iwcChart1Blog"></canvas>
  </div>
  <div id="iwcLegend1Blog" style="display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:12px;"></div>
  <div style="font-size:10.5px;color:#bbb;margin-top:12px;">Source: ABS 2021 Census QuickStats; ABS Regional Population 2023-24.</div>
</div>
<script>
(function() {
  if (typeof Chart === 'undefined') return;
  var ex1 = Chart.getChart('iwcChart1Blog'); if (ex1) ex1.destroy();
  var c1All = [
    { label: 'Inner West',           x: 5423, y: 14.6, cat: 0 },
    { label: 'City of Sydney',       x: 8893, y: 7.6,  cat: 1 },
    { label: 'Waverley',             x: 7424, y: 15.7, cat: 1 },
    { label: 'Woollahra',            x: 4520, y: 14.9, cat: 1 },
    { label: 'Randwick',             x: 3907, y: 15.4, cat: 1 },
    { label: 'Bayside',              x: 3727, y: 15.1, cat: 1 },
    { label: 'Burwood',              x: 5258, y: 12.0, cat: 2 },
    { label: 'Canada Bay',           x: 4401, y: 15.8, cat: 2 },
    { label: 'Strathfield',          x: 2879, y: 12.0, cat: 2 },
    { label: 'North Sydney',         x: 6151, y: 12.7, cat: 3 },
    { label: 'Mosman',               x: 3164, y: 16.3, cat: 3 },
    { label: 'Lane Cove',            x: 3277, y: 18.2, cat: 3 },
    { label: 'Willoughby',           x: 3231, y: 18.9, cat: 3 },
    { label: 'Hunters Hill',         x: 2460, y: 17.1, cat: 3 },
    { label: 'Ku-ring-gai',          x: 1503, y: 19.5, cat: 4 },
    { label: 'Hornsby',              x: 340,  y: 19.0, cat: 4 },
    { label: 'Northern Beaches',     x: 1065, y: 18.5, cat: 4 },
    { label: 'Parramatta',           x: 3280, y: 15.3, cat: 5 },
    { label: 'Canterbury-Bankstown', x: 4810, y: 19.8, cat: 5 },
    { label: 'Cumberland',           x: 3200, y: 19.9, cat: 5 },
    { label: 'Georges River',        x: 3864, y: 15.9, cat: 5 },
    { label: 'Ryde',                 x: 2837, y: 16.2, cat: 5 },
    { label: 'Fairfield',            x: 2091, y: 17.9, cat: 5 },
    { label: 'Blacktown',            x: 1837, y: 22.7, cat: 6 },
    { label: 'Liverpool',            x: 834,  y: 22.1, cat: 6 },
    { label: 'Campbelltown',         x: 605,  y: 22.0, cat: 6 },
    { label: 'Camden',               x: 700,  y: 25.3, cat: 6 },
    { label: 'Penrith',              x: 565,  y: 21.2, cat: 6 },
    { label: 'The Hills',            x: 558,  y: 21.2, cat: 6 },
    { label: 'Sutherland',           x: 715,  y: 18.5, cat: 7 },
    { label: 'Central Coast',        x: 211,  y: 18.0, cat: 8 }
  ];
  var regionMeta = [
    { name: 'Inner West',            color: 'rgba(220,38,38,0.92)',   border: 'rgba(185,28,28,1)',    size: 11 },
    { name: 'Eastern Sydney',        color: 'rgba(249,115,22,0.85)',  border: 'rgba(234,88,12,1)',    size: 8  },
    { name: 'Inner suburbs',         color: 'rgba(236,72,153,0.8)',   border: 'rgba(219,39,119,1)',   size: 8  },
    { name: 'Lower North Shore',     color: 'rgba(20,184,166,0.85)',  border: 'rgba(13,148,136,1)',   size: 8  },
    { name: 'Upper North / Beaches', color: 'rgba(59,130,246,0.85)', border: 'rgba(37,99,235,1)',    size: 8  },
    { name: 'Western Sydney',        color: 'rgba(22,163,74,0.85)',   border: 'rgba(15,118,55,1)',    size: 8  },
    { name: 'Outer / Growth SW',     color: 'rgba(139,92,246,0.85)', border: 'rgba(109,40,217,1)',   size: 8  },
    { name: 'Sutherland',            color: 'rgba(234,179,8,0.85)',   border: 'rgba(202,138,4,1)',    size: 8  },
    { name: 'Central Coast',         color: 'rgba(156,163,175,0.85)',border: 'rgba(107,114,128,1)',   size: 8  }
  ];
  var datasets = regionMeta.map(function(rm, catIdx) {
    return {
      label: rm.name,
      data: c1All.filter(function(d) { return d.cat === catIdx; }).map(function(d) { return { x: d.x, y: d.y, label: d.label }; }),
      backgroundColor: rm.color, borderColor: rm.border,
      borderWidth: catIdx === 0 ? 2.5 : 1.5,
      pointRadius: rm.size, pointHoverRadius: rm.size + 4
    };
  });
  var ctx1 = document.getElementById('iwcChart1Blog');
  new Chart(ctx1, {
    type: 'scatter',
    data: { datasets: datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(c) {
              var d = c.raw;
              return [' ' + d.label, ' Density: ' + d.x.toLocaleString() + ' /km²', ' Children 0–14: ' + d.y + '%', ' Region: ' + regionMeta[c.datasetIndex].name];
            },
            title: function() { return ''; }
          },
          backgroundColor: 'rgba(20,20,40,0.92)', padding: 12, bodyFont: { size: 12 }
        },
        annotation: {
          annotations: {
            iwcLabel: { type: 'label', xValue: 5423, yValue: 14.6, xAdjust: 10, yAdjust: -22, content: ['★ Inner West', '5,423/km² | 14.6%'], color: '#b91c1c', font: { size: 10.5, weight: 'bold' }, textAlign: 'left' },
            trendLine: { type: 'line', borderColor: 'rgba(150,150,150,0.3)', borderWidth: 1.5, borderDash: [6,4], xMin: 0, xMax: 9500, yMin: 23.5, yMax: 6.5, label: { content: 'More density → fewer children', display: true, position: 'end', color: '#aaa', font: { size: 9 }, yAdjust: -12 } }
          }
        }
      },
      scales: {
        x: { title: { display: true, text: 'Population Density (persons per km²)', color: '#555', font: { size: 12 } }, min: 0, max: 10000, ticks: { callback: function(v) { return v.toLocaleString(); }, color: '#666', font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } },
        y: { title: { display: true, text: '% Population Aged 0–14 Years', color: '#555', font: { size: 12 } }, min: 4, max: 28, ticks: { callback: function(v) { return v + '%'; }, color: '#666', font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
      }
    }
  });
  var legendEl = document.getElementById('iwcLegend1Blog');
  if (legendEl) {
    legendEl.innerHTML = '';
    regionMeta.forEach(function(rm) {
      var item = document.createElement('div');
      item.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:12px;color:#444;';
      item.innerHTML = '<div style="width:10px;height:10px;border-radius:50%;background:' + rm.color + ';border:1.5px solid ' + rm.border + ';flex-shrink:0;"></div>' + rm.name;
      legendEl.appendChild(item);
    });
  }
})();
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
<script>
(function() {
  if (typeof Chart === 'undefined') return;
  var exA = Chart.getChart('iwcChartABlog'); if (exA) exA.destroy();
  var years = ['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'];
  var childrenData = [23300,23100,23100,23100,23100,23400,24000,25000,26500,26700,27100,28500,29200,29500,29200,29400,29500,29800,29000,28000,26700,25100,24900,25600];
  var birthsData   = [2350,2380,2400,2480,2650,2720,2980,3150,3050,3150,3000,2880,2970,2480,2700,2490,2460,2650,2200,2100,2380,2000,1860,1850];
  var australiaTFR = [1.730,1.754,1.752,1.777,1.789,1.808,1.933,2.023,1.903,1.886,1.882,1.850,1.820,1.800,1.773,1.742,1.741,1.740,1.660,1.580,1.700,1.630,1.500,1.481];
  var ctxA = document.getElementById('iwcChartABlog');
  new Chart(ctxA, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        { label: 'IWC – Children 0–14', data: childrenData, yAxisID: 'yLeft', borderColor: '#1e3a8a', backgroundColor: 'rgba(30,58,138,0.08)', borderWidth: 2.5, fill: true, tension: 0.3, pointRadius: 3, pointHoverRadius: 7, pointBackgroundColor: '#1e3a8a' },
        { label: 'IWC – Annual Births',       data: birthsData,   yAxisID: 'yRight', borderColor: '#ea580c', backgroundColor: 'rgba(234,88,12,0.07)',  borderWidth: 2.5, fill: true, tension: 0.3, pointRadius: 3, pointHoverRadius: 7, pointBackgroundColor: '#ea580c' },
        { label: 'Australia TFR (national)',       data: australiaTFR, yAxisID: 'yTFR',  borderColor: '#16a34a', backgroundColor: 'transparent', borderWidth: 2, borderDash: [7,4], fill: false, tension: 0.3, pointRadius: 2.5, pointHoverRadius: 7, pointBackgroundColor: '#16a34a' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', labels: { font: { size: 12 }, color: '#333', padding: 16 } },
        tooltip: {
          backgroundColor: 'rgba(20,20,40,0.92)', padding: 12,
          callbacks: {
            label: function(c) {
              if (c.datasetIndex === 0) return ' IWC Children 0–14: ' + c.parsed.y.toLocaleString();
              if (c.datasetIndex === 1) return ' IWC Births: ' + c.parsed.y.toLocaleString();
              return ' Australia TFR: ' + c.parsed.y.toFixed(3);
            }
          }
        },
        annotation: {
          annotations: {
            babyBonus: { type: 'box', xMin: '2004', xMax: '2014', backgroundColor: 'rgba(254,240,138,0.18)', borderColor: 'rgba(234,179,8,0.4)', borderWidth: 1 },
            babyBonusLabel: { type: 'label', xValue: '2009', yScaleID: 'yLeft', yValue: 31600, content: ['Baby Bonus','2004–2014'], color: '#92400e', font: { size: 9, weight: 'bold' }, textAlign: 'center' }
          }
        }
      },
      scales: {
        x: { ticks: { color: '#666', font: { size: 10 }, maxRotation: 45 }, grid: { color: 'rgba(0,0,0,0.04)' } },
        yLeft:  { type: 'linear', position: 'left',  title: { display: true, text: 'IWC Children aged 0–14', color: '#1e3a8a', font: { size: 11 } }, min: 20000, max: 32500, ticks: { color: '#1e3a8a', callback: function(v) { return v.toLocaleString(); }, font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } },
        yRight: { type: 'linear', position: 'right', title: { display: true, text: 'IWC Annual Births', color: '#ea580c', font: { size: 11 } }, min: 1200, max: 3600, ticks: { color: '#ea580c', callback: function(v) { return v.toLocaleString(); }, font: { size: 10 } }, grid: { display: false } },
        yTFR:   { type: 'linear', position: 'right', offset: true, title: { display: true, text: 'Australia TFR', color: '#16a34a', font: { size: 11 } }, min: 1.2, max: 2.4, ticks: { color: '#16a34a', callback: function(v) { return v.toFixed(1); }, font: { size: 10 }, stepSize: 0.2 }, grid: { display: false } }
      }
    }
  });
})();
</script>

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
