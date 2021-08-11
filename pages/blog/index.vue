<template>
  <div>
    <Navi />
    <div>
      <Swiper :contents="orderpublishedAtContents" />
    </div>
    <v-container>
      <v-btn-toggle class="d-flex justify-end mt-3 mb-5" v-model="toggleNone">
        <v-btn>
          <v-icon>mdi-format-list-text</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-card-text</v-icon>
        </v-btn>
      </v-btn-toggle>
      <ContentOrderListType :contents="contents" :orderpublishedAtContents="orderpublishedAtContents" v-if="toggleNone === 0" />
      <ContentOrderCardType :contents="contents" v-if="toggleNone === 1" />
    </v-container>
    <Pagination :paginationNums="paginationNums" @pageNum="emitEvent" />
    <ContactModal />
  </div>
</template>
<script>
import Swiper from "~/components/blog/ui/carousel/swiper.vue";
import Navi from "~/components/blog/ui/nav/navbar.vue";
import Pagination from "~/components/blog/ui/pagination/pagination.vue";
import ContentOrderListType from "~/components/blog/post/order/list/content-order-list-type.vue";
import ContentOrderCardType from "~/components/blog/post/order/card/content-order-card-type.vue";
import ContactModal from '~/components/contact/contact-modal.vue'

import axios from "axios";

export default {
  components: {
    Swiper,
    Navi,
    Pagination,
    ContentOrderListType,
    ContentOrderCardType,
    ContactModal,
  },
  data() {
    return {
      pageNum: 1,
      toggleNone: 0,
      orderpublishedAtContents: [],
    };
  },
  async asyncData() {
    const { data } = await axios.get(
      `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog`,
      {
        headers: { "X-API-KEY": process.env.MICRO_CMS_API_KEY },
      }
    );
    return {
      contents: data.contents,
      paginationNums: [...Array((data.totalCount / 10) | 0)].map((_, i) => i),
    };
  },
  mounted() {
    this.getOrdersContentData("publishedAt");
    console.log(this.orderpublishedAtContents);
  },
  methods: {
    emitEvent(pageNum) {
      this.pageNum = pageNum;
      this.getContentData();
    },
    async getContentData() {
      const offset = this.pageNum * 10 - 9;
      try {
        const { data } = await axios.get(
          `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?offset=${offset}`,
          {
            headers: {
              "X-API-KEY": process.env.MICRO_CMS_API_KEY,
            },
          }
        );
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
  color: black;
}
.container {
  max-width: 90%;
}
</style>