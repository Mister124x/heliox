import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface ReelSlide {
  second: number
  voz: string
  visual: string
  tip?: string
}

interface ReelScript {
  title: string
  topic: string
  duration_seconds: number
  target_audience: string
  author: string
  hashtags: string
  videoId?: string
  slides: ReelSlide[]
}

const SCRIPTS_BY_TOPIC: Record<string, Record<string, ReelScript>> = {
  flare: {
    tiktok: {
      title: '⚡ ¡ALERTA ROJA! El Sol acaba de detonar una Llamarada Clase X',
      topic: 'flare',
      duration_seconds: 35,
      target_audience: 'TikTok viral 18-35 años (Retención inmediata)',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#TormentaSolar #LlamaradaSolar #NASA #Sol #ClimaEspacial #Ciencia #HELIOX #JesusBarrios',
      videoId: 'F0-4u7h-R6s',
      slides: [
        {
          second: 0,
          voz: '¡No mires hacia arriba, pero el Sol acaba de explotar! Una llamarada monstruosa de Clase X liberó la energía de miles de millones de bombas atómicas.',
          visual: 'Zoom violento al disco solar en longitud de onda 131Å (cian brillante) mostrando la detonación en el limbo.',
          tip: 'Usa voz agitada y sonido de alerta sísmica en los primeros 2 segundos.',
        },
        {
          second: 12,
          voz: 'Esta erupción generó un pulso de rayos X que ionizó la atmósfera superior de la Tierra, provocando apagones de radio HF en todo el hemisferio iluminado.',
          visual: 'Gráfica del flujo de rayos X GOES superando el umbral X y mapa de absorción en bandas de onda corta (D-RAP).',
          tip: 'Muestra telemetría real en pantalla para generar autoridad visual.',
        },
        {
          second: 24,
          voz: 'Monitorea el pico máximo del Ciclo 25 en HELIOX, la plataforma en tiempo real creada por Jesús Barrios para alertar impactos solares antes de que ocurran.',
          visual: 'Captura dinámica de la consola HELIOX con indicadores de tormenta en vivo y URL en bio.',
          tip: 'Call to action directo con flecha hacia la bio.',
        },
      ],
    },
    reels: {
      title: '⚡ La Física de una Llamarada Clase X: Detonaciones que Hacen Temblar la Tierra',
      topic: 'flare',
      duration_seconds: 45,
      target_audience: 'Instagram Reels científico y visual',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#Astrofisica #TormentaSolar #SDO #NASA #Heliofisica #CienciaEnEspanol #HELIOX',
      videoId: 'F0-4u7h-R6s',
      slides: [
        {
          second: 0,
          voz: '¿Qué ocurre en el Sol cuando dos campos magnéticos opuestos se tocan? Ocurre una reconexión magnética: la fuerza más destructiva del sistema solar.',
          visual: 'Animación en cámara lenta de bucles coronales retorcidos rompiéndose y reconectándose en 171Å.',
        },
        {
          second: 15,
          voz: 'El plasma coronal se calienta instantáneamente a más de 10 millones de grados Kelvin, expulsando radiación electromagnética que viaja a la velocidad de la luz.',
          visual: 'Espectroscopía y visión ultravioleta extrema de NASA SDO capturando el destello blanco incandescente.',
        },
        {
          second: 30,
          voz: 'En solo 8 minutos esa radiación golpea la ionosfera terrestre. Conoce la ciencia en tiempo real en el observatorio HELIOX por Jesús Barrios.',
          visual: 'Modelo 3D de la Tierra recibiendo el impacto de rayos X con datos de telemetría orbital.',
        },
      ],
    },
    shorts: {
      title: '⚡ ¿Cuánto tarda una llamarada solar en golpear la Tierra? (Respuesta Real)',
      topic: 'flare',
      duration_seconds: 40,
      target_audience: 'YouTube Shorts datos impactantes',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#Shorts #Ciencia #Sol #NASA #Astronomia #Curiosidades #HELIOX',
      videoId: 'F0-4u7h-R6s',
      slides: [
        {
          second: 0,
          voz: '¿Crees que tenemos días para prepararnos ante una llamarada solar? La verdad te va a sorprender.',
          visual: 'Reloj de cuenta regresiva sobre fondo del disco solar activo en 304Å.',
        },
        {
          second: 10,
          voz: 'La luz y los rayos X viajan a 300,000 kilómetros por segundo. Llegan a la Tierra en exactamente 8 minutos y 20 segundos.',
          visual: 'Trayectoria fotónica desde el Sol hasta los satélites geoestacionarios GOES.',
        },
        {
          second: 25,
          voz: 'Descubre cada llamarada en el instante en que es detectada con el observatorio solar HELIOX desarrollado por Jesús Barrios.',
          visual: 'Panel interactivo de HELIOX con telemetría en vivo y alerta de llamaradas.',
        },
      ],
    },
  },

  cme: {
    tiktok: {
      title: '🌊 ¡ALERTA DE CME! Tsunami de Plasma Solar viaja hacia la Tierra',
      topic: 'cme',
      duration_seconds: 40,
      target_audience: 'TikTok viral impacto geomagnético',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#CME #TormentaGeomagnetica #FinDelMundo #Ciencia #NASA #HELIOX #JesusBarrios',
      videoId: 'NnMIhD3h6Sg',
      slides: [
        {
          second: 0,
          voz: 'Miles de millones de toneladas de plasma incandescente vienen directo hacia nosotros a más de 1,500 kilómetros por segundo.',
          visual: 'Video de coronógrafo SOHO LASCO C2 mostrando una CME Halo expansiva de 360 grados.',
          tip: 'Comienza con zoom in rápido al halo blanco expansivo.',
        },
        {
          second: 15,
          voz: 'No es ciencia ficción: es una Eyección de Masa Coronal tipo Halo. Si el campo magnético apunta hacia el sur, abrirá grietas en nuestro escudo planetario.',
          visual: 'Simulación de la magnetosfera colapsando bajo el choque de proa solar (bow shock).',
          tip: 'Subraya la variable Bz en rojo cuando menciones campo sur.',
        },
        {
          second: 30,
          voz: 'Sigue el minuto a minuto del impacto en HELIOX, la estación de monitoreo solar creada por Jesús Barrios.',
          visual: 'Pantalla de HELIOX con radar de impacto ENLIL y reloj de llegada de la onda de choque.',
        },
      ],
    },
    reels: {
      title: '🌊 La Anatomía de una Eyección de Masa Coronal (CME) explicada',
      topic: 'cme',
      duration_seconds: 50,
      target_audience: 'Instagram Reels divulgación espacial',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#CME #CoronalMassEjection #FisicaEspacial #NASA #SOHO #HELIOX',
      videoId: 'NnMIhD3h6Sg',
      slides: [
        {
          second: 0,
          voz: 'Mucha gente confunde una llamarada solar con una CME, pero son dos bestias cósmicas completamente diferentes.',
          visual: 'Comparación lado a lado: destello de luz SDO vs burbuja de gas gigante expulsada por LASCO.',
        },
        {
          second: 18,
          voz: 'La llamarada es un flash de luz; la CME es materia física real: billones de protones y electrones disparados por un cañón magnético estelar.',
          visual: 'Gráfica 3D mostrando el frente de choque atravesando la órbita de Mercurio y Venus hacia la Tierra.',
        },
        {
          second: 35,
          voz: 'Tarda entre 15 y 72 horas en llegar. Puedes consultar los modelos de predicción de impacto en vivo dentro de HELIOX con Jesús Barrios.',
          visual: 'Interfaz del modelo WSA-ENLIL en HELIOX prediciendo la densidad de plasma.',
        },
      ],
    },
    shorts: {
      title: '🌊 ¿Una Tormenta Solar puede apagar el Internet? La verdad de las CMEs',
      topic: 'cme',
      duration_seconds: 45,
      target_audience: 'YouTube Shorts tecnología y espacio',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#InternetApocalipsis #TormentaSolar #CME #Tecnologia #HELIOX #Shorts',
      videoId: 'NnMIhD3h6Sg',
      slides: [
        {
          second: 0,
          voz: '¿Podría una tormenta solar colapsar internet y la red eléctrica mundial durante semanas?',
          visual: 'Cables submarinos y torres eléctricas bajo un cielo teñido de aurora carmesí.',
        },
        {
          second: 15,
          voz: 'En el Evento Carrington de 1859, los telégrafos echaron chispas. Hoy, una súper tormenta induciría corrientes geomagnéticas capaces de quemar transformadores.',
          visual: 'Ilustración histórica de 1859 fusionada con imágenes satelitales modernas de SDO.',
        },
        {
          second: 30,
          voz: 'El observatorio HELIOX por Jesús Barrios rastrea las corrientes inducidas y el índice Kp en tiempo real para mantenerte protegido.',
          visual: 'Métricas de riesgo geomagnético en HELIOX y dashboard de alerta temprana.',
        },
      ],
    },
  },

  aurora: {
    tiktok: {
      title: '🌌 ¡EL CIELO SE VOLVIÓ ROJO! La Tormenta Solar G5 de Mayo 2024',
      topic: 'aurora',
      duration_seconds: 35,
      target_audience: 'TikTok viral asombro y auroras',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#AurorasBoreales #AuroraG5 #CieloRojo #TormentaSolar #NASA #HELIOX #JesusBarrios',
      videoId: 'kYJv8y6_D64',
      slides: [
        {
          second: 0,
          voz: 'En mayo de 2024, millones de personas vieron auroras rojas y moradas en lugares donde no deberían existir: México, España y Florida.',
          visual: 'Montaje cinematográfico de fotos y videos reales de auroras rojas sobre ciudades y palmeras.',
          tip: 'Muestra testimonios impactantes y metraje de cielo nocturno iluminado.',
        },
        {
          second: 12,
          voz: 'La mancha solar gigante AR3664 arrojó siete CMEs simultáneas que alcanzaron el nivel G5: el grado más extremo en la escala de la NOAA.',
          visual: 'Visualización de NASA Goddard mostrando las 7 ondas de choque canibalizándose en el espacio.',
        },
        {
          second: 24,
          voz: '¿Cuándo será la próxima? El Ciclo 25 continúa en su pico máximo. Monitorea el óvalo auroral en vivo en HELIOX por Jesús Barrios.',
          visual: 'Mapa del óvalo auroral de NOAA en HELIOX con predicción de visibilidad a 30 minutos.',
        },
      ],
    },
    reels: {
      title: '🌌 ¿Por qué algunas Auroras son Rojas y otras Verdes? La Química del Cielo',
      topic: 'aurora',
      duration_seconds: 45,
      target_audience: 'Instagram Reels educativo y estético',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#AuroraBoreal #QuimicaEspacial #Naturaleza #FotografiaNocturna #HELIOX',
      videoId: 'kYJv8y6_D64',
      slides: [
        {
          second: 0,
          voz: 'Cuando las partículas solares chocan con nuestra atmósfera, encienden los gases como tubos de neón cósmicos.',
          visual: 'Primer plano de filamentos aurorales ondulando en verde esmeralda y violeta.',
        },
        {
          second: 15,
          voz: 'A 100 km de altura, chocan con átomos de oxígeno y brillan en verde. Pero a más de 250 km, en tormentas G5 extremas, el oxígeno emite un brillo rojo sangre.',
          visual: 'Diagrama estratificado de la atmósfera con altitudes, moléculas de oxígeno y nitrógeno.',
        },
        {
          second: 30,
          voz: 'Aprende a predecir auroras boreales con telemetría en tiempo real ingresando a HELIOX, la plataforma creada por Jesús Barrios.',
          visual: 'Página de auroras de HELIOX mostrando índice Kp en tiempo real y cámara satelital.',
        },
      ],
    },
    shorts: {
      title: '🌌 El Sonido Oculto de las Auroras Boreales (Nadie te lo dijo)',
      topic: 'aurora',
      duration_seconds: 35,
      target_audience: 'YouTube Shorts curiosidades científicas',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#Auroras #MisteriosDeLaCiencia #SonidosDelEspacio #HELIOX #Shorts',
      videoId: 'kYJv8y6_D64',
      slides: [
        {
          second: 0,
          voz: '¿Las auroras boreales hacen ruido? Durante siglos fue considerado un mito... hasta que los micrófonos acústicos lo grabaron.',
          visual: 'Espectrograma de audio con ondas sonoras sobre un cielo nevado con aurora activa.',
        },
        {
          second: 12,
          voz: 'En noches frías y calmas, la inversión térmica atrapa cargas eléctricas a solo 70 metros del suelo, provocando chasquidos y crujidos audibles.',
          visual: 'Grabación de audio de crujidos aurorales capturados en Laponia con ondas electromagnéticas VLF.',
        },
        {
          second: 24,
          voz: 'Explora toda la física del Sol y la magnetosfera terrestre en el observatorio HELIOX por Jesús Barrios.',
          visual: 'Logo de HELIOX con gráficos de auroras y enlace en pantalla.',
        },
      ],
    },
  },

  sdo: {
    tiktok: {
      title: '☀️ ¡10 AÑOS DEL SOL CONDENSADOS EN 60 SEGUNDOS! (NASA SDO 4K)',
      topic: 'sdo',
      duration_seconds: 35,
      target_audience: 'TikTok viral timelapse cósmico',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#TimelapseSolar #NASASDO #Espacio #Universo #4K #HELIOX #JesusBarrios',
      videoId: 'l3QQQu7QLoM',
      slides: [
        {
          second: 0,
          voz: 'Estás viendo 10 años completos de la vida de nuestra estrella comprimidos en una danza de plasma hipnótica.',
          visual: 'Timelapse ultra fluido de NASA SDO en longitud de onda ultravioleta 171Å dorada.',
          tip: 'Mantén música ambiental épica de fondo.',
        },
        {
          second: 12,
          voz: 'El satélite SDO de la NASA tomó 425 millones de fotos en ultra alta resolución para registrar cómo el Sol respira cada 11 años.',
          visual: 'Transición entre el mínimo solar (disco calmo) y el máximo solar (cubierto de tormentas y llamaradas).',
        },
        {
          second: 24,
          voz: '¿Quieres ver cómo está el Sol en este mismísimo segundo? Entra a HELIOX, la plataforma en vivo creada por Jesús Barrios.',
          visual: 'Vista telescópica en vivo de HELIOX actualizándose con el último frame satelital.',
        },
      ],
    },
    reels: {
      title: '☀️ La Danza Magnética de 11 Años del Sol: Revelaciones de NASA SDO',
      topic: 'sdo',
      duration_seconds: 45,
      target_audience: 'Instagram Reels documental y cinematográfico',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#SolarDynamicsObservatory #NASA #Astrofisica #Sol4K #Ciencia #HELIOX',
      videoId: 'l3QQQu7QLoM',
      slides: [
        {
          second: 0,
          voz: 'El campo magnético del Sol se invierte por completo cada 11 años: el polo norte magnético se convierte en el sur y viceversa.',
          visual: 'Evolución magnética magnetograma HMI mostrando dipolos bipolares retorciéndose.',
        },
        {
          second: 15,
          voz: 'Durante ese proceso, las líneas magnéticas se enredan como bandas elásticas hasta quebrarse y expulsar energía a billones de grados.',
          visual: 'Simulación tridimensional del dinamo solar de la NASA con líneas de campo luminosas.',
        },
        {
          second: 30,
          voz: 'Observa este ciclo vivo y sus repercusiones en el clima espacial directamente desde HELIOX por Jesús Barrios.',
          visual: 'Gráfica del número de manchas solares (SSN) en HELIOX mostrando el pico del Ciclo 25.',
        },
      ],
    },
    shorts: {
      title: '☀️ 425 Millones de Fotos del Sol: El Experimento más Monumental de la NASA',
      topic: 'sdo',
      duration_seconds: 40,
      target_audience: 'YouTube Shorts datos descomunales',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#NASA #SDO #DatosCuriosos #FotografiaEspacial #HELIOX #Shorts',
      videoId: 'l3QQQu7QLoM',
      slides: [
        {
          second: 0,
          voz: '¿Sabías cuál es la cámara que más fotos ha tomado en la historia de la ciencia espacial?',
          visual: 'Render 3D del satélite Solar Dynamics Observatory en órbita geosíncrona.',
        },
        {
          second: 10,
          voz: 'El Solar Dynamics Observatory captura una imagen cada 0.75 segundos en 13 longitudes de onda diferentes, acumulando más de 20 millones de gigabytes.',
          visual: 'Carrusel veloz de los filtros ultravioleta: 171Å oro, 304Å rojo rubí, 193Å bronce, 131Å aguamarina.',
        },
        {
          second: 25,
          voz: 'Descubre los feeds oficiales en tiempo real en la plataforma astronómica HELIOX diseñada por Jesús Barrios.',
          visual: 'Visor multicanal de HELIOX con los 6 filtros solares simultáneos.',
        },
      ],
    },
  },

  parker: {
    tiktok: {
      title: '🛰️ ¡LA NAVE QUE TOCÓ EL SOL! La Odisea de Parker Solar Probe',
      topic: 'parker',
      duration_seconds: 35,
      target_audience: 'TikTok viral hazaña tecnológica',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#ParkerSolarProbe #NASA #IngenieriaEspacial #MisionSolar #Ciencia #HELIOX #JesusBarrios',
      videoId: 'LkaLfbuB_6E',
      slides: [
        {
          second: 0,
          voz: 'Un objeto fabricado por seres humanos acaba de volar directamente dentro de la atmósfera del Sol a 690,000 kilómetros por hora.',
          visual: 'Cámara a bordo de Parker Solar Probe viendo pasar serpentinas coronales y partículas luminosas.',
          tip: 'Efecto de velocidad hiperespacial y audio acelerado.',
        },
        {
          second: 12,
          voz: 'Es la sonda Parker de la NASA. Su escudo de carbono de 11 centímetros resiste 1,400 grados de calor, mientras sus instrumentos operan a temperatura ambiente.',
          visual: 'Diagrama del escudo térmico Thermal Protection System (TPS) brillando al blanco vivo.',
        },
        {
          second: 24,
          voz: 'Los datos que envía Parker están reescribiendo la astrofísica. Conoce las métricas solares en HELIOX por Jesús Barrios.',
          visual: 'Telemetría de viento solar y campo magnético en la consola HELIOX.',
        },
      ],
    },
    reels: {
      title: '🛰️ El Misterio de la Corona Solar: ¿Por qué es más caliente que la Superficie?',
      topic: 'parker',
      duration_seconds: 45,
      target_audience: 'Instagram Reels física y enigmas cósmicos',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#CoronaSolar #ParkerProbe #Astrofisica #MisteriosDelEspacio #HELIOX',
      videoId: 'LkaLfbuB_6E',
      slides: [
        {
          second: 0,
          voz: 'Es como alejarse de una fogata y sentir que el aire se vuelve un millón de grados más caliente: la paradoja de la corona solar.',
          visual: 'Comparativa visual: superficie solar a 5,500°C versus la corona exterior a 2,000,000°C.',
        },
        {
          second: 15,
          voz: 'Parker Solar Probe cruzó la superficie crítica de Alfvén para descubrirlo: ondas de Alfvén y torceduras magnéticas llamadas switchbacks inyectan calor masivo.',
          visual: 'Animación de líneas magnéticas en forma de S acelerando electrones y protones.',
        },
        {
          second: 30,
          voz: 'Toda la telemetría del viento solar acelerado está integrada en tiempo real en HELIOX por Jesús Barrios.',
          visual: 'Dashboard de viento solar en tiempo real en HELIOX (velocidad, densidad y temperatura).',
        },
      ],
    },
    shorts: {
      title: '🛰️ El Objeto más Rápido Creado por la Humanidad (Récord Imbatible)',
      topic: 'parker',
      duration_seconds: 40,
      target_audience: 'YouTube Shorts récords mundiales y espacio',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#VelocidadMaxima #RecordMundial #NASA #Ingenieria #HELIOX #Shorts',
      videoId: 'LkaLfbuB_6E',
      slides: [
        {
          second: 0,
          voz: '¿Cuál es el objeto más rápido que ha construido la especie humana? No es un avión ni un cohete convencional.',
          visual: 'Gráfico de velocímetro subiendo rápidamente hacia 690,000 km/h con fondo estelar.',
        },
        {
          second: 12,
          voz: 'Es la sonda Parker Solar Probe. A esa velocidad, viajarías de Nueva York a Tokio en menos de un minuto.',
          visual: 'Trayectoria orbital de asistencia gravitatoria con Venus impulsándose hacia el perihelio solar.',
        },
        {
          second: 26,
          voz: 'Sigue la velocidad del viento solar y la física que descubrió Parker en HELIOX con Jesús Barrios.',
          visual: 'Gráficos de velocidad de partículas en vivo en la plataforma HELIOX.',
        },
      ],
    },
  },

  live: {
    tiktok: {
      title: '🔴 ¡EL SOL EN DIRECTO 24/7! Transmisión Satelital Continua',
      topic: 'live',
      duration_seconds: 30,
      target_audience: 'TikTok viral streaming en vivo',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#EnVivo #TransmisionSatelital #NASA #SolEnDirecto #HELIOX #JesusBarrios',
      videoId: '21X5lGlDOfg',
      slides: [
        {
          second: 0,
          voz: '¿Sabías que puedes ver el Sol y la Tierra en vivo desde el espacio las 24 horas del día sin interrupciones?',
          visual: 'Vista del stream satelital en vivo con telemetría orbital y la silueta del horizonte terrestre.',
          tip: 'Coloca badge de 🔴 EN VIVO parpadeante.',
        },
        {
          second: 10,
          voz: 'Sensores satelitales de NASA y NOAA transmiten imágenes en tiempo real de cada llamarada, mancha solar y eyección coronal.',
          visual: 'Multipantalla con feeds sincronizados de satélites SDO, coronógrafos y estaciones terrestres.',
        },
        {
          second: 20,
          voz: 'Accede a la central de monitoreo más completa en español: HELIOX, creada por Jesús Barrios.',
          visual: 'Pantalla principal de HELIOX con reloj universal UTC y estado de alerta global.',
        },
      ],
    },
    reels: {
      title: '🔴 Telemetría Satelital en Tiempo Real: Cómo Monitorear el Clima Espacial',
      topic: 'live',
      duration_seconds: 45,
      target_audience: 'Instagram Reels aficionados a la astronomía',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#ClimaEspacial #NASA #Satelites #Astronomia #HELIOX',
      videoId: '21X5lGlDOfg',
      slides: [
        {
          second: 0,
          voz: 'La Tierra está inmersa en la atmósfera extendida de una estrella variable. Así es como la vigilamos en tiempo real.',
          visual: 'Mapa orbital de constelaciones de satélites científicos observando el viento solar en el punto L1 Lagrange.',
        },
        {
          second: 15,
          voz: 'Desde el punto L1 a 1.5 millones de km de la Tierra, satélites como DSCOVR y SOHO nos dan una advertencia de 45 minutos antes de que el plasma solar nos golpee.',
          visual: 'Demostración de los sensores Faraday Cup y magnetómetros midiendo el vector Bz.',
        },
        {
          second: 30,
          voz: 'Consulta todos estos satélites unificados en una sola interfaz en el observatorio HELIOX por Jesús Barrios.',
          visual: 'Interfaz de usuario de HELIOX destacando el monitor L1 en vivo.',
        },
      ],
    },
    shorts: {
      title: '🔴 Dónde Ver el Sol en Vivo Antes de una Gran Tormenta Solar',
      topic: 'live',
      duration_seconds: 35,
      target_audience: 'YouTube Shorts tutorial rápido',
      author: 'JESÚS BARRIOS — Observatorio HELIOX',
      hashtags: '#SolEnVivo #NASA #TutorialAstronomia #HELIOX #Shorts',
      videoId: '21X5lGlDOfg',
      slides: [
        {
          second: 0,
          voz: 'Si escuchas noticias sobre una tormenta solar inminente, este es el lugar exacto donde debes mirar primero.',
          visual: 'Buscador navegando a HELIOX y abriendo la pestaña de telemetría en vivo.',
        },
        {
          second: 12,
          voz: 'En HELIOX puedes ver el disco solar actualizado cada pocos minutos, el estado de las manchas activas y el índice de perturbación Kp.',
          visual: 'Navegación fluida por las tarjetas de datos del dashboard HELIOX.',
        },
        {
          second: 24,
          voz: 'Diseñado por Jesús Barrios para ofrecer ciencia de nivel profesional al alcance de todos. Guarda este video.',
          visual: 'Pantalla de cierre con invitación a compartir y enlaces.',
        },
      ],
    },
  },
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const platform = (searchParams.get('platform') || 'tiktok').toLowerCase()
  const topic = (searchParams.get('topic') || 'flare').toLowerCase()

  const topicGroup = SCRIPTS_BY_TOPIC[topic] || SCRIPTS_BY_TOPIC.flare
  const script = topicGroup[platform] || topicGroup.tiktok || SCRIPTS_BY_TOPIC.flare.tiktok

  return NextResponse.json({
    script,
    platform,
    topic,
    availableTopics: Object.keys(SCRIPTS_BY_TOPIC),
  })
}
