import IssueCard from './IssueCard'

function EmptyState({ onPostIssue }) {
  return (
    <div style={{ textAlign: 'center', padding: '52px 24px' }}>
      {/* Illustration */}
      <div style={{
        width: '110px', height: '110px',
        background: 'linear-gradient(135deg, var(--primary-light) 0%, #c7f4f0 100%)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 22px',
        fontSize: '48px',
        boxShadow: '0 8px 24px rgba(0,168,150,0.15)',
      }}>
        🏘️
      </div>

      <h3 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
        No issues yet
      </h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '26px', fontSize: '15px', lineHeight: 1.6, maxWidth: '280px', margin: '0 auto 26px' }}>
        Be the first to raise a local concern and get your community behind it.
      </p>

      {onPostIssue && (
        <button
          onClick={onPostIssue}
          style={{
            background: 'linear-gradient(135deg, var(--accent) 0%, #FF8C42 100%)',
            color: 'white',
            padding: '14px 28px',
            borderRadius: '30px',
            fontSize: '15px',
            fontWeight: 700,
            boxShadow: '0 4px 16px rgba(255,92,56,0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,92,56,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,92,56,0.35)' }}
        >
          ✏️ Post First Issue
        </button>
      )}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '18px',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <div className="skeleton" style={{ height: '22px', width: '90px', borderRadius: '30px' }} />
        <div className="skeleton" style={{ height: '22px', width: '70px', borderRadius: '30px' }} />
      </div>
      <div>
        <div className="skeleton" style={{ height: '20px', width: '75%', marginBottom: '8px' }} />
        <div className="skeleton" style={{ height: '14px', width: '100%', marginBottom: '4px' }} />
        <div className="skeleton" style={{ height: '14px', width: '60%' }} />
      </div>
      <div className="skeleton" style={{ height: '5px', borderRadius: '6px' }} />
      <div style={{ display: 'flex', gap: '8px' }}>
        <div className="skeleton" style={{ height: '36px', width: '90px', borderRadius: '30px' }} />
        <div className="skeleton" style={{ height: '36px', width: '70px', borderRadius: '30px' }} />
        <div className="skeleton" style={{ height: '36px', width: '70px', borderRadius: '10px', marginLeft: 'auto' }} />
      </div>
    </div>
  )
}

export default function IssueFeed({ issues, loading, onVoteUpdate, onPostIssue }) {
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (!issues || issues.length === 0) {
    return <EmptyState onPostIssue={onPostIssue} />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {issues.map(issue => (
        <IssueCard key={issue.id} issue={issue} onVoteUpdate={onVoteUpdate} />
      ))}
    </div>
  )
}
