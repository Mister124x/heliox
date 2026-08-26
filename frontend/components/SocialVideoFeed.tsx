'use client'

import { useState, useEffect, useRef } from 'react'
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
  likes: string
  description: string
  embedId: string
  thumbnailUrl: string
  badge: string
  isLive?: boolean
  timestamp: string
}

const VIRAL_SOLAR_VIDEOS: VideoItem[] = [
  {
    id: 'vid-sdo-10y',
    title: '10 Años del Sol en 1 Hora: Timelapse Monumental de NASA SDO en 4K',
    platform: 'youtube',
    category: 'nasa',
    author: 'NASA Goddard Heliophysics',
    duration: '4K Ultra HD',
    views: '18.4M',
    likes: '840K',
    description: '425 millones de imágenes de alta resolución capturadas durante una década completa por el satélite SDO.',
    embedId: 'l3QQQu7QLoM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=800&q=80',
    badge: '🔥 VIRAL 18M+',
    timestamp: 'Tendencia Global',
  },
  {
    id: 'vid-flare-x',
    title: 'Llamarada Solar Extrema Clase X expulsando billones de toneladas de plasma',
    platform: 'youtube',
    category: 'tormentas',
    author: 'NASA Solar Dynamics',
    duration: '0:45s',
    views: '5.2M',
    likes: '310K',
    description: 'Erupción coronal masiva capturada en longitudes de onda de 131Å y 304Å antes del impacto geomagnético.',
    embedId: '6tmbeLTHC_0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    badge: '⚡ CLASE X HISTÓRICA',
    timestamp: 'Evento Crítico',
  },
  {
    id: 'vid-aurora-g5',
    title: 'Auroras Boreales Tropicales por Tormenta G5 (AR3664 en Vivo)',
    platform: 'youtube',
    category: 'auroras',
    author: 'Observatorio Heliofísico Global',
    duration: '0:58s',
    views: '7.8M',
    likes: '490K',
    description: 'Registro en tiempo real de cielos iluminados de púrpura y carmesí en latitudes ecuatoriales.',
    embedId: 'sU3b2W7gBv8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&w=800&q=80',
    badge: '🌌 AURORA G5',
    timestamp: 'Viral Reciente',
  },
  {
    id: 'vid-earth-shield',
    title: '¿Qué pasaría si el Campo Magnético de la Tierra colapsa por una CME?',
    platform: 'youtube',
    category: 'ciencia',
    author: 'Space Science Institute',
    duration: '1:15s',
    views: '3.6M',
    likes: '220K',
    description: 'Modelado 3D de la compresión de la magnetosfera ante un impacto frontal de viento solar a 2,000 km/s.',
    embedId: 'vVj_p4p_Vrw',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    badge: '🛡️ FÍSICA MAGNETOSFÉRICA',
    timestamp: 'Educativo',
  },
  {
    id: 'vid-nasa-live',
    title: 'NASA Live: Transmisión Satelital Continua del Sol y la Tierra desde el Espacio',
    platform: 'live',
    category: 'live',
    author: 'NASA Live Stream',
    duration: '🔴 24/7 EN DIRECTO',
    views: '142K online',
    likes: '1.2M',
    description: 'Streaming directo de telemetría de satélites SDO, ISS y sensores heliofísicos orbitales.',
    embedId: '21X5lGlDOfg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    badge: '🔴 EN VIVO 24/7',
    isLive: true,
    timestamp: 'Transmisión Activa',
  },
]

export default function SocialVideoFeed() {
  const { lang } = useI18n()
  const isEn = lang === 'en'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [progress, setProgress] = useState(0)

  const activeVideo = VIRAL_SOLAR_VIDEOS[currentIndex]

  // Auto-rotación de videos cada 5 segundos
  useEffect(() => {
    if (!autoRotate || isPlaying) return

    const intervalTime = 50 // ms
    const totalDuration = 5000 // 5 segundos
    const step = (intervalTime / totalDuration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % VIRAL_SOLAR_VIDEOS.length)
          return 0
        }
        return prev + step
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [autoRotate, isPlaying])

  const selectVideo = (idx: number) => {
    setCurrentIndex(idx)
    setProgress(0)
    setIsPlaying(false)
  }

  return (
    <section className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-300 text-xs font-mono font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span>VIDEOS & REELS VIRALES · AUTO-ROTACIÓN 5s</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isEn ? 'Viral Space Weather & Solar Storm Video Hub' : 'Hub de Videos Virales, Reels y Tormentas Solares'}
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Los registros satelitales más virales e impactantes del Sol, auroras boreales y física espacial.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 ${
                autoRotate
                  ? 'bg-pink-500/20 border-pink-500/40 text-pink-300'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <span>{autoRotate ? '⏱️ Rotación 5s Activa' : '⏸️ Rotación Pausada'}</span>
            </button>
          </div>
        </div>

        {/* ─── Reproductor Principal y Carrusel de 5 Segundos ─────────────── */}
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Reproductor Principal Interactivo */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl group">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.embedId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={activeVideo.thumbnailUrl}
                    alt={activeVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Botón Play Gigante */}
                  <button
                    onClick={() => {
                      setIsPlaying(true)
                      setAutoRotate(false)
                    }}
                    className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-pink-500 hover:bg-pink-400 text-white flex items-center justify-center text-3xl shadow-2xl shadow-pink-500/50 hover:scale-110 transition-all z-20"
                    aria-label="Reproducir video"
                  >
                    ▶
                  </button>

                  {/* Badges Superiores */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-500 text-white shadow-lg">
                      {activeVideo.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/80 border border-white/20 text-white/80">
                      {activeVideo.duration}
                    </span>
                  </div>

                  {/* Información Inferior */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                    <div className="flex items-center gap-3 text-xs text-white/60 font-mono">
                      <span>👁️ {activeVideo.views}</span>
                      <span>❤️ {activeVideo.likes}</span>
                      <span>• {activeVideo.author}</span>
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-white leading-tight">
                      {activeVideo.title}
                    </h3>
                  </div>
                </>
              )}

              {/* Barra de Progreso de 5 Segundos en la base del video */}
              {autoRotate && !isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
                  <motion.div
                    className="h-full bg-pink-500"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Lista de Selección Rápida (5 Cards) */}
          <div className="lg:col-span-4 space-y-2.5">
            {VIRAL_SOLAR_VIDEOS.map((vid, idx) => {
              const isSelected = currentIndex === idx
              return (
                <button
                  key={vid.id}
                  onClick={() => selectVideo(idx)}
                  className={`w-full p-3 rounded-2xl text-left border transition-all flex items-center gap-3 relative overflow-hidden ${
                    isSelected
                      ? 'bg-pink-950/30 border-pink-500/80 shadow-lg shadow-pink-500/15 scale-[1.02]'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 relative bg-black">
                    <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-pink-500/30 flex items-center justify-center text-xs">
                        ▶
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-0.5">
                      <span className="truncate text-pink-400 font-bold">{vid.badge.split(' ')[1] || 'VIDEO'}</span>
                      <span className="shrink-0">{vid.views}</span>
                    </div>
                    <div className="text-xs font-bold text-white truncate leading-snug">
                      {vid.title}
                    </div>
                    <div className="text-[10px] text-white/40 truncate mt-0.5">{vid.author}</div>
                  </div>

                  {/* Indicador de barra de progreso en card activa */}
                  {isSelected && autoRotate && !isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500/30">
                      <div className="h-full bg-pink-400" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
