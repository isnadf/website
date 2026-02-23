import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * Fetches all homepage content in a single request for optimal performance.
 */
export async function GET() {
  try {
    const [heroRes, heroImagesRes, campaignsRes, partnersRes] = await Promise.all([
      supabase.from('home_hero').select('*').limit(1).single(),
      supabase.from('home_hero_images').select('*').order('display_order', { ascending: true }),
      supabase
        .from('home_campaigns')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true })
        .limit(3),
      supabase.from('home_partners').select('*'),
    ])

    if (heroRes.error || campaignsRes.error || partnersRes.error || heroImagesRes.error) {
      console.error('Error fetching homepage content:', {
        hero: heroRes.error,
        heroImages: heroImagesRes.error,
        campaigns: campaignsRes.error,
        partners: partnersRes.error,
      })
      return NextResponse.json(
        { error: 'Failed to fetch homepage content' },
        { status: 500 }
      )
    }

    const hero = heroRes.data
    const heroImages = heroImagesRes.data || []
    const campaigns = campaignsRes.data || []
    const partners = partnersRes.data || []

    return NextResponse.json({
      hero: hero
        ? {
            banner: { en: hero.banner_en, ar: hero.banner_ar },
            heading: { en: hero.heading_en, ar: hero.heading_ar },
            subheading: { en: hero.subheading_en, ar: hero.subheading_ar },
            description: { en: hero.description_en, ar: hero.description_ar },
          }
        : null,
      heroImages: heroImages.map((img) => ({
        image: img.image,
        alt: { en: img.alt_en, ar: img.alt_ar },
      })),
      campaigns: campaigns.map((c) => ({
        slug: c.slug,
        title: { en: c.title_en, ar: c.title_ar },
        tagline: { en: c.tagline_en, ar: c.tagline_ar },
        description: { en: c.description_en, ar: c.description_ar },
        image: c.image,
        pdf: c.pdf,
        paid: c.paid.toLocaleString(),
        left: c.left_amount.toLocaleString(),
        goal: c.goal,
        progress: Math.min(Math.round((c.paid / c.goal) * 100), 100),
      })),
      partners: partners.map((p) => ({
        name: p.name,
        logo: p.logo,
        type: { en: p.type_en, ar: p.type_ar },
      })),
    })
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
