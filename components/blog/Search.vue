<template>
    <v-main>
        <div style="margin: 50px auto 0  auto;">
            <UiSearchForm :placeholder="placeholder" :suggest_num="5" :inputWidth="'70vw'" :word="word" />
        </div>
        <v-card max-width="900" class="mx-auto" id="search_result_box">
            <v-row dense>

                <v-col cols="12" v-for="content in searchContents">
                    <a :href="`/blog/articles/${content['contents_id']}`">
                        <v-card height="180" color="#1F7087" theme="dark">
                            <div class="d-sm-flex flex-no-wrap">
                                <div class="pa-3 search_contents_image">
                                    <img :src="content['img_url']" :height="150" :width="200"
                                        style="max-width: none;object-fit: fill;" />
                                </div>
                                <div class="flex_box">
                                    <v-card-title class="text-h5 search_contents_title">{{ content["title"] }}
                                    </v-card-title>
                                    <v-card-text v-if='!!content["excerpt_text"]'>
                                        {{ content["excerpt_text"] }}
                                    </v-card-text>
                                    <v-card-text v-else>
                                        {{ content["body"].substr(0, 100) + "..." }}
                                    </v-card-text>
                                </div>
                            </div>
                        </v-card>
                    </a>
                </v-col>
            </v-row>
        </v-card>
    </v-main>
</template>


<script lang="ts" setup>

const route = useRoute()
const config = useRuntimeConfig()

const word = ref(route.query.word)
const placeholder: string = "キーワードを入力"

const searchContents = ref()

const yomotsuhirasaka = async () => {
    await $fetch(config.SEARCH_API_URL, {
        method: "get",
        mode: "cors",
        params: {
            word: word.value
        },
        headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }).then((response) => {
        searchContents.value = response;
    })
}
yomotsuhirasaka()


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

.search_contents_title {
    width: 600px;
}

@media screen and (max-width: 640px) {
    .search_contents_image {
        display: none;
    }
    .search_contents_title {
        width: 100% !important;
    }
}
</style>