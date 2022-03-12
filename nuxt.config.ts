import { defineNuxtConfig } from "nuxt3";
import vuetify from "@vuetify/vite-plugin";

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
    css: ["vuetify/styles", "@/assets/css/default.scss"],
    vite: {
        plugins: [
            vuetify(),
            {
                // https://github.com/nuxt/framework/issues/2798
                configResolved(config) {
                    const vuetifyIdx = config.plugins.findIndex(
                        (plugin) => plugin.name === "vuetify:import"
                    );
                    const vueIdx = config.plugins.findIndex(
                        (plugin) => plugin.name === "vite:vue"
                    );
                    if (~vuetifyIdx && vuetifyIdx < vueIdx) {
                        const vuetifyPlugin = config.plugins[vuetifyIdx];
                        // @ts-ignore
                        config.plugins.splice(vuetifyIdx, 1);
                        // @ts-ignore
                        config.plugins.splice(vueIdx, 0, vuetifyPlugin);
                    }
                },
            },
        ],
        ssr: {
            noExternal: ["vuetify"],
        },
        define: {
            "process.env.DEBUG": "false",
        },
    },
    meta: {
        meta: [
            {
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
        link: [
            { rel: 'icon', href: '/favicon.ico' }
        ],
    },
    privateRuntimeConfig: {
        FORM_RUN_URL: process.env.FORM_RUN_URL,
        MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
        MICRO_CMS_SERVICE_DOMAIN: process.env.MICRO_CMS_SERVICE_DOMAIN,

    },
    publicRuntimeConfig: {
        TWITTER_MY_USER_ID: process.env.TWITTER_MY_USER_ID,
        HOMEPAGE_ROOT_URL: process.env.HOMEPAGE_ROOT_URL,
        CONNPASS_NICKNAME: process.env.CONNPASS_NICKNAME,
    },
    // components: {
    //     global: true,
    //     dirs: ['~/components']
    // }
});