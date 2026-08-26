import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [sunspotsRes, protonRes, alertsRes] = await Promise.allSettled([
      fetch('https://services.swpc.noaa.gov/json/solar-cycle/sunspots.json', { cache: 'no-store' }).then(r => r.json()),
      fetch('https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json', { cache: 'no-store' }).then(r => r.json()),
      fetch('https://services.swpc.noaa.gov/products/alerts.json', { cache: 'no-store' }).then(r => r.json()),
    ])

    const sunspotsData = sunspotsRes.status === 'fulfilled' && Array.isArray(sunspotsRes.value)
      ? sunspotsRes.value.slice(-12)
      : []

    const latestProtons = protonRes.status === 'fulfilled' && Array.isArray(protonRes.value) && protonRes.value.length > 0
      ? protonRes.value[protonRes.value.length - 1]
      : null

    const alertsData = alertsRes.status === 'fulfilled' && Array.isArray(alertsRes.value)
      ? alertsRes.value.slice(0, 4)
      : []

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
        esa_helioviewer: {
          name: 'ESA / NASA Helioviewer SDO Spectroscopic Image Pipeline',
          endpoint: 'https://api.helioviewer.org/v2/',
          status: 'Direct Image Cache Stream',
        }
      }
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
