<template>
    <div id="pagenation_box">
        <ul id="pagenation_list">
            <li id="pagenation_prev">
                <NuxtLink :to="`/blog/pages/${nowPageNum - 1}`" v-if="prevButtonShow">
                    <v-icon large color="green darken-2">mdi-chevron-left</v-icon>
                </NuxtLink>
            </li>
            <li v-for="num in pageMaxNum " class="pagenation">
                <NuxtLink :to="`/blog/pages/${num}`">{{ num }}</NuxtLink>
            </li>
            <li id="pagenation_next">
                <NuxtLink :to="`/blog/pages/${nowPageNum + 1}`" v-if="nextButtonShow">
                    <v-icon large color="green darken-2">mdi-chevron-right</v-icon>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    nowPageNum: Number,
    pageMaxNum: Number
})

const nowPageNum: number = props.nowPageNum;
const pageMaxNum: number = props.pageMaxNum

const prevButtonShow = nowPageNum > 1 ? true : false;
const nextButtonShow = nowPageNum <= pageMaxNum ? true : false;

</script>

<style lang="scss" scoped>
#pagenation_box {
    text-align: center;
    margin: 50px;
    ul#pagenation_list {
        li {
            display: inline-block;
        }
        li.pagenation {
            border-radius: 30%;
            box-shadow: 0 0 2px grey;
            height: 30px;
            line-height: 30px;
            margin: 0 15px;
            text-align: center;
            width: 30px;
            a.router-link-active {
                font-weight: bold;
            }
        }
        @media screen and (max-width: 640px) {
            li.pagenation {
                margin: 5px !important;
            }
        }
    }
}
</style>