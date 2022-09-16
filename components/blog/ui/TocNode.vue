<template>
    <ul>
        <template v-for="toc in tocList">
            <li><a :href="'#' + toc.id">{{toc.name}}</a></li>
            <BlogUiTocNode v-if="toc.children && toc.children.length" :tocList="toc.children" />
        </template>
    </ul>

</template>

<script setup>

const props = defineProps({
    tocList: Object
});

const tocList = props.tocList;


</script>


<style lang="scss" scoped>
ul {
    margin-left: 10px;

    li {
        margin: 10px 0;
    }
}

a {
    color: black;
}

</style>