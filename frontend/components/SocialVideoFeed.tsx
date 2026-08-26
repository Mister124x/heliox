'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../lib/i18n'

export interface VideoItem {
  id: string
  title: string
  platform: 'youtube' | 'tiktok' | 'instagram' | 'live'
  category: 'tormentas' | 'auroras' | 'nasa' | 'ciencia' | 'live'
  author: string
  duration: string
  views: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  badge: string
  isLive?: boolean
  timestamp: string
}

const ALL_CURATED_VIDEOS: VideoItem[] = [
  {
    id: 'vid-live-1',
    title: 'NASA Live: Transmisión Satelital en Directo de la Tierra y el Sol desde el Espacio',
    platform: 'live',
    category: 'live',
    author: 'NASA Oficial (Live Stream)',
    duration: '🔴 EN VIVO',
    views: '125K viendo ahora',
    description: 'Transmisión 24/7 de cámaras espaciales de la NASA y satélites de monitoreo heliofísico.',
    videoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    badge: '🔴 TRANSMISIÓN 24/7',
    isLive: true,
    timestamp: 'Actualizado hace 2 min',
  },
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
    timestamp: 'Tendencia Global',
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
    timestamp: 'Evento Destacado',
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
    timestamp: 'Histórico 2024-2026',
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
    timestamp: 'Divulgación',
  },
  {
    id: 'vid-5',
    title: 'Canal Oficial de la NASA en TikTok — Novedades Espaciales y Tormentas',
    platform: 'tiktok',
    category: 'nasa',
    author: '@NASA en TikTok',
    duration: 'Enlace Directo',
    views: '35M seguidores',
    description: 'Videos cortos y virales oficiales de la NASA sobre misiones espaciales y actividad heliofísica en vivo.',
    videoUrl: 'https://www.tiktok.com/@nasa',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    badge: '📱 TIKTOK OFICIAL',
    timestamp: 'Publicaciones Diarias',
  },
  {
    id: 'vid-6',
    title: 'NASA Goddard Instagram Reels — Imágenes del Sol y Satélites',
    platform: 'instagram',
    category: 'auroras',
    author: '@NASAGoddard en Instagram',
    duration: 'Enlace Directo',
    views: '4.8M seguidores',
    description: 'Publicaciones diarias en formato Reels de astrofotografía solar y satélites espaciales en alta definición.',
    videoUrl: 'https://www.instagram.com/nasagoddard/',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=600&q=80',
    badge: '📸 REELS OFICIAL',
    timestamp: 'Reels en Tiempo Real',
  },
]

export default function SocialVideoFeed() {
  const { t } = useI18n()
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [feedTime, setFeedTime] = useState<string>('')

  useEffect(() => {
    setFeedTime(new Date().toLocaleTimeString())
  }, [])

  const refreshFeed = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setFeedTime(new Date().toLocaleTimeString())
      setIsRefreshing(false)
    }, 600)
  }

  const filteredVideos = ALL_CURATED_VIDEOS.filter((v) => {
    if (selectedPlatform === 'all') return true
    if (selectedPlatform === 'live') return v.platform === 'live'
    return v.platform === selectedPlatform
  })

  return (
    <section className="py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado con estado dinámico */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="solar-badge bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-2 text-xs inline-flex items-center gap-1.5">
              <span>🎬</span>
              <span>{t.videos_badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.videos_title}
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl">
              {t.videos_description} <strong className="text-solar-400">JESÚS BARRIOS</strong>.
            </p>
          </div>

          {/* Botón de Refresco y Filtros */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={refreshFeed}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
              <span className="hidden sm:inline">Actualizar Feed ({feedTime})</span>
            </button>

            {/* Filtros de Plataforma */}
            <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
              {[
                { id: 'all', label: t.videos_filter_all, icon: '🌟' },
                { id: 'live', label: 'En Vivo', icon: '🔴' },
                { id: 'youtube', label: 'YouTube', icon: '▶️' },
                { id: 'tiktok', label: 'TikTok', icon: '📱' },
                { id: 'instagram', label: 'Instagram', icon: '📸' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                    selectedPlatform === p.id
                      ? 'bg-solar-500 text-black shadow-lg shadow-solar-500/20 font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grilla de Videos Dinámica */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPlatform}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredVideos.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="solar-card overflow-hidden border border-white/10 hover:border-pink-500/50 bg-black/70 backdrop-blur-md flex flex-col justify-between group transition-all"
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

                    {/* Badges superiores */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        item.isLive ? 'bg-red-600 text-white animate-pulse' : 'bg-solar-500 text-black'
                      }`}>
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
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg transition-transform group-hover:scale-110 ${
                        item.isLive ? 'bg-red-600 text-white shadow-red-600/50' : 'bg-solar-500 text-black shadow-solar-500/40'
                      }`}>
                        ▶
                      </div>
                    </a>
                  </div>

                  {/* Info */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between text-xs text-white/50 mb-1.5">
                      <span className="text-solar-300 font-semibold truncate">{item.author}</span>
                      <span className="shrink-0 font-mono text-[11px]">{item.views}</span>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 mb-2 leading-snug group-hover:text-solar-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-2 text-[10px] text-white/30 font-mono">
                      📅 {item.timestamp}
                    </div>
                  </div>
                </div>

                {/* Botón de Enlace Real */}
                <div className="p-4 sm:p-5 pt-0">
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block transition-all flex items-center justify-center gap-1.5 ${
                      item.isLive
                        ? 'bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30'
                        : 'bg-solar-500/10 hover:bg-solar-500 text-solar-300 hover:text-black border border-solar-500/30'
                    }`}
                  >
                    <span>{t.videos_watch_on} {item.platform.toUpperCase()} ↗</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
