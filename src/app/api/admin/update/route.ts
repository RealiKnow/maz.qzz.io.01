import { NextRequest, NextResponse } from 'next/server'
import { supabaseStorage } from '@/lib/supabase-storage'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Update website content
    if (data.content && Array.isArray(data.content)) {
      for (const content of data.content) {
        if (content.key && content.value !== undefined) {
          await supabaseStorage.updateContent(content.key, content.value)
        }
      }
    }

    // Update social links
    if (data.socialLinks && Array.isArray(data.socialLinks)) {
      // Get current data to see what exists
      const currentData = await supabaseStorage.getWebsiteData()
      const existingIds = currentData.socialLinks.map(link => link.id)
      
      // Remove links that are no longer in the update
      for (const existingId of existingIds) {
        if (!data.socialLinks.find((link: any) => link.id === existingId)) {
          await supabaseStorage.removeSocialLink(existingId)
        }
      }

      // Update or add new links
      for (const link of data.socialLinks) {
        if (link.platform && link.url) {
          if (link.id && existingIds.includes(link.id)) {
            // Update existing link
            await supabaseStorage.updateSocialLink(link.id, {
              platform: link.platform,
              url: link.url,
              is_active: link.isActive !== false
            })
          } else {
            // Add new link
            await supabaseStorage.addSocialLink({
              platform: link.platform,
              url: link.url,
              is_active: link.isActive !== false
            })
          }
        }
      }
    }

    return NextResponse.json({ message: 'Website data updated successfully' })

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update website data' }, { status: 500 })
  }
}