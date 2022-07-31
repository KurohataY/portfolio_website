<template>
    <v-layout>
        <div id="main_title">{{ title }}</div>
        <div id="bc_gradation"></div>
        <TopUiScrolldownButton />
    </v-layout>
</template>


<script setup>

const title = "Izanagi's Site";

</script>

<style lang="scss" scoped>
#main_title {
    position: relative;
    z-index: 1;
    font-size: 13vw;
    text-align: center;
    width: 100%;
    height: 65vw;
    line-height: 300%;
    background-color: #fff;
    mix-blend-mode: lighten;
    font-weight: bold;
    font-family: Great Vibes;
    letter-spacing: 0.12em;
}

@media (max-width: 768px) {
    #main_title {
        line-height: 500%;
    }
}

#bc_gradation {
    width: 100%;
    height: 100vh;
    background: linear-gradient(90deg, rgba(89, 173, 241, 1), rgba(207, 253, 157, 1));
    background-size: 200% 200%;
    animation: bggradient 20s ease infinite;
    position: absolute;
}

@keyframes bggradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>
