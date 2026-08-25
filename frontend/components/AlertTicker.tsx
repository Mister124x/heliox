'use client'

interface Alert { product_id: string; message: string }

interface AlertTickerProps {
  alerts: Alert[]
  kp: number
}

export default function AlertTicker({ alerts, kp }: AlertTickerProps) {
  const isStormy = kp >= 5
  const messages = alerts.length > 0
    ? alerts.map(a => `🛰️ ${a.product_id}: ${a.message.slice(0, 120)}...`)
    : [`☀️ HELIOX — Monitoreo solar 24/7 · Kp actual: ${kp.toFixed(1)} · Datos NASA + NOAA · por JESÚS BARRIOS`]

  const full = [...messages, ...messages].join('   •••   ')

  return (
    <div className={`h-8 flex items-center overflow-hidden text-xs font-mono ${
      isStormy
        ? 'bg-red-900/80 text-red-200 border-b border-red-500/50'
        : 'bg-solar-950/80 text-solar-300 border-b border-solar-800/50'
    } backdrop-blur-sm`}>
      <div className="shrink-0 px-3 font-bold border-r border-white/20 mr-3 text-white/70 whitespace-nowrap">
        {isStormy ? '⚠️ ALERTA' : '🔴 EN VIVO'}
      </div>
      <div className="ticker-container flex-1">
        <div className="ticker-content">
          <span>{full}</span>
          <span aria-hidden>{full}</span>
        </div>
      </div>
    </div>
  )
}
