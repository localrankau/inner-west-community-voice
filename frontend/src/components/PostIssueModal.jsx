import { useState } from 'react'
import { supabase } from '../supabase'
import { useToast } from '../ToastContext'

const CATEGORIES = ['Rezoning', 'Infrastructure', 'Transport', 'Services', 'Other']
const SUBURBS = [
  'Leichhardt', 'Marrickville', 'Newtown', 'Ultimo', 'Petersham',
  'Lilyfield', 'Ashfield', 'Rozelle', 'Balmain', 'Inner West (Other)',
]

function Toggle({ on, onToggle, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '48px',
          height: '26px',
          borderRadius: '13px',
          background: on ? 'var(--primary)' : '#CBD5E1',
          position: 'relative',
          transition: 'background 0.22s',
          flexShrink: 0,
          boxShadow: on ? '0 0 0 3px rgba(0,168,150,0.18)' : 'none',
        }}
      >
        <span style={{
          position: 'absolute',
          top: '3px',
          left: on ? '25px' : '3px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'white',
          transition: 'left 0.22s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }} />
      </button>
      <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>{label}</span>
    </div>
  )
}

export default function PostIssueModal({ onClose, onCreated, prefill }) {
  const showToast = useToast()
  const [form, setForm] = useState({
    title: prefill?.title || '',
    description: prefill?.description || '',
    category: prefill?.category || '',
    suburb: '',
    anonymous: true,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.category) e.category = 'Select a category'
    if (!form.suburb) e.suburb = 'Select a suburb'
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
      showToast('Issue posted! 🎉 Share it to get votes.')
      if (onCreated) onCreated(data)
      onClose()
    } catch {
      showToast('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function fieldStyle(field) {
    return {
      width: '100%',
      padding: '11px 14px',
      borderRadius: '10px',
      border: `1.5px solid ${errors[field] ? 'var(--warning)' : 'var(--border)'}`,
      fontSize: '15px',
      outline: 'none',
      background: 'white',
      color: 'var(--text)',
      transition: 'border-color 0.15s, box-shadow 0.15s',
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15,30,50,0.55)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'var(--bg)',
        borderRadius: '24px 24px 0 0',
        width: '100%',
        maxWidth: '680px',
        maxHeight: '94vh',
        overflowY: 'auto',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
      }}>
        {/* Header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          padding: '18px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderRadius: '24px 24px 0 0',
        }}>
          <div>
            <h2 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--navy)' }}>Post an Issue</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Raise a local concern for the community to vote on
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--border)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', color: 'var(--text-secondary)',
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '32px' }}>

          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
              Title <span style={{ color: 'var(--warning)' }}>*</span>
            </label>
            <input
              type="text"
              value={form.title}
              maxLength={100}
              placeholder="e.g. Pothole on Norton St causing accidents"
              onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setErrors(r => ({ ...r, title: '' })) }}
              style={fieldStyle('title')}
              onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,168,150,0.12)' }}
              onBlur={e => { e.target.style.borderColor = errors.title ? 'var(--warning)' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              {errors.title && <span style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: 500 }}>{errors.title}</span>}
              <span style={{ fontSize: '12px', color: form.title.length > 80 ? 'var(--warning)' : 'var(--text-secondary)', marginLeft: 'auto' }}>
                {form.title.length} / 100
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
              Description <span style={{ color: 'var(--warning)' }}>*</span>
            </label>
            <textarea
              value={form.description}
              maxLength={500}
              rows={4}
              placeholder="Describe the issue in detail — location, impact, how long it's been a problem..."
              onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(r => ({ ...r, description: '' })) }}
              style={{ ...fieldStyle('description'), resize: 'vertical', lineHeight: 1.5 }}
              onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,168,150,0.12)' }}
              onBlur={e => { e.target.style.borderColor = errors.description ? 'var(--warning)' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              {errors.description && <span style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: 500 }}>{errors.description}</span>}
              <span style={{ fontSize: '12px', color: form.description.length > 450 ? 'var(--warning)' : 'var(--text-secondary)', marginLeft: 'auto' }}>
                {form.description.length} / 500
              </span>
            </div>
          </div>

          {/* Category + Suburb row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                Category <span style={{ color: 'var(--warning)' }}>*</span>
              </label>
              <select
                value={form.category}
                onChange={e => { setForm(f => ({ ...f, category: e.target.value })); setErrors(r => ({ ...r, category: '' })) }}
                style={{ ...fieldStyle('category'), cursor: 'pointer' }}
              >
                <option value="">Select...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <span style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: 500, display: 'block', marginTop: '4px' }}>{errors.category}</span>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>
                Suburb <span style={{ color: 'var(--warning)' }}>*</span>
              </label>
              <select
                value={form.suburb}
                onChange={e => { setForm(f => ({ ...f, suburb: e.target.value })); setErrors(r => ({ ...r, suburb: '' })) }}
                style={{ ...fieldStyle('suburb'), cursor: 'pointer' }}
              >
                <option value="">Select...</option>
                {SUBURBS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.suburb && <span style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: 500, display: 'block', marginTop: '4px' }}>{errors.suburb}</span>}
            </div>
          </div>

          {/* Anonymous toggle */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '14px 16px',
            border: '1px solid var(--border)',
          }}>
            <Toggle
              on={form.anonymous}
              onToggle={() => setForm(f => ({ ...f, anonymous: !f.anonymous }))}
              label="Post anonymously"
            />
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', marginLeft: '58px' }}>
              {form.anonymous
                ? 'Your identity will be hidden from other users.'
                : 'Your name will be shown as the issue author.'}
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '13px',
                borderRadius: '12px',
                border: '1.5px solid var(--border)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
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
                padding: '13px',
                borderRadius: '12px',
                background: submitting ? 'var(--border)' : 'linear-gradient(135deg, var(--accent) 0%, #FF8C42 100%)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: submitting ? 'none' : '0 4px 14px rgba(255,92,56,0.35)',
                transition: 'all 0.2s',
              }}
            >
              {submitting ? <><span className="spinner" /> Posting...</> : '🚀 Post Issue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
