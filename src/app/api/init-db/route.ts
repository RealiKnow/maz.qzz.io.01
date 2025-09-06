import { NextRequest, NextResponse } from 'next/server'
import { supabaseStorage } from '@/lib/supabase-storage'

export const runtime = 'edge'

export async function POST() {
  try {
    await supabaseStorage.initializeDatabase()
    return NextResponse.json({ message: 'Database initialized successfully' })
  } catch (error) {
    console.error('Error initializing database:', error)
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 })
  }
}