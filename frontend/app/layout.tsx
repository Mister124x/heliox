import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://heliox-git-main-jesus-barrios.vercel.app'),
  title: {
    default: 'HELIOX — Observatorio Solar en Tiempo Real | Tormentas Solares y Satélites',
    template: '%s | HELIOX',
  },
  description:
    'Observatorio solar 24/7 en español con datos oficiales de NASA, NOAA y ESA. Monitoreo en vivo de tormentas geomagnéticas, llamaradas clase X, índice Kp e imágenes del satélite SDO. Creado por JESÚS BARRIOS.',
  keywords: [
    'sol en tiempo real', 'tormenta solar', 'llamarada solar', 'kp index',
    'NASA DONKI', 'NOAA SWPC', 'clima espacial', 'CME', 'aurora boreal',
    'HELIOX', 'Jesús Barrios', 'observatorio solar', 'viento solar', 'SDO NASA',
  ],
  authors: [{ name: 'JESÚS BARRIOS', url: 'https://heliox-git-main-jesus-barrios.vercel.app' }],
  creator: 'JESÚS BARRIOS',
  publisher: 'HELIOX Solar Observatory',
  other: {
    'google-adsense-account': 'ca-pub-3600083129888122',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://heliox-git-main-jesus-barrios.vercel.app',
    siteName: 'HELIOX — Observatorio Solar en Tiempo Real',
    title: 'HELIOX — Observatorio Solar en Tiempo Real | Datos Satelitales NASA & NOAA',
    description: 'Monitoreo del Sol 24/7 en español. Tormentas solares, llamaradas e imágenes en directo. Por JESÚS BARRIOS.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'HELIOX Solar Observatory por JESÚS BARRIOS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HELIOX — Observatorio Solar en Tiempo Real',
    description: 'Sol en vivo 24/7. Datos NASA + NOAA. Por JESÚS BARRIOS.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = 'ca-pub-3600083129888122'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ResearchProject',
    name: 'HELIOX Solar Observatory',
    url: 'https://heliox-git-main-jesus-barrios.vercel.app',
    founder: {
      '@type': 'Person',
      name: 'JESUS BARRIOS',
    },
    description: 'Observatorio solar de acceso libre y monitoreo satelital en tiempo real para Latinoamérica.',
    knowsAbout: ['Space Weather', 'Solar Flares', 'Coronal Mass Ejections', 'Geomagnetic Storms'],
  }

  return (
    <html lang="es" className="dark">
      <head>
        {/* Meta Tag de Verificación de Cuenta Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-3600083129888122" />

        {/* Schema.org Structured Data para Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Google AdSense Script Oficial de Jesús Barrios */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
        />

        {/* Wompi Checkout Widget para Pagos con Tarjeta / PSE en Colombia */}
        <script
          type="text/javascript"
          src="https://checkout.wompi.co/widget.js"
          async
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white font-space antialiased">
        {children}
      </body>
    </html>
  )
}
