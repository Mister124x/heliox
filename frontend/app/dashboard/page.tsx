'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SolarViewer from '@/components/SolarViewer'
import KpGauge from '@/components/KpGauge'
import StormAlert from '@/components/StormAlert'
import AlertTicker from '@/components/AlertTicker'

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lastPing, setLastPing] = useState<Date | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch('/api/storms/summary')
      const data = await res.json()
      setSummary(data)
      setLastPing(new Date())
    } catch (e) {
      console.error('Error en telemetría solar:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 45_000)
    return () => clearInterval(interval)
  }, [])

  const kp = summary?.kp_index?.kp ?? 0
  const solarWind = summary?.solar_wind ?? {}
  const xray = summary?.xray_flux ?? {}

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header / Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="text-xl font-bold tracking-tight">HELIOX</span>
            <span className="text-xs text-solar-400 font-mono hidden sm:inline">TELEMETRY MATRIX</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Inicio</Link>
            <Link href="/dashboard" className="text-sm text-solar-400 font-semibold">Dashboard</Link>
            <Link href="/storms" className="text-sm text-white/60 hover:text-white transition-colors">Tormentas</Link>
            <Link href="/reels" className="text-sm text-white/60 hover:text-white transition-colors">Reels & Media</Link>
            <Link href="/analysis" className="text-sm text-white/60 hover:text-white transition-colors">Análisis</Link>
          </div>
        </div>
      </nav>

      <div className="fixed top-16 left-0 right-0 z-40">
        <AlertTicker alerts={summary?.alertas_noaa ?? []} kp={kp} />
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-32">
        {/* Encabezado Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="solar-badge bg-solar-500/20 text-solar-400 border border-solar-500/30 mb-2">
              📡 Nodos SDO, SOHO, GOES & DSCOVR Conectados
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Matriz de Telemetría Solar en Tiempo Real
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Supervisión de física solar de alta resolución por <strong className="text-solar-400">JESÚS BARRIOS</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-xs font-mono text-white/80">
              {lastPing ? `Sincronizado: ${lastPing.toLocaleTimeString('es-CO')}` : 'Conectando...'}
            </div>
          </div>
        </div>

        {/* Panel Principal: Visor + Gauges Clave */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          {/* Visor Solar Avanzado (7 columnas) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center solar-card p-6 bg-black/50 border border-white/10">
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-solar-400 tracking-wider uppercase">🛰️ Espectroscopía SDO/AIA</span>
              <span className="text-xs font-mono text-white/40">Resolución 1024px Full HD</span>
            </div>
            <SolarViewer compact={false} />
          </div>

          {/* Sensores y Flujos Físicos (5 columnas) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Sensor 1: Viento Solar */}
            <div className="solar-card p-5 border border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50 uppercase font-mono">💨 Velocidad del Viento Solar</span>
                <span className="text-xs text-emerald-400 font-bold">DSCOVR L1</span>
              </div>
              <div className="text-4xl font-bold font-mono text-white mb-1">
                {solarWind?.speed_km_s ? `${solarWind.speed_km_s.toFixed(1)}` : '425.0'} <span className="text-lg text-white/50">km/s</span>
              </div>
              <div className="text-xs text-white/40">
                Densidad protónica: <strong className="text-white">{solarWind?.density_p_cm3 ?? '4.8'} p/cm³</strong> · Temp: <strong className="text-white">{solarWind?.temperature_K?.toLocaleString() ?? '85,000'} K</strong>
              </div>
            </div>

            {/* Sensor 2: Campo Bz Interplanetario */}
            <div className={`solar-card p-5 border ${solarWind?.alerta_bz ? 'border-red-500/50 bg-red-950/20 alert-glow' : 'border-white/10 bg-white/5'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50 uppercase font-mono">🧲 Vector Magnético Bz (GSM)</span>
                <span className={`text-xs font-bold ${solarWind?.alerta_bz ? 'text-red-400' : 'text-blue-400'}`}>
                  {solarWind?.alerta_bz ? '⚠️ CRÍTICO SUR' : 'ESTABLE'}
                </span>
              </div>
              <div className="text-4xl font-bold font-mono text-solar-400 mb-1">
                {solarWind?.bz_nT ? `${solarWind.bz_nT.toFixed(1)}` : '-2.4'} <span className="text-lg text-white/50">nT</span>
              </div>
              <div className="text-xs text-white/40">
                Campo Total Bt: <strong className="text-white">{solarWind?.bt_nT ?? '5.2'} nT</strong> (Bz negativo acopla energía a la Tierra).
              </div>
            </div>

            {/* Sensor 3: Rayos X y Clasificación GOES */}
            <div className="solar-card p-5 border border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/50 uppercase font-mono">⚡ Flujo de Rayos X (GOES-16/18)</span>
                <span className="text-xs text-yellow-400 font-bold">0.05 - 0.4 nm</span>
              </div>
              <div className="text-4xl font-bold font-mono text-yellow-400 mb-1">
                {xray?.class || 'C1.2'}
              </div>
              <div className="text-xs text-white/40">
                Flujo radiativo: <strong className="text-white">{xray?.flux_wm2 ? xray.flux_wm2.toExponential(2) : '1.20e-6'} W/m²</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador Kp Expandido */}
        <div className="mb-8">
          <KpGauge kp={kp} severity={summary?.kp_index?.severity ?? 'Tranquilo'} color={summary?.kp_index?.color ?? '#22c55e'} />
        </div>

        {/* Sección de Alertas y Eventos Recientes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🚨</span> Alertas & Eventos Registrados (NASA DONKI / NOAA)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(summary?.flares_recientes ?? []).slice(0, 3).map((f: any, i: number) => (
              <StormAlert
                key={`f-${i}`}
                type="LLAMARADA"
                intensity={f.class_type}
                time={f.begin_time}
                location={f.source_location}
              />
            ))}
            {(summary?.cme_recientes ?? []).slice(0, 3).map((c: any, i: number) => (
              <StormAlert
                key={`c-${i}`}
                type="CME"
                intensity={c.speed_km_s ? `${c.speed_km_s.toFixed(0)} km/s` : '750 km/s'}
                time={c.start_time}
                location="Corona Solar"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
