import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface UpdateData {
  content: Array<{ id: string; key: string; value: string }>
  socialLinks: Array<{ id: string; platform: string; url: string; isActive: boolean }>
}

export async function POST(request: NextRequest) {
  try {
    const data: UpdateData = await request.json()

    // Update website content
    for (const content of data.content) {
      await db.websiteContent.upsert({
        where: { key: content.key },
        update: { value: content.value },
        create: { key: content.key, value: content.value }
      })
    }

    // Update social links
    for (const link of data.socialLinks) {
      if (link.platform && link.url) {
        await db.socialLink.upsert({
          where: { id: link.id },
          update: { 
            platform: link.platform, 
            url: link.url, 
            isActive: link.isActive 
          },
          create: { 
            id: link.id,
            platform: link.platform, 
            url: link.url, 
            isActive: link.isActive 
          }
        })
      }
    }

    return NextResponse.json({ message: 'Website data updated successfully' })

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update website data' }, { status: 500 })
  }
}