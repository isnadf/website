import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('home_campaigns')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching campaigns:', error)
      return NextResponse.json(
        { error: 'Failed to fetch campaigns' },
        { status: 500 }
      )
    }

    const transformedData = (data || []).map((c) => ({
      slug: c.slug,
      title: { en: c.title_en, ar: c.title_ar },
      tagline: { en: c.tagline_en, ar: c.tagline_ar },
      description: { en: c.description_en, ar: c.description_ar },
      image: c.image,
      pdf: c.pdf,
      isFeatured: c.is_featured,
      paid: c.paid.toLocaleString(),
      left: c.left_amount.toLocaleString(),
      goal: c.goal,
      progress: Math.min(Math.round((c.paid / c.goal) * 100), 100),
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
