'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SolarViewer from '../components/SolarViewer'
import KpGauge from '../components/KpGauge'
import StormAlert from '../components/StormAlert'
import DonationWidget from '../components/DonationWidget'
import AlertTicker from '../components/AlertTicker'
import AffiliateSection from '../components/AffiliateSection'
import SocialVideoFeed from '../components/SocialVideoFeed'
import AdBanner from '../components/AdBanner'
import { fetchLiveSolarData, SolarSummary } from '../lib/solarClient'
import { useI18n, LanguageSelector } from '../lib/i18n'

export default function HomePage() {
  const { t, lang } = useI18n()
  const [summary, setSummary] = useState<SolarSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [countdown, setCountdown] = useState(30)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const loadSummary = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true)
    try {
      const data = await fetchLiveSolarData()
      setSummary(data)
      setLastUpdate(new Date())
      setCountdown(30)
    } catch (err) {
      console.error('Error cargando datos solares en vivo', err)
    } finally {
      setLoading(false)
      if (isManual) setTimeout(() => setRefreshing(false), 600)
    }
  }, [])

  // Auto-refresco continuo cada 30 segundos
  useEffect(() => {
    loadSummary()
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          loadSummary()
          return 30
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [loadSummary])

  const kp = summary?.kp_index?.kp ?? 2.3
  const isStormy = kp >= 5

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ─── Navbar con Logo SVG, Selector de Idioma y Menú Móvil ───────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Logo Emblemático SVG Diseñado */}
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-solar-500/40 p-0.5 bg-solar-950/50 shadow-lg shadow-solar-500/20 group-hover:scale-105 transition-transform">
              <img src="/favicon.svg" alt="HELIOX Logo Oficial" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-solar-400 via-yellow-200 to-white bg-clip-text text-transparent">
                  HELIOX
                </span>
                <span className="text-[10px] bg-solar-500/20 text-solar-300 px-1.5 py-0.5 rounded border border-solar-500/30 font-mono">
                  SOLAR 25
                </span>
              </div>
              <span className="text-[10px] text-white/40 leading-none">
                {t.by} <strong className="text-white/60">JESÚS BARRIOS</strong>
              </span>
            </div>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/dashboard" className="text-sm text-white/70 hover:text-solar-300 transition-colors">
              {t.nav_dashboard}
            </Link>
            <Link href="/storms" className="text-sm text-white/70 hover:text-solar-300 transition-colors">
              {t.nav_storms}
            </Link>
            <Link href="/reels" className="text-sm text-white/70 hover:text-solar-300 transition-colors">
              {t.nav_reels}
            </Link>
            <Link href="/analysis" className="text-sm text-white/70 hover:text-solar-300 transition-colors">
              {t.nav_analysis}
            </Link>

            {/* Selector de 12 Idiomas */}
            <LanguageSelector />

            {/* Badge de Estado En Vivo & Auto-Refresco */}
            <button
              onClick={() => loadSummary(true)}
              title="Click para forzar actualización inmediata de telemetría"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all text-xs"
            >
              <div className={`w-2 h-2 rounded-full ${isStormy ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
              <span className="text-white/80 font-mono font-semibold">
                {isStormy ? 'ALERTA G1-G5' : t.nav_live}
              </span>
              <span className={`text-[10px] font-mono text-solar-400 ${refreshing ? 'animate-spin' : ''}`}>
                🔄 {countdown}s
              </span>
            </button>
          </div>

          {/* Acciones Móvil (Selector + Hamburguesa) */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Drawer Menú Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-white/10 px-4 py-4 space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-solar-400 font-bold py-1">
              🏠 Inicio
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">
              📊 {t.nav_dashboard}
            </Link>
            <Link href="/storms" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">
              ⚡ {t.nav_storms}
            </Link>
            <Link href="/reels" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">
              🎬 {t.nav_reels}
            </Link>
            <Link href="/analysis" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">
              📑 {t.nav_analysis} (+15 Pág)
            </Link>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/40">Sincronización NOAA:</span>
              <button
                onClick={() => { loadSummary(true); setMobileMenuOpen(false) }}
                className="text-xs text-solar-400 font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
              >
                🔄 Actualizar Ahora ({countdown}s)
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Ticker de alertas en vivo ───────────────────────────────────── */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <AlertTicker alerts={summary?.alertas_noaa ?? []} kp={kp} />
      </div>

      {/* ─── Hero Section Principal ───────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(247,135,8,0.08)_0%,_transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="solar-badge bg-solar-500/20 text-solar-300 border border-solar-500/30 mb-4 sm:mb-6 text-xs inline-flex items-center gap-2">
              <span>🛰️</span>
              <span>{t.hero_badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              <span className="text-solar-400">{t.hero_title_1}</span><br />
              {t.hero_title_2}<br />
              <span className="text-white/60">{t.hero_title_3}</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/70 mb-6 sm:mb-8 leading-relaxed">
              {t.hero_description} <strong className="text-solar-400">JESÚS BARRIOS</strong>.
            </p>

            {/* Stats en tiempo real */}
            {summary && (
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="solar-card p-3 sm:p-4 text-center bg-white/5 border border-white/10 hover:border-solar-500/30 transition-all">
                  <div className="data-value text-solar-400 text-2xl sm:text-3xl font-mono font-bold">{kp.toFixed(1)}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1">{t.dash_kp_index}</div>
                </div>
                <div className="solar-card p-3 sm:p-4 text-center bg-white/5 border border-white/10 hover:border-corona-400/30 transition-all">
                  <div className="data-value text-corona-400 text-2xl sm:text-3xl font-mono font-bold">{summary.xray_flux.class || 'C1.4'}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1">{t.dash_xray}</div>
                </div>
                <div className="solar-card p-3 sm:p-4 text-center bg-white/5 border border-white/10 hover:border-white/30 transition-all">
                  <div className="data-value text-white text-2xl sm:text-3xl font-mono font-bold">{summary.solar_wind.speed_km_s?.toFixed(0) ?? '438'}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1">km/s {t.dash_solar_wind}</div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <Link href="/dashboard" className="solar-btn text-xs sm:text-sm shadow-lg shadow-solar-500/20">
                {t.hero_btn_dashboard}
              </Link>
              <Link href="/storms" className="solar-btn-outline text-xs sm:text-sm">
                {t.hero_btn_storms}
              </Link>
              <Link href="/reels" className="solar-btn-outline border-pink-500/40 text-pink-300 hover:bg-pink-500/10 text-xs sm:text-sm">
                {t.hero_btn_reels}
              </Link>
            </div>

            {lastUpdate && (
              <div className="flex items-center gap-2 mt-4 text-[11px] sm:text-xs text-white/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.dash_synced}: {lastUpdate.toLocaleTimeString()} · Datos NOAA/SWPC & SDO NASA</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center w-full"
          >
            <SolarViewer compact={false} />
          </motion.div>
        </div>
      </section>

      {/* ─── Kp Gauge Interactivo ────────────────────────────────────────── */}
      {summary && (
        <section className="px-4 py-8 sm:py-12 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <KpGauge kp={kp} severity={summary.kp_index.severity} color={summary.kp_index.color} />
          </div>
        </section>
      )}

      {/* ─── Alertas de Tormenta y Llamaradas Recientes ──────────────────── */}
      <section className="px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="section-title text-xl sm:text-2xl">
              {t.events_title}
            </h2>
            <Link href="/storms" className="text-xs text-solar-400 hover:underline">
              {t.events_link}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {(summary?.flares_recientes ?? []).slice(0, 3).map((flare, i) => (
              <StormAlert
                key={i}
                type="LLAMARADA"
                intensity={flare.class_type}
                time={flare.begin_time}
                location={flare.source_location}
              />
            ))}
            {(summary?.cme_recientes ?? []).slice(0, 3).map((cme, i) => (
              <StormAlert
                key={`cme-${i}`}
                type="CME"
                intensity={cme.speed_km_s ? `${cme.speed_km_s.toFixed(0)} km/s` : '680 km/s'}
                time={cme.start_time}
                location="Corona Solar"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Banners de AdSense Verificado ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner format="auto" />
      </div>

      {/* ─── Sección de Videos, Reels & Shorts Reales y Actualizados ──────── */}
      <SocialVideoFeed />

      {/* ─── Banners de AdSense Horizontal Entre Contenido ──────────────── */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner format="horizontal" />
      </div>

      {/* ─── Sección de Afiliados y Equipamiento de Investigación ────────── */}
      <AffiliateSection />

      {/* ─── Widget de Recaudación y Donaciones Multipasarela ──────────────── */}
      <section className="px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <DonationWidget />
        </div>
      </section>

      {/* ─── Footer Institucional Multilenguaje ──────────────────────────── */}
      <footer className="border-t border-white/10 px-4 py-10 mt-8 bg-black/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-solar-500/30 p-0.5">
                <img src="/favicon.svg" alt="HELIOX Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight">HELIOX</div>
                <div className="text-xs text-white/50">
                  {t.footer_tagline} <strong className="text-solar-400">JESÚS BARRIOS</strong>
                </div>
              </div>
            </div>
            <div className="text-[11px] sm:text-xs text-white/30 text-center md:text-right">
              <p>{t.footer_data}</p>
              <p className="mt-0.5">{t.footer_images}</p>
              <p className="mt-1 text-solar-400/80 font-mono">© 2026 JESÚS BARRIOS · heliox-git-main-jesus-barrios.vercel.app</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
