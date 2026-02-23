import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('home_partners')
      .select('*')

    if (error) {
      console.error('Error fetching partners:', error)
      return NextResponse.json(
        { error: 'Failed to fetch partners' },
        { status: 500 }
      )
    }

    const transformedData = (data || []).map((p) => ({
      name: p.name,
      logo: p.logo,
      type: { en: p.type_en, ar: p.type_ar },
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
