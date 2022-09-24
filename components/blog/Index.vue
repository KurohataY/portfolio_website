<template>
    <v-main id="blog">
        <BlogUiTitleView />
        <v-container>
            <BlogUiContents :data="data" />
            <BlogUiPagenation :nowPageNum="nowPageNum" :pageMaxNum="pageMaxNum" :visibleNum="visibleNum" :path="path" />
        </v-container>
    </v-main>
</template>

<script setup lang="ts">
import { hash } from "ohash"


const route = useRoute()

const limit: number = 12;
const visibleNum: number = 4;

let nowPageNum: number = Number(route.params.page_num)
let offset: number = (nowPageNum - 1) * limit;
const categoryPath = route.params.category;
const tag = route.params.tag;

let filter;
let filterKeyName: string;
let path: string;

if (categoryPath == "it") {
    path = `/blog/categories/${categoryPath}/`;
    filterKeyName = "categories";
    filter = "IT";
} else if (categoryPath == "daily") {
    path = `/blog/categories/${categoryPath}/`;
    filterKeyName = "categories";
    filter = encodeURI("日記");
} else if (categoryPath == "programming") {
    path = `/blog/categories/${categoryPath}/`;
    filterKeyName = "categories";
    filter = encodeURI("プログラミング");
} else if (!!tag) {
    path = `/blog/tags/${tag}/`;
    filterKeyName = "tags";
    filter = tag;
} else {
    path = "/blog/pages/"
    filter = "";
}



let { data } = await useFetch("/api/microcms", {
    params: {
        offset: offset !== 0 ? offset : "",
        limit: limit,
        filterKeyName: filterKeyName,
        filter: filter
    },
    initialCache: false,
    key: hash(['api-fetch', "/api/microcms", "Blog"])
});


const pageMaxNum: number = Math.ceil(data.value["totalCount"] / limit)


</script>

<style lang="scss" scoped>
#blog {
    background-color: #edf2f6;

    .v-container {
        max-width: 1296px !important;
    }
}
</style>