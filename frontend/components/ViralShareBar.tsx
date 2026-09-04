'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n'

export default function ViralShareBar() {
  const { lang } = useI18n()
  const [copied, setCopied] = useState(false)
  const isEn = lang === 'en'

  const shareUrl = 'https://heliox-observatory.vercel.app'
  const shareTitle = isEn
    ? '🚨 LIVE SOLAR ALERT! Real-time NASA & NOAA satellite telemetry of solar storms and flares ☀️'
    : '🚨 ¡ALERTA SOLAR EN VIVO! Telemetría en tiempo real de satélites NASA y NOAA de tormentas y llamaradas ☀️'

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HELIOX Solar Observatory',
          text: shareTitle,
          url: shareUrl,
        })
      } catch (e) {
        // Fallback silenciados si cancela
      }
    } else {
      copyLink()
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${shareTitle}\n👇\n${shareUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedText = encodeURIComponent(shareTitle)

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}%20👇%20${encodedUrl}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=SpaceWeather,SolarStorm,HELIOX`
  const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`

  return (
    <div className="bg-gradient-to-r from-solar-950/80 via-black/90 to-solar-950/80 border border-solar-500/30 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden my-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-solar-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="solar-badge bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-2 text-xs inline-flex items-center gap-1.5">
            <span>🔥</span>
            <span>{isEn ? 'Viralize Space Science' : 'Viraliza la Ciencia Espacial'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {isEn ? 'Share live solar telemetry with 1-click' : 'Comparte la telemetría del Sol en 1 solo clic'}
          </h3>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl">
            {isEn
              ? 'Help us expand the HELIOX global network. Share solar flare alerts and satellite feeds on WhatsApp, X, and Telegram.'
              : 'Ayúdanos a expandir la red mundial HELIOX. Difunde las alertas de llamaradas y satélites en WhatsApp, X, Telegram y redes sociales.'}
          </p>
        </div>

        {/* Botones de Difusión Viral */}
        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 font-mono"
            title="Compartir en WhatsApp"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </a>

          {/* Twitter / X */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 transition-all flex items-center gap-1.5 font-mono"
            title="Compartir en X / Twitter"
          >
            <span>𝕏</span>
            <span>X (Twitter)</span>
          </a>

          {/* Telegram */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-sky-600/30 hover:bg-sky-600 active:scale-95 text-sky-200 hover:text-white border border-sky-500/30 transition-all flex items-center gap-1.5 font-mono"
            title="Compartir en Telegram"
          >
            <span>✈️</span>
            <span>Telegram</span>
          </a>

          {/* Facebook */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-blue-600/30 hover:bg-blue-600 active:scale-95 text-blue-200 hover:text-white border border-blue-500/30 transition-all flex items-center gap-1.5 font-mono hidden sm:flex"
            title="Compartir en Facebook"
          >
            <span>📘</span>
            <span>Facebook</span>
          </a>

          {/* Botón de Copiar Link Directo */}
          <button
            type="button"
            onClick={copyLink}
            className="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 active:scale-95 text-black transition-all flex items-center gap-1.5 shadow-lg shadow-orange-500/20 font-mono cursor-pointer"
            title="Copiar enlace al portapapeles"
          >
            <span>{copied ? '✅' : '📋'}</span>
            <span>{copied ? (isEn ? 'Link Copied!' : '¡Enlace Copiado!') : (isEn ? 'Copy Link' : 'Copiar Link')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
