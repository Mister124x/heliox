'use client'


import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import SolarViewer from '../../components/SolarViewer'
import SolarGlobe3D from '../../components/SolarGlobe3D'
import SolarPeakAlert from '../../components/SolarPeakAlert'
import PatronWall from '../../components/PatronWall'
import HackerPolymathMatrix from '../../components/HackerPolymathMatrix'
import KpGauge from '../../components/KpGauge'
import StormAlert from '../../components/StormAlert'
import AlertTicker from '../../components/AlertTicker'
import AdBanner from '../../components/AdBanner'
import ViralShareBar from '../../components/ViralShareBar'
import { fetchLiveSolarData, SolarSummary } from '../../lib/solarClient'
import { useI18n } from '../../lib/i18n'

export default function DashboardPage() {
  const { t, lang } = useI18n()
  const isEn = lang === 'en'
  const isPt = lang === 'pt'

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
  const isStormy = kp >= 5
  const solarWind = summary?.solar_wind ?? { speed_km_s: 438.5, bz_nT: -1.8, bt_nT: 4.9, density_p_cm3: 5.2, temperature_K: 89000, alerta_bz: false }
  const xray = summary?.xray_flux ?? { class: 'C1.4', flux_wm2: 1.45e-6 }

  // Cálculo de presión dinámica (Ram Pressure) en nanoPascales
  const density = solarWind.density_p_cm3 || 5.2
  const speed = solarWind.speed_km_s || 438
  const ramPressure_nPa = (1.6726e-6 * density * Math.pow(speed, 2)).toFixed(2)

  // Estimación de distancia de la magnetopausa en Radios Terrestres (Re)
  const magnetopause_Re = (Math.pow(1.8 / Math.max(Number(ramPressure_nPa), 0.5), 1 / 6) * 10.2).toFixed(1)

  return (
    <div className="min-h-screen bg-black text-white pb-24 selection:bg-orange-500/30 selection:text-white">

      {/* ─── Navbar Unificado con Glassmorphism ──────────────────────────── */}
      <Navbar
        countdown={countdown}
        refreshing={refreshing}
        onRefresh={() => loadData(true)}
        isStormy={isStormy}
      />

      {/* ─── Ticker de Alertas en Vivo ───────────────────────────────────── */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <AlertTicker alerts={summary?.alertas_noaa ?? []} kp={kp} />
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-32">
        {/* Encabezado Mission Control */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-mono font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NASA SDO · NOAA SWPC · SOHO LASCO · DSCOVR LIVE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {isEn ? 'Solar Telemetry & Physics Matrix' : isPt ? 'Matriz de Telemetria e Física Solar' : 'Matriz de Telemetría y Física Solar'}
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              {isEn ? 'Supervised by Principal Investigator' : 'Supervisado por Investigador Principal'} <strong className="text-orange-400">JESÚS BARRIOS</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadData(true)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/80 font-mono flex items-center gap-2 transition-all"
            >
              <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
              <span>{isEn ? 'Refresh' : 'Actualizar'} ({countdown}s)</span>
            </button>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lastPing ? lastPing.toLocaleTimeString() : 'Online'}</span>
            </div>
          </div>
        </div>

        {/* AdSense Superior */}
        <AdBanner format="horizontal" />

        {/* ─── 4 Tarjetas HUD de Telemetría Aeroespacial ───────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {/* 1. Velocidad Viento Solar */}
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-orange-500/40 transition-all">
            <div className="text-xs text-white/50 mb-1 flex items-center justify-between font-mono">
              <span>SOLAR WIND SPEED</span>
              <span>🚀</span>
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-black text-orange-400 tracking-tight">
              {solarWind.speed_km_s ? `${solarWind.speed_km_s.toFixed(0)}` : '438'} <span className="text-xs text-white/40 font-normal">km/s</span>
            </div>
            <div className="mt-2 text-[11px] text-white/50">
              {solarWind.speed_km_s > 600
                ? '⚡ Viento Solar Rápido (Coronal Hole Stream)'
                : 'Viento Solar Nominal Interplanetario'}
            </div>
          </div>

          {/* 2. Campo IMF Bz */}
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
            <div className="text-xs text-white/50 mb-1 flex items-center justify-between font-mono">
              <span>IMF VECTOR (Bz)</span>
              <span>🧲</span>
            </div>
            <div className={`text-3xl sm:text-4xl font-mono font-black tracking-tight ${solarWind.bz_nT < -5 ? 'text-red-400' : 'text-emerald-400'}`}>
              {solarWind.bz_nT !== undefined ? `${solarWind.bz_nT.toFixed(1)}` : '-1.8'} <span className="text-xs text-white/40 font-normal">nT</span>
            </div>
            <div className="mt-2 text-[11px] text-white/50">
              {solarWind.bz_nT < -5 ? '⚠️ Reconexión Magnética Sur' : '✅ Acoplamiento Seguro Norte'}
            </div>
          </div>

          {/* 3. Flujo Rayos X (GOES) */}
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-400/40 transition-all">
            <div className="text-xs text-white/50 mb-1 flex items-center justify-between font-mono">
              <span>GOES X-RAY FLUX</span>
              <span>⚡</span>
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-black text-blue-400 tracking-tight">
              {xray.class || 'C1.4'}
            </div>
            <div className="mt-2 text-[11px] text-white/50">
              Sensor GOES-16/18 (0.1–0.8 nm)
            </div>
          </div>

          {/* 4. Densidad de Plasma */}
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-emerald-400/40 transition-all">
            <div className="text-xs text-white/50 mb-1 flex items-center justify-between font-mono">
              <span>PROTON DENSITY</span>
              <span>⚛️</span>
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
              {solarWind.density_p_cm3 ? `${solarWind.density_p_cm3.toFixed(1)}` : '5.2'} <span className="text-xs text-white/40 font-normal">p/cm³</span>
            </div>
            <div className="mt-2 text-[11px] text-white/50">
              Presión Dinámica: <strong className="text-orange-300 font-mono">{ramPressure_nPa} nPa</strong>
            </div>
          </div>
        </div>

        {/* ─── Visor Solar 3D Interactivo en 360 Grados ──────────────────── */}
        <div className="my-8">
          <SolarGlobe3D />
        </div>

        {/* ─── Matriz Heliofísica Cuántica Hacker-Polímata ─────────────────── */}
        <div className="my-8">
          <HackerPolymathMatrix
            telemetry={{
              speed_km_s: solarWind.speed_km_s || 438,
              bz_nT: solarWind.bz_nT || -1.8,
              bt_nT: solarWind.bt_nT || 4.9,
              density_p_cm3: solarWind.density_p_cm3 || 5.2,
              temperature_K: solarWind.temperature_K || 89000,
            }}
          />
        </div>

        {/* ─── Visor SDO y Radar Magnetosférico ───────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SolarViewer compact={false} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10">
              <KpGauge kp={kp} severity={summary?.kp_index.severity || 'Normal'} color={summary?.kp_index.color || '#22c55e'} />
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white">Escudo y Magnetopausa Terrestre</h3>
                <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-white/60">LIVE MODEL</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                La magnetopausa terrestre se encuentra a <strong className="text-white font-mono">{magnetopause_Re} Radios Terrestres (Re)</strong>, resistiendo la compresión del viento solar.
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-3 bg-black/50 border border-white/5 rounded-xl">
                  <span className="text-white/50">Presión Dinámica (P_ram):</span>
                  <span className="text-orange-300 font-bold">{ramPressure_nPa} nPa</span>
                </div>
                <div className="flex justify-between p-3 bg-black/50 border border-white/5 rounded-xl">
                  <span className="text-white/50">Temperatura Plasma (Tp):</span>
                  <span className="text-white font-bold">{solarWind.temperature_K?.toLocaleString() || '89,000'} K</span>
                </div>
                <div className="flex justify-between p-3 bg-black/50 border border-white/5 rounded-xl">
                  <span className="text-white/50">Campo Total (Bt):</span>
                  <span className="text-white font-bold">{solarWind.bt_nT || 4.9} nT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Alertas y Eventos Solares Recientes ─────────────────────────── */}
        <div className="my-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🚨</span> {isEn ? 'Recent Flares & Space Weather Bulletins' : 'Llamaradas y Boletines Recientes'}
            </h2>
            <Link href="/storms" className="text-xs text-orange-400 hover:underline font-mono font-bold">
              {isEn ? 'Storm Tracker →' : 'Rastreador de Tormentas →'}
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(summary?.flares_recientes ?? []).map((flare, i) => (
              <StormAlert
                key={i}
                type="LLAMARADA"
                intensity={flare.class_type}
                time={flare.begin_time}
                location={flare.source_location}
              />
            ))}
          </div>
        </div>

        {/* ─── Banner Oficial de Pico Máximo Ciclo 25 ────────────────────── */}
        <SolarPeakAlert />

        {/* ─── Muro de Agradecimientos a Contribuyentes y Donantes en Vivo ─── */}
        <PatronWall />

        <ViralShareBar />

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
            <Link href="/dashboard" className="text-orange-400 font-bold">Dashboard</Link>
            <Link href="/storms" className="hover:text-orange-400 transition-colors">Tormentas</Link>
            <Link href="/reels" className="hover:text-orange-400 transition-colors">Reels</Link>
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
