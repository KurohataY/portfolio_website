<template>
    <div app id="overlay_menu_box" v-if="overlay" @click="updateState(!overlay)">
        <teleport to="body">
            <div id="dialog">
                <ul>
                    <li v-for="(nav, index) in headerData.nav" :key="index">
                        <v-btn class="overlay_buttons">
                            <a class="menu_link_style" :href="nav.to">{{ nav.text }}</a>
                        </v-btn>
                    </li>
                </ul>
            </div>
        </teleport>
    </div>
</template>

<script lang="ts" setup>
import headerData from "assets/json/global_menu.json";

const { stateValue, updateState } = useOverlayMenu();

const overlay = ref(stateValue)

watch(
    () => stateValue.value,
    (overlayStateValue) => {
        overlay.value = overlayStateValue
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
}
#dialog {
    z-index: 2147483647;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2147483647;
    text-align: center;
    ul {
        li {
            list-style-type: none;
            .overlay_buttons {
                margin: 20px 0;
                border-radius: 0% !important;
                border-bottom: double;
                box-shadow: none !important;
                background: inherit !important;
            }
        }
    }
}
</style>