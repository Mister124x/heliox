# ☀️ HELIOX — Observatorio Solar en Tiempo Real

> **"El sol no pide permiso para actuar. Nosotros tampoco."**
> — JESÚS BARRIOS

Plataforma profesional de monitoreo solar en tiempo real construida sobre APIs oficiales de NASA, NOAA y ESA.

## Stack
- **Backend:** FastAPI (Python 3.11+)
- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Cache:** Redis
- **DB:** PostgreSQL
- **Scheduler:** Celery + Beat
- **Deploy:** Cloudflare Pages + Railway/Render
- **CDN:** Cloudflare

## Inicio Rápido

```bash
# Clonar
git clone <repo-url>
cd heliox

# Backend
cd backend
cp .env.example .env   # Agregar tus API keys
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd ../frontend
npm install
npm run dev

# Todo con Docker
docker-compose up -d
```

## APIs Integradas
| Fuente | Datos |
|--------|-------|
| NASA DONKI | CME, Flares, Tormentas geomagnéticas |
| NOAA SWPC | Kp-index, alertas en tiempo real |
| Helioviewer | Imágenes solares SDO en vivo |
| NOAA GOES | Flujo de rayos X |

## Créditos
**Creado por JESÚS BARRIOS** — 2026
Todos los datos son de fuentes públicas oficiales.

---
*Para colaborar con el proyecto: Nequi / PayPal (ver widget en la web)*
