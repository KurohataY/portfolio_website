<template>
    <div>
        <div class="search_box">
            <form method="get" action="/blog/search">
                <input name="word" type="text" required v-model="word" :placeholder="placeholder" autocomplete="off"
                    title="Search Form">
                <v-btn icon="mdi-magnify" color="light-blue" rel="noopener noreferrer" size="small" type="submit"
                    aria-label="Submit">
                </v-btn>
            </form>
        </div>
        <div class="suggest_box">
            <UiSuggest :tagsList="suggest_list" :num="suggest_num" v-model="word" v-if="componentShow"
                style="width: 85%;" />
            <div class="opacity_block"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "axios"

const props = defineProps({
    placeholder: String,
    suggest_num: Number,
})

const placeholder = props.placeholder;
const suggest_num = props.suggest_num;

const word = ref('');

let suggest_list = ref([])

const componentShow = ref(true)

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
        }).then(function (response) {
            suggest_list.value = [];
            response.data.forEach((element) => { if (!!element) { suggest_list.value.push(element["Word"]) } })
        });

        reload()
    }
)

</script>

<style lang="scss" scoped>
.search_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 5px 0 5px;

    form {
        input {
            width: 85%;
            height: 40px;
            border-style: double !important;

            &:focus {
                outline: 0;
            }
        }

        button {
            top: -3px;
        }
    }
}

.suggest_box {
    display: flex;
    justify-content: center;
    padding: 0 7px;
    position: absolute;
    width: 100%;
}

.opacity_block {
    width: 42px;
}
</style>