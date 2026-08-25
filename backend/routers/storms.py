"""
Router de tormentas solares — CME, Llamaradas, Kp, Viento Solar.
HELIOX — por JESÚS BARRIOS

Combina NASA DONKI + NOAA SWPC para el panel de alertas completo.
Incluye WebSocket para alertas en tiempo real.
"""

import asyncio
import json
from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect
from services import nasa_donki, noaa_swpc
import structlog

logger = structlog.get_logger()
router = APIRouter()

# ─── Conexiones WebSocket activas ────────────────────────────────────────────
active_connections: list[WebSocket] = []


@router.get("/summary")
async def storms_summary():
    """
    Resumen completo del clima espacial actual.
    Combina todas las fuentes en una sola respuesta.
    """
    kp_data, xray_data, wind_data, flares, cmes, storms, alerts = await asyncio.gather(
        noaa_swpc.get_kp_index(),
        noaa_swpc.get_xray_flux(),
        noaa_swpc.get_solar_wind(),
        nasa_donki.get_solar_flares(days=3),
        nasa_donki.get_cme(days=3),
        nasa_donki.get_geomagnetic_storms(days=7),
        noaa_swpc.get_alerts(),
    )

    return {
        "status": "ok",
        "timestamp_utc": __import__("datetime").datetime.utcnow().isoformat(),
        "kp_index": kp_data,
        "xray_flux": xray_data,
        "solar_wind": wind_data,
        "flares_recientes": flares[:5],
        "cme_recientes": cmes[:5],
        "tormentas_geomagneticas": storms[:3],
        "alertas_noaa": alerts[:10],
        "por": "JESÚS BARRIOS · HELIOX",
        "fuentes": ["NASA DONKI", "NOAA SWPC", "NOAA GOES"],
    }


@router.get("/kp")
async def kp_index():
    """Índice Kp en tiempo real (actualizado cada minuto por NOAA)."""
    data = await noaa_swpc.get_kp_index()
    return {"status": "ok", "data": data}


@router.get("/flares")
async def solar_flares(days: int = Query(default=7, ge=1, le=30)):
    """Llamaradas solares de los últimos N días (NASA DONKI + NOAA GOES)."""
    donki_flares, xray = await asyncio.gather(
        nasa_donki.get_solar_flares(days=days),
        noaa_swpc.get_xray_flux(),
    )
    return {
        "status": "ok",
        "current_xray": xray,
        "flares": donki_flares,
        "count": len(donki_flares),
        "period_days": days,
    }


@router.get("/cme")
async def coronal_mass_ejections(days: int = Query(default=7, ge=1, le=30)):
    """Eyecciones de masa coronal detectadas por NASA."""
    data = await nasa_donki.get_cme(days=days)
    return {
        "status": "ok",
        "cmes": data,
        "count": len(data),
        "period_days": days,
        "nota": "CME veloces (>900 km/s) pueden impactar Tierra en 1-3 días.",
    }


@router.get("/geomagnetic")
async def geomagnetic_storms(days: int = Query(default=7, ge=1, le=30)):
    """Tormentas geomagnéticas recientes con clasificación G1-G5."""
    data = await nasa_donki.get_geomagnetic_storms(days=days)
    return {
        "status": "ok",
        "storms": data,
        "count": len(data),
        "period_days": days,
    }


@router.get("/wind")
async def solar_wind():
    """Viento solar en tiempo real — velocidad, densidad, campo Bz."""
    data = await noaa_swpc.get_solar_wind()
    return {
        "status": "ok",
        "data": data,
        "alerta_critica": data.get("alerta_bz", False),
        "nota": "Bz negativo < -10 nT indica condiciones favorables para tormenta.",
    }


@router.get("/alerts")
async def space_weather_alerts():
    """Alertas y advertencias oficiales activas de NOAA SWPC."""
    data = await noaa_swpc.get_alerts()
    return {
        "status": "ok",
        "alerts": data,
        "count": len(data),
        "fuente": "NOAA Space Weather Prediction Center",
    }


# ─── WebSocket — Alertas en Tiempo Real ───────────────────────────────────────

@router.websocket("/ws/live")
async def websocket_alerts(websocket: WebSocket):
    """
    WebSocket para alertas solares en tiempo real.
    Envía datos actualizados cada 60 segundos.
    
    Conectar desde el frontend:
        const ws = new WebSocket('ws://localhost:8000/api/storms/ws/live');
        ws.onmessage = (event) => console.log(JSON.parse(event.data));
    """
    await websocket.accept()
    active_connections.append(websocket)
    logger.info("WebSocket conectado", total=len(active_connections))

    try:
        while True:
            kp_data, xray_data = await asyncio.gather(
                noaa_swpc.get_kp_index(),
                noaa_swpc.get_xray_flux(),
            )

            message = {
                "type": "solar_update",
                "kp": kp_data.get("kp"),
                "kp_severity": kp_data.get("severity"),
                "kp_color": kp_data.get("color"),
                "xray_class": xray_data.get("class"),
                "xray_flux": xray_data.get("flux_wm2"),
                "timestamp": kp_data.get("timestamp"),
                "por": "HELIOX · JESÚS BARRIOS",
            }

            await websocket.send_text(json.dumps(message))
            await asyncio.sleep(60)   # Actualizar cada minuto

    except WebSocketDisconnect:
        active_connections.remove(websocket)
        logger.info("WebSocket desconectado", total=len(active_connections))
