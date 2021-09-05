<template>
  <client-only>
    <swiper :options="swiperOption">
      <template v-for="content in contents">
        <swiper-slide :key="content.id" v-if="'thumbnail' in content">
          <!-- <v-img v-if="'thumbnail' in content" :src="content.thumbnail.url" width="250px" height="200px"></v-img> -->

          <nuxt-link :to="'/blog/' + content.id">
            <picture>
              <source :srcset="content.thumbnail.url + '?fm=webp'" />
              <img :src="content.thumbnail.url" />
            </picture>
            <p>{{ content.title }}</p>
          </nuxt-link>
        </swiper-slide>
      </template>

      <div slot="button-prev" class="swiper-button-prev" />
      <div slot="button-next" class="swiper-button-next" />
    </swiper>
  </client-only>
</template>

<script>
export default {
  props: ["contents"],
  data() {
    return {
      swiperOption: {
        breakpoints: {
          960: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          600: {
            slidesPerView: 3,
          },
          300: {
            slidesPerView: 1,
          },
        },
        speed: 1500, //スライドの切り替わりスピード
        // spaceBetween: 30, //各スライドの余白
        centeredSlides: true, //スライダーを真ん中に
        loop: true, //無限ループ

        autoplay: {
          //スライドの自動切り替え
          delay: 1000, //スライドの自動切り替えの秒数
          disableOnInteraction: false, //何らかのアクション後の自動切り替えを再開
        },
        navigation: {
          //ナビゲーション設定
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        lazy: true,
        preloadImages: false,
        // on: {
        //   slideChange: function () {
        //     if (this.activeIndex === 0) {
        //       this.lazy.loadInSlide(this.slides.length - 4);
        //     }
        //   },
        // },
        initialSlide: 5,
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
        },
        updateOnImagesReady: true,
      },
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