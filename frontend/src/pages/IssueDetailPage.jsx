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
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
        <div className="skeleton" style={{ height: '24px', width: '60%', marginBottom: '12px' }} />
        <div className="skeleton" style={{ height: '40px', width: '90%', marginBottom: '16px' }} />
        <div className="skeleton" style={{ height: '120px', marginBottom: '16px' }} />
        <div className="skeleton" style={{ height: '60px' }} />
      </div>
    )
  }

  if (!issue) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 16px' }}>
        <p style={{ color: 'var(--neutral)' }}>Issue not found.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '12px', color: 'var(--primary)', textDecoration: 'underline', fontSize: '14px' }}>
          Back to feed
        </button>
      </div>
    )
  }

  const pct = Math.min((issue.vote_count / ESCALATION_THRESHOLD) * 100, 100)
  const escalated = issue.escalated || issue.vote_count >= ESCALATION_THRESHOLD

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, background: 'white', zIndex: 50,
        borderBottom: '1px solid var(--border)', padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{ fontSize: '22px', color: 'var(--neutral)', lineHeight: 1 }}
        >
          ←
        </button>
        <span style={{ fontSize: '15px', fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {issue.title}
        </span>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header card */}
        <div style={{
          background: 'white', borderRadius: '12px', padding: '18px',
          border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)',
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <CategoryBadge category={issue.category} />
            <span style={{ fontSize: '12px', color: 'var(--neutral)', display: 'flex', alignItems: 'center' }}>
              📍 {issue.suburb}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--neutral)', display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              Posted {formatTimeAgo(issue.created_at)}
            </span>
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1.25, marginBottom: '12px' }}>
            {issue.title}
          </h1>

          <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--text)', marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
            {issue.description}
          </p>

          {/* Vote progress */}
          {!escalated && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                <span style={{ fontWeight: 600 }}>⬆️ {issue.vote_count} votes</span>
                <span style={{ color: 'var(--neutral)' }}>{issue.vote_count} / {ESCALATION_THRESHOLD} needed</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${pct}%`,
                  background: pct >= 80 ? 'var(--success)' : 'var(--primary)',
                  borderRadius: '4px', transition: 'width 0.4s ease',
                }} />
              </div>
            </div>
          )}

          {/* Escalation badge */}
          {escalated && (
            <div style={{
              background: '#dcfce7', border: '1.5px solid #16a34a',
              borderRadius: '10px', padding: '12px 14px',
              marginBottom: '12px',
            }}>
              <p style={{ fontWeight: 700, color: 'var(--success)', marginBottom: '4px' }}>
                ✅ Escalated to Inner West Council
              </p>
              <p style={{ fontSize: '13px', color: '#166534' }}>
                Recipients: planning@innerwestcouncil.nsw.gov.au
              </p>
              <p style={{ fontSize: '13px', color: '#166534' }}>
                Supporters: {issue.vote_count}
              </p>
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
          background: 'white', borderRadius: '12px', padding: '18px',
          border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)',
        }}>
          <CommentSection issueId={issue.id} comments={comments} />
        </div>
      </div>

      {/* Sticky vote bar on mobile */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white', borderTop: '1px solid var(--border)',
        padding: '10px 16px', display: 'flex', alignItems: 'center',
        gap: '10px', zIndex: 50, maxWidth: '600px', margin: '0 auto',
      }}>
        <VoteButtons issue={issue} size="small" />
        <ShareButtons issue={issue} size="small" />
        <button
          onClick={() => navigate('/')}
          style={{
            marginLeft: 'auto', fontSize: '13px', color: 'var(--primary)',
            fontWeight: 600, padding: '6px 10px',
          }}
        >
          ← Feed
        </button>
      </div>
    </div>
  )
}
