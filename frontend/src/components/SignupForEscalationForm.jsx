import { useState } from 'react'
import { supabase } from '../supabase'
import { useToast } from '../ToastContext'

export default function SignupForEscalationForm({ issueId, currentCount = 0 }) {
  const showToast = useToast()
  const [form, setForm] = useState({ email: '', name: '', postcode: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  function validatePostcode(val) {
    const n = parseInt(val, 10)
    return /^\d{4}$/.test(val) && n >= 2000 && n <= 2770
  }

  function validate() {
    const e = {}
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.name.trim()) e.name = 'Name is required'
    if (!validatePostcode(form.postcode)) e.postcode = 'Enter a valid NSW postcode (2000–2770)'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    try {
      const { error } = await supabase.from('supporter_signups').insert({
        issue_id: issueId,
        email: form.email.trim().toLowerCase(),
        name: form.name.trim(),
        postcode: form.postcode,
        postcode_verified: validatePostcode(form.postcode),
      })
      if (error) throw error
      setDone(true)
      showToast('You\'re counted as a supporter! ✅')
    } catch {
      showToast('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div style={{
        background: '#dcfce7',
        border: '1.5px solid #16a34a',
        borderRadius: '12px',
        padding: '18px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>✅</div>
        <p style={{ fontWeight: 700, color: 'var(--success)', marginBottom: '4px' }}>
          You're counted as a supporter!
        </p>
        <p style={{ fontSize: '14px', color: '#166534' }}>
          {currentCount + 1} supporters so far
        </p>
      </div>
    )
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: `1.5px solid ${errors[field] ? 'var(--warning)' : 'var(--border)'}`,
    fontSize: '15px',
    background: 'white',
  })

  return (
    <div style={{
      background: '#eff6ff',
      border: '1.5px solid #bfdbfe',
      borderRadius: '12px',
      padding: '18px',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: 'var(--primary)' }}>
        Help escalate this issue to Council
      </h3>
      <p style={{ fontSize: '13px', color: 'var(--neutral)', marginBottom: '16px' }}>
        250 verified supporters = formal Council submission
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(r => ({ ...r, email: '' })) }}
            style={inputStyle('email')}
          />
          {errors.email && <span style={{ fontSize: '12px', color: 'var(--warning)', display: 'block', marginTop: '3px' }}>{errors.email}</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(r => ({ ...r, name: '' })) }}
            style={inputStyle('name')}
          />
          {errors.name && <span style={{ fontSize: '12px', color: 'var(--warning)', display: 'block', marginTop: '3px' }}>{errors.name}</span>}
        </div>
        <div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Postcode (e.g. 2040)"
            value={form.postcode}
            maxLength={4}
            onChange={e => { setForm(f => ({ ...f, postcode: e.target.value })); setErrors(r => ({ ...r, postcode: '' })) }}
            style={inputStyle('postcode')}
          />
          {errors.postcode && <span style={{ fontSize: '12px', color: 'var(--warning)', display: 'block', marginTop: '3px' }}>{errors.postcode}</span>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '13px',
            borderRadius: '10px',
            background: 'var(--primary)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minHeight: '48px',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? <><span className="spinner" /> Signing up...</> : '✍️ Sign Me Up'}
        </button>
        <p style={{ fontSize: '11px', color: 'var(--neutral)', textAlign: 'center' }}>
          Your signature = verified supporter. No spam.
        </p>
      </form>
    </div>
  )
}
