export function getAuthCallbackUrl() {
  const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] || 'http://localhost:3000'
  const callbackPath = process.env['NEXT_PUBLIC_AUTH_CALLBACK'] || '/auth/callback'
  return `${siteUrl}${callbackPath}`
}

export function getSupabaseConfig() {
  return {
    url: process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    anonKey: process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
    authCallbackUrl: getAuthCallbackUrl()
  }
}