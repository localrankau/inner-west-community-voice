# Inner West Community Voice - Project Documentation

This folder contains everything you need to build and launch the platform.

## Files Included

1. **IWC_COMMUNITY_VOICE_BRIEF.md**
   - Full project vision, scope, and requirements
   - 10 seeded launch issues (ready to use)
   - Technical stack overview
   - Success metrics & timeline
   - **Start here** for context

2. **SUPABASE_SCHEMA.sql**
   - Database schema (copy-paste into Supabase SQL editor)
   - All tables: issues, votes, comments, escalations, supporter_signups
   - Pre-seeded with 10 launch issues
   - Auto-triggers for vote counting

3. **FRONTEND_BUILD_GUIDE.md**
   - Component structure & layout
   - UX patterns for voting, sharing, forms
   - Mobile-first design specs
   - API integration notes
   - **Paste this into Claude Code brief**

4. **SENDGRID_ESCALATION_GUIDE.md**
   - Edge Function code (TypeScript/Node.js)
   - How to trigger email escalation at 250 votes
   - Email template customization
   - Testing & error handling
   - Council contact list

## Quick Start

### Step 1: Set up Supabase
1. Create account at https://supabase.com
2. Create new project
3. Copy SUPABASE_SCHEMA.sql
4. Paste into SQL editor → Run
5. Get API keys (Settings → API)
6. Store in safe place

### Step 2: Set up SendGrid
1. Create account at https://sendgrid.com
2. Verify sender email
3. Get API key
4. Add to Supabase → Settings → Environment variables (`SENDGRID_API_KEY`)

### Step 3: Build Frontend
1. Brief Claude Code with FRONTEND_BUILD_GUIDE.md content
2. Ask to build React app with:
   - Supabase integration
   - Issue feed + voting
   - Detail page + comments
   - Post issue form
   - Share buttons
3. Deploy to Cloudflare Pages

### Step 4: Deploy Edge Function
1. In Supabase → Edge Functions → Create new
2. Paste code from SENDGRID_ESCALATION_GUIDE.md
3. Deploy
4. Test with mock votes

### Step 5: Launch
1. Seed issues via Supabase admin (10 ready to go)
2. Test voting flow (vote until 250)
3. Verify escalation email sent to yourself first
4. Update Council email addresses
5. Soft launch to Leichhardt Facebook groups

## Key Configuration

**Threshold for escalation**: 250 verified votes (edit in SUPABASE_SCHEMA.sql or edge function)

**Council recipients**: Update in SENDGRID_ESCALATION_GUIDE.md

**Supported suburbs**: Leichhardt, Marrickville, Newtown, Ultimo, Petersham, Lilyfield, Ashfield, Rozelle, Balmain

**Categories**: Rezoning, Infrastructure, Transport, Services, Other

## Tech Stack

- **Frontend**: React + Vite (Claude Code builds this)
- **Hosting**: Cloudflare Pages
- **Backend**: Supabase (PostgreSQL)
- **Email**: SendGrid (automated escalation)
- **Auth**: Anonymous + email verification for escalation

## Timeline

- Setup Supabase: 30 min
- Setup SendGrid: 15 min
- Build frontend (Claude Code): 2-3 hours
- Test escalation flow: 30 min
- Deploy: 15 min
- **Total**: ~4 hours

## Launch Checklist

- [ ] Supabase project created & schema loaded
- [ ] SendGrid account set up with API key
- [ ] Frontend scaffolded in Claude Code
- [ ] Voting works without errors
- [ ] Comments load/post correctly
- [ ] Share buttons functional
- [ ] Post issue form works
- [ ] Test vote escalation (250 votes → email sent)
- [ ] Verify email arrives in Council inbox
- [ ] Frontend deployed to Cloudflare Pages
- [ ] 10 seed issues visible on live site
- [ ] Share link in Leichhardt/Inner West Facebook groups

## Success Metrics (First 2 Weeks)

- 500+ unique visitors
- Parramatta Road issue hits 250+ votes (auto-escalates)
- 2+ issues escalated to Council
- 50+ comments/engagement
- Shared 20+ times in community groups
- 1-2 local news mentions

## Questions?

- Read the individual guides for detailed explanations
- Test each component before deploying live
- Monitor Supabase logs for errors
- Track escalation status in database

Good luck! This is a tool your community actually needs.

---

**Owner**: Ben  
**Project**: Inner West Community Voice  
**Launch**: This week  
**Status**: Ready to build
