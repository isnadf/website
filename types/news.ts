export interface News {
  id: string
  slug: string
  title_en: string
  title_ar: string
  excerpt_en: string
  excerpt_ar: string
  content_en: string[]
  content_ar: string[]
  date: string
  author: string
  category_en: string
  category_ar: string
  image: string | null
  hero_image: string | null
  hero_video: string | null
  gallery_images: string[] | null
  gallery_videos: string[] | null
  featured: boolean
  created_at: string
  updated_at: string
}

export interface NewsListItem {
  id: string
  slug: string
  title: {
    en: string
    ar: string
  }
  excerpt: {
    en: string
    ar: string
  }
  date: string
  image: string | null
  href: string
  category: {
    en: string
    ar: string
  }
  featured: boolean
}
