import { useNavigate } from 'react-router-dom'
import CategoryBadge from './CategoryBadge'

export default function IssueLeaderboard({ issues }) {
  const navigate = useNavigate()

  if (!issues || issues.length === 0) return null

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
    }}>
      <div style={{
        padding: '12px 16px',
        background: 'var(--primary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ fontSize: '18px' }}>🔥</span>
        <span style={{ fontWeight: 700, fontSize: '15px' }}>Trending Issues</span>
      </div>
      {issues.slice(0, 5).map((issue, idx) => (
        <div
          key={issue.id}
          onClick={() => navigate(`/issue/${issue.id}`)}
          style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: idx < Math.min(issues.length, 5) - 1 ? '1px solid var(--border)' : 'none',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: idx === 0 ? '#fbbf24' : idx === 1 ? '#94a3b8' : idx === 2 ? '#b45309' : '#e2e8f0',
            color: idx < 3 ? 'white' : 'var(--neutral)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 700,
            flexShrink: 0,
          }}>
            {idx + 1}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {issue.title}
            </p>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '2px' }}>
              <CategoryBadge category={issue.category} />
              <span style={{ fontSize: '11px', color: 'var(--neutral)' }}>📍 {issue.suburb}</span>
            </div>
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--primary)',
            flexShrink: 0,
          }}>
            ⬆️ {issue.vote_count}
          </div>
        </div>
      ))}
    </div>
  )
}
