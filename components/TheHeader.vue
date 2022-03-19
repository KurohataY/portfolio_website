<template>
    <v-app-bar
        absolute
        color="white"
        shrink-on-scroll
        scroll-target="#scrolling-techniques-2"
        style="padding-right: 10px;box-shadow: none !important"
    >
        <v-app-bar-title tag="div">       
            <a href="/" id="header_title">{{ headerData.title }}</a>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn v-for="(nav, index) in headerData.nav" :key="index">
            <NuxtLink :to="nav.to" custom v-slot="{ href }">
                 <a :href="href">{{ nav.text }}</a>
            </NuxtLink>
        </v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">

const headerData = {
    title: "Izanagi's site",
    nav: [{
        text: "ブログ",
        to: "/blog"
    }, {
        text: "プライバシーポリシー",
        to: "/privacy-policy"
    }, {
        text: "お問合せ先",
        to: "/contact"
    }]
};

</script>

<style lang="scss">
#header_title {
    font-family: Great Vibes;
}
a {
    color: black;
    text-decoration: none;
}
</style>
