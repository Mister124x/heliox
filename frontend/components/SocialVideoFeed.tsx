'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoItem {
  id: string
  title: string
  platform: 'youtube' | 'tiktok' | 'instagram'
  category: 'tormentas' | 'auroras' | 'nasa' | 'ciencia'
  author: string
  authorHandle: string
  duration: string
  views: string
  date: string
  description: string
  videoUrl: string
  embedUrl?: string
  thumbnailUrl: string
  badge: string
}

const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'La Tormenta Solar G5 Más Extrema del Ciclo 25 (AR3664 en Vivo)',
    platform: 'youtube',
    category: 'tormentas',
    author: 'NASA Goddard / Solar Dynamics',
    authorHandle: '@NASAGoddard',
    duration: '0:58',
    views: '1.4M vistas',
    date: 'Actualizado Recientemente',
    description: 'Impresionante captura en 131Å y 304Å de la eyección de masa coronal que generó auroras globales y afectó las redes GPS.',
    videoUrl: 'https://www.youtube.com/shorts/n3rPZkGjUHg',
    embedUrl: 'https://www.youtube.com/embed/n3rPZkGjUHg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=600&q=80',
    badge: '🔥 VIRAL',
  },
  {
    id: 'vid-2',
    title: '¿Qué pasaría si una Llamarada Clase X impacta la Tierra hoy?',
    platform: 'tiktok',
    category: 'ciencia',
    author: 'Astrofísica en Español',
    authorHandle: '@astro_espacio',
    duration: '0:45',
    views: '890K vistas',
    date: 'En Tendencia',
    description: 'Explicación dinámica sobre cómo el pulso electromagnético puede apagar transformadores y por qué HELIOX monitorea el sol 24/7.',
    videoUrl: 'https://www.tiktok.com/tag/solarstorm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=600&q=80',
    badge: '📱 TIKTOK RECOMENDADO',
  },
  {
    id: 'vid-3',
    title: 'Auroras Boreales visibles en latitudes bajas: México y Colombia',
    platform: 'instagram',
    category: 'auroras',
    author: 'Space Weather Live & Sky Watchers',
    authorHandle: '@spaceweather_live',
    duration: '0:35',
    views: '540K vistas',
    date: 'Reciente',
    description: 'Timelapse capturado desde satélites en órbita baja mostrando el óvalo auroral expandiéndose hacia el ecuador.',
    videoUrl: 'https://www.instagram.com/explore/tags/auroraborealis/',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=600&q=80',
    badge: '📸 REELS DESTACADO',
  },
  {
    id: 'vid-4',
    title: 'Pronóstico del Clima Espacial: Dr. Tamitha Skov Reporte Oficial',
    platform: 'youtube',
    category: 'tormentas',
    author: 'Space Weather Woman',
    authorHandle: '@TamithaSkov',
    duration: '1:15',
    views: '320K vistas',
    date: 'Semana Actual',
    description: 'Análisis técnico de las regiones activas en el disco solar y predicción de impacto de viento solar rápido.',
    videoUrl: 'https://www.youtube.com/results?search_query=tamitha+skov+space+weather',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
    badge: '🛰️ OFICIAL NOAA',
  },
  {
    id: 'vid-5',
    title: 'El Sonido del Sol: Ondas acústicas capturadas por el satélite SOHO',
    platform: 'tiktok',
    category: 'ciencia',
    author: 'Curiosidades Cósmicas',
    authorHandle: '@cosmos_tiktok',
    duration: '0:30',
    views: '2.1M vistas',
    date: 'Viral',
    description: 'Sonificación de las vibraciones en la fotosfera solar procesadas por la Universidad de Stanford y ESA.',
    videoUrl: 'https://www.tiktok.com/tag/sunwaves',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    badge: '🎧 SONIDO SOLAR',
  },
  {
    id: 'vid-6',
    title: 'Telescopios Solares H-Alpha: Viendo las llamaradas desde el patio',
    platform: 'instagram',
    category: 'nasa',
    author: 'Astrophotography Club',
    authorHandle: '@solar_astrophoto',
    duration: '0:40',
    views: '410K vistas',
    date: 'Recomendado',
    description: 'Prueba de filtros de hidrógeno alfa (Hα) capturando espículas y prominencias en tiempo real.',
    videoUrl: 'https://www.instagram.com/explore/tags/solartelescope/',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    badge: '🔭 EQUIPAMIENTO',
  },
]

export default function SocialVideoFeed() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null)

  const filteredVideos = FEATURED_VIDEOS.filter((v) => {
    const matchPlatform = selectedPlatform === 'all' || v.platform === selectedPlatform
    const matchCategory = selectedCategory === 'all' || v.category === selectedCategory
    return matchPlatform && matchCategory
  })

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return '▶️ YouTube Shorts'
      case 'tiktok':
        return '📱 TikTok'
      case 'instagram':
        return '📸 Instagram Reels'
      default:
        return '🎥 Video'
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return 'from-red-600 to-rose-600 text-white'
      case 'tiktok':
        return 'from-pink-600 to-purple-600 text-white'
      case 'instagram':
        return 'from-purple-600 to-amber-600 text-white'
      default:
        return 'from-solar-500 to-amber-500 text-black'
    }
  }

  return (
    <section className="py-14 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="solar-badge bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-2">
              🎬 Tendencias & Multimedia en Redes Sociales
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Videos, Reels & Shorts Solares en Tiempo Real
            </h2>
            <p className="text-sm text-white/60 mt-1 max-w-2xl">
              Colección curada y actualizada de los videos más virales e informativos sobre tormentas solares, auroras boreales y física espacial en **TikTok, Instagram y YouTube**. Curado por <strong className="text-solar-400">JESÚS BARRIOS</strong>.
            </p>
          </div>

          {/* Filtros de Plataforma */}
          <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'youtube', label: '▶️ Shorts' },
              { id: 'tiktok', label: '📱 TikTok' },
              { id: 'instagram', label: '📸 Reels' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedPlatform === p.id
                    ? 'bg-solar-500 text-black shadow-lg shadow-solar-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Videos Virales */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="solar-card overflow-hidden border border-white/10 hover:border-pink-500/40 bg-black/60 backdrop-blur-md group flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail con Botón de Play y Badge */}
                <div className="relative w-full h-48 bg-black/80 overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Badge Superior */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gradient-to-r ${getPlatformColor(item.platform)}`}>
                      {getPlatformIcon(item.platform)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  {/* Duración */}
                  <div className="absolute bottom-3 right-3 text-xs font-mono bg-black/80 text-white px-2 py-0.5 rounded-md border border-white/20">
                    ⏱️ {item.duration}
                  </div>

                  {/* Botón Central Play */}
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs"
                  >
                    <div className="w-14 h-14 rounded-full bg-solar-500 text-black flex items-center justify-center text-2xl shadow-xl shadow-solar-500/40 hover:scale-110 transition-transform">
                      ▶
                    </div>
                  </a>
                </div>

                {/* Contenido del Video */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                    <span className="text-solar-300 font-semibold">{item.author}</span>
                    <span>{item.views}</span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-pink-300 transition-colors line-clamp-2 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Botón de Enlace Directo a la Red Social */}
              <div className="p-5 pt-0">
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-pink-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <span>Ver en {item.platform.toUpperCase()} →</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner Inferior: Participa o Envía tu Video */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-purple-950/30 via-pink-950/20 to-black border border-pink-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-base">¿Tienes un Reel o Video sobre el Sol o Auroras?</h4>
            <p className="text-xs text-white/60 mt-0.5">
              Etiqueta a <strong className="text-solar-400">@heliox_solar</strong> o usa el hashtag <strong>#HelioxSolar</strong> para aparecer en el feed oficial de la red.
            </p>
          </div>

          <a
            href="/reels"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-500/20 transition-all shrink-0"
          >
            🎬 Ir al Generador de Guiones Virales →
          </a>
        </div>
      </div>
    </section>
  )
}
