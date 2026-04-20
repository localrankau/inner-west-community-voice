import { useNavigate } from 'react-router-dom'
import CategoryBadge from './CategoryBadge'
import VoteButtons from './VoteButtons'
import ShareButtons from './ShareButtons'

export default function IssueCard({ issue, onVoteUpdate }) {
  const navigate = useNavigate()

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: 'var(--card-shadow)',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <CategoryBadge category={issue.category} />
        <span style={{ fontSize: '12px', color: 'var(--neutral)' }}>
          📍 {issue.suburb}
        </span>
        {issue.escalated && (
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--success)',
            background: '#dcfce7',
            padding: '2px 8px',
            borderRadius: '12px',
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
          color: 'var(--text)',
          marginBottom: '4px',
          lineHeight: 1.3,
        }}>
          {issue.title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {issue.description}
        </p>
      </div>

      {/* Vote progress bar */}
      {!issue.escalated && (
        <div>
          <div style={{
            height: '4px',
            background: 'var(--border)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${Math.min((issue.vote_count / 250) * 100, 100)}%`,
              background: 'var(--primary)',
              borderRadius: '4px',
              transition: 'width 0.3s ease',
            }} />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--neutral)', marginTop: '2px', display: 'block' }}>
            {issue.vote_count} / 250 to escalate
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
            padding: '5px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--primary)',
            border: '1.5px solid var(--primary)',
            background: 'white',
            minHeight: '36px',
          }}
        >
          View →
        </button>
      </div>
    </div>
  )
}
