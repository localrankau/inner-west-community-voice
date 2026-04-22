import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const COUNCIL_EMAIL = "planning@innerwestcouncil.nsw.gov.au";
const FROM_ADDRESS = "Inner West Pulse <noreply@innerwestpulse.com.au>";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) throw new Error("RESEND_API_KEY is not set");

    const { title, description, vote_count, poster_email, issue_url } = await req.json();

    if (!title || !description || !issue_url) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const subject = `Community Issue: ${title} — ${vote_count} Verified Supporters`;

    const body = `Dear Inner West Council,

A community issue has been submitted via Inner West Pulse and has received ${vote_count} verified resident supporters. We are writing to formally raise this concern and request a response.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ISSUE: ${title}

${description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${vote_count} verified Inner West community supporters have endorsed this issue.

View the public issue page (including community discussion):
${issue_url}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was sent via Inner West Pulse (innerwestpulse.com.au), an independent, non-partisan community platform. Supporter names are kept private — the verified count represents real Inner West residents who have provided their name and postcode.

The issue creator and community supporters respectfully request a formal Council response.

Regards,
Inner West Pulse
innerwestpulse.com.au`;

    const cc = poster_email ? [poster_email] : [];

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [COUNCIL_EMAIL],
        cc,
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Resend error ${res.status}: ${errText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-council-email error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
