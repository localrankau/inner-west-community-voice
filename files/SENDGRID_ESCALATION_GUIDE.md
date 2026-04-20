# Inner West Community Voice - SendGrid Email Escalation

This guide covers setting up automatic email sending when an issue reaches 250 upvotes.

---

## Setup Steps

### 1. Create SendGrid Account
- Go to https://sendgrid.com
- Sign up for free tier (12,500 emails/month)
- Verify sender email (use your email or noreply@iwcommunityvoice.com)
- Get API key from Settings → API Keys

### 2. Store API Key in Supabase
- Go to Supabase project → Settings → Environment variables
- Add: `SENDGRID_API_KEY` = [your SendGrid API key]
- Save

### 3. Create Edge Function (in Supabase)
- Supabase Dashboard → Edge Functions → Create function
- Name: `escalate-issue-to-council`
- Paste code below
- Deploy

---

## Escalation Logic (Supabase Edge Function)

This function:
1. Watches for votes on issues
2. Checks if vote_count >= 250
3. If yes → fetches all supporters (verified emails)
4. Generates formal letter
5. Sends email to Council + logs escalation
6. Marks issue as escalated

### Node.js / TypeScript Code

```typescript
// supabase/functions/escalate-issue-to-council/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// This function is triggered by a database trigger when vote_count >= 250
// OR you call it manually from your frontend

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  issue_id: number;
}

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { issue_id }: RequestBody = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    // Get issue details
    const { data: issue, error: issueError } = await supabase
      .from("issues")
      .select("*")
      .eq("id", issue_id)
      .single();

    if (issueError || !issue) {
      throw new Error(`Issue not found: ${issueError?.message}`);
    }

    // Check if already escalated
    if (issue.escalated) {
      return new Response(
        JSON.stringify({ error: "Issue already escalated" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Check vote count
    if (issue.vote_count < 250) {
      return new Response(
        JSON.stringify({
          error: `Not enough votes (${issue.vote_count}/250)`,
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Get all verified supporters for this issue
    const { data: supporters, error: supportersError } = await supabase
      .from("supporter_signups")
      .select("email, name, postcode")
      .eq("issue_id", issue_id)
      .eq("postcode_verified", true);

    if (supportersError) {
      throw new Error(`Failed to fetch supporters: ${supportersError.message}`);
    }

    // Generate escalation letter
    const supporterList = supporters
      .map((s: any) => `${s.name} (${s.postcode})`)
      .join("\n");

    const letterContent = `
Dear Inner West Council Planning Department,

This letter represents verified community concerns from ${supporters.length} Inner West residents regarding:

ISSUE: ${issue.title}

DESCRIPTION:
${issue.description}

This submission was automatically generated via the Inner West Community Voice platform (https://iwcommunityvoice.com) on ${new Date().toLocaleDateString()}, following ${issue.vote_count} verified community votes.

VERIFIED SUPPORTER NAMES AND POSTCODES:
${supporterList}

We respectfully request Inner West Council's formal written response to this community concern within 21 days.

---
Inner West Community Voice
An independent, non-partisan community organizing platform
https://iwcommunityvoice.com

This is an automated submission. No signature required.
`;

    // Council recipients
    const councilEmails = [
      "planning@innerwestcouncil.nsw.gov.au",
      "customer.service@innerwestcouncil.nsw.gov.au",
    ];

    // Optional: Add councilor emails (hardcoded or from DB)
    // const councilors = ["councilor1@iwc.nsw.gov.au", "councilor2@iwc.nsw.gov.au"];
    // councilEmails.push(...councilors);

    // Send via SendGrid API
    const sendGridApiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!sendGridApiKey) {
      throw new Error("SENDGRID_API_KEY not set");
    }

    const emailPayload = {
      personalizations: [
        {
          to: councilEmails.map((email: string) => ({ email })),
          subject: `[Community Voice] Community Concern: ${issue.title}`,
        },
      ],
      from: {
        email: "noreply@iwcommunityvoice.com",
        name: "Inner West Community Voice",
      },
      content: [
        {
          type: "text/plain",
          value: letterContent,
        },
      ],
      reply_to: {
        email: "contact@iwcommunityvoice.com", // Or your email
      },
    };

    const sendGridResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendGridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!sendGridResponse.ok) {
      const error = await sendGridResponse.text();
      throw new Error(`SendGrid API error: ${error}`);
    }

    // Log escalation in database
    const { error: logError } = await supabase
      .from("escalations")
      .insert({
        issue_id: issue.id,
        sent_at: new Date().toISOString(),
        recipient_emails: councilEmails.join(", "),
        supporter_count: supporters.length,
        letter_content: letterContent,
        status: "sent",
      });

    if (logError) {
      throw new Error(`Failed to log escalation: ${logError.message}`);
    }

    // Mark issue as escalated
    const { error: updateError } = await supabase
      .from("issues")
      .update({
        escalated: true,
        escalated_at: new Date().toISOString(),
      })
      .eq("id", issue.id);

    if (updateError) {
      throw new Error(`Failed to update issue: ${updateError.message}`);
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: `Issue escalated to ${councilEmails.length} recipients with ${supporters.length} verified supporters`,
        recipients: councilEmails,
        supporter_count: supporters.length,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Escalation function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
```

---

## How to Trigger Escalation

### Option 1: Manual Trigger (From Frontend)
When user signs up as supporter and vote count hits 250:

```javascript
// Frontend code (React)
const handleEscalationCheck = async (issueId: number) => {
  // Get current vote count
  const { data: issue } = await supabase
    .from('issues')
    .select('vote_count, escalated')
    .eq('id', issueId)
    .single();

  // If 250+ votes and not escalated, trigger function
  if (issue.vote_count >= 250 && !issue.escalated) {
    const response = await fetch('YOUR_SUPABASE_URL/functions/v1/escalate-issue-to-council', {
      method: 'POST',
      headers: {
        Authorization: `Bearer YOUR_SUPABASE_ANON_KEY`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ issue_id: issueId }),
    });

    const result = await response.json();
    if (result.success) {
      alert(`✅ Issue escalated! ${result.supporter_count} verified supporters sent to Council.`);
    }
  }
};
```

### Option 2: Automatic Trigger (Database Trigger)
Create a PostgreSQL trigger that fires when vote_count >= 250:

```sql
-- Trigger to auto-escalate when vote_count >= 250
CREATE OR REPLACE FUNCTION check_escalation_threshold()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.vote_count >= 250 AND NOT NEW.escalated THEN
    -- Call the Supabase Edge Function via HTTP
    -- (This requires pg_net extension installed)
    PERFORM
      net.http_post(
        url := 'https://YOUR_PROJECT_ID.supabase.co/functions/v1/escalate-issue-to-council',
        headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
        body := json_build_object('issue_id', NEW.id)::text
      );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach to issues table
CREATE TRIGGER trigger_check_escalation
AFTER UPDATE ON issues
FOR EACH ROW
EXECUTE FUNCTION check_escalation_threshold();
```

---

## Testing the Email

### Mock Send (Without Real Email)
1. Set vote_count to 250 manually in Supabase
2. Create 2-3 fake supporter_signups records
3. Call the function with issueId
4. Check logs in Supabase → Edge Functions

### Send Test Email to Yourself
Modify the Edge Function to send to your email first:

```javascript
// In Edge Function, change:
const councilEmails = [
  "your.email@gmail.com",  // Test recipient
  // "planning@innerwestcouncil.nsw.gov.au",
];
```

Then:
1. Set vote_count = 250
2. Add supporters
3. Trigger function
4. Check your email for letter

---

## Email Template (Customization)

The template above is formal. You can customize:

**Shorter version**:
```
Dear Inner West Council,

${supporters.length} verified Inner West residents formally oppose:
${issue.title}

${issue.description}

We request your response within 21 days.

---
Inner West Community Voice Platform
https://iwcommunityvoice.com
```

**Longer version** (add Council-specific detail):
```
[Full formal letter above + add legal refs]

This submission is made under:
- Local Government Act 1993 (NSW) - Community consultation requirements
- Inner West Council's Community Engagement Framework
- [Any relevant zoning/planning regulations for the issue]

[List of legal/policy references relevant to the issue]
```

---

## Council Email Addresses

**Inner West Council**:
- Planning: `planning@innerwestcouncil.nsw.gov.au`
- General: `customer.service@innerwestcouncil.nsw.gov.au`
- Mayor: `mayor@innerwestcouncil.nsw.gov.au`

**Councilors** (Optional BCC - add to DB table):
- [Will vary based on ward]
- Research at: https://www.innerwestcouncil.nsw.gov.au

---

## Monitoring & Logging

### Check Escalation Status in Supabase
```sql
-- See all escalations
SELECT issue_id, sent_at, supporter_count, status
FROM escalations
ORDER BY sent_at DESC;

-- See which issues have escalated
SELECT id, title, escalated, escalated_at, vote_count
FROM issues
WHERE escalated = true
ORDER BY escalated_at DESC;
```

### Handle Email Bounces
SendGrid webhooks (advanced):
- Set up webhook in SendGrid dashboard → Settings → Mail Send
- Add endpoint: `https://your-function-url/webhooks/sendgrid`
- Logs bounces/complaints → update escalation status in DB

---

## Error Handling

If escalation fails:
1. Log error to Supabase (create `escalation_errors` table)
2. Alert you (email + dashboard notification)
3. Don't retry automatically (avoid spam)
4. Allow manual re-trigger from admin panel

```javascript
// Add to escalations table:
// status VARCHAR(50) -- 'sent', 'bounced', 'failed', 'complained'
// error_message TEXT -- log what went wrong
```

---

## Production Checklist

- [ ] SendGrid API key stored in Supabase secrets
- [ ] Edge Function deployed + tested
- [ ] Test email sent successfully
- [ ] Escalation letter template reviewed + approved
- [ ] Council email addresses verified (real/current)
- [ ] Database logging working (escalations table)
- [ ] Frontend manually triggers escalation at 250 votes
- [ ] Test with 5-10 fake supporters + verify email arrives
- [ ] Response time < 5 seconds (function execution)
- [ ] Error handling in place (if SendGrid fails)

---

## Cost Analysis

**SendGrid Free Tier**:
- 12,500 emails/month
- Unlimited contacts
- Basic support

**Estimate**: 
- 1 escalation email = ~1 email
- 10 escalations/month = 10 emails
- **You'll never hit the limit**

**Upgrade if needed**: $20/month for 100k emails (not necessary)

---

Ready to deploy! Test locally first before going live.
