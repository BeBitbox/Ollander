// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],

  site: {
    url: 'https://ollander.be',
    name: 'ollander',
  },
  sitemap: {
    exclude: ['/api/**'],
    zeroRuntime: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      meta: [
        { name: 'author', content: 'BitBox' },
        // Globale Open Graph defaults — worden per pagina overschreven via useSeoMeta()
        { property: 'og:site_name', content: 'Ollander – Overlevingsgids voor Nederlanders in Vlaanderen' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/favicon-96x96.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'apple-mobile-web-app-title', content: 'ollander.be' },
      ],
      script: [
        { defer: true, src: 'https://api.pirsch.io/pa.js', id: 'pianjs', 'data-code': 'joU0KkxJtgqA7wzIv65cXJcpddWH72z4' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  routeRules: {
    '/**': {
      headers: {
        'Content-Security-Policy':
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://api.pirsch.io; img-src 'self' data: http://localhost; connect-src 'self' https://u3qcym3sb0.execute-api.eu-west-3.amazonaws.com https://api.pirsch.io;",
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://u3qcym3sb0.execute-api.eu-west-3.amazonaws.com',
    },
  },
})
