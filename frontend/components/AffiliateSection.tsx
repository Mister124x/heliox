'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n'

interface Product {
  id: string
  name: string
  category: string
  priceUSD: number
  rating: number
  badge: string
  description: string
  affiliateUrl: string
  imagePlaceholder: string
}

const AFFILIATE_PRODUCTS: Product[] = [
  {
    id: 'telescope-1',
    name: 'Celestron NexStar 8SE Solar Bundle',
    category: 'Telescopios Inteligentes',
    priceUSD: 1599,
    rating: 4.9,
    badge: 'MÁS RECOMENDADO',
    description: 'Telescopio computarizado de 8 pulgadas con filtro solar certificado para observación de manchas solares y llamaradas.',
    affiliateUrl: 'https://www.highpointscientific.com/celestron-nexstar-8se-telescope?aff=jesusbarrios',
    imagePlaceholder: '🔭',
  },
  {
    id: 'camera-1',
    name: 'ZWO ASI533MM Pro Solar/Planetary Camera',
    category: 'Astrofotografía Solar',
    priceUSD: 899,
    rating: 4.8,
    badge: 'ALTA PRECISIÓN',
    description: 'Sensor monocromático enfriado ultra sensible para capturar la cromosfera solar en H-Alpha y prominencias.',
    affiliateUrl: 'https://astronomics.com/zwo-asi533mm-pro?aff=jesusbarrios',
    imagePlaceholder: '📷',
  },
  {
    id: 'smart-scope',
    name: 'Unistellar eVscope 2 Smart Solar Explorer',
    category: 'Óptica Digital Automatizada',
    priceUSD: 3499,
    rating: 5.0,
    badge: 'GAMA ALTA',
    description: 'Telescopio inteligente con procesamiento de imagen en vivo y reconocimiento autónomo de campos celestes.',
    affiliateUrl: 'https://unistellar.com/evscope2?aff=jesusbarrios',
    imagePlaceholder: '🛰️',
  },
  {
    id: 'filter-1',
    name: 'Filtro Solar Baader Planetarium AstroSolar 5.0',
    category: 'Seguridad y Filtros',
    priceUSD: 65,
    rating: 4.9,
    badge: 'ACCESORIO VITAL',
    description: 'Filtro óptico de alta densidad para observación visual y fotográfica 100% segura del disco solar.',
    affiliateUrl: 'https://amazon.com/dp/B002824X8M?tag=jesusbarrios-20',
    imagePlaceholder: '🛡️',
  },
]

export default function AffiliateSection() {
  const { t } = useI18n()

  return (
    <section className="py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="solar-badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2 text-xs inline-flex items-center gap-1.5">
              <span>🔬</span>
              <span>{t.equip_badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.equip_title}
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl">
              {t.equip_description} <strong className="text-solar-400">HELIOX</strong>.
            </p>
          </div>

          <div className="text-xs text-white/50 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
            {t.equip_affiliates}
          </div>
        </div>

        {/* Grilla de Productos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {AFFILIATE_PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="solar-card p-5 flex flex-col justify-between border border-white/10 hover:border-solar-500/50 bg-black/60 backdrop-blur-md group transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-solar-400 bg-solar-500/10 px-2 py-0.5 rounded-md border border-solar-500/20">
                    {prod.badge}
                  </span>
                  <span className="text-xs text-white/40">{prod.category}</span>
                </div>

                <div className="w-full h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform duration-300">
                  {prod.imagePlaceholder}
                </div>

                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-solar-300 transition-colors line-clamp-2 mb-1">
                  {prod.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    ${prod.priceUSD.toLocaleString()} USD
                  </span>
                  <span className="text-xs text-yellow-400 flex items-center gap-0.5">
                    ★ {prod.rating}
                  </span>
                </div>

                <p className="text-xs text-white/60 line-clamp-3 mb-4 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div>
                <div className="text-[11px] text-solar-400/80 mb-3 bg-solar-500/5 p-2 rounded-lg border border-solar-500/10">
                  {t.equip_support}
                </div>

                <a
                  href={prod.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block bg-solar-500 hover:bg-solar-400 text-black shadow-lg shadow-solar-500/20 transition-all"
                >
                  {t.equip_view}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
