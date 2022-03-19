<template>
    <v-main>
        <BlogUiTitleView />
        <BlogUiContents :data="data" />
        <BlogUiPagenation :nowPageNum="nowPageNum" :pageMaxNum="pageMaxNum" />
    </v-main>
</template>

<script setup>

const route = useRoute()

const limit = 12;

const nowPageNum = route.params.page_num
const offset = (Number(nowPageNum) - 1) * limit;


let { data } = await useFetch("/api/microcms", {
    params: {
        offset: offset !== 0 ? offset : "",
        limit: limit
    },
});

const pageMaxNum = Math.ceil(Number(data.value.totalCount) / limit)


</script>

<style lang="scss" scoped>
</style>