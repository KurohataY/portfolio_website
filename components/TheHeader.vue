<template>
    <header app>
        <div class="flex_box">
            <a class="menu_link_style" href="/" id="header_title">
                <div>{{ headerData.title }}</div>
            </a>
            <div style="flex-grow: 1;"></div>
            <span class="mdi mdi-menu" v-show="display.width.value <= 640" @click="onClickLink"></span>
            <v-btn v-show="display.width.value > 640" v-for="(nav, index) in headerData.nav" :key="index"
                class="menu_button">
                <a class="menu_link_style" :href="nav.to">{{ nav.text }}</a>
            </v-btn>
            <v-btn v-show="display.width.value > 640" class="menu_button" icon="mdi-magnify" small
                @click="isActive = !isActive">
            </v-btn>
        </div>
        <div id="menu_search_box" :class="{ 'active': isActive }">
            <UiSearchForm :placeholder="placeholder" :tagsList="tagsList" />
            <button class="mdi mdi-close" @click="isActive = false"></button>
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

const props = defineProps({
    tagsList: Object
})

const tagsList = props.tagsList;

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
    box-shadow: none !important;
    height: calc(var(--v-btn-height)) !important;
}

#menu_search_box {
    padding-top: 10px;
    border-bottom: 0.5px solid;
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
}

.close_button {
    border: none;
    // border-radius: 20% 20% 0 0 ;
    // border-bottom: 0;
    // margin-right: 5px;
}
</style>
