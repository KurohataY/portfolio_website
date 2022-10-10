<template>
    <ul>
        <template v-if="tl" v-for="toc in tl">
            <li><a :href="'#' + toc.id">{{toc.name}}</a></li>
            <BlogUiTocNode v-if="toc.children" :tocList="toc.children" />
        </template>
    </ul>

</template>

<script setup>

const props = defineProps({
    tocList: Object
});

const tl = props.tocList;

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