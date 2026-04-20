import { useState } from 'react'
import { useToast } from '../ToastContext'

export default function ShareButtons({ issue, size = 'normal' }) {
  const showToast = useToast()
  const [open, setOpen] = useState(false)

  const shareUrl = `${window.location.origin}/issue/${issue.id}`
  const text = encodeURIComponent(issue.title)
  const url = encodeURIComponent(shareUrl)

  const isSmall = size === 'small'
  const btnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: isSmall ? '5px 10px' : '7px 12px',
    borderRadius: '8px',
    fontSize: isSmall ? '12px' : '13px',
    fontWeight: 500,
    border: '1.5px solid var(--border)',
    background: 'white',
    minHeight: '36px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      showToast('🔗 Copied to clipboard!')
    } catch {
      showToast('Could not copy link.')
    }
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{ ...btnStyle, color: 'var(--neutral)' }}
      >
        🔗 Share
      </button>
    )
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        background: 'white',
        border: '1.5px solid var(--border)',
        borderRadius: '10px',
        padding: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <a
          href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...btnStyle, color: '#1da1f2', borderColor: '#1da1f2' }}
          onClick={() => setOpen(false)}
        >
          🐦 Twitter
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...btnStyle, color: '#1877f2', borderColor: '#1877f2' }}
          onClick={() => setOpen(false)}
        >
          f Facebook
        </a>
        <a
          href={`https://wa.me/?text=${text}%20${url}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...btnStyle, color: '#25d366', borderColor: '#25d366' }}
          onClick={() => setOpen(false)}
        >
          💬 WhatsApp
        </a>
        <button onClick={copyLink} style={{ ...btnStyle, color: 'var(--neutral)' }}>
          🔗 Copy
        </button>
        <button
          onClick={() => setOpen(false)}
          style={{ ...btnStyle, color: 'var(--warning)', borderColor: 'transparent' }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
