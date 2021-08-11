<template lang="">
    <div>
    <Navi />

    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="8" class="grey lighten-5">
          <Content :title="title" :blogContent="blogContent" />
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
import Content from "~/components/blog/ui/contents/content.vue";
import SideMenu from "~/components/blog/ui/sidemenu/side-menu.vue";

import axios from "axios";

export default {
  components: {
    Swiper,
    Navi,
    Content,
    SideMenu,
  },
  async asyncData({ $microcms, params }) {
    const { data } = await axios.get(
      `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog/${params.p}`,
      {
        headers: { "X-API-KEY": process.env.MICRO_CMS_API_KEY },
      }
    );
    return data;
  },
  data() {
    return {
      orderpublishedAtContents: [],
    }
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
        console.log(data.contents);
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
.container {
  max-width: 90%;
}
</style>