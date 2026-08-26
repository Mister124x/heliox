'use client'

import { useEffect, useState } from 'react'
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

export default function HomePage() {
  const [summary, setSummary] = useState<SolarSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const loadSummary = async () => {
    try {
      const data = await fetchLiveSolarData()
      setSummary(data)
      setLastUpdate(new Date())
    } catch (err) {
      console.error('Error cargando datos solares', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSummary()
    const interval = setInterval(loadSummary, 30_000)
    return () => clearInterval(interval)
  }, [])

  const kp = summary?.kp_index?.kp ?? 2.3
  const isStormy = kp >= 5

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ─── Navbar con Responsive Móvil ──────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="text-xl font-bold tracking-tight">HELIOX</span>
            <span className="text-xs text-white/40 ml-2 hidden sm:block">por JESÚS BARRIOS</span>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/storms" className="text-sm text-white/60 hover:text-white transition-colors">Tormentas</Link>
            <Link href="/reels" className="text-sm text-white/60 hover:text-white transition-colors">Reels & Media</Link>
            <Link href="/analysis" className="text-sm text-white/60 hover:text-white transition-colors">Análisis</Link>
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              <div className={`w-2 h-2 rounded-full ${isStormy ? 'bg-red-500 animate-ping' : 'bg-green-400'}`} />
              <span className="text-xs text-white/70 font-mono">{isStormy ? 'ALERTA' : 'EN VIVO'}</span>
            </div>
          </div>

          {/* Botón Hamburguesa Móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Drawer Menú Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-white/10 px-4 py-4 space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-solar-400 font-bold py-1">Inicio</Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">Dashboard</Link>
            <Link href="/storms" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">Tormentas</Link>
            <Link href="/reels" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">Reels & Media</Link>
            <Link href="/analysis" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">Análisis (+15 Pág)</Link>
          </div>
        )}
      </nav>

      {/* ─── Ticker de alertas ───────────────────────────────────────────── */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <AlertTicker alerts={summary?.alertas_noaa ?? []} kp={kp} />
      </div>

      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(247,135,8,0.08)_0%,_transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="solar-badge bg-solar-500/20 text-solar-300 border border-solar-500/30 mb-4 sm:mb-6 text-xs">
              🛰️ Telemetría Satelital de NASA · NOAA · ESA en Tiempo Real
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              El <span className="text-solar-400">Sol</span><br />
              bajo vigilancia<br />
              <span className="text-white/60">permanente</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/60 mb-6 sm:mb-8 leading-relaxed">
              Monitoreo solar 24/7 con datos oficiales de NASA, NOAA y ESA.
              Tormentas geomagnéticas, llamaradas solares, índice Kp e
              imágenes espectroscópicas en vivo del SDO. Ciencia libre y abierta por <strong className="text-solar-400">JESÚS BARRIOS</strong>.
            </p>

            {/* Stats en tiempo real */}
            {summary && (
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="solar-card p-3 sm:p-4 text-center bg-white/5">
                  <div className="data-value text-solar-400 text-2xl sm:text-3xl font-mono">{kp.toFixed(1)}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1">Índice Kp</div>
                </div>
                <div className="solar-card p-3 sm:p-4 text-center bg-white/5">
                  <div className="data-value text-corona-400 text-2xl sm:text-3xl font-mono">{summary.xray_flux.class || 'C1.4'}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1">Llamarada</div>
                </div>
                <div className="solar-card p-3 sm:p-4 text-center bg-white/5">
                  <div className="data-value text-white text-2xl sm:text-3xl font-mono">{summary.solar_wind.speed_km_s?.toFixed(0) ?? '438'}</div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1">km/s Viento</div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <Link href="/dashboard" className="solar-btn text-xs sm:text-sm">
                Ver Dashboard de Telemetría →
              </Link>
              <Link href="/storms" className="solar-btn-outline text-xs sm:text-sm">
                Tormentas Activas
              </Link>
              <Link href="/reels" className="solar-btn-outline border-pink-500/40 text-pink-300 hover:bg-pink-500/10 text-xs sm:text-sm">
                🎬 Reels & Shorts
              </Link>
            </div>

            {lastUpdate && (
              <p className="text-[11px] sm:text-xs text-white/30 mt-4">
                Sincronizado: {lastUpdate.toLocaleTimeString('es-CO')} · datos de satélite NOAA/SDO
              </p>
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

      {/* ─── Kp Gauge grande ────────────────────────────────────────────── */}
      {summary && (
        <section className="px-4 py-8 sm:py-12 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <KpGauge kp={kp} severity={summary.kp_index.severity} color={summary.kp_index.color} />
          </div>
        </section>
      )}

      {/* ─── Alertas de tormenta ────────────────────────────────────────── */}
      <section className="px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="section-title text-xl sm:text-2xl">
              ⚡ Eventos & Llamaradas en Curso
            </h2>
            <Link href="/storms" className="text-xs text-solar-400 hover:underline">
              Ver 14 días →
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

      {/* ─── Banners de AdSense ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner format="auto" />
      </div>

      {/* ─── Sección de Videos, Reels & Shorts Reales ─────────────────────── */}
      <SocialVideoFeed />

      {/* ─── Sección de Afiliados y Equipamiento de Investigación ───────── */}
      <AffiliateSection />

      {/* ─── Widget de Recaudación y Donaciones Multipasarela ─────────────── */}
      <section className="px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <DonationWidget />
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 px-4 py-10 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold mb-1">☀️ HELIOX</div>
              <div className="text-xs sm:text-sm text-white/50">
                Observatorio Solar en Tiempo Real & Centro de Investigación · por <strong className="text-solar-400">JESÚS BARRIOS</strong>
              </div>
            </div>
            <div className="text-[11px] sm:text-xs text-white/30 text-center md:text-right">
              <p>Datos científicos de NASA DONKI · NOAA SWPC · ESA Helioviewer</p>
              <p className="mt-1">Imágenes: Cortesía de NASA/SDO y los equipos AIA, EVE y HMI</p>
              <p className="mt-1">© 2026 JESÚS BARRIOS · heliox.jesusbarrios.co</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
