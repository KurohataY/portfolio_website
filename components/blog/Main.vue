<template>
    <v-main>
        <div id="blog_title_box">
            <BlogTitleView />
        </div>
        <div class="mx-auto" id="blog_box">
            <div
                class="d-flex flex-wrap justify-space-around"
                style="background-color: #EDF2F6;"
            >
                <NuxtLink
                    v-for="(content, index) in data.contents"
                    :key="content.title"
                    :to="`/blog/articles/${content.id}`"
                    custom
                    v-slot="{ href }"
                >
                    <a :href="href">
                        <v-card style="margin: 20px 5px" width="350px">
                            <v-img
                                :src="content.thumbnail.url + '?fm=webp&h=200'"
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="200px"
                                cover
                            >
                                <v-card-title class="text-white" v-text="content.title"></v-card-title>
                            </v-img>
                        </v-card>
                    </a>
                </NuxtLink>
            </div>
        </div>
        <NuxtLink :to="prevLink" v-if="prevButtonShow">
            <v-icon large color="green darken-2">mdi-chevron-left</v-icon>
        </NuxtLink>
        <NuxtLink v-for="num in pageMaxNum " :to="`/blog/pages/${num}`">{{ num }}</NuxtLink>
        <NuxtLink :to="nextLink" v-if="nextButtonShow">
            <v-icon large color="green darken-2">mdi-chevron-right</v-icon>
        </NuxtLink>
    </v-main>
</template>

<script setup>

const route = useRoute()

const limit = 9;
const offset = (Number(route.params.page_num) - 1) * limit;

const nextPageNum = Number(route.params.page_num) + 1
const prevPageNum = Number(route.params.page_num) - 1

const nextLink = route.fullPath.slice(0, -1) + nextPageNum;
const prevLink = route.fullPath.slice(0, -1) + prevPageNum;


let { data } = await useFetch("/api/microcms", {
    params: {
        offset: offset !== 0 ? offset : "",
        limit: limit
    },
});

const pageMaxNum = Math.ceil(Number(data.value.totalCount) / limit)


const prevButtonShow = Number(route.params.page_num) > 1 ? true : false;
const nextButtonShow = Number(route.params.page_num) <= pageMaxNum ? true : false;


</script>

<style lang="scss" scoped>
#blog_title_box {
    margin-bottom: 100px;
}
#blog_box {
    max-width: 80%;
}
</style>