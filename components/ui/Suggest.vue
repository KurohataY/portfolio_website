<template>
    <div id="suggest_list" :style="suggestWidth">
        <template v-for="(t, index) in tagList">
            <div class="search_link_box" v-if="Number(index) < num">
                <a class="search_link" :href="'/blog/search?word=' + t">{{ t }}</a>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    tagList: {
        type: Object,
        default: [],
        required: false,
    },
    num: {
        type: Number,
        default: 5,
        required: false,
    },
    suggestWidth: {
        type: String,
        required: false,
    }
})

const tagList = props.tagList

const num = tagList.length < props.num ? tagList.length : props.num;

const suggestWidth = computed(() => {
    return {
        "--sugest-width": props.suggestWidth
    }

})

</script>
<style lang="scss" scoped>
#suggest_list {
    z-index: 10000;
    background: #fff;
    width: var(--sugest-width);
    font-size: 0.6em;

    div.search_link_box {
        padding: 15px 10px;

        a.search_link {
            // border: 0.1px solid;
            display: block;
            text-decoration: none;
            color: #424242;
        }

        &:hover {
            background: #E0E0E0;
        }
    }
}
</style>
