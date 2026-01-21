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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured')
    const year = searchParams.get('year')
    const location = searchParams.get('location')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('activities')
      .select('*')
      .order('date_value', { ascending: false })
      .range(offset, offset + limit - 1)

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (year && year !== 'All') {
      query = query.eq('year', parseInt(year))
    }

    if (location && location !== 'All') {
      query = query.or(`location_en.ilike.%${location}%,location_ar.ilike.%${location}%`)
    }

    if (search) {
      query = query.or(`title_en.ilike.%${search}%,title_ar.ilike.%${search}%,description_en.ilike.%${search}%,description_ar.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching activities:', error)
      return NextResponse.json(
        { error: 'Failed to fetch activities' },
        { status: 500 }
      )
    }

    const transformedData = data.map((activity: Activity) => ({
      id: activity.id,
      slug: activity.slug,
      title: {
        en: activity.title_en,
        ar: activity.title_ar,
      },
      date: {
        en: activity.date_en,
        ar: activity.date_ar,
      },
      location: {
        en: activity.location_en,
        ar: activity.location_ar,
      },
      description: {
        en: activity.description_en,
        ar: activity.description_ar,
      },
      image: transformToStorageUrl(activity.image),
      href: `/activities/${activity.slug}`,
      category: {
        en: activity.category_en,
        ar: activity.category_ar,
      },
      featured: activity.featured,
      year: activity.year,
    }))

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      slug,
      title_en,
      title_ar,
      date_en,
      date_ar,
      date_value,
      location_en,
      location_ar,
      description_en,
      description_ar,
      full_description_en,
      full_description_ar,
      image,
      category_en,
      category_ar,
      featured,
      year,
      gallery_images,
      gallery_videos
    } = body

    if (!slug || !title_en || !title_ar || !date_value || !year) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, title_en, title_ar, date_value, year' },
        { status: 400 }
      )
    }

    if (featured) {
      const { count } = await supabase
        .from('activities')
        .select('*', { count: 'exact', head: true })
        .eq('featured', true)

      if (count && count >= 3) {
        return NextResponse.json(
          { error: 'Maximum 3 activities can be featured. Unfeature another activity first.' },
          { status: 400 }
        )
      }
    }

    const { data, error } = await supabase
      .from('activities')
      .insert({
        slug,
        title_en,
        title_ar,
        date_en: date_en || '',
        date_ar: date_ar || '',
        date_value,
        location_en,
        location_ar,
        description_en: description_en || '',
        description_ar: description_ar || '',
        full_description_en: full_description_en || '',
        full_description_ar: full_description_ar || '',
        image,
        category_en,
        category_ar,
        featured: featured || false,
        year,
        gallery_images: gallery_images || [],
        gallery_videos: gallery_videos || []
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating activity:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
