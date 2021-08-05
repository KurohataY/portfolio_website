import colors from 'vuetify/es5/util/colors'

require('dotenv').config();

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - portfolio_web_spa',
    title: 'portfolio_web_spa',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'stylesheet',
      href: 'https://use.typekit.net/ttj5ikc.css'
    }, {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
    }],
    script: [{
      src: 'https://sdk.form.run/js/v2/formrun.js'
    }, ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
    src: '~/plugins/micromodal.js',
    ssr: false
  }, {
    src: '~/plugins/swiper.js',
    ssr: false
  }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    "nuxt-microcms-module",
  ],
  microcms: {
    options: {
      serviceDomain: "izanagiblog",
      apiKey: process.env.MICRO_CMS_API_KEY,
    },
    mode: process.env.NODE_ENV === "production" ? "server" : "all",
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  env: {
    FORM_RUN_URL: process.env.FORM_RUN_URL,
    MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY
  },

  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', {
          loose: true
        }]
      ]
    },
    // vendor: [
    //   'vue-awesome-swiper',
    // ],
  },
}
