// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.scss"],
  components: ["~/components"],
  modules: ["@nuxt/image", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
});
