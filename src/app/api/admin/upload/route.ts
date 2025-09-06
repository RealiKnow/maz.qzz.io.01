import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // For Edge Runtime, we can't write to the filesystem
    // In production, you'd use a cloud storage service like Cloudflare R2, AWS S3, etc.
    
    // Generate a mock URL for demonstration
    const timestamp = Date.now()
    const originalName = file.name
    const extension = originalName.split('.').pop()
    const filename = `${timestamp}.${extension}`

    // Return a mock URL (in production, this would be the actual cloud storage URL)
    const fileUrl = `/uploads/${filename}`

    return NextResponse.json({ 
      message: 'File uploaded successfully',
      url: fileUrl 
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}