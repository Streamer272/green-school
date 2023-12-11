// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "page",
      mode: "in-out",
    },
  },
  modules: ["@nuxtjs/tailwindcss"],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
  devtools: {
    enabled: true,
  },
});
