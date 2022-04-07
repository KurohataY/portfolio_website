<template>
    <v-main id="blog">
        <BlogUiTitleView />
        <v-container>
            <BlogUiContents :data="data" />
            <BlogUiPagenation
                :nowPageNum="nowPageNum"
                :pageMaxNum="pageMaxNum"
                :visibleNum="visibleNum"
            />
        </v-container>
    </v-main>
</template>

<script setup lang="ts">
const route = useRoute()

const limit: number = 12;
const visibleNum: number = 4;

let nowPageNum: number = Number(route.params.page_num)
let offset: number = (nowPageNum - 1) * limit;


let { data } = await useFetch("/api/microcms", {
    params: {
        offset: offset !== 0 ? offset : "",
        limit: limit
    },
});

const pageMaxNum: number = Math.ceil(data.value["totalCount"] / limit)


</script>

<style lang="scss" scoped>
#blog {
    background-color: #edf2f6;
}
</style>