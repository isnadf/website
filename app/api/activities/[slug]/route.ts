import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Activity } from '@/types/activities'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://elmborcyvhcrzqcirasl.supabase.co'
const STORAGE_BUCKET = 'activities-assets'

function transformToStorageUrl(path: string | null): string | null {
  if (!path) return null
  if (path.startsWith('http')) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${cleanPath}`
}

function transformArrayToStorageUrls(paths: string[] | null): string[] {
  if (!paths || paths.length === 0) return []
  return paths.map(path => transformToStorageUrl(path) || path)
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching activity:', error)
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      )
    }

    const transformedData = {
      id: data.id,
      slug: data.slug,
      title: {
        en: data.title_en,
        ar: data.title_ar,
      },
      date: {
        en: data.date_en,
        ar: data.date_ar,
      },
      location: {
        en: data.location_en,
        ar: data.location_ar,
      },
      description: {
        en: data.description_en,
        ar: data.description_ar,
      },
      full_description: {
        en: data.full_description_en,
        ar: data.full_description_ar,
      },
      image: transformToStorageUrl(data.image),
      category: {
        en: data.category_en,
        ar: data.category_ar,
      },
      featured: data.featured,
      year: data.year,
      gallery_images: transformArrayToStorageUrls(data.gallery_images),
      gallery_videos: transformArrayToStorageUrls(data.gallery_videos),
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const updates = await request.json()

    const { data, error } = await supabase
      .from('activities')
      .update(updates)
      .eq('slug', slug)
      .select()
      .single()

    if (error) {
      console.error('Error updating activity:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('slug', slug)

    if (error) {
      console.error('Error deleting activity:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
