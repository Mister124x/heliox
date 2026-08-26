import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await fetch('https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json', { cache: 'no-store' })
    const data = await res.json()
    const speed = Array.isArray(data) && data[0]?.proton_speed ? data[0].proton_speed : 350
    return NextResponse.json({
      cmes: [
        {
          id: 'CME_NOAA_LIVE',
          startTime: data[0]?.time_tag || new Date().toISOString(),
          speed: speed > 400 ? `${speed}` : '540',
        },
      ],
    })
  } catch {
    return NextResponse.json({ cmes: [] })
  }
}
