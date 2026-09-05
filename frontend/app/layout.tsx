import type { Metadata, Viewport } from 'next'
import './globals.css'
import { I18nProvider } from '../lib/i18n'
import VIPAlertBar from '../components/VIPAlertBar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://heliox-observatory.vercel.app'),
  title: {
    default: 'HELIOX — Observatorio Solar en Tiempo Real | Tormentas Solares, Satélites NASA & NOAA',
    template: '%s | HELIOX Solar Observatory',
  },
  description:
    'Observatorio solar 24/7 en vivo con telemetría oficial de satélites NASA, NOAA y ESA. Monitoreo en tiempo real de tormentas geomagnéticas G1-G5, llamaradas solares clase X, índice Kp, viento solar e imágenes satelitales SDO en alta resolución. Fundado y dirigido por JESÚS BARRIOS.',
  manifest: '/manifest.webmanifest',
  keywords: [
    // Español (Alta intención de búsqueda)
    'sol en tiempo real', 'observatorio solar en vivo', 'tormenta solar hoy', 'alerta tormenta geomagnetica',
    'llamarada solar clase x', 'indice kp hoy', 'aurora boreal prediccion', 'viento solar satelite',
    'manchas solares en directo', 'clima espacial colombia latinoamerica', 'nasa donki en español',
    'noaa swpc en vivo', 'ciclo solar 25', 'HELIOX', 'Jesus Barrios', 'observatorio heliox',
    // English (Global high-traffic queries)
    'live solar observatory', 'solar storm tracker today', 'space weather live', 'real time solar wind',
    'kp index live', 'northern lights aurora forecast', 'solar flare alert', 'coronal mass ejection monitor',
    'nasa sdo live images 4k', 'solar cycle 25 maximum', 'geomagnetic storm warning', 'heliox space weather',
    // Português
    'observatorio solar ao vivo', 'tempestade solar hoje', 'aurora boreal previsao', 'clima espacial brasil',
    // Français & Deutsch
    'observatoire solaire direct', 'tempete solaire direct', 'sonnenobservatorium live', 'sonnensturm warnung'
  ],
  authors: [{ name: 'JESÚS BARRIOS', url: 'https://heliox-observatory.vercel.app' }],
  creator: 'JESÚS BARRIOS',
  publisher: 'HELIOX Solar Observatory',
  applicationName: 'HELIOX',
  category: 'Science & Space Weather',
  classification: 'Space Science & Solar Physics Observatory',
  alternates: {
    canonical: 'https://heliox-observatory.vercel.app',
    languages: {
      'es': 'https://heliox-observatory.vercel.app?lang=es',
      'en': 'https://heliox-observatory.vercel.app?lang=en',
      'pt': 'https://heliox-observatory.vercel.app?lang=pt',
      'fr': 'https://heliox-observatory.vercel.app?lang=fr',
      'de': 'https://heliox-observatory.vercel.app?lang=de',
      'it': 'https://heliox-observatory.vercel.app?lang=it',
      'ja': 'https://heliox-observatory.vercel.app?lang=ja',
      'zh': 'https://heliox-observatory.vercel.app?lang=zh',
      'ko': 'https://heliox-observatory.vercel.app?lang=ko',
      'ar': 'https://heliox-observatory.vercel.app?lang=ar',
      'ru': 'https://heliox-observatory.vercel.app?lang=ru',
      'hi': 'https://heliox-observatory.vercel.app?lang=hi',
      'x-default': 'https://heliox-observatory.vercel.app',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'HELIOX',
  },
  other: {
    'google-adsense-account': 'ca-pub-3600083129868122',
    'rating': 'general',
    'distribution': 'global',
    'revisit-after': '1 days',
    'mobile-web-app-capable': 'yes',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    alternateLocale: ['en_US', 'pt_BR', 'fr_FR', 'de_DE', 'it_IT', 'ja_JP', 'zh_CN'],
    url: 'https://heliox-observatory.vercel.app',
    siteName: 'HELIOX — Observatorio Solar en Tiempo Real',
    title: 'HELIOX — Observatorio Solar en Vivo | Satélites NASA & NOAA 24/7',
    description: 'Monitoreo del Sol 24/7 en tiempo real con telemetría de satélites NASA y NOAA. Tormentas solares, llamaradas clase X, índice Kp e imágenes satelitales SDO. Fundado por JESÚS BARRIOS.',
    images: [{ url: '/favicon.svg', width: 512, height: 512, alt: 'HELIOX Solar Observatory — JESÚS BARRIOS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HELIOX — Observatorio Solar en Tiempo Real',
    description: 'Sol en vivo 24/7 con telemetría satelital NASA + NOAA. Tormentas solares y auroras. Por JESÚS BARRIOS.',
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
      alternateName: ['HELIOX Observatorio Solar', 'HELIOX Space Weather', 'Observatorio Solar HELIOX'],
      url: 'https://heliox-observatory.vercel.app',
      logo: 'https://heliox-observatory.vercel.app/favicon.svg',
      image: 'https://heliox-observatory.vercel.app/favicon.svg',
      founder: {
        '@type': 'Person',
        name: 'JESUS BARRIOS',
        jobTitle: 'Founder & Principal Investigator',
        nationality: 'Colombian',
      },
      description: 'Observatorio solar de acceso libre y monitoreo satelital en tiempo real con datos de NASA, NOAA y ESA para Latinoamérica y el mundo.',
      knowsAbout: [
        'Space Weather', 'Solar Flares', 'Coronal Mass Ejections',
        'Geomagnetic Storms', 'Solar Wind', 'Planetary K-index',
        'Solar Cycle 25', 'Heliophysics', 'Aurora Borealis'
      ],
      sameAs: [
        'https://github.com/Mister124x/heliox',
        'https://heliox-xi.vercel.app'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'HELIOX Space Weather App',
      operatingSystem: 'All (iOS, Android, Windows, macOS, Linux)',
      applicationCategory: 'EducationalApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      author: {
        '@type': 'Person',
        name: 'JESUS BARRIOS'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'HELIOX',
      url: 'https://heliox-observatory.vercel.app',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://heliox-observatory.vercel.app/storms?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'HELIOX Real-Time Space Weather Satellite Telemetry',
      description: 'Live scientific space weather feeds including planetary K-index, solar wind speed, interplanetary magnetic field (Bz/Bt), GOES X-ray flux, and NASA SDO imagery.',
      creator: {
        '@type': 'Person',
        name: 'JESUS BARRIOS',
      },
      url: 'https://heliox-observatory.vercel.app/dashboard',
      isAccessibleForFree: true,
      license: 'https://creativecommons.org/licenses/by/4.0/',
      keywords: ['Space Weather', 'Solar Telemetry', 'NOAA SWPC', 'NASA SDO', 'Kp Index', 'Geomagnetic Storms'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Qué es el observatorio solar HELIOX?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'HELIOX es una plataforma científica de monitoreo solar 24/7 en tiempo real fundada por JESÚS BARRIOS. Integra telemetría directa de satélites de la NASA, NOAA y ESA para rastrear tormentas geomagnéticas, llamaradas solares e imágenes en vivo del Sol.'
          }
        },
        {
          '@type': 'Question',
          name: '¿Cómo saber si hay una tormenta solar hoy en tiempo real?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'En HELIOX puedes consultar en tiempo real el índice Kp planetario y la velocidad del viento solar. Un índice Kp superior a 5 indica una tormenta geomagnética activa (G1 a G5) con probabilidad de auroras boreales.'
          }
        },
        {
          '@type': 'Question',
          name: '¿De dónde provienen las imágenes en vivo del Sol?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Las imágenes satelitales provienen directamente del observatorio espacial SDO (Solar Dynamics Observatory) de la NASA y del coronógrafo LASCO a bordo del satélite SOHO.'
          }
        }
      ]
    }
  ]

  return (
    <html lang="es" className="dark">
      <head>
        {/* Favicon & Web Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://heliox-observatory.vercel.app" />

        {/* Feed RSS y OpenSearch para Indexación Rápida */}
        <link rel="alternate" type="application/rss+xml" title="HELIOX — Feed de Clima Espacial en Tiempo Real" href="/feed.xml" />
        <link rel="search" type="application/opensearchdescription+xml" title="HELIOX Search" href="/opensearch.xml" />

        {/* Meta Tags Universales de Rastreo para Todos los Buscadores */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="slurp" content="index, follow" />
        <meta name="duckduckbot" content="index, follow" />
        <meta name="baiduspider" content="index, follow" />
        <meta name="yandex" content="index, follow" />

        {/* Meta Tag de Verificación de Cuenta Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-3600083129868122" />

        {/* Geo Tags para SEO Local y Global */}
        <meta name="geo.region" content="CO" />
        <meta name="geo.placename" content="Colombia" />

        {/* Schema.org Structured Data para Google Search Indexing (Rich Snippets, FAQs, Knowledge Graph) */}
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
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#030014] text-white font-space antialiased selection:bg-orange-500/30 selection:text-white relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none z-[-1]" />
        <I18nProvider>
          {children}
          <VIPAlertBar />
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
