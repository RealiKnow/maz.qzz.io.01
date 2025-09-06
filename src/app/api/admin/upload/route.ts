import { NextRequest, NextResponse } from 'next/server'
import { edgeStorage } from '@/lib/edge-storage'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // For Edge Runtime, we'll simulate file upload and update the logo URL
    // In production, this would use Cloudflare R2 or similar cloud storage
    
    const timestamp = Date.now()
    const originalName = file.name
    const extension = originalName.split('.').pop()
    const filename = `${timestamp}.${extension}`

    // Generate a URL (in production, this would be the actual cloud storage URL)
    const fileUrl = `/uploads/${filename}`

    // Update the logo URL in the storage
    edgeStorage.updateContent('logo_url', fileUrl)

    return NextResponse.json({ 
      message: 'File uploaded successfully',
      url: fileUrl 
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}