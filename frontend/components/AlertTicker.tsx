'use client'

interface Alert {
  product_id: string
  message: string
}

interface AlertTickerProps {
  alerts: Alert[]
  kp: number
}

function cleanMessage(raw: string): string {
  if (!raw) return ''
  // Elimina encabezados técnicos de NOAA
  let cleaned = raw
    .replace(/Space Weather Message Code:\s*[A-Z0-9_]+/gi, '')
    .replace(/Serial Number:\s*[0-9]+/gi, '')
    .replace(/Issue Time:\s*[0-9]{4}\s+[A-Za-z]+\s+[0-9]+\s+[0-9:]+\s+UTC/gi, '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Extraer la primera oración o los primeros 120 caracteres legibles
  if (cleaned.length > 130) {
    cleaned = cleaned.slice(0, 127) + '...'
  }
  return cleaned
}

export default function AlertTicker({ alerts, kp }: AlertTickerProps) {
  const isStormy = kp >= 5

  const cleanedAlerts = (alerts || [])
    .map((a) => {
      const text = cleanMessage(a.message)
      return text ? `🛰️ [${a.product_id}]: ${text}` : null
    })
    .filter(Boolean) as string[]

  const fallback = [
    `☀️ HELIOX — Monitoreo Solar 24/7 en Tiempo Real`,
    `📡 Kp Planetario Actual: ${kp.toFixed(1)} (${isStormy ? 'Tormenta Activa' : 'Campo Estable'})`,
    `🛰️ Telemetría Satelital Directa: NASA SDO · SOHO L1 · NOAA SWPC · ESA`,
    `🇨🇴 Fundado e Investigado por JESÚS BARRIOS`,
  ]

  const items = cleanedAlerts.length > 0 ? cleanedAlerts : fallback
  const fullText = [...items, ...items].join('   •••   ')

  return (
    <div
      className={`h-8 flex items-center overflow-hidden text-xs font-mono border-b ${
        isStormy
          ? 'bg-red-950/90 text-red-200 border-red-500/40 shadow-lg shadow-red-900/30'
          : 'bg-[#08020f]/90 text-amber-300 border-orange-500/20'
      } backdrop-blur-md`}
    >
      <div className="shrink-0 px-3 py-1 font-bold border-r border-white/10 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white">
        <span className={`w-2 h-2 rounded-full ${isStormy ? 'bg-red-500 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
        <span>{isStormy ? 'ALERTA ESPACIAL' : 'EN VIVO'}</span>
      </div>

      <div className="ticker-container flex-1 overflow-hidden">
        <div className="ticker-content whitespace-nowrap inline-flex gap-8 animate-ticker">
          <span>{fullText}</span>
          <span aria-hidden="true">{fullText}</span>
        </div>
      </div>
    </div>
  )
}
