<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="content in contents" :key="content.id">
        <!-- <v-img v-if="'thumbnail' in content" :src="content.thumbnail.url" width="250px" height="200px"></v-img> -->
        <v-card v-if="'thumbnail' in content">
          <v-img
            :src="content.thumbnail.url"
            width="300px"
            height="250px"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title>{{ content.title }}</v-card-title>
          </v-img>
        </v-card>
      </swiper-slide>
      <div slot="button-prev" class="swiper-button-prev" />
      <div slot="button-next" class="swiper-button-next" />
    </swiper>
  </div>
</template>

<script>
export default {
  props: ["contents"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        speed: 1000, //スライドの切り替わりスピード
        // spaceBetween: 30, //各スライドの余白
        centeredSlides: true, //スライダーを真ん中に
        loop: true, //無限ループ
        spaceBetween: 5,
        autoplay: {
          //スライドの自動切り替え
          delay: 2500, //スライドの自動切り替えの秒数
          disableOnInteraction: false, //何らかのアクション後の自動切り替えを再開
        },
        navigation: {
          //ナビゲーション設定
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>