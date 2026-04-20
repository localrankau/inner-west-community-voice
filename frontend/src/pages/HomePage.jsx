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

const filterSelectStyle = {
  padding: '9px 12px',
  borderRadius: '8px',
  border: '1.5px solid var(--border)',
  fontSize: '14px',
  background: 'white',
  color: 'var(--text)',
  flex: 1,
  minWidth: 0,
}

export default function HomePage() {
  const showToast = useToast()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [suburb, setSuburb] = useState('All')
  const [showModal, setShowModal] = useState(false)

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
      showToast('Something went wrong loading issues.')
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

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 0 80px' }}>
      {/* Header */}
      <div style={{
        background: 'var(--primary)',
        color: 'white',
        padding: '20px 16px 24px',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.3px', marginBottom: '4px' }}>
          🏘️ Inner West Community Voice
        </h1>
        <p style={{ fontSize: '13px', opacity: 0.85 }}>
          Vote on local issues · 250 votes = Council submission
        </p>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <span style={{
            position: 'absolute', left: '12px', top: '50%',
            transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none',
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
              padding: '12px 12px 12px 40px',
              borderRadius: '10px',
              border: '1.5px solid var(--border)',
              fontSize: '15px',
              background: 'white',
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <select value={category} onChange={e => setCategory(e.target.value)} style={filterSelectStyle}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? '📁 Category' : c}</option>)}
          </select>
          <select value={suburb} onChange={e => setSuburb(e.target.value)} style={filterSelectStyle}>
            {SUBURBS.map(s => <option key={s} value={s}>{s === 'All' ? '📍 Suburb' : s}</option>)}
          </select>
        </div>

        {/* Leaderboard */}
        {!search && category === 'All' && suburb === 'All' && (
          <div style={{ marginBottom: '20px' }}>
            <IssueLeaderboard issues={issues} />
          </div>
        )}

        {/* Feed heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700 }}>
            {search ? `Results (${filtered.length})` : 'All Issues'}
          </h2>
          {(category !== 'All' || suburb !== 'All') && (
            <button
              onClick={() => { setCategory('All'); setSuburb('All') }}
              style={{ fontSize: '13px', color: 'var(--neutral)', textDecoration: 'underline' }}
            >
              Clear filters
            </button>
          )}
        </div>

        <IssueFeed issues={filtered} loading={loading} onVoteUpdate={handleVoteUpdate} />
      </div>

      {/* Post Issue FAB */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'var(--accent)',
          color: 'white',
          borderRadius: '28px',
          padding: '14px 20px',
          fontSize: '15px',
          fontWeight: 700,
          boxShadow: '0 4px 16px rgba(255,107,53,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 100,
          minHeight: '52px',
        }}
      >
        ✏️ Post Issue
      </button>

      {showModal && (
        <PostIssueModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  )
}
