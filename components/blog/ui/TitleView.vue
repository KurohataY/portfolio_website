<template>
    <div id="blog_title_box">
        <v-layout>
            <div id="main_title">{{ title }}</div>
            <div id="bc_animetion">
                <div ref="lottie_ref" :animationData="animationData" />
            </div>
        </v-layout>
    </div>
</template>

<script setup lamg="ts">
import animationData from "@/assets/json/78255-background-looping-animation.json";
import lottie from 'lottie-web';

const title = "Blog";

const lottie_ref = ref()

onMounted(() => {
    lottie.loadAnimation({
        container: lottie_ref.value, // the dom element
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData, // the animation data
    });
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

#bc_animetion {
    width: 100vw;
    height: 100%;
    position: absolute;
    background-color: #263238;
}
</style>
