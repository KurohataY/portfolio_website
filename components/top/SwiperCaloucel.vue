<template>
    <v-container id="blog_caloucel_box" class="mx-auto">
        <h2 class="text-center text-h2">{{ swiper.title }}</h2>
        <swiper :modules="modules" :slides-per-view="swiper.views"
            :autoplay="{ disableOnInteraction: swiper.autoPlay, }">
            <swiper-slide v-for="content in data['contents']" :key="content.id">
                <a :href="`/blog/articles/${content.id}`">
                    <picture>
                        <source :srcset="`${content.thumbnail.url}?fm=webp&h=${swiper.imageWidth}`" />
                        <img :src="`${content.thumbnail.url}?h=${swiper.imageWidth}`" />
                    </picture>
                    <p>{{ content.title }}</p>
                </a>
            </swiper-slide>
        </swiper>
    </v-container>
</template>

<script>
import { A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { hash } from 'ohash'

// Import Swiper styles
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        let swiper = ref({
            title: "Latest Article",
            views: 0,
            imageWidth: 300,
            autoPlay: false
        })
        const { data } = useFetch("/api/microcms", {
            initialCache: false,
            key: hash(['api-fetch', "/api/microcms", "Swiper"])
        })

        const calculateWindowWidth = () => {
            let windowWidth = window.innerWidth < 1080 ? window.innerWidth : 1080;
            swiper.value.views = Math.floor(windowWidth / swiper.value.imageWidth);
        }

        onMounted(() => {
            calculateWindowWidth();
            window.addEventListener('resize', calculateWindowWidth);
        })

        onBeforeUnmount(() => {
            window.addEventListener('resize', calculateWindowWidth);
        })

        return {
            modules: [A11y, Autoplay],
            data,
            swiper,
        };
    },
};
</script>

<style lang="scss" scoped>
img {
    width: 100%;
    height: 200px;
    position: relative;
}

p {
    position: absolute;
    color: white;
    top: 75%;
    width: 100%;
    margin: 0;
    padding: 0;
    height: 22%;
    background-color: rgba(129, 212, 250, 0.5);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media screen and (max-width: 600px) {
    p {
        top: 85%;
        -webkit-line-clamp: 1;
    }
}

h2 {
    margin-bottom: 10vw;
    font-family: Great Vibes !important;
}

#blog_caloucel_box {
    // max-width: 80%;
    // margin: 0 auto;
    padding: 0 10px;
    margin-bottom: 100px;
    margin-top: 20vw;
    max-width: 1080px !important;
}
</style>