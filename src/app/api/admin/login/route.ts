import { NextRequest, NextResponse } from 'next/server'
import { supabaseStorage, ADMIN_CREDENTIALS } from '@/lib/supabase-storage'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    // Check credentials against the configured values
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // For Edge Runtime, we'll use direct credential comparison
    // In production, you might want to use a more secure method
    const isAuthenticated = username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')

    return NextResponse.json({ 
      message: 'Login successful',
      token 
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 })
  }
}