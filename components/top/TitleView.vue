<template>
    <v-layout>
        <div id="main_title">{{ title }}</div>
        <div id="fog" style="height: 99%;width: 100%;position:absolute;">
            <TopUiScrolldownButton />
        </div>
    </v-layout>
</template>


<script setup>
import * as THREE from "three";

const title = "Izanagi's Site";

onMounted(async () => {


    const { default: FOG } = await import("vanta/dist/vanta.fog.min");
    window.THREE = THREE;

    FOG({
        el: "#fog",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        speed: 5.00,
        THREE: window.THREE
    });


})


</script>

<style lang="scss" scoped>
#main_title {
    position: relative;
    z-index: 1;
    font-size: 13vw;
    text-align: center;
    width: 100%;
    height: 75vw;
    line-height: 400%;
    background-color: #fff;
    mix-blend-mode: lighten;
    font-weight: bold;
    font-family: Great Vibes;
    letter-spacing: 0.12em;
}
</style>
