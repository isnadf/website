import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/successful-payment',
          '/failed-payment',
        ],
      },
    ],
    sitemap: 'https://isnadf.org/sitemap.xml',
  }
}

