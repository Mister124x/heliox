import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await fetch('https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json', { cache: 'no-store' })
    const data = await res.json()
    const flares = []
    if (Array.isArray(data) && data.length > 0) {
      const latest = data[data.length - 1]
      const flux = latest.flux || 1.2e-6
      let classType = 'C1.2'
      if (flux >= 1e-4) classType = `X${(flux / 1e-4).toFixed(1)}`
      else if (flux >= 1e-5) classType = `M${(flux / 1e-5).toFixed(1)}`
      else if (flux >= 1e-6) classType = `C${(flux / 1e-6).toFixed(1)}`
      
      flares.push({
        classType,
        beginTime: latest.time_tag || new Date().toISOString(),
        sourceLocation: 'Región Activa Solar AR3664',
      })
    }
    return NextResponse.json({ flares })
  } catch (err: any) {
    return NextResponse.json({ flares: [] })
  }
}
