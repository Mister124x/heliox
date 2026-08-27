'use client'

import { motion } from 'framer-motion'

interface KpGaugeProps {
  kp: number
  severity: string
  color: string
}

const KP_LEVELS = [
  { min: 0, max: 1,  label: 'G0', desc: 'Tranquilo',         color: '#22c55e' },
  { min: 1, max: 2,  label: 'G0', desc: 'Tranquilo',         color: '#4ade80' },
  { min: 2, max: 3,  label: 'G0', desc: 'Tranquilo',         color: '#84cc16' },
  { min: 3, max: 4,  label: 'G0', desc: 'Activo',            color: '#a3e635' },
  { min: 4, max: 5,  label: 'G0', desc: 'Activo+',           color: '#eab308' },
  { min: 5, max: 6,  label: 'G1', desc: 'Menor',             color: '#f97316' },
  { min: 6, max: 7,  label: 'G2', desc: 'Moderada',          color: '#ef4444' },
  { min: 7, max: 8,  label: 'G3', desc: 'Fuerte',            color: '#dc2626' },
  { min: 8, max: 9,  label: 'G4', desc: 'Severa',            color: '#a855f7' },
  { min: 9, max: 10, label: 'G5', desc: 'EXTREMA',           color: '#7c3aed' },
]

const STORM_SCALE = [
  { kp: '0–4', g: 'G0', label: 'Tranquilo', color: '#22c55e' },
  { kp: '5',   g: 'G1', label: 'Menor',     color: '#f97316' },
  { kp: '6',   g: 'G2', label: 'Moderada',  color: '#ef4444' },
  { kp: '7',   g: 'G3', label: 'Fuerte',    color: '#dc2626' },
  { kp: '8',   g: 'G4', label: 'Severa',    color: '#a855f7' },
  { kp: '9',   g: 'G5', label: 'Extrema',   color: '#7c3aed' },
]

export default function KpGauge({ kp, severity, color }: KpGaugeProps) {
  const percentage = Math.min((kp / 9) * 100, 100)
  const isStormy = kp >= 5

  return (
    <div className={`space-y-4 ${isStormy ? 'alert-glow' : ''}`}>

      {/* ── Cabecera ────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-white/50 uppercase tracking-widest font-mono">
          Índice Kp Actual
        </div>
        <div className="text-[10px] font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded">
          NOAA SWPC · live
        </div>
      </div>

      {/* ── Número grande ───────────────────────────── */}
      <div className="flex items-end gap-4">
        <motion.div
          key={kp}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-7xl font-black font-mono tabular-nums leading-none"
          style={{ color }}
        >
          {kp.toFixed(1)}
        </motion.div>
        <div className="pb-2 space-y-1">
          <div className="text-lg font-bold" style={{ color }}>{severity}</div>
          {isStormy && (
            <div className="inline-flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full text-[10px] font-bold border border-red-500/30">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
              ALERTA ACTIVA
            </div>
          )}
        </div>
      </div>

      {/* ── Barra de progreso ───────────────────────── */}
      <div>
        <div className="flex justify-between text-[10px] text-white/40 mb-1.5 font-mono">
          <span>0 — Tranquilo</span>
          <span>9 — Extremo</span>
        </div>
        <div className="relative h-5 rounded-full overflow-hidden bg-white/10">
          {/* Fondo degradado */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #22c55e 0%, #eab308 45%, #f97316 60%, #ef4444 75%, #7c3aed 100%)',
              opacity: 0.25,
            }}
          />
          {/* Progreso animado */}
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          {/* Marcador circular */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: color }}
            initial={{ left: '0%' }}
            animate={{ left: `calc(${percentage}% - 7px)` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* ── Escala G (compacta) ─────────────────────── */}
      <div className="grid grid-cols-3 gap-1.5">
        {STORM_SCALE.map((s) => {
          const active = s.g === 'G0' ? kp < 5 : kp >= parseFloat(s.kp) && kp < parseFloat(s.kp) + 1
          return (
            <div
              key={s.g}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-mono transition-all ${
                active ? 'bg-white/15 ring-1 ring-white/20' : 'opacity-40'
              }`}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
              <span className="font-bold" style={{ color: active ? s.color : undefined }}>{s.g}</span>
              <span className="text-white/60 truncate">{s.label}</span>
            </div>
          )
        })}
      </div>

      {/* ── Fuente ──────────────────────────────────── */}
      <div className="text-[9px] text-white/25 text-center">
        Fuente: NOAA Space Weather Prediction Center · actualizado cada minuto
      </div>
    </div>
  )
}
