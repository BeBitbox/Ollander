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
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://u3qcym3sb0.execute-api.eu-west-3.amazonaws.com',
    },
  },
})
