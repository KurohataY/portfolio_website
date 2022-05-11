<template>
    <div class="mx-auto" id="blog_box">
        <div class="d-flex flex-wrap justify-space-around" style="background-color: #EDF2F6;">
            <!-- <NuxtLink
                v-for="content in data.contents"
                :key="content.title"
                :to="`/blog/articles/${content.id}`"
                custom
                v-slot="{ href }"
            > -->
                <a v-for="content in data.contents" :href="`/blog/articles/${content.id}`">
                    <v-card style="margin: 20px 5px" width="350px">
                        <v-img
                            :src="content.thumbnail.url + '?fm=webp&h=200'"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            cover
                        >
                            <v-card-title class="text-white" v-text="content.title"></v-card-title>
                        </v-img>
                    </v-card>
                </a>
            <!-- </NuxtLink> -->
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    data: Object
})

const data: Object = props.data


</script>

<style lang="scss" scoped>
#blog_box {
}
</style>