import { NextRequest, NextResponse } from 'next/server'
import { WebsiteData } from '@/lib/edge-config'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const data: WebsiteData = await request.json()

    // For Edge Runtime, we'll simulate the update
    // In production, this could use Cloudflare KV or other edge-compatible storage
    console.log('Updating website content:', data.content)
    console.log('Updating social links:', data.socialLinks)

    // Simulate successful update
    return NextResponse.json({ message: 'Website data updated successfully' })

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update website data' }, { status: 500 })
  }
}