import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'
import { activitiesData } from '../app/activities/data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://elmborcyvhcrzqcirasl.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbWJvcmN5dmhjcnpxY2lyYXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDEwMjksImV4cCI6MjA4NDQ3NzAyOX0.N847Sycs6MlSjxPga7DQEvJBJHIP67sdkwFO3x_7jSA'

if (!supabaseKey) {
  throw new Error('Missing Supabase key')
}

const supabase = createClient(supabaseUrl, supabaseKey)

function generateSlug(titleEn: string): string {
  return titleEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100)
}

function parseDate(dateStr: string): string {
  const months: { [key: string]: string } = {
    january: '01', february: '02', march: '03', april: '04',
    may: '05', june: '06', july: '07', august: '08',
    september: '09', october: '10', november: '11', december: '12'
  }

  const dateMatch = dateStr.match(/(\w+)\s+(\d+)(?:-(\d+))?,\s+(\d{4})/)
  if (dateMatch) {
    const [, month, day1, day2, year] = dateMatch
    const monthNum = months[month.toLowerCase()]
    const day = day1.padStart(2, '0')
    return `${year}-${monthNum}-${day}`
  }

  const arabicMatch = dateStr.match(/(\d+)\s+(\w+)\s+(\d{4})/)
  if (arabicMatch) {
    const [, day, monthAr, year] = arabicMatch
    const monthMap: { [key: string]: string } = {
      'يناير': '01', 'فبراير': '02', 'مارس': '03', 'أبريل': '04',
      'مايو': '05', 'يونيو': '06', 'يوليو': '07', 'أغسطس': '08',
      'سبتمبر': '09', 'أكتوبر': '10', 'نوفمبر': '11', 'ديسمبر': '12'
    }
    const monthNum = monthMap[monthAr] || '01'
    return `${year}-${monthNum}-${day.padStart(2, '0')}`
  }

  return new Date().toISOString().split('T')[0]
}

const galleryMappings: { [key: number]: { images: string[], videos: string[] } } = {
  0: {
    images: [
      "/1-1-2026/1.jpeg",
      "/1-1-2026/2.jpeg",
      "/1-1-2026/3.jpeg",
      "/1-1-2026/4.jpeg",
      "/1-1-2026/5.jpeg",
      "/1-1-2026/6.jpeg",
      "/1-1-2026/7.jpeg",
      "/1-1-2026/8.jpeg"
    ],
    videos: []
  },
  1: {
    images: [
      "/one/PHOTO-2025-04-20-18-03-45.jpg",
      "/one/PHOTO-2025-04-20-18-03-46 2.jpg",
      "/one/PHOTO-2025-04-20-18-03-46 3.jpg",
      "/one/PHOTO-2025-04-20-18-03-46 4.jpg",
      "/one/PHOTO-2025-04-20-18-03-46.jpg",
      "/one/PHOTO-2025-04-20-18-03-47 2.jpg",
      "/one/PHOTO-2025-04-20-18-03-47 3.jpg",
      "/one/PHOTO-2025-04-20-18-03-47 4.jpg",
      "/one/PHOTO-2025-04-20-18-03-47 5.jpg",
      "/one/PHOTO-2025-04-20-18-03-47.jpg",
      "/one/PHOTO-2025-04-20-18-03-48 2.jpg",
      "/one/PHOTO-2025-04-20-18-03-48.jpg"
    ],
    videos: ["/one/VIDEO-2025-04-20-18-03-48.mp4"]
  },
  2: {
    images: [
      "/two/PHOTO-2025-04-20-18-04-02 2.jpg",
      "/two/PHOTO-2025-04-20-18-04-02 3.jpg",
      "/two/PHOTO-2025-04-20-18-04-02 4.jpg",
      "/two/PHOTO-2025-04-20-18-04-02.jpg",
      "/two/PHOTO-2025-04-20-18-04-03 2.jpg",
      "/two/PHOTO-2025-04-20-18-04-03 3.jpg",
      "/two/PHOTO-2025-04-20-18-04-03 4.jpg",
      "/two/PHOTO-2025-04-20-18-04-03.jpg",
      "/two/PHOTO-2025-04-20-18-04-04 2.jpg",
      "/two/PHOTO-2025-04-20-18-04-04 3.jpg",
      "/two/PHOTO-2025-04-20-18-04-04 4.jpg",
      "/two/PHOTO-2025-04-20-18-04-04 5.jpg",
      "/two/PHOTO-2025-04-20-18-04-04.jpg",
      "/two/PHOTO-2025-04-20-18-04-05.jpg"
    ],
    videos: []
  },
  3: {
    images: [
      "/three/PHOTO-2025-04-20-18-04-17 2.jpg",
      "/three/PHOTO-2025-04-20-18-04-17.jpg",
      "/three/PHOTO-2025-04-20-18-04-18 2.jpg",
      "/three/PHOTO-2025-04-20-18-04-18 3.jpg",
      "/three/PHOTO-2025-04-20-18-04-18.jpg"
    ],
    videos: []
  },
  4: {
    images: [
      "/four/PHOTO-2025-04-26-22-18-22 2.jpg",
      "/four/PHOTO-2025-04-26-22-18-22 3.jpg",
      "/four/PHOTO-2025-04-26-22-18-22 4.jpg",
      "/four/PHOTO-2025-04-26-22-18-22 5.jpg",
      "/four/PHOTO-2025-04-26-22-18-22.jpg"
    ],
    videos: ["/four/VIDEO-2025-04-26-22-18-23.mp4"]
  },
  5: {
    images: [
      "/five/DSC07404.jpg",
      "/five/DSC07413.jpg",
      "/five/DSC07417.jpg",
      "/five/DSC07427.jpg",
      "/five/DSC07431.jpg",
      "/five/DSC07433.jpg",
      "/five/DSC07462.jpg",
      "/five/DSC07469.jpg",
      "/five/DSC07478.jpg",
      "/five/DSC07485.jpg",
      "/five/DSC07489.jpg",
      "/five/DSC07508.jpg",
      "/five/DSC07509.jpg",
      "/five/DSC07513.jpg",
      "/five/DSC07522.jpg",
      "/five/DSC07538.jpg",
      "/five/DSC07542.jpg",
      "/five/DSC07548.jpg"
    ],
    videos: ["/five/VIDEO-2025-04-26-22-20-53.mp4"]
  },
  6: {
    images: [
      "/six/PHOTO-2025-04-26-22-24-14 2.jpg",
      "/six/PHOTO-2025-04-26-22-24-14.jpg",
      "/six/PHOTO-2025-04-26-22-24-15.jpg"
    ],
    videos: ["/six/VIDEO-2025-04-26-22-24-15.mp4"]
  },
  7: {
    images: [
      "/seven/1.jpeg",
      "/seven/2.jpeg"
    ],
    videos: []
  }
}

async function uploadFile(localPath: string, storagePath: string): Promise<string> {
  const publicPath = join(process.cwd(), 'public', localPath)
  const fileBuffer = readFileSync(publicPath)
  const fileName = storagePath.split('/').pop() || 'file'

  const { data, error } = await supabase.storage
    .from('activities-assets')
    .upload(storagePath, fileBuffer, {
      contentType: fileName.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg',
      upsert: true
    })

  if (error) {
    console.error(`Error uploading ${localPath}:`, error)
    throw error
  }

  const { data: { publicUrl } } = supabase.storage
    .from('activities-assets')
    .getPublicUrl(storagePath)

  return publicUrl
}

async function migrateActivities() {
  console.log('Starting activities migration...')

  const featuredActivities: typeof activitiesData = []
  const nonFeaturedActivities: typeof activitiesData = []

  for (const activity of activitiesData) {
    if (activity.featured) {
      featuredActivities.push(activity)
    } else {
      nonFeaturedActivities.push(activity)
    }
  }

  console.log(`\nMigrating ${nonFeaturedActivities.length} non-featured activities first...`)
  for (const activity of nonFeaturedActivities) {
    const slug = generateSlug(activity.title.en)
    console.log(`\nProcessing activity ${activity.id}: ${slug}`)

    const dateValue = parseDate(activity.date.en)
    console.log(`  Date value: ${dateValue}`)

    const gallery = galleryMappings[activity.id] || { images: [], videos: [] }
    
    const imagePath = activity.image.startsWith('/') ? activity.image.slice(1) : activity.image
    const storageImagePath = imagePath

    console.log(`  Uploading main image: ${storageImagePath}`)
    const imageUrl = await uploadFile(activity.image, storageImagePath)

    const galleryImages: string[] = []
    const galleryVideos: string[] = []

    for (const imgPath of gallery.images) {
      const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath
      console.log(`  Uploading gallery image: ${cleanPath}`)
      const url = await uploadFile(imgPath, cleanPath)
      galleryImages.push(url)
    }

    for (const vidPath of gallery.videos) {
      const cleanPath = vidPath.startsWith('/') ? vidPath.slice(1) : vidPath
      console.log(`  Uploading gallery video: ${cleanPath}`)
      const url = await uploadFile(vidPath, cleanPath)
      galleryVideos.push(url)
    }

    const { data, error } = await supabase
      .from('activities')
      .insert({
        slug,
        title_en: activity.title.en,
        title_ar: activity.title.ar,
        date_en: activity.date.en,
        date_ar: activity.date.ar,
        date_value: dateValue,
        location_en: activity.location.en,
        location_ar: activity.location.ar,
        description_en: activity.description.en,
        description_ar: activity.description.ar,
        full_description_en: activity.full_description.en,
        full_description_ar: activity.full_description.ar,
        image: imageUrl,
        category_en: activity.category.en,
        category_ar: activity.category.ar,
        featured: activity.featured,
        year: activity.year,
        gallery_images: galleryImages,
        gallery_videos: galleryVideos
      })
      .select()
      .single()

    if (error) {
      console.error(`  Error inserting activity ${activity.id}:`, error)
      throw error
    }

    console.log(`  ✓ Activity ${activity.id} migrated successfully`)
  }

  console.log(`\nMigrating ${featuredActivities.length} featured activities (inserting as non-featured first)...`)
  const featuredSlugs: string[] = []
  for (const activity of featuredActivities) {
    const slug = generateSlug(activity.title.en)
    console.log(`\nProcessing activity ${activity.id}: ${slug}`)

    const dateValue = parseDate(activity.date.en)
    console.log(`  Date value: ${dateValue}`)

    const gallery = galleryMappings[activity.id] || { images: [], videos: [] }
    
    const imagePath = activity.image.startsWith('/') ? activity.image.slice(1) : activity.image
    const storageImagePath = imagePath

    console.log(`  Uploading main image: ${storageImagePath}`)
    const imageUrl = await uploadFile(activity.image, storageImagePath)

    const galleryImages: string[] = []
    const galleryVideos: string[] = []

    for (const imgPath of gallery.images) {
      const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath
      console.log(`  Uploading gallery image: ${cleanPath}`)
      const url = await uploadFile(imgPath, cleanPath)
      galleryImages.push(url)
    }

    for (const vidPath of gallery.videos) {
      const cleanPath = vidPath.startsWith('/') ? vidPath.slice(1) : vidPath
      console.log(`  Uploading gallery video: ${cleanPath}`)
      const url = await uploadFile(vidPath, cleanPath)
      galleryVideos.push(url)
    }

    const { data, error } = await supabase
      .from('activities')
      .insert({
        slug,
        title_en: activity.title.en,
        title_ar: activity.title.ar,
        date_en: activity.date.en,
        date_ar: activity.date.ar,
        date_value: dateValue,
        location_en: activity.location.en,
        location_ar: activity.location.ar,
        description_en: activity.description.en,
        description_ar: activity.description.ar,
        full_description_en: activity.full_description.en,
        full_description_ar: activity.full_description.ar,
        image: imageUrl,
        category_en: activity.category.en,
        category_ar: activity.category.ar,
        featured: false,
        year: activity.year,
        gallery_images: galleryImages,
        gallery_videos: galleryVideos
      })
      .select()
      .single()

    if (error) {
      console.error(`  Error inserting activity ${activity.id}:`, error)
      throw error
    }

    featuredSlugs.push(slug)
    console.log(`  ✓ Activity ${activity.id} migrated successfully`)
  }

  console.log(`\nUpdating first 3 featured activities to featured=true...`)
  for (let i = 0; i < Math.min(3, featuredSlugs.length); i++) {
    const { error } = await supabase
      .from('activities')
      .update({ featured: true })
      .eq('slug', featuredSlugs[i])
    
    if (error) {
      console.error(`  Error updating ${featuredSlugs[i]}:`, error)
    } else {
      console.log(`  ✓ Updated ${featuredSlugs[i]} to featured`)
    }
  }

  console.log('\n✓ All activities migrated successfully!')
}

migrateActivities().catch(console.error)
