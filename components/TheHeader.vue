<template>
    <header app>
        <div class="flex_box">
            <a class="menu_link_style" href="/" id="header_title">
                <div>{{ headerData.title }}</div>
            </a>
            <div style="flex-grow: 1;"></div>
            <span class="mdi mdi-menu" v-show="display.width.value <= 640" @click="onClickLink"></span>
            <v-btn
                v-show="display.width.value > 640"
                v-for="(nav, index) in headerData.nav"
                :key="index"
                class="menu_button"
            >
                <a class="menu_link_style" :href="nav.to">{{ nav.text }}</a>
            </v-btn>
        </div>
    </header>
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

const { overlayStateValue, updateOverlay } = useOverlay();

let overlay = ref(overlayStateValue.value);

const onClickLink = () => {
    updateOverlay(!overlay.value);
};


</script>

<style lang="scss">
header {
    background-color: #fff;
    font-size: 25px;
    padding: 20px 0 20px 10px;
    .flex_box {
        display: flex;
        #header_title {
            font-family: Great Vibes;
        }
    }
}

.menu_button {
    border-radius: 0% !important;
    border-bottom: double;
    box-shadow: none !important;
}
</style>
