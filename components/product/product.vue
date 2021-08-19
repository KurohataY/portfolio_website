<template>
  <v-container class="text-center">
    <div class="text-left display-1 product-title">
      <h1>過去の制作物</h1>
    </div>
    <v-row no-gutter>
      <v-col
        v-for="(content, i) in contents"
        :key="`first-${i}`"
        cols="12"
        sm="6"
      >
        <div v-if="content.url !== ''">
          <a :href="content.url" class="nuxtLink" :target="content.target">
            <v-card class="mx-auto" max-width="344" height="400">
              <v-img :src="content.image" height="250px"></v-img>
              <v-card-title>{{ content.title }}</v-card-title>
              <v-card-subtitle>{{ content.subtitle }}</v-card-subtitle>
            </v-card>
          </a>
        </div>
        <div v-else>
          <v-card class="mx-auto" max-width="344" height="400">
            <v-img :src="content.image" height="250px"></v-img>
            <v-card-title>{{ content.title }}</v-card-title>
            <v-card-subtitle>{{ content.subtitle }}</v-card-subtitle>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: false,
    contents: [
      {
        image: "images/product/japaneseMidleName.webp",
        title: "Japanese Middle Name",
        subtitle:
          "日本古来の名前制度を試すことができます！初めての制作物なので、たまにデザイン直したりしてます。しかし、戒めのために残してます。",
        url: "https://middle-name.herokuapp.com/",
        target: "_blank",
      },
      {
        image: "images/product/developBlog.webp",
        title: "開発ブログ（Nuxt＋JamStack「MicroCMS」）",
        subtitle: "WordPressから当サイトに移行中の開発ブログです。",
        url: "/blog",
        target: "_blank",
      },
      {
        image: "images/product/home.webp",
        title: "ポートフォリオサイト",
        subtitle: "ポートフォリオサイトとなっております。",
        url: "",
        target: "",
      },
      {
        image: "images/product/iOSApp.gif",
        title: "審判代行システム（iOS）",
        subtitle:
          "チーム開発した、審判を代行してくれるアプリのiOSアプリを開発しました。",
        url: "",
        target: "",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.nuxtLink {
  text-decoration: none;
}
.product-title {
  margin-bottom: 30px;
  h1 {
    font-size: 4vw;
    font-family: lust-script, sans-serif;
    font-style: normal;
    font-weight: 700;
    text-shadow: #fff 2px 0, #fff -2px 0, #fff 0 -2px, #fff 0 2px, #fff 2px 2px,
      #fff -2px 2px, #fff 2px -2px, #fff -2px -2px, #fff 1px 2px, #fff -1px 2px,
      #fff 1px -2px, #fff -1px -2px, #fff 2px 1px, #fff -2px 1px, #fff 2px -1px,
      #fff -2px -1px, rgba(0, 0, 0, 0.5) 3px 3px 3px;
  }
}
</style>
