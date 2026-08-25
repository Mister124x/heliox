'use client'

import { motion } from 'framer-motion'

interface StormAlertProps {
  type: 'CME' | 'LLAMARADA' | 'TORMENTA' | 'SEP'
  intensity: string
  time: string
  location?: string
}

const TYPE_CONFIG = {
  CME: { icon: '💥', color: '#f97316', label: 'Eyección Coronal', bg: 'bg-orange-500/10 border-orange-500/30' },
  LLAMARADA: { icon: '⚡', color: '#eab308', label: 'Llamarada Solar', bg: 'bg-yellow-500/10 border-yellow-500/30' },
  TORMENTA: { icon: '🌩️', color: '#ef4444', label: 'Tormenta Geomagnética', bg: 'bg-red-500/10 border-red-500/30' },
  SEP: { icon: '☢️', color: '#a855f7', label: 'Partículas Energéticas', bg: 'bg-purple-500/10 border-purple-500/30' },
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString('es-CO', {
      day: '2-digit', month: 'short',
      hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
    }) + ' UTC'
  } catch { return iso }
}

function isXClass(intensity: string): boolean {
  return intensity?.startsWith('X') || intensity?.startsWith('M')
}

export default function StormAlert({ type, intensity, time, location }: StormAlertProps) {
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.CME
  const isSevere = isXClass(intensity) || (type === 'CME' && parseFloat(intensity) > 900)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`solar-card border p-5 ${config.bg} ${isSevere ? 'alert-glow' : ''}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: config.color }}>
              {config.label}
            </span>
            {isSevere && (
              <span className="text-xs bg-red-500/30 text-red-300 px-2 py-0.5 rounded-full font-bold">
                SEVERO
              </span>
            )}
          </div>

          <div className="font-mono text-xl font-bold" style={{ color: config.color }}>
            {intensity || 'N/A'}
          </div>

          <div className="mt-2 space-y-1">
            <div className="text-xs text-white/50">
              🕐 {formatTime(time)}
            </div>
            {location && (
              <div className="text-xs text-white/50">
                📍 {location}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-white/30">
        NASA DONKI · Datos en tiempo real
      </div>
    </motion.div>
  )
}
