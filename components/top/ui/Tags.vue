<template>
    <v-card v-scroll.self="onScroll" class="overflow-y-auto pa-4" max-height="440">
        <v-chip-group column active-class="primary--text">
            <template v-for="tag in tags.split(',')">
                <v-chip
                    nuxt
                    :to="'/blog/tags/' + tag + '/1'"
                    :key="tag"
                    v-if="!(tag.length == 0)"
                >{{ tag }}</v-chip>
            </template>
        </v-chip-group>
    </v-card>
</template>

<script lang="ts" setup>
let { data } = await useFetch("/api/microcms", {
    params: {
        limit: 1000,
    },
});

let tags = "";
data.value.contents.forEach((element) => tags += element.tags);
tags = Array.from(new Set(tags.split(","))).join(",");


let scrollInvoked = ref(0);

const onScroll =  (() => {
    scrollInvoked.value++
})

</script>
