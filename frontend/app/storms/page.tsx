'use client'


import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../../components/Navbar'
import SolarPeakAlert from '../../components/SolarPeakAlert'
import SolarStormSimulator from '../../components/SolarStormSimulator'
import PatronWall from '../../components/PatronWall'
import StormAlert from '../../components/StormAlert'
import DeclassifiedDossier from '../../components/DeclassifiedDossier'
import HackerPolymathMatrix from '../../components/HackerPolymathMatrix'
import ViralShareBar from '../../components/ViralShareBar'
import AdBanner from '../../components/AdBanner'
import { useI18n } from '../../lib/i18n'

export default function StormsPage() {
  const { t, lang } = useI18n()
  const isEn = lang === 'en'
  const isPt = lang === 'pt'

  const [cmes, setCmes] = useState<any[]>([])
  const [flares, setFlares] = useState<any[]>([])
  const [geomag, setGeomag] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'cme' | 'flare' | 'geomag'>('all')

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

  const totalEvents = cmes.length + flares.length + geomag.length

  return (
    <div className="min-h-screen bg-black text-white pb-24 overflow-x-hidden selection:bg-orange-500/30 selection:text-white">

      {/* ─── Navbar Unificado con Glassmorphism ──────────────────────────── */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-32">
        {/* Encabezado Principal */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-mono font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>NASA DONKI & NOAA SWPC GLOBAL REPOSITORY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            {isEn ? 'Space Weather Storm & CME Tracker' : 'Registro de Tormentas Solares y CME'}
          </h1>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            {isEn
              ? 'Real-time telemetry and forensic tracking of coronal mass ejections, M/X class flares, and geomagnetic storms impacting Earth. Supervised by'
              : 'Telemetría en tiempo real y registro forense de eyecciones de masa coronal, llamaradas clase M/X y tormentas geomagnéticas que impactan la Tierra. Dirigido por'}{' '}
            <strong className="text-orange-400 font-bold">JESÚS BARRIOS</strong>.
          </p>
        </div>

        {/* AdSense Superior */}
        <AdBanner format="horizontal" />

        {/* ─── Escalas Oficiales NOAA (R - S - G) ─────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-4 my-8">
          <div className="p-5 rounded-3xl bg-white/[0.02] border border-orange-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-orange-400">ESCALA G (G1 – G5)</span>
              <span className="text-lg">🌍</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-1">Tormentas Geomagnéticas</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Corrientes inducidas en redes eléctricas, auroras boreales en latitudes bajas y desorientación de satélites en órbita LEO.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white/[0.02] border border-red-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-red-400">ESCALA S (S1 – S5)</span>
              <span className="text-lg">⚛️</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-1">Radiación Solar (Protones)</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Protones de alta energía emitidos por CMEs rápidas. Riesgo de dosis de radiación en astronautas y tripulaciones de vuelos polares.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white/[0.02] border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-400">ESCALA R (R1 – R5)</span>
              <span className="text-lg">📡</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-1">Bloqueos de Radio HF</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Ionización excesiva de la capa D por rayos X de llamaradas solares, causando apagones inmediatos de radio HF en el hemisferio diurno.
            </p>
          </div>
        </div>

        {/* ─── Filtros Rápidos de Eventos ─────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: isEn ? `All Events (${totalEvents})` : `Todos los Eventos (${totalEvents})` },
              { id: 'flare', label: isEn ? `Flares (${flares.length})` : `Llamaradas (${flares.length})` },
              { id: 'cme', label: isEn ? `CMEs (${cmes.length})` : `Eyecciones CME (${cmes.length})` },
              { id: 'geomag', label: isEn ? `Geomagnetic (${geomag.length})` : `Tormentas Geomag (${geomag.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  filterType === tab.id
                    ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-white/40 font-mono pr-2">
            {isEn ? 'Window: Last 14 Days' : 'Ventana: Últimos 14 Días'}
          </div>
        </div>

        {/* ─── Lista de Eventos con Animación ─────────────────────────────── */}
        {loading ? (
          <div className="py-24 text-center text-white/40 font-mono">
            <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mx-auto mb-3" />
            <span>Consultando base de datos forense de NASA y NOAA...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Llamaradas */}
            {(filterType === 'all' || filterType === 'flare') && flares.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>⚡</span> {isEn ? 'Solar Flares (GOES X-ray Detectors)' : 'Llamaradas Solares (Detectores GOES)'}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {flares.map((f, i) => (
                    <StormAlert
                      key={i}
                      type="LLAMARADA"
                      intensity={f.class_type}
                      time={f.begin_time}
                      location={f.source_location}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CMEs */}
            {(filterType === 'all' || filterType === 'cme') && cmes.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>💥</span> {isEn ? 'Coronal Mass Ejections (SOHO LASCO Radar)' : 'Eyecciones de Masa Coronal (Radar SOHO LASCO)'}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cmes.map((c, i) => (
                    <StormAlert
                      key={i}
                      type="CME"
                      intensity={c.speed_km_s ? `${c.speed_km_s.toFixed(0)} km/s` : '540 km/s'}
                      time={c.start_time}
                      location={c.source_location || 'Corona Solar'}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tormentas Geomagnéticas */}
            {(filterType === 'all' || filterType === 'geomag') && geomag.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>🧲</span> {isEn ? 'Geomagnetic Storm Intervals (Planetary Kp Index)' : 'Tormentas Geomagnéticas Registradas'}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {geomag.map((g, i) => (
                    <StormAlert
                      key={i}
                      type="GEOMAGNETICA"
                      intensity={`Kp ${g.kp || 5} (${g.scale || 'G1'})`}
                      time={g.start_time}
                      location="Magnetósfera Terrestre"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Matriz de Física Cuántica y Magnetohidrodinámica ──────────── */}
        <div className="my-8">
          <HackerPolymathMatrix />
        </div>

        {/* ─── Dossier Desclasificado Oficial ─────────────────────────────── */}
        <DeclassifiedDossier />

        {/* ─── Banner Oficial de Pico Máximo Ciclo 25 ────────────────────── */}
        <SolarPeakAlert />

        {/* ─── Simulador Interactivo de Impacto en tu Ciudad ──────────────── */}
        <SolarStormSimulator />

        {/* ─── Muro de Agradecimientos a Contribuyentes y Donantes en Vivo ─── */}
        <PatronWall />

        <div className="my-8">
          <ViralShareBar />
        </div>

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
            <Link href="/dashboard" className="hover:text-orange-400 transition-colors">Dashboard</Link>
            <Link href="/storms" className="text-orange-400 font-bold">Tormentas</Link>
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
