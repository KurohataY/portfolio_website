<template>
    <v-main>
        <div style="margin: 50px auto 0  auto;">
            <UiSearchForm :placeholder="placeholder" :suggest_num="5" :inputWidth="'70vw'" :word="word" />
        </div>
        <v-card max-width="900" class="mx-auto" id="search_result_box">
            <v-row dense>
                <v-col cols="12" v-if="dataFlag" v-for="content in data">
                    <a :href="`/blog/articles/${content['contents_id']}`">
                        <v-card height="180" color="#1F7087" theme="dark">
                            <div class="d-flex flex-no-wrap">
                                <div class="pa-3">
                                    <img :src="content['img_url']" :height="150" :width="200"
                                        style="max-width: none;object-fit: fill;" />
                                </div>
                                <div class="flex_box">
                                    <v-card-title class="text-h5" style="width: 600px;">{{ content["title"] }}
                                    </v-card-title>
                                    <v-card-text v-if='!!content["excerpt_text"]'>
                                        {{content["excerpt_text"]}}
                                    </v-card-text>
                                    <v-card-text v-else>
                                        {{content["body"].substr(0, 100) + "..."}}
                                    </v-card-text>
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
const config = useRuntimeConfig()

const word = ref(route.query.word)
let data = ref([])
let dataFlag = ref()
const placeholder: String = "キーワードを入力"

await axios.get(config.SEARCH_API_URL, {
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

watch(() => route.query, () => location.reload())

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
    width: 85vw;
}

#no_contents_text {
    text-align: center;
}
</style>