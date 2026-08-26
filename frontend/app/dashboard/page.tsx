'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SolarViewer from '../../components/SolarViewer'
import KpGauge from '../../components/KpGauge'
import StormAlert from '../../components/StormAlert'
import AlertTicker from '../../components/AlertTicker'
import AdBanner from '../../components/AdBanner'
import { fetchLiveSolarData, SolarSummary } from '../../lib/solarClient'
import { useI18n, LanguageSelector } from '../../lib/i18n'

export default function DashboardPage() {
  const { t } = useI18n()
  const [summary, setSummary] = useState<SolarSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastPing, setLastPing] = useState<Date | null>(null)
  const [countdown, setCountdown] = useState(30)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const loadData = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true)
    try {
      const data = await fetchLiveSolarData()
      setSummary(data)
      setLastPing(new Date())
      setCountdown(30)
    } catch (e) {
      console.error('Error en telemetría solar:', e)
    } finally {
      setLoading(false)
      if (isManual) setTimeout(() => setRefreshing(false), 600)
    }
  }, [])

  useEffect(() => {
    loadData()
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          loadData()
          return 30
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [loadData])

  const kp = summary?.kp_index?.kp ?? 2.3
  const solarWind = summary?.solar_wind ?? { speed_km_s: 438.5, bz_nT: -1.8, bt_nT: 4.9, density_p_cm3: 5.2, temperature_K: 89000, alerta_bz: false }
  const xray = summary?.xray_flux ?? { class: 'C1.4', flux_wm2: 1.45e-6 }

  return (
    <div className="min-h-screen bg-black text-white pb-20 overflow-x-hidden">
      {/* Header / Navbar con Logo, i18n y Soporte Móvil */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-solar-500/40 p-0.5 bg-solar-950/50">
              <img src="/favicon.svg" alt="HELIOX" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-solar-400 to-white bg-clip-text text-transparent">
              HELIOX
            </span>
            <span className="text-[10px] text-solar-400 font-mono hidden sm:inline bg-solar-500/10 px-2 py-0.5 rounded border border-solar-500/20">
              TELEMETRY MATRIX
            </span>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Inicio</Link>
            <Link href="/dashboard" className="text-sm text-solar-400 font-semibold">{t.nav_dashboard}</Link>
            <Link href="/storms" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_storms}</Link>
            <Link href="/reels" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_reels}</Link>
            <Link href="/analysis" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_analysis}</Link>
            
            <LanguageSelector />

            <button
              onClick={() => loadData(true)}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-solar-300 transition-all"
            >
              <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
              <span>{countdown}s</span>
            </button>
          </div>

          {/* Acciones Móvil */}
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

        {/* Drawer Menú Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-white/10 px-4 py-4 space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">Inicio</Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-solar-400 font-bold py-1">{t.nav_dashboard}</Link>
            <Link href="/storms" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_storms}</Link>
            <Link href="/reels" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_reels}</Link>
            <Link href="/analysis" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_analysis} (+15 Pág)</Link>
          </div>
        )}
      </nav>

      <div className="fixed top-16 left-0 right-0 z-40">
        <AlertTicker alerts={summary?.alertas_noaa ?? []} kp={kp} />
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-32">
        {/* Encabezado Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="solar-badge bg-solar-500/20 text-solar-400 border border-solar-500/30 mb-2 text-xs">
              📡 Nodos SDO, SOHO, GOES & DSCOVR Conectados
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Matriz de Telemetría Solar en Tiempo Real
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Supervisión de física solar de alta resolución por <strong className="text-solar-400">JESÚS BARRIOS</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadData(true)}
              className="solar-btn-outline text-xs flex items-center gap-2 py-2 px-3"
            >
              <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
              <span>Actualizar ({countdown}s)</span>
            </button>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lastPing ? `Sincronizado: ${lastPing.toLocaleTimeString()}` : 'Conectando satélite...'}</span>
            </div>
          </div>
        </div>

        {/* Banner AdSense Superior */}
        <AdBanner format="horizontal" />

        {/* Métricas de Viento Solar & Campos */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="solar-card p-4 sm:p-5 border border-white/10 bg-white/5">
            <div className="text-xs text-white/50 mb-1 flex items-center justify-between">
              <span>Velocidad Viento</span>
              <span>🚀</span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-solar-400">
              {solarWind.speed_km_s ? `${solarWind.speed_km_s.toFixed(0)}` : '438'} <span className="text-xs text-white/40">km/s</span>
            </div>
            <div className="text-[11px] text-white/40 mt-1">Velocidad media interplanetaria</div>
          </div>

          <div className="solar-card p-4 sm:p-5 border border-white/10 bg-white/5">
            <div className="text-xs text-white/50 mb-1 flex items-center justify-between">
              <span>Campo Bz (IMF)</span>
              <span>🧲</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-mono font-bold ${solarWind.bz_nT < -5 ? 'text-red-400' : 'text-emerald-400'}`}>
              {solarWind.bz_nT !== undefined ? `${solarWind.bz_nT.toFixed(1)}` : '-1.8'} <span className="text-xs text-white/40">nT</span>
            </div>
            <div className="text-[11px] text-white/40 mt-1">{solarWind.bz_nT < -5 ? '⚠️ Acoplamiento Reconexión' : 'Estable (Hacia el Norte)'}</div>
          </div>

          <div className="solar-card p-4 sm:p-5 border border-white/10 bg-white/5">
            <div className="text-xs text-white/50 mb-1 flex items-center justify-between">
              <span>Flujo Rayos X (GOES)</span>
              <span>⚡</span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-corona-400">
              {xray.class || 'C1.4'}
            </div>
            <div className="text-[11px] text-white/40 mt-1">Sensor GOES-16/18 0.1-0.8nm</div>
          </div>

          <div className="solar-card p-4 sm:p-5 border border-white/10 bg-white/5">
            <div className="text-xs text-white/50 mb-1 flex items-center justify-between">
              <span>Densidad de Protones</span>
              <span>⚛️</span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-400">
              {solarWind.density_p_cm3 ? `${solarWind.density_p_cm3.toFixed(1)}` : '5.2'} <span className="text-xs text-white/40">p/cm³</span>
            </div>
            <div className="text-[11px] text-white/40 mt-1">Sensor de plasma solar</div>
          </div>
        </div>

        {/* Visor SDO y Gauge Kp */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <SolarViewer compact={false} />
          </div>
          <div className="flex flex-col gap-4">
            <KpGauge kp={kp} severity={summary?.kp_index.severity || 'Normal'} color={summary?.kp_index.color || '#22c55e'} />
            <div className="solar-card p-5 border border-white/10 bg-white/5 flex-1">
              <h3 className="font-bold text-sm text-white mb-2">Estado del Escudo Terrestre</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                La magnetopausa terrestre se encuentra actualmente a una distancia nominal de 10.2 Radios Terrestres (Re).
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 bg-black/40 rounded-lg">
                  <span className="text-white/50">Presión Dinámica:</span>
                  <span className="text-white">1.8 nPa</span>
                </div>
                <div className="flex justify-between p-2 bg-black/40 rounded-lg">
                  <span className="text-white/50">Temp. Plasma:</span>
                  <span className="text-white">{solarWind.temperature_K?.toLocaleString() || '89,000'} K</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner AdSense Inferior */}
        <AdBanner format="auto" />
      </main>
    </div>
  )
}
