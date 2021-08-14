<template>
  <div>
    <Navi @categoryValue="emitGetCategoryEvent" />
    <div>
      <Swiper :contents="orderpublishedAtContents" />
    </div>
    <v-container>
      <v-btn-toggle
        mandatory
        class="d-flex justify-end mt-3 mb-5"
        v-model="toggleNone"
      >
        <v-btn>
          <v-icon>mdi-format-list-text</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-card-text</v-icon>
        </v-btn>
      </v-btn-toggle>
      <ContentOrderListType
        :contents="contents"
        :orderpublishedAtContents="orderpublishedAtContents"
        v-if="toggleNone === 0"
      />
      <ContentOrderCardType :contents="contents" v-if="toggleNone === 1" />
    </v-container>
    <!-- <Pagination :paginationNums="paginationNums" @pageNum="emitPaginationEvent" /> -->
    <PaginationVuetify
      :paginationNum="paginationNum"
      @pageNum="emitPaginationEvent"
    />
  </div>
</template>
<script>
import Meta from "~/assets/mixin/headMeta";

import Swiper from "~/components/blog/ui/carousel/swiper.vue";
import Navi from "~/components/blog/ui/nav/navbar.vue";
import Pagination from "~/components/blog/ui/pagination/pagination.vue";
import PaginationVuetify from "~/components/blog/ui/pagination/pagination-from-vuetify.vue";
import ContentOrderListType from "~/components/blog/post/order/list/content-order-list-type.vue";
import ContentOrderCardType from "~/components/blog/post/order/card/content-order-card-type.vue";

import axios from "axios";

export default {
  mixins: [Meta],
  components: {
    Swiper,
    Navi,
    Pagination,
    ContentOrderListType,
    ContentOrderCardType,
    PaginationVuetify,
  },
  data() {
    return {
      pageNum: 1,
      toggleNone: 0,
      orderpublishedAtContents: [],
      meta: {
        title: "Izanagi's Develop Blog",
        description:
          "こちら温泉、ラーメンが大好きなIzanagiのブログページです。Nuxt＋JamStackで構成しています。開発中に気になったことなどをメモしていくブログになります。",
        type: "website",
        site_name: "Izanagi' Home Page",
      },
    };
  },
  async asyncData({ query }) {
    const category = query.category;
    const url = category !== undefined ? `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?filters=categories[contains]${category}` : `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog`;
    const { data } = await axios.get(
      encodeURI(
        url
      ),
      {
        headers: { "X-API-KEY": process.env.MICRO_CMS_API_KEY },
      }
    );
    return {
      contents: data.contents,
      paginationNums: [...Array((data.totalCount / 10) | 0)].map((_, i) => i),
      paginationNum: (data.totalCount / 10) + 1 | 0,
      category: query.category,
    };
  },
  mounted() {
    this.getOrdersContentData("publishedAt");
  },
  methods: {
    emitPaginationEvent(pageNum) {
      this.pageNum = pageNum;
      this.getContentData();
    },
    emitGetCategoryEvent(categoryValue) {
      this.category = categoryValue;
      this.getContentData();
    },
    async getContentData() {
      const offset = this.pageNum * 10 - 9;
      const url = this.category !== undefined ? `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?offset=${offset}&filters=categories[contains]${this.category}` : `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?offset=${offset}`;
      try {
        const { data } = await axios.get(
          url,
          {
            headers: {
              "X-API-KEY": process.env.MICRO_CMS_API_KEY,
            },
          }
        );
        this.paginationNum = (data.totalCount / 10) + 1 | 0;
        this.contents = data.contents;
      } catch (err) {
        console.log(err);
      }
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
<style lang="scss">
.v-application a {
  display: contents;
  text-decoration: none;
  color: black !important;
}
.container {
  max-width: 90%;
}
</style>