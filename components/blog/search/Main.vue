<template>
    <v-main>
        <form method="get" action="/blog/search" id="search_form" @submit.prevent="submit">
            <div class="cp_iptxt">
                <input class="ef" name="word" type="text" required v-model="word" />
                <v-btn icon="mdi-magnify" color="light-blue" type="submit" rel="noopener noreferrer" size="small">
                </v-btn>

                <span class="focus_line"></span>
            </div>
        </form>
        <div class="suggest_box">
            <UiSuggest  :tagsList="suggest_list" :num="5" v-model="word" v-if="componentShow" style="width: 80%;" />
            <div class="opacity_block"></div>
        </div>
        <v-card max-width="900" class="mx-auto" id="search_result_box">
            <v-row dense>
                <v-col cols="12" v-if="dataFlag" v-for="content in data">
                    <a :href="`/blog/articles/${content['contents_id']}`">
                        <v-card color="#1F7087" theme="dark">
                            <div class="d-flex flex-no-wrap">
                                <div class="pa-3">
                                    <img :src="content['img_url']" :height="150" :width="200"
                                        style="max-width: none;object-fit: fill;" />
                                </div>
                                <div class="flex_box">
                                    <v-card-title class="text-h5">{{ content["title"] }}</v-card-title>
                                </div>
                            </div>
                        </v-card>
                    </a>
                </v-col>
                <v-col cols="12" v-else style="padding: 70px 70px 0;">
                    <div id="no_contents_text">記事が見つかりませんでした。他の検索単語をお試しください。</div>
                </v-col>
            </v-row>
        </v-card>
    </v-main>
</template>


<script lang="ts" setup>

import axios from "axios"
const route = useRoute()

const word = ref(route.query.word)

let data = ref([])

let dataFlag = ref()

await axios.get("http://localhost/yomotsuhirasaka/search", {
    params: {
        word: word.value
    }
}).then(function (response) {
    data.value = [];
    dataFlag.value = true;
    response.data.forEach((element) => { if (!!element) { data.value.push(element) } })
}).catch(err => {
    console.log('err:', err);
    dataFlag.value = false;
});


function submit() {
    return navigateTo({
        path: '/blog/search',
        query: {
            word: word.value,
        }
    })
}

watch(() => route.query, () => location.reload())

const suggest_list = ref([])
const componentShow = ref(false)

const reload = (() => {
    componentShow.value = false
    nextTick(() => {
        componentShow.value = true
    })

})

watch(
    () => word.value,
    async (word) => {
        await axios.get(`http://localhost/yomotsuhirasaka/suggest`, {
            params: {
                word: word,
                limit: 5
            }
        }).then(function (res) {
            suggest_list.value = [];
            res.data.forEach((element) => { if (!!element) { suggest_list.value.push(element["Word"]) } })
        });

        reload()
    }
)

</script>

<style lang="scss" scoped>
.flex_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#search_form {
    text-align: center;
    padding: 70px 70px 0 70px;
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

.suggest_box {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    padding: 0 70px;
}

.opacity_block {
    width: 40px;
}

#search_result_box {
    margin: 70px 0;
    box-shadow: none !important;

}

#no_contents_text {
    text-align: center;
}
</style>