<template>
    <div>
        <Navi />
        <div>
            <Swiper :contents="contents" />
        </div>

        <div v-for="content in contents" :key="content.id">
            <div v-if="'thumbnail' in content">
                {{content.thumbnail.url}}
            </div>
        </div>
        <!-- {{thumbnail.url}} -->
        <!-- ${{thumbnail_path}} -->
    </div>
</template>
<script>
import Swiper from '~/components/blog/carousel/swiper.vue'
import Navi from '~/components/blog/nav/navbar.vue'
export default {
    components:{
        Swiper,
        Navi,
    },
    async asyncData({ $microcms }) {
        const page =  '1'
        const limit = 1
        const data = await $microcms.get({
            endpoint: `blog`,
            // queries: {limit: 1},
            // contentId: 'sv_2wekudj',
        });
        return data;
    },
    data() {
        // sliderObjects: thumbnail_path;
    }
    
}
</script>
<style lang="">
    
</style>