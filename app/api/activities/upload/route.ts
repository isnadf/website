import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const path = formData.get('path') as string

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }
    if (!path) {
      return NextResponse.json({ error: 'No path specified for upload' }, { status: 400 })
    }

    const { data, error } = await supabase.storage
      .from('activities-assets')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) {
      console.error('Error uploading file:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from('activities-assets')
      .getPublicUrl(path)

    return NextResponse.json({ success: true, publicUrl })
  } catch (error) {
    console.error('Unexpected error in file upload:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
