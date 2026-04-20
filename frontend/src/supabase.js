import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function generateSessionId() {
  const id = Math.random().toString(36).substring(2) + Date.now().toString(36)
  localStorage.setItem('session_id', id)
  return id
}

export function getSessionId() {
  return localStorage.getItem('session_id') || generateSessionId()
}

export function hasVoted(issueId) {
  const votes = JSON.parse(localStorage.getItem('votes') || '{}')
  return votes[issueId] || null
}

export function recordVote(issueId, voteType) {
  const votes = JSON.parse(localStorage.getItem('votes') || '{}')
  votes[issueId] = voteType
  localStorage.setItem('votes', JSON.stringify(votes))
}

export function formatTimeAgo(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}
