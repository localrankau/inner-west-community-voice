/**
 * Cloudflare Pages middleware — bot-aware meta injection for blog posts.
 *
 * Social crawlers (Facebook, WhatsApp, LinkedIn, Telegram, Slack, etc.) don't
 * execute JavaScript, so they only ever see the generic index.html meta tags.
 * When a request comes from a known crawler and targets a blog post URL
 * (?blog=<slug>), this middleware fetches the post from Supabase and returns a
 * minimal HTML shell with the correct Open Graph / Twitter Card meta tags.
 * All other requests are passed through unchanged to the SPA.
 */

const CRAWLER_RE =
  /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Googlebot|bingbot|Slackbot|TelegramBot|Discordbot|Pinterest|redditbot|Applebot|iframely|vkShare|W3C_Validator/i;

function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get("blog");

  // Pass through: not a blog post URL
  if (!slug) return next();

  // Pass through: real user (not a crawler) — let React handle it
  const ua = request.headers.get("user-agent") ?? "";
  if (!CRAWLER_RE.test(ua)) return next();

  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

  // If env vars are missing in this environment, fail open
  if (!supabaseUrl || !supabaseKey) return next();

  try {
    const apiRes = await fetch(
      `${supabaseUrl}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=title,excerpt,slug&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    const rows = await apiRes.json();
    const post = rows?.[0];

    // Post not found — let the SPA show its own 404 state
    if (!post) return next();

    const pageUrl = `${url.origin}/?blog=${encodeURIComponent(post.slug)}`;
    const title = `${post.title} — Inner West Pulse`;
    const description =
      post.excerpt ?? `Inner West community reporting on ${post.title}`;

    // Minimal HTML: enough for crawlers, then redirects humans who somehow land here
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />

  <!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
  <meta property="og:type"        content="article" />
  <meta property="og:site_name"   content="Inner West Pulse" />
  <meta property="og:url"         content="${esc(pageUrl)}" />
  <meta property="og:title"       content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card"        content="summary" />
  <meta name="twitter:title"       content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />

  <link rel="canonical" href="${esc(pageUrl)}" />
</head>
<body>
  <h1>${esc(post.title)}</h1>
  <p>${esc(description)}</p>
  <script>window.location.replace(${JSON.stringify(pageUrl)});</script>
</body>
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  } catch {
    // On any error, fail open — serve the normal SPA
    return next();
  }
}
