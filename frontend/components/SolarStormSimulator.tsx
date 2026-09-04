'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n'

interface Region {
  name: string
  lat: number
  flag: string
  geomagLat: number
}

const REGIONS: Region[] = [
  { name: 'Bogotá / Colombia / Andina', lat: 4.7, geomagLat: 15.2, flag: '🇨🇴' },
  { name: 'Ciudad de México / Centroamérica', lat: 19.4, geomagLat: 28.5, flag: '🇲🇽' },
  { name: 'Madrid / España / Sur de Europa', lat: 40.4, geomagLat: 42.1, flag: '🇪🇸' },
  { name: 'Buenos Aires / Cono Sur', lat: -34.6, geomagLat: -24.8, flag: '🇦🇷' },
  { name: 'Santiago / Chile / Patagonia', lat: -33.4, geomagLat: -23.1, flag: '🇨🇱' },
  { name: 'Miami / Sur de EE.UU.', lat: 25.7, geomagLat: 36.4, flag: '🇺🇸' },
  { name: 'Nueva York / Norte de EE.UU.', lat: 40.7, geomagLat: 51.2, flag: '🇺🇸' },
  { name: 'Londres / Norte de Europa', lat: 51.5, geomagLat: 53.8, flag: '🇬🇧' },
]

export default function SolarStormSimulator() {
  const { lang } = useI18n()
  const isEn = lang === 'en'

  const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0])
  const [testKp, setTestKp] = useState<number>(6)
  const [copiedReport, setCopiedReport] = useState(false)

  // Cálculos dinámicos según Kp y Latitud Geomagnética
  const absGeomag = Math.abs(selectedRegion.geomagLat)
  
  // Umbral de Kp necesario para ver auroras en esta latitud
  const requiredKpForAurora = Math.max(3, Math.round(9 - (absGeomag - 20) * 0.15))
  const auroraProbability = testKp >= requiredKpForAurora
    ? Math.min(95, 40 + (testKp - requiredKpForAurora) * 20)
    : Math.max(2, Math.round((testKp / requiredKpForAurora) * 15))

  // Impacto en GPS (desviación en metros)
  const gpsDriftMeters = (testKp * 1.8 * (testKp > 6 ? 2.5 : 1)).toFixed(1)

  // Impacto en Red Eléctrica (GIC - Geomagnetically Induced Currents)
  const gicRisk = testKp < 5 ? 'Bajo / Normal' : testKp < 7 ? 'Moderado (G2-G3)' : 'Crítico (G4-G5)'
  const gicColor = testKp < 5 ? 'text-emerald-400' : testKp < 7 ? 'text-yellow-400' : 'text-red-400'

  // Texto del reporte para copiar y compartir
  const reportText = `🚨 REPORTE DE IMPACTO SOLAR — HELIOX
📍 Ubicación: ${selectedRegion.name}
🛰️ Latitud Geomagnética: ${selectedRegion.geomagLat}°
⚡ Nivel de Tormenta: Kp ${testKp} (Escala NOAA G${testKp >= 5 ? testKp - 4 : 0})
🌌 Probabilidad de Auroras: ${auroraProbability}%
📡 Desviación de Señal GPS: ±${gpsDriftMeters}m
⚡ Riesgo en Red Eléctrica: ${gicRisk}
🔗 Monitoreo en tiempo real por JESÚS BARRIOS: https://heliox-observatory.vercel.app`

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportText)
    setCopiedReport(true)
    setTimeout(() => setCopiedReport(false), 2500)
  }

  const shareWhatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(reportText)}`
  const shareTwitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(reportText)}`

  return (
    <div className="solar-card p-6 sm:p-8 relative overflow-hidden my-10 border border-orange-500/30 bg-gradient-to-b from-orange-950/20 via-black to-black">
      {/* Fondo Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-mono font-bold mb-2">
            <span>⚡</span>
            <span>SIMULADOR INTERACTIVO DE IMPACTO GEOMAGNÉTICO</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isEn ? 'Calculate Solar Storm Impact on Your City & Region' : 'Calcula el Impacto de una Tormenta Solar en tu Ciudad'}
          </h3>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl">
            {isEn
              ? 'Select your geographical region and test different Kp storm index levels to simulate GPS drift, power grid stress, and aurora visibility.'
              : 'Selecciona tu región geográfica y elige el nivel de tormenta Kp (5 a 9) para simular la desviación del GPS, estrés en redes eléctricas y probabilidad de auroras.'}
          </p>
        </div>
      </div>

      {/* Controles Interactivos */}
      <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-6">
        {/* Selector de Región (Bogotá, CDMX, Madrid, Buenos Aires, Santiago, Miami...) */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-white/70 uppercase block font-bold">
            1. Selecciona tu Ciudad / Región:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {REGIONS.map((region) => (
              <button
                key={region.name}
                onClick={() => setSelectedRegion(region)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-2 active:scale-95 ${
                  selectedRegion.name === region.name
                    ? 'bg-orange-500 text-black font-bold border-orange-400 shadow-lg shadow-orange-500/25'
                    : 'bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{region.flag}</span>
                <span className="truncate font-semibold">{region.name.split('/')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selector y Botones de Nivel Kp (Kp 5 a Kp 9) */}
        <div className="space-y-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono text-white/70 uppercase font-bold">
                2. Nivel de Tormenta Kp simulado:
              </label>
              <span className="text-2xl font-black font-mono text-orange-400">
                Kp {testKp} {testKp >= 5 ? `(G${testKp - 4})` : '(G0)'}
              </span>
            </div>

            {/* Botones de Selección Rápida Kp 5 a Kp 9 */}
            <div className="mb-3">
              <span className="text-[11px] font-mono text-white/50 block mb-1.5 font-semibold">
                Botones de Nivel Kp (Escala de Tormenta G1 a G5):
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {[5, 6, 7, 8, 9].map((kpVal) => {
                  const isSelected = testKp === kpVal
                  const gLevel = kpVal - 4
                  return (
                    <button
                      key={kpVal}
                      type="button"
                      onClick={() => setTestKp(kpVal)}
                      className={`py-2 px-1 rounded-xl text-xs font-mono font-bold border transition-all text-center flex flex-col items-center justify-center active:scale-95 ${
                        isSelected
                          ? 'bg-orange-500 text-black border-orange-400 shadow-lg shadow-orange-500/30'
                          : 'bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span>Kp {kpVal}</span>
                      <span className="text-[10px] opacity-80">G{gLevel}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="9"
              step="1"
              value={testKp}
              onChange={(e) => setTestKp(Number(e.target.value))}
              className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />

            <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
              <span>Kp 1 (Calma)</span>
              <span>Kp 5 (G1 Menor)</span>
              <span>Kp 7 (G3 Fuerte)</span>
              <span>Kp 9 (G5 Extrema)</span>
            </div>
          </div>

          <div className="text-xs text-white/50 bg-black/40 p-2.5 rounded-xl border border-white/5">
            📍 Latitud Geomagnética simulada: <strong className="text-white font-mono">{selectedRegion.geomagLat}°</strong>
          </div>
        </div>
      </div>

      {/* Tarjetas de Resultados Simulados en Tiempo Real */}
      <div className="grid sm:grid-cols-3 gap-4 relative z-10">
        {/* 1. Auroras */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
          <div className="text-[11px] font-mono text-purple-400 uppercase font-bold flex items-center gap-1.5">
            <span>🌌</span> Visibilidad de Auroras
          </div>
          <div className="text-3xl font-black font-mono text-white">
            {auroraProbability}%
          </div>
          <p className="text-xs text-white/60">
            {auroraProbability > 60
              ? '¡Alta probabilidad de ver auroras en tu horizonte norte/sur con cielo despejado!'
              : auroraProbability > 25
              ? 'Posible en zonas rurales altas sin contaminación lumínica.'
              : 'Baja probabilidad; se requiere tormenta G4 o superior en esta latitud.'}
          </p>
        </div>

        {/* 2. GPS */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
          <div className="text-[11px] font-mono text-blue-400 uppercase font-bold flex items-center gap-1.5">
            <span>🛰️</span> Desviación de Señal GPS
          </div>
          <div className="text-3xl font-black font-mono text-white">
            ±{gpsDriftMeters} <span className="text-sm text-white/40">metros</span>
          </div>
          <p className="text-xs text-white/60">
            {Number(gpsDriftMeters) > 10
              ? 'Degradación severa en navegación aérea, marítima y drones de precisión.'
              : 'Desviación ionosférica leve dentro de los rangos estándar de error.'}
          </p>
        </div>

        {/* 3. Redes Eléctricas */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
          <div className="text-[11px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
            <span>⚡</span> Riesgo en Redes y Transformadores
          </div>
          <div className={`text-2xl font-black font-mono ${gicColor}`}>
            {gicRisk}
          </div>
          <p className="text-xs text-white/60">
            {testKp >= 7
              ? 'Inducción de corrientes geomagnéticas (GIC) en líneas de alta tensión.'
              : 'Operación normal de la infraestructura de distribución energética.'}
          </p>
        </div>
      </div>

      {/* Botones de Compartir y Copiar Reporte */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <span className="text-xs text-white/60 text-center sm:text-left">
          ¿Quieres compartir este diagnóstico con tus amigos o guardar el reporte?
        </span>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
          {/* Botón WhatsApp */}
          <a
            href={shareWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 font-mono"
            title="Compartir en WhatsApp"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </a>

          {/* Botón X / Twitter */}
          <a
            href={shareTwitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 transition-all flex items-center gap-1.5 font-mono"
            title="Compartir en X / Twitter"
          >
            <span>𝕏</span>
            <span>Post en X</span>
          </a>

          {/* Botón Copiar Reporte con Toast */}
          <button
            type="button"
            onClick={handleCopyReport}
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 active:scale-95 text-black transition-all flex items-center gap-1.5 shadow-lg shadow-orange-500/20 font-mono cursor-pointer"
            title="Copiar reporte al portapapeles"
          >
            <span>{copiedReport ? '✅' : '📋'}</span>
            <span>{copiedReport ? '¡Copiado al portapapeles!' : 'Copiar Reporte'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
