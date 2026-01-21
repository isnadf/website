export interface Activity {
  id: string
  slug: string
  title_en: string
  title_ar: string
  date_en: string
  date_ar: string
  date_value: string
  location_en: string
  location_ar: string
  description_en: string
  description_ar: string
  full_description_en: string
  full_description_ar: string
  image: string | null
  category_en: string
  category_ar: string
  featured: boolean
  year: number
  gallery_images: string[] | null
  gallery_videos: string[] | null
  created_at: string
  updated_at: string
}

export interface ActivityListItem {
  id: string
  slug: string
  title: {
    en: string
    ar: string
  }
  date: {
    en: string
    ar: string
  }
  location: {
    en: string
    ar: string
  }
  description: {
    en: string
    ar: string
  }
  image: string | null
  category: {
    en: string
    ar: string
  }
  featured: boolean
  year: number
  href: string
}
