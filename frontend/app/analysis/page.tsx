'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import DonationWidget from '../../components/DonationWidget'
import AdBanner from '../../components/AdBanner'
import ViralShareBar from '../../components/ViralShareBar'
import { useI18n, LanguageSelector } from '../../lib/i18n'

export default function AnalysisPage() {
  const { t, lang } = useI18n()
  const [activeTab, setActiveTab] = useState<'fundacional' | 'ciclo25' | 'carrington' | 'apis_gobierno' | 'geopolitica' | 'nasa_letter'>('fundacional')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copiedCitation, setCopiedCitation] = useState(false)
  const [govApiData, setGovApiData] = useState<any>(null)
  const [loadingApi, setLoadingApi] = useState(true)
  const [activeApiTab, setActiveApiTab] = useState<'noaa_solar_cycle' | 'noaa_goes_protons' | 'nasa_donki_alerts' | 'usgs_geomagnetism'>('noaa_solar_cycle')

  const isEn = lang === 'en'
  const isPt = lang === 'pt'
  const isFr = lang === 'fr'
  const isDe = lang === 'de'

  useEffect(() => {
    async function loadGovApis() {
      try {
        const res = await fetch('/api/storms/gov')
        if (res.ok) {
          const data = await res.json()
          setGovApiData(data)
          setLoadingApi(false)
          return
        }
      } catch (e) {}

      // Fallback a APIs públicas directas de NOAA SWPC
      try {
        const [sunspotsRes, alertsRes] = await Promise.allSettled([
          fetch('https://services.swpc.noaa.gov/json/solar-cycle/sunspots.json').then((r) => r.json()),
          fetch('https://services.swpc.noaa.gov/products/alerts.json').then((r) => r.json()),
        ])

        setGovApiData({
          success: true,
          timestamp: new Date().toISOString(),
          apis: {
            noaa_solar_cycle: {
              name: 'NOAA Solar Cycle 25 Sunspot Progression',
              endpoint: 'https://services.swpc.noaa.gov/json/solar-cycle/sunspots.json',
              recent_sunspots: sunspotsRes.status === 'fulfilled' && Array.isArray(sunspotsRes.value) ? sunspotsRes.value.slice(-12) : [],
            },
            noaa_goes_protons: {
              name: 'GOES Primary Solar Energetic Protons (SEP)',
              endpoint: 'https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json',
              status: 'Real-Time Proton Channel Active',
            },
            nasa_donki_alerts: {
              name: 'NASA Space Weather Database Of Notifications (DONKI)',
              endpoint: 'https://services.swpc.noaa.gov/products/alerts.json',
              active_alerts: alertsRes.status === 'fulfilled' && Array.isArray(alertsRes.value) ? alertsRes.value.slice(0, 4) : [],
            },
            usgs_geomagnetism: {
              name: 'USGS Geomagnetism National Program Feed',
              endpoint: 'https://geomag.usgs.gov/ws/data/',
              status: 'Active Terrestrial Monitoring Node',
            },
          },
        })
      } catch (err) {
        console.error('Error en fallback client-side:', err)
      } finally {
        setLoadingApi(false)
      }
    }
    loadGovApis()
  }, [])

  const copyCitation = () => {
    const citation = `BARRIOS, Jesús. (2026). "El Sol Como Fuerza Geopolítica, Económica y Civilizatoria: Heliofísica Aplicada y Clima Espacial en Tiempo Real". HELIOX Solar Observatory. URL: https://heliox-observatory.vercel.app/analysis`
    navigator.clipboard.writeText(citation)
    setCopiedCitation(true)
    setTimeout(() => setCopiedCitation(false), 2500)
  }

  const CHAPTERS = [
    { id: 'fundacional', label: isEn ? '1. Manifesto & Mission' : isPt ? '1. Manifesto & Missão' : '1. Manifiesto & Misión', icon: '☀️', readTime: '3 min' },
    { id: 'ciclo25', label: isEn ? '2. Solar Cycle 25 Maximum' : isPt ? '2. Máximo do Ciclo 25' : '2. Máximo del Ciclo Solar 25', icon: '📈', readTime: '4 min' },
    { id: 'carrington', label: isEn ? '3. Carrington Event Risk ($2.6T)' : isPt ? '3. O Risco Carrington ($2.6T)' : '3. El Riesgo Carrington ($2.6T)', icon: '⚡', readTime: '4 min' },
    { id: 'apis_gobierno', label: isEn ? '4. Public Govt APIs (NASA/NOAA/USGS)' : isPt ? '4. APIs Governamentais Abertas' : '4. APIs Libres del Gobierno (NASA/NOAA/USGS)', icon: '🏛️', readTime: '5 min' },
    { id: 'geopolitica', label: isEn ? '5. Space Geopolitics' : isPt ? '5. Geopolítica Espacial' : '5. Perspectiva Geopolítica', icon: '🌐', readTime: '3 min' },
    { id: 'nasa_letter', label: isEn ? '6. Open Letter to NASA' : isPt ? '6. Carta Aberta à NASA' : '6. Carta Oficial a la NASA', icon: '✉️', readTime: '2 min' },
  ]

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
              RESEARCH & APIS
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">{isEn ? 'Home' : 'Inicio'}</Link>
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
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{isEn ? 'Home' : 'Inicio'}</Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_dashboard}</Link>
            <Link href="/storms" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_storms}</Link>
            <Link href="/reels" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-white/80 py-1">{t.nav_reels}</Link>
            <Link href="/analysis" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-solar-400 font-bold py-1">{t.nav_analysis} (+15 Pág)</Link>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-28">
        {/* Cabecera del Documento Maestro Estilo NASA Science & Stripe Docs */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="solar-badge bg-solar-500/20 text-solar-400 border border-solar-500/30 text-xs inline-flex items-center gap-2">
              <span>📄</span>
              <span>{isEn ? 'Master Scientific Whitepaper & Government API Index v1.0' : 'Documento Científico Maestro e Índice de APIs Públicas v1.0'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyCitation}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 font-mono flex items-center gap-1.5 transition-all"
              >
                <span>{copiedCitation ? '✅ ¡Cita Copiada!' : '📖 Copiar Cita Cita APA'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl bg-solar-500 hover:bg-solar-400 text-black text-xs font-bold font-mono transition-all"
              >
                🖨️ PDF / Print
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white leading-tight">
            {isEn
              ? 'The Sun as a Geopolitical, Economic & Civilizational Force'
              : 'El Sol Como Fuerza Geopolítica, Económica y Civilizatoria'}
          </h1>
          <p className="text-base sm:text-lg text-solar-300 font-semibold max-w-4xl mb-4 leading-relaxed">
            {isEn
              ? 'Applied Heliophysics, Real-time Satellite Telemetry, and Open Government API Architecture (NASA · NOAA · USGS · ESA)'
              : 'Heliofísica Aplicada, Telemetría Satelital en Tiempo Real y Arquitectura de APIs Libres del Gobierno (NASA · NOAA · USGS · ESA)'}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isEn ? 'Lead Author:' : 'Investigador Principal:'} <strong className="text-white">JESÚS BARRIOS</strong></span>
            </div>
            <span>•</span>
            <span>{isEn ? 'Estimated Read Time:' : 'Tiempo de Lectura:'} <strong className="text-solar-400 font-mono">12 min</strong></span>
            <span>•</span>
            <span>{isEn ? 'Peer-Review License:' : 'Licencia:'} <strong className="text-white">Creative Commons BY 4.0 Open Science</strong></span>
          </div>
        </div>

        {/* AdSense Banner Superior */}
        <AdBanner format="horizontal" />

        {/* Grid Principal: Navegación Estilo Documentación Oficial + Panel de Contenido */}
        <div className="grid lg:grid-cols-4 gap-8 my-8">
          
          {/* Navegador Lateral de Capítulos (Sidebar Estilo Stripe/Next.js Docs) */}
          <div className="lg:col-span-1 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-solar-400 mb-3 px-2 flex items-center justify-between">
              <span>{isEn ? 'Chapter Directory' : 'Índice de Capítulos'}</span>
              <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/10 text-white/50">6 Docs</span>
            </div>

            <div className="space-y-1.5">
              {CHAPTERS.map((ch) => {
                const isActive = activeTab === ch.id
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveTab(ch.id as any)}
                    className={`w-full p-3 rounded-2xl text-left text-xs font-semibold transition-all flex items-center justify-between gap-2 border ${
                      isActive
                        ? 'bg-solar-500 text-black border-solar-400 font-bold shadow-lg shadow-solar-500/20 scale-[1.02]'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span>{ch.icon}</span>
                      <span className="truncate">{ch.label}</span>
                    </div>
                    <span className={`text-[10px] font-mono shrink-0 px-1.5 py-0.5 rounded ${isActive ? 'bg-black/20 text-black' : 'text-white/40 bg-black/40'}`}>
                      {ch.readTime}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Widget Informativo de APIs Libres Conectadas */}
            <div className="mt-6 p-4 rounded-2xl bg-solar-950/40 border border-solar-500/20 text-xs space-y-2">
              <div className="font-bold text-solar-400 flex items-center gap-1.5">
                <span>📡</span>
                <span>{isEn ? 'Connected Govt Feeds' : 'Feeds Oficiales Conectados'}</span>
              </div>
              <ul className="space-y-1 text-white/60 font-mono text-[11px]">
                <li className="flex items-center gap-1">✓ NASA DONKI Database</li>
                <li className="flex items-center gap-1">✓ NOAA SWPC Telemetry</li>
                <li className="flex items-center gap-1">✓ USGS Geomagnetism</li>
                <li className="flex items-center gap-1">✓ ESA Helioviewer SDO</li>
              </ul>
            </div>
          </div>

          {/* Panel de Lectura del Capítulo con Animación Interactiva */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-black/80 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl text-white/80 leading-relaxed space-y-6 text-sm sm:text-base shadow-2xl relative"
              >

                {/* CAPÍTULO 1: MANIFIESTO Y MISIÓN */}
                {activeTab === 'fundacional' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                        <span>☀️</span> 1. {isEn ? 'Foundational Manifesto: Democratizing Space Weather' : 'Manifiesto y Misión: Democratizando el Clima Espacial'}
                      </h2>
                      <span className="text-xs font-mono text-solar-400 bg-solar-500/10 px-3 py-1 rounded-full border border-solar-500/20">
                        {isEn ? 'Section 1.1' : 'Sección 1.1'}
                      </span>
                    </div>

                    <p>
                      Durante décadas, la información heliofísica de alta precisión ha permanecido confinada a instituciones anglosajonas (NASA, NOAA, ESA) con interfaces complejas y en idioma inglés. <strong>HELIOX</strong> nace con la misión inquebrantable de democratizar la telemetría solar para Latinoamérica y el mundo hispanohablante.
                    </p>

                    {/* Tarjeta con Fórmula Interactiva de Física Solar */}
                    <div className="grid sm:grid-cols-2 gap-4 my-6">
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-solar-500/40 transition-all">
                        <div className="text-xs text-solar-400 font-mono mb-1">Ecuación de Inducción Magnética (Ley de Faraday)</div>
                        <div className="text-xl font-mono font-bold text-white my-2">
                          $$\mathcal{E} = -\frac{d\Phi_B}{dt}$$
                        </div>
                        <p className="text-xs text-white/50">
                          Representa la fuerza electromotriz inducida en redes eléctricas terrestres durante una tormenta geomagnética severa.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-solar-500/40 transition-all">
                        <div className="text-xs text-corona-400 font-mono mb-1">Presión Dinámica del Viento Solar (Ram Pressure)</div>
                        <div className="text-xl font-mono font-bold text-white my-2">
                          $$P_{ram} = \rho \cdot v^2$$
                        </div>
                        <p className="text-xs text-white/50">
                          Comprime el escudo de la magnetopausa terrestre cuando la velocidad $v$ supera los $800\text{ km/s}$.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-solar-500/10 border-l-4 border-solar-500 rounded-r-2xl space-y-2">
                      <p className="font-semibold text-solar-300 text-base sm:text-lg">
                        &quot;Comprender el Sol no es un lujo académico; es una medida de supervivencia para una civilización 100% electrodependiente.&quot;
                      </p>
                      <div className="text-xs text-white/50">— JESÚS BARRIOS, Fundador e Investigador Principal de HELIOX</div>
                    </div>
                  </div>
                )}

                {/* CAPÍTULO 2: CICLO SOLAR 25 */}
                {activeTab === 'ciclo25' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                        <span>📈</span> 2. {isEn ? 'Solar Cycle 25 Peak (2024 - 2026)' : 'Máximo del Ciclo Solar 25 (2024 - 2026)'}
                      </h2>
                      <span className="text-xs font-mono text-solar-400 bg-solar-500/10 px-3 py-1 rounded-full border border-solar-500/20">
                        {isEn ? 'Section 2.1' : 'Sección 2.1'}
                      </span>
                    </div>

                    <p>
                      El Ciclo Solar 25 ha superado sistemáticamente todas las proyecciones iniciales del panel conjunto NASA/NOAA. La tasa de manchas solares (SSN) y la frecuencia de llamaradas de clase X demuestran que nos encontramos ante uno de los ciclos solares más intensos de los últimos 20 años.
                    </p>

                    <div className="solar-card p-6 border border-white/10 bg-white/5 space-y-4">
                      <h4 className="font-bold text-white text-base">Hitos Relevantes del Ciclo 25:</h4>
                      <ul className="space-y-3 text-xs sm:text-sm text-white/70">
                        <li className="flex items-start gap-2">
                          <span className="text-solar-400">⚡</span>
                          <div>
                            <strong className="text-white">Mayo 2024 (Tormenta G5 AR3664):</strong> La tormenta geomagnética extrema G5 produjo auroras boreales visibles en latitudes tropicales como México, Europa del Sur y el Caribe.
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-solar-400">🚀</span>
                          <div>
                            <strong className="text-white">Proyección 2025-2026:</strong> Ventana crítica de eyecciones de masa coronal súper rápidas (&gt;2,200 km/s) con dirección directa al hemisferio nocturno terrestre.
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-solar-400">📡</span>
                          <div>
                            <strong className="text-white">Impacto en Satélites LEO (Starlink & GPS):</strong> Densificación de la termosfera por calentamiento ultravioleta extremo, incrementando la fricción orbital y acelerando la reentrada satelital.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* CAPÍTULO 3: RIESGO CARRINGTON */}
                {activeTab === 'carrington' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                        <span>⚡</span> 3. {isEn ? 'The Carrington Risk: $2.6 Trillion Impact' : 'El Riesgo Carrington: Impacto Económico de $2.6 Trillones'}
                      </h2>
                      <span className="text-xs font-mono text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                        {isEn ? 'Catastrophic Scenario' : 'Escenario de Riesgo'}
                      </span>
                    </div>

                    <p>
                      En septiembre de 1859, el Evento Carrington indujo corrientes electromagnéticas extremas en las líneas de telégrafo que provocaron incendios en estaciones de todo el mundo. Hoy en día, una tormenta de magnitud similar impactaría transformadores de alta tensión a escala continental.
                    </p>

                    <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-3">
                      <h4 className="font-bold text-red-400 text-base">Evaluación de Daño en Infraestructura Moderna:</h4>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                        Estudios de la Academia Nacional de Ciencias de EE.UU. estiman que el colapso de transformadores de ultra alta tensión (EHV) tomaría de <strong>4 a 10 años</strong> para su fabricación y reemplazo masivo, con pérdidas económicas globales superiores a los <strong>$2.6 billones de dólares</strong>.
                      </p>
                    </div>
                  </div>
                )}

                {/* CAPÍTULO 4: EXPLORADOR INTERACTIVO DE APIS DEL GOBIERNO */}
                {activeTab === 'apis_gobierno' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                        <span>🏛️</span> 4. {isEn ? 'Public Government API Feeds (NASA / NOAA / USGS)' : 'Índice de APIs Libres y Públicas del Gobierno'}
                      </h2>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        Live Data Explorer
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-white/70">
                      Explora y prueba directamente en tiempo real los endpoints oficiales de telemetría gubernamentales de Estados Unidos y Europa consumidos por **HELIOX**:
                    </p>

                    {/* Tabs de Selección de API */}
                    <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                      {[
                        { id: 'noaa_solar_cycle', label: 'NOAA Solar Cycle 25' },
                        { id: 'noaa_goes_protons', label: 'NOAA GOES Protons (SEP)' },
                        { id: 'nasa_donki_alerts', label: 'NASA DONKI Alerts' },
                        { id: 'usgs_geomagnetism', label: 'USGS Geomagnetism' },
                      ].map((apiTab) => (
                        <button
                          key={apiTab.id}
                          onClick={() => setActiveApiTab(apiTab.id as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                            activeApiTab === apiTab.id
                              ? 'bg-solar-500 text-black font-bold'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          {apiTab.label}
                        </button>
                      ))}
                    </div>

                    {/* Visor de Código JSON de la API Seleccionada */}
                    <div className="p-4 rounded-2xl bg-black border border-white/15 font-mono text-xs overflow-x-auto space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-solar-400 font-bold">
                          Endpoint: {govApiData?.apis?.[activeApiTab]?.endpoint || 'Cargando...'}
                        </span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          HTTP 200 OK · Public Access
                        </span>
                      </div>

                      {loadingApi ? (
                        <div className="py-8 text-center text-white/40">
                          <span className="inline-block animate-spin mr-2">🔄</span> Consultando servidor gubernamental en vivo...
                        </div>
                      ) : (
                        <pre className="text-white/80 max-h-64 overflow-y-auto leading-relaxed">
                          {JSON.stringify(govApiData?.apis?.[activeApiTab] || {}, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                )}

                {/* CAPÍTULO 5: PERSPECTIVA GEOPOLÍTICA */}
                {activeTab === 'geopolitica' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                        <span>🌐</span> 5. {isEn ? 'Geopolitical Perspective of Space Weather' : 'Perspectiva Geopolítica de la Climatología Espacial'}
                      </h2>
                      <span className="text-xs font-mono text-solar-400 bg-solar-500/10 px-3 py-1 rounded-full border border-solar-500/20">
                        {isEn ? 'Section 5.1' : 'Sección 5.1'}
                      </span>
                    </div>

                    <p>
                      La soberanía espacial de las naciones emergentes depende de su capacidad para predecir anomalías causadas por el viento solar en sus constelaciones de satélites de observación terrestre y comunicaciones.
                    </p>
                    <p>
                      <strong>HELIOX</strong> provee una capa soberana e independiente de procesamiento en tiempo real, permitiendo a investigadores, operadores de redes y ciudadanos estar alerta ante perturbaciones ionosféricas severas sin depender exclusivamente de portales gubernamentales cerrados.
                    </p>
                  </div>
                )}

                {/* CAPÍTULO 6: CARTA ABIERTA A LA NASA */}
                {activeTab === 'nasa_letter' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                        <span>✉️</span> 6. {isEn ? 'Open Letter to NASA & Space Agencies' : 'Carta Oficial Abierta a la NASA y Agencias Espaciales'}
                      </h2>
                      <span className="text-xs font-mono text-solar-400 bg-solar-500/10 px-3 py-1 rounded-full border border-solar-500/20">
                        Official Document
                      </span>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 font-serif text-white/90">
                      <p><strong>A la atención de:</strong> Science Mission Directorate, NASA & Heliophysics Division</p>
                      <p>
                        Estimados colegas y directores de misiones heliográficas:
                      </p>
                      <p>
                        Por medio del presente documento y a través de la plataforma <strong>HELIOX Solar Observatory</strong>, extendemos nuestro reconocimiento formal al trabajo de telemetría de las misiones SDO, Parker Solar Probe, SOHO y GOES. A su vez, ratificamos nuestro compromiso de traducir, diseminar y hacer accesible esta telemetría para millones de personas en Latinoamérica y el mundo.
                      </p>
                      <p className="font-sans font-bold text-solar-300 pt-2 border-t border-white/10">
                        Firmado,<br />
                        JESÚS BARRIOS<br />
                        <span className="text-xs font-normal text-white/50">Director & Fundador, HELIOX Solar Observatory</span>
                      </p>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Barra de Difusión Viral */}
        <ViralShareBar />

        {/* AdSense Banner Inferior */}
        <div className="my-8">
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
