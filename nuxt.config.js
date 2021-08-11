import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

require('dotenv').config();

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - portfolio_web_spa',
    title: 'portfolio-web-site',
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
        content: 'Izanagiのポートフォリオサイトです。Nuxt＋Jamstackで構成されたサイトです。'
      },
      { name: 'format-detection', content: 'telephone=no' }
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
    }, {
      src: 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=doxy'
    }],
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
  ],

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
    MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
    MICRO_CMS_SERVICE_DOMAIN: process.env.MICRO_CMS_SERVICE_DOMAIN,
  },

  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    },
    // vendor: [
    //   'vue-awesome-swiper',
    // ],
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/blog/:p',
        component: resolve(__dirname, 'pages/blog/post.vue'),
        name: 'contents',
      })
    },
  },
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {},
  generate: {
    async routes() {
      const pages = await axios
        .get(`https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=100`, {
          headers: { 'X-API-KEY': process.env.MICRO_CMS_API_KEY }
        })
        .then((res) =>
          res.data.contents.map((content) => ({
            route: `/blog/${content.id}`,
            payload: content
          }))
        )
      return pages
    }
  },
}
