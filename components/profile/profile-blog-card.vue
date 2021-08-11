<template>
  <v-carousel
    id="profile"
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hove
  >
    <v-carousel-item v-for="(site, i) in sites" :key="`first-${i}`">
      <a class="nuxtLink" :href="site.url" target="_blank">
        <v-card class="mx-auto" max-width="400" height="400">
          <v-img
            :aspect-ratio="1 / 1"
            :src="site.image"
            height="300px"
            class="cyan accent-2"
          ></v-img>
          <v-card-title>
            {{ site.title }}
          </v-card-title>
        </v-card>
      </a>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data: () => ({
    sites: [
      {
        url: "https://github.com",
        image: "images/profile/Octocat.webp",
        title: "GitHub",
      },
      {
        url: "https://izanagiblog.com",
        image: "images/profile/developBlogImg.webp",
        title: "開発ブログ",
      },
      {
        url: "https://izanagi-craft.com",
        image: "images/profile/gameBlogImg.webp",
        title: "趣味ブログ",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
#profile {
  margin-bottom: 20px;
}
</style>
