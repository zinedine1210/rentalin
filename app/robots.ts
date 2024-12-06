import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const BASE_DOMAIN = process.env.BASE_DOMAIN
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${BASE_DOMAIN}/sitemap`,
  }
}