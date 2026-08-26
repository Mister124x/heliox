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

interface SummaryData {
  kp_index: { kp: number; severity: string; color: string; timestamp: string }
  xray_flux: { class: string; flux_wm2: number }
  solar_wind: { speed_km_s: number; bz_nT: number; alerta_bz: boolean }
  flares_recientes: Array<{ class_type: string; begin_time: string; source_location: string }>
  cme_recientes: Array<{ id: string; start_time: string; speed_km_s: number }>
  alertas_noaa: Array<{ product_id: string; message: string }>
}

export default function HomePage() {
  const [summary, setSummary] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchSummary = async () => {
    try {
      const res = await fetch('/api/storms/summary')
      const data = await res.json()
      setSummary(data)
      setLastUpdate(new Date())
    } catch (err) {
      console.error('Error cargando datos solares', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSummary()
    const interval = setInterval(fetchSummary, 60_000)
    return () => clearInterval(interval)
  }, [])

  const kp = summary?.kp_index?.kp ?? 0
  const isStormy = kp >= 5

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ─── Navbar ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="text-xl font-bold tracking-tight">HELIOX</span>
            <span className="text-xs text-white/40 ml-2 hidden sm:block">por JESÚS BARRIOS</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/storms" className="text-sm text-white/60 hover:text-white transition-colors">Tormentas</Link>
            <Link href="/reels" className="text-sm text-white/60 hover:text-white transition-colors">Reels & Media</Link>
            <Link href="/analysis" className="text-sm text-white/60 hover:text-white transition-colors">Análisis</Link>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${isStormy ? 'bg-red-500 animate-ping' : 'bg-green-400'}`} />
              <span className="text-xs text-white/50">{isStormy ? 'ALERTA' : 'EN VIVO'}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Ticker de alertas ───────────────────────────────────────────── */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <AlertTicker alerts={summary?.alertas_noaa ?? []} kp={kp} />
      </div>

      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(247,135,8,0.08)_0%,_transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="solar-badge bg-solar-500/20 text-solar-300 border border-solar-500/30 mb-6">
              🛰️ Telemetría Satelital de NASA · NOAA · ESA en Tiempo Real
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              El <span className="text-solar-400">Sol</span><br />
              bajo vigilancia<br />
              <span className="text-white/60">permanente</span>
            </h1>

            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Monitoreo solar 24/7 con datos oficiales de NASA, NOAA y ESA.
              Tormentas geomagnéticas, llamaradas solares, índice Kp e
              imágenes espectroscópicas en vivo del SDO. Ciencia libre y abierta por <strong className="text-solar-400">JESÚS BARRIOS</strong>.
            </p>

            {/* Stats en tiempo real */}
            {summary && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="solar-card p-4 text-center">
                  <div className="data-value text-solar-400">{kp.toFixed(1)}</div>
                  <div className="text-xs text-white/50 mt-1">Índice Kp</div>
                </div>
                <div className="solar-card p-4 text-center">
                  <div className="data-value text-corona-400">{summary.xray_flux.class || '—'}</div>
                  <div className="text-xs text-white/50 mt-1">Llamarada</div>
                </div>
                <div className="solar-card p-4 text-center">
                  <div className="data-value text-white">{summary.solar_wind.speed_km_s?.toFixed(0) ?? '—'}</div>
                  <div className="text-xs text-white/50 mt-1">km/s Viento</div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className="solar-btn">
                Ver Dashboard de Telemetría →
              </Link>
              <Link href="/storms" className="solar-btn-outline">
                Tormentas Activas
              </Link>
              <Link href="/reels" className="solar-btn-outline border-pink-500/40 text-pink-300 hover:bg-pink-500/10">
                🎬 Generar Reels Virales
              </Link>
            </div>

            {lastUpdate && (
              <p className="text-xs text-white/30 mt-4">
                Última actualización: {lastUpdate.toLocaleTimeString('es-CO')} · sincronizado automáticamente
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center"
          >
            <SolarViewer compact={false} />
          </motion.div>
        </div>
      </section>

      {/* ─── Kp Gauge grande ────────────────────────────────────────────── */}
      {summary && (
        <section className="px-4 py-12 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <KpGauge kp={kp} severity={summary.kp_index.severity} color={summary.kp_index.color} />
          </div>
        </section>
      )}

      {/* ─── Alertas de tormenta ────────────────────────────────────────── */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">
              ⚡ Eventos & Llamaradas en Curso
            </h2>
            <Link href="/storms" className="text-xs text-solar-400 hover:underline">
              Ver registro completo de 14 días →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
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
                intensity={cme.speed_km_s ? `${cme.speed_km_s.toFixed(0)} km/s` : 'N/A'}
                time={cme.start_time}
                location=""
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sección de Afiliados y Equipamiento de Investigación ───────── */}
      <AffiliateSection />

      {/* ─── AdSense Banner Oficial ─────────────────────────────────────── */}
      <section className="px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="solar-card p-4 text-center border-dashed border-solar-500/20">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </section>

      {/* ─── Widget de Recaudación y Donaciones Multipasarela ─────────────── */}
      <section className="px-4 py-16">
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
              <div className="text-sm text-white/50">
                Observatorio Solar en Tiempo Real & Centro de Investigación · por <strong className="text-solar-400">JESÚS BARRIOS</strong>
              </div>
            </div>
            <div className="text-xs text-white/30 text-center md:text-right">
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
