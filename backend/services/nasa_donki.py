"""
Servicio NASA DONKI — Tormentas y eventos solares.
HELIOX — por JESÚS BARRIOS
"""

import httpx
from datetime import datetime, timedelta
from typing import Optional
import structlog

from config import settings

logger = structlog.get_logger()

BASE_URL = "https://api.nasa.gov/DONKI"


async def _get(endpoint: str, params: dict = None) -> dict | list:
    """Llamada async a NASA DONKI."""
    default_params = {
        "api_key": settings.NASA_API_KEY,
        "startDate": (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%d"),
        "endDate": datetime.utcnow().strftime("%Y-%m-%d"),
    }
    if params:
        default_params.update(params)

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(f"{BASE_URL}/{endpoint}", params=default_params)
        response.raise_for_status()
        return response.json()


async def get_cme(days: int = 7) -> list:
    """Eyecciones de masa coronal recientes."""
    try:
        data = await _get("CME", {
            "startDate": (datetime.utcnow() - timedelta(days=days)).strftime("%Y-%m-%d"),
        })
        return [_parse_cme(e) for e in (data or [])]
    except Exception as e:
        logger.error("Error obteniendo CME", error=str(e))
        return []


def _parse_cme(raw: dict) -> dict:
    return {
        "id": raw.get("activityID", ""),
        "start_time": raw.get("startTime", ""),
        "source_location": raw.get("sourceLocation", "Desconocida"),
        "active_region_num": raw.get("activeRegionNum"),
        "note": raw.get("note", ""),
        "speed_km_s": _extract_speed(raw),
        "instruments": [i.get("displayName") for i in raw.get("instruments", [])],
        "linked_events": raw.get("linkedEvents", []),
    }


def _extract_speed(cme: dict) -> Optional[float]:
    """Extrae velocidad de los análisis de CME."""
    analyses = cme.get("cmeAnalyses", [])
    if analyses:
        return analyses[0].get("speed")
    return None


async def get_geomagnetic_storms(days: int = 7) -> list:
    """Tormentas geomagnéticas recientes."""
    try:
        data = await _get("GST", {
            "startDate": (datetime.utcnow() - timedelta(days=days)).strftime("%Y-%m-%d"),
        })
        return [_parse_gst(e) for e in (data or [])]
    except Exception as e:
        logger.error("Error obteniendo tormentas GST", error=str(e))
        return []


def _parse_gst(raw: dict) -> dict:
    kp_data = raw.get("allKpIndex", [])
    max_kp = max((k.get("kpIndex", 0) for k in kp_data), default=0)
    return {
        "id": raw.get("gstID", ""),
        "start_time": raw.get("startTime", ""),
        "kp_max": max_kp,
        "kp_data": kp_data,
        "severity": _kp_to_severity(max_kp),
        "linked_events": raw.get("linkedEvents", []),
    }


def _kp_to_severity(kp: float) -> str:
    if kp < 4:
        return "Tranquilo"
    elif kp < 5:
        return "Activo"
    elif kp < 6:
        return "G1 — Menor"
    elif kp < 7:
        return "G2 — Moderado"
    elif kp < 8:
        return "G3 — Fuerte"
    elif kp < 9:
        return "G4 — Severo"
    else:
        return "G5 — EXTREMO ⚠️"


async def get_solar_flares(days: int = 7) -> list:
    """Llamaradas solares recientes."""
    try:
        data = await _get("FLR", {
            "startDate": (datetime.utcnow() - timedelta(days=days)).strftime("%Y-%m-%d"),
        })
        return [_parse_flare(e) for e in (data or [])]
    except Exception as e:
        logger.error("Error obteniendo llamaradas", error=str(e))
        return []


def _parse_flare(raw: dict) -> dict:
    return {
        "id": raw.get("flrID", ""),
        "begin_time": raw.get("beginTime", ""),
        "peak_time": raw.get("peakTime", ""),
        "end_time": raw.get("endTime", ""),
        "class_type": raw.get("classType", ""),
        "source_location": raw.get("sourceLocation", ""),
        "active_region": raw.get("activeRegionNum"),
        "instruments": [i.get("displayName") for i in raw.get("instruments", [])],
    }


async def get_sep(days: int = 7) -> list:
    """Partículas energéticas solares."""
    try:
        data = await _get("SEP", {
            "startDate": (datetime.utcnow() - timedelta(days=days)).strftime("%Y-%m-%d"),
        })
        return data or []
    except Exception as e:
        logger.error("Error obteniendo SEP", error=str(e))
        return []
