import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'HELIOX — Observatorio Solar en Tiempo Real',
    template: '%s | HELIOX',
  },
  description:
    'Monitoreo del sol 24/7 con datos en tiempo real de NASA, NOAA y ESA. Tormentas solares, llamaradas, índice Kp e imágenes del SDO. Por JESÚS BARRIOS.',
  keywords: [
    'sol en tiempo real', 'tormenta solar', 'llamarada solar', 'kp index',
    'NASA DONKI', 'NOAA SWPC', 'clima espacial', 'CME', 'aurora boreal',
    'HELIOX', 'Jesús Barrios', 'observatorio solar',
  ],
  authors: [{ name: 'JESÚS BARRIOS', url: 'https://heliox.jesusbarrios.co' }],
  creator: 'JESÚS BARRIOS',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://heliox.jesusbarrios.co',
    siteName: 'HELIOX',
    title: 'HELIOX — Observatorio Solar en Tiempo Real',
    description: 'Datos solares en tiempo real de NASA y NOAA. Por JESÚS BARRIOS.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'HELIOX Solar Observatory' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HELIOX — Observatorio Solar en Tiempo Real',
    description: 'Sol en vivo 24/7. Datos NASA + NOAA. Por JESÚS BARRIOS.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  return (
    <html lang="es" className="dark">
      <head>
        {/* Google AdSense */}
        {adsenseId && adsenseId !== 'ca-pub-XXXXXXXXXXXXXXXXX' && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
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
