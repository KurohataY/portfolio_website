<template>
    <div id="blog_title_box">
        <v-layout>
            <div id="main_title">{{ title }}</div>
            <div id="rings" style="height: 99%;width: 100%;position:absolute;"></div>
        </v-layout>
    </div>
</template>


<script setup>
import * as THREE from "three";

const title = "Blog";

onMounted(async () => {

    if (process.client) {
        const { default: RINGS } = await import("vanta/dist/vanta.rings.min");
        window.THREE = THREE;

        await RINGS({
            el: "#rings",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            THREE: window.THREE
        });

    }



})

onUpdated(async () => {

})


</script>

<style lang="scss" scoped>
#blog_title_box {
    margin-bottom: 100px;
}
#main_title {
    position: relative;
    z-index: 1;
    font-size: 70px;
    width: 100%;
    margin-left: 100px;
    height: 300px;
    line-height: 400%;
    font-weight: bold;
    font-family: Great Vibes;
    letter-spacing: 0.12em;
    color: white;
}
</style>
