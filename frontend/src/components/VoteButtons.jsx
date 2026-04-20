import { useState } from 'react'
import { supabase, getSessionId, hasVoted, recordVote } from '../supabase'
import { useToast } from '../ToastContext'

export default function VoteButtons({ issue, onVoteUpdate, size = 'normal' }) {
  const showToast = useToast()
  const existingVote = hasVoted(issue.id)
  const [voting, setVoting] = useState(false)
  const [upvotes, setUpvotes] = useState(issue.vote_count || 0)
  const [voted, setVoted] = useState(existingVote)
  const [pulseUp, setPulseUp] = useState(false)
  const [pulseDown, setPulseDown] = useState(false)

  const isSmall = size === 'small'

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: isSmall ? '6px 12px' : '10px 18px',
    borderRadius: '30px',
    fontSize: isSmall ? '13px' : '15px',
    fontWeight: 700,
    border: '1.5px solid',
    transition: 'all 0.18s ease',
    minHeight: isSmall ? '36px' : '44px',
    cursor: voted || voting ? 'not-allowed' : 'pointer',
  }

  async function castVote(voteType) {
    if (voting || voted) return
    setVoting(true)

    const prevCount = upvotes
    if (voteType === 'up') {
      setUpvotes(v => v + 1)
      setPulseUp(true)
      setTimeout(() => setPulseUp(false), 400)
    } else {
      setPulseDown(true)
      setTimeout(() => setPulseDown(false), 400)
    }
    setVoted(voteType)

    try {
      const sessionId = getSessionId()
      const { error } = await supabase.from('votes').insert({
        issue_id: issue.id,
        vote_type: voteType,
        session_id: sessionId,
      })
      if (error) throw error
      recordVote(issue.id, voteType)
      if (onVoteUpdate) onVoteUpdate(issue.id, voteType, voteType === 'up' ? upvotes + 1 : upvotes)
      showToast(voteType === 'up' ? 'Upvoted! ⬆️' : 'Downvoted ⬇️')
    } catch (err) {
      setUpvotes(prevCount)
      setVoted(null)
      if (err?.code === '23505') {
        showToast('You\'ve already voted on this.')
      } else {
        showToast('Something went wrong. Please try again.')
      }
    } finally {
      setVoting(false)
    }
  }

  const upActive = voted === 'up'
  const downActive = voted === 'down'

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {/* Upvote */}
      <button
        onClick={() => castVote('up')}
        disabled={!!voted || voting}
        className={pulseUp ? 'vote-pulse' : ''}
        style={{
          ...base,
          background: upActive
            ? 'linear-gradient(135deg, var(--primary) 0%, #00c9b8 100%)'
            : 'white',
          color: upActive ? 'white' : 'var(--text)',
          borderColor: upActive ? 'var(--primary)' : 'var(--border)',
          boxShadow: upActive ? '0 2px 10px rgba(0,168,150,0.35)' : 'none',
          opacity: voted && !upActive ? 0.45 : 1,
        }}
      >
        ⬆ <span style={{ fontVariantNumeric: 'tabular-nums' }}>{upvotes}</span>
      </button>

      {/* Downvote */}
      <button
        onClick={() => castVote('down')}
        disabled={!!voted || voting}
        className={pulseDown ? 'vote-pulse' : ''}
        style={{
          ...base,
          background: downActive ? '#FEE2E2' : 'white',
          color: downActive ? 'var(--warning)' : 'var(--text-secondary)',
          borderColor: downActive ? 'var(--warning)' : 'var(--border)',
          opacity: voted && !downActive ? 0.45 : 1,
        }}
      >
        ⬇
      </button>
    </div>
  )
}
