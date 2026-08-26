import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '../lib/i18n'

export const metadata: Metadata = {
  metadataBase: new URL('https://heliox-git-main-jesus-barrios.vercel.app'),
  title: {
    default: 'HELIOX — Observatorio Solar en Tiempo Real | Tormentas Solares y Satélites NASA & NOAA',
    template: '%s | HELIOX',
  },
  description:
    'Observatorio solar 24/7 en español y multilenguaje con datos oficiales en vivo de NASA, NOAA y ESA. Monitoreo en tiempo real de tormentas geomagnéticas, llamaradas solares clase X, índice Kp e imágenes satelitales SDO. Fundado y dirigido por JESÚS BARRIOS.',
  keywords: [
    'sol en tiempo real', 'tormenta solar', 'llamarada solar', 'kp index',
    'NASA DONKI', 'NOAA SWPC', 'clima espacial', 'CME', 'aurora boreal',
    'HELIOX', 'Jesús Barrios', 'observatorio solar', 'viento solar', 'SDO NASA',
    'solar storm live', 'solar flare tracker', 'space weather latinoamerica',
    'heliophysics', 'solar cycle 25', 'ciclo solar 25', 'alerta tormenta solar'
  ],
  authors: [{ name: 'JESÚS BARRIOS', url: 'https://heliox-git-main-jesus-barrios.vercel.app' }],
  creator: 'JESÚS BARRIOS',
  publisher: 'HELIOX Solar Observatory',
  applicationName: 'HELIOX',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
  },
  other: {
    'google-adsense-account': 'ca-pub-3600083129868122',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    alternateLocale: ['en_US', 'pt_BR', 'fr_FR', 'de_DE', 'it_IT', 'ja_JP'],
    url: 'https://heliox-git-main-jesus-barrios.vercel.app',
    siteName: 'HELIOX — Observatorio Solar en Tiempo Real',
    title: 'HELIOX — Observatorio Solar en Tiempo Real | Datos Satelitales NASA & NOAA',
    description: 'Monitoreo del Sol 24/7 en tiempo real con datos de NASA y NOAA. Tormentas solares, llamaradas e imágenes satelitales SDO en vivo. Por JESÚS BARRIOS.',
    images: [{ url: '/favicon.svg', width: 512, height: 512, alt: 'HELIOX Solar Observatory Logo por JESÚS BARRIOS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HELIOX — Observatorio Solar en Tiempo Real',
    description: 'Sol en vivo 24/7 con telemetría satelital NASA + NOAA. Por JESÚS BARRIOS.',
    images: ['/favicon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
  const adsenseId = 'ca-pub-3600083129868122'

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ResearchProject',
      name: 'HELIOX Solar Observatory',
      alternateName: 'HELIOX Observatorio Solar',
      url: 'https://heliox-git-main-jesus-barrios.vercel.app',
      logo: 'https://heliox-git-main-jesus-barrios.vercel.app/favicon.svg',
      image: 'https://heliox-git-main-jesus-barrios.vercel.app/favicon.svg',
      founder: {
        '@type': 'Person',
        name: 'JESUS BARRIOS',
        jobTitle: 'Founder & Principal Investigator',
      },
      description: 'Observatorio solar de acceso libre y monitoreo satelital en tiempo real para Latinoamérica y el mundo.',
      knowsAbout: [
        'Space Weather', 'Solar Flares', 'Coronal Mass Ejections',
        'Geomagnetic Storms', 'Solar Wind', 'Planetary K-index'
      ],
      sameAs: [
        'https://github.com/Mister124x/heliox'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'HELIOX',
      url: 'https://heliox-git-main-jesus-barrios.vercel.app',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://heliox-git-main-jesus-barrios.vercel.app/storms?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ]

  return (
    <html lang="es" className="dark">
      <head>
        {/* Favicon & Web Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Meta Tag de Verificación de Cuenta Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-3600083129868122" />

        {/* Schema.org Structured Data para Google Search Indexing */}
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
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
