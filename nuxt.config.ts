// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "page",
      mode: "in-out",
    },
  },
  modules: ["@nuxtjs/tailwindcss"],

  devtools: {
    enabled: true,
  },
});
