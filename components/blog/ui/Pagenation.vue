<template>
    <div id="pagenation_box">
        <ul id="pagenation_list">
            <li id="pagenation_prev">
                <a :href="prevLink" v-if="prevButtonShow" aria-label="Prev Page">
                    <v-icon large color="green darken-2">mdi-chevron-left</v-icon>
                </a>
            </li>
            <template v-for="(num, index) in pager ">
                <li
                    v-if="index < visibleNum || (index > visibleNum && (num === pageMaxNum))"
                    class="pagenation"
                >
                    <a :href="`${path}${num}`">{{ num }}</a>
                </li>
                <li v-else-if="index === visibleNum && (num !== pageMaxNum)">...</li>
                <li v-else class="pagenation">
                    <a :href="`${path}${num}`">{{ num }}</a>
                </li>
            </template>
            <li id="pagenation_next">
                <a :href="nextLink" v-if="nextButtonShow" aria-label="Next Page">
                    <v-icon large color="green darken-2">mdi-chevron-right</v-icon>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    nowPageNum: Number,
    pageMaxNum: Number,
    visibleNum: Number,
    path: String,
    query: String,
    queryString: String
})


const nowPageNum: number = props.nowPageNum;
const pageMaxNum: number = props.pageMaxNum;
const visibleNum: number = props.visibleNum;

let path: string = props.path;

const prevButtonShow = nowPageNum > 1 ? true : false;
const nextButtonShow = nowPageNum < pageMaxNum ? true : false;

const pageOffset: number = nowPageNum - 2 > 0 ? nowPageNum - 2 : 1

let pager;

if (nowPageNum + 1 <= pageMaxNum || pageMaxNum < visibleNum) {
    pager = [...Array(pageMaxNum)].map((_, i) => i + pageOffset).filter(element => !(element > pageMaxNum));
} else {
    pager = [...Array(pageMaxNum)].map((_, i) => i + pageOffset - 1).filter(element => !(element > pageMaxNum));
}

let prevLink = `${path}${nowPageNum - 1}`;
let nextLink = `${path}${nowPageNum + 1}`;


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