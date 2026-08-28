'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useI18n } from '../lib/i18n'

export default function SolarPeakAlert() {
  const { lang } = useI18n()
  const isEn = lang === 'en'

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-red-950/80 via-orange-950/60 to-black border border-red-500/40 shadow-2xl relative overflow-hidden my-6"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-xl shrink-0 animate-pulse">
            🔥
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[11px] font-mono font-bold mb-1 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>ESTADO OFICIAL: PICO MÁXIMO DEL CICLO SOLAR 25 EN CURSO (2024–2026)</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-white leading-snug">
              {isEn
                ? 'Solar Cycle 25 reaches peak activity: Highest sunspot & X-class flare rates in 11 years'
                : 'El Ciclo Solar 25 entra en su fase de máxima intensidad: Máxima tasa de manchas solares y llamaradas clase X en más de una década'}
            </h4>
            <p className="text-xs text-white/70 mt-1 max-w-2xl">
              {isEn
                ? 'NOAA and NASA confirm increased solar flare and CME frequency impacting Earth satellites, power grids, and high-latitude aurora visibility.'
                : 'La NOAA y la NASA confirman una frecuencia récord de eyecciones de masa coronal (CME) y fulguraciones que impactan satélites, GPS y generan auroras visibles.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
          <Link
            href="/analysis"
            className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-600/30 transition-all font-mono"
          >
            {isEn ? 'Read Peak Dossier →' : 'Ver Análisis del Pico →'}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
