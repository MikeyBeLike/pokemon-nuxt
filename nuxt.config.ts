// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  runtimeConfig: {
    public: {
      pokemonApi: process.env.POKEMON_API_BASE_URL
    }
  },
  tailwindcss: {
    config: {
      theme: {
        container: {
          center: true,
          padding: {
            DEFAULT: '1rem'
          },
        },
      },
      plugins: [require("daisyui")],
      daisyui: {
        themes: ["light", "dark"]
      },
    }
  },
  vite: {
    vue: ({
      script: {
        defineModel: true
      }
    })
  }
})
