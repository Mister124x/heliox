'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────
// Traducciones por idioma — HELIOX Solar Observatory
// ─────────────────────────────────────────────────────────────

export type Lang = 'es' | 'en' | 'pt' | 'fr' | 'de' | 'it' | 'ja' | 'zh' | 'ko' | 'ar' | 'ru' | 'hi'

export const LANG_LABELS: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  ja: '日本語',
  zh: '中文',
  ko: '한국어',
  ar: 'العربية',
  ru: 'Русский',
  hi: 'हिन्दी',
}

export const LANG_FLAGS: Record<Lang, string> = {
  es: '🇪🇸', en: '🇺🇸', pt: '🇧🇷', fr: '🇫🇷', de: '🇩🇪', it: '🇮🇹',
  ja: '🇯🇵', zh: '🇨🇳', ko: '🇰🇷', ar: '🇸🇦', ru: '🇷🇺', hi: '🇮🇳',
}

type TranslationKeys = {
  // Nav
  nav_dashboard: string
  nav_storms: string
  nav_reels: string
  nav_analysis: string
  nav_live: string

  // Hero
  hero_badge: string
  hero_title_1: string
  hero_title_2: string
  hero_title_3: string
  hero_description: string
  hero_btn_dashboard: string
  hero_btn_storms: string
  hero_btn_reels: string

  // Events section
  events_title: string
  events_link: string

  // Videos section
  videos_badge: string
  videos_title: string
  videos_description: string
  videos_filter_all: string
  videos_watch_on: string

  // Equipment section
  equip_badge: string
  equip_title: string
  equip_description: string
  equip_affiliates: string
  equip_view: string
  equip_support: string

  // Donation section
  donate_title: string
  donate_description: string
  donate_nequi: string
  donate_savings: string
  donate_card: string
  donate_paypal: string
  donate_copy: string
  donate_cell: string
  donate_holder: string
  donate_no_commission: string
  donate_instant: string
  donate_instructions: string

  // Savings account
  savings_bank: string
  savings_account_type: string
  savings_account_number: string
  savings_holder: string
  savings_copy: string

  // Footer
  footer_tagline: string
  footer_data: string
  footer_images: string

  // Dashboard
  dash_title: string
  dash_solar_wind: string
  dash_speed: string
  dash_magnetic: string
  dash_xray: string
  dash_kp_index: string
  dash_synced: string
  dash_connecting: string

  // General
  ad_space: string
  by: string
  views: string
  followers: string
  servers_active: string
  live_data: string
  latin_science: string
  secure: string

  // Language selector
  lang_select: string
}

const translations: Record<Lang, TranslationKeys> = {
  es: {
    nav_dashboard: 'Dashboard',
    nav_storms: 'Tormentas',
    nav_reels: 'Reels & Media',
    nav_analysis: 'Análisis',
    nav_live: 'EN VIVO',
    hero_badge: '🛰️ Telemetría Satelital de NASA · NOAA · ESA en Tiempo Real',
    hero_title_1: 'El Sol',
    hero_title_2: 'bajo vigilancia',
    hero_title_3: 'permanente',
    hero_description: 'Monitoreo solar 24/7 con datos oficiales de NASA, NOAA y ESA. Tormentas geomagnéticas, llamaradas solares, índice Kp e imágenes espectroscópicas en vivo del SDO. Ciencia libre y abierta por',
    hero_btn_dashboard: 'Ver Dashboard de Telemetría →',
    hero_btn_storms: 'Tormentas Activas',
    hero_btn_reels: '🎬 Reels & Shorts',
    events_title: '⚡ Eventos & Llamaradas en Curso',
    events_link: 'Ver 14 días →',
    videos_badge: '🎬 Multimedia & Tendencias en Redes Sociales',
    videos_title: 'Videos, Reels & Shorts Virales del Sol',
    videos_description: 'Enlaces reales y verificados a los videos más virales de YouTube, TikTok e Instagram sobre tormentas solares y auroras. Curado por',
    videos_filter_all: 'Todos',
    videos_watch_on: 'Ver Video Real en',
    equip_badge: '🔬 Equipamiento Científico Recomendado',
    equip_title: 'Herramientas de Observación & Investigación Solar',
    equip_description: 'Cada adquisición a través de estos enlaces oficiales de astronomía genera una comisión directa que financia los servidores y la investigación de código abierto en',
    equip_affiliates: '🤝 Afiliados Oficiales: Celestron · ZWO · High Point · Amazon Associates',
    equip_view: 'Ver Equipamiento Oficial →',
    equip_support: '💡 Apoyo a la ciencia: comisión activa',
    donate_title: 'Impulsa la Red Solar',
    donate_description: 'Mantener los servidores 24/7, los nodos de alerta temprana y los algoritmos de análisis en español depende de ti. Colabora directamente con el proyecto fundado por',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 Cuenta de Ahorros',
    donate_card: '💳 Tarjeta / PSE',
    donate_paypal: '🌐 PayPal (QR Oficial)',
    donate_copy: '📋 Copiar Número',
    donate_cell: 'Número de Celular:',
    donate_holder: 'Titular:',
    donate_no_commission: '0% Comisión',
    donate_instant: 'Al Instante',
    donate_instructions: 'Abre tu app Nequi o Daviplata, ingresa el número y envía tu aporte al proyecto.',
    savings_bank: 'Bancolombia',
    savings_account_type: 'Cuenta de Ahorros',
    savings_account_number: 'Número de Cuenta:',
    savings_holder: 'Titular:',
    savings_copy: '📋 Copiar Número de Cuenta',
    footer_tagline: 'Observatorio Solar en Tiempo Real & Centro de Investigación · por',
    footer_data: 'Datos científicos de NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: 'Imágenes: Cortesía de NASA/SDO y los equipos AIA, EVE y HMI',
    dash_title: 'Dashboard de Telemetría Solar',
    dash_solar_wind: 'Viento Solar',
    dash_speed: 'Velocidad',
    dash_magnetic: 'Campo Magnético Bz',
    dash_xray: 'Flujo Rayos-X',
    dash_kp_index: 'Índice Kp',
    dash_synced: '🟢 Sincronizado',
    dash_connecting: 'Conectando...',
    ad_space: 'Espacio Publicitario Oficial · Google AdSense',
    by: 'por',
    views: 'vistas',
    followers: 'seguidores',
    servers_active: '⚡ 24/7 Servidores Activos',
    live_data: '🛰️ NASA/NOAA Datos en Vivo',
    latin_science: '🇨🇴 100% Latino Ciencia en Español',
    secure: '🔒 Seguro Cuentas Verificadas',
    lang_select: 'Idioma',
  },

  en: {
    nav_dashboard: 'Dashboard',
    nav_storms: 'Storms',
    nav_reels: 'Reels & Media',
    nav_analysis: 'Analysis',
    nav_live: 'LIVE',
    hero_badge: '🛰️ Real-Time Satellite Telemetry from NASA · NOAA · ESA',
    hero_title_1: 'The Sun',
    hero_title_2: 'under permanent',
    hero_title_3: 'surveillance',
    hero_description: '24/7 solar monitoring with official data from NASA, NOAA, and ESA. Geomagnetic storms, solar flares, Kp index, and live spectroscopic imagery from SDO. Free and open science by',
    hero_btn_dashboard: 'View Telemetry Dashboard →',
    hero_btn_storms: 'Active Storms',
    hero_btn_reels: '🎬 Reels & Shorts',
    events_title: '⚡ Ongoing Events & Flares',
    events_link: 'View 14 days →',
    videos_badge: '🎬 Multimedia & Social Media Trends',
    videos_title: 'Viral Sun Videos, Reels & Shorts',
    videos_description: 'Real, verified links to the most viral YouTube, TikTok, and Instagram videos about solar storms and auroras. Curated by',
    videos_filter_all: 'All',
    videos_watch_on: 'Watch Real Video on',
    equip_badge: '🔬 Recommended Scientific Equipment',
    equip_title: 'Solar Observation & Research Tools',
    equip_description: 'Every purchase through these official astronomy links generates a direct commission that funds the servers and open-source research at',
    equip_affiliates: '🤝 Official Affiliates: Celestron · ZWO · High Point · Amazon Associates',
    equip_view: 'View Official Equipment →',
    equip_support: '💡 Supporting science: active commission',
    donate_title: 'Power the Solar Network',
    donate_description: 'Keeping the 24/7 servers, early warning nodes, and analysis algorithms running depends on you. Contribute directly to the project founded by',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 Savings Account',
    donate_card: '💳 Card / PSE',
    donate_paypal: '🌐 PayPal (Official QR)',
    donate_copy: '📋 Copy Number',
    donate_cell: 'Phone Number:',
    donate_holder: 'Account Holder:',
    donate_no_commission: '0% Commission',
    donate_instant: 'Instant',
    donate_instructions: 'Open your Nequi or Daviplata app, enter the number, and send your contribution to the project.',
    savings_bank: 'Bancolombia',
    savings_account_type: 'Savings Account',
    savings_account_number: 'Account Number:',
    savings_holder: 'Account Holder:',
    savings_copy: '📋 Copy Account Number',
    footer_tagline: 'Real-Time Solar Observatory & Research Center · by',
    footer_data: 'Scientific data from NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: 'Images: Courtesy of NASA/SDO and AIA, EVE, HMI teams',
    dash_title: 'Solar Telemetry Dashboard',
    dash_solar_wind: 'Solar Wind',
    dash_speed: 'Speed',
    dash_magnetic: 'Magnetic Field Bz',
    dash_xray: 'X-Ray Flux',
    dash_kp_index: 'Kp Index',
    dash_synced: '🟢 Synced',
    dash_connecting: 'Connecting...',
    ad_space: 'Official Ad Space · Google AdSense',
    by: 'by',
    views: 'views',
    followers: 'followers',
    servers_active: '⚡ 24/7 Active Servers',
    live_data: '🛰️ NASA/NOAA Live Data',
    latin_science: '🇨🇴 100% Latin American Open Science',
    secure: '🔒 Secure Verified Accounts',
    lang_select: 'Language',
  },

  pt: {
    nav_dashboard: 'Painel',
    nav_storms: 'Tempestades',
    nav_reels: 'Reels & Mídia',
    nav_analysis: 'Análise',
    nav_live: 'AO VIVO',
    hero_badge: '🛰️ Telemetria Satelital em Tempo Real da NASA · NOAA · ESA',
    hero_title_1: 'O Sol',
    hero_title_2: 'sob vigilância',
    hero_title_3: 'permanente',
    hero_description: 'Monitoramento solar 24/7 com dados oficiais da NASA, NOAA e ESA. Tempestades geomagnéticas, erupções solares, índice Kp e imagens espectroscópicas ao vivo do SDO. Ciência livre e aberta por',
    hero_btn_dashboard: 'Ver Painel de Telemetria →',
    hero_btn_storms: 'Tempestades Ativas',
    hero_btn_reels: '🎬 Reels & Shorts',
    events_title: '⚡ Eventos & Erupções em Curso',
    events_link: 'Ver 14 dias →',
    videos_badge: '🎬 Multimídia & Tendências nas Redes Sociais',
    videos_title: 'Vídeos Virais do Sol, Reels & Shorts',
    videos_description: 'Links reais e verificados para os vídeos mais virais do YouTube, TikTok e Instagram sobre tempestades solares e auroras. Curado por',
    videos_filter_all: 'Todos',
    videos_watch_on: 'Assistir Vídeo Real em',
    equip_badge: '🔬 Equipamento Científico Recomendado',
    equip_title: 'Ferramentas de Observação & Pesquisa Solar',
    equip_description: 'Cada compra através destes links oficiais de astronomia gera uma comissão direta que financia os servidores e a pesquisa de código aberto em',
    equip_affiliates: '🤝 Afiliados Oficiais: Celestron · ZWO · High Point · Amazon Associates',
    equip_view: 'Ver Equipamento Oficial →',
    equip_support: '💡 Apoio à ciência: comissão ativa',
    donate_title: 'Impulsione a Rede Solar',
    donate_description: 'Manter os servidores 24/7, os nós de alerta e os algoritmos de análise depende de você. Contribua diretamente com o projeto fundado por',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 Conta Poupança',
    donate_card: '💳 Cartão / PSE',
    donate_paypal: '🌐 PayPal (QR Oficial)',
    donate_copy: '📋 Copiar Número',
    donate_cell: 'Número de Celular:',
    donate_holder: 'Titular:',
    donate_no_commission: '0% Comissão',
    donate_instant: 'Instantâneo',
    donate_instructions: 'Abra seu app Nequi ou Daviplata, insira o número e envie sua contribuição ao projeto.',
    savings_bank: 'Bancolombia',
    savings_account_type: 'Conta Poupança',
    savings_account_number: 'Número da Conta:',
    savings_holder: 'Titular:',
    savings_copy: '📋 Copiar Número da Conta',
    footer_tagline: 'Observatório Solar em Tempo Real & Centro de Pesquisa · por',
    footer_data: 'Dados científicos da NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: 'Imagens: Cortesia da NASA/SDO e equipes AIA, EVE e HMI',
    dash_title: 'Painel de Telemetria Solar',
    dash_solar_wind: 'Vento Solar',
    dash_speed: 'Velocidade',
    dash_magnetic: 'Campo Magnético Bz',
    dash_xray: 'Fluxo Raios-X',
    dash_kp_index: 'Índice Kp',
    dash_synced: '🟢 Sincronizado',
    dash_connecting: 'Conectando...',
    ad_space: 'Espaço Publicitário Oficial · Google AdSense',
    by: 'por',
    views: 'visualizações',
    followers: 'seguidores',
    servers_active: '⚡ 24/7 Servidores Ativos',
    live_data: '🛰️ NASA/NOAA Dados ao Vivo',
    latin_science: '🇨🇴 100% Latino Ciência Aberta',
    secure: '🔒 Seguro Contas Verificadas',
    lang_select: 'Idioma',
  },

  fr: {
    nav_dashboard: 'Tableau de bord',
    nav_storms: 'Tempêtes',
    nav_reels: 'Reels & Médias',
    nav_analysis: 'Analyse',
    nav_live: 'EN DIRECT',
    hero_badge: '🛰️ Télémétrie Satellitaire en Temps Réel de la NASA · NOAA · ESA',
    hero_title_1: 'Le Soleil',
    hero_title_2: 'sous surveillance',
    hero_title_3: 'permanente',
    hero_description: 'Surveillance solaire 24/7 avec des données officielles de la NASA, NOAA et ESA. Tempêtes géomagnétiques, éruptions solaires, indice Kp et imagerie spectroscopique en direct du SDO. Science libre et ouverte par',
    hero_btn_dashboard: 'Voir le Tableau de Bord →',
    hero_btn_storms: 'Tempêtes Actives',
    hero_btn_reels: '🎬 Reels & Shorts',
    events_title: '⚡ Événements & Éruptions en Cours',
    events_link: 'Voir 14 jours →',
    videos_badge: '🎬 Multimédia & Tendances Réseaux Sociaux',
    videos_title: 'Vidéos Virales du Soleil, Reels & Shorts',
    videos_description: 'Liens réels et vérifiés vers les vidéos les plus virales de YouTube, TikTok et Instagram sur les tempêtes solaires et les aurores. Organisé par',
    videos_filter_all: 'Tous',
    videos_watch_on: 'Voir la Vidéo Réelle sur',
    equip_badge: '🔬 Équipement Scientifique Recommandé',
    equip_title: "Outils d'Observation & Recherche Solaire",
    equip_description: "Chaque achat via ces liens officiels d'astronomie génère une commission directe qui finance les serveurs et la recherche open source chez",
    equip_affiliates: '🤝 Affiliés Officiels : Celestron · ZWO · High Point · Amazon Associates',
    equip_view: "Voir l'Équipement Officiel →",
    equip_support: '💡 Soutien à la science : commission active',
    donate_title: 'Propulsez le Réseau Solaire',
    donate_description: 'Maintenir les serveurs 24/7, les nœuds d\'alerte et les algorithmes d\'analyse dépend de vous. Contribuez directement au projet fondé par',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 Compte Épargne',
    donate_card: '💳 Carte / PSE',
    donate_paypal: '🌐 PayPal (QR Officiel)',
    donate_copy: '📋 Copier le Numéro',
    donate_cell: 'Numéro de téléphone :',
    donate_holder: 'Titulaire :',
    donate_no_commission: '0% Commission',
    donate_instant: 'Instantané',
    donate_instructions: 'Ouvrez votre application Nequi ou Daviplata, entrez le numéro et envoyez votre contribution au projet.',
    savings_bank: 'Bancolombia',
    savings_account_type: "Compte d'Épargne",
    savings_account_number: 'Numéro de Compte :',
    savings_holder: 'Titulaire :',
    savings_copy: '📋 Copier le Numéro de Compte',
    footer_tagline: 'Observatoire Solaire en Temps Réel & Centre de Recherche · par',
    footer_data: 'Données scientifiques de NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: "Images : Gracieuseté de NASA/SDO et des équipes AIA, EVE et HMI",
    dash_title: 'Tableau de Bord de Télémétrie Solaire',
    dash_solar_wind: 'Vent Solaire',
    dash_speed: 'Vitesse',
    dash_magnetic: 'Champ Magnétique Bz',
    dash_xray: 'Flux Rayons-X',
    dash_kp_index: 'Indice Kp',
    dash_synced: '🟢 Synchronisé',
    dash_connecting: 'Connexion...',
    ad_space: 'Espace Publicitaire Officiel · Google AdSense',
    by: 'par',
    views: 'vues',
    followers: 'abonnés',
    servers_active: '⚡ 24/7 Serveurs Actifs',
    live_data: '🛰️ NASA/NOAA Données en Direct',
    latin_science: '🇨🇴 100% Latino Science Ouverte',
    secure: '🔒 Sécurisé Comptes Vérifiés',
    lang_select: 'Langue',
  },

  de: {
    nav_dashboard: 'Dashboard',
    nav_storms: 'Stürme',
    nav_reels: 'Reels & Medien',
    nav_analysis: 'Analyse',
    nav_live: 'LIVE',
    hero_badge: '🛰️ Echtzeit-Satellitentelemetrie von NASA · NOAA · ESA',
    hero_title_1: 'Die Sonne',
    hero_title_2: 'unter ständiger',
    hero_title_3: 'Überwachung',
    hero_description: '24/7 Sonnenüberwachung mit offiziellen Daten von NASA, NOAA und ESA. Geomagnetische Stürme, Sonneneruptionen, Kp-Index und Live-Spektroskopie vom SDO. Freie und offene Wissenschaft von',
    hero_btn_dashboard: 'Telemetrie-Dashboard →',
    hero_btn_storms: 'Aktive Stürme',
    hero_btn_reels: '🎬 Reels & Shorts',
    events_title: '⚡ Laufende Ereignisse & Eruptionen',
    events_link: '14 Tage anzeigen →',
    videos_badge: '🎬 Multimedia & Social-Media-Trends',
    videos_title: 'Virale Sonnenvideos, Reels & Shorts',
    videos_description: 'Echte, verifizierte Links zu den viralsten YouTube-, TikTok- und Instagram-Videos über Sonnenstürme und Polarlichter. Kuratiert von',
    videos_filter_all: 'Alle',
    videos_watch_on: 'Echtes Video ansehen auf',
    equip_badge: '🔬 Empfohlene wissenschaftliche Ausrüstung',
    equip_title: 'Werkzeuge für Sonnenbeobachtung & Forschung',
    equip_description: 'Jeder Kauf über diese offiziellen Astronomie-Links generiert eine direkte Provision, die die Server und Open-Source-Forschung bei',
    equip_affiliates: '🤝 Offizielle Partner: Celestron · ZWO · High Point · Amazon Associates',
    equip_view: 'Offizielle Ausrüstung ansehen →',
    equip_support: '💡 Wissenschaft unterstützen: aktive Provision',
    donate_title: 'Das Solarnetzwerk antreiben',
    donate_description: 'Die 24/7-Server, Frühwarnknoten und Analysealgorithmen am Laufen zu halten, hängt von dir ab. Unterstütze direkt das Projekt von',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 Sparkonto',
    donate_card: '💳 Karte / PSE',
    donate_paypal: '🌐 PayPal (Offizieller QR)',
    donate_copy: '📋 Nummer kopieren',
    donate_cell: 'Handynummer:',
    donate_holder: 'Kontoinhaber:',
    donate_no_commission: '0% Gebühren',
    donate_instant: 'Sofort',
    donate_instructions: 'Öffne deine Nequi- oder Daviplata-App, gib die Nummer ein und sende deinen Beitrag.',
    savings_bank: 'Bancolombia',
    savings_account_type: 'Sparkonto',
    savings_account_number: 'Kontonummer:',
    savings_holder: 'Kontoinhaber:',
    savings_copy: '📋 Kontonummer kopieren',
    footer_tagline: 'Echtzeit-Sonnenobservatorium & Forschungszentrum · von',
    footer_data: 'Wissenschaftliche Daten von NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: 'Bilder: Mit freundlicher Genehmigung von NASA/SDO und den AIA-, EVE-, HMI-Teams',
    dash_title: 'Solar-Telemetrie-Dashboard',
    dash_solar_wind: 'Sonnenwind',
    dash_speed: 'Geschwindigkeit',
    dash_magnetic: 'Magnetfeld Bz',
    dash_xray: 'Röntgenfluss',
    dash_kp_index: 'Kp-Index',
    dash_synced: '🟢 Synchronisiert',
    dash_connecting: 'Verbindung...',
    ad_space: 'Offizieller Werbeplatz · Google AdSense',
    by: 'von',
    views: 'Aufrufe',
    followers: 'Follower',
    servers_active: '⚡ 24/7 Aktive Server',
    live_data: '🛰️ NASA/NOAA Live-Daten',
    latin_science: '🇨🇴 100% Lateinamerik. Offene Wissenschaft',
    secure: '🔒 Sicher Verifizierte Konten',
    lang_select: 'Sprache',
  },

  it: {
    nav_dashboard: 'Pannello',
    nav_storms: 'Tempeste',
    nav_reels: 'Reels & Media',
    nav_analysis: 'Analisi',
    nav_live: 'IN DIRETTA',
    hero_badge: '🛰️ Telemetria Satellitare in Tempo Reale da NASA · NOAA · ESA',
    hero_title_1: 'Il Sole',
    hero_title_2: 'sotto sorveglianza',
    hero_title_3: 'permanente',
    hero_description: 'Monitoraggio solare 24/7 con dati ufficiali di NASA, NOAA ed ESA. Tempeste geomagnetiche, eruzioni solari, indice Kp e immagini spettroscopiche in diretta dal SDO. Scienza libera e aperta di',
    hero_btn_dashboard: 'Vedi Pannello Telemetria →',
    hero_btn_storms: 'Tempeste Attive',
    hero_btn_reels: '🎬 Reels & Shorts',
    events_title: '⚡ Eventi & Eruzioni in Corso',
    events_link: 'Vedi 14 giorni →',
    videos_badge: '🎬 Multimedia & Tendenze Social Media',
    videos_title: 'Video Virali del Sole, Reels & Shorts',
    videos_description: 'Link reali e verificati ai video più virali di YouTube, TikTok e Instagram sulle tempeste solari e le aurore. A cura di',
    videos_filter_all: 'Tutti',
    videos_watch_on: 'Guarda il Video Reale su',
    equip_badge: '🔬 Attrezzatura Scientifica Consigliata',
    equip_title: 'Strumenti di Osservazione & Ricerca Solare',
    equip_description: "Ogni acquisto tramite questi link ufficiali di astronomia genera una commissione diretta che finanzia i server e la ricerca open source su",
    equip_affiliates: '🤝 Affiliati Ufficiali: Celestron · ZWO · High Point · Amazon Associates',
    equip_view: "Vedi Attrezzatura Ufficiale →",
    equip_support: '💡 Supporto alla scienza: commissione attiva',
    donate_title: 'Alimenta la Rete Solare',
    donate_description: 'Mantenere i server 24/7, i nodi di allerta e gli algoritmi di analisi dipende da te. Contribuisci direttamente al progetto fondato da',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 Conto Risparmio',
    donate_card: '💳 Carta / PSE',
    donate_paypal: '🌐 PayPal (QR Ufficiale)',
    donate_copy: '📋 Copia Numero',
    donate_cell: 'Numero di Cellulare:',
    donate_holder: 'Titolare:',
    donate_no_commission: '0% Commissione',
    donate_instant: 'Istantaneo',
    donate_instructions: "Apri l'app Nequi o Daviplata, inserisci il numero e invia il tuo contributo al progetto.",
    savings_bank: 'Bancolombia',
    savings_account_type: 'Conto Risparmio',
    savings_account_number: 'Numero di Conto:',
    savings_holder: 'Titolare:',
    savings_copy: '📋 Copia Numero di Conto',
    footer_tagline: 'Osservatorio Solare in Tempo Reale & Centro di Ricerca · di',
    footer_data: 'Dati scientifici da NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: 'Immagini: Per gentile concessione di NASA/SDO e team AIA, EVE e HMI',
    dash_title: 'Pannello Telemetria Solare',
    dash_solar_wind: 'Vento Solare',
    dash_speed: 'Velocità',
    dash_magnetic: 'Campo Magnetico Bz',
    dash_xray: 'Flusso Raggi-X',
    dash_kp_index: 'Indice Kp',
    dash_synced: '🟢 Sincronizzato',
    dash_connecting: 'Connessione...',
    ad_space: 'Spazio Pubblicitario Ufficiale · Google AdSense',
    by: 'di',
    views: 'visualizzazioni',
    followers: 'follower',
    servers_active: '⚡ 24/7 Server Attivi',
    live_data: '🛰️ NASA/NOAA Dati in Diretta',
    latin_science: '🇨🇴 100% Latino Scienza Aperta',
    secure: '🔒 Sicuro Account Verificati',
    lang_select: 'Lingua',
  },

  ja: {
    nav_dashboard: 'ダッシュボード',
    nav_storms: '太陽嵐',
    nav_reels: 'リール＆メディア',
    nav_analysis: '分析',
    nav_live: 'ライブ',
    hero_badge: '🛰️ NASA · NOAA · ESA からのリアルタイム衛星テレメトリー',
    hero_title_1: '太陽',
    hero_title_2: '常時監視',
    hero_title_3: '体制',
    hero_description: 'NASA、NOAA、ESAの公式データによる24時間365日の太陽モニタリング。地磁気嵐、太陽フレア、Kp指数、SDOからのライブ分光画像。',
    hero_btn_dashboard: 'テレメトリーダッシュボードを見る →',
    hero_btn_storms: 'アクティブな太陽嵐',
    hero_btn_reels: '🎬 リール＆ショート',
    events_title: '⚡ 進行中のイベント＆フレア',
    events_link: '14日間を見る →',
    videos_badge: '🎬 マルチメディア＆SNSトレンド',
    videos_title: 'バイラル太陽動画、リール＆ショート',
    videos_description: '太陽嵐とオーロラに関するYouTube、TikTok、Instagramの最もバイラルな動画への実際の検証済みリンク。キュレーター：',
    videos_filter_all: 'すべて',
    videos_watch_on: '実際の動画を見る：',
    equip_badge: '🔬 おすすめ科学機器',
    equip_title: '太陽観測＆研究ツール',
    equip_description: 'これらの公式天文学リンクからの購入は、サーバーとオープンソース研究に直接資金を提供します：',
    equip_affiliates: '🤝 公式アフィリエイト: Celestron · ZWO · High Point · Amazon Associates',
    equip_view: '公式機器を見る →',
    equip_support: '💡 科学を支援：アクティブコミッション',
    donate_title: 'ソーラーネットワークを支援',
    donate_description: '24時間365日のサーバー、早期警報ノード、分析アルゴリズムの維持はあなた次第です。プロジェクトに直接貢献してください。創設者：',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 普通預金口座',
    donate_card: '💳 カード / PSE',
    donate_paypal: '🌐 PayPal（公式QR）',
    donate_copy: '📋 番号をコピー',
    donate_cell: '電話番号：',
    donate_holder: '口座名義：',
    donate_no_commission: '手数料0%',
    donate_instant: '即時',
    donate_instructions: 'NequiまたはDaviplataアプリを開き、番号を入力してプロジェクトに送金してください。',
    savings_bank: 'Bancolombia',
    savings_account_type: '普通預金口座',
    savings_account_number: '口座番号：',
    savings_holder: '口座名義：',
    savings_copy: '📋 口座番号をコピー',
    footer_tagline: 'リアルタイム太陽観測所＆研究センター ·',
    footer_data: '科学データ：NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: '画像：NASA/SDOおよびAIA、EVE、HMIチームの提供',
    dash_title: '太陽テレメトリーダッシュボード',
    dash_solar_wind: '太陽風',
    dash_speed: '速度',
    dash_magnetic: '磁場 Bz',
    dash_xray: 'X線フラックス',
    dash_kp_index: 'Kp指数',
    dash_synced: '🟢 同期済み',
    dash_connecting: '接続中...',
    ad_space: '公式広告スペース · Google AdSense',
    by: '作成者',
    views: '回視聴',
    followers: 'フォロワー',
    servers_active: '⚡ 24/7 アクティブサーバー',
    live_data: '🛰️ NASA/NOAA ライブデータ',
    latin_science: '🇨🇴 100% ラテンアメリカ オープンサイエンス',
    secure: '🔒 安全 検証済みアカウント',
    lang_select: '言語',
  },

  zh: {
    nav_dashboard: '仪表板',
    nav_storms: '太阳风暴',
    nav_reels: '短视频',
    nav_analysis: '分析',
    nav_live: '直播',
    hero_badge: '🛰️ 来自NASA · NOAA · ESA的实时卫星遥测',
    hero_title_1: '太阳',
    hero_title_2: '持续',
    hero_title_3: '监测中',
    hero_description: '24/7太阳监测，使用NASA、NOAA和ESA的官方数据。地磁暴、太阳耀斑、Kp指数和SDO实时光谱成像。自由开放科学，由',
    hero_btn_dashboard: '查看遥测仪表板 →',
    hero_btn_storms: '活跃风暴',
    hero_btn_reels: '🎬 短视频',
    events_title: '⚡ 正在发生的事件和耀斑',
    events_link: '查看14天 →',
    videos_badge: '🎬 多媒体和社交媒体趋势',
    videos_title: '太阳病毒视频、短视频',
    videos_description: '关于太阳风暴和极光的YouTube、TikTok和Instagram最热门视频的真实验证链接。策划人：',
    videos_filter_all: '全部',
    videos_watch_on: '观看真实视频：',
    equip_badge: '🔬 推荐科学设备',
    equip_title: '太阳观测和研究工具',
    equip_description: '通过这些官方天文学链接的每次购买都会产生直接佣金，用于资助服务器和开源研究：',
    equip_affiliates: '🤝 官方合作伙伴：Celestron · ZWO · High Point · Amazon Associates',
    equip_view: '查看官方设备 →',
    equip_support: '💡 支持科学：活跃佣金',
    donate_title: '支持太阳网络',
    donate_description: '维持24/7服务器、预警节点和分析算法取决于您。直接为项目做贡献，创始人：',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 储蓄账户',
    donate_card: '💳 银行卡 / PSE',
    donate_paypal: '🌐 PayPal（官方二维码）',
    donate_copy: '📋 复制号码',
    donate_cell: '手机号码：',
    donate_holder: '账户持有人：',
    donate_no_commission: '0% 手续费',
    donate_instant: '即时',
    donate_instructions: '打开您的Nequi或Daviplata应用，输入号码并向项目发送您的贡献。',
    savings_bank: 'Bancolombia',
    savings_account_type: '储蓄账户',
    savings_account_number: '账户号码：',
    savings_holder: '账户持有人：',
    savings_copy: '📋 复制账户号码',
    footer_tagline: '实时太阳观测站和研究中心 ·',
    footer_data: '科学数据来自NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: '图片：由NASA/SDO和AIA、EVE、HMI团队提供',
    dash_title: '太阳遥测仪表板',
    dash_solar_wind: '太阳风',
    dash_speed: '速度',
    dash_magnetic: '磁场 Bz',
    dash_xray: 'X射线通量',
    dash_kp_index: 'Kp指数',
    dash_synced: '🟢 已同步',
    dash_connecting: '连接中...',
    ad_space: '官方广告位 · Google AdSense',
    by: '创建者',
    views: '次观看',
    followers: '关注者',
    servers_active: '⚡ 24/7 活跃服务器',
    live_data: '🛰️ NASA/NOAA 实时数据',
    latin_science: '🇨🇴 100% 拉丁美洲开放科学',
    secure: '🔒 安全 已验证账户',
    lang_select: '语言',
  },

  ko: {
    nav_dashboard: '대시보드',
    nav_storms: '태양폭풍',
    nav_reels: '릴스 & 미디어',
    nav_analysis: '분석',
    nav_live: '라이브',
    hero_badge: '🛰️ NASA · NOAA · ESA 실시간 위성 원격 측정',
    hero_title_1: '태양',
    hero_title_2: '상시 감시',
    hero_title_3: '체제',
    hero_description: 'NASA, NOAA, ESA의 공식 데이터로 24/7 태양 모니터링. 지자기 폭풍, 태양 플레어, Kp 지수 및 SDO 실시간 분광 이미지. 자유로운 오픈 과학:',
    hero_btn_dashboard: '원격 측정 대시보드 보기 →',
    hero_btn_storms: '활성 폭풍',
    hero_btn_reels: '🎬 릴스 & 쇼츠',
    events_title: '⚡ 진행 중인 이벤트 & 플레어',
    events_link: '14일 보기 →',
    videos_badge: '🎬 멀티미디어 & 소셜 미디어 트렌드',
    videos_title: '바이럴 태양 영상, 릴스 & 쇼츠',
    videos_description: '태양폭풍과 오로라에 대한 YouTube, TikTok, Instagram의 가장 바이럴한 영상 링크. 큐레이터:',
    videos_filter_all: '전체',
    videos_watch_on: '실제 영상 보기:',
    equip_badge: '🔬 추천 과학 장비',
    equip_title: '태양 관측 & 연구 도구',
    equip_description: '이 공식 천문학 링크를 통한 구매는 서버와 오픈소스 연구에 직접 자금을 지원합니다:',
    equip_affiliates: '🤝 공식 제휴: Celestron · ZWO · High Point · Amazon Associates',
    equip_view: '공식 장비 보기 →',
    equip_support: '💡 과학 지원: 활성 커미션',
    donate_title: '태양 네트워크 지원',
    donate_description: '24/7 서버, 조기 경보 노드 및 분석 알고리즘 유지는 여러분에게 달려 있습니다. 프로젝트에 직접 기여하세요. 설립자:',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 저축 계좌',
    donate_card: '💳 카드 / PSE',
    donate_paypal: '🌐 PayPal (공식 QR)',
    donate_copy: '📋 번호 복사',
    donate_cell: '전화번호:',
    donate_holder: '계좌 소유자:',
    donate_no_commission: '수수료 0%',
    donate_instant: '즉시',
    donate_instructions: 'Nequi 또는 Daviplata 앱을 열고 번호를 입력하여 프로젝트에 기여하세요.',
    savings_bank: 'Bancolombia',
    savings_account_type: '저축 계좌',
    savings_account_number: '계좌번호:',
    savings_holder: '계좌 소유자:',
    savings_copy: '📋 계좌번호 복사',
    footer_tagline: '실시간 태양 관측소 & 연구 센터 ·',
    footer_data: '과학 데이터: NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: '이미지: NASA/SDO 및 AIA, EVE, HMI 팀 제공',
    dash_title: '태양 원격 측정 대시보드',
    dash_solar_wind: '태양풍',
    dash_speed: '속도',
    dash_magnetic: '자기장 Bz',
    dash_xray: 'X선 플럭스',
    dash_kp_index: 'Kp 지수',
    dash_synced: '🟢 동기화됨',
    dash_connecting: '연결 중...',
    ad_space: '공식 광고 공간 · Google AdSense',
    by: '제작자',
    views: '조회수',
    followers: '팔로워',
    servers_active: '⚡ 24/7 활성 서버',
    live_data: '🛰️ NASA/NOAA 실시간 데이터',
    latin_science: '🇨🇴 100% 라틴 아메리카 오픈 사이언스',
    secure: '🔒 보안 인증 계정',
    lang_select: '언어',
  },

  ar: {
    nav_dashboard: 'لوحة التحكم',
    nav_storms: 'العواصف',
    nav_reels: 'ريلز ووسائط',
    nav_analysis: 'التحليل',
    nav_live: 'مباشر',
    hero_badge: '🛰️ قياس عن بعد بالأقمار الصناعية في الوقت الحقيقي من ناسا · NOAA · ESA',
    hero_title_1: 'الشمس',
    hero_title_2: 'تحت المراقبة',
    hero_title_3: 'الدائمة',
    hero_description: 'مراقبة شمسية على مدار الساعة ببيانات رسمية من ناسا وNOAA وESA. العواصف المغناطيسية الأرضية والتوهجات الشمسية ومؤشر Kp وصور حية من SDO. علم مفتوح من',
    hero_btn_dashboard: 'عرض لوحة القياس عن بعد →',
    hero_btn_storms: 'العواصف النشطة',
    hero_btn_reels: '🎬 ريلز وشورتس',
    events_title: '⚡ الأحداث والتوهجات الجارية',
    events_link: 'عرض 14 يوماً →',
    videos_badge: '🎬 الوسائط المتعددة واتجاهات وسائل التواصل',
    videos_title: 'فيديوهات الشمس الفيروسية والريلز',
    videos_description: 'روابط حقيقية وموثقة لأكثر فيديوهات يوتيوب وتيك توك وإنستغرام انتشاراً عن العواصف الشمسية والشفق القطبي. إعداد',
    videos_filter_all: 'الكل',
    videos_watch_on: 'شاهد الفيديو الحقيقي على',
    equip_badge: '🔬 المعدات العلمية الموصى بها',
    equip_title: 'أدوات رصد الشمس والبحث',
    equip_description: 'كل عملية شراء عبر روابط الفلك الرسمية تولد عمولة مباشرة تمول الخوادم والبحث المفتوح في',
    equip_affiliates: '🤝 شركاء رسميون: Celestron · ZWO · High Point · Amazon Associates',
    equip_view: 'عرض المعدات الرسمية →',
    equip_support: '💡 دعم العلم: عمولة نشطة',
    donate_title: 'ادعم شبكة الطاقة الشمسية',
    donate_description: 'الحفاظ على الخوادم على مدار الساعة وعقد الإنذار المبكر وخوارزميات التحليل يعتمد عليك. ساهم مباشرة في المشروع الذي أسسه',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 حساب توفير',
    donate_card: '💳 بطاقة / PSE',
    donate_paypal: '🌐 PayPal (رمز QR رسمي)',
    donate_copy: '📋 نسخ الرقم',
    donate_cell: 'رقم الهاتف:',
    donate_holder: 'صاحب الحساب:',
    donate_no_commission: '0% عمولة',
    donate_instant: 'فوري',
    donate_instructions: 'افتح تطبيق Nequi أو Daviplata، أدخل الرقم وأرسل مساهمتك للمشروع.',
    savings_bank: 'Bancolombia',
    savings_account_type: 'حساب توفير',
    savings_account_number: 'رقم الحساب:',
    savings_holder: 'صاحب الحساب:',
    savings_copy: '📋 نسخ رقم الحساب',
    footer_tagline: 'مرصد شمسي في الوقت الحقيقي ومركز أبحاث ·',
    footer_data: 'بيانات علمية من NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: 'الصور: بإذن من NASA/SDO وفرق AIA وEVE وHMI',
    dash_title: 'لوحة القياس الشمسي عن بعد',
    dash_solar_wind: 'الرياح الشمسية',
    dash_speed: 'السرعة',
    dash_magnetic: 'المجال المغناطيسي Bz',
    dash_xray: 'تدفق الأشعة السينية',
    dash_kp_index: 'مؤشر Kp',
    dash_synced: '🟢 متزامن',
    dash_connecting: 'جاري الاتصال...',
    ad_space: 'مساحة إعلانية رسمية · Google AdSense',
    by: 'بواسطة',
    views: 'مشاهدة',
    followers: 'متابع',
    servers_active: '⚡ 24/7 خوادم نشطة',
    live_data: '🛰️ NASA/NOAA بيانات مباشرة',
    latin_science: '🇨🇴 100% علم لاتيني مفتوح',
    secure: '🔒 آمن حسابات موثقة',
    lang_select: 'اللغة',
  },

  ru: {
    nav_dashboard: 'Панель',
    nav_storms: 'Бури',
    nav_reels: 'Рилсы и Медиа',
    nav_analysis: 'Анализ',
    nav_live: 'ПРЯМОЙ ЭФИР',
    hero_badge: '🛰️ Спутниковая телеметрия в реальном времени от NASA · NOAA · ESA',
    hero_title_1: 'Солнце',
    hero_title_2: 'под постоянным',
    hero_title_3: 'наблюдением',
    hero_description: 'Солнечный мониторинг 24/7 с официальными данными NASA, NOAA и ESA. Геомагнитные бури, солнечные вспышки, индекс Kp и спектроскопические изображения в реальном времени с SDO. Свободная наука от',
    hero_btn_dashboard: 'Панель телеметрии →',
    hero_btn_storms: 'Активные бури',
    hero_btn_reels: '🎬 Рилсы и Шортсы',
    events_title: '⚡ Текущие события и вспышки',
    events_link: 'Смотреть 14 дней →',
    videos_badge: '🎬 Мультимедиа и тренды соцсетей',
    videos_title: 'Вирусные видео Солнца, Рилсы и Шортсы',
    videos_description: 'Реальные проверенные ссылки на самые вирусные видео YouTube, TikTok и Instagram о солнечных бурях и полярных сияниях. Куратор:',
    videos_filter_all: 'Все',
    videos_watch_on: 'Смотреть реальное видео на',
    equip_badge: '🔬 Рекомендуемое научное оборудование',
    equip_title: 'Инструменты для наблюдения и исследования Солнца',
    equip_description: 'Каждая покупка по этим официальным ссылкам генерирует комиссию, которая финансирует серверы и открытые исследования в',
    equip_affiliates: '🤝 Официальные партнёры: Celestron · ZWO · High Point · Amazon Associates',
    equip_view: 'Смотреть официальное оборудование →',
    equip_support: '💡 Поддержка науки: активная комиссия',
    donate_title: 'Поддержите солнечную сеть',
    donate_description: 'Поддержание серверов 24/7, узлов раннего предупреждения и алгоритмов анализа зависит от вас. Внесите вклад в проект, основанный',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 Сберегательный счёт',
    donate_card: '💳 Карта / PSE',
    donate_paypal: '🌐 PayPal (Официальный QR)',
    donate_copy: '📋 Копировать номер',
    donate_cell: 'Номер телефона:',
    donate_holder: 'Владелец счёта:',
    donate_no_commission: '0% Комиссия',
    donate_instant: 'Мгновенно',
    donate_instructions: 'Откройте приложение Nequi или Daviplata, введите номер и отправьте ваш вклад в проект.',
    savings_bank: 'Bancolombia',
    savings_account_type: 'Сберегательный счёт',
    savings_account_number: 'Номер счёта:',
    savings_holder: 'Владелец счёта:',
    savings_copy: '📋 Копировать номер счёта',
    footer_tagline: 'Солнечная обсерватория реального времени и исследовательский центр ·',
    footer_data: 'Научные данные от NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: 'Изображения: Предоставлено NASA/SDO и командами AIA, EVE и HMI',
    dash_title: 'Панель солнечной телеметрии',
    dash_solar_wind: 'Солнечный ветер',
    dash_speed: 'Скорость',
    dash_magnetic: 'Магнитное поле Bz',
    dash_xray: 'Рентгеновский поток',
    dash_kp_index: 'Индекс Kp',
    dash_synced: '🟢 Синхронизировано',
    dash_connecting: 'Подключение...',
    ad_space: 'Официальное рекламное место · Google AdSense',
    by: 'от',
    views: 'просмотров',
    followers: 'подписчиков',
    servers_active: '⚡ 24/7 Активные серверы',
    live_data: '🛰️ NASA/NOAA Данные в реальном времени',
    latin_science: '🇨🇴 100% Латиноамериканская открытая наука',
    secure: '🔒 Безопасно Верифицированные аккаунты',
    lang_select: 'Язык',
  },

  hi: {
    nav_dashboard: 'डैशबोर्ड',
    nav_storms: 'तूफान',
    nav_reels: 'रील्स और मीडिया',
    nav_analysis: 'विश्लेषण',
    nav_live: 'लाइव',
    hero_badge: '🛰️ NASA · NOAA · ESA से रियल-टाइम सैटेलाइट टेलीमेट्री',
    hero_title_1: 'सूर्य',
    hero_title_2: 'निरंतर निगरानी',
    hero_title_3: 'में',
    hero_description: 'NASA, NOAA और ESA के आधिकारिक डेटा के साथ 24/7 सौर निगरानी। भू-चुंबकीय तूफान, सौर ज्वाला, Kp सूचकांक और SDO से लाइव स्पेक्ट्रोस्कोपिक इमेजिंग। स्वतंत्र और खुला विज्ञान:',
    hero_btn_dashboard: 'टेलीमेट्री डैशबोर्ड देखें →',
    hero_btn_storms: 'सक्रिय तूफान',
    hero_btn_reels: '🎬 रील्स और शॉर्ट्स',
    events_title: '⚡ चल रहे इवेंट और फ्लेयर',
    events_link: '14 दिन देखें →',
    videos_badge: '🎬 मल्टीमीडिया और सोशल मीडिया ट्रेंड',
    videos_title: 'वायरल सूर्य वीडियो, रील्स और शॉर्ट्स',
    videos_description: 'सौर तूफानों और ऑरोरा के बारे में YouTube, TikTok और Instagram के सबसे वायरल वीडियो के वास्तविक सत्यापित लिंक। क्यूरेटर:',
    videos_filter_all: 'सभी',
    videos_watch_on: 'वास्तविक वीडियो देखें:',
    equip_badge: '🔬 अनुशंसित वैज्ञानिक उपकरण',
    equip_title: 'सौर अवलोकन और अनुसंधान उपकरण',
    equip_description: 'इन आधिकारिक खगोल विज्ञान लिंक के माध्यम से प्रत्येक खरीद सर्वर और ओपन-सोर्स अनुसंधान को सीधे वित्तपोषित करती है:',
    equip_affiliates: '🤝 आधिकारिक सहयोगी: Celestron · ZWO · High Point · Amazon Associates',
    equip_view: 'आधिकारिक उपकरण देखें →',
    equip_support: '💡 विज्ञान का समर्थन: सक्रिय कमीशन',
    donate_title: 'सौर नेटवर्क को शक्ति दें',
    donate_description: '24/7 सर्वर, प्रारंभिक चेतावनी नोड और विश्लेषण एल्गोरिदम को बनाए रखना आप पर निर्भर करता है। परियोजना में सीधे योगदान करें। संस्थापक:',
    donate_nequi: '📱 Nequi / Daviplata',
    donate_savings: '🏦 बचत खाता',
    donate_card: '💳 कार्ड / PSE',
    donate_paypal: '🌐 PayPal (आधिकारिक QR)',
    donate_copy: '📋 नंबर कॉपी करें',
    donate_cell: 'फोन नंबर:',
    donate_holder: 'खाता धारक:',
    donate_no_commission: '0% कमीशन',
    donate_instant: 'तत्काल',
    donate_instructions: 'अपना Nequi या Daviplata ऐप खोलें, नंबर दर्ज करें और परियोजना में अपना योगदान भेजें।',
    savings_bank: 'Bancolombia',
    savings_account_type: 'बचत खाता',
    savings_account_number: 'खाता संख्या:',
    savings_holder: 'खाता धारक:',
    savings_copy: '📋 खाता संख्या कॉपी करें',
    footer_tagline: 'रियल-टाइम सौर वेधशाला और अनुसंधान केंद्र ·',
    footer_data: 'वैज्ञानिक डेटा: NASA DONKI · NOAA SWPC · ESA Helioviewer',
    footer_images: 'चित्र: NASA/SDO और AIA, EVE, HMI टीमों के सौजन्य से',
    dash_title: 'सौर टेलीमेट्री डैशबोर्ड',
    dash_solar_wind: 'सौर हवा',
    dash_speed: 'गति',
    dash_magnetic: 'चुंबकीय क्षेत्र Bz',
    dash_xray: 'एक्स-रे फ्लक्स',
    dash_kp_index: 'Kp सूचकांक',
    dash_synced: '🟢 सिंक्रनाइज़',
    dash_connecting: 'कनेक्ट हो रहा है...',
    ad_space: 'आधिकारिक विज्ञापन स्थान · Google AdSense',
    by: 'द्वारा',
    views: 'व्यूज',
    followers: 'फॉलोअर्स',
    servers_active: '⚡ 24/7 सक्रिय सर्वर',
    live_data: '🛰️ NASA/NOAA लाइव डेटा',
    latin_science: '🇨🇴 100% लैटिन अमेरिकी ओपन साइंस',
    secure: '🔒 सुरक्षित सत्यापित खाते',
    lang_select: 'भाषा',
  },
}

// ─────────────────────────────────────────────────────────────
// Detect browser language → match to supported Lang
// ─────────────────────────────────────────────────────────────
function detectLang(): Lang {
  if (typeof window === 'undefined') return 'es'
  const stored = localStorage.getItem('heliox-lang') as Lang | null
  if (stored && translations[stored]) return stored

  const nav = navigator.language || (navigator as any).userLanguage || 'es'
  const prefix = nav.split('-')[0].toLowerCase() as Lang
  return translations[prefix] ? prefix : 'es'
}

// ─────────────────────────────────────────────────────────────
// Context & Provider
// ─────────────────────────────────────────────────────────────
interface I18nContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: TranslationKeys
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLangState(detectLang())
    setMounted(true)
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem('heliox-lang', l)
    // Set dir attribute for RTL languages
    if (l === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
    }
  }, [])

  const value: I18nContextValue = {
    lang,
    setLang,
    t: translations[lang] || translations.es,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}

// ─────────────────────────────────────────────────────────────
// Language Selector Component (dropdown)
// ─────────────────────────────────────────────────────────────
export function LanguageSelector({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10 text-xs text-white/70 hover:text-white transition-all"
        aria-label={t.lang_select}
      >
        <span>{LANG_FLAGS[lang]}</span>
        <span className="hidden sm:inline">{LANG_LABELS[lang]}</span>
        <span className="text-white/30">▾</span>
      </button>

      {open && (
        <>
          {/* Backdrop to close */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 z-50 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden min-w-[160px] max-h-[320px] overflow-y-auto">
            {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-white/10 transition-colors ${
                  l === lang ? 'bg-solar-500/20 text-solar-300 font-semibold' : 'text-white/70'
                }`}
              >
                <span className="text-base">{LANG_FLAGS[l]}</span>
                <span>{LANG_LABELS[l]}</span>
                {l === lang && <span className="ml-auto text-solar-400">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
