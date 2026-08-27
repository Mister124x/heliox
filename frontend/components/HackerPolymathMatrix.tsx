'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n'

interface HeliophysicsMetrics {
  speed_km_s: number
  bz_nT: number
  bt_nT: number
  density_p_cm3: number
  temperature_K: number
}

export default function HackerPolymathMatrix({
  telemetry = {
    speed_km_s: 438,
    bz_nT: -1.8,
    bt_nT: 4.9,
    density_p_cm3: 5.2,
    temperature_K: 89000,
  },
}: {
  telemetry?: HeliophysicsMetrics
}) {
  const { lang } = useI18n()
  const isEn = lang === 'en'

  const [activeMetricTab, setActiveMetricTab] = useState<'alfven' | 'beta' | 'schumann' | 'drap' | 'fleet'>('alfven')

  // Constantes físicas del plasma espacial
  const mu_0 = 4 * Math.PI * 1e-7 // Permeabilidad del vacío
  const m_p = 1.6726e-27 // Masa del protón (kg)
  const k_B = 1.380649e-23 // Constante de Boltzmann

  // 1. Cálculo de Velocidad de Alfvén (v_A = B / sqrt(mu_0 * rho)) en km/s
  const B_tesla = (telemetry.bt_nT || 5.0) * 1e-9
  const rho_kg_m3 = (telemetry.density_p_cm3 || 5.0) * 1e6 * m_p
  const alfvenSpeed_km_s = (B_tesla / (Math.sqrt(mu_0 * rho_kg_m3) * 1000)).toFixed(1)

  // 2. Número de Mach de Alfvén (M_A = v_sw / v_A)
  const machNumber = (telemetry.speed_km_s / Math.max(Number(alfvenSpeed_km_s), 10)).toFixed(2)

  // 3. Plasma Beta (Beta = 2 * mu_0 * n * k_B * T / B^2)
  const n_m3 = (telemetry.density_p_cm3 || 5.0) * 1e6
  const T_kelvin = telemetry.temperature_K || 89000
  const thermalPressure = 2 * n_m3 * k_B * T_kelvin
  const magneticPressure = Math.pow(B_tesla, 2) / (2 * mu_0)
  const plasmaBeta = (thermalPressure / Math.max(magneticPressure, 1e-18)).toFixed(2)

  // 4. Corte de Frecuencia D-RAP (Absorción de Radio HF en MHz)
  const dRapFrequency_MHz = (Math.max(1.5, Math.abs(telemetry.bz_nT) * 2.1)).toFixed(1)

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-black/90 border border-white/10 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Fondo Hacker Terminal */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-emerald-500 pointer-events-none" />

      {/* Cabecera del Módulo Polímata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>HACKER-POLYMATH HELIOPHYSICS & QUANTUM PLASMA MATRIX</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {isEn ? 'Advanced Quantum & Magnetohydrodynamic (MHD) Telemetry' : 'Telemetría Magnetohidrodinámica (MHD) y Física Cuántica del Plasma'}
          </h3>
        </div>

        <span className="text-xs font-mono text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl self-start md:self-auto">
          Resolución: 100 Hz · Modelo CCMC NASA
        </span>
      </div>

      {/* ─── Pestañas de Métricas Avanzadas ────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'alfven', label: '⚡ Velocidad de Alfvén (v_A)', icon: '🌊' },
          { id: 'beta', label: '🔥 Plasma Beta (β_p)', icon: '⚛️' },
          { id: 'schumann', label: '🌍 Resonancias de Schumann', icon: '📡' },
          { id: 'drap', label: '📻 Absorción HF (D-RAP)', icon: '📶' },
          { id: 'fleet', label: '🛰️ Flota Espacio Profundo', icon: '🚀' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMetricTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
              activeMetricTab === tab.id
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/25'
                : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ─── Panel Detallado de la Métrica Activa ───────────────────────── */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
        {/* 1. VELOCIDAD DE ALFVÉN */}
        {activeMetricTab === 'alfven' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Ondas Magnetohidrodinámicas de Alfvén</span>
                <h4 className="text-lg font-bold text-white">Velocidad de propagación de perturbaciones magnéticas</h4>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black font-mono text-emerald-400">{alfvenSpeed_km_s} <span className="text-sm text-white/40">km/s</span></div>
                <div className="text-[11px] font-mono text-white/40">Número de Mach (M_A): <strong className="text-white">{machNumber}</strong> (Supersónico)</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs text-white/80 space-y-1">
              <div className="text-emerald-300 font-bold">Ecuación Fundamental de Hannes Alfvén (Premio Nobel 1970):</div>
              <div className="text-base sm:text-lg text-white font-bold my-2">
                v_A = B / √(μ₀ · ρ) = {alfvenSpeed_km_s} km/s
              </div>
              <p className="text-[11px] text-white/50">
                Determina la velocidad a la cual las ondas de plasma y las torsiones magnéticas viajan desde la corona solar hasta el arco de choque terrestre (Bow Shock).
              </p>
            </div>
          </div>
        )}

        {/* 2. PLASMA BETA */}
        {activeMetricTab === 'beta' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-orange-400 uppercase font-bold">Parámetro Adimensional de Confinamiento</span>
                <h4 className="text-lg font-bold text-white">Relación entre Presión Térmica y Presión Magnética (β_p)</h4>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black font-mono text-orange-400">{plasmaBeta}</div>
                <div className="text-[11px] font-mono text-white/40">
                  {Number(plasmaBeta) < 1 ? 'Régimen Dominado por Campo Magnético (β < 1)' : 'Régimen Hidrodinámico (β > 1)'}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs text-white/80 space-y-1">
              <div className="text-orange-300 font-bold">Régimen Físico del Viento Solar:</div>
              <div className="text-base sm:text-lg text-white font-bold my-2">
                β = (2 · μ₀ · n · k_B · T) / B² = {plasmaBeta}
              </div>
              <p className="text-[11px] text-white/50">
                Cuando β &lt; 1, las líneas de campo magnético solar guían y atrapan el flujo de partículas. Durante eyecciones de masa coronal (CME), β se desploma por debajo de 0.1 debido a campos magnéticos ultradensos.
              </p>
            </div>
          </div>
        )}

        {/* 3. RESONANCIAS DE SCHUMANN */}
        {activeMetricTab === 'schumann' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase font-bold">Cavidad Ionosférica Terrestre</span>
                <h4 className="text-lg font-bold text-white">Espectro de Resonancia Electromagnética Global</h4>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black font-mono text-purple-400">7.83 <span className="text-sm text-white/40">Hz</span></div>
                <div className="text-[11px] font-mono text-white/40">Modo Fundamental n=1</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { harmonic: 'Modo 1 (Fundamental)', freq: '7.83 Hz', status: 'Estable · Cavidad Tierra-Ionosfera' },
                { harmonic: 'Modo 2 (1º Armónico)', freq: '14.3 Hz', status: 'Sensible a Rayos X Solares' },
                { harmonic: 'Modo 3 (2º Armónico)', freq: '20.8 Hz', status: 'Perturbación por CMEs' },
              ].map((h) => (
                <div key={h.harmonic} className="p-3 bg-black rounded-xl border border-white/10 text-center">
                  <div className="text-base font-bold font-mono text-purple-300">{h.freq}</div>
                  <div className="text-[10px] text-white/70 font-semibold mt-0.5">{h.harmonic}</div>
                  <div className="text-[9px] text-white/40 mt-1">{h.status}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. D-RAP ABSORCIÓN HF */}
        {activeMetricTab === 'drap' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase font-bold">Modelo D-Region Absorption Prediction (NOAA)</span>
                <h4 className="text-lg font-bold text-white">Frecuencia de Corte de Absorción de Radio HF</h4>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black font-mono text-blue-400">{dRapFrequency_MHz} <span className="text-sm text-white/40">MHz</span></div>
                <div className="text-[11px] font-mono text-white/40">Frecuencia Máxima Absorbida (f_max)</div>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              Durante eventos de llamaradas de clase M y X, los rayos X solares ionizan fuertemente la capa D de la ionosfera terrestre (60–90 km de altitud), absorbiendo las ondas de radio de alta frecuencia (HF 3–30 MHz) utilizadas en navegación aérea transatlántica y comunicaciones militares.
            </p>
          </div>
        )}

        {/* 5. FLOTA ESPACIO PROFUNDO */}
        {activeMetricTab === 'fleet' && (
          <div className="space-y-4">
            <span className="text-xs font-mono text-yellow-400 uppercase font-bold">Centros de Telemetría Heliofísica en el Sistema Solar</span>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { name: 'Parker Solar Probe', distance: '6.9 millones km del Sol', speed: '635,266 km/h', mission: 'Tocando la Corona Solar' },
                { name: 'SOHO / LASCO (Punto L1)', distance: '1.5 millones km de la Tierra', speed: 'Órbita Halo L1', mission: 'Detección temprana de CME' },
                { name: 'STEREO-A (Ahead)', distance: '0.96 UA del Sol', speed: 'Órbita Heliocéntrica', mission: 'Vista 3D Estereoscópica' },
              ].map((sat) => (
                <div key={sat.name} className="p-4 bg-black rounded-xl border border-white/10 space-y-1">
                  <div className="font-bold text-white text-xs">{sat.name}</div>
                  <div className="text-[11px] font-mono text-yellow-400">{sat.distance}</div>
                  <div className="text-[10px] text-white/50">{sat.mission} · {sat.speed}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
