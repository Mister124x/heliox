# 💰 GUÍA DE MONETIZACIÓN Y TRANSFERENCIA AUTOMÁTICA DE INGRESOS
## HELIOX — Beneficiario Oficial: JESÚS BARRIOS

Este documento detalla exactamente cómo se cobra cada canal de ingresos y cómo se configuran las cuentas bancarias para que el dinero llegue directamente a:
- **Nequi / Daviplata:** `3245884678`
- **Cuenta de Ahorros:** `488474988372` (Bancolombia)
- **PayPal Oficial:** Código QR de JESÚS BARRIOS

---

## 1. 💵 Google AdSense (Publicidad Web en HELIOX)

Google AdSense deposita mensualmente todos los ingresos generados por los banners publicitarios directamente en tu **Cuenta de Ahorros**.

### Pasos para configurar el cobro en Google AdSense:
1. Inicia sesión en [google.com/adsense](https://www.google.com/adsense/).
2. Ve al menú lateral: **Pagos (Payments)** → **Información de pagos (Payment info)**.
3. Haz clic en **Añadir método de pago (Add payment method)**.
4. Selecciona **Transferencia bancaria a una cuenta bancaria (Wire transfer to bank account)**.
5. Ingresa los siguientes datos exactos:
   - **Nombre del titular de la cuenta:** `JESUS BARRIOS`
   - **Nombre del banco:** `Bancolombia S.A.`
   - **Código SWIFT/BIC:** `COLOCOBM` *(Código SWIFT oficial de Bancolombia para Colombia)*
   - **Número de cuenta:** `488474988372`
   - **Tipo de cuenta:** Ahorros (Savings)
6. Guarda la configuración. 
7. **Fecha de Pago:** Google transfiere automáticamente entre los días **21 y 26 de cada mes** cada vez que acumules \$50 o \$100 USD en ingresos. El dinero llega en pesos colombianos a tu cuenta de ahorros.

---

## 2. 📱 Nequi y Daviplata (`3245884678`)

- **Cómo se recibe:** 100% directo, instantáneo y sin intermediarios.
- **Visualización en la web:** Los visitantes hacen clic en la pestaña "Nequi / Daviplata" y tienen un botón de un solo toque para copiar el número `3245884678` o transferir desde Transfiya.
- **Comisión:** 0%. El dinero entra directo a tu saldo disponible de Nequi.

---

## 3. 🌐 PayPal (Donaciones Internacionales)

- **Handle Oficial:** `@JesusBarriosGiraldo`
- **Enlace Directo:** `https://paypal.me/JesusBarriosGiraldo`
- **Cómo pagan los usuarios:**
  - Los visitantes hacen clic en la pestaña "PayPal" en la web y pueden donar en dólares ($5, $10, $25, $50, $100 USD) o copiar el enlace directo `paypal.me/JesusBarriosGiraldo`.
- **Retiro a Nequi / Bancolombia:**
  - Puedes vincular tu cuenta de PayPal con tu **Nequi** desde la opción *"Servicios → PayPal"* en tu app de Nequi para traer tus dólares de PayPal directamente a tu Nequi en pesos colombianos en 2 minutos.

---

## 4. 🛒 Amazon Associates (Comisiones de Equipos)

- **Store ID Oficial:** `jesusbarrios2-20`
- **Tasa de Comisión:** 1% a 10% por cada producto comprado en Amazon tras hacer clic en los enlaces de telescopios y accesorios.
- **Cobro:** Depósito directo a cuenta de banco o tarjetas de regalo de Amazon.

---

## 5. 💳 Tarjetas de Crédito / Débito & PSE (Wompi Bancolombia)

- **Qué es:** Wompi es la pasarela de pagos de Bancolombia que permite a los usuarios pagar con tarjeta o débito bancario.
- **Configuración de abonos:**
  1. Ingresa a [wompi.co](https://wompi.co/) y crea tu cuenta vinculando tu número de cuenta de ahorros `488474988372` o tu Nequi `3245884678`.
  2. En el panel de Wompi, obtén tu **Llave Pública (Public Key)** y pégala en tu archivo `.env`:
     ```env
     NEXT_PUBLIC_WOMPI_KEY=pub_prod_TU_LLAVE_AQUI
     ```
  3. Cada vez que alguien pague con tarjeta o PSE en la web, Wompi dispersa el dinero directamente a tu cuenta bancaria o Nequi.

---

## 5. 🎬 Monetización de Redes Sociales (TikTok, YouTube Shorts, Reels)

Los guiones generados automáticamente por la API de HELIOX (`/api/content/reel-script`) te permiten crear videos cortos de 30 segundos.

- **YouTube Shorts:** Vinculas la misma cuenta de Google AdSense descrita en el Punto 1.
- **TikTok / Meta:** En el panel de creadores de TikTok y Meta, agregas tu cuenta de ahorros `488474988372` para recibir las regalías mensuales de vistas y suscripciones.

---

*Documento confidencial del proyecto HELIOX · Preparado para JESÚS BARRIOS*
