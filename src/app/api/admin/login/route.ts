import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    // For Edge Runtime, we'll use hardcoded credentials
    // In production, you should use environment variables or a proper auth service
    const ADMIN_USERNAME = 'admin'
    const ADMIN_PASSWORD = 'password123' // Change this in production!

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
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