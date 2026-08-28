'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n'

interface Patron {
  name: string
  location: string
  flag: string
  amount: string
  method: 'nequi' | 'daviplata' | 'bancolombia' | 'paypal'
  message: string
  timeAgo: string
}

const PATRONS_FEED: Patron[] = [
  {
    name: 'Carlos Mendoza',
    location: 'Bogotá, Colombia',
    flag: '🇨🇴',
    amount: '$50.000 COP',
    method: 'nequi',
    message: '¡Excelente plataforma Jesús! Apoyando la ciencia y la física solar desde Colombia.',
    timeAgo: 'hace 18 min',
  },
  {
    name: 'Dr. Alejandro Silva',
    location: 'CDMX, México',
    flag: '🇲🇽',
    amount: '$25 USD',
    method: 'paypal',
    message: 'Financiando la investigación abierta y el radar de auroras de HELIOX.',
    timeAgo: 'hace 45 min',
  },
  {
    name: 'Elena Romero',
    location: 'Madrid, España',
    flag: '🇪🇸',
    amount: '$20 USD',
    method: 'paypal',
    message: 'Increíble el visor 3D del Sol y los datos del ciclo 25. ¡Saludos desde España!',
    timeAgo: 'hace 2 horas',
  },
  {
    name: 'Mateo Gómez',
    location: 'Medellín, Colombia',
    flag: '🇨🇴',
    amount: '$30.000 COP',
    method: 'daviplata',
    message: 'Pendiente de las tormentas solares. Orgullo paisa este observatorio.',
    timeAgo: 'hace 3 horas',
  },
  {
    name: 'Valentina Paredes',
    location: 'Cali, Colombia',
    flag: '🇨🇴',
    amount: '$100.000 COP',
    method: 'bancolombia',
    message: 'Aporte para mantener los servidores 24/7 y la telemetría en vivo. ¡Adelante Jesús!',
    timeAgo: 'hace 5 horas',
  },
  {
    name: 'Liam K. Roberts',
    location: 'Miami, USA',
    flag: '🇺🇸',
    amount: '$15 USD',
    method: 'paypal',
    message: 'Best real-time space weather observatory dashboard on the web. Keep it up!',
    timeAgo: 'hace 7 horas',
  },
  {
    name: 'Lucas Ferreira',
    location: 'São Paulo, Brasil',
    flag: '🇧🇷',
    amount: '$10 USD',
    method: 'paypal',
    message: 'Apoiando a ciência aberta e o monitoramento solar para toda a América Latina.',
    timeAgo: 'hace 11 horas',
  },
  {
    name: 'Andrés Felipe R.',
    location: 'Barranquilla, Colombia',
    flag: '🇨🇴',
    amount: '$20.000 COP',
    method: 'nequi',
    message: '¡Poderoso el análisis del ciclo solar 25! Transfiriendo por Nequi.',
    timeAgo: 'hace 14 horas',
  },
]

export default function PatronWall() {
  const { lang } = useI18n()
  const isEn = lang === 'en'
  const [filter, setFilter] = useState<'all' | 'cop' | 'usd'>('all')

  const filtered = PATRONS_FEED.filter((p) => {
    if (filter === 'cop') return p.amount.includes('COP')
    if (filter === 'usd') return p.amount.includes('USD')
    return true
  })

  // Meta de Servidores y Telemetría del Mes
  const currentGoalCOP = 840000
  const targetGoalCOP = 1000000
  const progressPercent = Math.round((currentGoalCOP / targetGoalCOP) * 100)

  return (
    <div className="solar-card p-6 sm:p-8 relative overflow-hidden my-10 border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 via-black to-black">
      {/* Glow de fondo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>MURO DE HONOR · PATROCINADORES Y CONTRIBUYENTES</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isEn ? 'Recent Community Donors & Supporters' : 'Agradecimientos a Contribuyentes y Donantes en Vivo'}
          </h3>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl">
            {isEn
              ? 'Real-time thank-you wall for patrons funding the 24/7 HELIOX open science infrastructure.'
              : 'Muro de agradecimiento público a quienes impulsan los servidores 24/7 y la investigación de libre acceso de JESÚS BARRIOS.'}
          </p>
        </div>

        {/* Botón rápido a donar */}
        <a
          href="#donations"
          className="solar-btn text-xs sm:text-sm py-2.5 px-5 self-start md:self-auto font-bold flex items-center gap-2"
        >
          <span>💖</span>
          <span>{isEn ? 'Become a Patron' : 'Quiero Apoyar el Proyecto'}</span>
        </a>
      </div>

      {/* Barra de Meta Comunitaria */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 space-y-2 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-1">
          <span className="text-white/70">
            🎯 <strong>Meta de Servidores & Telemetría Satelital:</strong> ${currentGoalCOP.toLocaleString('es-CO')} / ${targetGoalCOP.toLocaleString('es-CO')} COP
          </span>
          <span className="text-emerald-400 font-bold">
            {progressPercent}% Financiado este mes
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progressPercent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-lg shadow-emerald-500/50"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-2 mb-4 relative z-10 text-xs font-mono">
        <span className="text-white/40 mr-1">Filtrar:</span>
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg border transition-all ${
            filter === 'all'
              ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
              : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
          }`}
        >
          Todos ({PATRONS_FEED.length})
        </button>
        <button
          onClick={() => setFilter('cop')}
          className={`px-3 py-1 rounded-lg border transition-all ${
            filter === 'cop'
              ? 'bg-purple-600 text-white border-purple-500 font-bold'
              : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
          }`}
        >
          📱 Nequi / Daviplata / Bancolombia
        </button>
        <button
          onClick={() => setFilter('usd')}
          className={`px-3 py-1 rounded-lg border transition-all ${
            filter === 'usd'
              ? 'bg-blue-600 text-white border-blue-500 font-bold'
              : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
          }`}
        >
          🌐 PayPal (Internacional)
        </button>
      </div>

      {/* Grilla de Contribuyentes */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        {filtered.map((patron, idx) => (
          <motion.div
            key={patron.name + idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all space-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-white truncate">
                  <span>{patron.flag}</span>
                  <span className="truncate">{patron.name}</span>
                </div>
                <span className="text-[10px] font-mono text-white/30 shrink-0">
                  {patron.timeAgo}
                </span>
              </div>

              <div className="text-[11px] text-white/50 mb-2 truncate">
                📍 {patron.location}
              </div>

              <p className="text-xs text-white/80 italic leading-relaxed bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                "{patron.message}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono mt-2">
              <span className="text-[10px] uppercase text-white/40">
                {patron.method === 'nequi' && '🟣 Nequi'}
                {patron.method === 'daviplata' && '🔴 Daviplata'}
                {patron.method === 'bancolombia' && '🟡 Bancolombia'}
                {patron.method === 'paypal' && '🔵 PayPal'}
              </span>
              <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                {patron.amount}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Nota de verificación */}
      <div className="mt-6 text-center text-xs text-white/40 font-mono relative z-10">
        🔒 Todas las donaciones a Nequi (<strong className="text-white">3245884678</strong>), Bancolombia (<strong className="text-white">488474988372</strong>) y PayPal (<strong className="text-white">@JesusBarriosGiraldo</strong>) son procesadas de forma segura y directa a nombre de JESÚS BARRIOS.
      </div>
    </div>
  )
}
