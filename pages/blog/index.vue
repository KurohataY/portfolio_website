<template>
  <div>
    <PCNavi
      @categoryValue="emitGetCategoryEvent"
      :categories="categories"
      v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"
    />
    <SPNavi
      @categoryValue="emitGetCategoryEvent"
      :categories="categories"
      :darkButtonShow="true"
      v-else
    />
    <v-parallax height="500" class="mask">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1>Izanagi's Develop Blog</h1>
        </v-col>
      </v-row>
    </v-parallax>
    <div>
      <Swiper :contents="order" />
    </div>
    <v-container>
      <div class="d-flex justify-end mt-3 mb-5">
        <v-switch
          v-model="theme"
          :prepend-icon="themeIcon"
          class="d-flex justify-end mt-3 mb-5"
          v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"
        ></v-switch>
      </div>
      <v-btn-toggle
        background-color="transparent"
        class="d-flex justify-end mt-3 mb-5"
        v-model="toggle"
        v-if="$vuetify.breakpoint.mdAndUp "
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
        :order="sidemenuContents"
        :sideMenu="sideMenu"
        v-if="toggle === 0 && $vuetify.breakpoint.mdAndUp "
      />

      <ContentOrderCardType :contents="contents" v-if="toggle === 1 || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs" />
      <PaginationVuetify
        :paginationNum="paginationNum"
        @pageNum="emitPaginationEvent"
        style="margin-top: 50px"
      />
      <Profile style="margin-top: 50px" v-if="toggle === 1" />
    </v-container>
  </div>
</template>
<script>
import Swiper from "~/components/blog/ui/carousel/swiper.vue";
import PCNavi from "~/components/blog/ui/nav/navbar.vue";
import SPNavi from "~/components/nav/navbar.vue";
import PaginationVuetify from "~/components/blog/ui/pagination/pagination-from-vuetify.vue";
import ContentOrderListType from "~/components/blog/post/order/list/content-order-list-type.vue";
import ContentOrderCardType from "~/components/blog/post/order/card/content-order-card-type.vue";
import Profile from "~/components/blog/ui/profile/profile.vue";

import gMenuList from "~/assets/menu/g-menu.json";

import axios from "axios";

export default {
  components: {
    Swiper,
    PCNavi,
    SPNavi,
    Profile,
    ContentOrderListType,
    ContentOrderCardType,
    PaginationVuetify,
  },
  data() {
    return {
      theme: this.$store.state.theme,
      pageNum: 1,
      toggle: 0,
      beforeToggleNum: 0,
      sideMenu: true,
      categories: gMenuList,
    };
  },
  head() {
    return {
      title: "Izanagi's Develop Blog",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "こちら温泉、ラーメンが大好きなIzanagiのブログページです。Nuxt＋JamStackで構成しています。開発中に気になったことなどをメモしていくブログになります。",
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "article",
        },
        {
          hid: "og:title",
          property: "og:title",
          content:
            "こちら温泉、ラーメンが大好きなIzanagiのブログページです。Nuxt＋JamStackで構成しています。開発中に気になったことなどをメモしていくブログになります。",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: process.env.HOMEPAGE_ROOT_URL + "/blog/",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "こちら温泉、ラーメンが大好きなIzanagiのブログページです。Nuxt＋JamStackで構成しています。開発中に気になったことなどをメモしていくブログになります。",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/favicon.ico",
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: "Izanagi's Develop Blog",
        },
        {
          hid: "twitter:card",
          property: "twitter:card",
          content: "summary",
        },
        {
          hid: "twitter:site",
          property: "twitter:site",
          content: process.env.TWITTER_MY_USER_ID,
        },
      ],
    };
  },
  async asyncData({ query }) {
    const category = query.category;
    const url =
      category !== undefined
        ? `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?filters=categories[contains]${category}`
        : `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog`;

    const res = await Promise.all([
      axios.get(encodeURI(url), {
        headers: { "X-API-KEY": process.env.MICRO_CMS_API_KEY },
      }),
      axios.get(
        `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=100`,
        {
          headers: {
            "X-API-KEY": process.env.MICRO_CMS_API_KEY,
          },
        }
      ),
    ]);

    const mainContents = res[0].data;
    const orderContents = res[1].data;

    return {
      contents: mainContents.contents,
      paginationNums: [...Array((mainContents.totalCount / 10) | 0)].map(
        (_, i) => i
      ),
      paginationNum: (mainContents.totalCount / 10 + 1) | 0,
      category: query.category,
      order: orderContents.contents,
      sidemenuContents: orderContents.contents.splice(0, 5),
    };
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
      const offset = this.pageNum * 10 - 10;
      const url =
        this.category !== undefined
          ? `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?offset=${offset}&filters=categories[contains]${this.category}`
          : `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?offset=${offset}`;
      try {
        const { data } = await axios.get(url, {
          headers: {
            "X-API-KEY": process.env.MICRO_CMS_API_KEY,
          },
        });
        this.paginationNum = (data.totalCount / 10 + 1) | 0;
        this.contents = data.contents;
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    themeIcon() {
      return this.$store.state.theme
        ? "mdi-weather-night"
        : "mdi-weather-sunny";
    },
  },
  watch: {
    theme() {
      this.$store.dispatch("theme", this.theme);
      this.$vuetify.theme.dark = this.theme;
    },
    toggle() {
      this.toggle !== undefined
        ? (this.toggle = this.toggle)
        : (this.toggle = this.beforeToggleNum);
      this.beforeToggleNum = this.toggle;
    },
  },
};
</script>
<style lang="scss">
#app
  div
  main
  div
  div
  div.container
  div.row.no-gutters
  div.col-sm-12.col-md-8.col-lg-8.col-xl-8.col-12
  div
  div
  a {
  display: contents;
  text-decoration: none;
  color: black !important;
}
.container {
  max-width: 90%;
}
.v-parallax__image {
  display: none;
}

.mask {
  background-image: linear-gradient(
    180deg,
    rgba(129, 212, 250, 1) 0%,
    rgba(178, 255, 89, 1) 100%
  );
  opacity: 0.4;
  div {
    div {
      h1 {
        font-family: lust-script, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 7vw;
        color: black;
      }
    }
  }
}
</style>