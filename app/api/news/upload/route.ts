import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const path = formData.get('path') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const fileBuffer = await file.arrayBuffer()
    const fileName = path || file.name
    const filePath = fileName.startsWith('/') ? fileName.slice(1) : fileName

    const { data, error } = await supabase.storage
      .from('news-assets')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: true
      })

    if (error) {
      console.error('Error uploading file:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    const { data: { publicUrl } } = supabase.storage
      .from('news-assets')
      .getPublicUrl(filePath)

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: filePath
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
