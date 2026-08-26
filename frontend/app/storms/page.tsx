'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import StormAlert from '../../components/StormAlert'
import AdBanner from '../../components/AdBanner'
import { useI18n, LanguageSelector } from '../../lib/i18n'

export default function StormsPage() {
  const { t } = useI18n()
  const [cmes, setCmes] = useState<any[]>([])
  const [flares, setFlares] = useState<any[]>([])
  const [geomag, setGeomag] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    <div className="min-h-screen bg-black text-white pb-24 overflow-x-hidden">
      {/* Navbar con Logo y selector de idioma */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-solar-500/40 p-0.5 bg-solar-950/50">
              <img src="/favicon.svg" alt="HELIOX" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-solar-400 to-white bg-clip-text text-transparent">
              HELIOX
            </span>
            <span className="text-xs text-orange-400 font-mono hidden sm:inline bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
              STORM TRACKER
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Inicio</Link>
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_dashboard}</Link>
            <Link href="/storms" className="text-sm text-solar-400 font-semibold">{t.nav_storms}</Link>
            <Link href="/reels" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_reels}</Link>
            <Link href="/analysis" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_analysis}</Link>
            <LanguageSelector />
          </div>

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

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-white/10 px-4 py-4 space-y-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">Inicio</Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_dashboard}</Link>
            <Link href="/storms" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-solar-400 font-bold py-1">{t.nav_storms}</Link>
            <Link href="/reels" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_reels}</Link>
            <Link href="/analysis" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_analysis} (+15 Pág)</Link>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-28">
        {/* Banner Superior */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="solar-badge bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-3 text-xs">
            ⚡ Base de Datos Global de Tormentas Solares (NASA DONKI / NOAA)
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Registro Oficial de Eventos Geomagnéticos y CME
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Monitoreo forense de eyecciones de masa coronal, llamaradas de clase M/X y tormentas geomagnéticas que impactan la magnetósfera terrestre. Investigado por <strong className="text-solar-400">JESÚS BARRIOS</strong>.
          </p>
        </div>

        {/* Banner AdSense Superior */}
        <AdBanner format="horizontal" />

        {loading ? (
          <div className="py-20 text-center text-white/40 font-mono">
            <span className="inline-block animate-spin mr-2">🔄</span> Consultando nodos de la NASA y NOAA...
          </div>
        ) : (
          <div className="space-y-12">
            {/* Llamaradas Solares */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔥</span> Llamaradas Solares Recientes (Últimos 14 Días)
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {flares.length > 0 ? (
                  flares.map((f, i) => (
                    <StormAlert
                      key={i}
                      type="LLAMARADA"
                      intensity={f.classType || f.class_type || 'M1.2'}
                      time={f.beginTime || f.begin_time}
                      location={f.sourceLocation || 'Región Activa Solar'}
                    />
                  ))
                ) : (
                  <div className="col-span-full p-6 text-center text-white/40 bg-white/5 rounded-2xl border border-white/5">
                    No se registraron llamaradas clase X en las últimas horas (Actividad Solar Nominal).
                  </div>
                )}
              </div>
            </section>

            {/* Eyecciones de Masa Coronal */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>💨</span> Eyecciones de Masa Coronal (CME)
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cmes.length > 0 ? (
                  cmes.map((c, i) => (
                    <StormAlert
                      key={i}
                      type="CME"
                      intensity={c.speed ? `${c.speed} km/s` : '540 km/s'}
                      time={c.startTime || c.start_time}
                      location="Corona Solar Exterior"
                    />
                  ))
                ) : (
                  <div className="col-span-full p-6 text-center text-white/40 bg-white/5 rounded-2xl border border-white/5">
                    Viento solar interplanetario fluyendo a velocidad base (Sin impactos CME directos detectados).
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* Banner AdSense Inferior */}
        <AdBanner format="auto" />
      </main>
    </div>
  )
}
