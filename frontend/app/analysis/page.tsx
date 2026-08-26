'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import DonationWidget from '../../components/DonationWidget'
import AdBanner from '../../components/AdBanner'
import { useI18n, LanguageSelector } from '../../lib/i18n'

export default function AnalysisPage() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<'fundacional' | 'ciclo25' | 'carrington' | 'nasa_letter' | 'geopolitica'>('fundacional')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <span className="text-xs text-solar-400 font-mono hidden sm:inline bg-solar-500/10 px-2 py-0.5 rounded border border-solar-500/20">
              RESEARCH HUB
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Inicio</Link>
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_dashboard}</Link>
            <Link href="/storms" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_storms}</Link>
            <Link href="/reels" className="text-sm text-white/60 hover:text-white transition-colors">{t.nav_reels}</Link>
            <Link href="/analysis" className="text-sm text-solar-400 font-semibold">{t.nav_analysis}</Link>
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
            <Link href="/storms" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_storms}</Link>
            <Link href="/reels" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_reels}</Link>
            <Link href="/analysis" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-solar-400 font-bold py-1">{t.nav_analysis} (+15 Pág)</Link>
          </div>
        )}
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-28">
        {/* Cabecera del Documento Maestro */}
        <div className="border-b border-white/10 pb-8 mb-8 text-center">
          <div className="solar-badge bg-solar-500/20 text-solar-400 border border-solar-500/30 mb-3 text-xs">
            📄 Documento Científico Maestro — Versión 1.0 Fundacional (+15 Páginas)
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            El Sol Como Fuerza Geopolítica, Económica y Civilizatoria
          </h1>
          <p className="text-sm sm:text-base text-solar-400 font-semibold mb-2">
            Una Perspectiva Diferente: Lo que la Astronomía Oficial No te Dice en Español
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/50">
            <span>Investigador Principal: <strong className="text-white">JESÚS BARRIOS</strong></span>
            <span>•</span>
            <span>Plataforma: <strong className="text-white">HELIOX Solar Observatory</strong></span>
            <span>•</span>
            <span>Fuentes: <strong className="text-white">NASA DONKI · NOAA SWPC · ESA SDO</strong></span>
          </div>
        </div>

        {/* AdSense Banner Superior */}
        <AdBanner format="horizontal" />

        {/* Selector de Capítulos */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-white/5 rounded-2xl border border-white/10">
          {[
            { id: 'fundacional', label: '1. Manifiesto & Misión', icon: '☀️' },
            { id: 'ciclo25', label: '2. Ciclo Solar 25 (2024-2026)', icon: '📈' },
            { id: 'carrington', label: '3. El Riesgo Carrington ($2.6T)', icon: '⚡' },
            { id: 'geopolitica', label: '4. Perspectiva Geopolítica', icon: '🌐' },
            { id: 'nasa_letter', label: '5. Carta Oficial Abierta a NASA', icon: '✉️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-solar-500 text-black shadow-lg shadow-solar-500/20 font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contenido Dinámico del Capítulo */}
        <div className="bg-black/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl text-white/80 leading-relaxed space-y-6 text-sm sm:text-base">
          {activeTab === 'fundacional' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>☀️</span> 1. Manifiesto y Misión: Democratizando el Clima Espacial
              </h2>
              <p>
                Durante décadas, la información heliofísica de alta precisión ha permanecido confinada a instituciones anglosajonas (NASA, NOAA, ESA) con interfaces complejas y en idioma inglés. <strong>HELIOX</strong> nace con la misión inquebrantable de democratizar la telemetría solar para Latinoamérica y el mundo hispanohablante.
              </p>
              <p>
                El Sol no es simplemente una estrella distante: es el motor termonuclear que condiciona toda la infraestructura satelital, las redes eléctricas de alta tensión, las telecomunicaciones cuánticas y la navegación GPS global.
              </p>
              <div className="p-4 bg-solar-500/10 border-l-4 border-solar-500 rounded-r-xl">
                <p className="font-semibold text-solar-300">
                  &quot;Comprender el Sol no es un lujo académico; es una medida de supervivencia para una civilización 100% electrodependiente.&quot;
                </p>
                <div className="text-xs text-white/50 mt-1">— JESÚS BARRIOS, Fundador de HELIOX</div>
              </div>
            </div>
          )}

          {activeTab === 'ciclo25' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>📈</span> 2. Máximo del Ciclo Solar 25 (2024 - 2026)
              </h2>
              <p>
                El Ciclo Solar 25 ha superado sistemáticamente todas las proyecciones iniciales del panel conjunto NASA/NOAA. La tasa de manchas solares (SSN) y la frecuencia de llamaradas de clase X demuestran que nos encontramos ante uno de los ciclos solares más intensos de los últimos 20 años.
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li><strong className="text-white">Mayo 2024:</strong> La tormenta geomagnética extrema G5 (AR3664) produjo auroras visibles en latitudes tropicales.</li>
                <li><strong className="text-white">Proyección 2025-2026:</strong> Ventana crítica de eyecciones de masa coronal rápidas (&gt;2,000 km/s) dirigidas a la Tierra.</li>
                <li><strong className="text-white">Impacto en Satélites LEO:</strong> Densificación de la atmósfera superior por calentamiento ultravioleta, incrementando el arrastre satelital.</li>
              </ul>
            </div>
          )}

          {activeTab === 'carrington' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>⚡</span> 3. El Riesgo Carrington: Impacto Económico de $2.6 Trillones
              </h2>
              <p>
                En septiembre de 1859, el Evento Carrington indujo corrientes en las líneas de telégrafo que provocaron incendios en estaciones de todo el mundo. Hoy en día, una tormenta de magnitud similar impactaría transformadores de alta tensión a escala continental.
              </p>
              <p>
                Estudios de la Academia Nacional de Ciencias de EE.UU. estiman que el restablecimiento de la infraestructura eléctrica global podría requerir de <strong>4 a 10 años</strong>, con pérdidas acumuladas superiores a los <strong>$2.6 billones de dólares</strong>.
              </p>
            </div>
          )}

          {activeTab === 'geopolitica' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>🌐</span> 4. Perspectiva Geopolítica de la Climatología Espacial
              </h2>
              <p>
                La soberanía espacial de las naciones emergentes depende de su capacidad para predecir anomalías causadas por el viento solar en sus constelaciones de satélites de observación terrestre y comunicaciones.
              </p>
              <p>
                HELIOX provee una capa soberana e independiente de procesamiento en tiempo real, permitiendo a investigadores, operadores de redes y ciudadanos estar alerta ante perturbaciones ionosféricas severas.
              </p>
            </div>
          )}

          {activeTab === 'nasa_letter' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>✉️</span> 5. Carta Oficial Abierta a la NASA y Agencias Espaciales
              </h2>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 font-serif text-white/90">
                <p><strong>A la atención de:</strong> Science Mission Directorate, NASA & Heliophysics Division</p>
                <p>
                  Estimados colegas y directores de misiones heliográficas:
                </p>
                <p>
                  Por medio del presente documento y a través de la plataforma <strong>HELIOX Solar Observatory</strong>, extendemos nuestro reconocimiento formal al trabajo de telemetría de las misiones SDO, Parker Solar Probe, SOHO y GOES. A su vez, ratificamos nuestro compromiso de traducir, diseminar y hacer accesible esta telemetría para millones de personas en Latinoamérica.
                </p>
                <p className="font-sans font-bold text-solar-300">
                  Firmado,<br />
                  JESÚS BARRIOS<br />
                  <span className="text-xs font-normal text-white/50">Director & Fundador, HELIOX Solar Observatory</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* AdSense Banner Inferior */}
        <div className="mt-8">
          <AdBanner format="auto" />
        </div>

        {/* Donaciones */}
        <section className="mt-12">
          <DonationWidget />
        </section>
      </main>
    </div>
  )
}
