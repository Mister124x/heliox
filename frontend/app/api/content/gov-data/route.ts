import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  let sunspotsData = []
  let latestProtons = null
  let alertsData = []

  try {
    const res1 = await fetch('https://services.swpc.noaa.gov/json/solar-cycle/sunspots.json', { cache: 'no-store' })
    if (res1.ok) {
      const data1 = await res1.json()
      if (Array.isArray(data1)) sunspotsData = data1.slice(-12)
    }
  } catch (e) {}

  try {
    const res2 = await fetch('https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json', { cache: 'no-store' })
    if (res2.ok) {
      const data2 = await res2.json()
      if (Array.isArray(data2) && data2.length > 0) latestProtons = data2[data2.length - 1]
    }
  } catch (e) {}

  try {
    const res3 = await fetch('https://services.swpc.noaa.gov/products/alerts.json', { cache: 'no-store' })
    if (res3.ok) {
      const data3 = await res3.json()
      if (Array.isArray(data3)) alertsData = data3.slice(0, 4)
    }
  } catch (e) {}

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    apis: {
      noaa_solar_cycle: {
        name: 'NOAA Solar Cycle 25 Sunspot Progression',
        endpoint: 'https://services.swpc.noaa.gov/json/solar-cycle/sunspots.json',
        recent_sunspots: sunspotsData,
      },
      noaa_goes_protons: {
        name: 'GOES Primary Solar Energetic Protons (SEP)',
        endpoint: 'https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json',
        latest: latestProtons,
      },
      nasa_donki_alerts: {
        name: 'NASA Space Weather Database Of Notifications, Knowledge, Information (DONKI)',
        endpoint: 'https://services.swpc.noaa.gov/products/alerts.json',
        active_alerts: alertsData,
      },
      usgs_geomagnetism: {
        name: 'USGS Geomagnetism National Program Observatory Feed',
        endpoint: 'https://geomag.usgs.gov/ws/data/',
        status: 'Active Monitoring Node',
      },
    },
  })
}
