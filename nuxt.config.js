import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

require('dotenv').config();

const CATEGORY_PATH = [{
  "name": "日記",
  "path": "daily"
}, {
  "name": "IT",
  "path": "it"
}, {
  "name": "プログラミング",
  "path": "programming"
}]

const RANGE = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i)
const LIMIT = 10

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Izanagi Home Page',
    title: 'Izanagi Home Page',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Izanagiのポートフォリオサイトです。Nuxt＋Jamstackで構成されたサイトです。'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Izanagi Home Page'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Izanagiのポートフォリオサイトです。Nuxt＋Jamstackで構成されたサイトです。'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.HOMEPAGE_ROOT_URL
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/favicon.ico'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Izanagi Home Page'
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary'
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: process.env.TWITTER_MY_USER_ID
      },
    ],
    link: [{
      rel: 'stylesheet',
      href: 'https://use.typekit.net/ttj5ikc.css'
    }, {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, ],
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
  }, {
    src: '~/plugins/vue-scrollto',
  }, ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-material-design-icons-iconfont',
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
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        /*以下追加*/
        options: {
          customProperties: true
        }
      }
    }
  },
  privateRuntimeConfig: {
    FORM_RUN_URL: process.env.FORM_RUN_URL,
    MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
    MICRO_CMS_SERVICE_DOMAIN: process.env.MICRO_CMS_SERVICE_DOMAIN,
    TWITTER_MY_USER_ID: process.env.TWITTER_MY_USER_ID,
    HOMEPAGE_ROOT_URL: process.env.HOMEPAGE_ROOT_URL,
    NO_IMAGE_URL: process.env.NO_IMAGE_URL,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    TWITTER_URL: process.env.TWITTER_URL,
    RELETE_DOC_API_URL: process.env.RELETE_DOC_API_URL,
  },
  publicRuntimeConfig: {
    FORM_RUN_URL: process.env.FORM_RUN_URL,
    MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
    MICRO_CMS_SERVICE_DOMAIN: process.env.MICRO_CMS_SERVICE_DOMAIN,
    TWITTER_MY_USER_ID: process.env.TWITTER_MY_USER_ID,
    HOMEPAGE_ROOT_URL: process.env.HOMEPAGE_ROOT_URL,
    NO_IMAGE_URL: process.env.NO_IMAGE_URL,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    TWITTER_URL: process.env.TWITTER_URL,
    RELETE_TITLES_API_URL: process.env.RELETE_TITLES_API_URL,
  },
  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-private-property-in-object", {
          "loose": true
        }]
      ]
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/blog/articles/:p',
        component: resolve(__dirname, 'pages/blog/slug/_post.vue'),
        name: 'contents',
      });
      routes.push({
        path: '/blog/pages/:p',
        component: resolve(__dirname, 'pages/blog/slug/_pages.vue'),
        name: 'pages',
      });
      routes.push({
        path: '/blog/category/:categoryId/pages/:p',
        component: resolve(__dirname, 'pages/blog/slug/_pages.vue'),
        name: 'category',
      })
    },
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-gtag',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true,
        },
        brotli: {
          threshold: 10240,
        },
      },
    ],
  ],
  pwa: {
    icon: {},
    meta: {
      // mobileAppIOSオプションを有効にする前に、以下記事を一読すること。
      // https://medium.com/@firt/dont-use-ios-web-app-meta-tag-irresponsibly-in-your-progressive-web-apps-85d70f4438cb
      // mobileAppIOS: true
    },
    manifest: {
      name: 'Izanagi-portfolio-site',
      lang: 'ja',
      short_name: 'portfolio',
      title: 'Izanagi-portfolio-site',
      description: 'ポートフォリオサイトです',
      theme_color: '#212121',
      background_color: '#212121'
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.HOMEPAGE_ROOT_URL,
    routes(callback) {
      Promise.all([
          axios
          .get(`https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=200`, {
            headers: {
              'X-API-KEY': process.env.MICRO_CMS_API_KEY
            },
          }),
          axios.get(
            encodeURI(`https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=0&filters=categories[contains]IT`), {
              headers: {
                'X-MICROCMS-API-KEY': process.env.MICRO_CMS_API_KEY
              }
            }
          ),
          axios.get(
            encodeURI(`https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=0&filters=categories[contains]日記`), {
              headers: {
                'X-MICROCMS-API-KEY': process.env.MICRO_CMS_API_KEY
              }
            }
          ),
          axios.get(
            encodeURI(`https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=0&filters=categories[contains]プログラミング`), {
              headers: {
                'X-MICROCMS-API-KEY': process.env.MICRO_CMS_API_KEY
              }
            }
          )
        ])
        .then((res) => {
          const urls = []
          res[0].data.contents.map((content) => {
            urls.push(`/blog/articles/${content.id}`)
          })
          RANGE(1, Math.ceil(res[0].data.totalCount / LIMIT)).map((p) => {
            urls.push(`/blog/pages/${p}`)
          })

          RANGE(1, Math.ceil(res[1].data.totalCount / LIMIT)).map((p) => {
            urls.push(`/category/it/pages/${p}`)
          })
          RANGE(1, Math.ceil(res[2].data.totalCount / LIMIT)).map((p) => {
            urls.push(`/category/daily/pages/${p}`)
          })
          RANGE(1, Math.ceil(res[3].data.totalCount / LIMIT)).map((p) => {
            urls.push(`/category/programming/pages/${p}`)
          })
          callback(null, urls)
        })
        .catch(callback)
    },
    exclude: ['/404', '/app/middle_name'],
    gzip: true,
    trailingSlash: true,
  },
  'google-gtag': {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
  proxy: {
    '/api': {
      target: 'http://[::1]:5000',
      pathRewrite: {
        '^/api': '/'
      }
    },
  },
  axios: {
    proxy: true
  },
  generate: {
    interval: 100,
    async routes() {
      const articles = await axios
        .get(`https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=200`, {
          headers: {
            'X-API-KEY': process.env.MICRO_CMS_API_KEY
          }
        })
        .then((res) =>
          res.data.contents.map((content) => ({
            route: `/blog/articles/${content.id}`,
          }))
        )


      const pages = await axios
        .get(`https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=0`, {
          headers: {
            'X-API-KEY': process.env.MICRO_CMS_API_KEY
          }
        })
        .then((res) =>
          RANGE(1, Math.ceil(res.data.totalCount / LIMIT)).map((p) => ({
            route: `/blog/pages/${p}`,
          }))
        )
      return [
        ...articles, ...pages,
      ]
    }
  },
}
