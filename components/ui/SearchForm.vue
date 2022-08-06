<template>
    <div class="search_box">
        <form method="get" action="/blog/search">
            <input name="word" type="text" required :value="word" @input="bindInput" :placeholder="placeholder"
                autocomplete="off" title="Search Form" :style="inputWidth">
            <v-btn icon="mdi-magnify" color="light-blue" rel="noopener noreferrer" size="small" type="submit"
                style="width: 32px !important; height: 32px !important" aria-label="Submit">
            </v-btn>
            <div class="suggest_box">
                <UiSuggest :tag-list="suggest_list" :num="suggestNum" v-model="word" v-if="componentShow"
                    :suggest-width="suggestWidth" />
                <div class="opacity_block"></div>
            </div>
        </form>

    </div>
</template>

<script lang="ts" setup>
import axios from "axios"

const props = defineProps({
    placeholder: {
        type: String,
        default: "",
        required: false,
    },
    suggestNum: {
        type: Number,
        default: 5,
        required: false,
    },
    word: {
        type: String,
        default: "",
        required: false,
    },
    inputWidth: {
        type: String,
        required: true,
    }
})

const suggestWidth: String = props.inputWidth;

const inputWidth = computed(() => {
    return {
        "--input-width": props.inputWidth
    }

})

const placeholder = props.placeholder;
const suggestNum = props.suggestNum;

const componentShow = ref(true)

const reload = (() => {
    componentShow.value = false
    nextTick(() => {
        componentShow.value = true
    })

})

const word = ref(props.word);
let suggest_list = ref([]);

// 日本語入力対応用
const bindInput = (w => {
    word.value = w.target.value;
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
        display: inline-flex;
        justify-content: center;

        input {
            height: 40px;
            width: var(--input-width);
            border-bottom: double !important;

            &:focus {
                outline: 0;
            }
        }

        button {
            top: 5px;
        }
    }
}

.suggest_box {
    display: flex;
    justify-content: center;
    padding: 0 7px;
    position: absolute;
    width: 100%;
    margin-top: 40px
}

.opacity_block {
    width: 32px;
}
</style>