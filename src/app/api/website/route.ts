import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    // For Edge Runtime, we'll return mock data since we can't use Prisma
    const content = [
      { id: '1', key: 'logo_url', value: '/logo.svg' },
      { id: '2', key: 'footer_text', value: 'Connect With Me Everywhere' }
    ]
    const socialLinks = [
      { id: '1', platform: 'Instagram', url: 'https://instagram.com/example', isActive: true },
      { id: '2', platform: 'TikTok', url: 'https://tiktok.com/@example', isActive: true }
    ]
    
    return NextResponse.json({ content, socialLinks })
  } catch (error) {
    console.error('Error fetching website data:', error)
    return NextResponse.json({ error: 'Failed to fetch website data' }, { status: 500 })
  }
}