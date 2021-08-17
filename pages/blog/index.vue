<template>
  <div>
    <Navi @categoryValue="emitGetCategoryEvent" />
    <div>
      <Swiper :contents="order" />
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
        :order="order"
        v-if="toggleNone === 0"
      />
      
      <ContentOrderCardType :contents="contents" v-if="toggleNone === 1" />
    </v-container>
    <PaginationVuetify
      :paginationNum="paginationNum"
      @pageNum="emitPaginationEvent"
    />
  </div>
</template>
<script>
import Swiper from "~/components/blog/ui/carousel/swiper.vue";
import Navi from "~/components/blog/ui/nav/navbar.vue";
import PaginationVuetify from "~/components/blog/ui/pagination/pagination-from-vuetify.vue";
import ContentOrderListType from "~/components/blog/post/order/list/content-order-list-type.vue";
import ContentOrderCardType from "~/components/blog/post/order/card/content-order-card-type.vue";

import axios from "axios";

export default {
  components: {
    Swiper,
    Navi,
    ContentOrderListType,
    ContentOrderCardType,
    PaginationVuetify,
  },
  data() {
    return {
      pageNum: 1,
      toggleNone: 0,
      order: [],
    };
  },
  head() {
    return {
      title: "Izanagi's Develop Blog",
      meta: [{
          hid: 'description',
          name: 'description',
          content: "こちら温泉、ラーメンが大好きなIzanagiのブログページです。Nuxt＋JamStackで構成しています。開発中に気になったことなどをメモしていくブログになります。"
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content:  "article",
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: "こちら温泉、ラーメンが大好きなIzanagiのブログページです。Nuxt＋JamStackで構成しています。開発中に気になったことなどをメモしていくブログになります。"
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.HOMEPAGE_ROOT_URL + '/blog/'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: "こちら温泉、ラーメンが大好きなIzanagiのブログページです。Nuxt＋JamStackで構成しています。開発中に気になったことなどをメモしていくブログになります。"
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: "/favicon.ico"
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: "Izanagi's Develop Blog"
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: "summary"
        },
        {
          hid: 'twitter:site',
          property: 'twitter:site',
          content: process.env.TWITTER_MY_USER_ID
        },
      ],
    }
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
        this.order = data.contents;
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