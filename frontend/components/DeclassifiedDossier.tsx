'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../lib/i18n'

interface DossierItem {
  id: string
  code: string
  classification: string
  title: string
  year: string
  agency: string
  summary: string
  officialEvidence: string
  threatLevel: string
  badgeColor: string
}

const DECLASSIFIED_FILES: DossierItem[] = [
  {
    id: 'may-1967-nuclear',
    code: 'DOC-USAF-1967-0523',
    classification: 'DESCLASIFICADO (DoD / USAF 2016)',
    title: 'La Llamarada Solar de 1967 que Casi Desata la Tercera Guerra Mundial',
    year: '23 de Mayo, 1967',
    agency: 'Fuerza Aérea de EE.UU. (USAF) & NORAD',
    summary:
      'Una llamarada solar extrema emitió una ráfaga de ondas de radio que cegó simultáneamente los tres radares nucleares de alerta temprana BMEWS en Alaska, Groenlandia y Reino Unido. El comando militar de EE.UU. asumió un ataque electromagnético soviético y preparó bombarderos con ojivas nucleares en pista de despegue. La catástrofe se evitó en el último minuto cuando los astrónomos solares de NORAD confirmaron que el responsable era el Sol.',
    officialEvidence: 'Boletín Oficial de la Sociedad Meteorológica Americana (AMS, DOI: 10.1175/BAMS-D-14-00233.1)',
    threatLevel: 'Guerra Termonuclear Inminente por Interferencia Solar',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30',
  },
  {
    id: 'starfish-prime',
    code: 'DOD-AEC-FISHBOWL-62',
    classification: 'DOCUMENTO OFICIAL (Defense Atomic Support Agency)',
    title: 'Operación Starfish Prime: El Pulso Electromagnético Espacial',
    year: '9 de Julio, 1962',
    agency: 'Departamento de Defensa de EE.UU. & AEC',
    summary:
      'Una ojiva termonuclear de 1.4 megatones fue detonada a 400 km de altitud sobre el Océano Pacífico. El pulso electromagnético (EMP) resultante apagó 300 farolas en Hawái a 1,400 km de distancia, destruyó 8 satélites en órbita baja y creó un cinturón de radiación artificial que persistió durante más de 10 años.',
    officialEvidence: 'Informe Técnico DASA-1308, Archivos Nacionales de EE.UU. (NARA)',
    threatLevel: 'Destrucción de Constelaciones Satelitales LEO',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  },
  {
    id: 'saa-vortex',
    code: 'NASA-ESA-SAA-ANOMALY',
    classification: 'ANOMALÍA GEOFÍSICA OFICIAL',
    title: 'La Anomalía del Atlántico Sur: La Grieta Magnética de Sudamérica',
    year: 'Monitoreo Continuo 2026',
    agency: 'NASA Goddard & Misión Swarm de la ESA',
    summary:
      'Sobre Sudamérica y el Océano Atlántico Sur, el campo magnético de la Tierra se encuentra debilitado en un 32%, permitiendo que los cinturones de radiación de Van Allen desciendan a solo 200 km de altitud. Todos los satélites, la Estación Espacial Internacional (ISS) y el Telescopio Hubble deben apagar sus instrumentos electrónicos críticos al sobrevolar la región para evitar reinicios por impacto de protones solares.',
    officialEvidence: 'División de Heliofísica de la NASA & Agencia Espacial Europea (ESA Swarm Constellation)',
    threatLevel: 'Zona de Exclusión Electrónica Orbital',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  {
    id: 'miyake-events',
    code: 'NATURE-CARBON14-MIYAKE',
    classification: 'REGISTRO CIENTÍFICO ARQUEOMAGNÉTICO',
    title: 'Eventos Miyake: Super-Erupciones Solares 80 Veces Superiores a Carrington',
    year: '774 d.C. & 993 d.C.',
    agency: 'Revista Nature & Universidad de Nagoya',
    summary:
      'El análisis isotópico de anillos de árboles milenarios y núcleos de hielo de Groenlandia reveló picos masivos de Carbono-14 y Berilio-10. Estas supertormentas solares multiplicaron por 80 la radiación del Evento Carrington de 1859. Un evento Miyake hoy colapsaría la totalidad de la red de satélites GPS, internet submarino y transformadores de energía globales en menos de 24 horas.',
    officialEvidence: 'Nature Communications (DOI: 10.1038/ncomms1748) & PNAS',
    threatLevel: 'Colapso de la Civilización Digital',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30',
  },
  {
    id: 'ppd-40-directive',
    code: 'WHITEHOUSE-EOP-PPD40',
    classification: 'DIRECTIVA PRESIDENCIAL DE SEGURIDAD',
    title: 'Directiva Presidencial PPD-40: Planes de Apagón de Red por Clima Espacial',
    year: 'Vigente 2026',
    agency: 'Executive Office of the President (EOP) & FERC-NERC',
    summary:
      'Protocolos gubernamentales confidenciales que autorizan a los operadores de redes de alta tensión a desconectar subestaciones eléctricas continentales de 500 kV y aislar transformadores clave cuando los satélites DSCOVR y SOHO en el punto L1 detecten una CME súper rápida con componente Bz negativo severo.',
    officialEvidence: 'Federal Energy Regulatory Commission (FERC Standard TPL-007-4) & White House Strategy',
    threatLevel: 'Aislamiento Forzoso de Redes Eléctricas Nacionales',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
]

export default function DeclassifiedDossier() {
  const { lang } = useI18n()
  const isEn = lang === 'en'

  const [activeDossier, setActiveDossier] = useState<DossierItem>(DECLASSIFIED_FILES[0])

  return (
    <section className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera del Dossier */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-mono font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>ARCHIVOS DESCLASIFICADOS & ANOMALÍAS ESPACIALES OFICIALES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            {isEn
              ? 'Declassified Dossier: Secret Space Weather Incidents & Real Threats'
              : 'Dossier Desclasificado: Incidentes Secretos de Clima Espacial y Amenazas Reales'}
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            {isEn
              ? 'Every record is 100% backed by declassified military documents, NASA telemetry, and peer-reviewed scientific journals. Never speculative — always official facts.'
              : 'Cada expediente está respaldado al 100% por documentos militares desclasificados, telemetría de la NASA y revistas científicas arbitradas. Cero especulación, 100% hechos oficiales.'}
          </p>
        </div>

        {/* Layout Interactivo del Dossier */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Navegador de Expedientes */}
          <div className="lg:col-span-1 space-y-2">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest px-2 mb-2 flex justify-between">
              <span>EXPEDIENTES OFICIALES</span>
              <span className="text-red-400 font-bold">5 DOCUMENTOS</span>
            </div>

            <div className="space-y-2">
              {DECLASSIFIED_FILES.map((file) => {
                const isActive = activeDossier.id === file.id
                return (
                  <button
                    key={file.id}
                    onClick={() => setActiveDossier(file)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all space-y-1.5 ${
                      isActive
                        ? 'bg-red-950/40 border-red-500/80 shadow-lg shadow-red-500/15 scale-[1.02]'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                        {file.code}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono">{file.year.split(',')[0]}</span>
                    </div>
                    <div className="text-xs font-bold text-white leading-snug line-clamp-2">
                      {file.title}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Visor de Expediente Desclasificado */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDossier.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl bg-black border border-white/15 relative overflow-hidden space-y-6 shadow-2xl"
              >
                {/* Sello de Clasificación Oficial */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${activeDossier.badgeColor}`}>
                      {activeDossier.classification}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                      {activeDossier.title}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono text-orange-400 font-bold">{activeDossier.year}</div>
                    <div className="text-[10px] font-mono text-white/40">{activeDossier.agency}</div>
                  </div>
                </div>

                {/* Resumen del Hecho Histórico */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-white/40 tracking-wider">
                    Hechos Oficiales Documentados:
                  </h4>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans">
                    {activeDossier.summary}
                  </p>
                </div>

                {/* Nivel de Amenaza y Evidencia */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-red-400 uppercase font-bold">Nivel de Impacto:</div>
                    <div className="text-xs font-bold text-white">{activeDossier.threatLevel}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Evidencia / Fuente Oficial:</div>
                    <div className="text-xs font-mono text-white/70 select-all">{activeDossier.officialEvidence}</div>
                  </div>
                </div>

                {/* Cita de Cierre */}
                <div className="p-3 bg-red-500/5 border-l-2 border-red-500 rounded-r-xl text-xs text-white/50 font-mono">
                  Registro catalogado en la base de datos de investigación de <strong>JESÚS BARRIOS · HELIOX Solar Observatory</strong>.
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
