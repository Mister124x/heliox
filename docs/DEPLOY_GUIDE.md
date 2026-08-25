## ☀️ GUÍA DE DESPLIEGUE — HELIOX en Producción

### por JESÚS BARRIOS

---

## Opción 1: Deploy GRATUITO (Recomendado para empezar)

### Backend en Railway.app (FREE tier)
```bash
# 1. Crear cuenta en railway.app
# 2. Nuevo proyecto → Deploy from GitHub

# Variables de entorno en Railway:
NASA_API_KEY=tu_key_de_api.nasa.gov
DATABASE_URL=postgresql+asyncpg://... (Railway provee PostgreSQL)
REDIS_URL=redis://... (Railway provee Redis)
ALLOWED_ORIGINS=https://tu-frontend.vercel.app
```

### Frontend en Vercel (FREE tier)
```bash
# 1. Crear cuenta en vercel.com
# 2. Import desde GitHub

# Variables de entorno en Vercel:
NEXT_PUBLIC_API_URL=https://tu-backend.railway.app
NEXT_PUBLIC_NEQUI=3001234567
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXX
```

---

## Opción 2: VPS + Cloudflare (Producción real ~$5-10/mes)

### 1. Contratar VPS
- **DigitalOcean Droplet:** $4/mes (512MB RAM) → $6/mes (1GB RAM)
- **Linode (Akamai):** $5/mes
- **Hetzner:** €3.29/mes (muy barato y confiable)
- **Hostinger VPS:** desde $3.99/mes

### 2. Configurar el servidor
```bash
# Conectar por SSH
ssh root@TU_IP

# Instalar Docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker

# Clonar el proyecto
git clone https://github.com/jesusbarrios/heliox.git
cd heliox

# Configurar variables de entorno
cp backend/.env.example backend/.env
nano backend/.env   # Editar con tus keys reales

# Levantar todo
docker-compose up -d

# Ver logs
docker-compose logs -f api
```

### 3. Configurar dominio con Cloudflare
```
1. Comprar dominio en Namecheap (~$10/año para .co)
   Sugerencia: heliox.co o heliox.jesusbarrios.co

2. Agregar a Cloudflare (gratis):
   - DNS A record: @ → TU_IP_VPS
   - DNS A record: www → TU_IP_VPS
   
3. SSL/TLS: Cloudflare provee SSL automáticamente ✅
4. Cache: Configurar cache de imágenes solares por 5 min en Cloudflare ✅
5. DDoS Protection: Automática con Cloudflare ✅
6. Analytics: Cloudflare Web Analytics (gratis) ✅
```

### 4. Obtener certificado SSL
```bash
# Con Let's Encrypt (gratis):
apt install certbot python3-certbot-nginx
certbot --nginx -d heliox.jesusbarrios.co
certbot renew --dry-run  # Verificar renovación automática
```

---

## Monetización — Pasos Concretos

### Google AdSense
```
1. Tener mínimo 20 páginas/artículos con contenido original
2. Tener tráfico estable (mínimo 30 días de datos)
3. Ir a google.com/adsense → Solicitar
4. Agregar el script en frontend/app/layout.tsx (ya está preparado)
5. Agregar tu Publisher ID en .env: NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXX
```

### Nequi (Donaciones directas)
```
Ya está integrado en DonationWidget.tsx
Solo actualizar el número en .env: NEXT_PUBLIC_NEQUI=3001234567
```

### YouTube (Monetización)
```
Requisitos YouTube Partner Program:
- 1,000 suscriptores
- 4,000 horas vistas (videos largos) O 10M visualizaciones Shorts (90 días)
Tiempo estimado: 3-6 meses con publicación constante
```

---

## APIs Keys — Dónde Obtenerlas

| API | URL | Costo | Tiempo |
|-----|-----|-------|--------|
| NASA API Key | api.nasa.gov | GRATIS | 5 minutos |
| NOAA SWPC | services.swpc.noaa.gov | GRATIS - sin key | Inmediato |
| Helioviewer | api.helioviewer.org | GRATIS - sin key | Inmediato |

---

## Checklist de Lanzamiento

- [ ] Clonar repositorio en servidor o Railway
- [ ] Configurar variables de entorno (.env)
- [ ] Obtener NASA API key (api.nasa.gov)
- [ ] Levantar con docker-compose up -d
- [ ] Verificar que /api/health responde 200
- [ ] Verificar que /api/solar/live devuelve imágenes
- [ ] Verificar que /api/storms/summary devuelve datos
- [ ] Configurar dominio en Cloudflare
- [ ] Configurar SSL (Cloudflare o Let's Encrypt)
- [ ] Crear cuentas en redes sociales (@heliox_solar)
- [ ] Solicitar Google AdSense (después de 20+ artículos)
- [ ] Publicar primer post con datos reales

---

*HELIOX · por JESÚS BARRIOS · heliox.jesusbarrios.co*
