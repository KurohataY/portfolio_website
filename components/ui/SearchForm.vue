<template>
    <div>
        <div class="search_box">
            <form method="get" action="/blog/search">
                <input name="word" type="text" required v-model="word" :placeholder="placeholder" autocomplete="off">
                <v-btn icon="mdi-magnify" color="light-blue" rel="noopener noreferrer" size="small" type="submit">
                </v-btn>
            </form>
        </div>
        <div class="suggest_box">
            <UiSuggest :tagsList="suggest_list" v-model="word" v-if="componentShow" @submit="submit" style="width: 85%;"/>
            <div class="opacity_block"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    placeholder: String,
    tagsList: Object
})

const placeholder = props.placeholder;

const word = ref('');

let tagsList = props.tagsList;
let suggest_list = ref([])

const componentShow = ref(true)

const reload = (() => {
    componentShow.value = false
    nextTick(() => {
        componentShow.value = true
    })

})

const submit = (word) => {
    event.preventDefault();
}

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