<template lang="">
  <div>
    <Navi />
    <v-container>
      <v-row no-gutters>
        <v-col cols="auto" sm="12" md="8" lg="8" class="">
          <Post :title="title" :blogContent="content.blogContent" />
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" sm="0" md="3">
         <SideMenu :orderContents="orderpublishedAtContents" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Swiper from "~/components/blog/ui/carousel/swiper.vue";
import Navi from "~/components/blog/ui/nav/navbar.vue";
import Post from "~/components/blog/post/post.vue";
import SideMenu from "~/components/blog/ui/sidemenu/side-menu.vue";

import axios from "axios";
import Meta from '~/assets/mixin/headMeta'

export default {
  mixins: [Meta],
  components: {
    Swiper,
    Navi,
    Post,
    SideMenu,
  },
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog/${params.p}`,
      {
        headers: { "X-API-KEY": process.env.MICRO_CMS_API_KEY },
      }
    );
    return {
      title: data.title,
      content: data
    };
  },
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      orderpublishedAtContents: [],
      meta: {
        description:
          "こちら温泉、ラーメンが大好きなIzanagiのブログページです。Nuxt＋JamStackで構成しています。開発中に気になったことなどをメモしていくブログになります。",
        type: "article",
        site_name: "Izanagi's Develop Blog",
      },
    };
  },
  created() {
    this.getOrdersContentData();
  },
  methods: {
    createElementFromHTML(html) {
      const tempEl = document.createElement("div");
      tempEl.innerHTML = html;
      return tempEl;
    },
    async getOrdersContentData(order) {
      try {
        const { data } = await axios.get(
          `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?orders=${order}&limit=5`,
          {
            headers: {
              "X-API-KEY": process.env.MICRO_CMS_API_KEY,
            },
          }
        );
        this.orderpublishedAtContents = data.contents;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.v-application a {
  display: contents;
  text-decoration: none;
  color: black;
}
</style>