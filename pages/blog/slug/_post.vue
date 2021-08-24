<template>
  <div>
    <PCNavi
      v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"
      :categories="categories"
    />
    <SPNavi v-else :categories="categories" />
    <v-container style="margin-top: 50px">
      <v-row justify="center" no-gutters>
        <v-col cols="12" sm="12" md="8" lg="8">
          <Post
            :title="title"
            :blogContent="content.blogContent"
            :tocList="tocList"
            :tocCount="tocCount"
          />
        </v-col>
        <!-- <v-spacer></v-spacer> -->
        <!-- <v-col cols="4" v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg">
          <v-switch v-model="theme" :prepend-icon="themeIcon"></v-switch>
          <SideMenu :order="orderpublishedAtContents" />
        </v-col>
        <v-col cols="10" v-else>
          <SideMenu :order="orderpublishedAtContents" />
        </v-col> -->
      </v-row>
      <v-btn text :ripple="false" class="back-wrapper" @click.native="backTo">
        <i class="material-icons">arrow_back</i>
        </v-btn>
    </v-container>
  </div>
</template>
<script>
import Swiper from "~/components/blog/ui/carousel/swiper.vue";
import SPNavi from "~/components/nav/navbar.vue";
import PCNavi from "~/components/blog/ui/nav/navbar.vue";
import Post from "~/components/blog/post/post.vue";
import SideMenu from "~/components/blog/ui/sidemenu/side-menu.vue";

import axios from "axios";
import cheerio from "cheerio";

export default {
  components: {
    Swiper,
    SPNavi,
    PCNavi,
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
    } else if (data.contents !== undefined) {
      description = $(data.contents).text().substr(0, 100) + "...";
    } else {
      description = "No create description...";
    }

    if ("thumbnail" in data && "url" in data.thumbnail) {
      thumbnailUrl = data.thumbnail.url;
    } else {
      thumbnailUrl = process.env.NO_IMAGE_URL;
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
          content: process.env.HOMEPAGE_ROOT_URL + "/blog/" + this.content.id,
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
          content: process.env.TWITTER_MY_USER_ID,
        },
      ],
    };
  },
  data() {
    return {
      theme: this.$store.state.theme,
      orderpublishedAtContents: [],
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
  created() {
    this.getOrdersContentData();
    this.tableOfContents();
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
    searchHeadingTags(contentList, contentListCount) {
      var body = "";
      for (let i = 0; i < contentListCount; i++) {
        body = body + contentList[i].content;
      }
      const $ = cheerio.load(body);
      return $("h2, h3").toArray();
    },
    tableOfContents() {
      const contentList = this.content.blogContent;
      const contentListCount = contentList !== null ? contentList.length : 0;

      const headings = this.searchHeadingTags(contentList, contentListCount);
      if (contentListCount !== 0) {
        var h2Flag = 0;
        var h3Flag = 0;
        var result = [];
        headings.forEach(function (t) {
          var item = {
            id: "",
            name: "",
            children: [],
          };

          if (t.name === "h2") {
            item.id = t.attribs.id;
            item.name = t.children[0].data;
            h2Flag++;
            result.push(item);
          } else if (t.name === "h3") {
            item.id = t.attribs.id;
            item.name = t.children[0].data;
            result[h2Flag - 1].children[h3Flag] = item;
            h3Flag += 1;
          }
        });
      }
      this.tocCount = h2Flag;
      this.tocList = result;
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