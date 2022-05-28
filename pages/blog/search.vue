<template>
    <div id="contact_page">
        <TheHeader />
        <!-- <BlogSearchMain :tagsList="tagsList" /> -->
         <BlogSearchOriginal :tagsList="tagsList" />
        <TheFooter />
    </div>
</template>

<script lang="ts" setup>
useHead({
    meta: [
        { name: 'robots', content: 'noindex,nofollow' }
    ],
})
let { data } = await useFetch("/api/microcms", {
    params: {
        limit: 1000,
    },
});

let tags = "";
data.value["contents"].forEach((element) => tags += element.tags)
const tagsList = Array.from(new Set(tags.split(","))).join(",").split(",");
</script>