'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import StormAlert from '../../components/StormAlert'

export default function StormsPage() {
  const [cmes, setCmes] = useState<any[]>([])
  const [flares, setFlares] = useState<any[]>([])
  const [geomag, setGeomag] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStormData() {
      try {
        const [cmeRes, flareRes, geomagRes] = await Promise.all([
          fetch('/api/storms/cme?days=14'),
          fetch('/api/storms/flares?days=14'),
          fetch('/api/storms/geomagnetic?days=14'),
        ])
        const [cmeData, flareData, geomagData] = await Promise.all([
          cmeRes.json(),
          flareRes.json(),
          geomagRes.json(),
        ])
        setCmes(cmeData.cmes || [])
        setFlares(flareData.flares || [])
        setGeomag(geomagData.storms || [])
      } catch (e) {
        console.error('Error cargando base de tormentas:', e)
      } finally {
        setLoading(false)
      }
    }
    loadStormData()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="text-xl font-bold tracking-tight">HELIOX</span>
            <span className="text-xs text-orange-400 font-mono hidden sm:inline">STORM TRACKER</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Inicio</Link>
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/storms" className="text-sm text-solar-400 font-semibold">Tormentas</Link>
            <Link href="/reels" className="text-sm text-white/60 hover:text-white transition-colors">Reels & Media</Link>
            <Link href="/analysis" className="text-sm text-white/60 hover:text-white transition-colors">Análisis</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-28">
        {/* Banner Superior */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="solar-badge bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-3">
            ⚡ Base de Datos Global de Tormentas Solares (NASA DONKI / NOAA)
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
            Registro Oficial de Eventos Geomagnéticos y CME
          </h1>
          <p className="text-sm text-white/60">
            Monitoreo forense de eyecciones de masa coronal, llamaradas de clase M/X y tormentas geomagnéticas que impactan la magnetósfera terrestre. Investigado por <strong className="text-solar-400">JESÚS BARRIOS</strong>.
          </p>
        </div>

        {/* Tablas de Eventos */}
        <div className="space-y-12">
          {/* 1. Eyecciones de Masa Coronal (CME) */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span>💥</span> Eyecciones de Masa Coronal Recientes (CME)
              </h2>
              <span className="text-xs font-mono text-white/40">Últimos 14 días</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cmes.length > 0 ? (
                cmes.slice(0, 6).map((cme, i) => (
                  <StormAlert
                    key={`cme-${i}`}
                    type="CME"
                    intensity={cme.speed_km_s ? `${cme.speed_km_s.toFixed(0)} km/s` : 'Analizada'}
                    time={cme.start_time}
                    location={cme.source_location || 'Región Activa Corona'}
                  />
                ))
              ) : (
                <div className="col-span-full p-8 text-center bg-white/5 rounded-2xl border border-white/10 text-white/50">
                  {loading ? 'Consultando satélites SDO y SOHO...' : 'No hay eyecciones severas en este periodo.'}
                </div>
              )}
            </div>
          </section>

          {/* 2. Llamaradas Solares Clase M y X */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span>⚡</span> Llamaradas Solares (Solar Flares)
              </h2>
              <span className="text-xs font-mono text-white/40">Detectadas por GOES & SDO</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flares.length > 0 ? (
                flares.slice(0, 6).map((flare, i) => (
                  <StormAlert
                    key={`flr-${i}`}
                    type="LLAMARADA"
                    intensity={flare.class_type || 'M1.0'}
                    time={flare.begin_time}
                    location={flare.source_location || 'Disco Solar'}
                  />
                ))
              ) : (
                <div className="col-span-full p-8 text-center bg-white/5 rounded-2xl border border-white/10 text-white/50">
                  {loading ? 'Consultando flujo de rayos X...' : 'Actividad de llamaradas en nivel basal B/C.'}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
