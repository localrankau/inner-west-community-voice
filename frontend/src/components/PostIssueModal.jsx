import { useState } from 'react'
import { supabase } from '../supabase'
import { useToast } from '../ToastContext'

const CATEGORIES = ['Rezoning', 'Infrastructure', 'Transport', 'Services', 'Other']
const SUBURBS = [
  'Leichhardt', 'Marrickville', 'Newtown', 'Ultimo', 'Petersham',
  'Lilyfield', 'Ashfield', 'Rozelle', 'Balmain', 'Inner West (Other)',
]

export default function PostIssueModal({ onClose, onCreated }) {
  const showToast = useToast()
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    suburb: '',
    anonymous: true,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.category) e.category = 'Category is required'
    if (!form.suburb) e.suburb = 'Suburb is required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    try {
      const { data, error } = await supabase.from('issues').insert({
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        suburb: form.suburb,
        vote_count: 0,
        escalated: false,
      }).select().single()
      if (error) throw error
      showToast('Issue posted! 🎉')
      if (onCreated) onCreated(data)
      onClose()
    } catch {
      showToast('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: `1.5px solid ${errors[field] ? 'var(--warning)' : 'var(--border)'}`,
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.15s',
  })

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      zIndex: 1000, padding: '0',
    }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'white',
        borderRadius: '20px 20px 0 0',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '24px 20px',
        paddingBottom: '32px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Post an Issue</h2>
          <button onClick={onClose} style={{ fontSize: '22px', color: 'var(--neutral)', lineHeight: 1 }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>
              Title
            </label>
            <input
              type="text"
              value={form.title}
              maxLength={100}
              onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setErrors(r => ({ ...r, title: '' })) }}
              style={inputStyle('title')}
              placeholder="What's the issue?"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
              {errors.title && <span style={{ fontSize: '12px', color: 'var(--warning)' }}>{errors.title}</span>}
              <span style={{ fontSize: '12px', color: 'var(--neutral)', marginLeft: 'auto' }}>
                {form.title.length} / 100
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>
              Description
            </label>
            <textarea
              value={form.description}
              maxLength={500}
              rows={4}
              onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(r => ({ ...r, description: '' })) }}
              style={{ ...inputStyle('description'), resize: 'vertical' }}
              placeholder="Describe the issue in detail..."
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
              {errors.description && <span style={{ fontSize: '12px', color: 'var(--warning)' }}>{errors.description}</span>}
              <span style={{ fontSize: '12px', color: 'var(--neutral)', marginLeft: 'auto' }}>
                {form.description.length} / 500
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>
              Category
            </label>
            <select
              value={form.category}
              onChange={e => { setForm(f => ({ ...f, category: e.target.value })); setErrors(r => ({ ...r, category: '' })) }}
              style={inputStyle('category')}
            >
              <option value="">Select a category...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <span style={{ fontSize: '12px', color: 'var(--warning)', display: 'block', marginTop: '3px' }}>{errors.category}</span>}
          </div>

          {/* Suburb */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>
              Suburb
            </label>
            <select
              value={form.suburb}
              onChange={e => { setForm(f => ({ ...f, suburb: e.target.value })); setErrors(r => ({ ...r, suburb: '' })) }}
              style={inputStyle('suburb')}
            >
              <option value="">Select a suburb...</option>
              {SUBURBS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.suburb && <span style={{ fontSize: '12px', color: 'var(--warning)', display: 'block', marginTop: '3px' }}>{errors.suburb}</span>}
          </div>

          {/* Anonymous toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setForm(f => ({ ...f, anonymous: !f.anonymous }))}
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '12px',
                background: form.anonymous ? 'var(--primary)' : 'var(--border)',
                position: 'relative',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute',
                top: '2px',
                left: form.anonymous ? '22px' : '2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'white',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            </button>
            <span style={{ fontSize: '14px' }}>Post anonymously</span>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: '1.5px solid var(--border)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--neutral)',
                background: 'white',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                flex: 2,
                padding: '12px',
                borderRadius: '10px',
                background: 'var(--accent)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? <><span className="spinner" /> Posting...</> : 'Post Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
