import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HELIOX — Observatorio Solar en Tiempo Real',
    short_name: 'HELIOX',
    description:
      'Observatorio solar en tiempo real con telemetría oficial de NASA, NOAA y ESA. Monitoreo de tormentas geomagnéticas, llamaradas y viento solar por JESÚS BARRIOS.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    categories: ['education', 'science', 'weather', 'utilities'],
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  }
}
