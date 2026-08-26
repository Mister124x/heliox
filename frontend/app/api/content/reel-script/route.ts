import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const platform = searchParams.get('platform') || 'tiktok'

  const script = {
    title: '⚠️ ¡ALERTA SOLAR! El Ciclo 25 se está intensificando ahora mismo',
    duration_seconds: 45,
    target_audience: platform === 'tiktok' ? 'TikTok viral 18-35 años' : 'Shorts / Reels educativo',
    author: 'JESÚS BARRIOS — Observatorio HELIOX',
    hashtags: '#TormentaSolar #Ciencia #NASA #ClimaEspacial #HELIOX #Astronomia #JesusBarrios',
    slides: [
      {
        second: 0,
        voz: '¿Sabías que el Sol acaba de emitir una eyección magnética que viaja a más de 500 km por segundo?',
        visual: 'Zoom dinámico al disco solar en 304Å de NASA SDO con llamaradas brillantes',
      },
      {
        second: 15,
        voz: 'Los satélites de NOAA y NASA están detectando variaciones en el campo geomagnético de la Tierra.',
        visual: 'Gráfica de telemetría Kp y campo magnético Bz en tiempo real',
      },
      {
        second: 30,
        voz: 'Entra a HELIOX, el observatorio en tiempo real en español creado por Jesús Barrios para monitorear el Sol 24/7.',
        visual: 'Captura de pantalla de la interfaz HELIOX y enlace oficial en bio',
      },
    ],
  }

  return NextResponse.json({ script })
}
