import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad | HELIOX Solar Observatory',
  description:
    'Política de Privacidad de HELIOX Solar Observatory. Información sobre recopilación de datos, cookies, Google AdSense, y derechos del usuario conforme al RGPD y legislación colombiana.',
  alternates: {
    canonical: 'https://heliox-observatory.vercel.app/privacy',
  },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = '27 de agosto de 2026'
const CONTACT_EMAIL = 'heliox.observatory@gmail.com'
const SITE_URL = 'https://heliox-observatory.vercel.app'

export default function PrivacyPage() {
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
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-orange-400 transition-colors"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-semibold mb-6">
          🔒 Documento Legal Oficial
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          Política de Privacidad
        </h1>
        <p className="text-white/50 text-sm mb-12 font-mono">
          Última actualización: <strong className="text-white/70">{LAST_UPDATED}</strong> · Plataforma:{' '}
          <a href={SITE_URL} className="text-orange-400 hover:underline">{SITE_URL}</a>
        </p>

        <div className="space-y-10 text-white/80 leading-relaxed">

          {/* 1 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">1.</span> Identificación del Responsable
            </h2>
            <div className="space-y-2 text-sm">
              <p><strong className="text-white">Responsable:</strong> JESÚS BARRIOS</p>
              <p><strong className="text-white">Sitio web:</strong>{' '}
                <a href={SITE_URL} className="text-orange-400 hover:underline">{SITE_URL}</a>
              </p>
              <p><strong className="text-white">Correo de contacto:</strong>{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-400 hover:underline">{CONTACT_EMAIL}</a>
              </p>
              <p><strong className="text-white">País de operación:</strong> Colombia (con alcance internacional)</p>
              <p className="text-white/60 mt-3">
                HELIOX Solar Observatory es una plataforma científica y educativa de acceso libre que
                proporciona monitoreo solar en tiempo real utilizando datos oficiales de NASA, NOAA y ESA.
              </p>
            </div>
          </section>

          {/* 2 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">2.</span> Datos que Recopilamos
            </h2>
            <div className="space-y-4 text-sm">
              <p>HELIOX recopila únicamente los datos mínimos necesarios para operar el servicio:</p>
              <div className="space-y-3">
                {[
                  {
                    icon: '📊',
                    title: 'Datos de Uso Anónimo',
                    desc: 'Páginas visitadas, duración de la sesión, dispositivo y navegador. Estos datos son completamente anónimos y no permiten identificar a un usuario específico. Se recopilan mediante Vercel Analytics.',
                  },
                  {
                    icon: '🍪',
                    title: 'Cookies de Preferencia',
                    desc: 'Almacenamos el idioma seleccionado por el usuario (localStorage) para recordar su preferencia de idioma entre visitas.',
                  },
                  {
                    icon: '💰',
                    title: 'Cookies de Publicidad (Google AdSense)',
                    desc: 'Google AdSense puede utilizar cookies para mostrar anuncios relevantes. Estas cookies pertenecen a Google LLC y están sujetas a la Política de Privacidad de Google.',
                  },
                  {
                    icon: '⚡',
                    title: 'Datos Técnicos de Telemetría',
                    desc: 'Las solicitudes a APIs de NASA, NOAA y ESA se realizan en el servidor de forma anónima. No se almacenan IPs de usuarios al hacer consultas de datos científicos.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-white mb-1">{item.title}</div>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3 */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">3.</span> Uso de los Datos
            </h2>
            <ul className="space-y-2 text-sm list-none">
              {[
                'Mejorar la experiencia y rendimiento del sitio web.',
                'Recordar las preferencias de idioma del usuario.',
                'Mostrar publicidad relevante a través de Google AdSense.',
                'Generar estadísticas de uso anónimas para el desarrollo del proyecto.',
                'No vendemos, alquilamos ni compartimos datos personales con terceros con fines comerciales propios.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/70">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 4 — Google AdSense */}
          <section className="solar-card p-8 border-orange-500/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">4.</span> Google AdSense y Publicidad
            </h2>
            <div className="space-y-3 text-sm text-white/70">
              <p>
                Este sitio utiliza <strong className="text-white">Google AdSense</strong> (Google LLC,
                1600 Amphitheatre Parkway, Mountain View, CA 94043, EE.UU.) para mostrar anuncios
                publicitarios.
              </p>
              <p>
                Google AdSense puede usar cookies de DoubleClick para mostrar anuncios basados en
                visitas previas a este sitio u otros sitios en Internet. Los usuarios pueden
                <strong className="text-white"> inhabilitar los anuncios personalizados</strong>{' '}
                visitando{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:underline"
                >
                  Configuración de anuncios de Google
                </a>.
              </p>
              <p>
                ID de publicador de AdSense:{' '}
                <code className="text-emerald-400 bg-black/30 px-2 py-0.5 rounded text-xs">
                  pub-3600083129868122
                </code>
              </p>
              <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <p className="text-orange-300 text-xs">
                  <strong>Aviso:</strong> Google como proveedor externo utiliza cookies para publicar
                  anuncios en este sitio web. El uso de cookies de publicidad por Google permite que
                  aparezcan anuncios basados en visitas anteriores del usuario a este sitio o a otros
                  sitios web. Más información en{' '}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-orange-200"
                  >
                    Cómo usa Google datos cuando usas sitios o apps de nuestros socios
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* 5 — Terceros */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">5.</span> Servicios de Terceros
            </h2>
            <div className="space-y-3 text-sm">
              {[
                { name: 'Vercel Analytics', url: 'https://vercel.com/legal/privacy-policy', desc: 'Estadísticas de uso anónimas.' },
                { name: 'NASA / NOAA / ESA APIs', url: 'https://api.nasa.gov/', desc: 'Datos científicos de telemetría solar (sin datos personales).' },
                { name: 'Google AdSense', url: 'https://policies.google.com/privacy', desc: 'Publicidad contextual.' },
                { name: 'Google Fonts', url: 'https://developers.google.com/fonts/faq/privacy', desc: 'Tipografías web (Space Grotesk, JetBrains Mono).' },
                { name: 'PayPal', url: 'https://www.paypal.com/co/webapps/mpp/ua/privacy-full', desc: 'Donaciones opcionales procesadas por PayPal.' },
              ].map((svc) => (
                <div key={svc.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                  <a
                    href={svc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 font-semibold hover:underline min-w-[180px]"
                  >
                    {svc.name}
                  </a>
                  <span className="text-white/60">{svc.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 6 — Derechos */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">6.</span> Derechos del Usuario
            </h2>
            <p className="text-sm text-white/70 mb-4">
              Conforme a la Ley 1581 de 2012 de Colombia (Protección de Datos Personales) y el
              Reglamento General de Protección de Datos (RGPD) de la UE, el usuario tiene derecho a:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                { icon: '📋', right: 'Acceso', desc: 'Conocer qué datos tenemos sobre usted.' },
                { icon: '✏️', right: 'Rectificación', desc: 'Corregir datos incorrectos.' },
                { icon: '🗑️', right: 'Supresión', desc: 'Solicitar la eliminación de sus datos.' },
                { icon: '⛔', right: 'Oposición', desc: 'Oponerse al tratamiento de sus datos.' },
                { icon: '📦', right: 'Portabilidad', desc: 'Recibir sus datos en formato estructurado.' },
                { icon: '🔒', right: 'Limitación', desc: 'Limitar el tratamiento de sus datos.' },
              ].map((item) => (
                <div key={item.right} className="flex gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                  <span>{item.icon}</span>
                  <div>
                    <div className="font-semibold text-white text-xs">{item.right}</div>
                    <div className="text-white/50 text-xs mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/60 mt-4">
              Para ejercer estos derechos, escríbenos a:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-400 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          {/* 7 — Cookies */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">7.</span> Política de Cookies
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-white/70 border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/50">
                    <th className="text-left py-2 pr-4">Cookie</th>
                    <th className="text-left py-2 pr-4">Tipo</th>
                    <th className="text-left py-2 pr-4">Duración</th>
                    <th className="text-left py-2">Propósito</th>
                  </tr>
                </thead>
                <tbody className="space-y-1">
                  {[
                    { name: 'heliox_lang', type: 'Funcional', duration: 'Persistente', purpose: 'Guardar preferencia de idioma' },
                    { name: '_ga, _gid', type: 'Analítica', duration: '2 años / 24h', purpose: 'Google Analytics (anónimo)' },
                    { name: 'IDE, DSID', type: 'Publicidad', duration: '13 meses', purpose: 'Google AdSense / DoubleClick' },
                    { name: '__vercel_live_*', type: 'Funcional', duration: 'Sesión', purpose: 'Vercel Analytics' },
                  ].map((c) => (
                    <tr key={c.name} className="border-b border-white/5">
                      <td className="py-2 pr-4 font-mono text-emerald-400">{c.name}</td>
                      <td className="py-2 pr-4">{c.type}</td>
                      <td className="py-2 pr-4 text-white/50">{c.duration}</td>
                      <td className="py-2">{c.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/50 mt-4">
              Puedes gestionar o eliminar las cookies desde la configuración de tu navegador.
            </p>
          </section>

          {/* 8 — Retención */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">8.</span> Retención de Datos
            </h2>
            <p className="text-sm text-white/70">
              Los datos de uso anónimo de Vercel Analytics se conservan por un máximo de{' '}
              <strong className="text-white">12 meses</strong>. Los datos de preferencia de idioma se
              almacenan localmente en tu dispositivo (localStorage) y puedes eliminarlos en cualquier
              momento limpiando los datos del navegador.
            </p>
          </section>

          {/* 9 — Seguridad */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">9.</span> Seguridad
            </h2>
            <p className="text-sm text-white/70">
              HELIOX implementa las siguientes medidas de seguridad:
            </p>
            <ul className="mt-3 space-y-1 text-sm text-white/60 list-none">
              {[
                '🔒 Conexión HTTPS/TLS en todas las comunicaciones',
                '🛡️ Headers de seguridad (HSTS, X-Content-Type-Options)',
                '⚡ Despliegue en infraestructura Vercel con SOC 2 Type II',
                '🔐 Sin almacenamiento de contraseñas ni datos de pago propios',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 10 — Cambios */}
          <section className="solar-card p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">10.</span> Cambios en esta Política
            </h2>
            <p className="text-sm text-white/70">
              Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier
              momento. Los cambios entrarán en vigencia una vez publicados en esta página. La fecha
              de última actualización siempre estará visible en la parte superior de este documento.
              Se recomienda revisarla periódicamente.
            </p>
          </section>

          {/* 11 — Contacto */}
          <section className="p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400">11.</span> Contacto
            </h2>
            <p className="text-sm text-white/70 mb-4">
              Para consultas sobre esta Política de Privacidad, ejerce de tus derechos o reportar
              un uso indebido de datos, contáctenos en:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl">
                <span>📧</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-400 hover:underline font-mono">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-xl">
                <span>🌐</span>
                <a href={SITE_URL} className="text-orange-400 hover:underline font-mono">
                  {SITE_URL}
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
            <Link href="/terms" className="hover:text-orange-400 transition-colors">Términos de Uso</Link>
            <Link href="/" className="hover:text-orange-400 transition-colors">Inicio</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
