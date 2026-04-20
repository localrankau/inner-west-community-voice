import { useState } from 'react'
import { supabase } from '../supabase'
import { useToast } from '../ToastContext'
import { formatTimeAgo } from '../supabase'

export default function CommentSection({ issueId, comments: initialComments }) {
  const showToast = useToast()
  const [comments, setComments] = useState(initialComments || [])
  const [form, setForm] = useState({ name: '', text: '', anonymous: true })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.text.trim()) return
    setSubmitting(true)
    try {
      const { data, error } = await supabase.from('comments').insert({
        issue_id: issueId,
        commenter_name: form.anonymous ? null : form.name.trim() || null,
        comment_text: form.text.trim(),
        anonymous: form.anonymous,
      }).select().single()
      if (error) throw error
      setComments(c => [data, ...c])
      setForm(f => ({ ...f, name: '', text: '' }))
      showToast('Comment posted! 💬')
    } catch {
      showToast('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>
        Comments ({comments.length})
      </h3>

      {/* Add comment */}
      <form onSubmit={handleSubmit} style={{
        background: 'var(--bg-secondary)',
        borderRadius: '10px',
        padding: '14px',
        marginBottom: '16px',
        border: '1px solid var(--border)',
      }}>
        {!form.anonymous && (
          <input
            type="text"
            placeholder="Your name (optional)"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1.5px solid var(--border)',
              fontSize: '14px',
              marginBottom: '8px',
              background: 'white',
            }}
          />
        )}
        <div style={{ position: 'relative' }}>
          <textarea
            placeholder="Add a comment..."
            value={form.text}
            maxLength={300}
            rows={3}
            onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1.5px solid var(--border)',
              fontSize: '14px',
              resize: 'none',
              background: 'white',
            }}
          />
          <span style={{
            position: 'absolute',
            bottom: '8px',
            right: '10px',
            fontSize: '11px',
            color: 'var(--neutral)',
          }}>
            {form.text.length}/300
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <button
              type="button"
              onClick={() => setForm(f => ({ ...f, anonymous: !f.anonymous }))}
              style={{
                width: '36px', height: '20px', borderRadius: '10px',
                background: form.anonymous ? 'var(--primary)' : 'var(--border)',
                position: 'relative', transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute', top: '2px',
                left: form.anonymous ? '18px' : '2px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: 'white', transition: 'left 0.2s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }} />
            </button>
            Anonymous
          </label>
          <button
            type="submit"
            disabled={submitting || !form.text.trim()}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: form.text.trim() ? 'var(--primary)' : 'var(--border)',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: '36px',
            }}
          >
            {submitting ? <><span className="spinner" style={{ borderTopColor: 'white', borderColor: 'rgba(255,255,255,0.3)' }} /> Posting</> : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* Comment list */}
      {comments.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--neutral)', fontSize: '14px', padding: '24px' }}>
          No comments yet. Be the first!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {comments.map(c => (
            <div key={c.id} style={{
              background: 'white',
              borderRadius: '10px',
              padding: '12px 14px',
              border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>
                  {c.anonymous || !c.commenter_name ? 'Anonymous' : c.commenter_name}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--neutral)' }}>
                  {formatTimeAgo(c.created_at)}
                </span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.5 }}>{c.comment_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
