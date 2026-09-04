'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../../components/Navbar'
import SolarPeakAlert from '../../components/SolarPeakAlert'
import PatronWall from '../../components/PatronWall'
import SocialVideoFeed, { VIRAL_SOLAR_VIDEOS, VideoItem } from '../../components/SocialVideoFeed'
import AdBanner from '../../components/AdBanner'
import ViralShareBar from '../../components/ViralShareBar'
import { useI18n } from '../../lib/i18n'

export type ScriptPlatform = 'tiktok' | 'reels' | 'shorts'
export type ReelTopicKey = 'flare' | 'cme' | 'aurora' | 'sdo' | 'parker' | 'live'

interface TopicOption {
  id: ReelTopicKey
  label: string
  icon: string
  subtitle: string
  videoId: string
}

const TOPIC_OPTIONS: TopicOption[] = [
  {
    id: 'flare',
    label: 'Llamaradas X',
    icon: '⚡',
    subtitle: 'Erupciones extremas y pulso de rayos X',
    videoId: 'F0-4u7h-R6s',
  },
  {
    id: 'cme',
    label: 'CME hacia la Tierra',
    icon: '🌊',
    subtitle: 'Tsunami de plasma a 1,500 km/s',
    videoId: 'NnMIhD3h6Sg',
  },
  {
    id: 'aurora',
    label: 'Auroras G5 Históricas',
    icon: '🌌',
    subtitle: 'Cielos carmesí en el trópico (Mayo 2024)',
    videoId: 'kYJv8y6_D64',
  },
  {
    id: 'sdo',
    label: '10 Años en 4K',
    icon: '☀️',
    subtitle: 'Secretos de 425M fotos de NASA SDO',
    videoId: 'l3QQQu7QLoM',
  },
  {
    id: 'parker',
    label: 'Sonda Parker',
    icon: '🛰️',
    subtitle: 'Cruzando la corona a 1,400 °C',
    videoId: 'LkaLfbuB_6E',
  },
  {
    id: 'live',
    label: 'NASA Live 24/7',
    icon: '🔴',
    subtitle: 'Streaming satelital continuo del Sol',
    videoId: '21X5lGlDOfg',
  },
]

export default function ReelsMediaPage() {
  const { lang } = useI18n()
  const isEn = lang === 'en'

  const [platform, setPlatform] = useState<ScriptPlatform>('tiktok')
  const [topic, setTopic] = useState<ReelTopicKey>('flare')
  const [scriptData, setScriptData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copiedType, setCopiedType] = useState<'full' | 'voice' | 'slide' | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Estados del Reproductor y Teleprompter
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isTeleprompterRunning, setIsTeleprompterRunning] = useState(false)
  const [teleprompterSeconds, setTeleprompterSeconds] = useState(0)

  const activeTopicInfo = TOPIC_OPTIONS.find((t) => t.id === topic) || TOPIC_OPTIONS[0]

  // Carga inicial y lectura de URL query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const urlTopic = params.get('topic') as ReelTopicKey
      if (urlTopic && TOPIC_OPTIONS.some((t) => t.id === urlTopic)) {
        setTopic(urlTopic)
      }
    }
  }, [])

  // Petición al API para generar guion dinámico
  const fetchScript = async (plat: ScriptPlatform, top: ReelTopicKey) => {
    setLoading(true)
    setIsTeleprompterRunning(false)
    setTeleprompterSeconds(0)
    try {
      const res = await fetch(`/api/content/reel-script?platform=${plat}&topic=${top}`)
      const data = await res.json()
      if (data.script) {
        setScriptData(data.script)
        setCurrentSlideIndex(0)
      }
    } catch (e) {
      console.error('Error generando guion:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchScript(platform, topic)
  }, [platform, topic])

  // Simulador de Teleprompter con avance automático de slides
  useEffect(() => {
    if (!isTeleprompterRunning || !scriptData?.slides) return

    const maxSeconds = scriptData.duration_seconds || 45
    const interval = setInterval(() => {
      setTeleprompterSeconds((prev) => {
        const next = prev + 1
        if (next >= maxSeconds) {
          setIsTeleprompterRunning(false)
          return maxSeconds
        }
        // Buscar el slide activo según el timestamp
        const slides = scriptData.slides
        for (let i = slides.length - 1; i >= 0; i--) {
          if (next >= slides[i].second) {
            setCurrentSlideIndex(i)
            break
          }
        }
        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isTeleprompterRunning, scriptData])

  // Función genérica de copiado
  const copyToClipboard = (text: string, type: 'full' | 'voice' | 'slide') => {
    if (!text) return
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2500)
  }

  const copyFullScript = () => {
    if (!scriptData) return
    const text =
      `🎬 TÍTULO: ${scriptData.title}\n` +
      `🎯 FORMATO: ${platform.toUpperCase()} (${scriptData.target_audience})\n` +
      `⏱️ DURACIÓN: ${scriptData.duration_seconds}s\n\n` +
      `────────────────────────────────────────\n` +
      scriptData.slides
        .map(
          (s: any, i: number) =>
            `[PASO ${i + 1} · ${s.second}s]\n🗣️ VOZ: "${s.voz}"\n🖼️ VISUAL: ${s.visual}\n${
              s.tip ? `💡 TIP: ${s.tip}\n` : ''
            }`
        )
        .join('\n') +
      `────────────────────────────────────────\n` +
      `🏷️ HASHTAGS VIRALES:\n${scriptData.hashtags}\n\n` +
      `📌 OBSERVATORIO HELIOX · Creado por JESÚS BARRIOS · Monitoreo Solar 24/7`

    copyToClipboard(text, 'full')
  }

  const copyVoiceOnly = () => {
    if (!scriptData?.slides) return
    const voiceText = scriptData.slides.map((s: any) => s.voz).join(' ')
    copyToClipboard(voiceText, 'voice')
  }

  const copyCurrentSlide = () => {
    if (!scriptData?.slides || !scriptData.slides[currentSlideIndex]) return
    const s = scriptData.slides[currentSlideIndex]
    const text = `[Paso ${currentSlideIndex + 1} · Segundo ${s.second}s]\n🗣️ VOZ: "${s.voz}"\n🖼️ VISUAL: ${s.visual}`
    copyToClipboard(text, 'slide')
  }

  // Navegación de slides manual
  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1)
    }
  }

  const nextSlide = () => {
    if (scriptData?.slides && currentSlideIndex < scriptData.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1)
    }
  }

  const toggleTeleprompter = () => {
    if (isTeleprompterRunning) {
      setIsTeleprompterRunning(false)
    } else {
      if (teleprompterSeconds >= (scriptData?.duration_seconds || 45)) {
        setTeleprompterSeconds(0)
        setCurrentSlideIndex(0)
      }
      `🎬 TÍTULO: ${scriptData.title}\n⏱️ DURACIÓN: ${scriptData.duration_seconds}s\n\n` +
      scriptData.slides.map((s: any) => `[${s.second}s]\n🗣️ VOZ: ${s.voz}\n🖼️ VISUAL: ${s.visual}\n`).join('\n') +
      `\n🏷️ HASHTAGS:\n${scriptData.hashtags}\n\n📌 INVESTIGADOR: JESÚS BARRIOS · HELIOX Solar Observatory`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const downloadScriptFile = () => {
    if (!scriptData) return
    const text =
      `🎬 TÍTULO: ${scriptData.title}\n⏱️ DURACIÓN: ${scriptData.duration_seconds}s\nPLATAFORMA: ${platform.toUpperCase()}\nFECHA: ${new Date().toISOString()}\n\n` +
      scriptData.slides.map((s: any) => `[Segundo ${s.second}s]\n🗣️ VOZ EN OFF: "${s.voz}"\n🖼️ EN PANTALLA: ${s.visual}\n`).join('\n') +
      `\n🏷️ HASHTAGS:\n${scriptData.hashtags}\n\n📌 INVESTIGADOR: JESÚS BARRIOS · HELIOX Solar Observatory\nURL: https://heliox-observatory.vercel.app/reels`

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `heliox-guion-${platform}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2500)
  }

  const copySlideText = (slide: any, idx: number) => {
    navigator.clipboard.writeText(`[${slide.second}s] Voz: "${slide.voz}" | Visual: ${slide.visual}`)
    setCopiedSlideIdx(idx)
    setTimeout(() => setCopiedSlideIdx(null), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24 selection:bg-orange-500/30 selection:text-white">
      {/* ─── Navbar Unificado con Glassmorphism ──────────────────────────── */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-32">
        {/* Banner AdSense Superior */}
        <AdBanner format="horizontal" />

        {/* ─── Cabecera Estudio Viral ─────────────────────────────────────── */}
        <div className="my-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-mono font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <span>AI SPACE WEATHER SCRIPT ENGINE · TIKTOK & REELS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            {isEn ? 'Viral Content & Space Reels Studio' : 'Estudio de Contenido Viral y Reels Solares'}
          </h1>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            {isEn
              ? 'Generate high-retention short-form video scripts based on real-time NASA & NOAA telemetry in 1 click. Designed by'
              : 'Genera guiones de video corto con alta retención para redes sociales basados en telemetría en vivo de NASA y NOAA. Diseñado por'}{' '}
            <strong className="text-orange-400 font-bold">JESÚS BARRIOS</strong>.
          </p>
        </div>

        <div className="mb-8 p-4 sm:p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-pink-400 uppercase tracking-wider block">
              1. Selecciona el Evento Solar o Metraje Vinculado:
            </label>
            <span className="text-[11px] font-mono text-white/40">
              6 Eventos de Alto Impacto
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {TOPIC_OPTIONS.map((tOpt) => {
              const isSelected = topic === tOpt.id
              return (
                <button
                  key={tOpt.id}
                  onClick={() => {
                    setTopic(tOpt.id)
                    setIsVideoPlaying(false)
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-b from-pink-950/60 to-rose-950/40 border-pink-500 shadow-lg shadow-pink-500/20 scale-[1.02]'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{tOpt.icon}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white leading-tight">
                      {tOpt.label}
                    </div>
                    <div className="text-[10px] text-white/40 line-clamp-1 mt-0.5">
                      {tOpt.subtitle}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ─── Panel Principal: Controles + Video Preview + Teleprompter ───── */}
        <div className="grid lg:grid-cols-12 gap-8 my-8 items-start">
          {/* Columna Izquierda: Plataforma, Metraje y Acciones de Copiado (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Selector de Plataforma */}
            <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <label className="text-xs font-mono font-bold text-white/60 uppercase tracking-wider block">
                2. Plataforma de Destino:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'tiktok', label: 'TikTok', icon: '🎵', badge: '15-35s' },
                  { id: 'reels', label: 'Reels', icon: '📸', badge: '30-45s' },
                  { id: 'shorts', label: 'Shorts', icon: '▶️', badge: '40-60s' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 text-xs font-semibold ${
                      platform === p.id
                        ? 'bg-pink-500 text-white border-pink-400 font-bold shadow-lg shadow-pink-500/25 scale-[1.02]'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{p.icon}</span>
                    <span className="font-bold">{p.label}</span>
                    <span className="text-[9px] opacity-70 font-mono">{p.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reproductor de Video NASA B-Roll Sincronizado */}
            <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-400 flex items-center gap-1.5 uppercase">
                  <span>📹 Metraje NASA de Fondo</span>
                </span>
                <span className="text-[10px] font-mono text-white/40">
                  ID: {activeTopicInfo.videoId}
                </span>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/15 group">
                {isVideoPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeTopicInfo.videoId}?autoplay=1&rel=0`}
                    title={activeTopicInfo.label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${activeTopicInfo.videoId}/hqdefault.jpg`}
                      alt={activeTopicInfo.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-black flex items-center justify-center text-xl shadow-xl shadow-orange-500/40 hover:scale-110 transition-all z-20"
                      aria-label="Reproducir video de fondo"
                    >
                      ▶
                    </button>

                    <div className="absolute bottom-2.5 left-3 right-3 text-[11px] font-mono text-white/90 truncate">
                      {activeTopicInfo.label} · {activeTopicInfo.subtitle}
                    </div>
                  </>
                )}
              </div>

              {isVideoPlaying && (
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="w-full py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-white/60 transition-all text-center"
                >
                  ✕ Detener Video y Volver a Portada
                </button>
              )}
            </div>

            {/* Acciones de Copiado de Guion */}
            <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
              <label className="text-xs font-mono font-bold text-white/60 uppercase tracking-wider block">
                3. Acciones del Guion & Exportación:
              </label>

              <div className="space-y-2">
                <button
                  onClick={copyFullScript}
                  disabled={!scriptData}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs font-mono flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-black hover:scale-[1.02] transition-all shadow-lg shadow-orange-500/25"
                >
                  <span>
                    {copiedType === 'full'
                      ? '✅ ¡Guion Completo Copiado!'
                      : '📋 Copiar Guion Completo (Teleprompter)'}
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={copyVoiceOnly}
                    disabled={!scriptData}
                    className="py-2.5 px-3 rounded-xl font-semibold text-[11px] font-mono flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all"
                    title="Copia únicamente los textos de voz en off listos para pegar en ElevenLabs o CapCut TTS"
                  >
                    <span>{copiedType === 'voice' ? '✅ ¡Copiado!' : '🗣️ Solo Voz (TTS)'}</span>
                  </button>

                  <button
                    onClick={copyCurrentSlide}
                    disabled={!scriptData}
                    className="py-2.5 px-3 rounded-xl font-semibold text-[11px] font-mono flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all"
                    title="Copia el paso actual seleccionado en pantalla"
                  >
                    <span>{copiedType === 'slide' ? '✅ ¡Copiado!' : '📝 Copiar Paso Actual'}</span>
                  </button>
                </div>

                <button
                  onClick={() => fetchScript(platform, topic)}
                  className="w-full py-2 px-3 rounded-xl font-semibold text-[11px] font-mono flex items-center justify-center gap-2 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 transition-all"
                >
                  <span>🔄 Regenerar con Telemetría Actual de NASA</span>
                </button>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] text-white/40 space-y-1">
                <div className="flex justify-between">
                  <span>⏱️ Tiempo Estimado:</span>
                  <span className="text-white font-mono">{scriptData?.duration_seconds || 45}s</span>
                </div>
                <div className="flex justify-between">
                  <span>🎯 Tasa de Retención:</span>
                  <span className="text-emerald-400 font-mono font-bold">~86% (Hooks Optimizados)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Teleprompter Interactivo & Storyboard (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden space-y-6">
              {loading ? (
                <div className="py-24 text-center text-white/40 font-mono">
                  <div className="w-8 h-8 rounded-full border-2 border-pink-500 border-t-transparent animate-spin mx-auto mb-3" />
                  <span>Sintetizando telemetría heliofísica en guion viral...</span>
                </div>
              ) : scriptData ? (
                <>
                  {/* Encabezado del Guion */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-pink-400 uppercase font-bold tracking-widest bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                          🎬 {platform.toUpperCase()} · {topic.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-white/40">
                          {scriptData.target_audience}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
                        {scriptData.title}
                      </h2>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 font-bold">
                        ⏱️ {scriptData.duration_seconds}s
                      </span>
                    </div>
                  </div>

                  {/* Barra de Control de Slides & Simulador de Teleprompter */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/15 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Botones de Navegación de Slide */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevSlide}
                          disabled={currentSlideIndex === 0}
                          className="px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-bold flex items-center gap-1 transition-all"
                          title="Slide Anterior"
                        >
                          ◀ <span>Anterior</span>
                        </button>
                        <span className="text-xs font-mono text-pink-300 font-bold px-2">
                          Paso {currentSlideIndex + 1} de {scriptData.slides.length}
                        </span>
                        <button
                          onClick={nextSlide}
                          disabled={currentSlideIndex >= scriptData.slides.length - 1}
                          className="px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-bold flex items-center gap-1 transition-all"
                          title="Slide Siguiente"
                        >
                          <span>Siguiente</span> ▶
                        </button>
                      </div>

                      {/* Botón de Reproducir Teleprompter / Pausar */}
                      <button
                        onClick={toggleTeleprompter}
                        className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-2 ${
                          isTeleprompterRunning
                            ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                        }`}
                      >
                        <span>{isTeleprompterRunning ? '⏸️ Pausar Teleprompter' : '▶ Reproducir Teleprompter'}</span>
                        <span className="font-mono text-[10px] bg-black/40 px-1.5 py-0.5 rounded">
                          {teleprompterSeconds}s / {scriptData.duration_seconds}s
                        </span>
                      </button>
                    </div>

                    {/* Selector Rápido de Pasos (Pills) */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                      {scriptData.slides.map((s: any, idx: number) => {
                        const isCurrent = currentSlideIndex === idx
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setCurrentSlideIndex(idx)
                              setTeleprompterSeconds(s.second)
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border whitespace-nowrap transition-all ${
                              isCurrent
                                ? 'bg-pink-500 text-white border-pink-400 shadow-md shadow-pink-500/30 scale-105'
                                : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            Paso {idx + 1} ({s.second}s)
                          </button>
                        )
                      })}
                    </div>

                    {/* Barra de progreso de lectura en tiempo real */}
                    {isTeleprompterRunning && (
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-pink-500 transition-all duration-1000"
                          style={{
                            width: `${Math.min(
                              100,
                              (teleprompterSeconds / (scriptData.duration_seconds || 45)) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Spotlight del Slide Activo (Modo Teleprompter Grande) */}
                  {scriptData.slides[currentSlideIndex] && (
                    <motion.div
                      key={currentSlideIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-pink-950/30 to-black/60 border border-pink-500/60 shadow-xl shadow-pink-500/10 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                          <span className="text-xs font-mono font-bold text-pink-300 uppercase">
                            EN PANTALLA AHORA · PASO {currentSlideIndex + 1}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-orange-400 font-bold bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                          ⏱️ Segundo {scriptData.slides[currentSlideIndex].second}s
                        </span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider block">
                          🗣️ Voz en Off (Lee esto):
                        </span>
                        <p className="text-base sm:text-xl font-bold text-white leading-relaxed select-all">
                          &quot;{scriptData.slides[currentSlideIndex].voz}&quot;
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                        <span className="text-[11px] font-mono text-white/50 uppercase block">
                          🖼️ Indicación Visual / Metraje:
                        </span>
                        <p className="text-xs sm:text-sm text-white/80 italic leading-snug">
                          {scriptData.slides[currentSlideIndex].visual}
                        </p>
                      </div>

                      {scriptData.slides[currentSlideIndex].tip && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-300 flex items-center gap-2">
                          <span>💡</span>
                          <span>{scriptData.slides[currentSlideIndex].tip}</span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Storyboard Completo de Todos los Slides */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-white/60 uppercase tracking-wider block">
                      Storyboard Completo ({scriptData.slides.length} Pasos):
                    </span>

                    {scriptData.slides?.map((slide: any, idx: number) => {
                      const isSelected = currentSlideIndex === idx
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setCurrentSlideIndex(idx)
                            setTeleprompterSeconds(slide.second)
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                            isSelected
                              ? 'bg-pink-950/30 border-pink-500/80 shadow-lg shadow-pink-500/15'
                              : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                                isSelected
                                  ? 'text-pink-300 bg-pink-500/20 border-pink-500/40'
                                  : 'text-orange-400 bg-orange-500/10 border-orange-500/20'
                              }`}
                            >
                              Segundo {slide.second}s · Paso {idx + 1}
                            </span>
                            <span className="text-[10px] text-white/40 font-mono">
                              {isSelected ? '🎯 Seleccionado' : 'Toca para enfocar'}
                            </span>
                          </div>

                          <div className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                            🗣️ <strong className="text-white/60">Voz:</strong> &quot;{slide.voz}&quot;
                          </div>

                          <div className="text-xs text-white/50 italic">
                            🖼️ <strong className="text-white/40 not-italic">Visual:</strong> {slide.visual}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Hashtags Virales */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <span className="text-[10px] font-mono text-white/40 uppercase block">
                      Hashtags Recomendados (Alta Tracción):
                    </span>
                    <p className="text-xs font-mono text-pink-300 select-all leading-relaxed">
                      {scriptData.hashtags}
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* ─── Galería de Videos y Reels Educativos ───────────────────────── */}
        <div className="my-12">
          <SocialVideoFeed onSelectVideo={handleFeedVideoSelect} />
        </div>

        {/* ─── Banner Oficial de Pico Máximo Ciclo 25 ────────────────────── */}
        <SolarPeakAlert />

        {/* ─── Muro de Agradecimientos a Contribuyentes y Donantes en Vivo ─── */}
        <PatronWall />

        <div className="my-8">
          <ViralShareBar />
        </div>

        {/* AdSense Inferior */}
        <div className="my-8">
          <AdBanner format="auto" />
        </div>
      </main>

      {/* Footer Oficial */}
      <footer className="border-t border-white/10 px-4 py-8 mt-12 bg-black/90">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">HELIOX</span>
            <span>· por JESÚS BARRIOS</span>
          </div>
          <div className="flex flex-wrap gap-4 text-white/60">
            <Link href="/" className="hover:text-orange-400 transition-colors">Inicio</Link>
            <Link href="/dashboard" className="hover:text-orange-400 transition-colors">Dashboard</Link>
            <Link href="/storms" className="hover:text-orange-400 transition-colors">Tormentas</Link>
            <Link href="/reels" className="text-pink-400 font-bold">Reels</Link>
            <Link href="/analysis" className="hover:text-orange-400 transition-colors">Análisis</Link>
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-orange-400 transition-colors">Términos</Link>
          </div>
          <div className="text-[11px] text-white/40">
            © 2026 JESÚS BARRIOS · Datos NASA & NOAA
          </div>
        </div>
      </footer>
    </div>
  )
}
}
