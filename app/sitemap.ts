import { MetadataRoute } from 'next'
import { activitiesData } from './activities/data'

// Static routes
const staticRoutes = [
  { url: '', priority: 1.0, changeFrequency: 'daily' as const },
  { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/donate', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/educational-environment', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/news', priority: 0.8, changeFrequency: 'daily' as const },
  { url: '/activities', priority: 0.64, changeFrequency: 'weekly' as const },
  { url: '/programs', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/success-stories', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/testimonials', priority: 0.64, changeFrequency: 'monthly' as const },
]

// Program routes
const programRoutes = [
  '/programs/pulse-of-life',
  '/programs/palestinian-talented',
  '/programs/sustainability',
  '/programs/justice-for-palestine',
  '/programs/ibn-khaldun',
]

// Campaign routes
const campaignRoutes = [
  '/campaigns/sponsor-medical-student',
  '/campaigns/support-quran-memorizer',
  '/campaigns/empower-gazan-female-student',
]

// Donate routes for programs
const donateRoutes = [
  '/donate/pulse-of-life',
  '/donate/palestinian-talented',
  '/donate/sustainability',
  '/donate/justice-for-palestine',
  '/donate/ibn-khaldun',
]

// PDF files in ProgramsFiles
const pdfRoutes = [
  '/2026-pdfs/pulse-of-life/program-en.pdf',
  '/2026-pdfs/pulse-of-life/program-ar.pdf',
  '/2026-pdfs/pulse-of-life/Brochure-en.pdf',
  '/2026-pdfs/pulse-of-life/Brochures-ar.pdf',
  '/2026-pdfs/palestinian-talented/program-en.pdf',
  '/2026-pdfs/palestinian-talented/program-ar.pdf',
  '/2026-pdfs/palestinian-talented/Brochure-en.pdf',
  '/2026-pdfs/palestinian-talented/Brochure-ar.pdf',
  '/2026-pdfs/sustainability/program-en.pdf',
  '/2026-pdfs/sustainability/program-ar.pdf',
  '/2026-pdfs/sustainability/Brochure-en.pdf',
  '/2026-pdfs/sustainability/Brochure-ar.pdf',
  '/2026-pdfs/justice-for-palestine/program-en.pdf',
  '/2026-pdfs/justice-for-palestine/program-ar.pdf',
  '/2026-pdfs/justice-for-palestine/Brochure-en.pdf',
  '/2026-pdfs/justice-for-palestine/Brochure-ar.pdf',
  '/2026-pdfs/ibn-khaldun/program-en.pdf',
  '/2026-pdfs/ibn-khaldun/program-ar.pdf',
  '/2026-pdfs/ibn-khaldun/Brochure-en.pdf',
  '/2026-pdfs/ibn-khaldun/Brochure-ar.pdf',
]

// Success story routes
const successStoryRoutes = [
  '/success-stories/ahmed-hassan',
  '/success-stories/layla-mahmoud',
  '/success-stories/omar-khalidi',
  '/success-stories/nour-al-jabari',
  '/success-stories/sami-barakat',
  '/success-stories/rania-abed',
]

// News routes - you can expand this by fetching from your news data source
const newsRoutes = [
  '/news/pulse-of-life-biman-scholarships',
  '/news/isnad-visits-wafa-foundation-indonesia',
  '/news/isnad-visits-university-of-indonesia',
  '/news/pulse-of-life-gaza-medical-scholarships',
  '/news/pulse-of-life-disbursement',
  '/news/nabd-al-hayat-scholarship-interviews',
  '/news/nabd-al-hayat-grant-interviews',
  '/news/isnad-support-tour',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://isnadf.org'
  const currentDate = new Date().toISOString()

  // Generate routes from static routes
  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Add program routes
  programRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.64,
    })
  })

  // Add campaign routes
  campaignRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  })

  // Add donate routes for programs
  donateRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  })

  // Add PDF files
  pdfRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.51,
    })
  })

  // Add success story routes
  successStoryRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.64,
    })
  })

  // Add news routes
  newsRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })
  })

  // Add activity routes from data
  activitiesData.forEach((activity) => {
    routes.push({
      url: `${baseUrl}/activities/${activity.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: activity.featured ? 0.8 : 0.51,
    })
  })

  return routes
}
