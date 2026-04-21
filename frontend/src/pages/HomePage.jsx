import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabase'
import IssueFeed from '../components/IssueFeed'
import IssueLeaderboard from '../components/IssueLeaderboard'
import PostIssueModal from '../components/PostIssueModal'
import { useToast } from '../ToastContext'

const CATEGORIES = ['All', 'Rezoning', 'Infrastructure', 'Transport', 'Services', 'Other']
const SUBURBS = [
  'All', 'Leichhardt', 'Marrickville', 'Newtown', 'Ultimo', 'Petersham',
  'Lilyfield', 'Ashfield', 'Rozelle', 'Balmain', 'Inner West (Other)',
]

const CATEGORY_ICONS = {
  All: '🗂',
  Rezoning: '🏗',
  Infrastructure: '🔧',
  Transport: '🚌',
  Services: '🏥',
  Other: '💬',
}

const RALLY_IDEAS = [
  {
    icon: '🚗',
    title: 'Rally your street for new parking limits',
    blurb: 'Organise neighbours & petition Council together',
    category: 'Transport',
    gradient: 'linear-gradient(145deg, #0D6E68 0%, #00A896 100%)',
    glow: 'rgba(13,110,104,0.35)',
  },
  {
    icon: '🚦',
    title: 'Push Council to review a speeding hotspot',
    blurb: 'Get calming measures where it matters',
    category: 'Transport',
    gradient: 'linear-gradient(145deg, #FF5C38 0%, #FF8C42 100%)',
    glow: 'rgba(255,92,56,0.35)',
  },
  {
    icon: '🏗',
    title: 'Challenge a rezoning proposal',
    blurb: 'Unite locals before the DA closes',
    category: 'Rezoning',
    gradient: 'linear-gradient(145deg, #6B4FBB 0%, #9B7FE3 100%)',
    glow: 'rgba(107,79,187,0.35)',
  },
  {
    icon: '🌳',
    title: 'Request a revamp of your local park',
    blurb: 'Playgrounds, seating, lighting — your call',
    category: 'Services',
    gradient: 'linear-gradient(145deg, #1E7A4D 0%, #3FAE6C 100%)',
    glow: 'rgba(30,122,77,0.35)',
  },
  {
    icon: '🛤',
    title: 'Fix a pothole or broken footpath',
    blurb: 'Log the hazard, get it on the repair list',
    category: 'Infrastructure',
    gradient: 'linear-gradient(145deg, #1A2E44 0%, #3A567D 100%)',
    glow: 'rgba(26,46,68,0.35)',
  },
]

export default function HomePage() {
  const showToast = useToast()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [suburb, setSuburb] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [prefill, setPrefill] = useState(null)

  const fetchIssues = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase.from('issues').select('*')
      if (category !== 'All') query = query.eq('category', category)
      if (suburb !== 'All') query = query.eq('suburb', suburb)
      query = query.order('vote_count', { ascending: false }).limit(50)
      const { data, error } = await query
      if (error) throw error
      setIssues(data || [])
    } catch {
      showToast('Something went wrong loading issues. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [category, suburb])

  useEffect(() => { fetchIssues() }, [fetchIssues])

  const filtered = issues.filter(i => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
  })

  function handleVoteUpdate(issueId, voteType, newCount) {
    setIssues(prev => prev.map(i =>
      i.id === issueId ? { ...i, vote_count: newCount } : i
    ))
  }

  function handleCreated(newIssue) {
    setIssues(prev => [{ ...newIssue }, ...prev])
  }

  const totalVotes = issues.reduce((s, i) => s + (i.vote_count || 0), 0)
  const activeSuburbs = new Set(issues.map(i => i.suburb)).size

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', paddingBottom: '100px' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(145deg, #1A2E44 0%, #0D6E68 65%, #00A896 100%)',
        padding: '32px 20px 52px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 15% 60%, rgba(255,255,255,0.06) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '44px', marginBottom: '10px', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))' }}>🏘️</div>
          <h1 style={{
            fontSize: '26px', fontWeight: 900, color: 'white',
            letterSpacing: '-0.5px', marginBottom: '8px', lineHeight: 1.2,
          }}>
            Inner West Community Voice
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '14px' }}>
            Vote on local issues · 250 votes = Council submission
          </p>
          <p style={{
            fontSize: '13.5px',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.88)',
            marginBottom: '28px',
            letterSpacing: '0.1px',
            lineHeight: 1.45,
            maxWidth: '360px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Because Council meetings shouldn't be the only way to be heard.
          </p>

          {/* Stats */}
          <div style={{
            display: 'inline-flex', gap: '0', background: 'rgba(255,255,255,0.12)',
            borderRadius: '14px', overflow: 'hidden', backdropFilter: 'blur(8px)',
          }}>
            {[
              { label: 'Issues', value: loading ? '—' : issues.length },
              { label: 'Votes cast', value: loading ? '—' : totalVotes },
              { label: 'Suburbs', value: loading ? '—' : activeSuburbs },
            ].map((stat, i, arr) => (
              <div key={stat.label} style={{
                padding: '12px 20px',
                borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'white', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '3px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search + Filters (pulled up over hero) */}
      <div style={{ padding: '0 16px', marginTop: '-24px', position: 'relative', zIndex: 10 }}>
        {/* Search */}
        <div style={{
          position: 'relative', marginBottom: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          borderRadius: '14px',
        }}>
          <span style={{
            position: 'absolute', left: '14px', top: '50%',
            transform: 'translateY(-50%)', fontSize: '18px', pointerEvents: 'none',
          }}>
            🔍
          </span>
          <input
            type="search"
            placeholder="Search issues..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 14px 14px 44px',
              borderRadius: '14px',
              border: '1.5px solid var(--border)',
              fontSize: '15px',
              background: 'white',
              color: 'var(--text)',
              outline: 'none',
            }}
          />
        </div>

        {/* Category pills */}
        <div
          className="no-scrollbar"
          style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '10px', paddingBottom: '2px' }}
        >
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: '7px 16px',
                borderRadius: '30px',
                fontSize: '13px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: category === c ? 'var(--primary)' : 'white',
                color: category === c ? 'white' : 'var(--text-secondary)',
                border: `1.5px solid ${category === c ? 'var(--primary)' : 'var(--border)'}`,
                boxShadow: category === c ? '0 2px 8px rgba(0,168,150,0.3)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {CATEGORY_ICONS[c]} {c}
            </button>
          ))}
        </div>

        {/* Suburb select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <select
            value={suburb}
            onChange={e => setSuburb(e.target.value)}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1.5px solid var(--border)',
              fontSize: '14px',
              background: 'white',
              color: suburb === 'All' ? 'var(--text-secondary)' : 'var(--text)',
              outline: 'none',
            }}
          >
            {SUBURBS.map(s => (
              <option key={s} value={s}>{s === 'All' ? '📍 All Suburbs' : s}</option>
            ))}
          </select>
          {(category !== 'All' || suburb !== 'All') && (
            <button
              onClick={() => { setCategory('All'); setSuburb('All') }}
              style={{
                padding: '9px 14px',
                borderRadius: '10px',
                border: '1.5px solid var(--border)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--warning)',
                background: 'white',
                whiteSpace: 'nowrap',
              }}
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Rally ideas — inspiration row */}
        {!search && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.2px' }}>
                What can you rally locals for?
              </h2>
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Tap to start
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
              Crowdsource support. Rally neighbours. Get Council to act.
            </p>
            <div
              className="no-scrollbar"
              style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '6px',
                marginLeft: '-16px',
                marginRight: '-16px',
                paddingLeft: '16px',
                paddingRight: '16px',
                scrollSnapType: 'x mandatory',
              }}
            >
              {RALLY_IDEAS.map((idea, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrefill({ category: idea.category, title: idea.title })
                    setShowModal(true)
                  }}
                  style={{
                    flex: '0 0 200px',
                    height: '200px',
                    borderRadius: '18px',
                    background: idea.gradient,
                    boxShadow: `0 6px 20px ${idea.glow}, 0 1px 3px rgba(0,0,0,0.08)`,
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    position: 'relative',
                    overflow: 'hidden',
                    scrollSnapAlign: 'start',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = `0 10px 28px ${idea.glow}, 0 2px 6px rgba(0,0,0,0.1)`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = `0 6px 20px ${idea.glow}, 0 1px 3px rgba(0,0,0,0.08)`
                  }}
                >
                  {/* Decorative shine */}
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '-30px',
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    {idea.icon}
                  </div>

                  {/* Text */}
                  <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <div style={{
                      fontSize: '14.5px',
                      fontWeight: 800,
                      color: 'white',
                      lineHeight: 1.25,
                      marginBottom: '6px',
                      letterSpacing: '-0.1px',
                      textShadow: '0 1px 2px rgba(0,0,0,0.12)',
                    }}>
                      {idea.title}
                    </div>
                    <div style={{
                      fontSize: '11.5px',
                      color: 'rgba(255,255,255,0.82)',
                      lineHeight: 1.35,
                      marginBottom: '10px',
                    }}>
                      {idea.blurb}
                    </div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: 'white',
                      background: 'rgba(255,255,255,0.18)',
                      padding: '5px 10px',
                      borderRadius: '20px',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}>
                      Start this →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard */}
        {!search && category === 'All' && suburb === 'All' && (
          <div style={{ marginBottom: '24px' }}>
            <IssueLeaderboard issues={issues} />
          </div>
        )}

        {/* Feed heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)' }}>
            {search ? `Results (${filtered.length})` : 'All Issues'}
          </h2>
          {!loading && filtered.length > 0 && (
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {filtered.length} issue{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <IssueFeed
          issues={filtered}
          loading={loading}
          onVoteUpdate={handleVoteUpdate}
          onPostIssue={() => setShowModal(true)}
        />
      </div>

      {/* Post Issue FAB */}
      <button
        onClick={() => { setPrefill(null); setShowModal(true) }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '20px',
          background: 'linear-gradient(135deg, var(--accent) 0%, #FF8C42 100%)',
          color: 'white',
          borderRadius: '30px',
          padding: '14px 22px',
          fontSize: '15px',
          fontWeight: 700,
          boxShadow: '0 4px 20px rgba(255,92,56,0.45)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 100,
          minHeight: '52px',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,92,56,0.55)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,92,56,0.45)' }}
      >
        ✏️ Post Issue
      </button>

      {showModal && (
        <PostIssueModal
          onClose={() => { setShowModal(false); setPrefill(null) }}
          onCreated={handleCreated}
          prefill={prefill}
        />
      )}
    </div>
  )
}
