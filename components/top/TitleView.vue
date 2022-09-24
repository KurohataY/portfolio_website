<template>
    <v-layout style="height: 100vh;">
        <div id="bc_gradation">

            <div id="main_title">
                <div>
                    <p>{{ title }}</p>
                </div>
            </div>
            <TopUiScrolldownButton />
            <video id="video" preload="auto" autoplay="true" loop="loop" muted="muted" volume="0">
                <source src="/movie/sea_1280x720.mp4" type="video/mp4" width="100vw">
            </video>
        </div>

    </v-layout>

</template>


<script setup>

const title = "Izanagi's Site";

</script>

<style lang="scss" scoped>
/*背景動画にフィルタをかける*/
#bc_gradation {
    position: relative;
    height: 100vh;
    overflow: hidden;
    opacity: 0.01;
    animation: load 1.5s 0.8s ease-out forwards;
    width: 100vw;
}

#bc_gradation #video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: 100vh;
    z-index: -1000;
    overflow: hidden;
    transform: translate(-50%, -50%) scale(1.5);
    // filter: grayscale(100%) contrast(60%);
    /*背景動画にかけるフィルタ*/
    transition: 0.3s;
}

@keyframes load {
    100% {
        opacity: 1;
    }
}

#main_title {
    display: table;
    position: relative;
    height: inherit;
    width: 100vw;
}

#main_title>div {
    display: table-cell;
    vertical-align: middle;
    position: relative;
    text-align: center;
}

#main_title>div>p {
    color: #fff;
    text-shadow: 0 0px 5px rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 10px;
    font-size: 10vw;
    font-weight: 600;
    font-family: 'Fira Sans', sans-serif;
}
</style>
