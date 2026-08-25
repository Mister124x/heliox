"""
Router de generación de contenido para redes sociales.
HELIOX — por JESÚS BARRIOS
"""

from fastapi import APIRouter, Query
from services.content_generator import generate_solar_post, generate_reel_script, generate_daily_report_intro
from services import noaa_swpc, nasa_donki
import asyncio
from datetime import datetime

router = APIRouter()


@router.get("/post")
async def generate_post(
    platform: str = Query(default="instagram", description="instagram | tiktok | youtube | twitter"),
):
    """
    Genera un post optimizado para redes sociales con datos solares en tiempo real.
    Incluye título, cuerpo y hashtags para la plataforma especificada.
    """
    kp_data, xray_data, flares, cmes = await asyncio.gather(
        noaa_swpc.get_kp_index(),
        noaa_swpc.get_xray_flux(),
        nasa_donki.get_solar_flares(days=1),
        nasa_donki.get_cme(days=1),
    )

    kp = kp_data.get("kp", 0)
    flare_class = (flares[0].get("class_type", "") if flares else
                   xray_data.get("class", "B1.0"))
    cme_count = len(cmes)

    post = generate_solar_post(kp, flare_class, cme_count, platform)
    return {"status": "ok", "post": post}


@router.get("/reel-script")
async def generate_reel(
    platform: str = Query(default="tiktok", description="tiktok | instagram | youtube"),
):
    """
    Genera un guión completo para Reels/Shorts/TikTok (30-45 seg) con
    datos solares reales, sugerencias de visuales, texto por slide y voz en off.
    """
    kp_data, xray_data, wind_data, flares, cmes = await asyncio.gather(
        noaa_swpc.get_kp_index(),
        noaa_swpc.get_xray_flux(),
        noaa_swpc.get_solar_wind(),
        nasa_donki.get_solar_flares(days=1),
        nasa_donki.get_cme(days=1),
    )

    script = generate_reel_script(
        kp=kp_data.get("kp", 0),
        flare_class=(flares[0].get("class_type", "") if flares else xray_data.get("class", "")),
        cme_count=len(cmes),
        solar_wind_speed=wind_data.get("speed_km_s"),
    )
    return {"status": "ok", "script": script, "platform": platform}


@router.get("/daily-report")
async def daily_report():
    """
    Genera el texto de reporte diario — listo para publicar como hilo de
    Twitter/X, nota de Instagram o descripción de video YouTube.
    """
    kp_data, xray_data, flares, cmes = await asyncio.gather(
        noaa_swpc.get_kp_index(),
        noaa_swpc.get_xray_flux(),
        nasa_donki.get_solar_flares(days=1),
        nasa_donki.get_cme(days=1),
    )

    kp_history = kp_data.get("historia_3h", [])
    kp_values = [r.get("kp", 0) for r in kp_history]
    kp_max = max(kp_values) if kp_values else kp_data.get("kp", 0)
    kp_avg = sum(kp_values) / len(kp_values) if kp_values else kp_data.get("kp", 0)

    report = generate_daily_report_intro(
        kp_max=kp_max,
        kp_avg=kp_avg,
        flare_count=len(flares),
        cme_count=len(cmes),
        date_str=datetime.utcnow().strftime("%d %b %Y"),
    )

    return {
        "status": "ok",
        "report": report,
        "datos": {
            "kp_max": kp_max,
            "kp_avg": round(kp_avg, 2),
            "flares": len(flares),
            "cmes": len(cmes),
        },
        "por": "JESÚS BARRIOS · HELIOX",
    }
