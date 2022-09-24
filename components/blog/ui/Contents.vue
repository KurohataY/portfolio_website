<template>
    <div class="mx-auto" id="blog_box">
        <div class="d-flex flex-wrap justify-space-around" style="background-color: #EDF2F6;">
            <a v-for="content in data.contents" :href="`/blog/articles/${content.id}`">
                <v-card style="margin: 20px 5px" width="350px">
                    <v-img :src="content.thumbnail.url + '?fm=webp&h=200'" class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
                        <div class="text-white text-h6" v-text="content.title" style="padding: 0 10px;"></div>
                    </v-img>
                </v-card>
            </a>
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
</style>