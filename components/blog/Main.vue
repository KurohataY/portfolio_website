<template>
    <v-main>
        <BlogUiTitleView />
        <BlogUiContents :data="data" />
        <BlogUiPagenation :nowPageNum="nowPageNum" :pageMaxNum="pageMaxNum" />
    </v-main>
</template>

<script setup lang="ts">

const route = useRoute()

const limit: number= 12;

const nowPageNum: number = Number(route.params.page_num)
const offset: number = (nowPageNum - 1) * limit;


let { data } = await useFetch("/api/microcms", {
    params: {
        offset: offset !== 0 ? offset : "",
        limit: limit
    },
});

const pageMaxNum: number = Math.ceil(data.value["totalCount"] / limit)


</script>

<style lang="scss" scoped>
</style>