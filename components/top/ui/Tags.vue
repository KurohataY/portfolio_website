<template>
    <v-card v-scroll.self="onScroll" class="overflow-y-auto pa-4" max-height="450">
        <v-chip-group column active-class="primary--text">
            <template v-for="tag in props.tagsList">
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

const props = defineProps({
    tagsList: Object
})


let scrollInvoked = ref(0);

const onScroll =  (() => {
    scrollInvoked.value++
})

</script>
