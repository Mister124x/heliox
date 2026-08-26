/**
 * Cloudflare Edge Worker para HELIOX
 * Caché perimetral de imágenes del sol y datos de satélites
 * Reduce la latencia global a <30ms y ahorra ancho de banda.
 * por JESÚS BARRIOS
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    // 1. Si es solicitud a la API o imagen solar
    if (url.pathname.startsWith('/api/solar') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.png')) {
      const cache = caches.default
      let response = await cache.match(request)

      if (!response) {
        // Redirigir al origen
        const targetUrl = new URL(url.pathname + url.search, env.BACKEND_ORIGIN || 'https://heliox-api.onrender.com')
        response = await fetch(targetUrl.toString(), {
          headers: request.headers,
        })

        // Guardar en caché perimetral de Cloudflare por 5 minutos (300 segundos)
        const responseToCache = new Response(response.body, response)
        responseToCache.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300')
        responseToCache.headers.set('X-Heliox-Cache', 'HIT-CLOUDFLARE-EDGE')
        ctx.waitUntil(cache.put(request, responseToCache.clone()))
        return responseToCache
      }

      return response
    }

    // 2. Tráfico general hacia el frontend de Vercel
    const frontendUrl = new URL(url.pathname + url.search, env.FRONTEND_ORIGIN || 'https://heliox-git-main-jesus-barrios.vercel.app')
    return fetch(frontendUrl.toString(), {
      headers: request.headers,
    })
  },
}
