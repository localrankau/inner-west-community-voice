import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars. Check .env.local or Cloudflare Pages environment variables.')
}

// detectSessionInUrl disabled so we manually exchange the code AFTER
// onAuthStateChange is subscribed, guaranteeing PASSWORD_RECOVERY is caught.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { detectSessionInUrl: false },
})
