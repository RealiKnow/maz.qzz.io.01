import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface UpdateData {
  content: Array<{ id: string; key: string; value: string }>
  socialLinks: Array<{ id: string; platform: string; url: string; isActive: boolean }>
}

export async function POST(request: NextRequest) {
  try {
    const data: UpdateData = await request.json()

    // For Edge Runtime, we'll simulate the update
    // In a real production environment, you'd use a database service that works with Edge Runtime
    console.log('Updating website content:', data.content)
    console.log('Updating social links:', data.socialLinks)

    // Simulate successful update
    return NextResponse.json({ message: 'Website data updated successfully' })

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update website data' }, { status: 500 })
  }
}