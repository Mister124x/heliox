'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../lib/i18n'

export interface WavelengthOption {
  key: string
  label: string
  color: string
  desc: string
  instrument: string
  temperature: string
  features: string
  urlBuilder: () => string
}

const WAVELENGTHS: WavelengthOption[] = [
  {
    key: 'aia_304',
    label: '304Å',
    color: '#ef4444',
    desc: 'Cromosfera & Prominencias',
    instrument: 'SDO / AIA',
    temperature: '50,000 K (He II)',
    features: 'Erupciones filamentosas y eyecciones de masa',
    urlBuilder: () => `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0304.jpg?t=${Date.now()}`,
  },
  {
    key: 'aia_171',
    label: '171Å',
    color: '#60a5fa',
    desc: 'Corona Solar Baja',
    instrument: 'SDO / AIA',
    temperature: '1,000,000 K (Fe IX)',
    features: 'Bucles magnéticos coronales y arcos de plasma',
    urlBuilder: () => `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg?t=${Date.now()}`,
  },
  {
    key: 'aia_193',
    label: '193Å',
    color: '#22c55e',
    desc: 'Corona & Agujeros Coronales',
    instrument: 'SDO / AIA',
    temperature: '1,600,000 K (Fe XII)',
    features: 'Agujeros coronales emisores de viento solar rápido',
    urlBuilder: () => `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0193.jpg?t=${Date.now()}`,
  },
  {
    key: 'aia_211',
    label: '211Å',
    color: '#a855f7',
    desc: 'Regiones Magnéticamente Activas',
    instrument: 'SDO / AIA',
    temperature: '2,000,000 K (Fe XIV)',
    features: 'Campos magnéticos intensos sobre manchas solares',
    urlBuilder: () => `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0211.jpg?t=${Date.now()}`,
  },
  {
    key: 'aia_131',
    label: '131Å',
    color: '#3b82f6',
    desc: 'Llamaradas Solares Extremas',
    instrument: 'SDO / AIA',
    temperature: '10,000,000 K (Fe XXI)',
    features: 'Regiones de reconexión y llamaradas clase M y X',
    urlBuilder: () => `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0131.jpg?t=${Date.now()}`,
  },
  {
    key: 'hmi_mag',
    label: 'HMI',
    color: '#9ca3af',
    desc: 'Magnetograma de Superficie',
    instrument: 'SDO / HMI',
    temperature: 'Fotosfera (6,000 K)',
    features: 'Polaridad magnética (positivo blanco / negativo negro)',
    urlBuilder: () => `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMIB.jpg?t=${Date.now()}`,
  },
  {
    key: 'lasco_c2',
    label: 'LASCO C2',
    color: '#fbbf24',
    desc: 'Coronógrafo CME Cercano',
    instrument: 'SOHO / LASCO',
    temperature: '1.5 - 6 Radios Solares',
    features: 'Monitoreo de eyecciones de masa coronal (CME)',
    urlBuilder: () => `https://soho.nascom.nasa.gov/data/realtime/c2/1024/latest.jpg?t=${Date.now()}`,
  },
  {
    key: 'lasco_c3',
    label: 'LASCO C3',
    color: '#38bdf8',
    desc: 'Coronógrafo Gran Angular',
    instrument: 'SOHO / LASCO',
    temperature: '3.7 - 32 Radios Solares',
    features: 'Trayectoria interplanetaria de tormentas hacia la Tierra',
    urlBuilder: () => `https://soho.nascom.nasa.gov/data/realtime/c3/1024/latest.jpg?t=${Date.now()}`,
  },
]

interface SolarViewerProps {
  compact?: boolean
}

export default function SolarViewer({ compact = false }: SolarViewerProps) {
  const { t, lang } = useI18n()
  const isEn = lang === 'en'
  const isPt = lang === 'pt'

  const [selectedSource, setSelectedSource] = useState('aia_304')
  const [currentUrl, setCurrentUrl] = useState('')
  const [lastFetchTime, setLastFetchTime] = useState<Date>(new Date())
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [countdown, setCountdown] = useState(60)

  const activeWL = WAVELENGTHS.find((w) => w.key === selectedSource) || WAVELENGTHS[0]

  const updateImage = useCallback((isManual = false) => {
    if (isManual) setIsRefreshing(true)
    setLoading(true)
    const newUrl = activeWL.urlBuilder()
    setCurrentUrl(newUrl)
    setLastFetchTime(new Date())
    setCountdown(60)

    // Simular carga suave
    setTimeout(() => {
      setLoading(false)
      if (isManual) setIsRefreshing(false)
    }, 400)
  }, [activeWL])

  useEffect(() => {
    updateImage()
  }, [selectedSource, updateImage])

  // Temporizador para auto-refresco satelital cada 60s
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          updateImage()
          return 60
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [updateImage])

  return (
    <div className={compact ? 'w-full' : 'w-full max-w-lg'}>
      {/* Contenedor del Disco Solar */}
      <div className="relative rounded-3xl overflow-hidden bg-black solar-glow border border-solar-500/30">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedSource}-${lastFetchTime.getTime()}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-square w-full bg-black flex items-center justify-center"
          >
            {loading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="w-14 h-14 rounded-full border-4 border-solar-500 border-t-transparent animate-spin mb-3" />
                <span className="text-xs font-mono text-solar-300">
                  {isEn ? 'Downloading SDO telemetry...' : isPt ? 'Baixando telemetria SDO...' : 'Descargando telemetría SDO...'}
                </span>
              </div>
            )}

            {currentUrl ? (
              <img
                src={currentUrl}
                alt={`Sol en ${activeWL.label} - ${activeWL.desc}`}
                className="w-full h-full object-cover select-none"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false)
                }}
              />
            ) : (
              <div className="text-center p-8">
                <span className="text-6xl">☀️</span>
                <p className="text-xs text-white/50 mt-2">
                  {isEn ? 'Tuning satellite link...' : isPt ? 'Sintonizando satélite...' : 'Sintonizando satélite...'}
                </p>
              </div>
            )}

            {/* Overlay superior: Estado y Refresco */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md rounded-full px-3 py-1 border border-white/15">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="text-[11px] font-bold text-red-400">{t.nav_live} · {activeWL.instrument}</span>
              </div>

              <button
                onClick={() => updateImage(true)}
                className="flex items-center gap-1.5 bg-black/80 hover:bg-black active:scale-95 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20 text-[11px] font-mono text-solar-300 hover:text-white transition-all shadow-lg cursor-pointer"
                title={isEn ? 'Update live image from NASA SDO' : 'Actualizar imagen con telemetría de NASA SDO en tiempo real'}
                aria-label="Recargar imagen SDO en tiempo real"
              >
                <span className={isRefreshing ? 'animate-spin inline-block' : 'inline-block'}>🔄</span>
                <span>{isRefreshing ? (isEn ? 'Syncing...' : 'Sincronizando...') : `${countdown}s`}</span>
              </button>
            </div>

            {/* Overlay inferior: Información espectroscópica detallada */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 z-10">
              <div className="flex items-end justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-base font-bold font-mono px-2 py-0.5 rounded-md text-black"
                      style={{ backgroundColor: activeWL.color }}
                    >
                      {activeWL.label}
                    </span>
                    <span className="text-xs font-semibold text-white truncate">
                      {activeWL.desc}
                    </span>
                  </div>
                  <div className="text-[11px] text-white/50 mt-1">
                    🌡️ {activeWL.temperature} · {activeWL.features}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-white/40 font-mono">
                    {lastFetchTime.toLocaleTimeString()}
                  </div>
                  <div className="text-[10px] text-solar-400/80 font-mono">
                    NASA / SDO Oficial
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Selector de Longitudes de Onda */}
      <div className="mt-4 grid grid-cols-4 gap-1.5 sm:gap-2">
        {WAVELENGTHS.map((wl) => {
          const isSelected = selectedSource === wl.key
          return (
            <button
              key={wl.key}
              onClick={() => setSelectedSource(wl.key)}
              className={`py-2 px-1 sm:px-2 rounded-xl text-xs font-semibold transition-all duration-200 border text-center flex flex-col items-center justify-center gap-0.5 active:scale-95 cursor-pointer ${
                isSelected
                  ? 'text-black font-bold shadow-lg'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
              style={
                isSelected
                  ? { backgroundColor: wl.color, borderColor: wl.color, boxShadow: `0 0 15px ${wl.color}40` }
                  : {}
              }
              aria-label={`Seleccionar espectro ${wl.label} ${wl.desc}`}
            >
              <span className="font-mono text-[11px] font-bold">{wl.label}</span>
              <span className="text-[9px] opacity-80 truncate max-w-full">{wl.desc.split(' ')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Pie de imagen informativo con botón de recarga adicional */}
      <div className="flex flex-wrap items-center justify-between text-xs text-white/40 mt-3 px-1 gap-2">
        <span>🛰️ {isEn ? 'SDO & SOHO Satellites in Orbit' : isPt ? 'Satélites SDO e SOHO em Órbita' : 'Satélites SDO & SOHO en Órbita'}</span>
        <button
          onClick={() => updateImage(true)}
          className="text-solar-400/90 hover:text-solar-300 font-mono text-[11px] flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
        >
          <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
          <span>{isRefreshing ? (isEn ? 'Reloading...' : 'Recargando...') : (isEn ? 'Reload SDO Live' : 'Recargar en Tiempo Real')}</span>
        </button>
      </div>
    </div>
  )
}
