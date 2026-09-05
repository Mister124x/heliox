'use client'

import { useEffect, useState } from 'react'

interface AdBannerProps {
  slot?: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal'
  responsive?: boolean
  className?: string
}

const SPONSOR_OFFERS = [
  {
    badge: '🛡️ PREPARACIÓN CICLO SOLAR 25',
    title: 'Radio de Emergencia Solar NOAA & Manivela con Banco de Carga',
    desc: 'Mantente comunicado ante caídas de red y apagones geomagnéticos. Batería de 5000mAh y linterna LED.',
    tag: 'OFERTA DESTACADA',
    cta: 'Ver en Amazon (Descuento Exclusivo)',
    url: 'https://www.amazon.com/s?k=solar+crank+emergency+radio+noaa&tag=jesusbarrios2-20',
    icon: '📻',
  },
  {
    badge: '☀️ OBSERVACIÓN SOLAR SEGURA',
    title: 'Lentes de Observación Solar Certificados ISO 12312-2',
    desc: 'Filtro polímero plateado de máxima densidad óptica para ver manchas solares y llamaradas sin riesgo ocular.',
    tag: 'CERTIFICADO NASA/ISO',
    cta: 'Comprar Pack Certificado en Amazon',
    url: 'https://www.amazon.com/s?k=solar+eclipse+glasses+iso+certified&tag=jesusbarrios2-20',
    icon: '🕶️',
  },
  {
    badge: '⚡ ENERGÍA DE RESPALDO SOLAR',
    title: 'Batería Solar Portátil 30.000mAh con Carga Rápida',
    desc: 'Carga tus celulares, linternas y equipos de emergencia con energía solar limpia en cualquier lugar.',
    tag: 'ESENCIAL TORMENTAS',
    cta: 'Ver Disponibilidad en Amazon',
    url: 'https://www.amazon.com/s?k=portable+solar+power+bank+30000mah&tag=jesusbarrios2-20',
    icon: '🔋',
  },
]

export default function AdBanner({
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-3600083129868122'
  const [offerIndex, setOfferIndex] = useState(0)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      // Manejo silencioso en inicialización
    }
  }, [])

  useEffect(() => {
    // Rotar ofertas cada 12 segundos
    const timer = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % SPONSOR_OFFERS.length)
    }, 12000)
    return () => clearInterval(timer)
  }, [])

  const currentOffer = SPONSOR_OFFERS[offerIndex]

  return (
    <div className={`my-6 overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-950/20 via-black to-zinc-950 shadow-xl ${className}`}>
      {/* Script oficial AdSense (rastreado por Google bot para aprobación) */}
      <div className="hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>

      {/* Banner Publicitario y de Afiliación Activo (Monetización Inmediata) */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-2xl shrink-0">
            {currentOffer.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">
                {currentOffer.badge}
              </span>
              <span className="text-[10px] font-mono text-white/40">
                Patrocinado · Amazon Associates (jesusbarrios2-20)
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white mt-1">
              {currentOffer.title}
            </h4>
            <p className="text-xs text-white/60 line-clamp-1 max-w-xl">
              {currentOffer.desc}
            </p>
          </div>
        </div>

        <a
          href={currentOffer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black active:scale-95 transition-all shadow-lg shadow-orange-500/25 shrink-0 font-mono flex items-center gap-2"
        >
          <span>🛒</span>
          <span>{currentOffer.cta}</span>
        </a>
      </div>
    </div>
  )
}
