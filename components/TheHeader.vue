<template>
    <header app :class='{ scroll: scroll }'>
        <div class="flex_box">
            <a class="menu_link_style" href="/" id="header_title">
                <div>{{ headerData.title }}</div>
                <!-- <img src="/images/rogo.png" alt="" height="36"> -->
            </a>
            <div style="flex-grow: 1;"></div>
            <span class="mdi mdi-menu" v-show="display.width.value <= 640" @click="onClickLink"
                aria-label="Menu Open"></span>
            <v-btn v-show="display.width.value > 640" v-for="(nav, index) in headerData.nav" :key="index"
                class="menu_button">
                <a class="menu_link_style" :href="nav.to">{{ nav.text }}</a>
            </v-btn>
            <v-btn v-show="display.width.value > 640" class="menu_button" icon="mdi-magnify" small
                @click="isActive = !isActive" aria-label="Serach box Open">
            </v-btn>
        </div>
        <div id="menu_search_box" :class="{ 'active': isActive }">
            <UiSearchForm :placeholder="placeholder" :suggest-num="5" input-width="85vw" />
            <button class="mdi mdi-close" @click="isActive = false" aria-label="Serach box Close"></button>
            <!-- generateのクロール用リンク -->
            <a href="/blog/search" style="display: none"></a>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import headerData from "assets/json/global_menu.json";

const placeholder = ""

const display = useDisplay()

const { stateValue, updateState } = useOverlayMenu();

let overlay = ref(stateValue.value);

const onClickLink = () => {
    updateState(!overlay.value);
};

const isActive = ref(false)

let scroll = ref(false)

const showScrollTop = () => {
    if (window.scrollY > 0) {
        scroll.value = true
    } else {
        scroll.value = false
    }
}

onMounted(() => {
    window.addEventListener("scroll", showScrollTop, { passive: true })
})


</script>

<style lang="scss">
header {
    background-color: #fff;
    font-size: 25px;
    padding: 20px 0 20px 10px;
    width: 100vw;
    height: 77.5px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;

    .flex_box {
        display: flex;

        #header_title {
            font-family: Great Vibes;
        }

            .mdi-menu {
                &::before {
                    margin-right: 15px;
                    font-size: 30px;
                    line-height: normal;
                }
            }
        
    }
}

.menu_button {
    border-radius: 0% !important;
    box-shadow: none !important;
    height: calc(var(--v-btn-height)) !important;
}

#menu_search_box {
    padding-top: 10px;
    text-align: center;
    position: fixed;
    z-index: 999;
    top: -120%;
    left: 0;
    width: 100%;
    background: rgb(255, 255, 255);
    transition: all 0.6s;

    &.active {
        top: 0;
    }

    &:hover {
        background-color: #ECEFF1;
    }
}

.close_button {
    border: none;
}

.scroll {
    border-bottom: 1px solid;
}
</style>
