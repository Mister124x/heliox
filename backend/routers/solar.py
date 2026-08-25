"""
Router de imágenes solares en vivo.
HELIOX — por JESÚS BARRIOS
"""

from fastapi import APIRouter, Query, HTTPException
from services.helioviewer import get_closest_image, get_all_views, get_available_sources

router = APIRouter()


@router.get("/live")
async def solar_live(
    source: str = Query(default="aia_171", description="Fuente de imagen: aia_171, aia_304, aia_193, hmi_mag, etc."),
):
    """
    Imagen solar más reciente del Observatorio de Dinámica Solar (SDO/NASA)
    via Helioviewer API.
    
    - **aia_171**: Corona caliente (azul/dorado) — ~600,000 K
    - **aia_304**: Cromosfera (rojo/naranja) — ~50,000 K  
    - **aia_193**: Corona y plasma (verde) — ~1.5M K
    - **hmi_mag**: Campo magnético solar
    - **lasco_c2**: Coronógrafo SOHO (ver CME)
    """
    data = await get_closest_image(source)
    return {
        "status": "ok",
        "data": data,
        "creditos": "NASA/SDO · Helioviewer Project",
        "por": "JESÚS BARRIOS · HELIOX",
    }


@router.get("/all-views")
async def solar_all_views():
    """Todas las longitudes de onda disponibles en una sola llamada."""
    views = await get_all_views()
    return {
        "status": "ok",
        "count": len(views),
        "views": views,
        "por": "JESÚS BARRIOS · HELIOX",
    }


@router.get("/sources")
async def solar_sources():
    """Lista de todas las fuentes de imagen disponibles con descripción."""
    return {
        "status": "ok",
        "sources": get_available_sources(),
        "nota": "Usa el campo 'key' en /api/solar/live?source=<key>",
    }
