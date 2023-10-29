// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }
  ]
})
