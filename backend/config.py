"""
Configuración central de HELIOX.
Carga variables de entorno con valores por defecto seguros.
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # App
    APP_NAME: str = "HELIOX"
    APP_AUTHOR: str = "JESUS BARRIOS"
    APP_VERSION: str = "1.0.0"
    APP_ENV: str = "development"
    SECRET_KEY: str = "cambia_esto_en_produccion"

    # NASA
    NASA_API_KEY: str = "DEMO_KEY"

    # NOAA (sin key necesaria)
    NOAA_BASE_URL: str = "https://services.swpc.noaa.gov"

    # Helioviewer (sin key necesaria)
    HELIOVIEWER_URL: str = "https://api.helioviewer.org/v2"

    # Base de datos
    DATABASE_URL: str = "postgresql+asyncpg://heliox:heliox123@localhost:5432/heliox_db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "https://heliox.jesusbarrios.co",
    ]

    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"

    # Monetización - Google AdSense
    ADSENSE_PUBLISHER_ID: str = "ca-pub-XXXXXXXXXXXXXXXXX"

    # Datos Financieros Reales para Pagos y Donaciones (JESÚS BARRIOS)
    NEQUI_NUMBER: str = "3245884678"
    DAVIPLATA_NUMBER: str = "3245884678"
    BANK_NAME: str = "Bancolombia"
    BANK_ACCOUNT_TYPE: str = "Ahorros"
    BANK_ACCOUNT_NUMBER: str = "488474988372"
    ACCOUNT_HOLDER_NAME: str = "JESUS BARRIOS"
    ACCOUNT_HOLDER_DOC: str = "C.C. Registrada"

    # Pasarelas de Pago Online
    PAYPAL_ME_URL: str = "https://paypal.me/jesusbarrios"
    PAYPAL_QR_PATH: str = "/paypal_qr_jesus_barrios.jpg"
    PAYPAL_CLIENT_ID: str = "sb"  # 'sb' para sandbox o client_id de producción
    WOMPI_PUBLIC_KEY: str = "pub_test_XXXXXXXX"  # Wompi (Bancolombia) para PSE, Nequi y Tarjetas
    STRIPE_PUBLIC_KEY: str = "pk_test_XXXXXXXX"  # Stripe para tarjetas internacionales

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
