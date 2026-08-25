"""
Servicio NOAA SWPC — Datos meteorológicos espaciales oficiales.
HELIOX — por JESÚS BARRIOS
"""

import httpx
import structlog
from typing import Optional

from config import settings

logger = structlog.get_logger()
BASE = settings.NOAA_BASE_URL


async def _get_json(path: str) -> dict | list | None:
    """GET async a NOAA SWPC JSON API."""
    url = f"{BASE}/json/{path}"
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            r = await client.get(url, headers={"User-Agent": "HELIOX/1.0 (jesusbarrios)"})
            r.raise_for_status()
            return r.json()
    except Exception as e:
        logger.error("Error NOAA", url=url, error=str(e))
        return None


async def get_kp_index() -> dict:
    """
    Índice Kp en tiempo real (últimas 3 horas).
    Kp 0-3: Tranquilo | 4: Activo | 5-9: Tormenta G1-G5
    """
    data = await _get_json("planetary_k_index_1m.json")
    if not data or not isinstance(data, list):
        return {"kp": 0, "severity": "Sin datos", "timestamp": None}

    latest = data[-1] if data else {}
    kp = float(latest.get("Kp", 0) or 0)

    return {
        "kp": kp,
        "severity": _kp_severity(kp),
        "color": _kp_color(kp),
        "timestamp": latest.get("time_tag"),
        "historia_3h": [
            {"time": r.get("time_tag"), "kp": float(r.get("Kp", 0) or 0)}
            for r in data[-180:]   # últimas 3h a 1 min/muestra
        ],
    }


async def get_solar_wind() -> dict:
    """Viento solar — velocidad, densidad y campo magnético."""
    data = await _get_json("rtsw/rtsw_wind.json")
    if not data or not isinstance(data, list):
        return {}

    latest = data[-1] if data else {}
    return {
        "speed_km_s": latest.get("proton_speed"),
        "density_p_cm3": latest.get("proton_density"),
        "temperature_K": latest.get("proton_temperature"),
        "bz_nT": latest.get("bz_gsm"),          # Importante: Bz negativo = peligro
        "bt_nT": latest.get("bt"),
        "timestamp": latest.get("time_tag"),
        "alerta_bz": (latest.get("bz_gsm") or 0) < -10,
    }


async def get_xray_flux() -> dict:
    """
    Flujo de rayos X GOES — clasificación de llamaradas.
    A < B < C < M < X (cada clase es 10x más fuerte)
    """
    data = await _get_json("goes/primary/xray_1m.json")
    if not data or not isinstance(data, list):
        return {}

    latest = data[-1] if data else {}
    flux_short = float(latest.get("flux", 0) or 0)   # Canal 0.05–0.4nm

    return {
        "flux_wm2": flux_short,
        "class": _flux_to_class(flux_short),
        "timestamp": latest.get("time_tag"),
        "historia_1h": [
            {"time": r.get("time_tag"), "flux": float(r.get("flux", 0) or 0)}
            for r in data[-60:]
        ],
    }


async def get_alerts() -> list:
    """Alertas y advertencias activas de NOAA SWPC."""
    data = await _get_json("alerts.json")
    if not data or not isinstance(data, list):
        return []

    return [
        {
            "product_id": a.get("product_id"),
            "issue_time": a.get("issue_time"),
            "message": a.get("message", "")[:500],  # truncar para UI
        }
        for a in data[:20]   # últimas 20 alertas
    ]


async def get_geomag_forecast() -> dict:
    """Pronóstico geomagnético de los próximos 3 días."""
    data = await _get_json("geomag_forecast.json")
    return data or {}


# ─── Helpers ─────────────────────────────────────────────────────────────────

def _kp_severity(kp: float) -> str:
    thresholds = [
        (4, "🟢 Tranquilo"),
        (5, "🟡 Activo"),
        (6, "🟠 G1 — Menor"),
        (7, "🔴 G2 — Moderado"),
        (8, "🔴 G3 — Fuerte"),
        (9, "🟣 G4 — Severo"),
    ]
    for threshold, label in thresholds:
        if kp < threshold:
            return label
    return "⚫ G5 — EXTREMO ⚠️"


def _kp_color(kp: float) -> str:
    if kp < 4:
        return "#22c55e"   # verde
    elif kp < 5:
        return "#eab308"   # amarillo
    elif kp < 6:
        return "#f97316"   # naranja
    elif kp < 8:
        return "#ef4444"   # rojo
    else:
        return "#8b5cf6"   # violeta


def _flux_to_class(flux: float) -> str:
    """Convierte flujo W/m² a clase GOES A/B/C/M/X."""
    if flux < 1e-7:
        return f"A{flux/1e-8:.1f}"
    elif flux < 1e-6:
        return f"B{flux/1e-7:.1f}"
    elif flux < 1e-5:
        return f"C{flux/1e-6:.1f}"
    elif flux < 1e-4:
        return f"M{flux/1e-5:.1f}"
    else:
        return f"X{flux/1e-4:.1f}"
