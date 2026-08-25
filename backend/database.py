"""
Base de datos — SQLAlchemy async con soporte automático para PostgreSQL o SQLite gratis.
HELIOX — por JESÚS BARRIOS
"""

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, DateTime, Float, JSON, Text
from datetime import datetime
import os

from config import settings

# Fallback automático a SQLite local si no hay PostgreSQL configurado (ideal para hosting 100% gratis)
db_url = settings.DATABASE_URL
if not db_url or "localhost:5432" in db_url:
    # Usar SQLite async local gratuito
    db_url = "sqlite+aiosqlite:///./heliox.db"

engine = create_async_engine(db_url, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


# ─── Modelos ──────────────────────────────────────────────────────────────────

class SolarEvent(Base):
    """Registro de eventos solares históricos."""
    __tablename__ = "solar_events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String(50), index=True)     # CME, FLARE, GST, SEP
    event_id = Column(String(100), unique=True)
    start_time = Column(DateTime, index=True)
    end_time = Column(DateTime, nullable=True)
    intensity = Column(String(20), nullable=True)   # X1.5, M3.2, etc.
    kp_index = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    raw_data = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)


class SocialPost(Base):
    """Publicaciones generadas automáticamente para redes sociales."""
    __tablename__ = "social_posts"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String(30))        # instagram, tiktok, youtube, twitter
    post_type = Column(String(30))       # reel_script, post, story
    title = Column(String(200))
    body = Column(Text)
    hashtags = Column(Text)
    solar_event_id = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    published = Column(Integer, default=0)  # 0=pendiente, 1=publicado


class DailyReport(Base):
    """Reportes diarios de actividad solar."""
    __tablename__ = "daily_reports"

    id = Column(Integer, primary_key=True, index=True)
    report_date = Column(String(10), unique=True, index=True)   # YYYY-MM-DD
    kp_max = Column(Float)
    kp_avg = Column(Float)
    flare_count = Column(Integer, default=0)
    cme_count = Column(Integer, default=0)
    storm_level = Column(String(20))   # Quiet, Active, Storm, Severe, Extreme
    summary = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


# ─── Helpers ─────────────────────────────────────────────────────────────────

async def init_db():
    """Crear tablas si no existen."""
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        print(f"Aviso de inicialización de BD: {e}")


async def get_db() -> AsyncSession:
    """Dependency de FastAPI para sesiones de BD."""
    async with AsyncSessionLocal() as session:
        yield session
