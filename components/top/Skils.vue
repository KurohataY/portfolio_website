<template>
    <v-container class="mx-auto" id="skils_box">
        <h2 class="text-center text-h2">Skils</h2>
        <v-row justify="space-around">
            <v-col
                v-for="card in skils"
                :key="card.title"
                :cols="card.flex"
                style="max-width: 128px"
            >
                <v-img
                    :src="card.src"
                    class="white--text align-end"
                    :height="card.height"
                    :width="card.width"
                ></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">

type skilsDataType = {
    title: string,
    src: string,
    flex: number,
    height: number,
    width: number
}

const skils: Array<skilsDataType> = [
    {
        title: 'html5',
        src: '/images/skills/html-5.svg',
        flex: 2,
        height: 128,
        width: 128
    },
    {
        title: 'css3',
        src: '/images/skills/css-3.svg',
        flex: 2,
        height: 128,
        width: 128
    },
    {
        title: 'javascript',
        src: '/images/skills/javascript.svg',
        flex: 2,
        height: 128,
        width: 128
    },
    {
        title: 'go',
        src: '/images/skills/go.svg',
        flex: 2,
        height: 128,
        width: 128
    },
    {
        title: 'vue',
        src: '/images/skills/vue.svg',
        flex: 2,
        height: 128,
        width: 128
    },
    {
        title: 'vuetifyjs',
        src: '/images/skills/vuetifyjs.svg',
        flex: 2,
        height: 128,
        width: 128
    },
    {
        title: 'nuxt',
        src: '/images/skills/nuxt-icon.svg',
        flex: 2,
        height: 128,
        width: 128
    },
]

</script>

<style lang="scss" scoped>
#skils_box {
    margin-top: 20vw;
}
h2 {
    margin-bottom: 20vw;
    font-family: Great Vibes !important;
}
</style>