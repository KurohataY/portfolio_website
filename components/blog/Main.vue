<template>
    <v-main>
        <div id="blog_title_box">
            <BlogTitleView />
        </div>
        <v-card class="mx-auto" id="blog_box">
            <v-container fluid>
                <v-row dense>
                    <v-col v-for="content in data.contents" :key="content.title" cols="12">
                        <v-card>
                            <v-img
                                :src="content.thumbnail.url"
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="200px"
                            >
                                <v-card-title class="text-white" v-text="content.title"></v-card-title>
                            </v-img>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                    size="small"
                                    color="surface-variant"
                                    variant="text"
                                    icon="mdi-heart"
                                ></v-btn>

                                <v-btn
                                    size="small"
                                    color="surface-variant"
                                    variant="text"
                                    icon="mdi-bookmark"
                                ></v-btn>

                                <v-btn
                                    size="small"
                                    color="surface-variant"
                                    variant="text"
                                    icon="mdi-share-variant"
                                ></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        <NuxtLink :to="prevLink" v-if="prevButtonShow">
            <v-icon large color="green darken-2">mdi-chevron-left</v-icon>
        </NuxtLink>
        <NuxtLink :to="nextLink" v-if="nextButtonShow">
            <v-icon large color="green darken-2">mdi-chevron-right</v-icon>
        </NuxtLink>
    </v-main>
</template>

<script setup>

const route = useRoute()

const limit = 10;
let offset = ref(route.params.page_num);

const nextPageNum =  Number(route.params.page_num) + 1
const prevPageNum =  Number(route.params.page_num) - 1

const nextLink = route.fullPath.slice(0, -1) + nextPageNum;
const prevLink = route.fullPath.slice(0, -1) + prevPageNum;


let { data } = await useFetch("/api/microcms", {
    params: {
        offset: offset.value !== 0 ? offset.value * 10 : ""
    },
});

const pageMaxNum =   Math.floor(Number(data.value.totalCount) / 10)


const prevButtonShow  =  Number(route.params.page_num) >= 0 ? true : false;
const nextButtonShow =  Number(route.params.page_num) < pageMaxNum ? true : false;


watch(() => offset.value,
    async (offset) => {
        const { data: nextData } = await useLazyAsyncData("nextData", () => $fetch("/api/microcms", {
            params: {
                offset: offset !== 0 ? offset * limit : ""
            },
        }));
        data.value = nextData.value
    }
)


</script>

<style lang="scss" scoped>
#blog_title_box {
    margin-bottom: 100px;
}
#blog_box {
    max-width: 80%;
}
</style>