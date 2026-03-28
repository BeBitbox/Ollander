// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      meta: [
        { name: 'author', content: 'Claude Code' },
        { name: 'google-adsense-account', content: 'ca-pub-7526091117069803' },
      ],
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7526091117069803',
          async: true,
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  routeRules: {
    '/**': {
      headers: {
        'Content-Security-Policy':
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com; frame-src https://googleads.g.doubleclick.net; img-src 'self' data: http://localhost https://*.google.com https://*.googlesyndication.com; connect-src 'self' https://u3qcym3sb0.execute-api.eu-west-3.amazonaws.com;",
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://u3qcym3sb0.execute-api.eu-west-3.amazonaws.com',
    },
  },
})
