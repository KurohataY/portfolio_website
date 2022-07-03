<template>
    <div id="suggest_list">
        <template v-for="(t, index) in tagsList">
            <div class="search_link_box" v-if="Number(index) < num">
                <a class="search_link" :href="'/blog/search?word=' + t">{{ t }}</a>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    tagsList: Object,
    word: String,
    num: Number,
})

const num = props.tagsList.length < props.num ?  props.tagsList.length :  props.num;


</script>
<style lang="scss" scoped>
#suggest_list {
    z-index: 10000;
    background: #fff;
    width: 85%;
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
