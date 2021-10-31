<template>
  <div>
    <PCNavi
      v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"
      :categories="categories"
    />
    <SPNavi v-else :categories="categories" :darkButtonShow="true" />
    <div style="margin-top: 100px">
      <v-row justify="center" no-gutters>
        <v-col cols="12" sm="12" md="8" lg="8">
          <Post
            :title="title"
            :blogContent="content.blogContent"
            :tags="content.tags"
          />
        </v-col>
        <v-col cols="2" md="2" lg="2" v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg">
          <v-switch
            v-model="theme"
            :prepend-icon="themeIcon"
            class="d-flex justify-end mt-3 mb-5"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="11">
          <ReleteDocList />
        </v-col>
      </v-row>
      
      <v-btn text :ripple="false" class="back-wrapper" @click.native="backTo">
        <i class="material-icons">arrow_back</i>
      </v-btn>
    </div>
  </div>
</template>
<script>
import Swiper from "~/components/blog/ui/carousel/swiper.vue";
import SPNavi from "~/components/nav/navbar.vue";
import PCNavi from "~/components/blog/ui/nav/navbar.vue";
import Post from "~/components/blog/post/post.vue";
import SideMenu from "~/components/blog/ui/sidemenu/side-menu.vue";
import ReleteDocList from "~/components/blog/post/relete-doc-list.vue";

import axios from "axios";
import cheerio from "cheerio";

export default {
  components: {
    Swiper,
    SPNavi,
    PCNavi,
    Post,
    SideMenu,
    ReleteDocList,
  },
  async asyncData({ params, $config }) {
    const { data } = await axios.get(
      `https://${$config.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog/${params.p}`,
      {
        headers: { "X-API-KEY": $config.MICRO_CMS_API_KEY },
      }
    );

    var description = "";
    var thumbnailUrl = "";
    const $ = cheerio.load;
    if ("description" in data) {
      description = data.description;
    } else if (
      typeof data.blogContent !== "undefined" &&
      data.blogContent !== null &&
      typeof data.blogContent[0] !== "undefined" &&
      !("content" in data.blogContent)
    ) {
      description =
        $(data.blogContent[0].content).text().substr(0, 100) + "...";
    } else {
      description = "No create description...";
    }

    if ("thumbnail" in data && "url" in data.thumbnail) {
      thumbnailUrl = data.thumbnail.url;
    } else {
      thumbnailUrl = $config.NO_IMAGE_URL;
    }

    return {
      title: data.title,
      content: data,
      description: description,
      thumbnailUrl: thumbnailUrl,
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "article",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.title,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.$config.HOMEPAGE_ROOT_URL + "/blog/articles/" + this.content.id,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.thumbnailUrl,
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
  data() {
    return {
      theme: this.$store.state.theme,
      tocCount: 0,
      tocList: [],
      categories: [
        {
          name: "トップページ",
          iconName: "home",
          link: "/",
          categoryQueryValue: undefined,
        },
        { name: "ブログトップ", iconName: "library_books", link: "/blog" },
        {
          name: "プログラミング",
          iconName: "code",
          link: "/blog?category=プログラミング",
          categoryQueryValue: "プログラミング",
        },
        {
          name: "IT",
          iconName: "computer",
          link: "/blog?category=IT",
          categoryQueryValue: "IT",
        },
        {
          name: "日記",
          iconName: "menu_book",
          link: "/blog?category=日記",
          categoryQueryValue: "日記",
        },
        {
          name: "プライバシーポリシー",
          iconName: "policy",
          link: "/blog/privacy-policy",
          categoryQueryValue: undefined,
        },
      ],
    };
  },
  methods: {
    backTo() {
      this.$router.go(-1);
    },
    createElementFromHTML(html) {
      const tempEl = document.createElement("div");
      tempEl.innerHTML = html;
      return tempEl;
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
  },
};
</script>
<style lang="scss" scoped>
.v-application a {
  display: contents;
  text-decoration: none;
  color: #4fc3f7;
}
.container {
  max-width: 90%;
}
</style>