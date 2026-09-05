'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../lib/i18n'

export default function VIPAlertBar() {
  const { lang } = useI18n()
  const isEn = lang === 'en'

  const [isOpen, setIsOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const nequiNumber = '3245884678'
  const daviplataNumber = '3245884678'
  const bancolombiaNumber = '488474988372'
  const paypalUser = 'JesusBarriosGiraldo'
  const holderName = 'JESÚS BARRIOS'

  const whatsappActivationUrl = `https://api.whatsapp.com/send?phone=573245884678&text=${encodeURIComponent(
    '¡Hola Jesús! Quiero activar mi acceso VIP a las Alertas Tempranas de Tormentas Solares y Auroras en HELIOX.'
  )}`

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2500)
  }

  if (isDismissed) return null

  return (
    <>
      {/* ─── BARRA FLOTANTE INFERIOR FIJA ─────────────────────────────────── */}
      <aside aria-label="Alerta VIP" className="fixed bottom-0 left-0 right-0 z-40 p-2.5 sm:p-3 bg-black/90 backdrop-blur-xl border-t border-orange-500/40 shadow-2xl shadow-orange-500/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="flex h-3 w-3 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-[10px] uppercase font-mono font-bold bg-orange-500 text-black px-1.5 py-0.5 rounded">
                  {isEn ? 'EARLY WARNING VIP' : 'ALERTAS VIP WHATSAPP'}
                </span>
                <span className="text-xs font-mono text-orange-300 font-bold">
                  {isEn ? '$3 USD / $10.000 COP' : '$10.000 COP / $3 USD'}
                </span>
              </div>
              <p className="text-xs text-white/90 font-medium line-clamp-1 mt-0.5">
                {isEn
                  ? 'Get real-time solar flare & G5 storm alerts sent directly to your phone before grid/GPS disruptions.'
                  : 'Recibe alertas críticas de llamaradas Clase X y tormentas solares en tu WhatsApp antes del impacto.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-black hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-orange-500/30 font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <span>📲</span>
              <span>{isEn ? 'Get VIP Access' : 'Activar Acceso VIP'}</span>
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 text-xs transition-colors"
              title="Cerrar barra"
              aria-label="Cerrar barra"
            >
              ✕
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MODAL DE PAGO INMEDIATO Y ACTIVACIÓN ─────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-zinc-950 border border-orange-500/40 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative space-y-5"
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-lg text-sm"
              >
                ✕
              </button>

              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-3xl">
                  🛰️
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {isEn ? 'Join HELIOX VIP Alert Network' : 'Únete a la Red VIP de Alertas HELIOX'}
                </h3>
                <p className="text-xs text-white/60">
                  {isEn
                    ? 'Instant space weather notifications, aurora forecasts & direct WhatsApp support from Jesús Barrios.'
                    : 'Alertas inmediatas de eyecciones CME, auroras boreales y soporte directo por WhatsApp con Jesús Barrios.'}
                </p>
              </div>

              {/* Planes Rápidos */}
              <div className="p-4 rounded-2xl bg-orange-950/20 border border-orange-500/30 text-center">
                <div className="text-xs font-mono text-orange-400 font-bold uppercase">
                  Acceso Vitalicio Ciclo Solar 25 (2024–2026)
                </div>
                <div className="text-3xl font-mono font-black text-white mt-1">
                  $10.000 <span className="text-xs text-white/60">COP</span> / $3 <span className="text-xs text-white/60">USD</span>
                </div>
                <div className="text-[11px] text-white/50 mt-0.5">
                  Pago único directo · Sin suscripciones automáticas
                </div>
              </div>

              {/* Opciones de Pago Inmediato */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-white/50 font-bold">
                  1. Realiza tu transferencia a cualquiera de estas cuentas:
                </div>

                {/* Nequi */}
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-purple-300">🟣 Nequi / Daviplata</div>
                    <div className="font-mono text-lg font-bold text-white">{nequiNumber}</div>
                    <div className="text-[10px] text-white/40">Titular: {holderName}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(nequiNumber, 'nequi')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white font-mono active:scale-95"
                  >
                    {copied === 'nequi' ? '✅ Copiado' : 'Copiar'}
                  </button>
                </div>

                {/* Bancolombia */}
                <div className="p-3.5 rounded-xl bg-yellow-950/30 border border-yellow-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-yellow-300">🟡 Bancolombia Ahorros</div>
                    <div className="font-mono text-lg font-bold text-white">{bancolombiaNumber}</div>
                    <div className="text-[10px] text-white/40">Titular: {holderName}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(bancolombiaNumber, 'bancolombia')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-yellow-500 hover:bg-yellow-400 text-black font-mono active:scale-95"
                  >
                    {copied === 'bancolombia' ? '✅ Copiado' : 'Copiar'}
                  </button>
                </div>

                {/* PayPal */}
                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-blue-300">🌐 PayPal (Internacional)</div>
                    <div className="font-mono text-xs font-bold text-white">@{paypalUser} ($3 USD)</div>
                  </div>
                  <a
                    href="https://paypal.me/JesusBarriosGiraldo/3USD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white font-mono active:scale-95"
                  >
                    Pagar $3
                  </a>
                </div>
              </div>

              {/* Botón WhatsApp de Activación */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="text-xs font-mono uppercase text-white/50 font-bold text-center">
                  2. Haz clic aquí para enviar tu comprobante y ser agregado de inmediato:
                </div>
                <a
                  href={whatsappActivationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
                >
                  <span>💬</span>
                  <span>Confirmar y Activar por WhatsApp (+57 324 588 4678)</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
