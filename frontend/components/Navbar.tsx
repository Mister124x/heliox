'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n, LanguageSelector } from '../lib/i18n'

interface NavbarProps {
  countdown?: number
  refreshing?: boolean
  onRefresh?: () => void
  isStormy?: boolean
}

export default function Navbar({
  countdown,
  refreshing,
  onRefresh,
  isStormy = false,
}: NavbarProps) {
  const { t, lang } = useI18n()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isEn = lang === 'en'

  // Cerrar menú móvil al navegar
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/', label: isEn ? 'Home' : 'Inicio' },
    { href: '/dashboard', label: t.nav_dashboard || 'Dashboard' },
    { href: '/storms', label: t.nav_storms || 'Tormentas' },
    { href: '/reels', label: t.nav_reels || 'Reels & Media' },
    { href: '/analysis', label: t.nav_analysis || 'Análisis' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 aurora-header">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo e Identidad */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-orange-500/40 p-0.5 bg-orange-950/50 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-all duration-300">
            <img src="/favicon.svg" alt="HELIOX Logo" className="w-full h-full object-contain animate-float" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-yellow-200 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-orange-400 transition-all duration-500">
                HELIOX
              </span>
              <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded border border-red-500/30 font-mono font-bold animate-pulse">
                PICO MÁXIMO SC25
              </span>
            </div>
            <span className="text-[10px] text-white/40 leading-none">
              {t.by || 'por'} <strong className="text-white/70">JESÚS BARRIOS</strong>
            </span>
          </div>
        </Link>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-all font-medium relative py-1 ${
                  isActive
                    ? 'text-orange-400 font-bold drop-shadow-[0_0_8px_rgba(247,135,8,0.6)]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 to-amber-300 rounded-full" />
                )}
              </Link>
            )
          })}

          {/* Selector de 12 Idiomas */}
          <LanguageSelector />

          {/* Botón de Telemetría en Vivo */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              title="Click para actualizar telemetría satelital"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/15 px-3.5 py-1.5 rounded-full border border-white/20 transition-all duration-300 text-xs hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5"
            >
              <div className={`w-2 h-2 rounded-full ${isStormy ? 'bg-red-500 animate-ping alert-glow' : 'bg-emerald-400 emerald-glow'}`} />
              <span className="text-white/90 font-mono font-semibold">
                {isStormy ? 'ALERTA' : t.nav_live || 'EN VIVO'}
              </span>
              {typeof countdown === 'number' && (
                <span className={`text-[10px] font-mono text-orange-400 ${refreshing ? 'animate-spin' : ''}`}>
                  🔄 {countdown}s
                </span>
              )}
            </button>
          )}
        </div>

        {/* Acciones Móvil */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSelector />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Drawer Menú Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-4 py-5 space-y-3 backdrop-blur-2xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base py-1.5 transition-colors ${
                  isActive
                    ? 'text-orange-400 font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          
          <div className="pt-3 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/50">
            <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-400 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-400 transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
