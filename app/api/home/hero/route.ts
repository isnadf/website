import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const [heroRes, heroImagesRes] = await Promise.all([
      supabase.from('home_hero').select('*').limit(1).single(),
      supabase.from('home_hero_images').select('*').order('display_order', { ascending: true }),
    ])

    if (heroRes.error || !heroRes.data) {
      return NextResponse.json(
        { error: 'Hero content not found' },
        { status: 404 }
      )
    }

    if (heroImagesRes.error) {
      console.error('Error fetching hero images:', heroImagesRes.error)
      return NextResponse.json(
        { error: 'Failed to fetch hero images' },
        { status: 500 }
      )
    }

    const data = heroRes.data
    const heroImages = heroImagesRes.data || []

    return NextResponse.json({
      banner: { en: data.banner_en, ar: data.banner_ar },
      heading: { en: data.heading_en, ar: data.heading_ar },
      subheading: { en: data.subheading_en, ar: data.subheading_ar },
      description: { en: data.description_en, ar: data.description_ar },
      images: heroImages.map((img) => ({
        image: img.image,
        alt: { en: img.alt_en, ar: img.alt_ar },
      })),
    })
  } catch (error) {
    console.error('Error fetching hero:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
