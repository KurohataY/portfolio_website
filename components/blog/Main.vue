<template>
    <v-main>
        <div id="blog_title_box">
            <BlogUiTitleView />
        </div>
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
#blog_title_box {
    margin-bottom: 100px;
}
#blog_box {
    max-width: 80%;
}
#pagenation_box {
    text-align: center;
    margin: 50px;
    ul#pagenation_list {
        li {
            display: inline-block;
        }
        li.pagenation {
            border-radius: 30%;
            box-shadow: 0 0 2px grey;
            height: 30px;
            line-height: 30px;
            margin: 0 10px;
            text-align: center;
            width: 30px;
            a.router-link-active {
                font-weight: bold;
            }
        }
    }
}
</style>