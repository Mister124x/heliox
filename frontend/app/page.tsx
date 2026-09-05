'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import SolarViewer from '../components/SolarViewer'
import SolarGlobe3D from '../components/SolarGlobe3D'
import SolarStormSimulator from '../components/SolarStormSimulator'
import AlertTicker from '../components/AlertTicker'
import KpGauge from '../components/KpGauge'
import StormAlert from '../components/StormAlert'
import SocialVideoFeed from '../components/SocialVideoFeed'
import { fetchLiveSolarData, SolarSummary } from '../lib/solarClient'
import { useI18n } from '../lib/i18n'

export default function HomePage() {
  const { t, lang } = useI18n()
  const isEn = lang === 'en'

  const [summary, setSummary] = useState<SolarSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [countdown, setCountdown] = useState(30)

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
  const solarWind = summary?.solar_wind ?? {
    speed_km_s: 438,
    bz_nT: -1.8,
    bt_nT: 4.9,
    density_p_cm3: 5.2,
    temperature_K: 89000,
    alerta_bz: false,
  }
  const xray = summary?.xray_flux ?? { class: 'C1.4', flux_wm2: 1.45e-6 }

  return (
    <div className="min-h-screen bg-[#030014] text-white selection:bg-orange-500/30 selection:text-white">
      {/* ─── Navbar Unificado Glassmorphism ─────────────────────────────── */}
      <Navbar
        countdown={countdown}
        refreshing={refreshing}
        onRefresh={() => loadSummary(true)}
        isStormy={isStormy}
      />

      {/* ─── Ticker de Alertas de Clima Espacial ─────────────────────────── */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <AlertTicker alerts={summary?.alertas_noaa ?? []} kp={kp} />
      </div>

      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
        {/* ─── HERO SECTION (Estilo Antigravity / Deep Space Minimalist) ──── */}
        <section className="pt-8 sm:pt-12 pb-6 text-center max-w-4xl mx-auto space-y-6">
          {/* Badge de Estatus del Ciclo Solar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-mono font-medium backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span>HELIOX 2.0 · {isEn ? 'SOLAR CYCLE 25 MAXIMUM' : 'PICO MÁXIMO DEL CICLO SOLAR 25'}</span>
          </motion.div>

          {/* Título Principal de Impacto */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08]"
          >
            <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              {isEn ? 'Autonomous Heliophysics &' : 'Observatorio Autónomo de'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              {isEn ? 'Space Weather Intelligence' : 'Clima Espacial e Inteligencia Solar'}
            </span>
          </motion.h1>

          {/* Subtítulo depurado y profesional */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            {isEn
              ? 'Real-time telemetry from NASA SDO, NOAA SWPC & DSCOVR satellites. Live tracking of Class X flares, geomagnetic storms G1–G5, and planetary magnetospheric compression. Founded by'
              : 'Telemetría en tiempo real de satélites NASA SDO, NOAA SWPC y DSCOVR. Monitoreo en vivo de llamaradas Clase X, tormentas geomagnéticas G1–G5 y compresión magnetosférica. Fundado por'}{' '}
            <strong className="text-white font-semibold">JESÚS BARRIOS</strong>.
          </motion.p>

          {/* Botones de Acción Inmediata */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-black shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all font-mono flex items-center gap-2"
            >
              <span>🛰️</span>
              <span>{isEn ? 'Open Mission Control' : 'Abrir Control de Misión'} →</span>
            </Link>

            <Link
              href="/storms"
              className="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white active:scale-95 transition-all font-mono flex items-center gap-2"
            >
              <span>⚡</span>
              <span>{isEn ? 'Storm Tracker' : 'Monitor de Tormentas'}</span>
            </Link>

            <Link
              href="/reels"
              className="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 active:scale-95 transition-all font-mono flex items-center gap-2"
            >
              <span>🎬</span>
              <span>Reels & 4K Media</span>
            </Link>
          </motion.div>

          {/* HUD de Telemetría Rápida (Consola de Instrumentación) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-4 max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md text-left">
              {/* Kp */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-white/40 uppercase block">Índice Kp</span>
                <div className="text-xl sm:text-2xl font-black font-mono text-orange-400">
                  {kp.toFixed(1)} <span className="text-xs text-white/40 font-normal">{isStormy ? 'ALERTA' : 'QUIET'}</span>
                </div>
              </div>

              {/* Viento Solar */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-white/40 uppercase block">Viento Solar</span>
                <div className="text-xl sm:text-2xl font-black font-mono text-white">
                  {solarWind.speed_km_s?.toFixed(0) ?? '438'} <span className="text-xs text-white/40 font-normal">km/s</span>
                </div>
              </div>

              {/* Rayos X */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-white/40 uppercase block">Flujo Rayos X</span>
                <div className="text-xl sm:text-2xl font-black font-mono text-sky-400">
                  {xray.class || 'C1.4'}
                </div>
              </div>

              {/* IMF Bz */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-white/40 uppercase block">Campo IMF Bz</span>
                <div className={`text-xl sm:text-2xl font-black font-mono ${solarWind.bz_nT < -5 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {solarWind.bz_nT ? `${solarWind.bz_nT.toFixed(1)}` : '-1.8'} <span className="text-xs text-white/40 font-normal">nT</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── BENTO GRID ARQUITECTÓNICO (Estructura Limpia y Modular) ────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>🛰️</span>
                <span>{isEn ? 'Planetary Instrumentation & Solar Core' : 'Instrumentación Planetaria y Núcleo Solar'}</span>
              </h2>
              <p className="text-xs text-white/40 mt-0.5">
                {isEn
                  ? 'Real-time observation of active regions, coronal loops and geomagnetic coupling.'
                  : 'Observación en tiempo real de regiones activas, bucles coronales y acoplamiento geomagnético.'}
              </p>
            </div>
            <Link
              href="/dashboard"
              className="text-xs font-mono text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1"
            >
              <span>{isEn ? 'Full Suite' : 'Suite Completa'}</span>
              <span>→</span>
            </Link>
          </div>

          {/* Grid Principal: 3D Globe (2 cols) + Live Gauge (1 col) */}
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Globo Solar 3D Interactivo */}
            <div className="lg:col-span-8">
              <SolarGlobe3D />
            </div>

            {/* Gauge de Tormenta y Resumen Magnetosférico */}
            <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                  <span className="uppercase">Estado Geomagnético Actual</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <KpGauge
                  kp={kp}
                  severity={summary?.kp_index?.severity || 'Tranquilo'}
                  color={summary?.kp_index?.color || '#22c55e'}
                />
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2 text-xs font-mono">
                <div className="text-white/50 uppercase font-bold text-[10px]">Diagnóstico Planetario</div>
                <p className="text-white/80 leading-relaxed">
                  {kp >= 5
                    ? '⚠️ Tormenta geomagnética en curso. Se recomienda monitorear enlaces de radio HF y sistemas GNSS en altas latitudes.'
                    : '✅ Magnetosfera en calma relativa. Sin perturbaciones severas en redes de energía eléctrica ni telecomunicaciones satelitales.'}
                </p>
              </div>

              <Link
                href="/storms"
                className="w-full py-3 rounded-xl text-xs font-bold font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-white text-center transition-all block"
              >
                {isEn ? 'View Detailed Storm Logs →' : 'Ver Registro de Eventos Históricos →'}
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SIMULADOR INTERACTIVO DE IMPACTO EN CIUDADES ───────────────── */}
        <section className="space-y-4">
          <div className="border-b border-white/[0.08] pb-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>⚡</span>
              <span>{isEn ? 'Geomagnetic Storm Impact Simulator' : 'Simulador de Impacto Geomagnético por Ciudad'}</span>
            </h2>
            <p className="text-xs text-white/40 mt-0.5">
              {isEn
                ? 'Model GPS signal deviation, auroral oval reach, and power grid stress across global latitudes.'
                : 'Modela la desviación del GPS, el alcance del óvalo auroral y el estrés en redes eléctricas en diferentes latitudes.'}
            </p>
          </div>

          <SolarStormSimulator />
        </section>

        {/* ─── TELESCOPIO SDO DE ALTA RESOLUCIÓN Y ALERTAS RECIENTES ──────── */}
        <section className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Visor SDO en Vivo */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-white/50 uppercase font-bold">
                Telemetría Óptica Espacial NASA SDO
              </span>
              <span className="text-[11px] font-mono text-orange-400">1024x1024 UHD</span>
            </div>
            <SolarViewer compact={false} />
          </div>

          {/* Registro de Llamaradas y Eventos Recientes */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-white/50 uppercase font-bold">
                {isEn ? 'Recent Active Flares & CMEs' : 'Llamaradas y CMEs Recientes'}
              </span>
              <Link href="/storms" className="text-xs font-mono text-orange-400 hover:underline">
                {isEn ? 'All Alerts →' : 'Ver Todas →'}
              </Link>
            </div>

            <div className="space-y-3">
              {(summary?.flares_recientes ?? []).slice(0, 2).map((flare, i) => (
                <StormAlert
                  key={i}
                  type="LLAMARADA"
                  intensity={flare.class_type}
                  time={flare.begin_time}
                  location={flare.source_location}
                />
              ))}
              {(summary?.cme_recientes ?? []).slice(0, 2).map((cme, i) => (
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

        {/* ─── HUB MULTIMEDIA Y REELS 4K (Curaduría Satelital NASA/ESA) ───── */}
        <section className="space-y-4">
          <div className="border-b border-white/[0.08] pb-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>🎬</span>
              <span>{isEn ? 'Viral Solar Footage & High-Definition Replays' : 'Registros Satelitales y Footage Solar 4K'}</span>
            </h2>
            <p className="text-xs text-white/40 mt-0.5">
              {isEn
                ? 'Ultra-high-definition scientific observations from NASA Heliophysics, Parker Solar Probe, and SOHO.'
                : 'Observaciones científicas en ultra alta definición de NASA Heliofísica, Parker Solar Probe y SOHO.'}
            </p>
          </div>

          <SocialVideoFeed />
        </section>
      </main>

      {/* ─── FOOTER INSTITUCIONAL MODERNO (Estilo Antigravity / Vercel) ─── */}
      <footer className="border-t border-white/[0.08] px-4 sm:px-6 py-12 bg-black/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-orange-500/40 p-0.5 bg-orange-950/50">
              <img src="/favicon.svg" alt="HELIOX Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-white font-bold tracking-tight">HELIOX Solar Observatory</span>
              <span className="block text-[11px] text-white/40">
                Diseñado y dirigido por <strong className="text-white">JESÚS BARRIOS</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-white/60 font-mono text-xs">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/storms" className="hover:text-white transition-colors">Tormentas</Link>
            <Link href="/reels" className="hover:text-white transition-colors">Reels</Link>
            <Link href="/analysis" className="hover:text-white transition-colors">Análisis</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-white/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Datos Abiertos NASA / NOAA SWPC · © 2026 JESÚS BARRIOS</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
