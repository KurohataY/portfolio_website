<template>
    <v-container id="content_link_box" class="mx-auto">
        <h2 class="text-center text-h2">{{ title }}</h2>
        <v-row justify="space-around">
            <v-col v-for="card in cards" :key="card.title" :cols="card.flex" style="max-width: 400px">
                <v-card>
                    <a :href="card.href">
                        <v-img :src="card.src" class="white--text align-end img_wrap menu_link_style"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" :height="card.height"
                            :width="card.width" cover>
                            <v-card-title class="text-white" v-text="card.title"></v-card-title>
                        </v-img>
                    </a>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">

type CardDataType = {
    title: string;
    src: string;
    flex: number;
    height: number;
    width: number;
    href: string;
}

const title: String = "Contents";

const cards: Array<CardDataType> = [
    {
        title: 'Develop blog',
        src: '/images/product/developBlog.webp',
        flex: 4,
        height: 250,
        width: 400,
        href: "/blog/pages/1"
    },
    {
        title: 'Japanese MIddle Name',
        src: '/images/product/japaneseMidleName.webp',
        flex: 4,
        height: 250,
        width: 400,
        href: "/app/middle_name/"
    },
]

</script>

<style lang="scss" scoped>
h2 {
    margin-bottom: 10vw;
    font-family: Great Vibes !important;
}

#content_link_box {
    max-width: 1080px !important;
}
</style>