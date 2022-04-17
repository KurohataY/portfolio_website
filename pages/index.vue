<template>
    <div id="top">
        <TheHeader :tagsList="tagsList"  />
        <TheMain :tagsList="tagsList" />
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


