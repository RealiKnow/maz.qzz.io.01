import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nwfuyzqwstakykgpwidk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZnV5enF3c3Rha3lrZ3B3aWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMzk5MzEsImV4cCI6MjA3MjcxNTkzMX0.cwpMoDDpRewkGVvqVHK1IcKhZPvMyVIeQl71nd70KMg'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface WebsiteContent {
  id: string
  key: string
  value: string
  created_at: string
  updated_at: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Admin {
  id: string
  username: string
  password: string
  created_at: string
  updated_at: string
}

export interface WebsiteData {
  content: WebsiteContent[]
  socialLinks: SocialLink[]
}