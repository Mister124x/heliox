'use client'


import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../../components/Navbar'
import SolarPeakAlert from '../../components/SolarPeakAlert'
import PatronWall from '../../components/PatronWall'
import SocialVideoFeed from '../../components/SocialVideoFeed'
import AdBanner from '../../components/AdBanner'
import ViralShareBar from '../../components/ViralShareBar'
import { useI18n } from '../../lib/i18n'

export default function ReelsMediaPage() {
  const { t, lang } = useI18n()
  const isEn = lang === 'en'
  const isPt = lang === 'pt'

  const [platform, setPlatform] = useState<'tiktok' | 'reels' | 'shorts'>('tiktok')
  const [scriptData, setScriptData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const fetchScript = async (plat: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/content/reel-script?platform=${plat}`)
      const data = await res.json()
      setScriptData(data.script)
      setCurrentSlideIndex(0)
    } catch (e) {
      console.error('Error generando guion:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchScript(platform)
  }, [platform])

  const copyFullScript = () => {
    if (!scriptData) return
    const text =
      `🎬 TÍTULO: ${scriptData.title}\n⏱️ DURACIÓN: ${scriptData.duration_seconds}s\n\n` +
      scriptData.slides.map((s: any) => `[${s.second}s]\n🗣️ VOZ: ${s.voz}\n🖼️ VISUAL: ${s.visual}\n`).join('\n') +
      `\n🏷️ HASHTAGS:\n${scriptData.hashtags}\n\n📌 INVESTIGADOR: JESÚS BARRIOS · HELIOX Solar Observatory`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
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

        {/* ─── Selector de Plataforma & Acciones ──────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-8 my-8 items-start">
          {/* Panel Izquierdo: Controles del Estudio */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
              <div>
                <label className="text-xs font-mono font-bold text-white/60 uppercase tracking-wider block mb-2">
                  1. {isEn ? 'Select Social Platform' : 'Selecciona Plataforma'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'tiktok', label: 'TikTok', icon: '🎵' },
                    { id: 'reels', label: 'Reels', icon: '📸' },
                    { id: 'shorts', label: 'Shorts', icon: '▶️' },
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
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-white/60 uppercase tracking-wider block mb-2">
                  2. {isEn ? 'Live Script Actions' : 'Acciones del Guion'}
                </label>
                <div className="space-y-2">
                  <button
                    onClick={copyFullScript}
                    disabled={!scriptData}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs font-mono flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-black hover:scale-[1.02] transition-all shadow-lg shadow-orange-500/20"
                  >
                    <span>{copied ? '✅ ¡Guion Completo Copiado!' : '📋 Copiar Guion Teleprompter'}</span>
                  </button>

                  <button
                    onClick={() => fetchScript(platform)}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs font-mono flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all"
                  >
                    <span>🔄 {isEn ? 'Regenerate with Live Telemetry' : 'Regenerar con Telemetría Actual'}</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 text-[11px] text-white/40 space-y-1">
                <div className="flex justify-between">
                  <span>⏱️ Tiempo Estimado:</span>
                  <span className="text-white font-mono">{scriptData?.duration_seconds || 45}s</span>
                </div>
                <div className="flex justify-between">
                  <span>🎯 Tasa de Retención:</span>
                  <span className="text-emerald-400 font-mono font-bold">~84% (Hooks Optimizados)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Derecho: Teleprompter & Storyboard Mockup */}
          <div className="lg:col-span-2">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden space-y-6">
              {loading ? (
                <div className="py-20 text-center text-white/40 font-mono">
                  <div className="w-8 h-8 rounded-full border-2 border-pink-500 border-t-transparent animate-spin mx-auto mb-3" />
                  <span>Sintetizando telemetría solar en guion viral...</span>
                </div>
              ) : scriptData ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-pink-400 uppercase font-bold tracking-widest">
                        🎬 GUION GENERADO PARA {platform.toUpperCase()}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                        {scriptData.title}
                      </h2>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 shrink-0">
                      ⏱️ {scriptData.duration_seconds}s
                    </span>
                  </div>

                  {/* Slides del Teleprompter */}
                  <div className="space-y-3">
                    {scriptData.slides?.map((slide: any, idx: number) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 hover:border-pink-500/40 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                            Segundo {slide.second}s
                          </span>
                          <span className="text-[10px] text-white/40 font-mono">Paso {idx + 1} de {scriptData.slides.length}</span>
                        </div>

                        <div className="text-sm font-semibold text-white leading-relaxed">
                          🗣️ <strong className="text-white/60">Voz en Off:</strong> &quot;{slide.voz}&quot;
                        </div>

                        <div className="text-xs text-white/50 italic">
                          🖼️ <strong className="text-white/40 not-italic">En Pantalla:</strong> {slide.visual}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Hashtags Virales */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase block">Hashtags Recomendados:</span>
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
          <SocialVideoFeed />
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
