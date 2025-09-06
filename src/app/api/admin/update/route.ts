import { NextRequest, NextResponse } from 'next/server'
import { edgeStorage } from '@/lib/edge-storage'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Update website content
    if (data.content && Array.isArray(data.content)) {
      for (const content of data.content) {
        if (content.key && content.value !== undefined) {
          edgeStorage.updateContent(content.key, content.value)
        }
      }
    }

    // Update social links
    if (data.socialLinks && Array.isArray(data.socialLinks)) {
      // First, clear existing social links
      const currentData = edgeStorage.getWebsiteData()
      const existingIds = currentData.socialLinks.map(link => link.id)
      
      // Remove links that are no longer in the update
      existingIds.forEach(id => {
        if (!data.socialLinks.find((link: any) => link.id === id)) {
          edgeStorage.removeSocialLink(id)
        }
      })

      // Update or add new links
      for (const link of data.socialLinks) {
        if (link.id && link.platform && link.url) {
          edgeStorage.updateSocialLink(link.id, {
            platform: link.platform,
            url: link.url,
            isActive: link.isActive !== false
          })
        }
      }
    }

    return NextResponse.json({ message: 'Website data updated successfully' })

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update website data' }, { status: 500 })
  }
}