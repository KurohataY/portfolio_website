<template>
    <v-main>
        <form method="get" action="/blog/search" id="search_form">
            <div class="cp_iptxt">
                <input class="ef" name="word" type="text" required v-model="word" />
                <v-btn
                    icon="mdi-magnify"
                    color="light-blue"
                    @click.native="search"
                    rel="noopener noreferrer"
                    size="small"
                ></v-btn>

                <span class="focus_line"></span>
            </div>
        </form>
        <v-card max-width="900" class="mx-auto">
            <v-row dense>
                <v-col cols="12" v-if="resultShow" v-for="content in data['contents']">
                    <a :href="`/blog/articles/${content.id}`">
                        <v-card color="#1F7087" theme="dark">
                            <div class="d-flex flex-no-wrap">
                                <div class="pa-3">
                                    <img :src="content.thumbnail.url" :height="150" :width="200" style="width:200px" />
                                    <!-- <v-img :height="150" :width="200" :src="content.thumbnail.url" :lazy-src="content.thumbnail.url"></v-img> -->
                                </div>
                                <div class="flex_box">
                                    <v-card-title class="text-h5">{{ content.title }}</v-card-title>

                                    <v-card-subtitle
                                        v-if="!!content.description"
                                    >{{ content.description.substr(0, 50) }}</v-card-subtitle>
                                </div>
                            </div>
                        </v-card>
                    </a>
                </v-col>
                <v-col cols="12" v-else>
                    <div>単語を入力してください</div>
                </v-col>
            </v-row>
        </v-card>
        <BlogUiPagenation
            :nowPageNum="nowPageNum"
            :pageMaxNum="pageMaxNum"
            :visibleNum="visibleNum"
            :path="path"
            :usePathNumber="true"
            v-if="componentShow"
        />
    </v-main>
</template>


<script lang="ts" setup>
import axios from 'axios';
const route = useRoute()

let word = ref()
word.value = route.query.word

const resultShow = ref(true)
resultShow.value = !!word.value

const limit: number = 12;
const visibleNum: number = 4;

const componentShow = ref(true)


let nowPageNum: number = Number(route.query.page)
let offset: number = (nowPageNum - 1) * limit;

let { data } = !!word.value ? await useFetch("/api/microcms", {
    params: {
        query: word.value,
        offset: offset !== 0 ? offset : "",
    },
}) : undefined;

let path =  !!word.value ? ref(`/blog/search?word=${word.value}&page=`) : ref("");
let pageMaxNum = !!word.value ?  ref(Math.ceil(data.value["totalCount"] / limit)) : ref("");



const reload = (() => {
    componentShow.value = false
    nextTick(() => {
        componentShow.value = true
        console.log(componentShow.value)
    })

})


const search = (async () => {
    if (!!word.value) {
        await axios.get(`/api/microcms`, {
            params: {
                query: word.value
            }
        }).then(function (response) {
            data.value = response.data;
            pageMaxNum.value = Math.ceil(data.value["totalCount"] / limit)
            path.value = `/blog/search?word=${word.value}&page=`
            resultShow.value = true;
            // コンポーネントリロード
            reload()
        });

        return navigateTo({
            path: path.value,
            query: {
                word: word.value,
            }
        })
    } else {
        resultShow.value = false;
    }
})



</script>]

<style lang="scss" scoped>
.flex_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#search_form {
    text-align: center;
    padding: 70px;
}

.cp_iptxt {
    position: relative;
    display: flex;
    justify-content: center;
}
.cp_iptxt input {
    font: 15px/24px sans-serif;
    box-sizing: border-box;
    width: 80%;
    letter-spacing: 1px;
}
.cp_iptxt input:focus {
    outline: none;
}
.ef {
    padding: 4px 0;
    border: 0;
    border-bottom: 1px solid #1b2538;
    background-color: transparent;
}
</style>