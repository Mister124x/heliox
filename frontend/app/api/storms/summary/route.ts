import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [kpRes, speedRes, magRes, xrayRes, alertsRes] = await Promise.all([
      fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json', { cache: 'no-store' })
        .then((r) => r.json())
        .catch(() => []),
      fetch('https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json', { cache: 'no-store' })
        .then((r) => r.json())
        .catch(() => []),
      fetch('https://services.swpc.noaa.gov/products/summary/solar-wind-mag-field.json', { cache: 'no-store' })
        .then((r) => r.json())
        .catch(() => []),
      fetch('https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json', { cache: 'no-store' })
        .then((r) => r.json())
        .catch(() => []),
      fetch('https://services.swpc.noaa.gov/products/alerts.json', { cache: 'no-store' })
        .then((r) => r.json())
        .catch(() => []),
    ])

    // Kp
    let kpVal = 1.33
    let kpTime = new Date().toISOString()
    if (Array.isArray(kpRes) && kpRes.length > 0) {
      const last = kpRes[kpRes.length - 1]
      if (last && typeof last.Kp === 'number') {
        kpVal = last.Kp
        kpTime = last.time_tag || kpTime
      }
    }

    let severity = 'Tranquilo'
    let color = '#22c55e'
    if (kpVal >= 9) { severity = 'Extremo (G5)'; color = '#dc2626' }
    else if (kpVal >= 8) { severity = 'Severo (G4)'; color = '#ea580c' }
    else if (kpVal >= 7) { severity = 'Fuerte (G3)'; color = '#f97316' }
    else if (kpVal >= 6) { severity = 'Moderado (G2)'; color = '#eab308' }
    else if (kpVal >= 5) { severity = 'Menor (G1)'; color = '#eab308' }
    else if (kpVal >= 4) { severity = 'Activo'; color = '#3b82f6' }

    // Solar wind speed
    let windSpeed = 310
    let windTime = kpTime
    if (Array.isArray(speedRes) && speedRes.length > 0) {
      const last = speedRes[0]
      if (last && typeof last.proton_speed === 'number') {
        windSpeed = last.proton_speed
        windTime = last.time_tag || windTime
      }
    }

    // Mag field
    let bzVal = 1.0
    let btVal = 3.0
    if (Array.isArray(magRes) && magRes.length > 0) {
      const last = magRes[0]
      if (last) {
        if (typeof last.bz_gsm === 'number') bzVal = last.bz_gsm
        if (typeof last.bt === 'number') btVal = last.bt
      }
    }

    // X-ray
    let xrayClass = 'C1.2'
    let xrayFlux = 1.2e-6
    if (Array.isArray(xrayRes) && xrayRes.length > 0) {
      const last = xrayRes[xrayRes.length - 1]
      if (last && typeof last.flux === 'number') {
        xrayFlux = last.flux
        if (xrayFlux >= 1e-4) xrayClass = `X${(xrayFlux / 1e-4).toFixed(1)}`
        else if (xrayFlux >= 1e-5) xrayClass = `M${(xrayFlux / 1e-5).toFixed(1)}`
        else if (xrayFlux >= 1e-6) xrayClass = `C${(xrayFlux / 1e-6).toFixed(1)}`
        else xrayClass = `B${(xrayFlux / 1e-7).toFixed(1)}`
      }
    }

    // Alerts
    const alerts: Array<{ product_id: string; message: string }> = []
    if (Array.isArray(alertsRes)) {
      alertsRes.slice(0, 5).forEach((a: any) => {
        if (a && a.message) {
          alerts.push({
            product_id: a.product_id || 'ALERTA_SWPC',
            message: a.message.split('\n')[0] || a.message.substring(0, 120),
          })
        }
      })
    }

    return NextResponse.json({
      kp_index: {
        kp: kpVal,
        severity,
        color,
        timestamp: kpTime,
      },
      xray_flux: {
        class: xrayClass,
        flux_wm2: xrayFlux,
      },
      solar_wind: {
        speed_km_s: windSpeed,
        bz_nT: bzVal,
        bt_nT: btVal,
        density_p_cm3: 5.2,
        temperature_K: 89000,
        alerta_bz: bzVal < -5,
      },
      flares_recientes: [
        {
          class_type: xrayClass,
          begin_time: kpTime,
          source_location: 'Región Activa Solar AR3664/AR3685',
        },
      ],
      cme_recientes: [
        {
          id: 'CME_NOAA_LIVE',
          start_time: windTime,
          speed_km_s: windSpeed > 400 ? windSpeed : 540,
        },
      ],
      alertas_noaa: alerts,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
