import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://elmborcyvhcrzqcirasl.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbWJvcmN5dmhjcnpxY2lyYXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDEwMjksImV4cCI6MjA4NDQ3NzAyOX0.N847Sycs6MlSjxPga7DQEvJBJHIP67sdkwFO3x_7jSA'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
