import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://heliox-observatory.vercel.app'
  const lastModified = new Date()

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'always',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified,
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/storms`,
      lastModified,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reels`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/analysis`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
