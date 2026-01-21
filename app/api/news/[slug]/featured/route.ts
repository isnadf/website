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
      const { count, error: countError } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true })
        .eq('featured', true)
        .neq('slug', slug)

      if (countError) {
        throw countError
      }

      if (count && count >= 3) {
        return NextResponse.json(
          { error: 'Maximum 3 news items can be featured. Unfeature another item first.' },
          { status: 400 }
        )
      }
    }

    const { data, error } = await supabase
      .from('news')
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
