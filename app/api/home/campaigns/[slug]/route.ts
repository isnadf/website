import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const { data, error } = await supabase
      .from('home_campaigns')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      slug: data.slug,
      title: { en: data.title_en, ar: data.title_ar },
      tagline: { en: data.tagline_en, ar: data.tagline_ar },
      description: { en: data.description_en, ar: data.description_ar },
      image: data.image,
      pdf: data.pdf,
      isFeatured: data.is_featured,
      paid: data.paid,
      left: data.left_amount,
      goal: data.goal,
      progress: Math.min(Math.round((data.paid / data.goal) * 100), 100),
    })
  } catch (error) {
    console.error('Error fetching campaign:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
