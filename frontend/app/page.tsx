'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SolarViewer from '../components/SolarViewer'
import SolarGlobe3D from '../components/SolarGlobe3D'
import HackerPolymathMatrix from '../components/HackerPolymathMatrix'
import DeclassifiedDossier from '../components/DeclassifiedDossier'
import KpGauge from '../components/KpGauge'
import StormAlert from '../components/StormAlert'
import DonationWidget from '../components/DonationWidget'
import AlertTicker from '../components/AlertTicker'
import AffiliateSection from '../components/AffiliateSection'
import SocialVideoFeed from '../components/SocialVideoFeed'
import ViralShareBar from '../components/ViralShareBar'
import AdBanner from '../components/AdBanner'
import { fetchLiveSolarData, SolarSummary } from '../lib/solarClient'
import { useI18n, LanguageSelector } from '../lib/i18n'

export default function HomePage() {
  const { t, lang } = useI18n()
  const isEn = lang === 'en'
  const isPt = lang === 'pt'

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
  const solarWind = summary?.solar_wind ?? { speed_km_s: 438, bz_nT: -1.8, bt_nT: 4.9, density_p_cm3: 5.2, temperature_K: 89000, alerta_bz: false }
  const xray = summary?.xray_flux ?? { class: 'C1.4', flux_wm2: 1.45e-6 }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-orange-500/30 selection:text-white">

      {/* ─── Navbar Flotante con Glassmorphism ───────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/85">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-orange-500/40 p-0.5 bg-orange-950/50 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <img src="/favicon.svg" alt="HELIOX Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-yellow-200 to-white bg-clip-text text-transparent">
                  HELIOX
                </span>
                <span className="text-[10px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded border border-orange-500/30 font-mono font-bold">
                  SC25
                </span>
              </div>
              <span className="text-[10px] text-white/40 leading-none">
                {t.by} <strong className="text-white/70">JESÚS BARRIOS</strong>
              </span>
            </div>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/dashboard" className="text-sm text-white/70 hover:text-orange-400 transition-colors font-medium">
              {t.nav_dashboard}
            </Link>
            <Link href="/storms" className="text-sm text-white/70 hover:text-orange-400 transition-colors font-medium">
              {t.nav_storms}
            </Link>
            <Link href="/reels" className="text-sm text-white/70 hover:text-orange-400 transition-colors font-medium">
              {t.nav_reels}
            </Link>
            <Link href="/analysis" className="text-sm text-white/70 hover:text-orange-400 transition-colors font-medium">
              {t.nav_analysis}
            </Link>

            {/* Selector de 12 Idiomas */}
            <LanguageSelector />

            {/* Botón de Telemetría en Vivo */}
            <button
              onClick={() => loadSummary(true)}
              title="Click para actualizar telemetría satelital"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 transition-all text-xs"
            >
              <div className={`w-2 h-2 rounded-full ${isStormy ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
              <span className="text-white/80 font-mono font-semibold">
                {isStormy ? 'ALERTA G1-G5' : t.nav_live}
              </span>
              <span className={`text-[10px] font-mono text-orange-400 ${refreshing ? 'animate-spin' : ''}`}>
                🔄 {countdown}s
              </span>
            </button>
          </div>

          {/* Acciones Móvil */}
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
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-orange-400 font-bold py-1">
              🏠 {isEn ? 'Home' : 'Inicio'}
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
              <span className="text-xs text-white/40">Sincronización NOAA/NASA:</span>
              <button
                onClick={() => { loadSummary(true); setMobileMenuOpen(false) }}
                className="text-xs text-orange-400 font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
              >
                🔄 Actualizar ({countdown}s)
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Ticker de alertas en vivo ───────────────────────────────────── */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <AlertTicker alerts={summary?.alertas_noaa ?? []} kp={kp} />
      </div>

      {/* ─── Hero Section Principal de Alto Impacto ──────────────────────── */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        {/* Fondo: gradiente cósmico con plasma solar */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_10%,_rgba(247,135,8,0.12)_0%,_rgba(0,0,0,0.8)_60%,_#000000_100%)]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge Hero */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-300 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span>🛰️ {t.hero_badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent">
                {t.hero_title_1}
              </span>
              <br />
              <span className="text-white">{t.hero_title_2}</span>
              <br />
              <span className="text-white/50">{t.hero_title_3}</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
              {t.hero_description} <strong className="text-orange-400">JESÚS BARRIOS</strong>.
            </p>

            {/* Quick Telemetry Pills */}
            {summary && (
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/40 transition-all text-center">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-orange-400">{kp.toFixed(1)}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1 font-medium">{t.dash_kp_index}</div>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-400/40 transition-all text-center">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-blue-400">{summary.xray_flux.class || 'C1.4'}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1 font-medium">{t.dash_xray}</div>
                </div>
                <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-400/40 transition-all text-center">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-white">{solarWind.speed_km_s?.toFixed(0) ?? '438'}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1 font-medium">km/s {t.dash_solar_wind}</div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all"
              >
                {t.hero_btn_dashboard} →
              </Link>
              <Link
                href="/storms"
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white/5 hover:bg-white/10 border border-white/15 text-white transition-all"
              >
                {t.hero_btn_storms}
              </Link>
              <Link
                href="/reels"
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 transition-all"
              >
                🎬 {t.hero_btn_reels}
              </Link>
            </div>

            {lastUpdate && (
              <div className="flex items-center gap-2 mt-5 text-[11px] sm:text-xs text-white/40 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.dash_synced}: {lastUpdate.toLocaleTimeString()} · NOAA SWPC & NASA SDO Direct Telemetry</span>
              </div>
            )}
          </motion.div>

          {/* Visor Solar Interactivo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center w-full"
          >
            <SolarViewer compact={false} />
          </motion.div>
        </div>
      </section>

      {/* ─── Bento Grid de Telemetría Solar en Tiempo Real ───────────────── */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>⚡</span> {isEn ? 'Space Weather Live Matrix' : isPt ? 'Matriz de Clima Espacial ao Vivo' : 'Matriz de Clima Espacial en Tiempo Real'}
            </h2>
            <p className="text-xs text-white/50 mt-1">
              {isEn ? 'Direct satellite telemetry from NASA SDO, NOAA SWPC, and DSCOVR' : 'Telemetría satelital directa de NASA SDO, NOAA SWPC y DSCOVR'}
            </p>
          </div>
          <Link href="/dashboard" className="text-xs text-orange-400 hover:underline font-mono font-bold">
            {isEn ? 'Full Matrix →' : 'Ver Matriz Completa →'}
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Card 1: Kp Gauge */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
            <KpGauge kp={kp} severity={summary?.kp_index?.severity || 'Tranquilo'} color={summary?.kp_index?.color || '#22c55e'} />
          </div>

          {/* Card 2: Campo Magnético Interplanetario (IMF Bz) */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                <span className="font-mono uppercase">IMF Vector (Bz / Bt)</span>
                <span className="text-base">🧲</span>
              </div>
              <div className={`text-3xl font-black font-mono ${solarWind.bz_nT < -5 ? 'text-red-400' : 'text-emerald-400'}`}>
                {solarWind.bz_nT !== undefined ? `${solarWind.bz_nT.toFixed(1)}` : '-1.8'} <span className="text-sm text-white/40">nT</span>
              </div>
              <p className="text-xs text-white/50 mt-2 leading-relaxed">
                {solarWind.bz_nT < -5
                  ? '⚠️ Componente Bz hacia el Sur: Reconexión magnética activa y riesgo de tormenta.'
                  : '✅ Componente Bz hacia el Norte: Campo magnético terrestre protegido.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-white/60">
                <span>Densidad Plasma:</span>
                <span className="text-white font-bold">{solarWind.density_p_cm3 ?? 5.2} p/cm³</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Temperatura:</span>
                <span className="text-white font-bold">{solarWind.temperature_K?.toLocaleString() ?? '89,000'} K</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Alertas de Tormentas y Llamaradas Recientes ─────────────────── */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>🚨</span> {t.events_title}
          </h2>
          <Link href="/storms" className="text-xs text-orange-400 hover:underline font-mono font-bold">
            {t.events_link} →
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
      </section>

      {/* ─── Banner AdSense ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 my-6">
        <AdBanner format="horizontal" />
      </div>

      {/* ─── Barra de Difusión Viral en 1-Clic ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 my-6">
        <ViralShareBar />
      </div>

      {/* ─── Visor Solar 3D Interactivo en 360 Grados ──────────────────── */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <SolarGlobe3D />
      </section>

      {/* ─── Matriz Heliofísica Cuántica Hacker-Polímata ─────────────────── */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <HackerPolymathMatrix
          telemetry={{
            speed_km_s: solarWind.speed_km_s || 438,
            bz_nT: solarWind.bz_nT || -1.8,
            bt_nT: solarWind.bt_nT || 4.9,
            density_p_cm3: solarWind.density_p_cm3 || 5.2,
            temperature_K: solarWind.temperature_K || 89000,
          }}
        />
      </section>

      {/* ─── Dossier de Archivos Desclasificados y Amenazas Reales ──────── */}
      <DeclassifiedDossier />

      {/* ─── Hub de Videos y Reels Virales (Auto-rotación 5s) ───────────── */}
      <SocialVideoFeed />

      {/* ─── Banner AdSense ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 my-6">
        <AdBanner format="auto" />
      </div>

      {/* ─── Equipamiento Astronómico y Afiliados ────────────────────────── */}
      <AffiliateSection />

      {/* ─── Widget de Recaudación y Donaciones Multipasarela ─────────────── */}
      <section className="px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <DonationWidget />
        </div>
      </section>

      {/* ─── Footer Institucional Multilingüe ─────────────────────────────── */}
      <footer className="border-t border-white/10 px-4 py-12 mt-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-orange-500/40 p-0.5 bg-orange-950/50">
                <img src="/favicon.svg" alt="HELIOX Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-white">HELIOX Solar Observatory</div>
                <div className="text-xs text-white/50">
                  {t.footer_tagline} <strong className="text-orange-400">JESÚS BARRIOS</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-white/60">
              <Link href="/dashboard" className="hover:text-orange-400 transition-colors">{t.nav_dashboard}</Link>
              <Link href="/storms" className="hover:text-orange-400 transition-colors">{t.nav_storms}</Link>
              <Link href="/reels" className="hover:text-orange-400 transition-colors">{t.nav_reels}</Link>
              <Link href="/analysis" className="hover:text-orange-400 transition-colors">{t.nav_analysis}</Link>
            </div>

            <div className="text-[11px] sm:text-xs text-white/40 text-center md:text-right">
              <p>{t.footer_data}</p>
              <p className="mt-0.5">{t.footer_images}</p>
              <p className="mt-1 text-orange-400/90 font-mono font-bold">© 2026 JESÚS BARRIOS · heliox-observatory.vercel.app</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
