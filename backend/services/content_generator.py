"""
Generador de contenido para redes sociales.
HELIOX — por JESÚS BARRIOS

Genera automáticamente:
- Posts para Instagram
- Scripts para TikTok y YouTube Shorts (Reels)
- Títulos atractivos con datos reales
- Hashtags optimizados por plataforma
"""

from datetime import datetime


def generate_solar_post(kp: float, flare_class: str, cme_count: int, platform: str = "instagram") -> dict:
    """Genera un post completo para redes sociales con datos reales."""
    now = datetime.utcnow()
    date_str = now.strftime("%d %b %Y %H:%M UTC")

    severity = _severity_label(kp)
    emoji = _severity_emoji(kp)

    title = _generate_title(kp, flare_class, cme_count, emoji)
    body = _generate_body(kp, flare_class, cme_count, severity, date_str)
    hashtags = _get_hashtags(platform, kp, flare_class)

    return {
        "platform": platform,
        "title": title,
        "body": body,
        "hashtags": hashtags,
        "full_post": f"{title}\n\n{body}\n\n{hashtags}",
        "generated_at": now.isoformat(),
        "author": "JESÚS BARRIOS · HELIOX",
    }


def generate_reel_script(kp: float, flare_class: str, cme_count: int, solar_wind_speed: float = None) -> dict:
    """
    Genera un guión para Reels/Shorts/TikTok de 30-60 segundos.
    Incluye hook, desarrollo, call to action y sugerencias visuales.
    """
    severity = _severity_label(kp)
    emoji = _severity_emoji(kp)

    if kp >= 7:
        hook = f"⚠️ TORMENTA SOLAR {severity.upper()} — Kp {kp:.1f}"
        urgency = "ALTA"
    elif kp >= 5:
        hook = f"🌩️ Alerta Geomagnética — El sol está activo hoy"
        urgency = "MEDIA"
    else:
        hook = f"☀️ El sol hoy — Lo que la NASA captó"
        urgency = "NORMAL"

    script = {
        "title": hook,
        "duration_seconds": "30-45",
        "urgency": urgency,
        "slides": [
            {
                "second": "0-3",
                "texto": hook,
                "visual": "Imagen AIA 304Å del sol + texto en llamas",
                "voz": hook,
            },
            {
                "second": "3-10",
                "texto": f"Índice Kp: {kp:.1f} — {severity}",
                "visual": "Gauge animado de Kp subiendo",
                "voz": f"El índice Kp llegó a {kp:.1f}, eso significa {severity.lower()}.",
            },
            {
                "second": "10-20",
                "texto": (
                    f"Llamaradas clase {flare_class} detectadas\n"
                    f"{cme_count} eyecciones de masa coronal activas"
                    + (f"\nViento solar: {solar_wind_speed:.0f} km/s" if solar_wind_speed else "")
                ),
                "visual": "Animación de llamarada solar + líneas de campo magnético",
                "voz": (
                    f"Hoy se detectaron llamaradas clase {flare_class} "
                    f"y {cme_count} eyecciones coronales hacia el espacio."
                ),
            },
            {
                "second": "20-28",
                "texto": "¿Qué significa esto para nosotros?",
                "visual": "Mapa de auroras boreales proyectadas",
                "voz": (
                    "Esto puede afectar las comunicaciones por radio, "
                    "las redes eléctricas y generar auroras espectaculares."
                ),
            },
            {
                "second": "28-35",
                "texto": "Síguenos · Activa notificaciones\nHELIOX — El sol en tiempo real",
                "visual": "Logo HELIOX + QR al sitio web",
                "voz": (
                    "Sigue HELIOX para monitoreo solar 24/7. "
                    "Datos de NASA, NOAA y ESA, explicados en español. "
                    "Por JESÚS BARRIOS."
                ),
            },
        ],
        "call_to_action": "🔔 Sigue @heliox_solar · www.heliox.jesusbarrios.co",
        "hashtags": _get_hashtags("tiktok", kp, flare_class),
        "music_suggestion": "Ambient/Space — Hans Zimmer o lo-fi espacial",
        "author": "JESÚS BARRIOS · HELIOX",
    }

    return script


def generate_daily_report_intro(
    kp_max: float,
    kp_avg: float,
    flare_count: int,
    cme_count: int,
    date_str: str,
) -> str:
    """Genera el texto introductorio del reporte diario."""
    level = _severity_label(kp_max)
    emoji = _severity_emoji(kp_max)

    return f"""
{emoji} REPORTE SOLAR DIARIO — {date_str}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
por JESÚS BARRIOS · HELIOX

📊 RESUMEN DEL DÍA:
  • Kp máximo registrado: {kp_max:.1f} ({level})
  • Kp promedio: {kp_avg:.1f}
  • Llamaradas solares detectadas: {flare_count}
  • Eyecciones de masa coronal (CME): {cme_count}

{'⚠️ ATENCIÓN: Actividad geomagnética significativa' if kp_max >= 5 else '✅ Actividad dentro de parámetros normales'}

Datos en tiempo real de NASA DONKI · NOAA SWPC · SDO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 heliox.jesusbarrios.co
""".strip()


# ─── Helpers privados ─────────────────────────────────────────────────────────

def _severity_label(kp: float) -> str:
    if kp < 4:
        return "Tranquilo"
    elif kp < 5:
        return "Activo"
    elif kp < 6:
        return "Tormenta G1"
    elif kp < 7:
        return "Tormenta G2"
    elif kp < 8:
        return "Tormenta G3 Fuerte"
    elif kp < 9:
        return "Tormenta G4 Severa"
    else:
        return "Tormenta G5 EXTREMA"


def _severity_emoji(kp: float) -> str:
    if kp < 4:
        return "☀️"
    elif kp < 5:
        return "🌤️"
    elif kp < 6:
        return "⚡"
    elif kp < 7:
        return "🌩️"
    else:
        return "🚨"


def _generate_title(kp: float, flare_class: str, cme_count: int, emoji: str) -> str:
    if kp >= 7:
        return f"{emoji} TORMENTA SOLAR SEVERA — Kp {kp:.1f} | El sol ataca"
    elif kp >= 5:
        return f"{emoji} Alerta Geomagnética G{int(kp)-4} — {flare_class} detectada"
    elif flare_class and flare_class.startswith(("M", "X")):
        return f"{emoji} Llamarada {flare_class} · El sol no descansa"
    elif cme_count > 0:
        return f"{emoji} {cme_count} CME detectadas hoy — Datos NASA en vivo"
    else:
        return f"{emoji} Sol en tiempo real — Actividad del día · HELIOX"


def _generate_body(kp: float, flare_class: str, cme_count: int, severity: str, date_str: str) -> str:
    lines = [
        f"📅 {date_str}",
        f"🌡️ Estado solar: {severity}",
        f"📊 Índice Kp: {kp:.1f}/9",
    ]
    if flare_class:
        lines.append(f"⚡ Llamarada más intensa: Clase {flare_class}")
    if cme_count:
        lines.append(f"💥 CME activas: {cme_count}")

    lines += [
        "",
        "El sol es el motor del sistema solar y el árbitro invisible de nuestra tecnología.",
        "Desde HELIOX lo monitoreamos 24/7 con datos de NASA, NOAA y ESA.",
        "",
        f"🌐 heliox.jesusbarrios.co",
        f"👤 por JESÚS BARRIOS",
    ]
    return "\n".join(lines)


def _get_hashtags(platform: str, kp: float, flare_class: str) -> str:
    base = [
        "#SolarStorm", "#SolarFlare", "#SpaceWeather", "#NASA", "#NOAA",
        "#Sol", "#TormentaSolar", "#CienciaEspacial", "#HELIOX",
        "#JesusBarrios", "#AstrofisicaEnEspañol",
    ]

    if kp >= 5:
        base += ["#GeomagneticStorm", "#TormentaGeomagnetica", "#AuroraBoreal"]
    if flare_class and flare_class.startswith("X"):
        base += ["#XFlare", "#LlamaradaSolar", "#SolarMax"]
    if platform == "tiktok":
        base += ["#TikTokCiencia", "#CienciaTikTok", "#fyp", "#parati", "#viral"]
    elif platform == "instagram":
        base += ["#InstaScience", "#Astronomia", "#CienciaParaTodos"]
    elif platform == "youtube":
        base += ["#YouTubeShorts", "#Shorts", "#CienciaEnCorto"]

    return " ".join(base[:30])  # Instagram acepta hasta 30
