import { defineNuxtConfig } from "nuxt";

declare module "vite" {
    interface UserConfig {
        // This is the missing options. Please see https://vitejs.dev/config/#ssr-options
        ssr?: {
            external?: string[];
            noExternal?: string | RegExp | (string | RegExp)[] | true;
            target?: "node" | "webworker";
        };
    }
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    typescript: {
        shim: false,
    },
    build: {
        transpile: ['vuetify', 'swiper']
    },
    vite: {
        define: {
            "process.env.DEBUG": "false"
        }
    },
    css: ['vuetify/lib/styles/main.sass', "@/assets/css/default.scss"],
    meta: {
        // title: "Izanagi's site",
        htmlAttrs: {
            lang: "ja"
        },
        meta: [
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
        link: [
            { rel: 'icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css'
            }
        ],
    },
    privateRuntimeConfig: {
        MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
        MICRO_CMS_SERVICE_DOMAIN: process.env.MICRO_CMS_SERVICE_DOMAIN,
    },
    publicRuntimeConfig: {
        FORM_RUN_URL: process.env.FORM_RUN_URL,
        TWITTER_MY_USER_ID: process.env.TWITTER_MY_USER_ID,
        HOMEPAGE_ROOT_URL: process.env.HOMEPAGE_ROOT_URL,
        CONNPASS_NICKNAME: process.env.CONNPASS_NICKNAME,
        GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
    },
    // components: {
    //     global: true,
    //     dirs: ['~/components']
    // }
});