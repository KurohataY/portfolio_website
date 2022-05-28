<template>
    <v-main>
        <form method="get" action="/blog/search" id="search_form">
            <div class="cp_iptxt">
                <input class="ef" name="word" type="text" required v-model="word" />
                <v-btn icon="mdi-magnify" color="light-blue" type="submit" rel="noopener noreferrer" size="small">
                </v-btn>

                <span class="focus_line"></span>
            </div>
        </form>
        <div class="suggest_box">
            <UiSuggest :tagsList="suggest_list" v-model="word" v-if="componentShow" style="width: 80%;" />
            <div class="opacity_block"></div>
        </div>
        <v-card max-width="900" class="mx-auto" id="search_result_box">
            <v-row dense>
                <v-col cols="12" v-if="resultShow" v-for="content in data">
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
                <v-col cols="12" v-else>
                    <div>単語を入力してください</div>
                </v-col>
            </v-row>
        </v-card>
    </v-main>
</template>


<script lang="ts" setup>
const route = useRoute()

const props = defineProps({
    tagsList: Object
})


const tagsList = props.tagsList
let suggest_list = ref([])

let word = ref()
word.value = route.query.word

watch(
    () => word.value,
    (word) => {
        suggest_list.value = []
        if (!!word) {
            tagsList.forEach(element => {
                if (element.toLowerCase().includes(word.toLowerCase()) || word.toLowerCase().includes(element.toLowerCase())) {
                    suggest_list.value.push(element);
                }
            })
        }
        reload()
    }
)


const componentShow = ref(true)

let path = ref(`http:yomotsuhirasaka:4000/search`)


let { data } = await useFetch(path.value + `?word=${word.value}`);
let resultShow = ref(true)

const reload = (() => {
    componentShow.value = false
    nextTick(() => {
        componentShow.value = true
    })

})

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
}
</style>