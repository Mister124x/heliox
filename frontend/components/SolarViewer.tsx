'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const WAVELENGTHS = [
  { key: 'aia_304', label: '304Å', color: '#ef4444', desc: 'Cromosfera' },
  { key: 'aia_171', label: '171Å', color: '#60a5fa', desc: 'Corona' },
  { key: 'aia_193', label: '193Å', color: '#22c55e', desc: 'Plasma caliente' },
  { key: 'aia_211', label: '211Å', color: '#a855f7', desc: 'Regiones activas' },
  { key: 'aia_131', label: '131Å', color: '#3b82f6', desc: 'Llamaradas' },
  { key: 'hmi_mag', label: 'HMI', color: '#9ca3af', desc: 'Campo magnético' },
  { key: 'lasco_c2', label: 'LASCO C2', color: '#fbbf24', desc: 'Coronógrafo CME' },
]

interface SolarViewerProps {
  compact?: boolean
}

export default function SolarViewer({ compact = false }: SolarViewerProps) {
  const [selectedSource, setSelectedSource] = useState('aia_304')
  const [imageData, setImageData] = useState<{
    image_url: string; date: string; description: string; credits: string; fallback?: boolean
  } | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchImage = async (source: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/solar/live?source=${source}`)
      const json = await res.json()
      setImageData(json.data)
    } catch {
      // Fallback directo a NASA SDO si la API falla
      const wl: Record<string, string> = {
        aia_171: '0171', aia_304: '0304', aia_193: '0193',
        aia_211: '0211', aia_131: '0131', hmi_mag: 'HMIB',
      }
      setImageData({
        image_url: `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_${wl[source] ?? '0304'}.jpg`,
        date: new Date().toISOString(),
        description: WAVELENGTHS.find(w => w.key === source)?.desc ?? '',
        credits: 'Cortesía de NASA/SDO',
        fallback: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImage(selectedSource)
    // Refrescar imagen cada 5 minutos
    const interval = setInterval(() => fetchImage(selectedSource), 5 * 60_000)
    return () => clearInterval(interval)
  }, [selectedSource])

  const activeWL = WAVELENGTHS.find(w => w.key === selectedSource)

  return (
    <div className={compact ? 'w-full' : 'w-full max-w-lg'}>
      {/* Imagen del sol */}
      <div className="relative rounded-3xl overflow-hidden bg-black solar-glow">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSource}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square"
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                <div className="w-16 h-16 rounded-full border-4 border-solar-500 border-t-transparent animate-spin" />
              </div>
            ) : imageData?.image_url ? (
              <Image
                src={imageData.image_url}
                alt={`Sol — ${imageData.description}`}
                fill
                className="object-cover animate-pulse-solar"
                unoptimized  // imágenes externas sin caché Next
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <span className="text-6xl">☀️</span>
              </div>
            )}

            {/* Overlay de info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-end justify-between">
                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: activeWL?.color }}
                  >
                    {activeWL?.label} — {activeWL?.desc}
                  </div>
                  {imageData?.date && (
                    <div className="text-xs text-white/50">
                      {new Date(imageData.date).toLocaleString('es-CO')}
                    </div>
                  )}
                </div>
                <div className="text-xs text-white/30 text-right">
                  {imageData?.fallback ? '🔄 NASA SDO directo' : '🛰️ Helioviewer'}
                </div>
              </div>
            </div>

            {/* Indicador en vivo */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="text-xs font-semibold text-red-400">EN VIVO</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Selector de longitud de onda */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {WAVELENGTHS.map((wl) => (
          <button
            key={wl.key}
            onClick={() => setSelectedSource(wl.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
              selectedSource === wl.key
                ? 'text-black'
                : 'bg-transparent text-white/60 border-white/20 hover:border-white/40'
            }`}
            style={selectedSource === wl.key
              ? { backgroundColor: wl.color, borderColor: wl.color }
              : {}
            }
          >
            {wl.label}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-white/30 mt-3">
        {imageData?.credits ?? 'Cortesía de NASA/SDO'}
      </p>
    </div>
  )
}
