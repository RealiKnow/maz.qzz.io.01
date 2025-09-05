import { NextRequest, NextResponse } from 'next/server'
import { defaultWebsiteData } from '@/lib/edge-config'

export const runtime = 'edge'

export async function GET() {
  try {
    // In Edge Runtime, we return the default data
    // In production, this could be enhanced with Cloudflare KV or other edge-compatible storage
    return NextResponse.json(defaultWebsiteData)
  } catch (error) {
    console.error('Error fetching website data:', error)
    return NextResponse.json({ error: 'Failed to fetch website data' }, { status: 500 })
  }
}