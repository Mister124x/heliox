"""
HELIOX — Backend Principal
Observatorio Solar en Tiempo Real
Creado por JESÚS BARRIOS — 2026
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import structlog

from config import settings
from routers import solar, storms, content, health, payments
from database import init_db

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Inicialización y cierre de la aplicación."""
    logger.info("🌞 HELIOX iniciando...", author="JESUS BARRIOS", version=settings.APP_VERSION)
    await init_db()
    yield
    logger.info("🌙 HELIOX cerrando...")


app = FastAPI(
    title="HELIOX API",
    description=(
        "☀️ Observatorio Solar en Tiempo Real\n\n"
        "Datos en tiempo real de NASA, NOAA y ESA.\n\n"
        "**Creado por JESÚS BARRIOS**\n\n"
        "APIs integradas:\n"
        "- NASA DONKI (tormentas, CME, llamaradas)\n"
        "- NOAA SWPC (índice Kp, alertas)\n"
        "- Helioviewer/SDO (imágenes solares en vivo)\n"
        "- NOAA GOES (flujo de rayos X)\n"
        "- Pagos & Donaciones (Nequi, Daviplata, Cuenta de Ahorros, PayPal, Tarjeta)\n"
    ),
    version=settings.APP_VERSION,
    contact={
        "name": "JESÚS BARRIOS",
        "url": "https://heliox.jesusbarrios.co",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
    lifespan=lifespan,
)

# ─── CORS ───────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ─────────────────────────────────────────────────────────────────
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(solar.router, prefix="/api/solar", tags=["Solar"])
app.include_router(storms.router, prefix="/api/storms", tags=["Tormentas"])
app.include_router(content.router, prefix="/api/content", tags=["Contenido RRSS"])
app.include_router(payments.router, prefix="/api/payments", tags=["Pagos & Donaciones"])


@app.get("/", tags=["Root"])
async def root():
    return {
        "proyecto": "HELIOX",
        "descripcion": "Observatorio Solar en Tiempo Real",
        "autor": "JESÚS BARRIOS",
        "version": settings.APP_VERSION,
        "estado": "✅ En línea",
        "docs": "/docs",
        "redoc": "/redoc",
        "apis": {
            "solar": "/api/solar",
            "tormentas": "/api/storms",
            "contenido": "/api/content",
            "pagos": "/api/payments",
            "salud": "/api/health",
        },
    }


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error("Error no manejado", error=str(exc), path=str(request.url))
    return JSONResponse(
        status_code=500,
        content={
            "error": "Error interno del servidor",
            "mensaje": "El equipo de HELIOX ha sido notificado.",
            "autor": "JESÚS BARRIOS",
        },
    )
