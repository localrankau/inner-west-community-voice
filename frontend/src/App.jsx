import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  ArrowUp, ArrowDown, Share2, MessageCircle, Link2, Search, X,
  CheckCircle2, MapPin, Tag, Plus, ArrowLeft, Send, Flame, Users,
  Trash2, UserCircle, BookOpen, Info, ChevronRight, Clock, FileText,
  Shield, HelpCircle,
} from "lucide-react";

function TwitterIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function FacebookIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

import { supabase } from "./supabase.js";

// ────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
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

const HERO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/2019-04-10_ANZAC_Bridge.jpg/1920px-2019-04-10_ANZAC_Bridge.jpg";
const TEXTURE_IMAGE =
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2400&q=80";

const RALLY_IDEAS = [
  {
    icon: "🚗",
    title: "Get parking limits on your street",
    blurb: "Tired of commuters blocking your driveway? Rally residents and make Council act.",
    category: "Transport",
    gradient: `linear-gradient(145deg, #0B3A66 0%, #1a5280 100%)`,
    glow: "rgba(11,58,102,0.3)",
  },
  {
    icon: "🚦",
    title: "Make a dangerous road safer",
    blurb: "Speed cameras. Humps. Crossings. Build the community case that forces Council's hand.",
    category: "Transport",
    gradient: `linear-gradient(145deg, #C2610A 0%, #D97706 100%)`,
    glow: "rgba(217,119,6,0.3)",
  },
  {
    icon: "🏗",
    title: "Fight a rezoning before it's approved",
    blurb: "Once the DA window closes, it's too late. Unite residents now and put your objection on record.",
    category: "Rezoning",
    gradient: `linear-gradient(145deg, #062547 0%, #0B3A66 100%)`,
    glow: "rgba(6,37,71,0.35)",
  },
  {
    icon: "🌳",
    title: "Transform a neglected park",
    blurb: "Broken equipment. No lighting. Overgrown paths. Rally locals and make Council fund the fix.",
    category: "Services",
    gradient: `linear-gradient(145deg, #1F5733 0%, #2D7A4A 100%)`,
    glow: "rgba(31,87,51,0.3)",
  },
];

const COUNCIL_STATUSES = {
  no_response: { label: "No Council Response Yet", color: COLORS.slate, bg: COLORS.mist },
  acknowledged: { label: "Acknowledged by Council", color: COLORS.authority, bg: "#E8EEF5" },
  in_progress: { label: "Under Council Review", color: "#9A4D07", bg: "#FEF3E2" },
  resolved: { label: "Matter Resolved", color: COLORS.success, bg: "#E6F4EA" },
};

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}

function getSessionId() {
  let id = localStorage.getItem("iwcv_session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("iwcv_session", id);
  }
  return id;
}

function loadStoredVotes() {
  try { return JSON.parse(localStorage.getItem("iwcv_votes") || "{}"); }
  catch { return {}; }
}
function saveVote(issueId, voteType) {
  const votes = loadStoredVotes();
  votes[issueId] = voteType;
  localStorage.setItem("iwcv_votes", JSON.stringify(votes));
}
// const EMAIL_SEQUENCE = [
//   {
//     trigger: "signup",
//     delay: 0,
//     subject: "Welcome to Inner West Pulse",
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

function loadRegisteredUser() {
  try { return JSON.parse(localStorage.getItem("iwcv_user") || "null"); }
  catch { return null; }
}

// ────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [issues, setIssues] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState({ name: "home" });
  const [showPostModal, setShowPostModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [userVotes, setUserVotes] = useState(loadStoredVotes);
  const [userSignups, setUserSignups] = useState({});
  const [registeredUser, setRegisteredUser] = useState(loadRegisteredUser);

  const sessionId = useMemo(() => getSessionId(), []);

  function showToast(message, kind = "success") {
    setToast({ message, kind, id: Date.now() });
    setTimeout(() => setToast(null), 3200);
  }

  useEffect(() => { fetchIssues(); }, []);

  // Sync auth state — fires when user clicks the magic link email
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata || {};
        const synced = {
          name: meta.name || session.user.email,
          email: session.user.email,
          postcode: meta.postcode || "",
        };
        localStorage.setItem("iwcv_user", JSON.stringify(synced));
        setRegisteredUser(synced);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Update page title on view change
  useEffect(() => {
    const titles = {
      home: "Inner West Pulse — Raise Local Issues with Council",
      "how-it-works": "How It Works — Inner West Pulse",
      about: "About Us — Inner West Pulse",
    };
    document.title = titles[view.name] || titles.home;
  }, [view.name]);

  async function fetchIssues() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("issues")
        .select("*")
        .order("vote_count", { ascending: false })
        .limit(50);
      if (error) throw error;
      setIssues(data || []);
    } catch (err) {
      setError("Could not load issues. Please refresh.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchComments(issueId) {
    if (comments[issueId]) return;
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("issue_id", issueId)
      .order("created_at", { ascending: false });
    if (data) setComments((c) => ({ ...c, [issueId]: data }));
  }

  async function handleRegister({ name, email, postcode }) {
    const user = { name, email, postcode };
    localStorage.setItem("iwcv_user", JSON.stringify(user));
    setRegisteredUser(user);
    try {
      await supabase.from("profiles").upsert(
        { session_id: sessionId, name, email, postcode },
        { onConflict: "session_id" }
      );
    } catch (err) { console.error(err); }

    // Send magic-link / welcome email via Supabase Auth
    try {
      await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: { name, postcode },
          emailRedirectTo: window.location.origin,
        },
      });
    } catch (err) { console.error("Auth OTP error:", err); }

    setShowRegisterModal(false);
    showToast(`Welcome, ${name}! Check your inbox to verify your email.`, "success");
  }

  async function handleVote(issueId, voteType) {
    if (userVotes[issueId]) {
      showToast("You've already voted on this issue", "info");
      return;
    }
    setUserVotes((v) => ({ ...v, [issueId]: voteType }));
    saveVote(issueId, voteType);
    setIssues((prev) =>
      prev.map((i) => {
        if (i.id !== issueId) return i;
        return {
          ...i,
          vote_count: voteType === "up" ? i.vote_count + 1 : i.vote_count,
          down_count: voteType === "down" ? (i.down_count || 0) + 1 : (i.down_count || 0),
        };
      })
    );
    try {
      const { error } = await supabase.from("votes").insert({
        issue_id: issueId,
        vote_type: voteType,
        session_id: sessionId,
      });
      if (error) throw error;

      const { data: updated } = await supabase
        .from("issues")
        .select("vote_count, down_count, escalated, escalated_at")
        .eq("id", issueId)
        .single();
      if (updated) setIssues((prev) => prev.map((i) => (i.id === issueId ? { ...i, ...updated } : i)));

      showToast(voteType === "up" ? "Your vote counted ⬆" : "Downvote recorded", "success");

      // Auto-capture registered user as supporter on upvote
      if (registeredUser && voteType === "up" && !userSignups[issueId]) {
        _insertSupporterSignup(issueId, registeredUser);
      }
    } catch (err) {
      setUserVotes((v) => { const n = { ...v }; delete n[issueId]; return n; });
      const stored = loadStoredVotes();
      delete stored[issueId];
      localStorage.setItem("iwcv_votes", JSON.stringify(stored));
      setIssues((prev) =>
        prev.map((i) => {
          if (i.id !== issueId) return i;
          return {
            ...i,
            vote_count: voteType === "up" ? i.vote_count - 1 : i.vote_count,
            down_count: voteType === "down" ? Math.max((i.down_count || 1) - 1, 0) : (i.down_count || 0),
          };
        })
      );
      if (err?.code === "23505") {
        showToast("You've already voted on this issue", "info");
        setUserVotes((v) => ({ ...v, [issueId]: voteType }));
        saveVote(issueId, voteType);
      } else {
        showToast("Vote failed — please try again", "error");
      }
      console.error(err);
    }
  }

  async function _insertSupporterSignup(issueId, { name, email, postcode }) {
    try {
      const { error } = await supabase.from("supporter_signups").insert({
        issue_id: issueId, email, name, postcode, postcode_verified: true,
      });
      if (!error || error.code === "23505") {
        setUserSignups((s) => ({ ...s, [issueId]: true }));
      }
    } catch (err) { console.error(err); }
  }

  async function handleCreateIssue(payload) {
    try {
      const { data, error } = await supabase
        .from("issues")
        .insert({
          title: payload.title,
          description: payload.description,
          category: payload.category,
          suburb: payload.suburb,
          vote_count: 0,
          escalated: false,
          poster_session_id: sessionId,
          poster_email: registeredUser?.email || null,
          poster_postcode: registeredUser?.postcode || null,
        })
        .select()
        .single();
      if (error) throw error;
      setIssues((prev) => [data, ...prev]);
      setShowPostModal(false);
      showToast("Issue published — start sharing to collect votes!", "success");
    } catch (err) {
      showToast("Failed to publish — please try again", "error");
      console.error(err);
      throw err;
    }
  }

  async function handleDeleteIssue(issueId) {
    if (!window.confirm("Delete this issue? This cannot be undone.")) return;
    try {
      const { error } = await supabase
        .from("issues")
        .delete()
        .eq("id", issueId)
        .eq("poster_session_id", sessionId);
      if (error) throw error;
      setIssues((prev) => prev.filter((i) => i.id !== issueId));
      if (view.name === "detail") setView({ name: "home" });
      showToast("Issue deleted", "success");
    } catch (err) {
      showToast("Delete failed — see console for details", "error");
      console.error(err);
    }
  }

  async function handleAddComment(issueId, { name, text, anonymous }) {
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          issue_id: issueId,
          commenter_name: anonymous ? null : name || null,
          comment_text: text,
          anonymous,
        })
        .select()
        .single();
      if (error) throw error;
      setComments((c) => ({ ...c, [issueId]: [data, ...(c[issueId] || [])] }));
      showToast("Comment posted", "success");
    } catch (err) {
      showToast("Comment failed — please try again", "error");
      console.error(err);
    }
  }

  async function handleSignup(issueId, { email, name, postcode }) {
    try {
      const { error } = await supabase.from("supporter_signups").insert({
        issue_id: issueId, email, name, postcode, postcode_verified: true,
      });
      if (error) {
        if (error.code === "23505") {
          showToast("You've already signed up for this issue", "info");
          setUserSignups((s) => ({ ...s, [issueId]: true }));
          return;
        }
        throw error;
      }
      setUserSignups((s) => ({ ...s, [issueId]: true }));
      if (!userVotes[issueId]) handleVote(issueId, "up");
      showToast("You're a verified supporter ✓", "success");
    } catch (err) {
      showToast("Signup failed — please try again", "error");
      console.error(err);
    }
  }

  const currentIssue = view.name === "detail" ? issues.find((i) => i.id === view.id) : null;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: COLORS.cream, minHeight: "100vh", color: COLORS.ink }}>
      <GlobalStyles />
      <TopNav
        onHome={() => setView({ name: "home" })}
        onPost={() => setShowPostModal(true)}
        onHowItWorks={() => setView({ name: "how-it-works" })}
        onAbout={() => setView({ name: "about" })}
        registeredUser={registeredUser}
        onRegister={() => setShowRegisterModal(true)}
      />

      {view.name === "home" && (
        <HomePage
          issues={issues} loading={loading} error={error} onRetry={fetchIssues}
          onOpenIssue={(id) => setView({ name: "detail", id })}
          onVote={handleVote} userVotes={userVotes}
          onPost={() => setShowPostModal(true)}
          onShare={(issue) => shareIssue(issue, showToast)}
          sessionId={sessionId}
          onDelete={handleDeleteIssue}
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
          onSignup={(payload) => handleSignup(currentIssue.id, payload)}
          hasSignedUp={!!userSignups[currentIssue.id]}
          onShare={(issue) => shareIssue(issue, showToast)}
          onFetchComments={fetchComments}
          sessionId={sessionId}
          onDelete={handleDeleteIssue}
          registeredUser={registeredUser}
        />
      )}

      {view.name === "how-it-works" && (
        <HowItWorksPage
          onBack={() => setView({ name: "home" })}
          onPost={() => setShowPostModal(true)}
        />
      )}

      {view.name === "about" && (
        <AboutPage onBack={() => setView({ name: "home" })} />
      )}

      <Footer
        onHowItWorks={() => setView({ name: "how-it-works" })}
        onAbout={() => setView({ name: "about" })}
        onHome={() => setView({ name: "home" })}
      />

      {showPostModal && (
        <PostIssueModal
          onClose={() => setShowPostModal(false)}
          onSubmit={handleCreateIssue}
          registeredUser={registeredUser}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onSubmit={handleRegister}
          existing={registeredUser}
        />
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
        font-family: inherit; font-size: 15px;
        border: 1px solid ${COLORS.hairline}; border-radius: 6px;
        padding: 11px 13px; color: ${COLORS.ink}; background: ${COLORS.paper};
        width: 100%; outline: none;
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
      button:focus-visible, a:focus-visible { outline: 2px solid ${COLORS.authority}; outline-offset: 2px; border-radius: 4px; }
      @keyframes slideUp { from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes cardEnter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    `}</style>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// TOP NAV
// ────────────────────────────────────────────────────────────────────────────
function TopNav({ onHome, onPost, onHowItWorks, onAbout, registeredUser, onRegister }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250, 248, 244, 0.92)", backdropFilter: "saturate(180%) blur(10px)", WebkitBackdropFilter: "saturate(180%) blur(10px)", borderBottom: `1px solid ${COLORS.hairline}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <button onClick={onHome} style={{ display: "flex", alignItems: "center", gap: 10, padding: 0 }}>
          <Logo />
          <div style={{ textAlign: "left", lineHeight: 1.15 }}>
            <div style={{ fontSize: 10, color: COLORS.slate, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 2 }}>Inner West</div>
            <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: COLORS.authority, letterSpacing: "-0.02em", lineHeight: 1 }}>Pulse</div>
          </div>
        </button>

        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button onClick={onHowItWorks} style={{ padding: "8px 12px", color: COLORS.slate, fontSize: 13, fontWeight: 500, borderRadius: 6, transition: "background 150ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            How it works
          </button>
          <button onClick={onAbout} style={{ padding: "8px 12px", color: COLORS.slate, fontSize: 13, fontWeight: 500, borderRadius: 6, transition: "background 150ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            About
          </button>

          {registeredUser ? (
            <button onClick={onRegister} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 12px", border: `1px solid ${COLORS.hairline}`, borderRadius: 6, fontSize: 13, fontWeight: 500, color: COLORS.authority, background: COLORS.paper, transition: "background 150ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)} onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.paper)}>
              <UserCircle size={16} /> {registeredUser.name.split(" ")[0]}
            </button>
          ) : (
            <button onClick={onRegister} style={{ padding: "8px 14px", border: `1px solid ${COLORS.authority}`, borderRadius: 6, color: COLORS.authority, fontSize: 13, fontWeight: 600, background: "transparent", transition: "all 150ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.authority; e.currentTarget.style.color = "white"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.authority; }}>
              Register
            </button>
          )}

          <button onClick={onPost} style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.community, color: "white", fontWeight: 600, padding: "10px 16px", borderRadius: 6, fontSize: 14, boxShadow: "0 1px 2px rgba(0,0,0,0.08)", transition: "background 150ms ease", marginLeft: 4 }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.communityDeep)} onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.community)}>
            <Plus size={16} strokeWidth={2.5} /> Post issue — 250 votes = council action
          </button>
        </nav>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div style={{ width: 38, height: 38, borderRadius: 9, background: `linear-gradient(145deg, ${COLORS.authority} 0%, ${COLORS.authorityDeep} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(11,58,102,0.35)", flexShrink: 0 }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M2 11 L5.5 11 L7.5 5.5 L10 16 L12.5 8 L14.5 11 L20 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="19.5" cy="11" r="2" fill={COLORS.gold} />
      </svg>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ────────────────────────────────────────────────────────────────────────────
function HomePage({ issues, loading, error, onRetry, onOpenIssue, onVote, userVotes, onPost, onShare, sessionId, onDelete }) {
  const [query, setQuery] = useState("");
  const [suburbFilter, setSuburbFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = useMemo(() => {
    return issues.filter((i) => {
      if (suburbFilter !== "All" && i.suburb !== suburbFilter) return false;
      if (categoryFilter !== "All" && i.category !== categoryFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
  }, [issues, query, suburbFilter, categoryFilter]);

  const trending = useMemo(() =>
    [...issues].sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0)).slice(0, 5),
    [issues]
  );

  const stats = useMemo(() => {
    const total = issues.reduce((n, i) => n + (i.vote_count || 0), 0);
    const escalated = issues.filter((i) => i.escalated).length;
    return { active: issues.length, supporters: total, escalated };
  }, [issues]);

  return (
    <main>
      <Hero query={query} setQuery={setQuery} stats={stats} onPost={onPost} />

      {error && (
        <div style={{ textAlign: "center", padding: "32px 24px", color: COLORS.error, fontSize: 15 }}>
          {error}{" "}
          <button onClick={onRetry} style={{ marginLeft: 8, color: COLORS.authority, fontWeight: 600, textDecoration: "underline" }}>Retry</button>
        </div>
      )}

      {!loading && !error && trending.length > 0 && (
        <Section>
          <SectionHeader eyebrow="Trending now" title="The issues gaining momentum" subtitle="Sorted by verified community support. Hit 250 and your issue goes to Council." />
          <TrendingLeaderboard issues={trending} onOpenIssue={onOpenIssue} />
        </Section>
      )}

      {!query && (
        <Section background={COLORS.cream}>
          <SectionHeader
            eyebrow="Make something happen"
            title="Your street has more power than you think."
            subtitle="250 verified neighbours = a formal Council submission. Pick an issue. Build your coalition. Force a response."
          />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}>
            {RALLY_IDEAS.map((idea, idx) => (
              <button
                key={idx}
                onClick={onPost}
                style={{
                  borderRadius: 16,
                  background: idea.gradient,
                  boxShadow: `0 4px 18px ${idea.glow}, 0 1px 3px rgba(0,0,0,0.06)`,
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  textAlign: "left",
                  position: "relative",
                  overflow: "hidden",
                  border: "none",
                  cursor: "pointer",
                  minHeight: 220,
                  transition: "transform 0.18s ease, box-shadow 0.18s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 30px ${idea.glow}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 18px ${idea.glow}, 0 1px 3px rgba(0,0,0,0.06)`; }}
              >
                {/* shine overlay */}
                <div style={{ position: "absolute", top: -50, right: -50, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

                {/* icon */}
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, position: "relative", zIndex: 1, marginBottom: 16, border: "1px solid rgba(255,255,255,0.2)" }}>
                  {idea.icon}
                </div>

                {/* text */}
                <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                  <div className="serif" style={{ fontSize: 17, fontWeight: 500, color: "white", lineHeight: 1.25, marginBottom: 8, letterSpacing: "-0.02em" }}>
                    {idea.title}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.5, marginBottom: 16 }}>
                    {idea.blurb}
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "white", background: "rgba(255,255,255,0.15)", padding: "6px 12px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.25)", letterSpacing: "0.02em" }}>
                    Post this issue →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Section>
      )}

      <Section background={COLORS.paper}>
        <SectionHeader eyebrow="All issues" title="What your neighbours are raising" subtitle="Filter by suburb or category. Every vote is tracked. Every signature is verified." />
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {issues.length > 0 && (
              <Filters suburbFilter={suburbFilter} setSuburbFilter={setSuburbFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} resultsCount={filtered.length} />
            )}
            {filtered.length === 0 ? (
              <EmptyState onPost={onPost} hasIssues={issues.length > 0} />
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginTop: 24 }}>
                {filtered.map((issue, idx) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onOpen={() => onOpenIssue(issue.id)}
                    onVote={onVote}
                    userVote={userVotes[issue.id]}
                    onShare={() => onShare(issue)}
                    index={idx}
                    sessionId={sessionId}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Section>

      <PostCTA onPost={onPost} />
    </main>
  );
}

function LoadingState() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginTop: 24 }}>
      {[1, 2, 3].map((n) => (
        <div key={n} style={{ background: COLORS.paper, borderRadius: 12, border: `1px solid ${COLORS.hairline}`, height: 260, animation: "pulse 1.5s ease infinite" }} />
      ))}
    </div>
  );
}

function Hero({ query, setQuery, stats, onPost }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: 520, display: "flex", alignItems: "center", color: "white" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center 55%", transform: "scale(1.05)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${COLORS.authorityDeep}ee 0%, ${COLORS.authority}dd 50%, ${COLORS.authority}cc 100%)` }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 20%, rgba(245,158,11,0.14), transparent 40%), radial-gradient(circle at 80% 80%, rgba(45,122,74,0.18), transparent 45%)" }} />

      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "80px 24px", width: "100%" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20, backdropFilter: "blur(8px)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.gold }} />
          Grassroots · Independent · Public
        </div>

        <h1 className="serif" style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 500, lineHeight: 1.05, margin: 0, letterSpacing: "-0.025em", maxWidth: 900 }}>
          Local issues that matter,
          <br />
          <em style={{ color: COLORS.gold, fontStyle: "italic", fontWeight: 500 }}>solved by community.</em>
        </h1>

        <p style={{ marginTop: 18, fontSize: 17, fontStyle: "italic", color: "rgba(255,255,255,0.88)", lineHeight: 1.5, maxWidth: 580, letterSpacing: "0.05px" }}>
          Think you're the only one frustrated? Discover how many neighbours feel the same — then rally them into a force Council can't ignore.
        </p>

        <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.55, maxWidth: 620, color: "rgba(255,255,255,0.75)" }}>
          Post an issue. Collect 250 verified supporters. Your concern lands on the Council desk as a formal submission — automatically.
        </p>

        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 10, background: "white", borderRadius: 10, padding: "6px 6px 6px 16px", maxWidth: 560, boxShadow: "0 12px 30px rgba(0,0,0,0.25)" }}>
          <Search size={18} color={COLORS.slate} />
          <input type="text" placeholder="Search issues…" value={query} onChange={(e) => setQuery(e.target.value)} style={{ border: "none", padding: "10px 4px", fontSize: 15, background: "transparent", color: COLORS.ink, boxShadow: "none" }} />
          <button onClick={onPost} style={{ background: COLORS.community, color: "white", fontWeight: 600, padding: "10px 16px", borderRadius: 6, fontSize: 14, whiteSpace: "nowrap" }}>Post issue</button>
        </div>

        <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20, maxWidth: 620 }}>
          <Stat number={stats.active} label="Active issues" />
          <Stat number={stats.supporters.toLocaleString()} label="Verified supporters" />
          <Stat number={stats.escalated} label="Sent to Council" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div style={{ borderLeft: `2px solid ${COLORS.gold}`, paddingLeft: 16 }}>
      <div className="serif" style={{ fontSize: 36, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em" }}>{number}</div>
      <div style={{ marginTop: 6, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{label}</div>
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
      <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: COLORS.community, marginBottom: 10 }}>{eyebrow}</div>
      <h2 className="serif" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 500, lineHeight: 1.12, margin: 0, letterSpacing: "-0.02em", color: COLORS.ink }}>{title}</h2>
      {subtitle && <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.55, color: COLORS.slate }}>{subtitle}</p>}
    </div>
  );
}

function TrendingLeaderboard({ issues, onOpenIssue }) {
  return (
    <div style={{ background: COLORS.paper, border: `1px solid ${COLORS.hairline}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
      {issues.map((issue, idx) => {
        const pct = Math.min(100, ((issue.vote_count || 0) / ESCALATION_THRESHOLD) * 100);
        return (
          <button key={issue.id} onClick={() => onOpenIssue(issue.id)}
            style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 16, alignItems: "center", padding: "18px 20px", width: "100%", textAlign: "left", borderBottom: idx === issues.length - 1 ? "none" : `1px solid ${COLORS.hairline}`, transition: "background 150ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.cream)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div className="serif" style={{ fontSize: 28, fontWeight: 500, color: idx === 0 ? COLORS.gold : COLORS.slate, fontStyle: "italic", letterSpacing: "-0.02em" }}>{String(idx + 1).padStart(2, "0")}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                <CategoryBadge category={issue.category} small />
                <span style={{ fontSize: 12, color: COLORS.slate }}><MapPin size={11} style={{ display: "inline", verticalAlign: "-1px", marginRight: 2 }} />{issue.suburb}</span>
                {issue.escalated && <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.success, display: "inline-flex", alignItems: "center", gap: 3 }}><CheckCircle2 size={12} /> Escalated</span>}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.ink, lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{issue.title}</div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 5, background: COLORS.mist, borderRadius: 10, overflow: "hidden", maxWidth: 300 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: issue.escalated ? COLORS.success : `linear-gradient(90deg, ${COLORS.authority}, ${COLORS.community})`, transition: "width 500ms cubic-bezier(0.22, 1, 0.36, 1)" }} />
                </div>
                <span style={{ fontSize: 12, color: COLORS.slate, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{issue.vote_count || 0} / {ESCALATION_THRESHOLD}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.authority, fontWeight: 600, fontSize: 13 }}>
              {idx === 0 && <Flame size={14} color={COLORS.gold} />}View →
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Filters({ suburbFilter, setSuburbFilter, categoryFilter, setCategoryFilter, resultsCount }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, padding: "14px 16px", background: COLORS.mist, border: `1px solid ${COLORS.hairline}`, borderRadius: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: COLORS.slate, fontWeight: 500 }}><MapPin size={14} /> Suburb</div>
      <select value={suburbFilter} onChange={(e) => setSuburbFilter(e.target.value)} style={{ width: "auto", padding: "8px 12px", fontSize: 13, fontWeight: 500 }}>
        <option>All</option>{SUBURBS.map((s) => <option key={s}>{s}</option>)}
      </select>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: COLORS.slate, fontWeight: 500, marginLeft: 8 }}><Tag size={14} /> Category</div>
      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ width: "auto", padding: "8px 12px", fontSize: 13, fontWeight: 500 }}>
        <option>All</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <div style={{ marginLeft: "auto", fontSize: 13, color: COLORS.slate }}>
        <strong style={{ color: COLORS.ink }}>{resultsCount}</strong> issue{resultsCount === 1 ? "" : "s"}
      </div>
    </div>
  );
}

function EmptyState({ onPost, hasIssues }) {
  return (
    <div style={{ marginTop: 32, padding: "56px 24px", textAlign: "center", background: COLORS.paper, border: `1px dashed ${COLORS.hairline}`, borderRadius: 12 }}>
      <div className="serif" style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>{hasIssues ? "No issues match your filters" : "No issues yet"}</div>
      <p style={{ color: COLORS.slate, marginBottom: 20 }}>{hasIssues ? "Try a different suburb or category." : "Be the first to raise one for your suburb."}</p>
      <button onClick={onPost} style={{ background: COLORS.community, color: "white", fontWeight: 600, padding: "12px 20px", borderRadius: 6, fontSize: 14 }}>Post issue — 250 votes = council action</button>
    </div>
  );
}

function PostCTA({ onPost }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", borderRadius: 16, margin: "0 24px 80px" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${TEXTURE_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center", filter: "saturate(0.9)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg, ${COLORS.authorityDeep}f2 0%, ${COLORS.authority}d9 60%, ${COLORS.community}c4 100%)` }} />
      <div style={{ position: "relative", padding: "56px 40px", color: "white", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: COLORS.gold, marginBottom: 10 }}>See something? Say something.</div>
          <h3 className="serif" style={{ fontSize: "clamp(26px, 3.4vw, 36px)", fontWeight: 500, margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" }}>250 verified supporters = a formal Council submission.</h3>
          <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.85)" }}>No petitions. No gatekeepers. Just your community, organised.</p>
        </div>
        <button onClick={onPost} style={{ background: COLORS.gold, color: COLORS.ink, fontWeight: 700, padding: "16px 28px", borderRadius: 8, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.25)", transition: "transform 150ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
          Post issue — 250 votes = council action <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// ISSUE CARD
// ────────────────────────────────────────────────────────────────────────────
function IssueCard({ issue, onOpen, onVote, userVote, onShare, index = 0, sessionId, onDelete }) {
  const [shareOpen, setShareOpen] = useState(false);
  const pct = Math.min(100, ((issue.vote_count || 0) / ESCALATION_THRESHOLD) * 100);
  const isOwner = issue.poster_session_id && issue.poster_session_id === sessionId;

  return (
    <article
      style={{ background: COLORS.paper, borderRadius: 12, border: `1px solid ${COLORS.hairline}`, padding: 20, display: "flex", flexDirection: "column", boxShadow: "0 1px 2px rgba(0,0,0,0.03)", transition: "transform 200ms ease, box-shadow 200ms ease", animation: `cardEnter 400ms ease ${index * 40}ms both`, position: "relative" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.03)"; }}
    >
      {isOwner && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(issue.id); }}
          title="Delete your issue"
          style={{ position: "absolute", top: 12, right: 12, padding: 6, borderRadius: 5, color: COLORS.slate, background: "transparent", transition: "all 150ms ease", zIndex: 1 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#FEE2E2"; e.currentTarget.style.color = COLORS.error; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.slate; }}
        >
          <Trash2 size={14} />
        </button>
      )}

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap", paddingRight: isOwner ? 28 : 0 }}>
        <CategoryBadge category={issue.category} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: COLORS.slate, fontWeight: 500 }}><MapPin size={12} />{issue.suburb}</span>
        {issue.escalated && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 4, background: "#E6F4EA", color: COLORS.success, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}><CheckCircle2 size={11} /> Escalated</span>
        )}
        {!issue.escalated && pct >= 70 && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 4, background: "#FEF3E2", color: "#9A4D07", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}><Flame size={11} /> Trending</span>
        )}
      </div>

      <button onClick={onOpen} style={{ textAlign: "left", padding: 0, marginBottom: 8 }}>
        <h3 className="serif" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.25, margin: 0, color: COLORS.ink, letterSpacing: "-0.01em" }}>{issue.title}</h3>
      </button>

      <p style={{ fontSize: 14, lineHeight: 1.55, color: COLORS.slate, margin: "0 0 16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{issue.description}</p>

      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink, fontVariantNumeric: "tabular-nums" }}>{(issue.vote_count || 0).toLocaleString()} <span style={{ color: COLORS.slate, fontWeight: 500 }}>/ {ESCALATION_THRESHOLD}</span></span>
          <span style={{ fontSize: 11, color: COLORS.slate, fontWeight: 500 }}>{issue.escalated ? "Sent to Council" : `${Math.round(pct)}% to escalate`}</span>
        </div>
        <div style={{ height: 6, background: COLORS.mist, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: issue.escalated ? COLORS.success : `linear-gradient(90deg, ${COLORS.authority} 0%, ${COLORS.community} 100%)`, borderRadius: 10, transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)" }} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
        <VoteButton kind="up" count={issue.vote_count || 0} active={userVote === "up"} disabled={!!userVote} onClick={() => onVote(issue.id, "up")} />
        <VoteButton kind="down" count={issue.down_count || 0} active={userVote === "down"} disabled={!!userVote} onClick={() => onVote(issue.id, "down")} />
        <div style={{ position: "relative", marginLeft: "auto" }}>
          <button onClick={() => setShareOpen((o) => !o)} style={{ padding: "9px 12px", border: `1px solid ${COLORS.hairline}`, borderRadius: 6, background: COLORS.paper, color: COLORS.ink, fontSize: 13, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6, transition: "background 150ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)} onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.paper)}>
            <Share2 size={14} /> Share
          </button>
          {shareOpen && <SharePopover issue={issue} onClose={() => setShareOpen(false)} onShare={onShare} />}
        </div>
        <button onClick={onOpen} style={{ padding: "9px 12px", background: "transparent", color: COLORS.authority, fontSize: 13, fontWeight: 600 }}>View →</button>
      </div>
    </article>
  );
}

function CategoryBadge({ category, small }) {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: small ? "2px 8px" : "3px 10px", borderRadius: 4, background: style.bg, color: style.fg, fontSize: small ? 11 : 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: style.dot }} />{category}
    </span>
  );
}

function VoteButton({ kind, count, active, disabled, onClick }) {
  const isUp = kind === "up";
  const base = { padding: "9px 12px", borderRadius: 6, fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, fontVariantNumeric: "tabular-nums", transition: "all 150ms ease", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled && !active ? 0.55 : 1 };
  const activeStyle = isUp ? { background: COLORS.community, color: "white", border: `1px solid ${COLORS.community}` } : { background: "#FEE2E2", color: COLORS.error, border: `1px solid #FCA5A5` };
  const inactiveStyle = { background: COLORS.paper, color: COLORS.ink, border: `1px solid ${COLORS.hairline}` };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...(active ? activeStyle : inactiveStyle) }}
      onMouseEnter={(e) => { if (disabled) return; e.currentTarget.style.background = isUp ? COLORS.community : "#FEE2E2"; e.currentTarget.style.color = isUp ? "white" : COLORS.error; }}
      onMouseLeave={(e) => { if (active || disabled) return; e.currentTarget.style.background = COLORS.paper; e.currentTarget.style.color = COLORS.ink; }}
    >
      {isUp ? <ArrowUp size={14} strokeWidth={2.5} /> : <ArrowDown size={14} strokeWidth={2.5} />}{count}
    </button>
  );
}

function SharePopover({ issue, onClose, onShare }) {
  const ref = useRef();
  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) onClose(); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);
  const url = `${window.location.href.split("?")[0]}?issue=${issue.id}`;
  const text = encodeURIComponent(`${issue.title} — Inner West Pulse`);
  const shareUrl = encodeURIComponent(url);
  const items = [
    { icon: <TwitterIcon size={14} />, label: "Twitter / X", href: `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}` },
    { icon: <FacebookIcon size={14} />, label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { icon: <MessageCircle size={14} />, label: "WhatsApp", href: `https://wa.me/?text=${text}%20${shareUrl}` },
  ];
  return (
    <div ref={ref} style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: COLORS.paper, border: `1px solid ${COLORS.hairline}`, borderRadius: 8, boxShadow: "0 12px 28px rgba(0,0,0,0.14)", padding: 6, zIndex: 10, minWidth: 170, animation: "fadeIn 150ms ease" }}>
      {items.map((it) => (
        <a key={it.label} href={it.href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 4, fontSize: 13, color: COLORS.ink, textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
          {it.icon}{it.label}
        </a>
      ))}
      <button onClick={() => { onShare(issue); onClose(); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 4, fontSize: 13, color: COLORS.ink, width: "100%", textAlign: "left", borderTop: `1px solid ${COLORS.hairline}`, marginTop: 2 }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        <Link2 size={14} /> Copy link
      </button>
    </div>
  );
}

function shareIssue(issue, showToast) {
  const url = `${window.location.href.split("?")[0]}?issue=${issue.id}`;
  try { if (navigator?.clipboard?.writeText) navigator.clipboard.writeText(url); } catch {}
  showToast("Link copied to clipboard", "success");
}

// ────────────────────────────────────────────────────────────────────────────
// ISSUE DETAIL PAGE
// ────────────────────────────────────────────────────────────────────────────
function IssueDetailPage({ issue, comments, onBack, onVote, userVote, onComment, onSignup, hasSignedUp, onShare, onFetchComments, sessionId, onDelete, registeredUser }) {
  const pct = Math.min(100, ((issue.vote_count || 0) / ESCALATION_THRESHOLD) * 100);
  const isOwner = issue.poster_session_id && issue.poster_session_id === sessionId;

  useEffect(() => {
    if (onFetchComments) onFetchComments(issue.id);
    window.scrollTo(0, 0);
  }, [issue.id]);

  return (
    <main style={{ paddingBottom: 100 }}>
      <div style={{ background: COLORS.paper, borderBottom: `1px solid ${COLORS.hairline}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: COLORS.slate, fontSize: 13, fontWeight: 500, padding: "6px 0" }}>
              <ArrowLeft size={14} /> All issues
            </button>
            {isOwner && (
              <button
                onClick={() => onDelete(issue.id)}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 6, border: `1px solid #FCA5A5`, color: COLORS.error, fontSize: 13, fontWeight: 500, background: "#FFF5F5", transition: "all 150ms ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FEE2E2"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#FFF5F5"; }}
              >
                <Trash2 size={14} /> Delete issue
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
            <CategoryBadge category={issue.category} />
            <span style={{ fontSize: 13, color: COLORS.slate }}><MapPin size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 3 }} />{issue.suburb}</span>
            <span style={{ fontSize: 13, color: COLORS.slate }}>· Posted {timeAgo(issue.created_at)}</span>
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, lineHeight: 1.12, margin: "0 0 24px", letterSpacing: "-0.02em", color: COLORS.ink }}>{issue.title}</h1>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {/* Progress panel */}
        <section style={{ background: COLORS.paper, border: `1px solid ${COLORS.hairline}`, borderRadius: 12, padding: 24, marginBottom: 28, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div className="serif" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em", color: COLORS.ink }}>
                {(issue.vote_count || 0).toLocaleString()}<span style={{ color: COLORS.slate, fontWeight: 500, fontSize: 20 }}> / {ESCALATION_THRESHOLD}</span>
              </div>
              <div style={{ fontSize: 13, color: COLORS.slate, marginTop: 4 }}>verified community supporters</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: issue.escalated ? COLORS.success : COLORS.community }}>
              {issue.escalated ? "✓ Sent to Council" : `${Math.round(pct)}% to escalate`}
            </div>
          </div>
          <div style={{ height: 10, background: COLORS.mist, borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: issue.escalated ? COLORS.success : `linear-gradient(90deg, ${COLORS.authority} 0%, ${COLORS.community} 100%)`, borderRadius: 10, transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)" }} />
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <VoteButton kind="up" count={issue.vote_count || 0} active={userVote === "up"} disabled={!!userVote} onClick={() => onVote(issue.id, "up")} />
            <VoteButton kind="down" count={issue.down_count || 0} active={userVote === "down"} disabled={!!userVote} onClick={() => onVote(issue.id, "down")} />
            <button onClick={() => onShare(issue)} style={{ padding: "9px 14px", border: `1px solid ${COLORS.hairline}`, borderRadius: 6, background: COLORS.paper, fontSize: 13, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6, color: COLORS.ink }}>
              <Share2 size={14} /> Share
            </button>
          </div>
        </section>

        {/* Council response section */}
        <CouncilStatusSection issue={issue} />

        {issue.escalated && <EscalationBanner issue={issue} />}

        <section style={{ marginBottom: 36 }}>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 600, margin: "0 0 12px", letterSpacing: "-0.015em" }}>What's happening</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: COLORS.ink, margin: 0, whiteSpace: "pre-wrap" }}>{issue.description}</p>
        </section>

        {!issue.escalated && !hasSignedUp && (
          <SignupForm onSignup={onSignup} registeredUser={registeredUser} />
        )}

        {hasSignedUp && !issue.escalated && (
          <div style={{ padding: "16px 20px", background: "#E6F4EA", border: `1px solid #A7D7BA`, borderRadius: 10, marginBottom: 36, display: "flex", alignItems: "center", gap: 12 }}>
            <CheckCircle2 size={20} color={COLORS.success} />
            <div>
              <div style={{ fontWeight: 600, color: COLORS.success }}>You're a verified supporter</div>
              <div style={{ fontSize: 13, color: COLORS.slate, marginTop: 2 }}>Your name and postcode will appear on the formal Council submission once this issue hits {ESCALATION_THRESHOLD}.</div>
            </div>
          </div>
        )}

        <section>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 600, margin: "0 0 16px", letterSpacing: "-0.015em" }}>
            Community discussion <span style={{ fontSize: 14, color: COLORS.slate, fontWeight: 400, marginLeft: 8 }}>({comments.length})</span>
          </h2>
          <CommentForm onSubmit={onComment} />
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {comments.length === 0 && <div style={{ fontSize: 14, color: COLORS.slate, padding: "16px 0" }}>No comments yet. Be the first to weigh in.</div>}
            {comments.map((c) => <CommentCard key={c.id} comment={c} />)}
          </div>
        </section>
      </div>
    </main>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// COUNCIL STATUS SECTION
// ────────────────────────────────────────────────────────────────────────────
function CouncilStatusSection({ issue }) {
  const status = issue.council_status || "no_response";
  const cfg = COUNCIL_STATUSES[status] || COUNCIL_STATUSES.no_response;

  return (
    <section style={{ marginBottom: 28, padding: "20px 24px", background: cfg.bg, border: `1px solid ${COLORS.hairline}`, borderRadius: 12, borderLeft: `4px solid ${cfg.color}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: issue.council_response ? 12 : 0 }}>
        <Clock size={16} color={cfg.color} />
        <div style={{ fontSize: 13, fontWeight: 700, color: cfg.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>Council Response</div>
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: cfg.color, color: "white" }}>{cfg.label}</span>
      </div>
      {issue.council_response ? (
        <div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: COLORS.ink }}>{issue.council_response}</p>
          {issue.council_responded_at && (
            <div style={{ marginTop: 8, fontSize: 12, color: COLORS.slate }}>
              Responded: {new Date(issue.council_responded_at).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          )}
        </div>
      ) : (
        <p style={{ margin: 0, fontSize: 13, color: COLORS.slate, lineHeight: 1.55 }}>
          No formal response from Inner West Council yet. Once this issue reaches 250 supporters, a submission is automatically sent and Council is required to respond.
        </p>
      )}
    </section>
  );
}

function EscalationBanner({ issue }) {
  return (
    <section style={{ position: "relative", marginBottom: 36, borderRadius: 12, overflow: "hidden", borderLeft: `4px solid ${COLORS.success}` }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${TEXTURE_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.22 }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, #E6F4EA 40%, #C8E6CE 100%)`, mixBlendMode: "multiply" }} />
      <div style={{ position: "relative", padding: "26px 28px", color: COLORS.communityDeep }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.success, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CheckCircle2 size={22} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, color: COLORS.success }}>Escalated to Council</div>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, margin: "4px 0 10px", letterSpacing: "-0.015em" }}>Formal submission sent to Inner West Council</h3>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: "#2F5237" }}>
              <div><strong>Sent:</strong> {new Date(issue.escalated_at || Date.now()).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}</div>
              <div><strong>Recipients:</strong> planning@innerwestcouncil.nsw.gov.au</div>
              <div><strong>Supporters:</strong> {(issue.vote_count || 0).toLocaleString()} verified residents</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignupForm({ onSignup, registeredUser }) {
  const [email, setEmail] = useState(registeredUser?.email || "");
  const [name, setName] = useState(registeredUser?.name || "");
  const [postcode, setPostcode] = useState(registeredUser?.postcode || "");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const prefilled = !!registeredUser;

  function validate() {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!name.trim()) e.name = "Name required";
    if (!/^\d{4}$/.test(postcode)) e.postcode = "4-digit postcode";
    else { const pc = parseInt(postcode, 10); if (pc < 2000 || pc > 2770) e.postcode = "Sydney postcode (2000–2770)"; }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try { await onSignup({ email, name, postcode }); } finally { setSubmitting(false); }
  }

  return (
    <section style={{ marginBottom: 36, padding: 24, background: COLORS.paper, border: `1px solid ${COLORS.hairline}`, borderRadius: 12, borderTop: `3px solid ${COLORS.community}` }}>
      <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, color: COLORS.community, marginBottom: 8 }}>
        <Users size={12} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />Help escalate this issue
      </div>
      <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, margin: "0 0 8px", letterSpacing: "-0.015em" }}>Become a verified supporter</h3>
      {prefilled ? (
        <p style={{ fontSize: 14, color: COLORS.slate, margin: "0 0 16px", lineHeight: 1.55 }}>
          Signing as <strong>{registeredUser.name}</strong> ({registeredUser.postcode}). Your details are pre-filled from your registration.
        </p>
      ) : (
        <p style={{ fontSize: 14, color: COLORS.slate, margin: "0 0 20px", lineHeight: 1.55 }}>Your email and postcode verify you're a real Inner West resident. Council sees verified names on the submission.</p>
      )}
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={errors.email ? errorInputStyle : undefined} />
          {errors.email && <div style={errorTextStyle}>{errors.email}</div>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First + last" style={errors.name ? errorInputStyle : undefined} />
            {errors.name && <div style={errorTextStyle}>{errors.name}</div>}
          </div>
          <div>
            <label style={labelStyle}>Postcode</label>
            <input type="text" inputMode="numeric" maxLength={4} value={postcode} onChange={(e) => setPostcode(e.target.value.replace(/\D/g, ""))} placeholder="2040" style={errors.postcode ? errorInputStyle : undefined} />
            {errors.postcode && <div style={errorTextStyle}>{errors.postcode}</div>}
          </div>
        </div>
        <button type="submit" disabled={submitting} style={{ marginTop: 4, padding: "12px 18px", background: submitting ? COLORS.slate : COLORS.community, color: "white", fontWeight: 600, borderRadius: 6, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8, justifySelf: "start", cursor: submitting ? "not-allowed" : "pointer" }} onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = COLORS.communityDeep; }} onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.background = COLORS.community; }}>
          <Send size={14} /> {submitting ? "Signing up…" : "Sign me up"}
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
    setName(""); setText("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: COLORS.paper, border: `1px solid ${COLORS.hairline}`, borderRadius: 10, padding: 16 }}>
      <textarea value={text} onChange={(e) => setText(e.target.value.slice(0, 300))} placeholder="Share your perspective…" rows={3} style={{ resize: "vertical" }} />
      <div style={{ fontSize: 11, color: COLORS.slate, marginTop: 4, textAlign: "right" }}>{text.length} / 300</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
        {!anonymous && <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={{ maxWidth: 220 }} />}
        <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: COLORS.slate, cursor: "pointer" }}>
          <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} style={{ width: "auto", padding: 0 }} />
          Post anonymously
        </label>
        <button type="submit" disabled={!text.trim()} style={{ marginLeft: "auto", padding: "9px 14px", background: text.trim() ? COLORS.authority : COLORS.slate, color: "white", fontWeight: 600, borderRadius: 6, fontSize: 13, cursor: text.trim() ? "pointer" : "not-allowed", opacity: text.trim() ? 1 : 0.55 }}>
          Post comment
        </button>
      </div>
    </form>
  );
}

function CommentCard({ comment }) {
  return (
    <div style={{ background: COLORS.paper, border: `1px solid ${COLORS.hairline}`, borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>{comment.anonymous || (!comment.commenter_name && !comment.name) ? "Anonymous" : (comment.commenter_name || comment.name)}</span>
        <span style={{ fontSize: 12, color: COLORS.slate }}>· {timeAgo(comment.created_at)}</span>
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: COLORS.ink }}>{comment.comment_text || comment.text}</p>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// REGISTER MODAL
// ────────────────────────────────────────────────────────────────────────────
function RegisterModal({ onClose, onSubmit, existing }) {
  const [name, setName] = useState(existing?.name || "");
  const [email, setEmail] = useState(existing?.email || "");
  const [postcode, setPostcode] = useState(existing?.postcode || "");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!/^\d{4}$/.test(postcode)) e.postcode = "4-digit postcode";
    else { const pc = parseInt(postcode, 10); if (pc < 2000 || pc > 2770) e.postcode = "Must be a Sydney postcode (2000–2770)"; }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try { await onSubmit({ name: name.trim(), email: email.trim(), postcode }); }
    finally { setSubmitting(false); }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,37,71,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", overflowY: "auto", animation: "fadeIn 200ms ease" }} onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} style={{ background: COLORS.paper, borderRadius: 14, padding: 28, maxWidth: 480, width: "100%", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", animation: "cardEnter 300ms ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, color: COLORS.authority, marginBottom: 4 }}>
              <UserCircle size={12} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />{existing ? "Update your details" : "Register"}
            </div>
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 600, margin: 0, letterSpacing: "-0.02em" }}>
              {existing ? "Update registration" : "Join Inner West Pulse"}
            </h2>
          </div>
          <button type="button" onClick={onClose} style={{ padding: 6, color: COLORS.slate, borderRadius: 6 }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: "12px 14px", background: "#E8EEF5", borderRadius: 8, marginBottom: 20, marginTop: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <Shield size={14} color={COLORS.authority} style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: 13, color: COLORS.authority, lineHeight: 1.55 }}>
              Your email and postcode are <strong>never shown publicly</strong>. They're used to verify you're a local resident and auto-fill when you vote or post. Only included on formal Council submissions.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <label style={labelStyle}>Full name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First + last name" style={errors.name ? errorInputStyle : undefined} />
            {errors.name && <div style={errorTextStyle}>{errors.name}</div>}
          </div>
          <div>
            <label style={labelStyle}>Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={errors.email ? errorInputStyle : undefined} />
            {errors.email && <div style={errorTextStyle}>{errors.email}</div>}
          </div>
          <div>
            <label style={labelStyle}>Postcode</label>
            <input type="text" inputMode="numeric" maxLength={4} value={postcode} onChange={(e) => setPostcode(e.target.value.replace(/\D/g, ""))} placeholder="e.g. 2040" style={errors.postcode ? errorInputStyle : undefined} />
            {errors.postcode && <div style={errorTextStyle}>{errors.postcode}</div>}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
          <button type="button" onClick={onClose} style={{ padding: "12px 18px", background: COLORS.paper, border: `1px solid ${COLORS.hairline}`, borderRadius: 6, color: COLORS.ink, fontWeight: 500, fontSize: 14 }}>Cancel</button>
          <button type="submit" disabled={submitting} style={{ padding: "12px 20px", background: submitting ? COLORS.slate : COLORS.authority, color: "white", fontWeight: 600, borderRadius: 6, fontSize: 14, cursor: submitting ? "not-allowed" : "pointer" }}>
            {submitting ? "Saving…" : existing ? "Update details" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// POST ISSUE MODAL
// ────────────────────────────────────────────────────────────────────────────
function PostIssueModal({ onClose, onSubmit, registeredUser }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [suburb, setSuburb] = useState("");
  const [anonymous, setAnonymous] = useState(!registeredUser);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Title required";
    if (title.length > 100) e.title = "Max 100 characters";
    if (!description.trim()) e.description = "Description required";
    if (description.length > 5000) e.description = "Max 5000 characters";
    if (!category) e.category = "Choose a category";
    if (!suburb) e.suburb = "Choose a suburb";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try { await onSubmit({ title: title.trim(), description: description.trim(), category, suburb, anonymous }); }
    catch { /* error toast shown inside onSubmit */ }
    finally { setSubmitting(false); }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,37,71,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", overflowY: "auto", animation: "fadeIn 200ms ease" }} onClick={onClose}>
      {/* How it works — 4-step onboarding banner */}
      <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.mist, borderRadius: 10, padding: "12px 20px", maxWidth: 580, width: "100%", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
        {["Post your issue", "Share with neighbors", "Reach 250 votes", "Council escalation + response"].map((label, i, arr) => (
          <React.Fragment key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ background: COLORS.authority, color: "white", borderRadius: "50%", width: 20, height: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontSize: 13, color: COLORS.authority, fontWeight: 500 }}>{label}</span>
            </div>
            {i < arr.length - 1 && <span style={{ color: COLORS.authority, opacity: 0.4, fontSize: 13 }}>›</span>}
          </React.Fragment>
        ))}
      </div>

      <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} style={{ background: COLORS.paper, borderRadius: 14, padding: 28, maxWidth: 580, width: "100%", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", animation: "cardEnter 300ms ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, color: COLORS.community, marginBottom: 4 }}>New issue</div>
            <h2 className="serif" style={{ fontSize: 26, fontWeight: 600, margin: 0, letterSpacing: "-0.02em" }}>Raise an issue for Inner West</h2>
          </div>
          <button type="button" onClick={onClose} style={{ padding: 6, color: COLORS.slate, borderRadius: 6 }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.mist)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <X size={20} />
          </button>
        </div>

        {registeredUser && (
          <div style={{ padding: "10px 14px", background: "#E6F4EA", borderRadius: 8, marginBottom: 16, marginTop: 10, fontSize: 13, color: COLORS.communityDeep }}>
            <CheckCircle2 size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
            Posting as <strong>{registeredUser.name}</strong> · {registeredUser.postcode}
          </div>
        )}

        <p style={{ fontSize: 14, color: COLORS.slate, margin: "0 0 20px", lineHeight: 1.55 }}>Be specific. Good issues include what's happening, who's affected, and what you're asking Council to do.</p>

        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <label style={labelStyle}>Title</label>
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value.slice(0, 100)); setErrors((r) => ({ ...r, title: "" })); }} placeholder="e.g. Marrickville station flooding" style={errors.title ? errorInputStyle : undefined} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              {errors.title ? <div style={errorTextStyle}>{errors.title}</div> : <span />}
              <div style={{ fontSize: 11, color: COLORS.slate }}>{title.length} / 100</div>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea rows={5} value={description} onChange={(e) => { setDescription(e.target.value.slice(0, 5000)); setErrors((r) => ({ ...r, description: "" })); }} placeholder="What's happening? Why does it matter? What should Council do?" style={errors.description ? { ...errorInputStyle, resize: "vertical" } : { resize: "vertical" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              {errors.description ? <div style={errorTextStyle}>{errors.description}</div> : <span />}
              <div style={{ fontSize: 11, color: COLORS.slate }}>{description.length} / 5000</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Suburb</label>
              <select value={suburb} onChange={(e) => { setSuburb(e.target.value); setErrors((r) => ({ ...r, suburb: "" })); }} style={errors.suburb ? errorInputStyle : undefined}>
                <option value="">Choose…</option>{SUBURBS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.suburb && <div style={errorTextStyle}>{errors.suburb}</div>}
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={category} onChange={(e) => { setCategory(e.target.value); setErrors((r) => ({ ...r, category: "" })); }} style={errors.category ? errorInputStyle : undefined}>
                <option value="">Choose…</option>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <div style={errorTextStyle}>{errors.category}</div>}
            </div>
          </div>
          {!registeredUser && (
            <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: COLORS.mist, borderRadius: 8, fontSize: 14, color: COLORS.ink, cursor: "pointer" }}>
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} style={{ width: "auto", padding: 0 }} />
              <div>
                <div style={{ fontWeight: 600 }}>Post anonymously</div>
                <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 2 }}>Your name won't appear on the issue.</div>
              </div>
            </label>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
          <button type="button" onClick={onClose} style={{ padding: "12px 18px", background: COLORS.paper, border: `1px solid ${COLORS.hairline}`, borderRadius: 6, color: COLORS.ink, fontWeight: 500, fontSize: 14 }}>Cancel</button>
          <button type="submit" disabled={submitting} style={{ padding: "12px 20px", background: submitting ? COLORS.slate : COLORS.community, color: "white", fontWeight: 600, borderRadius: 6, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8, cursor: submitting ? "not-allowed" : "pointer" }}>
            {submitting ? "Publishing…" : "Publish issue"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// HOW IT WORKS PAGE
// ────────────────────────────────────────────────────────────────────────────
function HowItWorksPage({ onBack, onPost }) {
  const steps = [
    {
      number: "01",
      icon: <FileText size={22} color={COLORS.authority} />,
      title: "Post your issue",
      desc: "Describe what's happening in your suburb — a dangerous intersection, a rezoning proposal, a missing footpath. Add the suburb, category, and what you want Council to do. Your issue goes live instantly.",
    },
    {
      number: "02",
      icon: <Users size={22} color={COLORS.community} />,
      title: "Build community support",
      desc: "Share your issue with neighbours via WhatsApp, Facebook, or email. Anyone can vote. Verified supporters sign with their name and a Sydney postcode — confirming they're real Inner West residents.",
    },
    {
      number: "03",
      icon: <Send size={22} color={COLORS.gold} />,
      title: "Automatic Council submission",
      desc: "Reach 250 verified supporters and the platform automatically generates a formal submission to Inner West Council. It includes the issue description, full supporter list, and is sent directly to Council planning staff.",
    },
    {
      number: "04",
      icon: <CheckCircle2 size={22} color={COLORS.success} />,
      title: "Track Council's response",
      desc: "Once submitted, Council is required to formally respond. You can track the status — Acknowledged, Under Review, or Resolved — directly on the issue page. No more chasing emails into a void.",
    },
  ];

  const faqs = [
    { q: "Is it free?", a: "Yes, and it always will be. Inner West Pulse is an independent, non-commercial platform built to serve residents, not shareholders." },
    { q: "Who can post an issue?", a: "Any Inner West Sydney resident. You don't need to register to post, but registering lets your details auto-fill when you vote or sign up as a supporter." },
    { q: "Is my personal information public?", a: "No. Your email is never displayed. Your name and postcode appear on the formal Council submission only — as required for submissions to carry legal standing. The public sees issues and vote counts, not personal details." },
    { q: "What if Council doesn't respond?", a: "We track and publish non-responses. An issue with no Council response after 30 days is flagged as 'No Response' — publicly visible, creating accountability." },
    { q: "How are supporters verified?", a: "Supporters provide their name and a 4-digit Sydney postcode (2000–2770). We verify the postcode is within Greater Sydney. Email addresses prevent duplicate signups from the same person." },
    { q: "Can I post anonymously?", a: "Yes. You can post an issue without registering or providing personal details. Only verified supporter signups require a name and postcode." },
  ];

  return (
    <main style={{ paddingBottom: 100 }}>
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.authorityDeep} 0%, ${COLORS.authority} 100%)`, color: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, marginBottom: 28 }}>
            <ArrowLeft size={14} /> Back to issues
          </button>
          <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: COLORS.gold, marginBottom: 14 }}>Platform guide</div>
          <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-0.025em", maxWidth: 720 }}>
            How Inner West Pulse works
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.85)", maxWidth: 640, margin: 0 }}>
            A step-by-step guide to raising a local issue, building community support, and getting it formally heard by Inner West Council — for free, with no red tape.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: "72px 24px", background: COLORS.paper }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: COLORS.community, marginBottom: 40 }}>The process</div>
          <div style={{ display: "grid", gap: 0 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 24, paddingBottom: 48, borderBottom: i < steps.length - 1 ? `1px solid ${COLORS.hairline}` : "none", marginBottom: i < steps.length - 1 ? 48 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <div className="serif" style={{ fontSize: 42, fontWeight: 600, color: COLORS.hairline, lineHeight: 1, letterSpacing: "-0.03em" }}>{step.number}</div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.cream, border: `1px solid ${COLORS.hairline}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{step.icon}</div>
                </div>
                <div style={{ paddingTop: 6 }}>
                  <h2 className="serif" style={{ fontSize: 26, fontWeight: 600, margin: "0 0 12px", letterSpacing: "-0.015em", color: COLORS.ink }}>{step.title}</h2>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: COLORS.slate, maxWidth: "58ch" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "72px 24px", background: COLORS.cream }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: COLORS.community, marginBottom: 12 }}>Questions</div>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 500, margin: "0 0 48px", letterSpacing: "-0.02em", color: COLORS.ink }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqs.map((item, i) => (
              <div key={i} style={{ padding: "24px 0", borderBottom: i < faqs.length - 1 ? `1px solid ${COLORS.hairline}` : "none" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <HelpCircle size={18} color={COLORS.community} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", color: COLORS.ink }}>{item.q}</h3>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: COLORS.slate }}>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 24px", background: COLORS.authority, textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Ready to raise an issue?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 28 }}>
            It takes 2 minutes. Your issue could be the one that changes your street.
          </p>
          <button onClick={onPost} style={{ background: COLORS.gold, color: COLORS.ink, fontWeight: 700, padding: "16px 28px", borderRadius: 8, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 10 }}>
            Post issue — 250 votes = council action <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ────────────────────────────────────────────────────────────────────────────
function AboutPage({ onBack }) {
  return (
    <main style={{ paddingBottom: 100 }}>
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.communityDeep} 0%, ${COLORS.community} 100%)`, color: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, marginBottom: 28 }}>
            <ArrowLeft size={14} /> Back to issues
          </button>
          <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: COLORS.gold, marginBottom: 14 }}>Our mission</div>
          <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 500, lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-0.025em", maxWidth: 720 }}>
            About Inner West Pulse
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.85)", maxWidth: 640, margin: 0 }}>
            An independent, non-partisan platform built to give Inner West residents a direct, organised, and effective way to raise issues with their local Council.
          </p>
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: COLORS.paper }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* Why */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: COLORS.community, marginBottom: 12 }}>Why we built this</div>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 500, margin: "0 0 20px", letterSpacing: "-0.02em", color: COLORS.ink }}>
              Because Council meetings shouldn't be the only way to be heard
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: COLORS.slate, margin: "0 0 16px" }}>
              Inner West is one of Sydney's most diverse, dense, and engaged communities. But residents who want to raise a concern face a maze: long-form submissions, confusing portals, evening meetings that working families can't attend, and emails that disappear into inboxes never to be answered.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: COLORS.slate, margin: "0 0 16px" }}>
              Inner West Pulse changes that. Post an issue in two minutes. Build community support. Reach 250 verified residents and the platform automatically submits a formal proposal to Council — with your community's names attached, in the format Council is required to respond to.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: COLORS.slate, margin: 0 }}>
              It's democratic, transparent, and free. Always.
            </p>
          </div>

          {/* Values */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: COLORS.community, marginBottom: 12 }}>Our principles</div>
            <h2 className="serif" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 500, margin: "0 0 28px", letterSpacing: "-0.02em", color: COLORS.ink }}>What we stand for</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {[
                { icon: <Shield size={20} color={COLORS.authority} />, title: "Independent", body: "Not affiliated with Inner West Council, any political party, or commercial interests. Funded by residents, for residents." },
                { icon: <Users size={20} color={COLORS.community} />, title: "Community-led", body: "Issues are raised by residents. Priorities are set by votes. The platform serves the community, not politicians or property developers." },
                { icon: <CheckCircle2 size={20} color={COLORS.success} />, title: "Verified & accountable", body: "Every supporter is verified as a local resident. Every Council response — or non-response — is tracked and published publicly." },
                { icon: <Info size={20} color={COLORS.amber} />, title: "Transparent", body: "Our process is open. Vote counts are real. Submissions are published. We don't hide what's happening with your issues." },
              ].map((v, i) => (
                <div key={i} style={{ padding: "20px 22px", background: COLORS.cream, borderRadius: 10, border: `1px solid ${COLORS.hairline}` }}>
                  <div style={{ marginBottom: 12 }}>{v.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", color: COLORS.ink }}>{v.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: COLORS.slate }}>{v.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div style={{ marginBottom: 56, padding: "28px 32px", background: "#E8EEF5", borderRadius: 12, borderLeft: `4px solid ${COLORS.authority}` }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <Shield size={22} color={COLORS.authority} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <h2 className="serif" style={{ fontSize: 22, fontWeight: 600, margin: "0 0 12px", letterSpacing: "-0.015em", color: COLORS.ink }}>Your privacy matters</h2>
                <p style={{ margin: "0 0 10px", fontSize: 15, lineHeight: 1.65, color: COLORS.slate }}>
                  Your email address is <strong>never shown publicly</strong> — not on issue pages, not in vote counts, not anywhere visible to other users. It's used solely to prevent duplicate signups and to include in the formal Council submission (which is a legal requirement for submissions to have standing).
                </p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: COLORS.slate }}>
                  Your postcode verifies you're a Sydney resident. Your name appears on the Council submission as a verified local supporter. We do not sell, share, or market with your data. Full stop.
                </p>
              </div>
            </div>
          </div>

          {/* Council responses */}
          <div style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: COLORS.community, marginBottom: 12 }}>Accountability</div>
            <h2 className="serif" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.02em", color: COLORS.ink }}>
              How we track Council responses
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: COLORS.slate, margin: "0 0 16px" }}>
              Every escalated issue is tracked. Once a formal submission is sent, Inner West Council has a responsibility to respond. We monitor and publish each issue's status — <em>Acknowledged</em>, <em>Under Review</em>, or <em>Resolved</em> — on the issue page in real time.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: COLORS.slate, margin: 0 }}>
              Issues with no Council response after 30 days are flagged publicly. Transparency creates accountability.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// TOAST
// ────────────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  const color = toast.kind === "success" ? COLORS.success : toast.kind === "error" ? COLORS.error : COLORS.authority;
  return (
    <div role="status" style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: COLORS.ink, color: "white", padding: "12px 18px", borderRadius: 8, fontSize: 14, fontWeight: 500, boxShadow: "0 12px 30px rgba(0,0,0,0.35)", animation: "slideUp 220ms ease", zIndex: 200, display: "flex", alignItems: "center", gap: 10, borderLeft: `3px solid ${color}`, maxWidth: "calc(100vw - 32px)" }}>
      {toast.kind === "success" && <CheckCircle2 size={16} color={color} />}
      {toast.message}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────────────────────
function Footer({ onHowItWorks, onAbout, onHome }) {
  return (
    <footer style={{ borderTop: `1px solid ${COLORS.hairline}`, background: COLORS.paper, padding: "40px 24px", marginTop: 40 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
        <div style={{ maxWidth: 420 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Logo />
            <div className="serif" style={{ fontSize: 17, fontWeight: 600, color: COLORS.authority, letterSpacing: "-0.015em" }}>Community Voice</div>
          </div>
          <p style={{ fontSize: 13, color: COLORS.slate, lineHeight: 1.6, margin: 0 }}>An independent, non-partisan community organising platform for Inner West Sydney residents. Not affiliated with any political party or Council department.</p>
        </div>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", fontSize: 13 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.slate, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Platform</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={onHome} style={{ color: COLORS.ink, textAlign: "left", padding: 0, fontSize: 13 }}>All issues</button>
              <button onClick={onHowItWorks} style={{ color: COLORS.ink, textAlign: "left", padding: 0, fontSize: 13 }}>How it works</button>
              <button onClick={onAbout} style={{ color: COLORS.ink, textAlign: "left", padding: 0, fontSize: 13 }}>About us</button>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.slate, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Trust</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={onAbout} style={{ color: COLORS.ink, textAlign: "left", padding: 0, fontSize: 13 }}>Privacy</button>
              <a href="mailto:hello@innerwestvoice.com.au" style={{ color: COLORS.ink, fontSize: 13 }}>Contact</a>
              <a href="https://innerwestcouncil.nsw.gov.au" target="_blank" rel="noreferrer" style={{ color: COLORS.ink, fontSize: 13 }}>Council website</a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: "32px auto 0", paddingTop: 20, borderTop: `1px solid ${COLORS.hairline}`, fontSize: 12, color: COLORS.slate, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span>© {new Date().getFullYear()} Inner West Pulse</span>
        <span>Independent · Non-partisan · Free forever</span>
      </div>
    </footer>
  );
}
