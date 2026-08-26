'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SocialVideoFeed from '../../components/SocialVideoFeed'

export default function ReelsMediaPage() {
  const [platform, setPlatform] = useState('tiktok')
  const [scriptData, setScriptData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

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
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="text-xl font-bold tracking-tight">HELIOX</span>
            <span className="text-xs text-pink-400 font-mono hidden sm:inline">MEDIA HUB</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Inicio</Link>
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/storms" className="text-sm text-white/60 hover:text-white transition-colors">Tormentas</Link>
            <Link href="/reels" className="text-sm text-solar-400 font-semibold">Reels & Media</Link>
            <Link href="/analysis" className="text-sm text-white/60 hover:text-white transition-colors">Análisis</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-28">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="solar-badge bg-pink-500/20 text-pink-400 border border-pink-500/30 mb-3">
            🎥 Centro de Medios, Videos Virales & Creadores
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Videos, Reels & Contenido Solar Actual
          </h1>
          <p className="text-sm text-white/60">
            Explora las publicaciones más destacadas en redes sociales y utiliza la inteligencia artificial de HELIOX para generar tus propios guiones con datos en tiempo real. Por <strong className="text-solar-400">JESÚS BARRIOS</strong>.
          </p>
        </div>

        {/* 1. Feed Curado de Videos de Redes Sociales */}
        <div className="mb-14">
          <SocialVideoFeed />
        </div>

        {/* 2. Generador de Guiones para tus Propias Redes */}
        <div className="max-w-5xl mx-auto border-t border-white/10 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              🎙️ Generador de Guiones para tus Redes Sociales
            </h2>
            <p className="text-xs md:text-sm text-white/60">
              Genera un guion optimizado para hablar sobre la actividad solar de hoy en tus cuentas.
            </p>
          </div>

          {/* Selector de Plataforma */}
          <div className="flex justify-center gap-3 mb-8">
            {[
              { id: 'tiktok', label: '📱 TikTok (Alta Retención)', color: 'bg-gradient-to-r from-pink-600 to-rose-600' },
              { id: 'instagram', label: '📸 Instagram Reels', color: 'bg-gradient-to-r from-purple-600 to-indigo-600' },
              { id: 'youtube', label: '▶️ YouTube Shorts', color: 'bg-gradient-to-r from-red-600 to-orange-600' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                  platform === p.id ? `${p.color} text-white shadow-lg` : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Visualizador del Guión */}
          <div className="solar-card p-6 md:p-8 bg-black/60 border border-white/10 rounded-3xl relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs text-pink-400 font-mono uppercase tracking-wider">Hook de Viralidad (0-3s)</span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
                  {scriptData?.title || 'Generando con datos de satélites...'}
                </h2>
              </div>

              <button
                onClick={copyFullScript}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-solar-500 hover:bg-solar-400 text-black shadow-lg shadow-solar-500/20 transition-all flex items-center gap-2"
              >
                {copied ? '✅ ¡Guion Completo Copiado!' : '📋 Copiar Guion y Hashtags'}
              </button>
            </div>

            {/* Slides / Storyboard */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xs font-mono uppercase text-white/50 tracking-wider">Storyboard de Grabación:</h3>
              {scriptData?.slides?.map((slide: any, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-16 shrink-0 font-mono text-sm font-bold text-solar-400 bg-solar-500/10 px-2 py-1 rounded-lg text-center">
                    {slide.second}s
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-bold text-white">🗣️ Voz en Off: <span className="font-normal text-white/90">{slide.voz}</span></div>
                    <div className="text-xs text-white/50">🖼️ Elemento Visual: <span className="text-pink-300">{slide.visual}</span></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hashtags y Recomendación de Audio */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="text-xs text-white/60">
                🎵 <strong>Audio de Fondo Sugerido:</strong> {scriptData?.music_suggestion}
              </div>
              <div className="text-xs text-solar-300 font-mono break-words leading-relaxed">
                <strong>Hashtags de Alcance:</strong> {scriptData?.hashtags}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
