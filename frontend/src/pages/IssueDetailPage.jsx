import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase, formatTimeAgo } from '../supabase'
import CategoryBadge from '../components/CategoryBadge'
import VoteButtons from '../components/VoteButtons'
import ShareButtons from '../components/ShareButtons'
import CommentSection from '../components/CommentSection'
import SignupForEscalationForm from '../components/SignupForEscalationForm'
import { useToast } from '../ToastContext'

const ESCALATION_THRESHOLD = 250

export default function IssueDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const showToast = useToast()
  const [issue, setIssue] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [{ data: iss, error: e1 }, { data: cmts, error: e2 }] = await Promise.all([
          supabase.from('issues').select('*').eq('id', id).single(),
          supabase.from('comments').select('*').eq('issue_id', id).order('created_at', { ascending: false }),
        ])
        if (e1) throw e1
        if (e2) throw e2
        setIssue(iss)
        setComments(cmts || [])
      } catch {
        showToast('Could not load this issue.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px' }}>
        <div className="skeleton" style={{ height: '48px', marginBottom: '16px', borderRadius: '0' }} />
        <div className="skeleton" style={{ height: '24px', width: '60%', marginBottom: '12px' }} />
        <div className="skeleton" style={{ height: '36px', width: '90%', marginBottom: '16px' }} />
        <div className="skeleton" style={{ height: '120px', marginBottom: '16px' }} />
        <div className="skeleton" style={{ height: '60px' }} />
      </div>
    )
  }

  if (!issue) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 16px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '16px' }}>Issue not found.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 24px', borderRadius: '10px',
            background: 'var(--primary)', color: 'white',
            fontWeight: 600, fontSize: '14px',
          }}
        >
          ← Back to Feed
        </button>
      </div>
    )
  }

  const pct = Math.min(((issue.vote_count || 0) / ESCALATION_THRESHOLD) * 100, 100)
  const escalated = issue.escalated || issue.vote_count >= ESCALATION_THRESHOLD

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', paddingBottom: '100px', background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: '12px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'var(--bg)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', color: 'var(--navy)', flexShrink: 0,
          }}
        >
          ←
        </button>
        <span style={{
          fontSize: '15px', fontWeight: 700, flex: 1,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          color: 'var(--navy)',
        }}>
          {issue.title}
        </span>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Main issue card */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '20px',
          border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)',
        }}>
          {/* Meta */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
            <CategoryBadge category={issue.category} />
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>📍 {issue.suburb}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: 'auto' }}>
              {formatTimeAgo(issue.created_at)}
            </span>
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: 900, lineHeight: 1.25, marginBottom: '12px', color: 'var(--navy)' }}>
            {issue.title}
          </h1>

          <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text)', marginBottom: '18px', whiteSpace: 'pre-wrap' }}>
            {issue.description}
          </p>

          {/* Vote progress */}
          {!escalated && (
            <div style={{
              background: 'var(--bg)',
              borderRadius: '12px',
              padding: '14px 16px',
              marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', fontWeight: 600 }}>
                <span style={{ color: 'var(--navy)' }}>⬆ {issue.vote_count || 0} community votes</span>
                <span style={{ color: 'var(--text-secondary)' }}>{Math.round(pct)}% to goal</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${pct}%`,
                  background: pct >= 80
                    ? 'linear-gradient(90deg, var(--success), #34d399)'
                    : 'linear-gradient(90deg, var(--primary), #00c9b8)',
                  borderRadius: '6px', transition: 'width 0.4s ease',
                }} />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                {ESCALATION_THRESHOLD - (issue.vote_count || 0)} more votes to formally escalate to Inner West Council
              </p>
            </div>
          )}

          {/* Escalation badge */}
          {escalated && (
            <div style={{
              background: 'var(--success-bg)',
              border: '1.5px solid rgba(5,150,105,0.25)',
              borderRadius: '12px',
              padding: '14px 16px',
              marginBottom: '16px',
            }}>
              <p style={{ fontWeight: 800, color: 'var(--success)', marginBottom: '4px', fontSize: '15px' }}>
                ✅ Escalated to Inner West Council
              </p>
              <p style={{ fontSize: '13px', color: '#166534' }}>📧 planning@innerwestcouncil.nsw.gov.au</p>
              <p style={{ fontSize: '13px', color: '#166534' }}>👥 {issue.vote_count} community supporters</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <VoteButtons issue={issue} />
            <ShareButtons issue={issue} />
          </div>
        </div>

        {/* Escalation signup */}
        {!escalated && (
          <SignupForEscalationForm issueId={issue.id} currentCount={issue.vote_count} />
        )}

        {/* Comments */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '20px',
          border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)',
        }}>
          <CommentSection issueId={issue.id} comments={comments} />
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white',
        borderTop: '1px solid var(--border)',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: '10px',
        zIndex: 50,
        boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
      }}>
        <VoteButtons issue={issue} size="small" />
        <ShareButtons issue={issue} size="small" />
        <button
          onClick={() => navigate('/')}
          style={{
            marginLeft: 'auto', fontSize: '13px',
            color: 'var(--primary)', fontWeight: 700,
            padding: '8px 14px', borderRadius: '10px',
            border: '1.5px solid var(--primary)',
          }}
        >
          ← Feed
        </button>
      </div>
    </div>
  )
}
