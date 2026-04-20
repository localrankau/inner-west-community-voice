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
      <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px' }}>
        Discussion <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '15px' }}>({comments.length})</span>
      </h3>

      {/* Add comment form */}
      <form onSubmit={handleSubmit} style={{
        background: 'var(--bg)',
        borderRadius: '12px',
        padding: '14px',
        marginBottom: '18px',
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
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1.5px solid var(--border)',
              fontSize: '14px',
              marginBottom: '8px',
              background: 'white',
              outline: 'none',
            }}
          />
        )}

        <div style={{ position: 'relative' }}>
          <textarea
            placeholder="Share your thoughts on this issue..."
            value={form.text}
            maxLength={300}
            rows={3}
            onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1.5px solid var(--border)',
              fontSize: '14px',
              resize: 'none',
              background: 'white',
              outline: 'none',
              lineHeight: 1.5,
            }}
          />
          <span style={{
            position: 'absolute', bottom: '8px', right: '10px',
            fontSize: '11px', color: form.text.length > 250 ? 'var(--warning)' : 'var(--text-secondary)',
            fontWeight: 500,
          }}>
            {form.text.length}/300
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', gap: '10px' }}>
          {/* Anonymous toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <button
              type="button"
              onClick={() => setForm(f => ({ ...f, anonymous: !f.anonymous }))}
              style={{
                width: '38px', height: '22px', borderRadius: '11px',
                background: form.anonymous ? 'var(--primary)' : '#CBD5E1',
                position: 'relative', transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute', top: '2px',
                left: form.anonymous ? '18px' : '2px',
                width: '18px', height: '18px', borderRadius: '50%',
                background: 'white', transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            </button>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Anonymous</span>
          </label>

          <button
            type="submit"
            disabled={submitting || !form.text.trim()}
            style={{
              padding: '9px 18px',
              borderRadius: '10px',
              background: form.text.trim() && !submitting ? 'var(--primary)' : 'var(--border)',
              color: form.text.trim() && !submitting ? 'white' : 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: '38px',
              transition: 'all 0.15s',
            }}
          >
            {submitting ? <><span className="spinner" /> Posting</> : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* Comment list */}
      {comments.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', padding: '28px 16px' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>💬</div>
          No comments yet — start the conversation!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {comments.map(c => (
            <div key={c.id} style={{
              background: 'var(--bg)',
              borderRadius: '12px',
              padding: '13px 15px',
              border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '13px', fontWeight: 700,
                  color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  {c.anonymous || !c.commenter_name ? '👤 Anonymous' : `💬 ${c.commenter_name}`}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {formatTimeAgo(c.created_at)}
                </span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.55, color: 'var(--text)' }}>{c.comment_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
