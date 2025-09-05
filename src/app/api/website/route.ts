import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const content = await db.websiteContent.findMany()
    const socialLinks = await db.socialLink.findMany({
      where: { isActive: true }
    })
    
    return NextResponse.json({ content, socialLinks })
  } catch (error) {
    console.error('Error fetching website data:', error)
    return NextResponse.json({ error: 'Failed to fetch website data' }, { status: 500 })
  }
}