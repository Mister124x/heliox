'use client'

import { motion } from 'framer-motion'

interface KpGaugeProps {
  kp: number
  severity: string
  color: string
}

const KP_LEVELS = [
  { min: 0, max: 1, label: 'G0', desc: 'Tranquilo', color: '#22c55e' },
  { min: 1, max: 2, label: 'G0', desc: 'Tranquilo', color: '#4ade80' },
  { min: 2, max: 3, label: 'G0', desc: 'Tranquilo', color: '#84cc16' },
  { min: 3, max: 4, label: 'G0', desc: 'Tranquilo', color: '#a3e635' },
  { min: 4, max: 5, label: 'Activo', desc: 'Activo', color: '#eab308' },
  { min: 5, max: 6, label: 'G1', desc: 'Tormenta Menor', color: '#f97316' },
  { min: 6, max: 7, label: 'G2', desc: 'Tormenta Moderada', color: '#ef4444' },
  { min: 7, max: 8, label: 'G3', desc: 'Tormenta Fuerte', color: '#dc2626' },
  { min: 8, max: 9, label: 'G4', desc: 'Tormenta Severa', color: '#a855f7' },
  { min: 9, max: 10, label: 'G5', desc: 'Tormenta EXTREMA', color: '#7c3aed' },
]

export default function KpGauge({ kp, severity, color }: KpGaugeProps) {
  const percentage = Math.min((kp / 9) * 100, 100)
  const isStormy = kp >= 5

  return (
    <div className={`solar-card p-6 md:p-8 ${isStormy ? 'alert-glow border-red-500/30' : ''}`}>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Número grande */}
        <div className="text-center">
          <div className="text-xs text-white/50 uppercase tracking-widest mb-2">Índice Kp Actual</div>
          <motion.div
            key={kp}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-8xl font-bold font-mono tabular-nums"
            style={{ color }}
          >
            {kp.toFixed(1)}
          </motion.div>
          <div className="mt-2 text-lg font-semibold" style={{ color }}>
            {severity}
          </div>
          {isStormy && (
            <div className="mt-2 inline-flex items-center gap-1.5 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold border border-red-500/30">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
              ALERTA ACTIVA
            </div>
          )}
        </div>

        {/* Barra de progreso */}
        <div className="flex-1 w-full">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>0 — Tranquilo</span>
            <span>9 — Extremo</span>
          </div>
          
          {/* Barra principal */}
          <div className="relative h-8 rounded-full overflow-hidden bg-white/10">
            {/* Gradiente de fondo */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444, #7c3aed)',
                opacity: 0.3,
              }}
            />
            {/* Barra de progreso animada */}
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            {/* Marcador de posición actual */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white"
              style={{ left: `calc(${percentage}% - 8px)`, backgroundColor: color }}
              initial={{ left: '0%' }}
              animate={{ left: `calc(${percentage}% - 8px)` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>

          {/* Marcadores G0-G5 */}
          <div className="flex justify-between mt-2">
            {['G0', 'G1', 'G2', 'G3', 'G4', 'G5'].map((g, i) => (
              <div key={g} className="text-center">
                <div className="text-xs font-mono text-white/40">{g}</div>
                <div className="text-xs text-white/25">{i === 0 ? '0-4' : i + 4}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Escala lateral */}
        <div className="hidden xl:block">
          <div className="text-xs text-white/50 mb-3 uppercase tracking-wider">Escala G</div>
          <div className="space-y-1">
            {KP_LEVELS.slice().reverse().map((level) => (
              <div
                key={level.label + level.min}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
                  kp >= level.min && kp < level.max
                    ? 'bg-white/15 font-semibold'
                    : 'opacity-40'
                }`}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: level.color }} />
                <span className="font-mono w-8">{level.label}</span>
                <span>{level.desc}</span>
                <span className="font-mono text-white/40">{level.min}–{level.max}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-white/30 text-center">
        Fuente: NOAA Space Weather Prediction Center · actualizado cada minuto
      </div>
    </div>
  )
}
