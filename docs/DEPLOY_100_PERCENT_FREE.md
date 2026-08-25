# 🚀 GUÍA DEFINITIVA: PUBLICACIÓN 100% GRATIS DE HELIOX ($0 USD / $0 COP)
## Fundador & Beneficiario: JESÚS BARRIOS

Esta guía explica la táctica exacta para poner **HELIOX en vivo en Internet** en menos de 10 minutos sin pagar ni un solo centavo por servidor, base de datos, certificado SSL ni dominio.

---

### 🌐 Arquitectura de Despliegue $0 (Cero Coste):
- **Frontend (Next.js):** [Vercel](https://vercel.com/) (Plan Hobby: \$0 de por vida, CDN mundial, SSL automático y dominio gratis tipo `https://heliox-solar.vercel.app`).
- **Backend API (FastAPI):** [Render](https://render.com/) (Plan Free Web Service: \$0 de por vida, SSL automático y dominio tipo `https://heliox-api.onrender.com`).
- **APIs Solares (NASA, NOAA, Helioviewer):** 100% Públicas y Gratuitas.

---

## 🛠️ PASO 1: Subir el Código a GitHub (Gratis - 3 Minutos)

1. Ve a [github.com](https://github.com/) e inicia sesión (o crea tu cuenta gratis).
2. Haz clic en el botón verde **"New"** (Nuevo Repositorio).
3. Nombre del repositorio: `heliox` y déjalo como **Public** o **Private**.
4. Abre tu terminal de comandos en tu computadora y corre estos comandos dentro de la carpeta del proyecto (`c:\Users\HP\Desktop\sol`):

```bash
cd c:\Users\HP\Desktop\sol
git init
git add .
git commit -m "Lanzamiento oficial HELIOX por JESUS BARRIOS"
git branch -M main
git remote add origin https://github.com/TU_USUARIO_GITHUB/heliox.git
git push -u origin main
```

---

## ⚡ PASO 2: Publicar el Backend en Render.com (Gratis - 3 Minutos)

1. Entra a [render.com](https://render.com/) y haz clic en **Get Started for Free** (inicia sesión con tu cuenta de GitHub).
2. En tu panel principal, haz clic en **New +** → **Web Service**.
3. Selecciona tu repositorio `heliox` de GitHub.
4. Rellena los campos tal cual:
   - **Name:** `heliox-api`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** `Free ($0/month)`
5. En la sección **Environment Variables (Variables de Entorno)**, añade:
   - `NASA_API_KEY`: `DEMO_KEY` *(o tu key gratuita de api.nasa.gov)*
   - `ALLOWED_ORIGINS`: `*`
   - `NEQUI_NUMBER`: `3245884678`
   - `BANK_ACCOUNT_NUMBER`: `488474988372`
   - `ACCOUNT_HOLDER_NAME`: `JESUS BARRIOS`
6. Haz clic en **Create Web Service**.
7. En 2 minutos Render te dará tu URL pública, por ejemplo:  
   👉 `https://heliox-api.onrender.com`

---

## 🖥️ PASO 3: Publicar el Frontend en Vercel (Gratis - 2 Minutos)

1. Entra a [vercel.com](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add New...** → **Project**.
3. Selecciona tu repositorio `heliox` y haz clic en **Import**.
4. En la configuración del proyecto:
   - **Framework Preset:** `Next.js` (lo detecta solo).
   - **Root Directory:** Haz clic en *Edit* y selecciona la carpeta `frontend`.
5. En la sección **Environment Variables**, añade:
   - `NEXT_PUBLIC_API_URL`: Pega la URL que te dio Render (ejemplo: `https://heliox-api.onrender.com`).
   - `NEXT_PUBLIC_NEQUI`: `3245884678`
   - `NEXT_PUBLIC_DAVIPLATA`: `3245884678`
   - `NEXT_PUBLIC_BANK_NAME`: `Bancolombia`
   - `NEXT_PUBLIC_BANK_TYPE`: `Ahorros`
   - `NEXT_PUBLIC_BANK_ACCOUNT`: `488474988372`
   - `NEXT_PUBLIC_HOLDER_NAME`: `JESUS BARRIOS`
   - `NEXT_PUBLIC_PAYPAL_ME`: `https://paypal.me/jesusbarrios`
   - `NEXT_PUBLIC_PAYPAL_QR`: `/paypal_qr_jesus_barrios.jpg`
6. Haz clic en **Deploy**.
7. ¡Vercel compilará la web y te entregará tu enlace oficial gratuito con certificado de seguridad HTTPS activo! Ejemplo:  
   👉 `https://heliox-solar.vercel.app`

---

## 🎯 PASO 4: Comprobación Final de Funcionamiento

Abre tu enlace en el navegador o en tu celular:
1. **Visor Solar:** Verás la imagen del sol cargando en directo desde el satélite SDO y podrás cambiar las longitudes de onda (304Å, 171Å, 193Å, etc.).
2. **Dashboard (`/dashboard`):** Verás las agujas de telemetría, el Kp de NOAA y la velocidad del viento solar.
3. **Tormentas (`/storms`):** Verás el listado forense de llamaradas de la NASA.
4. **Reels (`/reels`):** Podrás generar guiones para redes en 1 toque.
5. **Pestañas de Pago y Donaciones:**
   - Si tocan **Nequi**: Copiarán tu número `3245884678`.
   - Si tocan **Cuenta de Ahorros**: Copiarán tu cuenta Bancolombia `488474988372`.
   - Si tocan **PayPal**: Podrán escanear tu código QR oficial de **JESUS BARRIOS** desde su celular.
   - Los banners de **Google AdSense** y los **enlaces de telescopios** estarán activos para generar comisiones continuas.

---

*Manual de Publicación Gratuita HELIOX — Desarrollado para JESÚS BARRIOS · 2026*
