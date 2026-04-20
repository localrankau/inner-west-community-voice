import IssueCard from './IssueCard'

export default function IssueFeed({ issues, loading, onVoteUpdate }) {
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid var(--border)',
          }}>
            <div className="skeleton" style={{ height: '16px', width: '40%', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '20px', width: '80%', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '14px', width: '100%', marginBottom: '4px' }} />
            <div className="skeleton" style={{ height: '14px', width: '70%' }} />
          </div>
        ))}
      </div>
    )
  }

  if (!issues || issues.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px 16px',
        color: 'var(--neutral)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
        <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>No issues yet</p>
        <p style={{ fontSize: '14px' }}>Be the first to post one!</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {issues.map(issue => (
        <IssueCard key={issue.id} issue={issue} onVoteUpdate={onVoteUpdate} />
      ))}
    </div>
  )
}
