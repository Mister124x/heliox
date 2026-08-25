'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  category: string
  priceUSD: number
  commissionEst: string
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
    commissionEst: '$110 - $160 USD por venta (8-10%)',
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
    commissionEst: '$70 - $90 USD por venta (8%)',
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
    commissionEst: '$240 - $350 USD por venta (7-10%)',
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
    commissionEst: '$6 - $10 USD por venta',
    rating: 4.9,
    badge: 'ACCESORIO VITAL',
    description: 'Filtro óptico de alta densidad para observación visual y fotográfica 100% segura del disco solar.',
    affiliateUrl: 'https://amazon.com/dp/B002824X8M?tag=jesusbarrios-20',
    imagePlaceholder: '🛡️',
  },
]

export default function AffiliateSection() {
  return (
    <section className="py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="solar-badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
              🔬 Equipamiento Científico Recomendado
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Herramientas de Observación & Investigación Solar
            </h2>
            <p className="text-sm text-white/60 mt-1 max-w-2xl">
              Cada adquisición a través de estos enlaces oficiales de astronomía genera una comisión directa que financia los servidores y la investigación de código abierto en <strong className="text-solar-400">HELIOX</strong>.
            </p>
          </div>

          <div className="text-xs text-white/40 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
            🤝 Afiliados Oficiales: Celestron · ZWO · High Point · Amazon Associates
          </div>
        </div>

        {/* Grilla de Productos de Alta Comisión */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AFFILIATE_PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="solar-card p-5 flex flex-col justify-between border border-white/10 hover:border-solar-500/50 bg-black/60 backdrop-blur-md group"
            >
              <div>
                {/* Badge y Categoría */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-solar-400 bg-solar-500/10 px-2 py-0.5 rounded-md border border-solar-500/20">
                    {prod.badge}
                  </span>
                  <span className="text-xs text-white/40">{prod.category}</span>
                </div>

                {/* Imagen/Placeholder Icon */}
                <div className="w-full h-32 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform duration-300">
                  {prod.imagePlaceholder}
                </div>

                {/* Título & Precio */}
                <h3 className="font-bold text-base text-white group-hover:text-solar-300 transition-colors line-clamp-2 mb-1">
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
                  💡 <em>Apoyo a la ciencia: comisión activa</em>
                </div>

                <a
                  href={prod.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block bg-solar-500 hover:bg-solar-400 text-black shadow-lg shadow-solar-500/20 transition-all"
                >
                  Ver Equipamiento Oficial →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
