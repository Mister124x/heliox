"""Health check router — HELIOX"""
from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/health")
async def health():
    return {
        "status": "ok",
        "proyecto": "HELIOX",
        "autor": "JESÚS BARRIOS",
        "timestamp": datetime.utcnow().isoformat(),
        "apis": {
            "nasa_donki": "https://api.nasa.gov/DONKI",
            "noaa_swpc": "https://services.swpc.noaa.gov",
            "helioviewer": "https://api.helioviewer.org/v2",
        },
    }
