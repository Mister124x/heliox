import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos de Uso | HELIOX Solar Observatory',
  description:
    'Términos y Condiciones de Uso de HELIOX Solar Observatory. Condiciones de acceso, propiedad intelectual, limitaciones de responsabilidad y más.',
  alternates: {
    canonical: 'https://heliox-observatory.vercel.app/terms',
  },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = '27 de agosto de 2026'
const CONTACT_EMAIL = 'heliox.observatory@gmail.com'
const SITE_URL = 'https://heliox-observatory.vercel.app'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#030014] text-white">
      {/* Header */}
      <header className="aurora-header px-4 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-orange-500/40 bg-orange-950/50 p-0.5">
              <img src="/favicon.svg" alt="HELIOX" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-lg text-white group-hover:text-orange-400 transition-colors">HELIOX</span>
          </Link>
          <Link href="/" className="text-sm text-white/60 hover:text-orange-400 transition-colors">
            ← Volver al Inicio
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold mb-6">
          📋 Documento Legal Oficial
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          Términos de Uso
        </h1>
        <p className="text-white/50 text-sm mb-12 font-mono">
          Última actualización: <strong className="text-white/70">{LAST_UPDATED}</strong> · Plataforma:{' '}
          <a href={SITE_URL} className="text-orange-400 hover:underline">{SITE_URL}</a>
        </p>

        <div className="space-y-10 text-white/80 leading-relaxed">

          {/* Intro */}
          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-sm text-white/70">
            <p>
              Al acceder y utilizar <strong className="text-white">HELIOX Solar Observatory</strong>{' '}
              ({SITE_URL}), usted acepta quedar vinculado por los presentes Términos de Uso. Si no
              está de acuerdo con alguno de estos términos, le rogamos que no utilice el sitio.
            </p>
          </div>

          {/* 1 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">1.</span> Descripción del Servicio
            </h2>
            <p className="text-sm text-white/70">
              HELIOX Solar Observatory es una plataforma científica y educativa de acceso libre y
              gratuito que proporciona:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              {[
                'Monitoreo solar en tiempo real con datos oficiales de NASA, NOAA y ESA.',
                'Visualización de imágenes del Sol capturadas por el satélite SDO (Solar Dynamics Observatory).',
                'Seguimiento de tormentas geomagnéticas, llamaradas solares y el índice Kp planetario.',
                'Análisis científico de física del plasma y magnetohidrodinámica.',
                'Contenido multimedia educativo sobre clima espacial.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 2 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">2.</span> Condiciones de Acceso y Uso
            </h2>
            <div className="space-y-4 text-sm text-white/70">
              <p>
                El acceso a HELIOX es <strong className="text-white">gratuito y no requiere registro</strong>.
                Al usar el sitio, el usuario se compromete a:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: '✅', text: 'Usar el sitio solo para fines lícitos y personales.' },
                  { icon: '✅', text: 'No reproducir ni redistribuir el contenido sin atribución.' },
                  { icon: '❌', text: 'No intentar vulnerar la seguridad del sistema.' },
                  { icon: '❌', text: 'No usar bots o scrapers automatizados sin autorización.' },
                  { icon: '❌', text: 'No realizar ingeniería inversa del software.' },
                  { icon: '❌', text: 'No interferir con el funcionamiento del servicio.' },
                ].map((item) => (
                  <div key={item.text} className="flex gap-2 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">3.</span> Propiedad Intelectual
            </h2>
            <div className="space-y-3 text-sm text-white/70">
              <p>
                <strong className="text-white">Código y diseño:</strong> El código fuente, diseño visual
                y arquitectura de HELIOX son propiedad de{' '}
                <strong className="text-white">JESÚS BARRIOS</strong> y están disponibles en GitHub bajo
                licencia MIT. Disponible en:{' '}
                <a
                  href="https://github.com/Mister124x/heliox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:underline"
                >
                  github.com/Mister124x/heliox
                </a>
              </p>
              <p>
                <strong className="text-white">Datos científicos:</strong> Los datos de NASA, NOAA y ESA
                son de dominio público y propiedad de sus respectivas agencias. HELIOX actúa como
                agregador y visualizador sin modificar los datos originales.
              </p>
              <p>
                <strong className="text-white">Imágenes solares:</strong> Las imágenes del Sol pertenecen
                a NASA/SDO y los equipos AIA, EVE y HMI. Se usan conforme a la política de uso libre
                de NASA para fines educativos y científicos no comerciales.
              </p>
              <p>
                <strong className="text-white">Marca HELIOX:</strong> El nombre "HELIOX Solar Observatory",
                el logotipo y la identidad visual son marca registrada de JESÚS BARRIOS.
              </p>
            </div>
          </section>

          {/* 4 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">4.</span> Precisión de los Datos
            </h2>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-4">
              <p className="text-amber-300 text-sm font-semibold mb-1">⚠️ Aviso importante</p>
              <p className="text-amber-200/80 text-sm">
                Los datos presentados en HELIOX provienen directamente de agencias gubernamentales
                (NASA, NOAA, ESA) y se muestran tal como son recibidos. HELIOX NO garantiza la
                exactitud, completitud o puntualidad de los datos en tiempo real.
              </p>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <p>
                Los datos del Sol son de naturaleza científica y pueden tener retrasos, errores de
                transmisión o períodos de mantenimiento. <strong className="text-white">No deben utilizarse
                como única fuente para decisiones críticas</strong> de seguridad, infraestructura o
                emergencias. Para alertas oficiales, consulte directamente{' '}
                <a
                  href="https://www.swpc.noaa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:underline"
                >
                  NOAA Space Weather Prediction Center
                </a>.
              </p>
            </div>
          </section>

          {/* 5 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">5.</span> Limitación de Responsabilidad
            </h2>
            <p className="text-sm text-white/70 mb-3">
              En la máxima medida permitida por la ley aplicable, JESÚS BARRIOS y HELIOX Solar
              Observatory no serán responsables de:
            </p>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                'Pérdidas económicas derivadas del uso de la información científica del sitio.',
                'Interrupciones del servicio por mantenimiento, fallos de terceros o causas de fuerza mayor.',
                'Inexactitudes en los datos provenientes de APIs de NASA, NOAA o ESA.',
                'Daños directos, indirectos, incidentales o consecuentes del uso del sitio.',
                'Pérdida de datos del navegador del usuario (preferencias, cookies).',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-400/70 mt-0.5 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 6 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">6.</span> Publicidad
            </h2>
            <p className="text-sm text-white/70">
              HELIOX muestra anuncios de <strong className="text-white">Google AdSense</strong> para
              financiar los costos operativos del observatorio. Los anuncios son seleccionados y
              servidos por Google LLC y HELIOX no controla el contenido específico de cada anuncio.
              Si encuentra un anuncio inapropiado, puede reportarlo directamente a Google o
              contactarnos en{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-400 hover:underline">
                {CONTACT_EMAIL}
              </a>.
            </p>
            <p className="text-sm text-white/60 mt-3">
              Los enlaces de afiliados de Amazon Associates generan comisiones sin costo adicional
              para el usuario. Estas comisiones financian la investigación y los servidores del proyecto.
            </p>
          </section>

          {/* 7 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">7.</span> Donaciones
            </h2>
            <p className="text-sm text-white/70">
              Las donaciones voluntarias realizadas a través de Nequi, Daviplata, Bancolombia o
              PayPal son <strong className="text-white">no reembolsables</strong> salvo error
              documentado del sistema. Las donaciones no garantizan ningún servicio, contenido
              exclusivo ni beneficio adicional. Son un apoyo voluntario al proyecto de ciencia
              abierta de JESÚS BARRIOS.
            </p>
          </section>

          {/* 8 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">8.</span> Modificaciones del Servicio
            </h2>
            <p className="text-sm text-white/70">
              HELIOX se reserva el derecho de modificar, suspender o discontinuar cualquier aspecto
              del servicio en cualquier momento, con o sin previo aviso. No nos hacemos responsables
              ante el usuario o terceros por las modificaciones, suspensiones o discontinuaciones del
              servicio.
            </p>
          </section>

          {/* 9 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">9.</span> Ley Aplicable y Jurisdicción
            </h2>
            <p className="text-sm text-white/70">
              Estos Términos se regirán e interpretarán conforme a las leyes de la{' '}
              <strong className="text-white">República de Colombia</strong>. Para cualquier disputa,
              las partes acuerdan someterse a la jurisdicción de los tribunales competentes de Colombia,
              sin perjuicio de los derechos del usuario como consumidor en su país de residencia.
            </p>
          </section>

          {/* 10 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">10.</span> Cambios en los Términos
            </h2>
            <p className="text-sm text-white/70">
              Nos reservamos el derecho de actualizar estos Términos en cualquier momento. Los cambios
              serán publicados en esta página con su fecha de actualización correspondiente. El uso
              continuado del sitio tras la publicación de cambios constituye su aceptación de los
              nuevos términos.
            </p>
          </section>

          {/* 11 — Contacto */}
          <section className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">11.</span> Contacto
            </h2>
            <p className="text-sm text-white/70 mb-4">
              Para consultas sobre estos Términos de Uso, contáctenos en:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl">
                <span>📧</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-400 hover:underline font-mono">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl">
                <span>🐙</span>
                <a
                  href="https://github.com/Mister124x/heliox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:underline font-mono"
                >
                  github.com/Mister124x/heliox
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl">
                <span>👨‍💻</span>
                <span className="text-white/70">Responsable: <strong className="text-white">JESÚS BARRIOS</strong> · Colombia</span>
              </div>
            </div>
          </section>

        </div>

        {/* Footer interno */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>© 2026 JESÚS BARRIOS · HELIOX Solar Observatory</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">Política de Privacidad</Link>
            <Link href="/" className="hover:text-orange-400 transition-colors">Inicio</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
