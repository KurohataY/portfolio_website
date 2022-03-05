<template>
    <swiper
        :modules="modules"
        :slides-per-view="views"
        :autoplay="{disableOnInteraction: false,}"
    >
        <swiper-slide v-for="content in blogData" :key="content.id">
            <nuxt-link :to="`${path}/articles/${content.id}`">
                <picture>
                    <source :srcset="content.thumbnail.url + '?fm=webp&h=200'" />
                    <img :src="content.thumbnail.url + '?h=200'" />
                </picture>
                <p>{{ content.title }}</p>
            </nuxt-link>
        </swiper-slide>
    </swiper>
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

        const route = useRoute()
        const path = route.path;


        const calculateWindowWidth = () => {
            let windowWidth = window.innerWidth
            if (windowWidth < 640) {
                views.value = 1
            } else if (windowWidth < 1130) {
                views.value = 3
            } else {
                views.value = 4
            }
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
            path,
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

// class="white--text align-end"
</style>