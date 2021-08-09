<template lang="">
    <div>
    <Navi />
    <div>
      <!-- <Swiper :contents="contents" /> -->
    </div>

    <v-container fluid="true">
      <v-row no-gutters>
        <v-col cols="8" sm="12" md="8" class="grey lighten-5">
          <Content :title="title" :blogContent="blogContent" />
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3" sm="0" md="3">
          <v-card class="pa-2" outlined tile> サイドメニュー </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Swiper from "~/components/blog/ui/carousel/swiper.vue";
import Navi from "~/components/blog/ui/nav/navbar.vue";
import Content from "~/components/blog/ui/contents/content.vue";
export default {
  components: {
    Swiper,
    Navi,
    Content,
  },
  async asyncData({ $microcms, params }) {
    const page = "1";
    const limit = 10;
    const range = (start, end) =>
      [...Array(end - start + 1)].map((_, i) => start + i);
    const data = await $microcms.get({
      endpoint: `blog`,
      // queries: {limit: 1},
      contentId: params.p,
    });
    return data;
  },
  data() {},
  methods: {
    createElementFromHTML(html) {
      const tempEl = document.createElement("div");
      tempEl.innerHTML = html;
      return tempEl;
    },
  },
};
</script>
<style lang="scss">
.v-application a {
  display: contents;
  text-decoration: none;
  color: black;
}
.container {
  max-width: 90%;
}
</style>