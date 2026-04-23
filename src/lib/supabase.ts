import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase configuration is missing. Please check your .env.local file.')
}

// Create client with provided credentials
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({ 
          order: () => Promise.resolve({ data: [], error: { message: 'Supabase URL or Key is missing' } }) 
        }),
        insert: () => Promise.resolve({ error: { message: 'Supabase URL or Key is missing' } })
      })
    } as any
