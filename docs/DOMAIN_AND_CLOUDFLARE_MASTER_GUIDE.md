# 🛡️ PROTOCOLO MAESTRO DE DOMINIO, CLOUDFLARE Y FLUJO DE CAPITAL
## HELIOX — Fundador & Arquitecto: JESÚS BARRIOS

Este manual de ingeniería explica con precisión militar cómo conectar el dominio web, blindar el tráfico con Cloudflare a coste $0, optimizar la latencia de las imágenes del sol y garantizar el flujo continuo de comisiones y donaciones directas a tus cuentas.

---

## 🌐 FASE 1: Registro del Dominio Ideal

Recomiendo adquirir un dominio que proyecte autoridad científica y sea fácil de recordar para la audiencia de redes sociales:

1. **Opciones de Dominio de Alto Impacto:**
   - `heliox.space` (Ideal para ciencia y astronomía - ~$2 USD/año en Namecheap/Porkbun).
   - `heliox.live` (Impacto directo de tiempo real - ~$2.5 USD/año).
   - `heliox.co` (Dominio nacional/global - ~$10 USD/año).
   - `jesusbarrios.co` o subdominio `heliox.jesusbarrios.co`.

2. **Dónde comprarlo al mejor precio:**
   - [Namecheap.com](https://www.namecheap.com/) o [Porkbun.com](https://porkbun.com/) (acepta tarjeta, Nequi con tarjeta virtual o PayPal).

---

## ⚡ FASE 2: Conexión y Blindaje con Cloudflare (100% Gratis)

Cloudflare actuará como escudo contra ataques DDoS, acelerador de caché CDN para las imágenes del sol (ahorrando consumo de tu servidor) y proveedor de SSL automático.

### Paso a paso:
1. Regístrate gratis en [cloudflare.com](https://www.cloudflare.com/).
2. Haz clic en **Add a Site** e ingresa tu dominio (ejemplo: `heliox.space`).
3. Selecciona el **Plan Gratuito (Free Tier $0)**.
4. Cloudflare te dará dos servidores de nombres (Nameservers), por ejemplo:
   - `alec.ns.cloudflare.com`
   - `claire.ns.cloudflare.com`
5. Ve a Namecheap / registrador de tu dominio → Menú **Custom DNS** y pega esos dos Nameservers.

### Configuración de Registros DNS en Cloudflare:
| Tipo | Nombre | Contenido / Destino | Proxy Status |
| :--- | :--- | :--- | :--- |
| **A** | `@` (o tu dominio) | `IP_DE_TU_SERVIDOR` | 🟠 Proxied (Nube Naranja) |
| **A** | `api` | `IP_DE_TU_SERVIDOR` | 🟠 Proxied (Nube Naranja) |
| **CNAME** | `www` | `@` | 🟠 Proxied (Nube Naranja) |

---

## 🚀 FASE 3: Reglas de Caché en Cloudflare (Velocidad Extrema)

Para que las imágenes del sol carguen en 50 milisegundos en cualquier parte del mundo sin sobrecargar la API de la NASA ni tu servidor:

1. En el panel de Cloudflare ve a **Rules** → **Cache Rules** → **Create Rule**.
2. **Nombre de regla:** `Cache Solar Images`
3. **Condición:** Si la URL contiene `/api/solar/` o termina en `.jpg`/`.png`.
4. **Acción de caché:** *Cache Everything* con TTL de **5 minutos (300 segundos)**.
5. ¡Listo! El 95% del tráfico lo responderá la red mundial de Cloudflare gratis.

---

## 💰 FASE 4: Arquitectura del Flujo de Dinero y Comisiones

El ecosistema está programado para generar 4 líneas de ingresos que se complementan:

```
                               ┌────────────────────────────────────────────────┐
                               │            TRÁFICO DE AUDIENCIA                │
                               │  TikTok · Instagram Reels · YouTube · Google   │
                               └───────────────────────┬────────────────────────┘
                                                       │
                                                       ▼
                               ┌────────────────────────────────────────────────┐
                               │           PLATAFORMA HELIOX WEB                │
                               │      (Monitoreo Solar Libre en Tiempo Real)    │
                               └───────┬───────────────┬────────────────┬───────┘
                                       │               │                │
            ┌──────────────────────────┴────┐          │          ┌─────┴─────────────────────────┐
            │                               │          │          │                               │
            ▼                               ▼          │          ▼                               ▼
 ┌──────────────────────┐       ┌───────────────────┐  │  ┌───────────────────────┐   ┌───────────────────────┐
 │ 1. DONACIONES DIRECTAS│       │ 2. COMISIÓN VENTA │  │  │ 3. GOOGLE ADSENSE     │   │ 4. PAYPAL / GLOBAL    │
 │ (Nequi / Bancolombia)│       │    DE TELESCOPIOS │  │  │ (Banners Publicitarios│   │ (Donaciones en USD /  │
 │ 0% COMISIÓN          │       │ (Celestron/ZWO/Amazon)  │ (Depósito mensual 21-26) Tarjetas Globales)     │
 └──────────┬───────────┘       └─────────┬─────────┘  │  └───────────┬───────────┘   └───────────┬───────────┘
            │                             │            │              │                           │
            │  Nequi: 3245884678          │ $70-$350   │              │ Ahorros: 488474988372     │ QR Oficial
            │  Ahorros: 488474988372      │ por unidad │              │ Bancolombia SWIFT         │ JESUS BARRIOS
            │                             │            │              │                           │
            └─────────────────────────────┼────────────┴──────────────┴───────────────────────────┘
                                          │
                                          ▼
                      ┌───────────────────────────────────────┐
                      │    BOLSA DE FONDOS E INVESTIGACIÓN    │
                      │    Beneficiario: JESÚS BARRIOS        │
                      └───────────────────────────────────────┘
```

### Tabla de Rendimiento Financiero por Canal:
| Canal de Monetización | Mecanismo | Flujo de Cobro | Destino Final |
| :--- | :--- | :--- | :--- |
| **Nequi Directo** | Transferencia móvil o QR | Inmediato (0 seg) | Nequi `3245884678` |
| **Cuenta Bancaria** | PSE / Transferencia directa | Inmediato | Bancolombia `488474988372` |
| **PayPal Internacional** | Escaneo de QR oficial en USD | Inmediato | Cuenta PayPal de Jesús Barrios |
| **Google AdSense** | Banners en web y dashboard | Mensual (21 al 26) | Depósito directo a Bancolombia |
| **Afiliados Ópticos** | Telescopios Celestron / ZWO | Mensual por ventas | Transferencia a cuenta o PayPal |
| **YouTube Shorts** | Fondo de creadores / Ads | Mensual | Vinculado a tu Google AdSense |

---

## 🎬 FASE 5: Estrategia de Viralización Diaria (15 Minutos al Día)

1. Entra a `heliox.space/reels`.
2. Selecciona **TikTok**, **Instagram** o **YouTube**.
3. Haz clic en **Copiar Guion y Hashtags** (la IA ya tomó los datos satelitales del día).
4. Graba tu video usando como fondo una imagen o video del sol desde el visor de HELIOX.
5. Pega el enlace de HELIOX en tu biografía ("Link en bio para ver el sol en vivo").
6. Todo el tráfico que llegue verá las alertas, los banners de AdSense, los telescopios recomendados y el widget de donación.

---

*Manual de Operaciones HELIOX — Creado y validado para JESÚS BARRIOS · 2026*
