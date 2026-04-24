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

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0B3A66;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.65);font-family:Arial,sans-serif;">Inner West Pulse</p>
              <h1 style="margin:0;font-size:26px;font-weight:500;color:#ffffff;line-height:1.2;">Community Issue Submission</h1>
              <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.8);font-family:Arial,sans-serif;">Formally submitted on behalf of Inner West residents</p>
            </td>
          </tr>

          <!-- Supporter badge -->
          <tr>
            <td style="background:#2D7A4A;padding:18px 40px;text-align:center;">
              <p style="margin:0;font-size:28px;font-weight:700;color:#ffffff;font-family:Arial,sans-serif;letter-spacing:-0.02em;">${vote_count} verified community supporters</p>
              <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.85);font-family:Arial,sans-serif;">Inner West residents who have confirmed their name and postcode</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <p style="margin:0 0 24px;font-size:16px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">Dear Inner West Council,</p>
              <p style="margin:0 0 24px;font-size:16px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">A community issue has been submitted via <strong>Inner West Pulse</strong> and has received <strong>${vote_count} verified resident supporters</strong>. We are writing to formally raise this concern and respectfully request a Council response.</p>

              <!-- Issue box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#f0f4f8;border-left:4px solid #0B3A66;border-radius:0 8px 8px 0;padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;font-weight:700;color:#0B3A66;font-family:Arial,sans-serif;">Issue raised</p>
                    <h2 style="margin:0 0 12px;font-size:20px;font-weight:600;color:#111827;line-height:1.3;">${title}</h2>
                    <p style="margin:0;font-size:15px;color:#374151;line-height:1.65;font-family:Arial,sans-serif;">${description.replace(/\n/g, "<br/>")}</p>
                  </td>
                </tr>
              </table>

              <!-- View issue CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#EEF4FB;border-radius:8px;padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#0B3A66;font-family:Arial,sans-serif;">View the public issue page</p>
                    <p style="margin:0 0 14px;font-size:13px;color:#6B7280;font-family:Arial,sans-serif;">Includes the verified supporter count, community discussion, and full submission details.</p>
                    <a href="${issue_url}" style="display:inline-block;background:#0B3A66;color:#ffffff;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:12px 24px;border-radius:6px;text-decoration:none;">View issue &amp; verified supporters →</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">The issue creator and ${vote_count} community supporters respectfully request a formal Council response.</p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f0f4f8;border-radius:0 0 12px 12px;padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px;font-size:12px;color:#6B7280;line-height:1.6;font-family:Arial,sans-serif;"><strong style="color:#374151;">Inner West Pulse</strong> is an independent, non-partisan platform for Inner West residents. Supporter names are kept private — the verified count represents real Inner West residents who have confirmed their name and postcode.</p>
              <p style="margin:8px 0 0;font-size:12px;color:#6B7280;font-family:Arial,sans-serif;"><a href="https://innerwestpulse.com.au" style="color:#0B3A66;text-decoration:none;">innerwestpulse.com.au</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = `Dear Inner West Council,

A community issue has been submitted via Inner West Pulse and has received ${vote_count} verified resident supporters.

ISSUE: ${title}

${description}

View the public issue page (includes live verified supporter count):
${issue_url}

${vote_count} verified Inner West residents have endorsed this issue. The issue creator and community supporters respectfully request a formal Council response.

---
Inner West Pulse — innerwestpulse.com.au
Supporter names are kept private. The verified count represents real Inner West residents who confirmed their name and postcode.`;

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
        html,
        text,
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
