import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { News } from '@/types/news'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching news article:', error)
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      )
    }

    const transformedData = {
      title: {
        en: data.title_en,
        ar: data.title_ar,
      },
      date: data.date,
      author: data.author,
      category: {
        en: data.category_en,
        ar: data.category_ar,
      },
      image: data.image,
      heroImage: data.hero_image,
      heroVideo: data.hero_video,
      galleryImages: data.gallery_images || [],
      galleryVideos: data.gallery_videos || [],
      content: {
        en: data.content_en || [],
        ar: data.content_ar || [],
      },
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
    const body = await request.json()

    const {
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

    if (featured) {
      const { count } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true })
        .eq('featured', true)
        .neq('slug', slug)

      if (count && count >= 3) {
        return NextResponse.json(
          { error: 'Maximum 3 news items can be featured. Unfeature another item first.' },
          { status: 400 }
        )
      }
    }

    const updates: Partial<News> = {}
    if (title_en !== undefined) updates.title_en = title_en
    if (title_ar !== undefined) updates.title_ar = title_ar
    if (excerpt_en !== undefined) updates.excerpt_en = excerpt_en
    if (excerpt_ar !== undefined) updates.excerpt_ar = excerpt_ar
    if (content_en !== undefined) updates.content_en = content_en
    if (content_ar !== undefined) updates.content_ar = content_ar
    if (date !== undefined) updates.date = date
    if (author !== undefined) updates.author = author
    if (category_en !== undefined) updates.category_en = category_en
    if (category_ar !== undefined) updates.category_ar = category_ar
    if (image !== undefined) updates.image = image
    if (hero_image !== undefined) updates.hero_image = hero_image
    if (hero_video !== undefined) updates.hero_video = hero_video
    if (gallery_images !== undefined) updates.gallery_images = gallery_images
    if (gallery_videos !== undefined) updates.gallery_videos = gallery_videos
    if (featured !== undefined) updates.featured = featured

    const { data, error } = await supabase
      .from('news')
      .update(updates)
      .eq('slug', slug)
      .select()
      .single()

    if (error) {
      console.error('Error updating news:', error)
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
      .from('news')
      .delete()
      .eq('slug', slug)

    if (error) {
      console.error('Error deleting news:', error)
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
