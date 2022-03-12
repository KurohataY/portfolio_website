<template>
    <v-container id="blog_caloucel_box" class="mx-auto">
        <h2 class="text-center text-h2">Latest Article</h2>
        <swiper
            :modules="modules"
            :slides-per-view="views"
            :autoplay="{ disableOnInteraction: false, }"
        >
            <swiper-slide v-for="content in blogData.contents" :key="content.id">
                <nuxt-link :to="`/blog/articles/${content.id}`" custom v-slot="{ href }">
                    <a :href="href">
                        <picture>
                            <source :srcset="`${content.thumbnail.url}?fm=webp&h=${imageWidth}`" />
                            <img :src="`${content.thumbnail.url}?h=${imageWidth}`" />
                        </picture>
                        <p>{{ content.title }}</p>
                    </a>
                </nuxt-link>
            </swiper-slide>
        </swiper>
    </v-container>
</template>

<script>
// import Swiper core and required modules
import { A11y, Autoplay } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

// Import Swiper styles
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        let views = ref(0);
        const { data: blogData } = useFetch("/api/microcms")

        // const onSwiper = (swiper) => {
        //     console.log(swiper);
        // };
        // const onSlideChange = () => {
        //     console.log('slide change');
        // };


        const imageWidth = ref(300);


        const calculateWindowWidth = () => {
            let windowWidth = window.innerWidth
            views.value = Math.floor(windowWidth / imageWidth.value)
        }

        onMounted(() => {
            calculateWindowWidth();
            window.addEventListener('resize', calculateWindowWidth)
        })

        onBeforeUnmount(() => {
            window.addEventListener('resize', calculateWindowWidth)
        })


        return {
            // onSwiper,
            // onSlideChange,
            modules: [A11y, Autoplay],
            blogData,
            views,
            imageWidth,
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
}
</style>