# Inner West Community Voice - Project Brief

## Vision
A grassroots community organizing platform for Inner West Sydney residents to post, upvote, and escalate local issues directly to Council. Simple, shareable, and designed to amplify community voices when thresholds are hit.

**Tagline**: "When enough of us care, Council listens."

---

## Core Value Proposition
- **Problem**: Inner West residents are fragmented (Facebook groups, emails, petitions). No unified platform to show Council real support numbers.
- **Solution**: Single source of truth for community grievances + automatic formal escalation when threshold is met.
- **Outcome**: 250+ upvotes → automated formal Council submission with verified supporter names.

---

## MVP Scope

### Frontend (Simple & Shareable)
```
Homepage:
- Big search/filter bar (by suburb, category)
- Hot issues leaderboard (upvote count, trending)
- "Post Issue" button (prominent)

Issue Feed:
- Title + description preview
- Upvote/downvote buttons
- Supporter count
- Share buttons (Twitter, Facebook, WhatsApp, copy link)
- Category badge + suburb tag

Issue Detail Page:
- Full description
- Vote count (with tracker: "250 needed to escalate")
- Comments thread
- Escalation status (if sent to Council: "✅ Sent to Inner West Council on [date]")
- Social share buttons

Post Issue Form:
- Title (max 100 chars)
- Description (max 500 chars)
- Category dropdown (Rezoning, Infrastructure, Transport, Services, Other)
- Suburb selector (Leichhardt, Marrickville, Newtown, Ultimo, Petersham, etc.)
- Anonymous toggle (default ON)

Design:
- Clean, minimal (no distractions)
- Mobile-first (most shares happen on phones)
- Fast loading
- One clear CTA per screen
```

### Backend Requirements
```
Database (Supabase):
- issues (id, title, description, category, suburb, vote_count, created_at, escalated, escalated_at)
- votes (id, issue_id, vote_type [up/down], user_session_id, created_at)
- comments (id, issue_id, commenter_name, comment_text, created_at)
- escalations (id, issue_id, sent_at, recipient_emails, supporter_count, letter_content)
- supporter_signups (id, issue_id, email, name, postcode_verified, created_at)

API Endpoints:
- GET /issues (with filters: suburb, category, sort by votes/trending)
- POST /issues (create new issue)
- POST /issues/:id/vote (upvote/downvote)
- GET /issues/:id (full details + comments)
- POST /issues/:id/comments (add comment)
- POST /issues/:id/signup (collect email + name for escalation)
- GET /issues/:id/escalation-status (check if sent, when, to who)
```

---

## Escalation Logic (Auto-Email to Council)

### Threshold
- **250 upvotes** = trigger escalation
- **One-time per issue** (don't spam Council)
- **Verify supporters**: Email + name + postcode before counting

### Escalation Email Template
```
Subject: [Community Voice] Inner West Residents - Formal Concern: [Issue Title]

Dear Inner West Council,

This letter represents verified community concerns from [X] Inner West residents 
regarding: [Issue Title]

[Issue Description]

This submission was automatically generated via the Inner West Community Voice platform
(https://iwcommunityvoice.com) on [date], following [X] verified community votes.

Supporter Names & Postcodes:
[Auto-generated list]

We respectfully request Council's formal response to this concern.

---
Inner West Community Voice
An independent community organizing platform
```

### Council Contacts (Hardcoded)
```
Inner West Council:
- planning@innerwestcouncil.nsw.gov.au
- customer.service@innerwestcouncil.nsw.gov.au

Relevant Councilors (seeded as BCC):
- [to be populated with real contact list]
```

---

## Launch Issues (Ready to Seed)

### Issue #1: Parramatta Road Corridor Rezoning
**Category**: Rezoning  
**Suburb**: Leichhardt / Marrickville  
**Description**:
"The proposed State-Led Rezoning of Parramatta Road threatens community character and infrastructure capacity. Marrickville and Leichhardt are already at TOD density limits. This rezoning ignores Ministerial Direction 1.5(e) (infrastructure adequacy requirement) and will strain existing water, transport, and school systems. We call for Council to reject this proposal."

---

### Issue #2: Marrickville Train Station Flooding & Accessibility
**Category**: Infrastructure  
**Suburb**: Marrickville  
**Description**:
"Marrickville train station floods regularly in heavy rain, creating dangerous conditions for commuters. Accessibility is poor for elderly and disability users. Stairs are narrow, no elevator, and platform is slippery. We demand TfNSW invest in drainage and accessibility upgrades."

---

### Issue #3: Newtown Noise Complaints - Late Night Venues
**Category**: Services  
**Suburb**: Newtown  
**Description**:
"24-hour bars and venues in Newtown are causing persistent noise issues for nearby residents, especially 2am-6am. Current noise monitoring is inadequate. We need stricter licensing conditions and enforcement from Council."

---

### Issue #4: Pothole Crisis - Lilyfield Road
**Category**: Infrastructure  
**Suburb**: Lilyfield  
**Description**:
"Lilyfield Road has deteriorated rapidly. Multiple potholes are creating hazards for cyclists and causing vehicle damage. Council patch jobs last weeks. Demand: Full road resurfacing, not temporary fixes."

---

### Issue #5: Inner West Bike Lane Safety
**Category**: Infrastructure  
**Suburb**: Marrickville / Newtown  
**Description**:
"Bike lanes are inconsistently designed and often blocked by parked cars. No enforcement of bike lane parking. We need wider protected lanes and Council enforcement against illegal parking."

---

### Issue #6: Marrickville Public School Overcrowding
**Category**: Services  
**Suburb**: Marrickville  
**Description**:
"Marrickville Public School is at 120% capacity. Classrooms are split shifts. No relief school planned. Council planning approvals ignore school capacity — we need binding developer contributions to education."

---

### Issue #7: Leichhardt Library Parking - Impossible to Access
**Category**: Infrastructure  
**Suburb**: Leichhardt  
**Description**:
"Leichhardt Library has minimal parking. Nearby streets have limited availability. Making it inaccessible for families, elderly, and disabled residents. Demand: Council secure additional parking or funding for underground parking."

---

### Issue #8: Newtown High Street Rat Problem
**Category**: Services  
**Suburb**: Newtown  
**Description**:
"Rat population explosion in High Street. Restaurants reporting infestations despite pest control. Health hazard for community and businesses. Demand: Coordinated Council baiting program + infrastructure fixes (sealed drains, etc.)"

---

### Issue #9: Ashfield Train Line Frequency
**Category**: Transport  
**Suburb**: Ashfield  
**Description**:
"T3 (Bankstown Line) frequency has degraded—now 15-20 min wait times during off-peak. Unreliable for commuters. Demand: TfNSW increase frequency to pre-COVID levels + commit to reliability targets."

---

### Issue #10: Rozelle Cleanup - Contaminated Land
**Category**: Infrastructure  
**Suburb**: Rozelle  
**Description**:
"Rozelle has multiple contaminated former industrial sites (DCP areas). Slow cleanup = health and environmental risks. Demand: Council accelerate remediation timelines and fund community health monitoring."

---

## Implementation Checklist

### Frontend (Claude Code)
- [ ] Homepage with search + leaderboard
- [ ] Issue feed (scrollable, filterable)
- [ ] Issue detail page + comments
- [ ] Post issue form
- [ ] Vote buttons (up/down with optimistic updates)
- [ ] Share buttons (social + copy link)
- [ ] Mobile responsive
- [ ] Escalation status badge

### Backend (Supabase)
- [ ] DB schema (issues, votes, comments, escalations, signups)
- [ ] API endpoints (list, create, vote, comment, signup)
- [ ] Vote deduplication (track session ID to prevent spam voting)
- [ ] Postcode verification (basic validation format)

### Escalation Automation
- [ ] Threshold trigger (250 votes)
- [ ] Email list collection (name + email + postcode)
- [ ] Auto-generate escalation letter
- [ ] SendGrid/Resend integration
- [ ] Send to Council + mark as escalated
- [ ] Log escalation timestamp + recipient list
- [ ] Display escalation status on frontend

### Launch Prep
- [ ] Seed 10 issues (Parramatta Road + 9 others)
- [ ] Set up Council contact list
- [ ] Create email templates
- [ ] Test escalation flow end-to-end
- [ ] Deploy to Cloudflare Pages
- [ ] Test on mobile

### Day 1 Marketing (Soft Launch)
- [ ] Post Parramatta Road issue
- [ ] Share in Leichhardt Facebook groups (your network)
- [ ] Share in Inner West subreddits
- [ ] Share in neighborhood Nextdoor
- [ ] WhatsApp to your contacts
- [ ] Measure initial traffic + upvotes

---

## Tech Stack

**Frontend**: 
- React (simple, fast)
- Vite (build tooling)
- TailwindCSS (styling)
- Vercel (or Cloudflare Pages for hosting)

**Backend**:
- Supabase (PostgreSQL + auto APIs)
- SendGrid or Resend (email sending)
- Edge Functions (threshold monitoring + auto-escalation)

**Deployment**:
- Cloudflare Pages (frontend)
- Supabase (backend/database)
- SendGrid (email)

---

## Key Principles

1. **Simple**: One clear action per screen (upvote, post, share, escalate)
2. **Fast**: Mobile-first, minimal JS, instant feedback
3. **Trustworthy**: Verified emails + postcode = Council takes it seriously
4. **Transparent**: Show escalation status publicly + email recipients
5. **Shareable**: 1-click social share, trending issues visible
6. **Anonymous**: Default anonymous posting (lower friction)
7. **Scalable**: Structure works for any council area later

---

## Success Metrics (First 2 Weeks)

- Parramatta Road issue hits 250+ upvotes (triggers Council email)
- 500+ unique visitors
- 2+ issues auto-escalate to Council
- 50+ comments/engagement
- Shared in 20+ community groups
- Local media mentions

---

## Post-Launch (Phase 2)

- Add analytics dashboard (trending issues, suburb heatmaps)
- Council response tracking (manual scrape + display)
- Email notifications (supporters get update when Council responds)
- Expand to other Inner West suburbs
- White-label for other councils (Marrickville standalone, etc.)

---

## Legal/Safety Notes

- **Terms of Service**: Users agree to post truthfully. False info can be reported + removed.
- **Defamation**: Require name verification for escalation. Add disclaimer to all escalation emails.
- **Data**: Only store what's needed. Delete old anonymous posts after 6 months (unless escalated).
- **Privacy**: No selling emails. Clear privacy policy.

---

## Questions Answered (Project Setup)

1. **Build scaffold now?** ✅ Yes—MVP frontend + Supabase schema
2. **Signature verification?** ✅ Yes—email + name + postcode before escalation counts
3. **Launch angle?** ✅ Start with Parramatta Road + 9 ready-to-go issues
4. **Verify escalation?** ✅ Verified supporters only (email + postcode)

---

## Next Steps

1. Create Supabase project + populate DB schema
2. Build React frontend in Claude Code
3. Integrate Supabase + SendGrid
4. Test full escalation flow (mock 250 votes → email sent)
5. Seed 10 launch issues
6. Deploy to Cloudflare Pages
7. Soft launch to Leichhardt/Inner West groups
8. Monitor + iterate

**Owner**: Ben  
**Launch Target**: End of week  
**Maintenance**: Low (mostly moderation + monitoring escalations)

---

Good luck! This is genuinely a tool your community needs.
