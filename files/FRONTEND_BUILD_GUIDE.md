# Inner West Community Voice - Frontend Build Guide

Use this to brief Claude Code on what to build.

## Component Structure

```
App.jsx (Main router)
├── HomePage.jsx
│   ├── SearchBar.jsx
│   ├── CategoryFilter.jsx
│   ├── SuburbFilter.jsx
│   ├── IssueLeaderboard.jsx (top 5 trending)
│   └── PostIssueButton.jsx
│
├── IssueFeed.jsx
│   └── IssueCard.jsx (x many)
│       ├── VoteButtons.jsx
│       ├── ShareButtons.jsx
│       └── CategoryBadge.jsx
│
├── IssueDetailPage.jsx
│   ├── IssueHeader.jsx
│   ├── EscalationStatus.jsx
│   ├── VoteCounter.jsx
│   ├── ShareSection.jsx
│   ├── CommentSection.jsx
│   │   └── CommentThread.jsx
│   └── SignupForEscalationForm.jsx
│
└── PostIssueModal.jsx
    └── IssueForm.jsx
```

## Component Details

### HomePage.jsx
```
- Big centered search bar (search titles + descriptions)
- Filter dropdowns (Category + Suburb)
- Hot issues leaderboard (top 5 by upvote count)
- Call-to-action: "Post an Issue" button
- Recent issues feed below
```

### IssueCard.jsx (appears in feed + leaderboard)
```
Layout (vertical card):
┌─────────────────────────────┐
│ [Category Badge] [Suburb]   │
│                             │
│ Issue Title (bold)          │
│ Brief description...        │
│                             │
│ ⬆️ 47 ⬇️ 2  [Share] [Expand]  │
└─────────────────────────────┘

- Title is clickable → detail page
- Vote buttons update count in real-time
- Share button shows: Twitter, Facebook, WhatsApp, Copy Link
- Expand button → full detail page
```

### IssueDetailPage.jsx
```
Header Section:
- Title (large)
- Category badge + Suburb tag
- Posted: [date]
- Vote count: "⬆️ 247 / 250 needed to escalate" (progress bar visual)

Main Content:
- Full description (scrollable)

Escalation Status (if escalated):
✅ Sent to Inner West Council on [date]
Recipients: planning@innerwestcouncil.nsw.gov.au, [others]
Supporters: 247

Signup Section (if NOT escalated):
Help escalate this issue:
[Email field] [Name field] [Postcode field]
[Sign me up] button
(Your signature = verified supporter)

Comments Section:
Comments (newest first):
- Commenter: [optional name]
- Comment text
- [date]

Vote Buttons (sticky on mobile):
⬆️ 247  ⬇️ 2
Share: [buttons]
Back to feed
```

### PostIssueModal.jsx
```
Form fields:
- Title: [text input, 100 char limit, counter visible]
- Description: [textarea, 500 char limit, counter visible]
- Category: [dropdown] Rezoning / Infrastructure / Transport / Services / Other
- Suburb: [dropdown] Leichhardt / Marrickville / Newtown / Ultimo / Petersham / Lilyfield / Ashfield / Rozelle / Balmain / Inner West (Other)
- Anonymous: [toggle] ON (default)

Buttons:
[Cancel] [Post Issue]

Validation:
- Title required, non-empty
- Description required, non-empty
- Category required
- Suburb required
- On submit: Show loading state, then redirect to feed
```

### VoteButtons.jsx
```
⬆️ [count]  ⬇️ [count]

On click:
- Disable buttons (disable spam voting)
- Send vote to API
- Update counts optimistically
- Re-enable buttons
- Show toast: "Your vote counted!"

Prevent double-voting:
- Use localStorage + session ID to track votes per issue
- If user already voted on this issue, disable button
```

### ShareButtons.jsx
```
[🐦 Twitter] [f Facebook] [💬 WhatsApp] [🔗 Copy]

Each button:
- Twitter: https://twitter.com/intent/tweet?text=[Issue Title]&url=[shareUrl]
- Facebook: https://www.facebook.com/sharer/sharer.php?u=[shareUrl]
- WhatsApp: https://wa.me/?text=[Issue Title] [shareUrl]
- Copy: Copy full link to clipboard + show toast "Copied!"
```

### SignupForEscalationForm.jsx
```
Headline:
"Help escalate this issue to Council"
"250 verified supporters = formal Council submission"

Form:
Email: [input, required]
Name: [input, required]
Postcode: [input, required, format: 4 digits]

[Sign Me Up] button

On submit:
- Validate email format
- Validate postcode (2000-2770 range)
- Send to API
- Show success: "✅ You're counted as a supporter!"
- Hide form (user signed up)
- Show: "247 supporters + you"
```

### CommentSection.jsx
```
Comments ([count]):

[Newest comment at top]
┌──────────────────────────┐
│ [Name or "Anonymous"]    │
│ Comment text...          │
│ Posted [time ago]        │
└──────────────────────────┘

[Add Comment Form]
Name (optional): [input]
Comment: [textarea, 300 chars]
Anonymous: [toggle ON by default]
[Post Comment] button

On submit:
- Validate comment non-empty
- Post to API
- Refresh comments
- Clear form
- Show toast: "Comment posted!"
```

---

## Key UX Patterns

### Vote Feedback
- User clicks upvote
- Button highlight changes (add color)
- Count updates immediately (optimistic)
- API call in background
- If error, revert UI

### Share Behavior
- Click share → small menu pops up (don't open new page)
- Copy link → toast "Copied to clipboard!"
- Twitter/Facebook → open new window

### Forms
- Real-time char counter (e.g., "47 / 100 chars")
- Auto-disable submit button if form invalid
- Show validation errors on blur/submit
- Loading state on submit (disable button + show spinner)

### Mobile (Primary Target)
- Single-column layout
- Touch-friendly buttons (big tap targets)
- Swipe-up for forms (don't full-page refresh)
- Share buttons always visible
- Vote buttons sticky at bottom on detail page

---

## Color/Design System

Use simple, clean design. Suggested palette:

```
Primary: Dark blue (#1e3a8a)
Accent: Orange (#ff6b35) — for call-to-action buttons
Success: Green (#16a34a) — for escalated badges
Warning: Red (#dc2626) — for urgent issues
Neutral: Gray (#64748b) — for secondary text
Background: White (#ffffff)
```

Typography:
```
Headlines: Bold, large (24-32px on desktop, 18-24px mobile)
Body: Regular, 14-16px
Labels: Small, 12px, gray
```

Icons:
```
Use simple Unicode or emoji:
⬆️ Upvote
⬇️ Downvote
✅ Escalated
🔗 Copy/Share
🐦 Twitter
💬 WhatsApp
📍 Location/Suburb
📁 Category
```

Spacing:
```
- Card padding: 16px
- Between cards: 12px gap
- Form fields: 12px margin-bottom
- Button padding: 10px 16px
```

---

## API Integration Notes

### Supabase Client Setup
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

### Key Endpoints (RPC or direct table calls)

**Get all issues** (filtered + sorted):
```javascript
let query = supabase.from('issues').select('*')

if (filters.suburb) query = query.eq('suburb', filters.suburb)
if (filters.category) query = query.eq('category', filters.category)

query = query.order('vote_count', { ascending: false }).limit(50)
const { data } = await query
```

**Get single issue** (with vote/comment counts):
```javascript
const { data: issue } = await supabase
  .from('issues')
  .select('*')
  .eq('id', issueId)
  .single()

const { data: comments } = await supabase
  .from('comments')
  .select('*')
  .eq('issue_id', issueId)
  .order('created_at', { ascending: false })
```

**Cast a vote**:
```javascript
const sessionId = localStorage.getItem('session_id') || generateSessionId()

const { data } = await supabase
  .from('votes')
  .insert({
    issue_id: issueId,
    vote_type: 'up',
    session_id: sessionId
  })
  .select()

// Update local vote count optimistically
```

**Add comment**:
```javascript
await supabase.from('comments').insert({
  issue_id: issueId,
  commenter_name: anonymous ? null : name,
  comment_text: text,
  anonymous: anonymous
})
```

**Sign up as supporter**:
```javascript
await supabase.from('supporter_signups').insert({
  issue_id: issueId,
  email: email,
  name: name,
  postcode: postcode,
  postcode_verified: validatePostcode(postcode)
})
```

**Create issue**:
```javascript
await supabase.from('issues').insert({
  title: title,
  description: description,
  category: category,
  suburb: suburb,
  vote_count: 0,
  escalated: false
})
```

---

## Loading States & Error Handling

**While loading**:
- Show skeleton cards (gray placeholder boxes)
- Disable all buttons

**On error**:
- Toast notification: "Something went wrong. Please try again."
- Retry button visible
- Don't lose user input

**Empty state** (no issues matching filters):
- Show: "No issues yet. Be the first to post one!"
- Highlight [Post Issue] button

---

## Mobile Optimization

- Test on iPhone + Android browsers
- Buttons: min 44px tall (tap target)
- Text: never smaller than 14px
- Forms: use native inputs (date picker, email validation, etc.)
- No hover states (touch has no hover)
- Vertical scrolling primary, no horizontal
- Top navigation sticky (search + filters always accessible)

---

## To Brief Claude Code

When you use Claude Code, paste this section:

```
Build a simple, mobile-first React app for community issue voting. 
Components needed: 
- HomePage with search + filters + leaderboard
- IssueFeed with cards (title, description, votes, share buttons)
- IssueDetailPage (full issue, comments, escalation status, signup form)
- PostIssueModal (form to create new issue)
- VoteButtons (upvote/downvote with real-time updates)
- ShareButtons (Twitter, Facebook, WhatsApp, Copy Link)
- CommentSection (threaded comments)

Integration: Supabase for all data. Session-based voting (localStorage).

Design: Clean, minimal, no distractions. Use the color scheme: dark blue, orange accent, gray neutral.

Mobile-first. Most users on phones.
```

---

## Success Checklist for Frontend

- [ ] Issues load from Supabase
- [ ] Voting works (up/down counts update, prevented double-voting)
- [ ] Search filters by title/description
- [ ] Category + suburb filters work
- [ ] Post issue form works, creates new issue
- [ ] Issue detail page shows all info
- [ ] Comments load + can post new comment
- [ ] Escalation status shows if vote >= 250
- [ ] Signup form captures email + name + postcode
- [ ] Share buttons open correct social media links
- [ ] Mobile responsive (tested on iPhone + Android)
- [ ] Fast load (issues load in <2 seconds)
- [ ] No console errors
- [ ] Supabase RLS policies allow reads

---

Ready to brief Claude Code!
