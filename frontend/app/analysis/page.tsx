'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import DonationWidget from '../../components/DonationWidget'
import AdBanner from '../../components/AdBanner'

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<'fundacional' | 'ciclo25' | 'carrington' | 'nasa_letter' | 'geopolitica'>('fundacional')

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="text-xl font-bold tracking-tight">HELIOX</span>
            <span className="text-xs text-solar-400 font-mono hidden sm:inline">RESEARCH HUB</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Inicio</Link>
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/storms" className="text-sm text-white/60 hover:text-white transition-colors">Tormentas</Link>
            <Link href="/reels" className="text-sm text-white/60 hover:text-white transition-colors">Reels & Media</Link>
            <Link href="/analysis" className="text-sm text-solar-400 font-semibold">Análisis (+15 Pág)</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-28">
        {/* Cabecera del Documento Maestro */}
        <div className="border-b border-white/10 pb-8 mb-8 text-center">
          <div className="solar-badge bg-solar-500/20 text-solar-400 border border-solar-500/30 mb-3">
            📄 Documento Científico Maestro — Versión 1.0 Fundacional (+15 Páginas)
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            El Sol Como Fuerza Geopolítica, Económica y Civilizatoria
          </h1>
          <p className="text-base text-solar-400 font-semibold mb-2">
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
        <AdBanner format="auto" />

        {/* Selector de Capítulos */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-white/5 rounded-2xl border border-white/10">
          {[
            { id: 'fundacional', label: '1. Manifiesto & Misión', icon: '☀️' },
            { id: 'ciclo25', label: '2. Ciclo Solar 25 (2024-2026)', icon: '📈' },
            { id: 'carrington', label: '3. El Riesgo Carrington ($2.6T)', icon: '⚡' },
            { id: 'geopolitica', label: '4. Perspectiva Geopolítica', icon: '🌐' },
            { id: 'nasa_letter', label: '5. Carta Oficial a la NASA', icon: '📜' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-solar-500 text-black shadow-lg shadow-solar-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido Extenso del Capítulo Seleccionado */}
        <article className="prose prose-invert max-w-none space-y-8 text-white/80 leading-relaxed text-sm md:text-base bg-white/5 p-6 md:p-10 rounded-3xl border border-white/10">
          {activeTab === 'fundacional' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-solar-400">1. Resumen Ejecutivo & Declaración Fundacional</h2>
              <blockquote className="border-l-4 border-solar-500 pl-4 italic text-white/90 my-4 text-base md:text-lg">
                "Estudiamos las estrellas para entender quiénes somos. Estudiamos el sol para entender cómo vamos a sobrevivir."
                <br />
                <strong className="text-solar-400 font-bold">— JESÚS BARRIOS · Fundador de HELIOX</strong>
              </blockquote>
              <p>
                El Sol no es un objeto estático y benigno. Es un reactor termonuclear de <strong>1,989 × 10³⁰ kg</strong> que procesa 600 millones de toneladas de hidrógeno cada segundo y expulsa energía equivalente a 386 septillones de vatios continuamente hacia el espacio. Nosotros, sobre una roca magnetizada a 150 millones de kilómetros, vivimos literalmente dentro de su atmósfera exterior.
              </p>
              <h3 className="text-xl font-bold text-white mt-4">La Visión de HELIOX</h3>
              <p>
                HELIOX existe porque el conocimiento científico sobre nuestra estrella debe ser universal, gratuito, comprensible y en español. La visión es consolidar el <strong>observatorio solar de referencia de Latinoamérica</strong>, traduciendo datos de NASA, NOAA y ESA en alertas tempranas de protección ciudadana y soberanía tecnológica.
              </p>
            </motion.div>
          )}

          {activeTab === 'ciclo25' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-solar-400">2. Análisis Físico del Ciclo Solar 25</h2>
              <p>
                El Ciclo Solar 25 comenzó en diciembre de 2019. Las predicciones iniciales del panel NOAA/NASA estimaron un ciclo débil. Sin embargo, los datos satelitales demuestran que <strong>la actividad real superó las predicciones oficiales en un 70%</strong>, alcanzando el máximo de manchas solares entre 2024 y 2026.
              </p>
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
                <h4 className="text-solar-300 font-bold text-sm mb-2">El Factor Decisivo: Vector Magnético Bz</h4>
                <p className="text-xs text-white/70">
                  Cuando una Eyección de Masa Coronal (CME) impacta con un campo magnético Bz fuertemente negativo (sur, menor a -25 nT), el escudo magnético terrestre se abre, permitiendo la inyección masiva de partículas cargadas a la ionosfera, generando tormentas G4 y G5.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'carrington' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-solar-400">3. El Impacto de un Evento Carrington Moderno</h2>
              <p>
                En 1859, el Evento Carrington provocó que las líneas telegráficas ardieran en llamas. En el siglo XXI, con una civilización 100% digital dependiente de satélites GPS, transacciones interbancarias y redes eléctricas de ultra alta tensión:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 text-sm">
                <li><strong>Pérdidas Económicas Estimadas:</strong> Más de $2.6 billones de dólares según Lloyd's of London.</li>
                <li><strong>Colapso de Redes Eléctricas:</strong> Transformadores de ultra alta tensión quemados que tardan de 1 a 3 años en reemplazarse.</li>
                <li><strong>Pérdida de Satélites:</strong> Disrupción prolongada de navegación aérea, Starlink y comunicaciones militares.</li>
              </ul>
            </motion.div>
          )}

          {activeTab === 'geopolitica' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-solar-400">4. Perspectiva Geopolítica & Desigualdad de Preparación</h2>
              <p>
                Los países del G7 cuentan con programas avanzados de mitigación y redundancia de transformadores ante tormentas solares extremas. Latinoamérica, por el contrario, carece de infraestructura de contingencia. 
              </p>
              <p>
                HELIOX aporta el primer anillo de defensa: <strong>información pública en tiempo real en español</strong> para que el ciudadano y las empresas conozcan el estado del clima espacial antes de que los canales convencionales informen con horas de retraso.
              </p>
            </motion.div>
          )}

          {activeTab === 'nasa_letter' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-solar-400">5. Carta Oficial Abierta a la NASA</h2>
              <div className="p-6 rounded-2xl bg-black/80 border border-solar-500/30 font-mono text-xs md:text-sm text-white/90 space-y-4">
                <p><strong>A:</strong> Equipo de Ciencias Heliofísicas de la NASA y Programa DONKI (Goddard Space Flight Center)</p>
                <p><strong>De:</strong> JESÚS BARRIOS — Fundador de HELIOX Solar Observatory (heliox.jesusbarrios.co)</p>
                <p>
                  "Durante el desarrollo de esta plataforma hemos consumido sus APIs miles de veces. Admiramos profundamente la decisión de hacer públicos estos datos. Sin embargo, existe una barrera crítica: el 8% de la población mundial que habla español no cuenta con interfaces nativas de alerta en su idioma."
                </p>
                <p>
                  "HELIOX nace como un puente civil y científico para convertir el flujo de datos brutos en conciencia ciudadana y preparación tecnológica para Colombia y toda Latinoamérica. La ciencia pertenece a la humanidad."
                </p>
                <p className="pt-2 text-solar-400 font-bold">
                  Firmado: JESÚS BARRIOS · Fundador, HELIOX
                </p>
              </div>
            </motion.div>
          )}
        </article>

        {/* AdSense Banner Inferior */}
        <AdBanner format="auto" />

        {/* Sección de Recaudación y Apoyo a la Investigación */}
        <div className="mt-16">
          <DonationWidget />
        </div>
      </main>
    </div>
  )
}
