import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-24',
  // El panel flotante de DevTools interfiere con la captura automatizada de
  // pantallas. Se activa a mano cuando haga falta.
  devtools: { enabled: false },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/seo'
  ],

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      // Archivo (Omnibus-Type, Buenos Aires) nació para señalética y formularios
      // de uso público en Latinoamérica. Es una sola familia con eje de ancho:
      // el display va en Expanded pesado, el cuerpo en ancho normal. Un solo
      // tipo con contraste de peso y ancho tiene más voz que un par tímido.
      { name: 'Archivo', provider: 'google', weights: [400, 500, 600, 700, 800] },
      // Martian Mono para las mediciones: cifras tabulares, formas técnicas,
      // y no es ninguna de las mono que salen por defecto.
      { name: 'Martian Mono', provider: 'google', weights: [400, 500, 600] }
    ]
  },

  i18n: {
    defaultLocale: 'es',
    // El español vive en la raíz; el inglés bajo /en. Cambiar esto rompe
    // todas las URLs ya indexadas, así que no se toca sin redirects.
    strategy: 'prefix_except_default',
    locales: [
      { code: 'es', language: 'es-CO', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en', name: 'English', file: 'en.json' }
    ],
    // Sin redirección automática por cabecera del navegador: un enlace
    // compartido debe abrir en el idioma que dice la URL, no en otro.
    detectBrowserLanguage: false
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark'
  },

  app: {
    // Transición entre páginas: corta y solo sobre transform/opacity, para que
    // no bloquee la lectura del contenido nuevo. Se anula con reduced-motion
    // desde el CSS global.
    pageTransition: { name: 'pagina', mode: 'out-in' },
    head: {
      // El '%s' vacío deja el título tal cual lo pone cada página; el sufijo
      // solo aparece cuando la página no es la home.
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'theme-color', content: '#0B1015' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://camilorincon.dev',
    name: 'Camilo Rincón',
    defaultLocale: 'es'
  },

  ogImage: { enabled: false },

  // Secretos del formulario. Sin prefijo `public`: no salen al navegador.
  runtimeConfig: {
    smtpHost: '',
    smtpPuerto: '587',
    smtpUsuario: '',
    smtpClave: '',
    correoDestino: '',
    // Dirección verificada en el proveedor. NO es el login SMTP.
    correoRemitente: ''
  },

  // Las páginas se prerenderizan igual; el preset `vercel` (y no
  // `vercel-static`) es lo que permite además desplegar /api/contacto como
  // función. Sin él, el formulario no tendría dónde enviarse.
  nitro: {
    preset: 'vercel',
    prerender: { crawlLinks: true, routes: ['/', '/en'] }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  future: { compatibilityVersion: 4 }
})
