import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  ArrowUp,
  ArrowDown,
  Share2,
  Twitter,
  Facebook,
  MessageCircle,
  Link2,
  Search,
  X,
  CheckCircle2,
  MapPin,
  Tag,
  TrendingUp,
  Plus,
  ArrowLeft,
  Send,
  Flame,
  Users,
  FileText,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS (civil tech — Authority Blue / Community Green / Warning Amber)
// ────────────────────────────────────────────────────────────────────────────
const COLORS = {
  authority: "#0B3A66",
  authorityDeep: "#062547",
  community: "#2D7A4A",
  communityDeep: "#1F5733",
  amber: "#D97706",
  success: "#059669",
  error: "#DC2626",
  gold: "#F59E0B",
  ink: "#1F2937",
  slate: "#64748B",
  mist: "#F3F4F6",
  hairline: "#E5E7EB",
  paper: "#FFFFFF",
  cream: "#FAF8F4",
};

const CATEGORY_STYLES = {
  Rezoning: { bg: "#E8EEF5", fg: COLORS.authority, dot: COLORS.authority },
  Infrastructure: { bg: "#E6F0EA", fg: COLORS.communityDeep, dot: COLORS.community },
  Transport: { bg: "#E0F2F1", fg: "#0F766E", dot: "#0F766E" },
  Services: { bg: "#FEF3E2", fg: "#9A4D07", dot: COLORS.amber },
  Other: { bg: "#F1F3F5", fg: "#475569", dot: "#64748B" },
};

const SUBURBS = [
  "Leichhardt", "Marrickville", "Newtown", "Ultimo", "Petersham",
  "Lilyfield", "Ashfield", "Rozelle", "Balmain", "Inner West (Other)",
];
const CATEGORIES = ["Rezoning", "Infrastructure", "Transport", "Services", "Other"];
const ESCALATION_THRESHOLD = 250;

// Hero image — Anzac Bridge / Sydney harbour at golden hour (Unsplash)
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80";
const TEXTURE_IMAGE =
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2400&q=80";

// ────────────────────────────────────────────────────────────────────────────
// SEED DATA (the 10 launch issues from SUPABASE_SCHEMA.sql, with realistic vote counts)
// ────────────────────────────────────────────────────────────────────────────
const SEED_ISSUES = [
  {
    id: 1,
    title: "Parramatta Road Corridor Rezoning",
    description:
      "The proposed State-Led Rezoning of Parramatta Road threatens community character and infrastructure capacity. Marrickville and Leichhardt are already at TOD density limits. This rezoning ignores Ministerial Direction 1.5(e) (infrastructure adequacy requirement) and will strain existing water, transport, and school systems. We call for Council to reject this proposal.",
    category: "Rezoning",
    suburb: "Leichhardt",
    vote_count: 247,
    down_count: 8,
    created_at: daysAgo(6),
    escalated: false,
  },
  {
    id: 2,
    title: "Marrickville Train Station Flooding & Accessibility",
    description:
      "Marrickville train station floods regularly in heavy rain, creating dangerous conditions for commuters. Accessibility is poor for elderly and disability users. Stairs are narrow, no elevator, and platform is slippery. We demand TfNSW invest in drainage and accessibility upgrades.",
    category: "Infrastructure",
    suburb: "Marrickville",
    vote_count: 198,
    down_count: 3,
    created_at: daysAgo(4),
    escalated: false,
  },
  {
    id: 3,
    title: "Newtown Noise Complaints — Late Night Venues",
    description:
      "24-hour bars and venues in Newtown are causing persistent noise issues for nearby residents, especially 2am–6am. Current noise monitoring is inadequate. We need stricter licensing conditions and enforcement from Council.",
    category: "Services",
    suburb: "Newtown",
    vote_count: 156,
    down_count: 31,
    created_at: daysAgo(9),
    escalated: false,
  },
  {
    id: 4,
    title: "Pothole Crisis — Lilyfield Road",
    description:
      "Lilyfield Road has deteriorated rapidly. Multiple potholes are creating hazards for cyclists and causing vehicle damage. Council patch jobs last weeks. Demand: Full road resurfacing, not temporary fixes.",
    category: "Infrastructure",
    suburb: "Lilyfield",
    vote_count: 142,
    down_count: 2,
    created_at: daysAgo(3),
    escalated: false,
  },
  {
    id: 5,
    title: "Inner West Bike Lane Safety",
    description:
      "Bike lanes are inconsistently designed and often blocked by parked cars. No enforcement of bike lane parking. We need wider protected lanes and Council enforcement against illegal parking.",
    category: "Infrastructure",
    suburb: "Marrickville",
    vote_count: 112,
    down_count: 14,
    created_at: daysAgo(7),
    escalated: false,
  },
  {
    id: 6,
    title: "Marrickville Public School Overcrowding",
    description:
      "Marrickville Public School is at 120% capacity. Classrooms are split shifts. No relief school planned. Council planning approvals ignore school capacity — we need binding developer contributions to education.",
    category: "Services",
    suburb: "Marrickville",
    vote_count: 89,
    down_count: 1,
    created_at: daysAgo(11),
    escalated: false,
  },
  {
    id: 7,
    title: "Leichhardt Library Parking — Impossible to Access",
    description:
      "Leichhardt Library has minimal parking. Nearby streets have limited availability. Making it inaccessible for families, elderly, and disabled residents. Demand: Council secure additional parking or funding for underground parking.",
    category: "Infrastructure",
    suburb: "Leichhardt",
    vote_count: 74,
    down_count: 22,
    created_at: daysAgo(14),
    escalated: false,
  },
  {
    id: 8,
    title: "Newtown High Street Rat Problem",
    description:
      "Rat population explosion in High Street. Restaurants reporting infestations despite pest control. Health hazard for community and businesses. Demand: Coordinated Council baiting program + infrastructure fixes (sealed drains, etc.)",
    category: "Services",
    suburb: "Newtown",
    vote_count: 63,
    down_count: 4,
    created_at: daysAgo(5),
    escalated: false,
  },
  {
    id: 9,
    title: "Ashfield Train Line Frequency",
    description:
      "T3 (Bankstown Line) frequency has degraded — now 15–20 min wait times during off-peak. Unreliable for commuters. Demand: TfNSW increase frequency to pre-COVID levels + commit to reliability targets.",
    category: "Transport",
    suburb: "Ashfield",
    vote_count: 58,
    down_count: 2,
    created_at: daysAgo(8),
    escalated: false,
  },
  {
    id: 10,
    title: "Rozelle Cleanup — Contaminated Land",
    description:
      "Rozelle has multiple contaminated former industrial sites (DCP areas). Slow cleanup = health and environmental risks. Demand: Council accelerate remediation timelines and fund community health monitoring.",
    category: "Infrastructure",
    suburb: "Rozelle",
    vote_count: 41,
    down_count: 1,
    created_at: daysAgo(12),
    escalated: false,
  },
];

const SEED_COMMENTS = {
  1: [
    { id: 1, name: "Jane from Leichhardt", text: "Infrastructure capacity is already stretched — water pressure drops in peak hours now. This rezoning will make it worse.", created_at: daysAgo(2), anonymous: false },
    { id: 2, name: null, text: "Agreed. The schools can't absorb more kids without relief builds. Council needs to push back on State.", created_at: daysAgo(1), anonymous: true },
    { id: 3, name: "Tom M.", text: "We need a public forum on this. 5,000 new dwellings without a single new school is planning malpractice.", created_at: hoursAgo(8), anonymous: false },
  ],
  2: [
    { id: 4, name: null, text: "I slipped on the platform last winter. Still waiting for a response from TfNSW.", created_at: daysAgo(3), anonymous: true },
    { id: 5, name: "Priya", text: "My mum can't use this station. She has to travel two stops to Sydenham just to get a lift.", created_at: daysAgo(1), anonymous: false },
  ],
};

// const EMAIL_SEQUENCE = [
//   {
//     trigger: "signup",
//     delay: 0,
//     subject: "Welcome to Inner West Community Voice",
//     preview: "Here's your neighborhood's top issues right now",
//   },
//   {
//     trigger: "signup",
//     delay: "3 days",
//     subject: "Your vote could change [suburb]",
//     preview: "See which issues are approaching the 250-vote threshold",
//   },
//   {
//     trigger: "signup",
//     delay: "7 days",
//     subject: "See how Inner West residents drove real change",
//     preview: "3 issues escalated to council this month — here's what happened",
//   },
// ];

function daysAgo(n) { return new Date(Date.now() - n * 864e5).toISOString(); }
function hoursAgo(n) { return new Date(Date.now() - n * 36e5).toISOString(); }

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}

// ────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [issues, setIssues] = useState(SEED_ISSUES);
  const [comments, setComments] = useState(SEED_COMMENTS);
  const [view, setView] = useState({ name: "home" }); // {name: 'home'} | {name: 'detail', id}
  const [showPostModal, setShowPostModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [userVotes, setUserVotes] = useState({}); // {issueId: 'up'|'down'}
  const [userSignups, setUserSignups] = useState({}); // {issueId: true}

  function showToast(message, kind = "success") {
    setToast({ message, kind, id: Date.now() });
    setTimeout(() => setToast(null), 3200);
  }

  function handleVote(issueId, voteType) {
    if (userVotes[issueId]) {
      showToast("You've already voted on this issue", "info");
      return;
    }
    setUserVotes((v) => ({ ...v, [issueId]: voteType }));
    setIssues((prev) =>
      prev.map((i) => {
        if (i.id !== issueId) return i;
        const updated = {
          ...i,
          vote_count: voteType === "up" ? i.vote_count + 1 : i.vote_count,
          down_count: voteType === "down" ? i.down_count + 1 : i.down_count,
        };
        if (voteType === "up" && updated.vote_count >= ESCALATION_THRESHOLD && !updated.escalated) {
          updated.escalated = true;
          updated.escalated_at = new Date().toISOString();
          setTimeout(
            () =>
              showToast(
                `✓ Issue escalated to Inner West Council with ${updated.vote_count} supporters`,
                "success"
              ),
            600
          );
        }
        return updated;
      })
    );
    showToast(voteType === "up" ? "Your vote counted" : "Downvote recorded", "success");
  }

  function handleCreateIssue(payload) {
    const newIssue = {
      id: Math.max(...issues.map((i) => i.id)) + 1,
      ...payload,
      vote_count: 1,
      down_count: 0,
      created_at: new Date().toISOString(),
      escalated: false,
    };
    setIssues((prev) => [newIssue, ...prev]);
    setShowPostModal(false);
    showToast("Issue published — start sharing to collect votes", "success");
  }

  function handleAddComment(issueId, { name, text, anonymous }) {
    const newComment = {
      id: Date.now(),
      name: anonymous ? null : name || null,
      text,
      created_at: new Date().toISOString(),
      anonymous,
    };
    setComments((c) => ({
      ...c,
      [issueId]: [newComment, ...(c[issueId] || [])],
    }));
    showToast("Comment posted", "success");
  }

  function handleSignup(issueId) {
    setUserSignups((s) => ({ ...s, [issueId]: true }));
    // Signing up also counts as an upvote (verified supporter)
    if (!userVotes[issueId]) {
      handleVote(issueId, "up");
    }
    showToast("You're a verified supporter", "success");
  }

  const currentIssue = view.name === "detail" ? issues.find((i) => i.id === view.id) : null;

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: COLORS.cream,
        minHeight: "100vh",
        color: COLORS.ink,
      }}
    >
      <GlobalStyles />
      <TopNav onHome={() => setView({ name: "home" })} onPost={() => setShowPostModal(true)} />

      {view.name === "home" && (
        <HomePage
          issues={issues}
          onOpenIssue={(id) => setView({ name: "detail", id })}
          onVote={handleVote}
          userVotes={userVotes}
          onPost={() => setShowPostModal(true)}
          onShare={(issue) => shareIssue(issue, showToast)}
        />
      )}

      {view.name === "detail" && currentIssue && (
        <IssueDetailPage
          issue={currentIssue}
          comments={comments[currentIssue.id] || []}
          onBack={() => setView({ name: "home" })}
          onVote={handleVote}
          userVote={userVotes[currentIssue.id]}
          onComment={(payload) => handleAddComment(currentIssue.id, payload)}
          onSignup={() => handleSignup(currentIssue.id)}
          hasSignedUp={!!userSignups[currentIssue.id]}
          onShare={(issue) => shareIssue(issue, showToast)}
        />
      )}

      <Footer />

      {showPostModal && (
        <PostIssueModal onClose={() => setShowPostModal(false)} onSubmit={handleCreateIssue} />
      )}

      {toast && <Toast toast={toast} />}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ────────────────────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

      * { box-sizing: border-box; }
      body, html { margin: 0; padding: 0; }
      button { font-family: inherit; cursor: pointer; border: none; background: none; }
      input, textarea, select {
        font-family: inherit;
        font-size: 15px;
        border: 1px solid ${COLORS.hairline};
        border-radius: 6px;
        padding: 11px 13px;
        color: ${COLORS.ink};
        background: ${COLORS.paper};
        width: 100%;
        outline: none;
        transition: border-color 150ms ease, box-shadow 150ms ease;
      }
      input:focus, textarea:focus, select:focus {
        border-color: ${COLORS.authority};
        box-shadow: 0 0 0 3px rgba(11, 58, 102, 0.12);
      }
      textarea { resize: vertical; min-height: 100px; line-height: 1.55; }
      a { color: ${COLORS.authority}; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .serif { font-family: 'Fraunces', Georgia, serif; font-feature-settings: 'ss01'; letter-spacing: -0.01em; }

      /* Focus ring for accessibility */
      button:focus-visible, a:focus-visible {
        outline: 2px solid ${COLORS.authority};
        outline-offset: 2px;
        border-radius: 4px;
      }

      /* Toast animation */
      @keyframes slideUp { from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes progressFill { from { width: 0; } }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
      @keyframes cardEnter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

      /* Scrollbar (desktop) */
      ::-webkit-scrollbar { width: 10px; height: 10px; }
      ::-webkit-scrollbar-thumb { background: ${COLORS.hairline}; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: ${COLORS.slate}; }
    `}</style>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// TOP NAV
// ────────────────────────────────────────────────────────────────────────────
function TopNav({ onHome, onPost }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(250, 248, 244, 0.92)",
        backdropFilter: "saturate(180%) blur(10px)",
        WebkitBackdropFilter: "saturate(180%) blur(10px)",
        borderBottom: `1px solid ${COLORS.hairline}`,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <button
          onClick={onHome}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: 0 }}
        >
          <Logo />
          <div style={{ textAlign: "left", lineHeight: 1.15 }}>
            <div
              className="serif"
              style={{ fontSize: 17, fontWeight: 600, color: COLORS.authority, letterSpacing: "-0.015em" }}
            >
              Community Voice
            </div>
            <div style={{ fontSize: 11, color: COLORS.slate, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
              Inner West · Sydney
            </div>
          </div>
        </button>

        <button
          onClick={onPost}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: COLORS.community,
            color: "white",
            fontWeight: 600,
            padding: "10px 16px",
            borderRadius: 6,
            fontSize: 14,
            boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
            transition: "background 150ms ease, transform 150ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.communityDeep)}
          onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.community)}
        >
          <Plus size={16} strokeWidth={2.5} />
          Post issue — 250 votes = council action
        </button>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        background: COLORS.authority,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.2)",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        {/* Stylised bridge + voice spark */}
        <path d="M2 14 Q10 4 18 14" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="10" cy="7.5" r="2.2" fill={COLORS.gold} />
      </svg>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ────────────────────────────────────────────────────────────────────────────
function HomePage({ issues, onOpenIssue, onVote, userVotes, onPost, onShare }) {
  const [query, setQuery] = useState("");
  const [suburbFilter, setSuburbFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = useMemo(() => {
    return issues
      .filter((i) => {
        if (suburbFilter !== "All" && i.suburb !== suburbFilter) return false;
        if (categoryFilter !== "All" && i.category !== categoryFilter) return false;
        if (query.trim()) {
          const q = query.toLowerCase();
          return i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => b.vote_count - a.vote_count);
  }, [issues, query, suburbFilter, categoryFilter]);

  const trending = useMemo(() => [...issues].sort((a, b) => b.vote_count - a.vote_count).slice(0, 5), [issues]);

  const stats = useMemo(() => {
    const total = issues.reduce((n, i) => n + i.vote_count, 0);
    const escalated = issues.filter((i) => i.escalated).length;
    return { active: issues.length, supporters: total, escalated };
  }, [issues]);

  return (
    <main>
      <Hero query={query} setQuery={setQuery} stats={stats} onPost={onPost} />

      <Section>
        <SectionHeader
          eyebrow="Trending now"
          title="The issues gaining momentum"
          subtitle="Sorted by verified community support. Hit 250 and your issue goes to Council."
        />
        <TrendingLeaderboard issues={trending} onOpenIssue={onOpenIssue} />
      </Section>

      <Section background={COLORS.paper}>
        <SectionHeader
          eyebrow="All issues"
          title="What your neighbours are raising"
          subtitle="Filter by suburb or category. Every vote is tracked. Every signature is verified."
        />

        <Filters
          suburbFilter={suburbFilter}
          setSuburbFilter={setSuburbFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          resultsCount={filtered.length}
        />

        {filtered.length === 0 ? (
          <EmptyState onPost={onPost} />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 16,
              marginTop: 24,
            }}
          >
            {filtered.map((issue, idx) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onOpen={() => onOpenIssue(issue.id)}
                onVote={onVote}
                userVote={userVotes[issue.id]}
                onShare={() => onShare(issue)}
                index={idx}
              />
            ))}
          </div>
        )}
      </Section>

      <PostCTA onPost={onPost} />
    </main>
  );
}

function Hero({ query, setQuery, stats, onPost }) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 520,
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      {/* Layered background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
          transform: "scale(1.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${COLORS.authorityDeep}ee 0%, ${COLORS.authority}dd 50%, ${COLORS.authority}cc 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(245,158,11,0.14), transparent 40%), radial-gradient(circle at 80% 80%, rgba(45,122,74,0.18), transparent 45%)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "80px 24px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 20,
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.gold, animation: "pulse 2s infinite" }} />
          Grassroots · Independent · Public
        </div>

        <h1
          className="serif"
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 500,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-0.025em",
            maxWidth: 900,
          }}
        >
          Local issues that matter,
          <br />
          <em style={{ color: COLORS.gold, fontStyle: "italic", fontWeight: 500 }}>
            solved by community.
          </em>
        </h1>

        <p
          style={{
            marginTop: 20,
            fontSize: 18,
            lineHeight: 1.55,
            maxWidth: 620,
            color: "rgba(255,255,255,0.88)",
          }}
        >
          Post an issue. Collect 250 verified supporters. Your concern lands on the Council desk
          as a formal submission — automatically.
        </p>

        {/* Search */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "white",
            borderRadius: 10,
            padding: "6px 6px 6px 16px",
            maxWidth: 560,
            boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          }}
        >
          <Search size={18} color={COLORS.slate} />
          <input
            type="text"
            placeholder="Search issues by title or description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              border: "none",
              padding: "10px 4px",
              fontSize: 15,
              background: "transparent",
              color: COLORS.ink,
            }}
          />
          <button
            onClick={onPost}
            style={{
              background: COLORS.community,
              color: "white",
              fontWeight: 600,
              padding: "10px 16px",
              borderRadius: 6,
              fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >
            Post issue
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            marginTop: 44,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 20,
            maxWidth: 720,
          }}
        >
          <Stat number={stats.active} label="Active issues" accent={COLORS.gold} />
          <Stat number={stats.supporters.toLocaleString()} label="Verified supporters" accent={COLORS.gold} />
          <Stat number={stats.escalated} label="Sent to Council" accent={COLORS.gold} />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label, accent }) {
  return (
    <div style={{ borderLeft: `2px solid ${accent}`, paddingLeft: 16 }}>
      <div className="serif" style={{ fontSize: 36, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em" }}>
        {number}
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "rgba(255,255,255,0.75)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Section({ children, background }) {
  return (
    <section style={{ background: background || "transparent", padding: "64px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>{children}</div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ marginBottom: 32, maxWidth: 680 }}>
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: COLORS.community,
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>
      <h2
        className="serif"
        style={{
          fontSize: "clamp(26px, 3.5vw, 36px)",
          fontWeight: 500,
          lineHeight: 1.12,
          margin: 0,
          letterSpacing: "-0.02em",
          color: COLORS.ink,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.55, color: COLORS.slate }}>{subtitle}</p>
      )}
    </div>
  );
}

function TrendingLeaderboard({ issues, onOpenIssue }) {
  return (
    <div
      style={{
        background: COLORS.paper,
        border: `1px solid ${COLORS.hairline}`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      {issues.map((issue, idx) => {
        const pct = Math.min(100, (issue.vote_count / ESCALATION_THRESHOLD) * 100);
        return (
          <button
            key={issue.id}
            onClick={() => onOpenIssue(issue.id)}
            style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr auto",
              gap: 16,
              alignItems: "center",
              padding: "18px 20px",
              width: "100%",
              textAlign: "left",
              borderBottom: idx === issues.length - 1 ? "none" : `1px solid ${COLORS.hairline}`,
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.cream)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div
              className="serif"
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: idx === 0 ? COLORS.gold : COLORS.slate,
                fontStyle: "italic",
                letterSpacing: "-0.02em",
              }}
            >
              {String(idx + 1).padStart(2, "0")}
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                <CategoryBadge category={issue.category} small />
                <span style={{ fontSize: 12, color: COLORS.slate }}>
                  <MapPin size={11} style={{ display: "inline", verticalAlign: "-1px", marginRight: 2 }} />
                  {issue.suburb}
                </span>
                {issue.escalated && (
                  <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.success, display: "inline-flex", alignItems: "center", gap: 3 }}>
                    <CheckCircle2 size={12} /> Escalated
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: COLORS.ink,
                  lineHeight: 1.35,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {issue.title}
              </div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    flex: 1,
                    height: 5,
                    background: COLORS.mist,
                    borderRadius: 10,
                    overflow: "hidden",
                    maxWidth: 300,
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: issue.escalated
                        ? COLORS.success
                        : `linear-gradient(90deg, ${COLORS.authority}, ${COLORS.community})`,
                      transition: "width 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </div>
                <span style={{ fontSize: 12, color: COLORS.slate, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
                  {issue.vote_count} / {ESCALATION_THRESHOLD}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.authority, fontWeight: 600, fontSize: 13 }}>
              {idx === 0 && <Flame size={14} color={COLORS.gold} />}
              View →
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Filters({ suburbFilter, setSuburbFilter, categoryFilter, setCategoryFilter, resultsCount }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 12,
        padding: "14px 16px",
        background: COLORS.mist,
        border: `1px solid ${COLORS.hairline}`,
        borderRadius: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: COLORS.slate, fontWeight: 500 }}>
        <MapPin size={14} /> Suburb
      </div>
      <select
        value={suburbFilter}
        onChange={(e) => setSuburbFilter(e.target.value)}
        style={{ width: "auto", padding: "8px 12px", fontSize: 13, fontWeight: 500 }}
      >
        <option>All</option>
        {SUBURBS.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: COLORS.slate, fontWeight: 500, marginLeft: 8 }}>
        <Tag size={14} /> Category
      </div>
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{ width: "auto", padding: "8px 12px", fontSize: 13, fontWeight: 500 }}
      >
        <option>All</option>
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <div style={{ marginLeft: "auto", fontSize: 13, color: COLORS.slate }}>
        <strong style={{ color: COLORS.ink }}>{resultsCount}</strong> issue{resultsCount === 1 ? "" : "s"}
      </div>
    </div>
  );
}

function EmptyState({ onPost }) {
  return (
    <div
      style={{
        marginTop: 32,
        padding: "56px 24px",
        textAlign: "center",
        background: COLORS.paper,
        border: `1px dashed ${COLORS.hairline}`,
        borderRadius: 12,
      }}
    >
      <div className="serif" style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>
        No issues match your filters
      </div>
      <p style={{ color: COLORS.slate, marginBottom: 20 }}>Be the first to raise one for your suburb.</p>
      <button
        onClick={onPost}
        style={{
          background: COLORS.community,
          color: "white",
          fontWeight: 600,
          padding: "12px 20px",
          borderRadius: 6,
          fontSize: 14,
        }}
      >
        Post issue — 250 votes = council action
      </button>
    </div>
  );
}

function PostCTA({ onPost }) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        margin: "0 auto 80px",
        maxWidth: 1180 - 48,
        borderRadius: 16,
        marginLeft: 24,
        marginRight: 24,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${TEXTURE_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.9)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(100deg, ${COLORS.authorityDeep}f2 0%, ${COLORS.authority}d9 60%, ${COLORS.community}c4 100%)`,
        }}
      />
      <div
        style={{
          position: "relative",
          padding: "56px 40px",
          color: "white",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: COLORS.gold,
              marginBottom: 10,
            }}
          >
            See something? Say something.
          </div>
          <h3
            className="serif"
            style={{
              fontSize: "clamp(26px, 3.4vw, 36px)",
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            250 verified supporters = a formal Council submission.
          </h3>
          <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.85)" }}>
            No petitions. No gatekeepers. Just your community, organised.
          </p>
        </div>
        <button
          onClick={onPost}
          style={{
            background: COLORS.gold,
            color: COLORS.ink,
            fontWeight: 700,
            padding: "16px 28px",
            borderRadius: 8,
            fontSize: 15,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            transition: "transform 150ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          Post issue — 250 votes = council action <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// ISSUE CARD
// ────────────────────────────────────────────────────────────────────────────
function IssueCard({ issue, onOpen, onVote, userVote, onShare, index = 0 }) {
  const [shareOpen, setShareOpen] = useState(false);
  const pct = Math.min(100, (issue.vote_count / ESCALATION_THRESHOLD) * 100);

  return (
    <article
      style={{
        background: COLORS.paper,
        borderRadius: 12,
        border: `1px solid ${COLORS.hairline}`,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        transition: "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        animation: `cardEnter 400ms ease ${index * 40}ms both`,
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
        e.currentTarget.style.borderColor = COLORS.hairline;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.03)";
      }}
    >
      {/* Badges */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <CategoryBadge category={issue.category} />
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            color: COLORS.slate,
            fontWeight: 500,
          }}
        >
          <MapPin size={12} />
          {issue.suburb}
        </span>
        {issue.escalated && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 8px",
              borderRadius: 4,
              background: "#E6F4EA",
              color: COLORS.success,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <CheckCircle2 size={11} /> Escalated
          </span>
        )}
        {!issue.escalated && pct >= 70 && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 8px",
              borderRadius: 4,
              background: "#FEF3E2",
              color: "#9A4D07",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <Flame size={11} /> Trending
          </span>
        )}
      </div>

      {/* Title (clickable) */}
      <button
        onClick={onOpen}
        style={{
          textAlign: "left",
          padding: 0,
          marginBottom: 8,
        }}
      >
        <h3
          className="serif"
          style={{
            fontSize: 20,
            fontWeight: 600,
            lineHeight: 1.25,
            margin: 0,
            color: COLORS.ink,
            letterSpacing: "-0.01em",
          }}
        >
          {issue.title}
        </h3>
      </button>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          color: COLORS.slate,
          margin: "0 0 16px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {issue.description}
      </p>

      {/* Progress */}
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink, fontVariantNumeric: "tabular-nums" }}>
            {issue.vote_count.toLocaleString()} <span style={{ color: COLORS.slate, fontWeight: 500 }}>/ {ESCALATION_THRESHOLD}</span>
          </span>
          <span style={{ fontSize: 11, color: COLORS.slate, fontWeight: 500 }}>
            {issue.escalated ? "Sent to Council" : `${Math.round(pct)}% to escalate`}
          </span>
        </div>
        <div
          style={{
            height: 6,
            background: COLORS.mist,
            borderRadius: 10,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: issue.escalated
                ? COLORS.success
                : `linear-gradient(90deg, ${COLORS.authority} 0%, ${COLORS.community} 100%)`,
              borderRadius: 10,
              transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
        <VoteButton
          kind="up"
          count={issue.vote_count}
          active={userVote === "up"}
          disabled={!!userVote}
          onClick={() => onVote(issue.id, "up")}
        />
        <VoteButton
          kind="down"
          count={issue.down_count}
          active={userVote === "down"}
          disabled={!!userVote}
          onClick={() => onVote(issue.id, "down")}
        />

        <div style={{ position: "relative", marginLeft: "auto" }}>
          <button
            onClick={() => setShareOpen((o) => !o)}
            aria-label="Share issue"
            style={{
              padding: "9px 12px",
              border: `1px solid ${COLORS.hairline}`,
              borderRadius: 6,
              background: COLORS.paper,
              color: COLORS.ink,
              fontSize: 13,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)}
            onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.paper)}
          >
            <Share2 size={14} /> Share
          </button>
          {shareOpen && <SharePopover issue={issue} onClose={() => setShareOpen(false)} onShare={onShare} />}
        </div>

        <button
          onClick={onOpen}
          style={{
            padding: "9px 12px",
            background: "transparent",
            color: COLORS.authority,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          View →
        </button>
      </div>
    </article>
  );
}

function CategoryBadge({ category, small }) {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: small ? "2px 8px" : "3px 10px",
        borderRadius: 4,
        background: style.bg,
        color: style.fg,
        fontSize: small ? 11 : 12,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: style.dot }} />
      {category}
    </span>
  );
}

function VoteButton({ kind, count, active, disabled, onClick }) {
  const isUp = kind === "up";
  const base = {
    padding: "9px 12px",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontVariantNumeric: "tabular-nums",
    transition: "all 150ms ease",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled && !active ? 0.55 : 1,
  };
  const activeStyle = isUp
    ? { background: COLORS.community, color: "white", border: `1px solid ${COLORS.community}` }
    : { background: "#FEE2E2", color: COLORS.error, border: `1px solid #FCA5A5` };
  const inactiveStyle = {
    background: COLORS.paper,
    color: COLORS.ink,
    border: `1px solid ${COLORS.hairline}`,
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={isUp ? "Upvote" : "Downvote"}
      style={{ ...base, ...(active ? activeStyle : inactiveStyle) }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = isUp ? COLORS.community : "#FEE2E2";
        e.currentTarget.style.color = isUp ? "white" : COLORS.error;
      }}
      onMouseLeave={(e) => {
        if (active || disabled) return;
        e.currentTarget.style.background = COLORS.paper;
        e.currentTarget.style.color = COLORS.ink;
      }}
    >
      {isUp ? <ArrowUp size={14} strokeWidth={2.5} /> : <ArrowDown size={14} strokeWidth={2.5} />}
      {count}
    </button>
  );
}

function SharePopover({ issue, onClose, onShare }) {
  const ref = useRef();
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  const url = `https://iwcommunityvoice.com/issue/${issue.id}`;
  const text = encodeURIComponent(`${issue.title} — Inner West Community Voice`);
  const shareUrl = encodeURIComponent(url);

  const items = [
    { icon: <Twitter size={14} />, label: "Twitter", href: `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}` },
    { icon: <Facebook size={14} />, label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { icon: <MessageCircle size={14} />, label: "WhatsApp", href: `https://wa.me/?text=${text}%20${shareUrl}` },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "calc(100% + 6px)",
        right: 0,
        background: COLORS.paper,
        border: `1px solid ${COLORS.hairline}`,
        borderRadius: 8,
        boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
        padding: 6,
        zIndex: 10,
        minWidth: 170,
        animation: "fadeIn 150ms ease",
      }}
    >
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 12px",
            borderRadius: 4,
            fontSize: 13,
            color: COLORS.ink,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {it.icon}
          {it.label}
        </a>
      ))}
      <button
        onClick={() => {
          onShare(issue);
          onClose();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 12px",
          borderRadius: 4,
          fontSize: 13,
          color: COLORS.ink,
          width: "100%",
          textAlign: "left",
          borderTop: `1px solid ${COLORS.hairline}`,
          marginTop: 2,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <Link2 size={14} /> Copy link
      </button>
    </div>
  );
}

function shareIssue(issue, showToast) {
  const url = `https://iwcommunityvoice.com/issue/${issue.id}`;
  try {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(url);
    }
  } catch {}
  showToast("Link copied to clipboard", "success");
}

// ────────────────────────────────────────────────────────────────────────────
// ISSUE DETAIL PAGE
// ────────────────────────────────────────────────────────────────────────────
function IssueDetailPage({ issue, comments, onBack, onVote, userVote, onComment, onSignup, hasSignedUp, onShare }) {
  const pct = Math.min(100, (issue.vote_count / ESCALATION_THRESHOLD) * 100);

  return (
    <main style={{ paddingBottom: 100 }}>
      {/* Header strip */}
      <div style={{ background: COLORS.paper, borderBottom: `1px solid ${COLORS.hairline}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
          <button
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: COLORS.slate,
              fontSize: 13,
              fontWeight: 500,
              padding: "6px 0",
              marginBottom: 20,
            }}
          >
            <ArrowLeft size={14} /> All issues
          </button>

          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
            <CategoryBadge category={issue.category} />
            <span style={{ fontSize: 13, color: COLORS.slate }}>
              <MapPin size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 3 }} />
              {issue.suburb}
            </span>
            <span style={{ fontSize: 13, color: COLORS.slate }}>· Posted {timeAgo(issue.created_at)}</span>
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 500,
              lineHeight: 1.12,
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
              color: COLORS.ink,
            }}
          >
            {issue.title}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {/* Progress panel */}
        <section
          style={{
            background: COLORS.paper,
            border: `1px solid ${COLORS.hairline}`,
            borderRadius: 12,
            padding: 24,
            marginBottom: 28,
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div className="serif" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em", color: COLORS.ink }}>
                {issue.vote_count.toLocaleString()}
                <span style={{ color: COLORS.slate, fontWeight: 500, fontSize: 20 }}> / {ESCALATION_THRESHOLD}</span>
              </div>
              <div style={{ fontSize: 13, color: COLORS.slate, marginTop: 4 }}>
                verified community supporters
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: issue.escalated ? COLORS.success : COLORS.community }}>
              {issue.escalated ? "✓ Sent to Council" : `${Math.round(pct)}% to escalate`}
            </div>
          </div>

          <div
            style={{
              height: 10,
              background: COLORS.mist,
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                background: issue.escalated
                  ? COLORS.success
                  : `linear-gradient(90deg, ${COLORS.authority} 0%, ${COLORS.community} 100%)`,
                borderRadius: 10,
                transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <VoteButton
              kind="up"
              count={issue.vote_count}
              active={userVote === "up"}
              disabled={!!userVote}
              onClick={() => onVote(issue.id, "up")}
            />
            <VoteButton
              kind="down"
              count={issue.down_count}
              active={userVote === "down"}
              disabled={!!userVote}
              onClick={() => onVote(issue.id, "down")}
            />
            <button
              onClick={() => onShare(issue)}
              style={{
                padding: "9px 14px",
                border: `1px solid ${COLORS.hairline}`,
                borderRadius: 6,
                background: COLORS.paper,
                fontSize: 13,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: COLORS.ink,
              }}
            >
              <Share2 size={14} /> Share
            </button>
          </div>
        </section>

        {/* Escalation banner */}
        {issue.escalated && <EscalationBanner issue={issue} />}

        {/* Description */}
        <section style={{ marginBottom: 36 }}>
          <h2
            className="serif"
            style={{ fontSize: 22, fontWeight: 600, margin: "0 0 12px", letterSpacing: "-0.015em" }}
          >
            What's happening
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: COLORS.ink,
              margin: 0,
              maxWidth: "68ch",
            }}
          >
            {issue.description}
          </p>
        </section>

        {/* Signup form (if not escalated) */}
        {!issue.escalated && !hasSignedUp && <SignupForm onSignup={onSignup} />}

        {hasSignedUp && !issue.escalated && (
          <div
            style={{
              padding: "16px 20px",
              background: "#E6F4EA",
              border: `1px solid #A7D7BA`,
              borderRadius: 10,
              marginBottom: 36,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <CheckCircle2 size={20} color={COLORS.success} />
            <div>
              <div style={{ fontWeight: 600, color: COLORS.success }}>You're a verified supporter</div>
              <div style={{ fontSize: 13, color: COLORS.slate, marginTop: 2 }}>
                Your name and postcode will appear on the formal Council submission once this issue hits {ESCALATION_THRESHOLD}.
              </div>
            </div>
          </div>
        )}

        {/* Comments */}
        <section>
          <h2
            className="serif"
            style={{ fontSize: 22, fontWeight: 600, margin: "0 0 16px", letterSpacing: "-0.015em" }}
          >
            Community discussion
            <span style={{ fontSize: 14, color: COLORS.slate, fontWeight: 400, marginLeft: 8 }}>
              ({comments.length})
            </span>
          </h2>

          <CommentForm onSubmit={onComment} />

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {comments.length === 0 && (
              <div style={{ fontSize: 14, color: COLORS.slate, padding: "16px 0" }}>
                No comments yet. Be the first to weigh in.
              </div>
            )}
            {comments.map((c) => (
              <CommentCard key={c.id} comment={c} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function EscalationBanner({ issue }) {
  return (
    <section
      style={{
        position: "relative",
        marginBottom: 36,
        borderRadius: 12,
        overflow: "hidden",
        borderLeft: `4px solid ${COLORS.success}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${TEXTURE_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.22,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(120deg, #E6F4EA 40%, #C8E6CE 100%)`,
          mixBlendMode: "multiply",
        }}
      />
      <div style={{ position: "relative", padding: "26px 28px", color: COLORS.communityDeep }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: COLORS.success,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CheckCircle2 size={22} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: COLORS.success,
              }}
            >
              Escalated to Council
            </div>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, margin: "4px 0 10px", letterSpacing: "-0.015em" }}>
              Formal submission sent to Inner West Council
            </h3>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: "#2F5237" }}>
              <div><strong>Sent:</strong> {new Date(issue.escalated_at || Date.now()).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}</div>
              <div><strong>Recipients:</strong> planning@innerwestcouncil.nsw.gov.au · customer.service@innerwestcouncil.nsw.gov.au</div>
              <div><strong>Supporters:</strong> {issue.vote_count.toLocaleString()} verified residents</div>
            </div>
            <button
              style={{
                marginTop: 14,
                padding: "8px 14px",
                background: "white",
                border: `1px solid ${COLORS.success}`,
                borderRadius: 6,
                color: COLORS.success,
                fontSize: 13,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <FileText size={14} /> View submission letter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignupForm({ onSignup }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!name.trim()) e.name = "Name required";
    if (!/^\d{4}$/.test(postcode)) e.postcode = "4-digit postcode";
    else {
      const pc = parseInt(postcode, 10);
      if (pc < 2000 || pc > 2770) e.postcode = "Sydney postcode (2000–2770)";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    onSignup({ email, name, postcode });
  }

  return (
    <section
      style={{
        marginBottom: 36,
        padding: 24,
        background: COLORS.paper,
        border: `1px solid ${COLORS.hairline}`,
        borderRadius: 12,
        borderTop: `3px solid ${COLORS.community}`,
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 700,
          color: COLORS.community,
          marginBottom: 8,
        }}
      >
        <Users size={12} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
        Help escalate this issue
      </div>
      <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, margin: "0 0 8px", letterSpacing: "-0.015em" }}>
        Become a verified supporter
      </h3>
      <p style={{ fontSize: 14, color: COLORS.slate, margin: "0 0 20px", lineHeight: 1.55 }}>
        Your email and postcode verify you're a real Inner West resident. Council sees verified names on the submission.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={errors.email ? errorInputStyle : undefined}
          />
          {errors.email && <div style={errorTextStyle}>{errors.email}</div>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First + last"
              style={errors.name ? errorInputStyle : undefined}
            />
            {errors.name && <div style={errorTextStyle}>{errors.name}</div>}
          </div>
          <div>
            <label style={labelStyle}>Postcode</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.replace(/\D/g, ""))}
              placeholder="2040"
              style={errors.postcode ? errorInputStyle : undefined}
            />
            {errors.postcode && <div style={errorTextStyle}>{errors.postcode}</div>}
          </div>
        </div>
        <button
          type="submit"
          style={{
            marginTop: 4,
            padding: "12px 18px",
            background: COLORS.community,
            color: "white",
            fontWeight: 600,
            borderRadius: 6,
            fontSize: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            justifySelf: "start",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.communityDeep)}
          onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.community)}
        >
          <Send size={14} /> Sign me up
        </button>
      </form>
    </section>
  );
}

const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: COLORS.slate, marginBottom: 6, letterSpacing: "0.02em" };
const errorInputStyle = { borderColor: COLORS.error, boxShadow: `0 0 0 3px rgba(220,38,38,0.08)` };
const errorTextStyle = { fontSize: 12, color: COLORS.error, marginTop: 4 };

function CommentForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ name, text: text.trim(), anonymous });
    setName("");
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: COLORS.paper,
        border: `1px solid ${COLORS.hairline}`,
        borderRadius: 10,
        padding: 16,
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, 300))}
        placeholder="Share your perspective…"
        rows={3}
        style={{ resize: "vertical" }}
      />
      <div style={{ fontSize: 11, color: COLORS.slate, marginTop: 4, textAlign: "right" }}>
        {text.length} / 300
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
        {!anonymous && (
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ maxWidth: 220 }}
          />
        )}
        <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: COLORS.slate, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            style={{ width: "auto", padding: 0 }}
          />
          Post anonymously
        </label>
        <button
          type="submit"
          disabled={!text.trim()}
          style={{
            marginLeft: "auto",
            padding: "9px 14px",
            background: text.trim() ? COLORS.authority : COLORS.slate,
            color: "white",
            fontWeight: 600,
            borderRadius: 6,
            fontSize: 13,
            cursor: text.trim() ? "pointer" : "not-allowed",
            opacity: text.trim() ? 1 : 0.55,
          }}
        >
          Post comment
        </button>
      </div>
    </form>
  );
}

function CommentCard({ comment }) {
  return (
    <div
      style={{
        background: COLORS.paper,
        border: `1px solid ${COLORS.hairline}`,
        borderRadius: 10,
        padding: "14px 16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>
          {comment.anonymous || !comment.name ? "Anonymous" : comment.name}
        </span>
        <span style={{ fontSize: 12, color: COLORS.slate }}>· {timeAgo(comment.created_at)}</span>
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: COLORS.ink }}>{comment.text}</p>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// POST ISSUE MODAL
// ────────────────────────────────────────────────────────────────────────────
function PostIssueModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [suburb, setSuburb] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Title required";
    if (title.length > 100) e.title = "Max 100 characters";
    if (!description.trim()) e.description = "Description required";
    if (description.length > 500) e.description = "Max 500 characters";
    if (!category) e.category = "Choose a category";
    if (!suburb) e.suburb = "Choose a suburb";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({ title: title.trim(), description: description.trim(), category, suburb, anonymous });
    }, 400);
  }

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(6,37,71,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 16px",
        overflowY: "auto",
        animation: "fadeIn 200ms ease",
      }}
      onClick={onClose}
    >
      {/* How it works — 4-step onboarding banner */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.mist,
          borderRadius: 10,
          padding: "12px 20px",
          maxWidth: 580,
          width: "100%",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {[
          "Post your issue",
          "Share with neighbors",
          "Reach 250 votes",
          "Council escalation + response",
        ].map((label, i, arr) => (
          <React.Fragment key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  background: COLORS.authority,
                  color: "white",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 13, color: COLORS.authority, fontWeight: 500 }}>{label}</span>
            </div>
            {i < arr.length - 1 && (
              <span style={{ color: COLORS.authority, opacity: 0.4, fontSize: 13 }}>›</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: COLORS.paper,
          borderRadius: 14,
          padding: 28,
          maxWidth: 580,
          width: "100%",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          animation: "cardEnter 300ms ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: COLORS.community,
                marginBottom: 4,
              }}
            >
              New issue
            </div>
            <h2
              className="serif"
              style={{ fontSize: 26, fontWeight: 600, margin: 0, letterSpacing: "-0.02em" }}
            >
              Raise an issue for Inner West
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              padding: 6,
              color: COLORS.slate,
              borderRadius: 6,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X size={20} />
          </button>
        </div>
        <p style={{ fontSize: 14, color: COLORS.slate, margin: "0 0 20px", lineHeight: 1.55 }}>
          Be specific. Good issues include what's happening, who's affected, and what you're asking Council to do.
        </p>

        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 100))}
              placeholder="e.g. Marrickville station flooding"
              style={errors.title ? errorInputStyle : undefined}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              {errors.title ? <div style={errorTextStyle}>{errors.title}</div> : <span />}
              <div style={{ fontSize: 11, color: COLORS.slate }}>{title.length} / 100</div>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
              placeholder="What's happening? Why does it matter? What should Council do?"
              style={errors.description ? { ...errorInputStyle, resize: "vertical" } : undefined}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              {errors.description ? <div style={errorTextStyle}>{errors.description}</div> : <span />}
              <div style={{ fontSize: 11, color: COLORS.slate }}>{description.length} / 500</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Suburb</label>
              <select
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                style={errors.suburb ? errorInputStyle : undefined}
              >
                <option value="">Choose…</option>
                {SUBURBS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.suburb && <div style={errorTextStyle}>{errors.suburb}</div>}
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={errors.category ? errorInputStyle : undefined}
              >
                <option value="">Choose…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <div style={errorTextStyle}>{errors.category}</div>}
            </div>
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              background: COLORS.mist,
              borderRadius: 8,
              fontSize: 14,
              color: COLORS.ink,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              style={{ width: "auto", padding: 0 }}
            />
            <div>
              <div style={{ fontWeight: 600 }}>Post anonymously</div>
              <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 2 }}>
                Your name won't appear on the issue. Verified supporters (250+) always use their real names on the Council submission.
              </div>
            </div>
          </label>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "12px 18px",
              background: COLORS.paper,
              border: `1px solid ${COLORS.hairline}`,
              borderRadius: 6,
              color: COLORS.ink,
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "12px 20px",
              background: submitting ? COLORS.slate : COLORS.community,
              color: "white",
              fontWeight: 600,
              borderRadius: 6,
              fontSize: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "Publishing…" : "Publish issue"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// TOAST
// ────────────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  const color =
    toast.kind === "success" ? COLORS.success :
    toast.kind === "error" ? COLORS.error :
    COLORS.authority;
  return (
    <div
      role="status"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: COLORS.ink,
        color: "white",
        padding: "12px 18px",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 500,
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        animation: "slideUp 220ms ease",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderLeft: `3px solid ${color}`,
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      {toast.kind === "success" && <CheckCircle2 size={16} color={color} />}
      {toast.message}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${COLORS.hairline}`,
        background: COLORS.paper,
        padding: "40px 24px",
        marginTop: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 24,
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Logo />
            <div className="serif" style={{ fontSize: 17, fontWeight: 600, color: COLORS.authority, letterSpacing: "-0.015em" }}>
              Community Voice
            </div>
          </div>
          <p style={{ fontSize: 13, color: COLORS.slate, lineHeight: 1.6, margin: 0 }}>
            An independent, non-partisan community organising platform for Inner West Sydney residents.
            Not affiliated with any political party or Council department.
          </p>
        </div>

        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", fontSize: 13 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.slate, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Platform
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <a href="#" style={{ color: COLORS.ink }}>All issues</a>
              <a href="#" style={{ color: COLORS.ink }}>How it works</a>
              <a href="#" style={{ color: COLORS.ink }}>Escalation log</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.slate, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Trust
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <a href="#" style={{ color: COLORS.ink }}>Privacy</a>
              <a href="#" style={{ color: COLORS.ink }}>Terms</a>
              <a href="#" style={{ color: COLORS.ink }}>Contact Council</a>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1180,
          margin: "32px auto 0",
          paddingTop: 20,
          borderTop: `1px solid ${COLORS.hairline}`,
          fontSize: 12,
          color: COLORS.slate,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>© 2025 Inner West Community Voice</span>
        <span>Built for residents. Free forever. No ads.</span>
      </div>
    </footer>
  );
}
