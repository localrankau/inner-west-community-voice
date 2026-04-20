import { useNavigate } from 'react-router-dom'
import CategoryBadge from './CategoryBadge'
import VoteButtons from './VoteButtons'
import ShareButtons from './ShareButtons'

const ESCALATION_THRESHOLD = 250

export default function IssueCard({ issue, onVoteUpdate }) {
  const navigate = useNavigate()
  const pct = Math.min(((issue.vote_count || 0) / ESCALATION_THRESHOLD) * 100, 100)
  const isEscalated = issue.escalated || issue.vote_count >= ESCALATION_THRESHOLD

  return (
    <div
      className="issue-card"
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '18px',
        boxShadow: 'var(--card-shadow)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Badges row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <CategoryBadge category={issue.category} />
        <span style={{
          fontSize: '12px', color: 'var(--text-secondary)',
          display: 'flex', alignItems: 'center', gap: '3px',
        }}>
          📍 {issue.suburb}
        </span>
        {isEscalated && (
          <span style={{
            marginLeft: 'auto',
            fontSize: '12px', fontWeight: 700,
            color: 'var(--success)',
            background: 'var(--success-bg)',
            padding: '3px 10px',
            borderRadius: '30px',
            border: '1px solid rgba(5,150,105,0.2)',
          }}>
            ✅ Escalated
          </span>
        )}
      </div>

      {/* Title + description */}
      <div
        onClick={() => navigate(`/issue/${issue.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--navy)',
          marginBottom: '5px',
          lineHeight: 1.35,
        }}>
          {issue.title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {issue.description}
        </p>
      </div>

      {/* Vote progress */}
      {!isEscalated && (
        <div>
          <div style={{
            height: '5px',
            background: 'var(--border)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: pct >= 80
                ? 'linear-gradient(90deg, var(--success), #34d399)'
                : 'linear-gradient(90deg, var(--primary), #00c9b8)',
              borderRadius: '6px',
              transition: 'width 0.4s ease',
            }} />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block', fontWeight: 500 }}>
            {issue.vote_count || 0} / {ESCALATION_THRESHOLD} votes to escalate to council
          </span>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <VoteButtons issue={issue} onVoteUpdate={onVoteUpdate} size="small" />
        <ShareButtons issue={issue} size="small" />
        <button
          onClick={() => navigate(`/issue/${issue.id}`)}
          style={{
            marginLeft: 'auto',
            padding: '7px 14px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--primary)',
            border: '1.5px solid var(--primary)',
            background: 'white',
            minHeight: '36px',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--primary)' }}
        >
          View →
        </button>
      </div>
    </div>
  )
}
