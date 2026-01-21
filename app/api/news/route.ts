import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { News } from '@/types/news'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })
      .range(offset, offset + limit - 1)

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching news:', error)
      return NextResponse.json(
        { error: 'Failed to fetch news' },
        { status: 500 }
      )
    }

    const transformedData = data.map((news: News) => ({
      id: news.id,
      slug: news.slug,
      title: {
        en: news.title_en,
        ar: news.title_ar,
      },
      excerpt: {
        en: news.excerpt_en,
        ar: news.excerpt_ar,
      },
      date: news.date,
      image: news.image,
      href: `/news/${news.slug}`,
      category: {
        en: news.category_en,
        ar: news.category_ar,
      },
      featured: news.featured,
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
      excerpt_en,
      excerpt_ar,
      content_en,
      content_ar,
      date,
      author,
      category_en,
      category_ar,
      image,
      hero_image,
      hero_video,
      gallery_images,
      gallery_videos,
      featured
    } = body

    if (!slug || !title_en || !title_ar || !date) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, title_en, title_ar, date' },
        { status: 400 }
      )
    }

    if (featured) {
      const { count } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true })
        .eq('featured', true)

      if (count && count >= 3) {
        return NextResponse.json(
          { error: 'Maximum 3 news items can be featured. Unfeature another item first.' },
          { status: 400 }
        )
      }
    }

    const { data, error } = await supabase
      .from('news')
      .insert({
        slug,
        title_en,
        title_ar,
        excerpt_en: excerpt_en || '',
        excerpt_ar: excerpt_ar || '',
        content_en: content_en || [],
        content_ar: content_ar || [],
        date,
        author: author || 'Isnad Foundation',
        category_en,
        category_ar,
        image,
        hero_image,
        hero_video,
        gallery_images: gallery_images || [],
        gallery_videos: gallery_videos || [],
        featured: featured || false
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating news:', error)
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
