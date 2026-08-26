import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json', { cache: 'no-store' })
    const data = await res.json()
    const storms: any[] = []
    if (Array.isArray(data)) {
      data.slice(-5).forEach((item: any) => {
        if (item && item.Kp >= 4) {
          storms.push({
            observedTime: item.time_tag,
            kp: item.Kp,
            severity: item.Kp >= 7 ? 'G3+' : item.Kp >= 5 ? 'G1-G2' : 'Activo',
          })
        }
      })
    }
    return NextResponse.json({ storms })
  } catch {
    return NextResponse.json({ storms: [] })
  }
}
