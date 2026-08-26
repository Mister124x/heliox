'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../lib/i18n'

type PaymentTab = 'nequi_daviplata' | 'bank_transfer' | 'card_online' | 'paypal'

export default function DonationWidget() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<PaymentTab>('nequi_daviplata')
  const [selectedAmountCOP, setSelectedAmountCOP] = useState<number>(20000)
  const [customAmountCOP, setCustomAmountCOP] = useState<string>('')
  const [selectedAmountUSD, setSelectedAmountUSD] = useState<number>(10)
  const [customAmountUSD, setCustomAmountUSD] = useState<string>('')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Datos financieros oficiales de JESÚS BARRIOS
  const nequiNumber = process.env.NEXT_PUBLIC_NEQUI || '3245884678'
  const daviplataNumber = process.env.NEXT_PUBLIC_DAVIPLATA || '3245884678'
  const bankName = process.env.NEXT_PUBLIC_BANK_NAME || 'Bancolombia'
  const accountType = process.env.NEXT_PUBLIC_BANK_TYPE || 'Ahorros'
  const accountNumber = process.env.NEXT_PUBLIC_BANK_ACCOUNT || '488474988372'
  const holderName = process.env.NEXT_PUBLIC_HOLDER_NAME || 'JESUS BARRIOS'
  const paypalMe = process.env.NEXT_PUBLIC_PAYPAL_ME || 'https://paypal.me/JesusBarriosGiraldo'
  const paypalUser = '@JesusBarriosGiraldo'

  const finalAmountCOP = customAmountCOP ? Number(customAmountCOP) : selectedAmountCOP
  const finalAmountUSD = customAmountUSD ? Number(customAmountUSD) : selectedAmountUSD

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => setCopiedField(null), 2500)
  }

  const handlePayPalRedirect = () => {
    const cleanUrl = paypalMe.replace(/\/$/, '')
    window.open(`${cleanUrl}/${finalAmountUSD}USD`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="solar-card p-6 md:p-8 text-center relative overflow-hidden border border-solar-500/30 bg-black/70 backdrop-blur-xl"
    >
      {/* Fondo estético espacial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(247,135,8,0.12)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        {/* Cabecera */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-solar-500/10 border border-solar-500/30 text-3xl mb-3">
          ☀️
        </div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          {t.donate_title} <span className="text-solar-400">HELIOX</span>
        </h3>
        <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base mb-6 leading-relaxed">
          {t.donate_description} <strong className="text-solar-400">{holderName}</strong>.
        </p>

        {/* Pestañas de Métodos de Pago */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 p-1 bg-white/5 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('nequi_daviplata')}
            className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'nequi_daviplata'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.donate_nequi}
          </button>

          <button
            onClick={() => setActiveTab('bank_transfer')}
            className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'bank_transfer'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg shadow-yellow-500/20 font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.donate_savings}
          </button>

          <button
            onClick={() => setActiveTab('card_online')}
            className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'card_online'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.donate_card}
          </button>

          <button
            onClick={() => setActiveTab('paypal')}
            className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'paypal'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.donate_paypal}
          </button>
        </div>

        {/* Contenido Dinámico por Pestaña */}
        <AnimatePresence mode="wait">
          {/* TAB 1: NEQUI / DAVIPLATA */}
          {activeTab === 'nequi_daviplata' && (
            <motion.div
              key="nequi"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                {/* Nequi */}
                <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-left relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-purple-300 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" /> Nequi Oficial
                    </span>
                    <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded-full border border-purple-500/30">
                      {t.donate_no_commission}
                    </span>
                  </div>
                  <div className="text-xs text-white/50 mb-1">{t.donate_cell}</div>
                  <div className="font-mono text-2xl font-bold text-white mb-2 tracking-wider">
                    {nequiNumber}
                  </div>
                  <div className="text-xs text-purple-200/70 mb-4">
                    {t.donate_holder} <strong>{holderName}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard(nequiNumber, 'nequi')}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all flex items-center justify-center gap-2"
                  >
                    {copiedField === 'nequi' ? '✅ ¡Copiado!' : `${t.donate_copy} Nequi`}
                  </button>
                </div>

                {/* Daviplata */}
                <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 text-left relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-red-300 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400 animate-pulse" /> Daviplata
                    </span>
                    <span className="text-xs bg-red-500/20 text-red-200 px-2 py-0.5 rounded-full border border-red-500/30">
                      {t.donate_instant}
                    </span>
                  </div>
                  <div className="text-xs text-white/50 mb-1">{t.donate_cell}</div>
                  <div className="font-mono text-2xl font-bold text-white mb-2 tracking-wider">
                    {daviplataNumber}
                  </div>
                  <div className="text-xs text-red-200/70 mb-4">
                    {t.donate_holder} <strong>{holderName}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard(daviplataNumber, 'daviplata')}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition-all flex items-center justify-center gap-2"
                  >
                    {copiedField === 'daviplata' ? '✅ ¡Copiado!' : `${t.donate_copy} Daviplata`}
                  </button>
                </div>
              </div>
              <p className="text-xs text-white/40">{t.donate_instructions}</p>
            </motion.div>
          )}

          {/* TAB 2: TRANSFERENCIA BANCARIA */}
          {activeTab === 'bank_transfer' && (
            <motion.div
              key="bank"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-yellow-950/30 border border-yellow-500/30 text-left space-y-4"
            >
              <div className="flex items-center justify-between border-b border-yellow-500/20 pb-3">
                <span className="font-bold text-yellow-300 flex items-center gap-2">
                  🏦 {bankName} (Colombia)
                </span>
                <span className="text-xs bg-yellow-500/20 text-yellow-200 px-2.5 py-0.5 rounded-full border border-yellow-500/30">
                  {accountType}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-white/50 mb-1">{t.savings_account_number}</div>
                  <div className="font-mono text-2xl font-bold text-white tracking-wider">{accountNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-white/50 mb-1">{t.savings_holder}</div>
                  <div className="font-bold text-lg text-yellow-200">{holderName}</div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(accountNumber, 'bancolombia')}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-yellow-500 hover:bg-yellow-400 text-black transition-all flex items-center justify-center gap-2"
              >
                {copiedField === 'bancolombia' ? '✅ ¡Número de Cuenta Copiado!' : t.savings_copy}
              </button>
            </motion.div>
          )}

          {/* TAB 3: TARJETA / PSE */}
          {activeTab === 'card_online' && (
            <motion.div
              key="wompi"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-4"
            >
              <div className="text-sm font-bold text-emerald-300">
                💳 Pasarela de Pago Seguro Wompi (Bancolombia, PSE, Tarjeta Débito/Crédito)
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {[10000, 20000, 50000, 100000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedAmountCOP(amt); setCustomAmountCOP('') }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                      selectedAmountCOP === amt && !customAmountCOP
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    ${amt.toLocaleString()} COP
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyToClipboard(accountNumber, 'pse')}
                className="w-full py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg"
              >
                {copiedField === 'pse' ? '✅ ¡Cuenta Bancolombia Copiada para PSE!' : `Transferir $${finalAmountCOP.toLocaleString()} COP por PSE / Transferencia`}
              </button>
            </motion.div>
          )}

          {/* TAB 4: PAYPAL INTERNACIONAL */}
          {activeTab === 'paypal' && (
            <motion.div
              key="paypal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-center space-y-4"
            >
              <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
                <span className="font-bold text-blue-300 flex items-center gap-2">
                  🌐 PayPal Oficial (Internacional)
                </span>
                <span className="text-xs bg-blue-500/20 text-blue-200 px-2.5 py-0.5 rounded-full border border-blue-500/30 font-mono">
                  {paypalUser}
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {[5, 10, 25, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedAmountUSD(amt); setCustomAmountUSD('') }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                      selectedAmountUSD === amt && !customAmountUSD
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    ${amt} USD
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handlePayPalRedirect}
                  className="w-full py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <span>🌐 Abrir PayPal.Me ({paypalUser}) ↗</span>
                </button>

                <button
                  onClick={() => copyToClipboard('https://paypal.me/JesusBarriosGiraldo', 'paypal_link')}
                  className="w-full py-3 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <span>{copiedField === 'paypal_link' ? '✅ ¡Enlace Copiado!' : '📋 Copiar Enlace PayPal'}</span>
                </button>
              </div>

              <p className="text-xs text-white/40">
                Titular verificado: <strong className="text-blue-300">{holderName}</strong> · Usuario: <strong className="text-white font-mono">{paypalUser}</strong>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Garantías y Seguridad */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2">
            <div className="text-solar-400 font-bold text-sm">⚡ 24/7</div>
            <div className="text-[11px] text-white/50">{t.servers_active}</div>
          </div>
          <div className="p-2">
            <div className="text-solar-400 font-bold text-sm">🛰️ NASA/NOAA</div>
            <div className="text-[11px] text-white/50">{t.live_data}</div>
          </div>
          <div className="p-2">
            <div className="text-solar-400 font-bold text-sm">🇨🇴 100% Latino</div>
            <div className="text-[11px] text-white/50">{t.latin_science}</div>
          </div>
          <div className="p-2">
            <div className="text-solar-400 font-bold text-sm">🔒 Seguro</div>
            <div className="text-[11px] text-white/50">{t.secure}</div>
          </div>
        </div>

        <p className="text-[11px] text-white/30 mt-4">
          Proyecto independiente registrado y desarrollado por <strong className="text-solar-400">{holderName}</strong>. 
          Todos los fondos son destinados al mantenimiento del observatorio HELIOX.
        </p>
      </div>
    </motion.div>
  )
}
