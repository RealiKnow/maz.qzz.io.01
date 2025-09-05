import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate a unique filename
    const timestamp = Date.now()
    const originalName = file.name
    const extension = originalName.split('.').pop()
    const filename = `${timestamp}.${extension}`

    // Save the file to the public directory
    const path = join(process.cwd(), 'public', 'uploads', filename)
    await writeFile(path, buffer)

    // Return the URL to access the uploaded file
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