<template>
    <div id="tag">
        <TheHeader :tagsList="tagsList" />
        <BlogMain />
        <TheFooter />
    </div>
</template>

<script lang="ts" setup>
let { data } = await useFetch("/api/microcms", {
    params: {
        limit: 1000,
    },
});

let tags = "";
data.value["contents"].forEach((element) => tags += element.tags)
const tagsList = Array.from(new Set(tags.split(","))).join(",").split(",");
</script>

<style lang="scss" scoped>
</style>
