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
      <Swiper :contents="swiperContents" />
    </div>
    <v-container>
      <Marquee
        :propsTextList="topContents"
        :time="marqueeTime"
        :title="marqueeTitle"
      />
      <div class="d-flex mt-3 mb-5">
        <v-btn-toggle
          background-color="transparent"
          class="d-flex mt-3 mb-5"
          v-model="toggle"
          v-if="$vuetify.breakpoint.mdAndUp"
          style="flex: auto"
        >
          <v-btn>
            <v-icon>mdi-format-list-text</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-card-text</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-switch
          v-model="theme"
          :prepend-icon="themeIcon"
          class="d-flex justify-end mt-3 mb-5"
          v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"
        ></v-switch>
      </div>

      <ContentOrderListType
        :contents="contents"
        :sideMenuContents="topContents"
        :sideMenu="sideMenu"
        :tags="tags"
        v-if="toggle === 0 && $vuetify.breakpoint.mdAndUp"
      />

      <ContentOrderCardType
        :contents="contents"
        v-if="toggle === 1 || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
      />
      <Pagination :pager="pager" :current="Number(page)" :category="category" />
      <Profile style="margin-top: 50px" v-if="toggle === 1" />
    </v-container>
  </div>
</template>
<script>
import Swiper from "~/components/blog/ui/carousel/swiper.vue";
import PCNavi from "~/components/blog/ui/nav/navbar.vue";
import SPNavi from "~/components/nav/navbar.vue";
import PaginationVuetify from "~/components/blog/ui/pagination/pagination-from-vuetify.vue";
import Pagination from "~/components/blog/ui/pagination/pagination.vue";
import ContentOrderListType from "~/components/blog/post/order/list/content-order-list-type.vue";
import ContentOrderCardType from "~/components/blog/post/order/card/content-order-card-type.vue";
import Profile from "~/components/blog/ui/profile/profile.vue";
import Marquee from "~/components/blog/ui/marquee.vue";

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
    Pagination,
    Marquee,
  },
  data() {
    return {
      theme: this.$store.state.theme,
      toggle: 0,
      beforeToggleNum: 0,
      sideMenu: true,
      categories: gMenuList,
      tocCount: 0,
      tocList: [],
      marqueeTime: 10000,
      marqueeTitle: "最新記事",
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
          content: this.$config.HOMEPAGE_ROOT_URL + "/blog/",
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
          content: this.$config.TWITTER_MY_USER_ID,
        },
      ],
    };
  },
  async asyncData({ params, $config }) {
    const page = params.p || "1";
    const limit = 10;
    let category = params.categoryId;
    let categoryName = "";

    if (category == "it") {
      categoryName = "IT";
    } else if (category == "daily") {
      categoryName = "日記";
    } else if (category == "programming") {
      categoryName = "プログラミング";
    } else {
      category = undefined;
    }

    let tag = params.tagId;

    const res = await Promise.all([
      axios.get(
        `https://${$config.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=1000`,
        {
          headers: {
            "X-API-KEY": $config.MICRO_CMS_API_KEY,
          },
        }
      ),
      axios.get(
        encodeURI(
          `https://${
            $config.MICRO_CMS_SERVICE_DOMAIN
          }.microcms.io/api/v1/blog?limit=${limit}&filters=categories[contains]${categoryName}&offset=${
            (page - 1) * limit
          }`
        ),
        {
          headers: { "X-API-KEY": $config.MICRO_CMS_API_KEY },
        }
      ),
      axios.get(
        encodeURI(
          `https://${
            $config.MICRO_CMS_SERVICE_DOMAIN
          }.microcms.io/api/v1/blog?limit=${limit}&filters=tags[contains]${tag}&offset=${
            (page - 1) * limit
          }`
        ),
        {
          headers: { "X-API-KEY": $config.MICRO_CMS_API_KEY },
        }
      ),
      axios.get(
        `https://${$config.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?limit=${limit}&offset=${
            (page - 1) * limit
          }`,
        {
          headers: {
            "X-API-KEY": $config.MICRO_CMS_API_KEY,
          },
        }
      ),
    ]);

    let contents = "";
    let paginationNum = 0;

    const swiperContents = res[0].data.contents;

    let tags = "";
    res[0].data.contents.forEach((element) => tags += element.tags);
    tags = Array.from(new Set(tags.split(","))).join(",");

    if (category == undefined && tag == undefined) {
      contents = res[3].data.contents;
      paginationNum = (res[3].data.totalCount / 10 + 1) | 0;
    } else if (category !== undefined && tag == undefined) {
      contents = res[1].data.contents;
      paginationNum = (res[1].data.totalCount / 10 + 1) | 0;
    } else if (tag !== undefined && category == undefined) {
      contents = res[2].data.contents;
      paginationNum = (res[2].data.totalCount / 10 + 1) | 0;
    } else {
      contents = res[3].data.contents;
      paginationNum = (res[3].data.totalCount / 10 + 1) | 0;
    }

    const topContents = res[0].data.contents.splice(0, 5);

    return {
      contents,
      swiperContents,
      tags,
      paginationNum,
      page,
      topContents,
      category,
      pager: [...Array(Math.ceil(res[1].data.totalCount / limit)).keys()],
    };
  },
  methods: {
    emitPaginationEvent(pageNum) {
      this.page = pageNum;
    },
    emitGetCategoryEvent(categoryValue) {
      this.category = categoryValue;
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