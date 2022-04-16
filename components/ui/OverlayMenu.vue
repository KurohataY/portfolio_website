<template>
    <div app v-show="overlay" @click="updateOverlay(!overlay)" id="overlay_menu_box">
        <ul>
            <li v-for="(nav, index) in headerData.nav" :key="index">
                <v-btn class="overlay_buttons">
                    <a class="menu_link_style" :href="nav.to">{{ nav.text }}</a>
                </v-btn>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
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

const { overlayStateValue, updateOverlay } = useOverlay();

const overlay = ref(overlayStateValue)

watch(
    () => overlayStateValue.value,
    (overlayStateValue) => {
        overlay.value = overlayStateValue
        console.log(overlay.value)
    }
)

</script>

<style lang="scss">
#overlay_menu_box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 95% !important;
    z-index: 2147483647;
    text-align: center;

    ul {
        margin-top: 35vh;

        li {
            .overlay_buttons {
                margin: 20px 0;
                border-radius: 0% !important;
                border-bottom: double;
                box-shadow: none !important;
            }
        }
    }
}
</style>