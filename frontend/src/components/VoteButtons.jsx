import { useState } from 'react'
import { supabase, getSessionId, hasVoted, recordVote } from '../supabase'
import { useToast } from '../ToastContext'

export default function VoteButtons({ issue, onVoteUpdate, size = 'normal' }) {
  const showToast = useToast()
  const existingVote = hasVoted(issue.id)
  const [voting, setVoting] = useState(false)
  const [upvotes, setUpvotes] = useState(issue.vote_count || 0)
  const [voted, setVoted] = useState(existingVote)

  const isSmall = size === 'small'
  const btnBase = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: isSmall ? '5px 10px' : '8px 14px',
    borderRadius: '20px',
    fontSize: isSmall ? '13px' : '14px',
    fontWeight: 600,
    border: '1.5px solid var(--border)',
    transition: 'all 0.15s',
    minHeight: '44px',
  }

  async function castVote(voteType) {
    if (voting || voted) return
    setVoting(true)

    // Optimistic update for upvotes only (schema only tracks upvotes)
    const prevCount = upvotes
    if (voteType === 'up') setUpvotes(v => v + 1)
    setVoted(voteType)

    try {
      const sessionId = getSessionId()
      const { error } = await supabase.from('votes').insert({
        issue_id: issue.id,
        vote_type: voteType,
        session_id: sessionId,
      })
      if (error) throw error
      // DB trigger auto-updates issues.vote_count — no manual update needed
      recordVote(issue.id, voteType)
      if (onVoteUpdate) onVoteUpdate(issue.id, voteType, voteType === 'up' ? upvotes + 1 : upvotes)
      showToast('Your vote counted! ✅')
    } catch (err) {
      // Revert optimistic update
      setUpvotes(prevCount)
      setVoted(null)
      // Unique constraint violation = already voted
      if (err?.code === '23505') {
        showToast('You\'ve already voted on this issue.')
      } else {
        showToast('Something went wrong. Please try again.')
      }
    } finally {
      setVoting(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button
        onClick={() => castVote('up')}
        disabled={!!voted || voting}
        style={{
          ...btnBase,
          background: voted === 'up' ? 'var(--primary)' : 'white',
          color: voted === 'up' ? 'white' : 'var(--text)',
          borderColor: voted === 'up' ? 'var(--primary)' : 'var(--border)',
          opacity: voted && voted !== 'up' ? 0.5 : 1,
        }}
      >
        ⬆️ {upvotes}
      </button>
      <button
        onClick={() => castVote('down')}
        disabled={!!voted || voting}
        style={{
          ...btnBase,
          background: voted === 'down' ? '#fee2e2' : 'white',
          color: voted === 'down' ? 'var(--warning)' : 'var(--text)',
          borderColor: voted === 'down' ? 'var(--warning)' : 'var(--border)',
          opacity: voted && voted !== 'down' ? 0.5 : 1,
        }}
      >
        ⬇️
      </button>
    </div>
  )
}
