'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import DonationWidget from '@/components/DonationWidget'

export default function AnalysisPage() {
  const [activeSection, setActiveSection] = useState('resumen')

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
        {/* Cabecera del Documento */}
        <div className="border-b border-white/10 pb-8 mb-8 text-center">
          <div className="solar-badge bg-solar-500/20 text-solar-400 border border-solar-500/30 mb-3">
            📄 Documento Científico Maestro — Versión 1.0 Fundacional
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            El Sol Como Fuerza Geopolítica, Económica y Civilizatoria
          </h1>
          <p className="text-base text-solar-400 font-semibold mb-2">
            Una Perspectiva Diferente: Lo que la Astronomía Oficial No te Dice en Español
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-white/50">
            <span>Investigador Principal: <strong className="text-white">JESÚS BARRIOS</strong></span>
            <span>•</span>
            <span>Plataforma: <strong className="text-white">HELIOX</strong></span>
            <span>•</span>
            <span>Extensión: <strong className="text-white">+15 Páginas</strong></span>
          </div>
        </div>

        {/* Resumen de Capítulos Interactivos */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="solar-card p-5 bg-white/5 border border-white/10">
            <div className="text-2xl mb-2">🛰️</div>
            <h3 className="font-bold text-base text-white mb-1">Misión y Visión</h3>
            <p className="text-xs text-white/60">
              Descentralización del conocimiento solar para Latinoamérica y protección de la infraestructura crítica.
            </p>
          </div>

          <div className="solar-card p-5 bg-white/5 border border-white/10">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-bold text-base text-white mb-1">El Riesgo Carrington</h3>
            <p className="text-xs text-white/60">
              Análisis del impacto de $2.6 billones de dólares en redes eléctricas, satélites y sistemas bancarios mundiales.
            </p>
          </div>

          <div className="solar-card p-5 bg-white/5 border border-white/10">
            <div className="text-2xl mb-2">📜</div>
            <h3 className="font-bold text-base text-white mb-1">Carta Oficial a la NASA</h3>
            <p className="text-xs text-white/60">
              Manifiesto dirigido al equipo DONKI y Heliofísica solicitando datos y alertas en idioma español.
            </p>
          </div>
        </div>

        {/* Extracto Fundamental del Documento */}
        <article className="prose prose-invert max-w-none space-y-8 text-white/80 leading-relaxed text-sm md:text-base bg-white/5 p-6 md:p-10 rounded-3xl border border-white/10">
          <section>
            <h2 className="text-2xl font-bold text-solar-400 mb-3">1. Declaración Fundacional</h2>
            <blockquote className="border-l-4 border-solar-500 pl-4 italic text-white/90 my-4">
              "Estudiamos las estrellas para entender quiénes somos. Estudiamos el sol para entender cómo vamos a sobrevivir."
              <br />
              <strong className="text-solar-400 font-bold">— JESÚS BARRIOS · Fundador de HELIOX</strong>
            </blockquote>
            <p>
              El sol no es un astro benigno y estático. Es un reactor termonuclear de \(1.989 \times 10^{30}\) kg que procesa 600 millones de toneladas de hidrógeno por segundo. Nuestra civilización tecnológica digital depende por completo de satélites en órbita y transformadores de ultra alta tensión que pueden ser destruidos en cuestión de minutos por una tormenta geomagnética extrema de nivel G5.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-solar-400 mb-3">2. Carta Abierta a la NASA</h2>
            <div className="p-6 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs md:text-sm text-white/80 space-y-3">
              <p><strong>A:</strong> Equipo de Ciencias Heliofísicas de la NASA y Moon to Mars Space Weather Office</p>
              <p><strong>De:</strong> JESÚS BARRIOS — Fundador de HELIOX Solar Observatory</p>
              <p>
                "La decisión de mantener los datos de satélites como SDO, SOHO y DSCOVR con acceso público gratuito ha permitido democratizar la ciencia en regiones históricamente desatendidas. Sin embargo, el 8% de la población mundial de habla hispana carece de canales nativos de alerta temprana en tiempo real. HELIOX nace para cerrar esa brecha, convirtiendo la telemetría en prevención civil y conocimiento libre."
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-solar-400 mb-3">3. Descarga del Informe Completo</h2>
            <p>
              El archivo original completo con más de 15 páginas de fórmulas físicas, datos de manchas solares 2020-2026, análisis del campo magnético interplanetario \(B_z\) y referencias académicas está alojado en nuestro repositorio científico.
            </p>
            <div className="pt-4">
              <a
                href="/docs/HELIOX_ANALYSIS_REPORT.md"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-solar-500 hover:bg-solar-400 text-black transition-all shadow-lg shadow-solar-500/20"
              >
                📥 Leer Documento Completo en Markdown →
              </a>
            </div>
          </section>
        </article>

        {/* Sección de Apoyo a la Investigación */}
        <div className="mt-16">
          <DonationWidget />
        </div>
      </main>
    </div>
  )
}
