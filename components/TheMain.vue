<template>
    <v-main>
        <TopTitleView />
        <v-container fluid>
            
            <TopContentLinks />
            <TopSwiperCaloucel />
            <TopSkils />
            <TopInformation />
        </v-container>
    </v-main>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
#main_title {
    position: relative;
    z-index: 1;
    font-size: 100px;
    text-align: center;
    width: 100%;
    height: 500px;
    line-height: 50vw;
    background-color: #fff;
    mix-blend-mode: color-dodge;
    font-weight: bold;
    font-family: Great Vibes;
    letter-spacing: 0.12em;
}
</style>
