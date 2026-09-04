'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useI18n } from '../lib/i18n'

export type VideoFilterCategory = 'all' | 'flares' | 'cmes' | 'auroras' | 'satellites' | 'live'

export interface VideoItem {
  id: string
  title: string
  platform: 'youtube' | 'tiktok' | 'instagram' | 'live'
  category: 'flares' | 'cmes' | 'auroras' | 'satellites' | 'live'
  author: string
  duration: string
  views: string
  likes: string
  description: string
  embedId: string
  thumbnailUrl: string
  badge: string
  isLive?: boolean
  timestamp: string
  topicKey?: string
}

export const CATEGORY_FILTERS: { id: VideoFilterCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Todos', icon: '🎬' },
  { id: 'flares', label: '⚡ Llamaradas X', icon: '⚡' },
  { id: 'cmes', label: '🌊 CMEs', icon: '🌊' },
  { id: 'auroras', label: '🌌 Auroras', icon: '🌌' },
  { id: 'satellites', label: '🛰️ Satélites NASA', icon: '🛰️' },
  { id: 'live', label: '🔴 En Vivo', icon: '🔴' },
]

export const VIRAL_SOLAR_VIDEOS: VideoItem[] = [
  {
    id: 'vid-sdo-10y',
    title: '10 Años del Sol en 4K: Timelapse Monumental de NASA SDO',
    platform: 'youtube',
    category: 'satellites',
    author: 'NASA Goddard Heliophysics / SDO',
    duration: '61:00 · 4K Ultra HD',
    views: '18.6M',
    likes: '850K',
    description: 'Compilación de una década completa (2010-2020) con más de 425 millones de imágenes en 171Å y 304Å capturadas por el Solar Dynamics Observatory, mostrando la respiración magnética del Sol.',
    embedId: 'l3QQQu7QLoM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=800&q=80',
    badge: '☀️ TIMELAPSE 10 AÑOS 4K',
    timestamp: 'NASA SDO Oficial',
    topicKey: 'sdo',
  },
  {
    id: 'vid-flare-x',
    title: 'La Llamarada Solar Clase X más potente del Ciclo 25 (NASA Heliophysics)',
    platform: 'youtube',
    category: 'flares',
    author: 'NASA Solar Dynamics Observatory',
    duration: '1:12 · 1080p 60fps',
    views: '5.4M',
    likes: '320K',
    description: 'Detonación coronal extrema capturada en longitudes de onda de 131Å (10 millones de °C) y 304Å, provocada por reconexión magnética masiva e ionización inmediata de la atmósfera superior terrestre.',
    embedId: 'F0-4u7h-R6s',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    badge: '⚡ CLASE X HISTÓRICA',
    timestamp: 'Ciclo 25 en Pico',
    topicKey: 'flare',
  },
  {
    id: 'vid-cme-lasco',
    title: 'Eyección de Masa Coronal (CME) masiva hacia la Tierra vista por LASCO C2/C3',
    platform: 'youtube',
    category: 'cmes',
    author: 'NASA Goddard / SOHO LASCO',
    duration: '2:30 · Full HD',
    views: '6.8M',
    likes: '390K',
    description: 'Erupción coronal masiva tipo Halo observada por los coronógrafos espaciales LASCO C2 y C3, disparando billones de toneladas de plasma magnetizado a más de 1,500 km/s en trayectoria directa a la Tierra.',
    embedId: 'NnMIhD3h6Sg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    badge: '🌊 CME HALO GIGANTE',
    timestamp: 'SOHO / LASCO',
    topicKey: 'cme',
  },
  {
    id: 'vid-aurora-g5',
    title: 'Auroras boreales históricas de Mayo 2024 en latitudes tropicales y medias',
    platform: 'youtube',
    category: 'auroras',
    author: 'NASA Goddard Space Flight Center',
    duration: '4:15 · 4K Ultra HD',
    views: '8.4M',
    likes: '540K',
    description: 'Análisis científico de la supertormenta geomagnética G5 de Mayo 2024 desatada por la región activa AR3664, que tiñó de rojo sangre y violeta cielos en México, el Caribe, España y Europa.',
    embedId: 'kYJv8y6_D64',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=800&q=80',
    badge: '🌌 TORMENTA G5 HISTÓRICA',
    timestamp: 'Evento Mayo 2024',
    topicKey: 'aurora',
  },
  {
    id: 'vid-magnetosphere',
    title: 'Colisión de viento solar y la Magnetosfera terrestre (Simulación Supercomputadora NASA)',
    platform: 'youtube',
    category: 'cmes',
    author: 'NASA ScienceCasts / CCMC Supercomputing',
    duration: '3:45 · HD',
    views: '3.9M',
    likes: '230K',
    description: 'Simulación magnetohidrodinámica 3D que modela la compresión del choque de proa (bow shock) y la reconexión magnética en la magnetocola ante el embate de un frente de onda de choque solar.',
    embedId: 'R9K1wL1k1X4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    badge: '🛡️ ESCUDO MAGNETOSFÉRICO',
    timestamp: 'Supercomputadora NASA',
    topicKey: 'cme',
  },
  {
    id: 'vid-parker-probe',
    title: 'Vuelo cercano de la sonda Parker Solar Probe atravesando la corona solar',
    platform: 'youtube',
    category: 'satellites',
    author: 'NASA Goddard & Johns Hopkins APL',
    duration: '2:18 · 4K UHD',
    views: '12.3M',
    likes: '740K',
    description: 'Hito histórico de la exploración espacial: Parker Solar Probe cruza la superficie crítica de Alfvén a más de 500,000 km/h, recolectando datos in situ de switchbacks y calentamiento coronal a 1,400 °C.',
    embedId: 'LkaLfbuB_6E',
    thumbnailUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    badge: '🛰️ CONTACTO SOLAR DIRECTO',
    timestamp: 'Misión Parker Probe',
    topicKey: 'parker',
  },
  {
    id: 'vid-mercury-transit',
    title: 'Tránsito de Mercurio y cometas sumergiéndose en el Sol (SOHO)',
    platform: 'youtube',
    category: 'satellites',
    author: 'NASA SDO / ESA SOHO',
    duration: '3:05 · 4K UHD',
    views: '3.2M',
    likes: '185K',
    description: 'Secuencia en 4K del pequeño disco de Mercurio cruzando la corona solar en múltiples longitudes de onda ultravioleta, complementada con observaciones de cometas Kreutz sungrazers evaporándose.',
    embedId: 'iTjWw_c-jF0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    badge: '☄️ TRÁNSITO PLANETARIO 4K',
    timestamp: 'SDO / SOHO',
    topicKey: 'sdo',
  },
  {
    id: 'vid-nasa-live',
    title: 'Transmisión Satelital en Vivo 24/7 (NASA Live Stream)',
    platform: 'live',
    category: 'live',
    author: 'NASA Live Official Stream',
    duration: '🔴 24/7 EN DIRECTO',
    views: '240K online',
    likes: '1.5M',
    isLive: true,
    description: 'Señal continua de telemetría y video orbital de satélites SDO, coronógrafos espaciales, cámaras de la Estación Espacial Internacional y la red de espacio profundo de la NASA.',
    embedId: '21X5lGlDOfg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
    badge: '🔴 EN VIVO 24/7',
    timestamp: 'Streaming Satelital Activo',
    topicKey: 'live',
  },
  {
    id: 'vid-flare-coronal-rain',
    title: 'Llamarada Solar Clase X y Lluvia Coronal Magnética en el Limbo Solar',
    platform: 'youtube',
    category: 'flares',
    author: 'NASA Solar Dynamics Observatory',
    duration: '1:30 · 1080p',
    views: '3.4M',
    likes: '205K',
    description: 'Arcos plasmáticos incandescentes de más de 100,000 km condensándose y precipitándose como lluvia coronal sobre la cromosfera solar guiados por líneas del campo magnético.',
    embedId: 'mJ7Vw_U3yvQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=800&q=80',
    badge: '⚡ LLUVIA CORONAL X',
    timestamp: 'SDO Ultra-Detalle',
    topicKey: 'flare',
  },
  {
    id: 'vid-solar-orbiter',
    title: 'Solar Orbiter: Las Vistas de Mayor Resolución del Sol en la Historia (ESA/NASA)',
    platform: 'youtube',
    category: 'satellites',
    author: 'European Space Agency (ESA) & NASA',
    duration: '2:45 · 4K Ultra HD',
    views: '4.7M',
    likes: '275K',
    description: 'Mosaico de resolución récord mundial que desvela hogueras coronales (campfires) a escala milimétrica y los campos magnéticos del polo sur solar tomados por el telescopio EUI.',
    embedId: 'kY0w6l-P8aA',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    badge: '🔭 MÁXIMA RESOLUCIÓN ESA',
    timestamp: 'Misión ESA / NASA',
    topicKey: 'sdo',
  },
]

interface SocialVideoFeedProps {
  initialCategory?: VideoFilterCategory
  onSelectVideo?: (video: VideoItem) => void
}

export default function SocialVideoFeed({
  initialCategory = 'all',
  onSelectVideo,
}: SocialVideoFeedProps) {
  const { lang } = useI18n()
  const isEn = lang === 'en'

  const [selectedCategory, setSelectedCategory] = useState<VideoFilterCategory>(initialCategory)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [progress, setProgress] = useState(0)

  // Filtrado reactivo por categoría
  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'all') return VIRAL_SOLAR_VIDEOS
    return VIRAL_SOLAR_VIDEOS.filter((v) => v.category === selectedCategory)
  }, [selectedCategory])

  // Video activo garantizado
  const activeVideo = filteredVideos[currentIndex] || filteredVideos[0] || VIRAL_SOLAR_VIDEOS[0]

  // Reseteo seguro al cambiar de categoría
  const handleCategorySelect = (catId: VideoFilterCategory) => {
    setSelectedCategory(catId)
    setCurrentIndex(0)
    setProgress(0)
    setIsPlaying(false)
  }

  // Auto-rotación de videos cada 5 segundos
  useEffect(() => {
    if (!autoRotate || isPlaying || filteredVideos.length <= 1) return

    const intervalTime = 50 // ms
    const totalDuration = 5000 // 5 segundos
    const step = (intervalTime / totalDuration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % filteredVideos.length)
          return 0
        }
        return prev + step
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [autoRotate, isPlaying, filteredVideos.length])

  const selectVideo = (idx: number) => {
    setCurrentIndex(idx)
    setProgress(0)
    setIsPlaying(false)
    if (onSelectVideo && filteredVideos[idx]) {
      onSelectVideo(filteredVideos[idx])
    }
  }

  const prevVideo = () => {
    setCurrentIndex((idx) => (idx - 1 + filteredVideos.length) % filteredVideos.length)
    setProgress(0)
    setIsPlaying(false)
  }

  const nextVideo = () => {
    setCurrentIndex((idx) => (idx + 1) % filteredVideos.length)
    setProgress(0)
    setIsPlaying(false)
  }

  return (
    <section className="py-10 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-300 text-xs font-mono font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span>VIDEOS & REELS VIRALES · AUTO-ROTACIÓN 5s</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isEn ? 'Viral Solar & Space Weather Video Hub' : 'Hub de Videos Virales, Reels y Tormentas Solares'}
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl">
              {isEn
                ? 'High-impact footage from NASA Goddard, SDO, SOHO, ESA Solar Orbiter, Parker Solar Probe, and extreme G5 auroral recordings.'
                : 'Registros satelitales de altísimo impacto de NASA Goddard, SDO, SOHO, ESA Solar Orbiter, Parker Solar Probe y auroras extremas G5.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-2 shadow-sm ${
                autoRotate
                  ? 'bg-pink-500/20 border-pink-500/40 text-pink-300 hover:bg-pink-500/30'
                  : 'bg-white/5 border-white/15 text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title={autoRotate ? 'Pausar rotación automática' : 'Reanudar rotación automática'}
            >
              <span className={`w-2 h-2 rounded-full ${autoRotate ? 'bg-pink-400 animate-pulse' : 'bg-white/40'}`} />
              <span>{autoRotate ? '⏱️ Rotación 5s Activa' : '⏸️ Rotación Pausada'}</span>
            </button>
          </div>
        </div>

        {/* ─── Filtro Interactivo por Categoría ──────────────────────────── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar border-b border-white/10">
          {CATEGORY_FILTERS.map((cat) => {
            const isSelected = selectedCategory === cat.id
            const count =
              cat.id === 'all'
                ? VIRAL_SOLAR_VIDEOS.length
                : VIRAL_SOLAR_VIDEOS.filter((v) => v.category === cat.id).length

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 border-pink-400 text-white shadow-lg shadow-pink-500/25 scale-[1.03]'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* ─── Reproductor Principal y Carrusel de 5 Segundos ─────────────── */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Reproductor Principal Interactivo */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl group">
              {isPlaying ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.embedId}?autoplay=1&rel=0&enablejsapi=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                  {/* Botón flotante para cerrar el reproductor y volver al carrusel */}
                  <button
                    onClick={() => {
                      setIsPlaying(false)
                      setAutoRotate(true)
                    }}
                    className="absolute top-3 right-3 z-30 px-3 py-1.5 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-mono border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg hover:scale-105"
                    title="Cerrar video y volver al carrusel"
                  >
                    <span>✕</span>
                    <span className="hidden sm:inline">Cerrar Video</span>
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${activeVideo.embedId}/hqdefault.jpg`}
                    alt={activeVideo.title}
                    onError={(e) => {
                      // Fallback elegante a la imagen estelar
                      ;(e.target as HTMLImageElement).src = activeVideo.thumbnailUrl
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Botón Play Gigante */}
                  <button
                    onClick={() => {
                      setIsPlaying(true)
                      setAutoRotate(false)
                    }}
                    className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white flex items-center justify-center text-3xl shadow-2xl shadow-pink-500/60 hover:scale-110 transition-all z-20 group/btn"
                    aria-label="Reproducir video"
                  >
                    <span className="ml-1 transform group-hover/btn:scale-110 transition-transform">▶</span>
                  </button>

                  {/* Flechas de Navegación Rápida Anterior / Siguiente */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevVideo()
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-pink-600/80 border border-white/20 text-white flex items-center justify-center text-sm backdrop-blur-sm z-20 transition-all hover:scale-110"
                    title="Video Anterior"
                    aria-label="Video Anterior"
                  >
                    ◀
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextVideo()
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-pink-600/80 border border-white/20 text-white flex items-center justify-center text-sm backdrop-blur-sm z-20 transition-all hover:scale-110"
                    title="Video Siguiente"
                    aria-label="Video Siguiente"
                  >
                    ▶
                  </button>

                  {/* Badges Superiores */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-500 text-white shadow-lg pointer-events-auto">
                      {activeVideo.badge}
                    </span>
                    <div className="flex items-center gap-2 pointer-events-auto">
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/80 border border-white/20 text-white/90 backdrop-blur-md">
                        {activeVideo.duration}
                      </span>
                    </div>
                  </div>

                  {/* Información Inferior */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 font-mono">
                      <span>👁️ {activeVideo.views}</span>
                      <span>❤️ {activeVideo.likes}</span>
                      <span>• {activeVideo.author}</span>
                      <span className="text-pink-300">[{currentIndex + 1} de {filteredVideos.length}]</span>
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight drop-shadow-md">
                      {activeVideo.title}
                    </h3>
                  </div>
                </>
              )}

              {/* Barra de Progreso de 5 Segundos en la base del video */}
              {autoRotate && !isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              )}
            </div>

            {/* Ficha de Rigor Científico y Acciones */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">🔬 Ficha Heliofísica Oficial</span>
                  <span className="text-xs font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                    {activeVideo.timestamp}
                  </span>
                </div>
                <Link
                  href={`/reels?topic=${activeVideo.topicKey || 'flare'}`}
                  className="text-xs font-mono font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>✨ Crear Reel IA con este Evento</span>
                  <span>→</span>
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {activeVideo.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-white/40 pt-1">
                <div className="flex items-center gap-3">
                  <span>🛰️ Observatorio: <strong className="text-white/70">{activeVideo.author}</strong></span>
                  <span>⚡ Categoría: <strong className="text-pink-400 uppercase">{activeVideo.category}</strong></span>
                </div>
                <span>ID: {activeVideo.embedId}</span>
              </div>
            </div>
          </div>

          {/* Lista de Selección Rápida (Desktop & Mobile) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-2.5">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-xs font-mono font-bold text-white/60 uppercase tracking-wider">
                Lista de Videos ({filteredVideos.length})
              </span>
              <span className="text-[11px] font-mono text-pink-400">
                Clip {currentIndex + 1} de {filteredVideos.length}
              </span>
            </div>

            <div className="max-h-[580px] overflow-y-auto space-y-2.5 pr-1.5 custom-scrollbar">
              {filteredVideos.map((vid, idx) => {
                const isSelected = currentIndex === idx
                return (
                  <button
                    key={vid.id}
                    onClick={() => selectVideo(idx)}
                    className={`w-full p-2.5 sm:p-3 rounded-2xl text-left border transition-all flex items-center gap-3 relative overflow-hidden ${
                      isSelected
                        ? 'bg-pink-950/40 border-pink-500/90 shadow-lg shadow-pink-500/20 scale-[1.01]'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    {/* Miniatura del Video */}
                    <div className="w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 relative bg-black">
                      <img
                        src={`https://img.youtube.com/vi/${vid.embedId}/hqdefault.jpg`}
                        alt={vid.title}
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = vid.thumbnailUrl
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      {isSelected ? (
                        <div className="absolute inset-0 bg-pink-500/40 flex items-center justify-center text-white text-xs font-bold">
                          ▶
                        </div>
                      ) : (
                        <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[9px] font-mono text-white/90">
                          {vid.duration.split('·')[0].trim()}
                        </span>
                      )}
                    </div>

                    {/* Meta Video */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-0.5">
                        <span className="truncate text-pink-400 font-bold">{vid.badge.split(' ')[0]} {vid.badge.split(' ')[1] || 'VIDEO'}</span>
                        <span className="shrink-0">{vid.views}</span>
                      </div>
                      <div className="text-xs font-bold text-white truncate leading-snug">
                        {vid.title}
                      </div>
                      <div className="text-[10px] text-white/40 truncate mt-0.5 flex items-center gap-1">
                        <span>{vid.author}</span>
                      </div>
                    </div>

                    {/* Indicador de barra de progreso en card activa */}
                    {isSelected && autoRotate && !isPlaying && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-pink-500/30">
                        <div className="h-full bg-pink-400" style={{ width: `${progress}%` }} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

