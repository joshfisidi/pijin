// lib/supabase/client.ts (for client components)
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './index'

export const createClient = () => {
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
