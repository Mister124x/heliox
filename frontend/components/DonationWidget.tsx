'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type PaymentTab = 'nequi_daviplata' | 'bank_transfer' | 'card_online' | 'paypal'

export default function DonationWidget() {
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
  const holderDoc = process.env.NEXT_PUBLIC_HOLDER_DOC || 'Titular Verificado'
  const paypalMe = process.env.NEXT_PUBLIC_PAYPAL_ME || 'https://paypal.me/jesusbarrios'
  const paypalQr = process.env.NEXT_PUBLIC_PAYPAL_QR || '/paypal_qr_jesus_barrios.jpg'
  const wompiKey = process.env.NEXT_PUBLIC_WOMPI_KEY || ''

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

  const handleWompiCheckout = () => {
    if (typeof window !== 'undefined' && (window as any).$wompi) {
      const checkout = new (window as any).$wompi({
        currency: 'COP',
        amountInCents: finalAmountCOP * 100,
        reference: `HELIOX_${Date.now()}`,
        publicKey: wompiKey || 'pub_test_XXXXXXXX',
      })
      checkout.open((result: any) => {
        console.log('Resultado Wompi:', result)
      })
    } else {
      alert(`Para pago con tarjeta o PSE: Realiza la transferencia a la cuenta de ${accountType} de ${bankName} (${accountNumber}) o Nequi (${nequiNumber}).`)
    }
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
          Impulsa la Red Solar <span className="text-solar-400">HELIOX</span>
        </h3>
        <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base mb-6 leading-relaxed">
          Mantener los servidores 24/7, los nodos de alerta temprana y los algoritmos de análisis en español depende de ti. 
          Colabora directamente con el proyecto fundado por <strong className="text-solar-400">{holderName}</strong>.
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
            <span>📱</span> Nequi / Daviplata
          </button>

          <button
            onClick={() => setActiveTab('bank_transfer')}
            className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'bank_transfer'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg shadow-yellow-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🏦</span> Cuenta de Ahorros
          </button>

          <button
            onClick={() => setActiveTab('card_online')}
            className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'card_online'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>💳</span> Tarjeta / PSE
          </button>

          <button
            onClick={() => setActiveTab('paypal')}
            className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'paypal'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🌐</span> PayPal (QR Oficial)
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
                {/* Nequi Card */}
                <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-left relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-purple-300 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" /> Nequi Oficial
                    </span>
                    <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded-full border border-purple-500/30">
                      0% Comisión
                    </span>
                  </div>
                  <div className="text-xs text-white/50 mb-1">Número de Celular:</div>
                  <div className="font-mono text-2xl font-bold text-white mb-2 tracking-wider">
                    {nequiNumber}
                  </div>
                  <div className="text-xs text-purple-200/70 mb-4">
                    Titular: <strong>{holderName}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard(nequiNumber, 'nequi')}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all flex items-center justify-center gap-2"
                  >
                    {copiedField === 'nequi' ? '✅ ¡Copiado al Portapapeles!' : '📋 Copiar Número Nequi'}
                  </button>
                </div>

                {/* Daviplata Card */}
                <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 text-left relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-red-300 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400 animate-pulse" /> Daviplata
                    </span>
                    <span className="text-xs bg-red-500/20 text-red-200 px-2 py-0.5 rounded-full border border-red-500/30">
                      Al Instante
                    </span>
                  </div>
                  <div className="text-xs text-white/50 mb-1">Número de Celular:</div>
                  <div className="font-mono text-2xl font-bold text-white mb-2 tracking-wider">
                    {daviplataNumber}
                  </div>
                  <div className="text-xs text-red-200/70 mb-4">
                    Titular: <strong>{holderName}</strong>
                  </div>
                  <button
                    onClick={() => copyToClipboard(daviplataNumber, 'daviplata')}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition-all flex items-center justify-center gap-2"
                  >
                    {copiedField === 'daviplata' ? '✅ ¡Copiado al Portapapeles!' : '📋 Copiar Número Daviplata'}
                  </button>
                </div>
              </div>
              <p className="text-xs text-white/40">
                Abre tu app Nequi o Daviplata, ingresa el número <strong className="text-purple-300">{nequiNumber}</strong> y envía tu aporte al proyecto.
              </p>
            </motion.div>
          )}

          {/* TAB 2: CUENTA DE AHORROS / TRANSFERENCIA BANCARIA */}
          {activeTab === 'bank_transfer' && (
            <motion.div
              key="bank"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-yellow-950/20 border border-yellow-500/30 text-left"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                <div>
                  <div className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">Transferencia Bancaria Nacional</div>
                  <div className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                    🏦 {bankName} — Cuenta de {accountType}
                  </div>
                </div>
                <span className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-500/40">
                  Transfiya / PSE / Sucursal Virtual
                </span>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
                <div>
                  <div className="text-xs text-white/40">Número de Cuenta:</div>
                  <div className="font-mono text-xl font-bold text-yellow-300 mt-0.5 tracking-wider">{accountNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-white/40">Titular de la Cuenta:</div>
                  <div className="font-semibold text-white mt-0.5">{holderName}</div>
                </div>
                <div>
                  <div className="text-xs text-white/40">Tipo:</div>
                  <div className="font-mono text-white/80 mt-0.5">Cuenta de {accountType}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => copyToClipboard(accountNumber, 'account_number')}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-yellow-500 hover:bg-yellow-400 text-black transition-all flex items-center gap-2"
                >
                  {copiedField === 'account_number' ? '✅ ¡Número Copiado!' : '📋 Copiar Número de Cuenta'}
                </button>
                <button
                  onClick={() => copyToClipboard(`${bankName} - Cuenta de ${accountType}: ${accountNumber} - Titular: ${holderName}`, 'all_bank')}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-2"
                >
                  {copiedField === 'all_bank' ? '✅ ¡Datos Completos Copiados!' : '📄 Copiar Todos los Datos'}
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: TARJETA DE CRÉDITO / DÉBITO & PSE */}
          {activeTab === 'card_online' && (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-left"
            >
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                Pasarela Segura Online (Tarjetas Visa, Mastercard, Amex y PSE)
              </div>
              <div className="text-xl font-bold text-white mb-4">
                Paga en línea con Tarjeta Débito/Crédito o PSE
              </div>

              {/* Selector de Monto COP */}
              <div className="mb-4">
                <div className="text-xs text-white/60 mb-2">Selecciona el monto en Pesos Colombianos (COP):</div>
                <div className="flex flex-wrap gap-2">
                  {[10000, 25000, 50000, 100000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setSelectedAmountCOP(amt)
                        setCustomAmountCOP('')
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedAmountCOP === amt && !customAmountCOP
                          ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      ${amt.toLocaleString('es-CO')} COP
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Otro valor..."
                    value={customAmountCOP}
                    onChange={(e) => setCustomAmountCOP(e.target.value)}
                    className="px-3 py-2 rounded-xl text-xs bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-400 w-32"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-white/50">Total a Colaborar:</div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    ${finalAmountCOP.toLocaleString('es-CO')} COP
                  </div>
                </div>

                <button
                  onClick={handleWompiCheckout}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>🔒</span> Pagar Seguro con Tarjeta / PSE →
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-white/40">
                <span>🛡️ Transacciones encriptadas de 256 bits</span>
                <span>•</span>
                <span>Acreditación directa a la cuenta de {holderName}</span>
              </div>
            </motion.div>
          )}

          {/* TAB 4: PAYPAL CON QR OFICIAL */}
          {activeTab === 'paypal' && (
            <motion.div
              key="paypal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-left"
            >
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">
                Donaciones Globales (PayPal Internacional)
              </div>
              <div className="text-xl font-bold text-white mb-4">
                Escanea el Código QR Oficial o dona con Tarjeta / Saldo PayPal
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Visualizador del Código QR Oficial */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-xl shadow-blue-500/10">
                  <div className="relative w-48 h-56">
                    <Image
                      src={paypalQr}
                      alt="Código QR PayPal - JESÚS BARRIOS"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="text-xs text-black/70 font-semibold mt-2 text-center">
                    Abre la cámara o app PayPal para pagar a <br/>
                    <strong className="text-black font-bold">JESUS BARRIOS</strong>
                  </div>
                </div>

                {/* Donación Directa por Montos */}
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-white/60 mb-2">Selecciona monto en Dólares (USD):</div>
                    <div className="flex flex-wrap gap-2">
                      {[5, 15, 30, 50, 100].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => {
                            setSelectedAmountUSD(amt)
                            setCustomAmountUSD('')
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            selectedAmountUSD === amt && !customAmountUSD
                              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          ${amt} USD
                        </button>
                      ))}
                      <input
                        type="number"
                        placeholder="Otro USD..."
                        value={customAmountUSD}
                        onChange={(e) => setCustomAmountUSD(e.target.value)}
                        className="px-3 py-1.5 rounded-xl text-xs bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 w-24"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/50">Monto Seleccionado:</div>
                    <div className="text-2xl font-bold text-blue-400 font-mono mb-2">
                      ${finalAmountUSD} USD
                    </div>
                    <button
                      onClick={handlePayPalRedirect}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span>🅿️</span> Donar vía Enlace Web PayPal →
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                <span>Beneficiario Oficial: <strong>{holderName}</strong></span>
                <span>Moneda: USD (Dólares)</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resumen de Compromiso y Transparencia */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2">
            <div className="text-solar-400 font-bold text-sm">⚡ 24/7</div>
            <div className="text-[11px] text-white/50">Servidores Activos</div>
          </div>
          <div className="p-2">
            <div className="text-solar-400 font-bold text-sm">🛰️ NASA/NOAA</div>
            <div className="text-[11px] text-white/50">Datos en Vivo</div>
          </div>
          <div className="p-2">
            <div className="text-solar-400 font-bold text-sm">🇨🇴 100% Latino</div>
            <div className="text-[11px] text-white/50">Ciencia en Español</div>
          </div>
          <div className="p-2">
            <div className="text-solar-400 font-bold text-sm">🔒 Seguro</div>
            <div className="text-[11px] text-white/50">Cuentas Verificadas</div>
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
