'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface VideoItem {
  id: string
  title: string
  platform: 'youtube' | 'tiktok' | 'instagram'
  category: 'tormentas' | 'auroras' | 'nasa' | 'ciencia'
  author: string
  duration: string
  views: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  badge: string
}

const REAL_VIRAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: '10 Años de Observación Solar en Ultra Alta Resolución (SDO NASA)',
    platform: 'youtube',
    category: 'nasa',
    author: 'NASA Goddard Oficial',
    duration: '1:00',
    views: '18M vistas',
    description: 'Un timelapse monumental de 10 años capturado por el Satélite de Dinámica Solar (SDO) mostrando un ciclo solar completo.',
    videoUrl: 'https://www.youtube.com/watch?v=J32V5O_LwO8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=600&q=80',
    badge: '🔥 18M VISTAS',
  },
  {
    id: 'vid-2',
    title: 'Llamarada Solar Extrema Clase X expulsada hacia el espacio',
    platform: 'youtube',
    category: 'tormentas',
    author: 'NASA Solar Dynamics',
    duration: '0:45',
    views: '4.2M vistas',
    description: 'Impresionante erupción de plasma magnético capturada en la longitud de onda de 131Å y 304Å.',
    videoUrl: 'https://www.youtube.com/watch?v=6tmbeLTHC_0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=600&q=80',
    badge: '⚡ CLASE X',
  },
  {
    id: 'vid-3',
    title: 'Auroras Boreales de la Tormenta Solar G5 (AR3664 en Vivo)',
    platform: 'youtube',
    category: 'auroras',
    author: 'Astronomy Sky Watchers',
    duration: '0:55',
    views: '2.8M vistas',
    description: 'Registro histórico de la tormenta geomagnética que iluminó los cielos de Norteamérica, México y el Caribe.',
    videoUrl: 'https://www.youtube.com/watch?v=sU3b2W7gBv8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=600&q=80',
    badge: '🌌 G5 EXTREMO',
  },
  {
    id: 'vid-4',
    title: '¿Cómo nos protege el Campo Magnético de la Tierra? (NASA)',
    platform: 'youtube',
    category: 'ciencia',
    author: 'NASA Space Science',
    duration: '1:10',
    views: '1.9M vistas',
    description: 'Animación científica que explica la magnetopausa y la desviación del viento solar a 450 km/s.',
    videoUrl: 'https://www.youtube.com/watch?v=vVj_p4p_Vrw',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
    badge: '🛡️ CIENCIA NASA',
  },
  {
    id: 'vid-5',
    title: 'Canal Oficial de la NASA en TikTok — Novedades Espaciales',
    platform: 'tiktok',
    category: 'nasa',
    author: '@NASA en TikTok',
    duration: 'Enlace Directo',
    views: '35M seguidores',
    description: 'Videos cortos y virales oficiales de la NASA sobre misiones espaciales y actividad heliofísica.',
    videoUrl: 'https://www.tiktok.com/@nasa',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    badge: '📱 TIKTOK OFICIAL',
  },
  {
    id: 'vid-6',
    title: 'NASA Goddard Instagram Reels — Imágenes del Sol en Vivo',
    platform: 'instagram',
    category: 'auroras',
    author: '@NASAGoddard en Instagram',
    duration: 'Enlace Directo',
    views: '4.8M seguidores',
    description: 'Publicaciones diarias en formato Reels de astrofotografía y satélites espaciales.',
    videoUrl: 'https://www.instagram.com/nasagoddard/',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    badge: '📸 REELS OFICIAL',
  },
]

export default function SocialVideoFeed() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')

  const filteredVideos = REAL_VIRAL_VIDEOS.filter((v) => {
    return selectedPlatform === 'all' || v.platform === selectedPlatform
  })

  return (
    <section className="py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="solar-badge bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-2 text-xs">
              🎬 Multimedia & Tendencias en Redes Sociales
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Videos, Reels & Shorts Virales del Sol
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl">
              Enlaces reales y verificados a los videos más virales de **YouTube, TikTok e Instagram** sobre tormentas solares y auroras. Curado por <strong className="text-solar-400">JESÚS BARRIOS</strong>.
            </p>
          </div>

          {/* Filtros de Plataforma (Mobile Friendly) */}
          <div className="flex flex-wrap gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10 self-start sm:self-auto">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'youtube', label: '▶️ YouTube' },
              { id: 'tiktok', label: '📱 TikTok' },
              { id: 'instagram', label: '📸 Instagram' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedPlatform === p.id
                    ? 'bg-solar-500 text-black shadow-lg shadow-solar-500/20 font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Videos (Optimizada para Móvil) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredVideos.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="solar-card overflow-hidden border border-white/10 hover:border-pink-500/50 bg-black/70 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail con Play Overlay */}
                <div className="relative w-full h-44 sm:h-48 bg-black overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-solar-500 text-black">
                      {item.platform.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-300 bg-black/80 px-2 py-0.5 rounded-md border border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  {/* Duración */}
                  <div className="absolute bottom-2.5 right-2.5 text-[11px] font-mono bg-black/80 text-white px-2 py-0.5 rounded-md border border-white/20">
                    {item.duration}
                  </div>

                  {/* Botón Central Play */}
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-solar-500 text-black flex items-center justify-center text-xl shadow-lg shadow-solar-500/40">
                      ▶
                    </div>
                  </a>
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-xs text-white/50 mb-1.5">
                    <span className="text-solar-300 font-semibold truncate">{item.author}</span>
                    <span className="shrink-0">{item.views}</span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Botón de Enlace Real */}
              <div className="p-4 sm:p-5 pt-0">
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block bg-solar-500/10 hover:bg-solar-500 text-solar-300 hover:text-black border border-solar-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Ver Video Real en {item.platform.toUpperCase()} ↗</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
