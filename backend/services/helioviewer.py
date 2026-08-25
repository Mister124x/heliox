"""
Servicio Helioviewer — Imágenes solares en vivo del SDO (NASA).
HELIOX — por JESÚS BARRIOS

Longitudes de onda disponibles (AIA/SDO):
  171Å  — Corona caliente (azul/dorado) — ~600,000 K
  304Å  — Cromosfera y corona baja (rojo/naranja) — ~50,000 K
  193Å  — Corona y plasma caliente (verde) — ~1.5 millones K
  211Å  — Regiones activas (morado) — ~2 millones K
  131Å  — Llamaradas (azul) — ~10 millones K
 1600Å  — Zona de transición (amarillo claro)
  HMI   — Magnetograma (campo magnético, blanco/negro)
"""

import httpx
import structlog
from datetime import datetime, timedelta
from typing import Optional

from config import settings

logger = structlog.get_logger()
BASE = settings.HELIOVIEWER_URL

# Fuentes de imagen disponibles
SOURCES = {
    "aia_171": {"observatory": "SDO", "instrument": "AIA", "detector": "AIA", "measurement": "171"},
    "aia_304": {"observatory": "SDO", "instrument": "AIA", "detector": "AIA", "measurement": "304"},
    "aia_193": {"observatory": "SDO", "instrument": "AIA", "detector": "AIA", "measurement": "193"},
    "aia_211": {"observatory": "SDO", "instrument": "AIA", "detector": "AIA", "measurement": "211"},
    "aia_131": {"observatory": "SDO", "instrument": "AIA", "detector": "AIA", "measurement": "131"},
    "aia_1600": {"observatory": "SDO", "instrument": "AIA", "detector": "AIA", "measurement": "1600"},
    "hmi_mag": {"observatory": "SDO", "instrument": "HMI", "detector": "HMI", "measurement": "magnetogram"},
    "lasco_c2": {"observatory": "SOHO", "instrument": "LASCO", "detector": "C2", "measurement": "white-light"},
    "lasco_c3": {"observatory": "SOHO", "instrument": "LASCO", "detector": "C3", "measurement": "white-light"},
}

SOURCE_DESCRIPTIONS = {
    "aia_171": "Corona Solar — 600,000 K (azul/dorado)",
    "aia_304": "Cromosfera — 50,000 K (rojo/naranja)",
    "aia_193": "Corona caliente — 1.5M K (verde)",
    "aia_211": "Regiones activas — 2M K (morado)",
    "aia_131": "Llamaradas solares — 10M K (azul)",
    "aia_1600": "Zona de transición (amarillo)",
    "hmi_mag": "Campo magnético solar",
    "lasco_c2": "Coronógrafo SOHO C2 (CME visibles)",
    "lasco_c3": "Coronógrafo SOHO C3 (CME a mayor distancia)",
}


async def get_closest_image(source_key: str = "aia_171", date: Optional[str] = None) -> dict:
    """
    Obtiene la imagen solar más reciente para una fuente dada.
    Retorna URL directa de imagen JPEG.
    """
    if source_key not in SOURCES:
        source_key = "aia_171"

    source = SOURCES[source_key]
    target_date = date or (datetime.utcnow() - timedelta(minutes=15)).strftime("%Y-%m-%dT%H:%M:%S.000Z")

    params = {
        "date": target_date,
        "sourceId": await _get_source_id(source),
    }

    url = f"{BASE}/getClosestImage/"
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            r = await client.get(url, params=params)
            r.raise_for_status()
            data = r.json()

        image_id = data.get("id")
        if not image_id:
            return _fallback_image(source_key)

        return {
            "source": source_key,
            "description": SOURCE_DESCRIPTIONS.get(source_key, ""),
            "date": data.get("date"),
            "image_url": f"{BASE}/downloadImage/?id={image_id}&scale=1&layers=[{image_id},1,100]",
            "thumbnail_url": f"https://api.helioviewer.org/v2/getTile/?id={image_id}&x=0&y=0&imageScale=4",
            "full_url": f"https://helioviewer.org/?date={data.get('date', '')}&imageLayers=[SDO,AIA,AIA,{source.get('measurement', '171')},1,100]",
            "width": data.get("width"),
            "height": data.get("height"),
            "credits": "Courtesy of NASA/SDO and the AIA, EVE, and HMI science teams.",
        }
    except Exception as e:
        logger.error("Error Helioviewer getClosestImage", error=str(e), source=source_key)
        return _fallback_image(source_key)


async def _get_source_id(source: dict) -> int:
    """Obtiene el ID numérico de una fuente en Helioviewer."""
    url = f"{BASE}/getDataSources/"
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            r = await client.get(url, params={"verbose": True, "json": True})
            r.raise_for_status()
            sources = r.json()

        obs = sources.get(source["observatory"], {})
        inst = obs.get(source["instrument"], {})
        det = inst.get(source["detector"], {})
        meas = det.get(source["measurement"], {})
        return meas.get("sourceId", 10)   # 10 = AIA 171 por defecto
    except Exception:
        # IDs por defecto conocidos
        defaults = {"171": 10, "304": 13, "193": 11, "211": 14, "131": 9, "1600": 16}
        return defaults.get(source.get("measurement", "171"), 10)


def _fallback_image(source_key: str) -> dict:
    """Imagen de respaldo si la API falla."""
    return {
        "source": source_key,
        "description": SOURCE_DESCRIPTIONS.get(source_key, ""),
        "date": None,
        "image_url": f"https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_{_wavelength(source_key)}.jpg",
        "thumbnail_url": f"https://sdo.gsfc.nasa.gov/assets/img/latest/latest_256_{_wavelength(source_key)}.jpg",
        "full_url": "https://sdo.gsfc.nasa.gov/",
        "credits": "Courtesy of NASA/SDO",
        "fallback": True,
    }


def _wavelength(source_key: str) -> str:
    mapping = {
        "aia_171": "0171",
        "aia_304": "0304",
        "aia_193": "0193",
        "aia_211": "0211",
        "aia_131": "0131",
        "aia_1600": "1600",
        "hmi_mag": "HMIB",
    }
    return mapping.get(source_key, "0171")


async def get_all_views() -> list:
    """Retorna las imágenes más recientes de todas las longitudes de onda disponibles."""
    import asyncio
    tasks = [get_closest_image(key) for key in SOURCES.keys()]
    return await asyncio.gather(*tasks)


def get_available_sources() -> list:
    """Lista de fuentes disponibles con descripción."""
    return [
        {"key": k, "description": v}
        for k, v in SOURCE_DESCRIPTIONS.items()
    ]
