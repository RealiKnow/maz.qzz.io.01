import { NextRequest, NextResponse } from 'next/server'
import { edgeStorage } from '@/lib/edge-storage'

export const runtime = 'edge'

export async function GET() {
  try {
    const websiteData = edgeStorage.getWebsiteData()
    return NextResponse.json(websiteData)
  } catch (error) {
    console.error('Error fetching website data:', error)
    return NextResponse.json({ error: 'Failed to fetch website data' }, { status: 500 })
  }
}