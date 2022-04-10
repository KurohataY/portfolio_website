<template>
    <v-main id="blog">
        <BlogUiTitleView />
        <v-container>
            <BlogUiContents :data="data" />
            <BlogUiPagenation
                :nowPageNum="nowPageNum"
                :pageMaxNum="pageMaxNum"
                :visibleNum="visibleNum"
                :path="path"
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
    path = `/blog/tags/${categoryPath}/`;
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
});


const pageMaxNum: number = Math.ceil(data.value["totalCount"] / limit)


</script>

<style lang="scss" scoped>
#blog {
    background-color: #edf2f6;
}
</style>