<template>
    <v-app-bar
        app
        absolute
        color="white"
        shrink-on-scroll
        scroll-target="#scrolling-techniques-2"
        style="padding-right: 10px;box-shadow: none !important"
        id="menu"
    >
        <a class="menu_link_style" href="/" id="header_title">
            <v-app-bar-title tag="div">{{ headerData.title }}</v-app-bar-title>
        </a>
        <v-spacer></v-spacer>
        <v-btn v-if="display.width.value <= 640" @click="overlay = !overlay" icon="mdi-menu"></v-btn>
        <v-btn v-else v-for="(nav, index) in headerData.nav" :key="index">
            <a class="menu_link_style" :href="nav.to">{{ nav.text }}</a>
        </v-btn>
        <v-overlay
            v-model="overlay"
            scrim="#fff"
            id="overlay_box"
            class="align-center justify-center"
        >
            <v-btn class="overlay_buttons" v-for="(nav, index) in headerData.nav" :key="index">
                <a class="menu_link_style" :href="nav.to">{{ nav.text }}</a>
            </v-btn>
        </v-overlay>
    </v-app-bar>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
const headerData = {
    title: "Izanagi's site",
    nav: [{
        text: "ブログ",
        to: "/blog/pages/1"
    }, {
        text: "プライバシーポリシー",
        to: "/privacy-policy"
    }, {
        text: "お問合せ先",
        to: "/contact"
    }]
};

const display = useDisplay()
const overlay = ref(false);

watch(
    () => overlay,
    (overlay) => {
        overlay.value = !overlay.value
    }
)
</script>

<style lang="scss">
#header_title {
    font-family: Great Vibes;
}
#overlay_box {
    .v-overlay__scrim {
        opacity: 95% !important;
    }
    .v-overlay__content {
        display: grid;
        .overlay_buttons {
            margin: 20px 0;
            border-radius: 0% !important;
            border-bottom: double;
        }
    }
}
</style>
