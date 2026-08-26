'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SocialVideoFeed from '../../components/SocialVideoFeed'
import AdBanner from '../../components/AdBanner'
import { useI18n, LanguageSelector } from '../../lib/i18n'

export default function ReelsMediaPage() {
  const { t } = useI18n()
  const [platform, setPlatform] = useState('tiktok')
  const [scriptData, setScriptData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const fetchScript = async (plat: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/content/reel-script?platform=${plat}`)
      const data = await res.json()
      setScriptData(data.script)
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
    const text = `🎬 TÍTULO: ${scriptData.title}\n⏱️ DURACIÓN: ${scriptData.duration_seconds}s\n\n` +
      scriptData.slides.map((s: any) => `[${s.second}s]\n🗣️ VOZ: ${s.voz}\n🖼️ VISUAL: ${s.visual}\n`).join('\n') +
      `\n🏷️ HASHTAGS:\n${scriptData.hashtags}\n\n📌 AUTOR: ${scriptData.author}`
    
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24 overflow-x-hidden">
      {/* Navbar con Logo y selector de idioma */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-solar-500/40 p-0.5 bg-solar-950/50">
              <img src="/favicon.svg" alt="HELIOX" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-solar-400 to-white bg-clip-text text-transparent">
              HELIOX
            </span>
            <span className="text-xs text-pink-400 font-mono hidden sm:inline bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
              MEDIA HUB
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Inicio</Link>
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_dashboard}</Link>
            <Link href="/storms" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_storms}</Link>
            <Link href="/reels" className="text-sm text-solar-400 font-semibold">{t.nav_reels}</Link>
            <Link href="/analysis" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_analysis}</Link>
            <LanguageSelector />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-white/10 px-4 py-4 space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">Inicio</Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_dashboard}</Link>
            <Link href="/storms" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_storms}</Link>
            <Link href="/reels" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-solar-400 font-bold py-1">{t.nav_reels}</Link>
            <Link href="/analysis" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_analysis} (+15 Pág)</Link>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-28">
        {/* Banner AdSense Superior */}
        <AdBanner format="horizontal" />

        {/* Sección de Videos Reales */}
        <SocialVideoFeed />

        {/* Generador de Guiones para Creadores de Contenido */}
        <section className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="solar-badge bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2 text-xs">
                ⚡ Generador de Contenido Viral por IA
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Guion Optimizado para Creadores de Contenido Solar
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Genera al instante libretos con tiempos para TikTok, YouTube Shorts e Instagram Reels basados en la telemetría actual.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {['tiktok', 'youtube_shorts', 'instagram_reels'].map((plat) => (
                <button
                  key={plat}
                  onClick={() => setPlatform(plat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    platform === plat
                      ? 'bg-solar-500 text-black font-bold shadow-lg shadow-solar-500/20'
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  {plat === 'tiktok' ? '📱 TikTok' : plat === 'youtube_shorts' ? '▶️ Shorts' : '📸 Reels'}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-white/40 font-mono text-sm">
              <span className="inline-block animate-spin mr-2">🔄</span> Generando guion adaptado a telemetría en vivo...
            </div>
          ) : scriptData ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-black/60 p-4 rounded-2xl border border-white/10">
                <div>
                  <div className="text-sm font-bold text-solar-300">{scriptData.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">Duración estimada: {scriptData.duration_seconds}s · {scriptData.target_audience}</div>
                </div>
                <button
                  onClick={copyFullScript}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-solar-500 hover:bg-solar-400 text-black transition-all flex items-center gap-1.5"
                >
                  <span>{copied ? '✅ ¡Copiado!' : '📋 Copiar Guion Completo'}</span>
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {scriptData.slides?.map((slide: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-solar-400 font-mono">
                      <span>Slide {idx + 1}</span>
                      <span>⏱️ {slide.second}s</span>
                    </div>
                    <div className="text-xs text-white/90 font-medium">🗣️ &quot;{slide.voz}&quot;</div>
                    <div className="text-[11px] text-white/40 italic">🖼️ Visual: {slide.visual}</div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs font-mono text-solar-300">
                {scriptData.hashtags}
              </div>
            </div>
          ) : null}
        </section>

        {/* Banner AdSense Inferior */}
        <AdBanner format="auto" />
      </main>
    </div>
  )
}
