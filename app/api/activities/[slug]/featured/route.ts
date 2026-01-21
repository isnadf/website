import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { featured } = await request.json()

    if (typeof featured !== 'boolean') {
      return NextResponse.json(
        { error: 'Featured must be a boolean' },
        { status: 400 }
      )
    }

    if (featured) {
      const { data: featuredCount, error: countError } = await supabase
        .from('activities')
        .select('id', { count: 'exact', head: true })
        .eq('featured', true)

      if (countError) {
        throw countError
      }

      if (featuredCount && featuredCount.length >= 3) {
        const { data: currentItem } = await supabase
          .from('activities')
          .select('featured')
          .eq('slug', slug)
          .single()

        if (!currentItem || !currentItem.featured) {
          return NextResponse.json(
            { error: 'Maximum 3 activities can be featured. Unfeature another activity first.' },
            { status: 400 }
          )
        }
      }
    }

    const { data, error } = await supabase
      .from('activities')
      .update({ featured })
      .eq('slug', slug)
      .select()
      .single()

    if (error) {
      console.error('Error updating featured status:', error)
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
