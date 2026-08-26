import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://heliox-observatory.vercel.app'
  const pubDate = new Date().toUTCString()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HELIOX — Observatorio Solar en Tiempo Real</title>
    <link>${baseUrl}</link>
    <description>Monitoreo 24/7 de tormentas solares, llamaradas clase X y telemetría satelital NASA y NOAA por JESÚS BARRIOS.</description>
    <language>es</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    
    <item>
      <title>Monitoreo en Vivo de Tormentas Solares y Clima Espacial — Ciclo Solar 25</title>
      <link>${baseUrl}/storms</link>
      <guid>${baseUrl}/storms</guid>
      <pubDate>${pubDate}</pubDate>
      <description>Registro en tiempo real de eyecciones de masa coronal (CME), llamaradas solares y perturbaciones del campo geomagnético terrestre.</description>
    </item>

    <item>
      <title>Matriz de Telemetría Satelital SDO, GOES y DSCOVR en Vivo</title>
      <link>${baseUrl}/dashboard</link>
      <guid>${baseUrl}/dashboard</guid>
      <pubDate>${pubDate}</pubDate>
      <description>Visualización de velocidad del viento solar, componente Bz del campo magnético interplanetario e índice Kp en tiempo real.</description>
    </item>

    <item>
      <title>Análisis Científico: El Sol Como Fuerza Geopolítica y Económica</title>
      <link>${baseUrl}/analysis</link>
      <guid>${baseUrl}/analysis</guid>
      <pubDate>${pubDate}</pubDate>
      <description>Paper científico de más de 15 páginas sobre heliofísica, el riesgo Carrington y el pico del Ciclo Solar 25 por JESÚS BARRIOS.</description>
    </item>
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
