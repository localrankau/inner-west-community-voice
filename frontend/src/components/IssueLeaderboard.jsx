import { useNavigate } from 'react-router-dom'
import CategoryBadge from './CategoryBadge'

const RANK_STYLES = [
  { bg: 'linear-gradient(135deg, #F59E0B, #FBBF24)', color: 'white' },
  { bg: 'linear-gradient(135deg, #94A3B8, #CBD5E1)', color: 'white' },
  { bg: 'linear-gradient(135deg, #B45309, #D97706)', color: 'white' },
]

export default function IssueLeaderboard({ issues }) {
  const navigate = useNavigate()

  if (!issues || issues.length === 0) return null

  const top = issues.slice(0, 5)

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        background: 'linear-gradient(135deg, var(--navy) 0%, #0D6E68 100%)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{ fontSize: '20px' }}>🔥</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: '15px', color: 'white' }}>Trending Issues</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', marginTop: '1px' }}>Top issues by community votes</div>
        </div>
      </div>

      {top.map((issue, idx) => {
        const rankStyle = RANK_STYLES[idx] || { bg: 'var(--border)', color: 'var(--text-secondary)' }
        return (
          <div
            key={issue.id}
            onClick={() => navigate(`/issue/${issue.id}`)}
            style={{
              padding: '13px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderBottom: idx < top.length - 1 ? '1px solid var(--border)' : 'none',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {/* Rank badge */}
            <div style={{
              width: '28px', height: '28px',
              borderRadius: '50%',
              background: rankStyle.bg,
              color: rankStyle.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: 800,
              flexShrink: 0,
              boxShadow: idx < 3 ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
            }}>
              {idx + 1}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: '14px', fontWeight: 600, color: 'var(--navy)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                marginBottom: '3px',
              }}>
                {issue.title}
              </p>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <CategoryBadge category={issue.category} />
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>📍 {issue.suburb}</span>
              </div>
            </div>

            {/* Vote count */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              flexShrink: 0, minWidth: '44px',
            }}>
              <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
                {issue.vote_count || 0}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                votes
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
