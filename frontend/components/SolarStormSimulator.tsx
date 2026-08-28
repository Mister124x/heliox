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

  // Mensaje para compartir en WhatsApp
  const shareText = encodeURIComponent(
    `🚨 ¡Calculé el impacto solar en ${selectedRegion.name}! Con una tormenta Kp=${testKp}, el riesgo de GPS es de ±${gpsDriftMeters}m y probabilidad de auroras del ${auroraProbability}%. Haz tu diagnóstico en vivo en HELIOX (por Jesús Barrios): https://heliox-observatory.vercel.app`
  )

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
              : 'Selecciona tu región geográfica y desliza el nivel de tormenta Kp para simular la desviación del GPS, estrés en redes eléctricas y probabilidad de auroras.'}
          </p>
        </div>
      </div>

      {/* Controles Interactivos */}
      <div className="grid md:grid-cols-2 gap-6 relative z-10 mb-6">
        {/* Selector de Región */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-white/70 uppercase block font-bold">
            1. Selecciona tu Ubicación / Región:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {REGIONS.map((region) => (
              <button
                key={region.name}
                onClick={() => setSelectedRegion(region)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                  selectedRegion.name === region.name
                    ? 'bg-orange-500 text-black font-bold border-orange-400 shadow-lg shadow-orange-500/25'
                    : 'bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{region.flag}</span>
                <span className="truncate">{region.name.split('/')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Slider de Kp */}
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

      {/* Botón de Compartir Diagnóstico en WhatsApp */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <span className="text-xs text-white/60 text-center sm:text-left">
          ¿Quieres compartir este diagnóstico simulado con tus amigos o en redes?
        </span>
        <a
          href={`https://api.whatsapp.com/send?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/30 font-mono shrink-0"
        >
          <span>💬</span>
          <span>Compartir Diagnóstico en WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
