<template>
  <div>
    <Navi />
    <v-container>
      <v-row justify="center" no-gutters>
        <v-col cols="12" sm="12" md="8" lg="8">
          <Post
            :title="title"
            :blogContent="content.blogContent"
            :tocList="items"
          />
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg">
          <v-switch v-model="theme" :prepend-icon="themeIcon"></v-switch>
          <SideMenu :order="orderpublishedAtContents" />
        </v-col>
        <v-col cols="10" v-else>
          <SideMenu :order="orderpublishedAtContents" />
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
import cheerio from "cheerio";

export default {
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
      theme :this.$store.state.theme,
      orderpublishedAtContents: [],
      toc: [],
      items: [],
    };
  },
  created() {
    this.getOrdersContentData();
    this.toc = this.tableOfContents();
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
    tableOfContents() {
      var body = "";
      var toc;
      const contentList = this.content.blogContent;
      const contentListCount = contentList !== null ? contentList.length : 0;
      if (contentListCount !== 0) {
        for (let i = 0; i < contentListCount; i++) {
          body = body + contentList[i].content;
        }
        // const $ = cheerio.load(body);
        const $ = cheerio.load(body);
        const headings = $("h2, h3").toArray();

        toc = headings.map((data) => ({
          text: data.children[0].data,
          id: data.attribs.id,
          name: data.name,
        }));
        toc = toc.length !== 1 ? toc : [];

        var flag = 0;
        var flag2 = 0;
        var result = [];
        toc.forEach(function (t, i) {
          var item = {
            id: "",
            name: "",
            children: [],
          };

          if (t.name === "h2") {
            item.id = t.id;
            item.name = t.text;
            flag++;
            result.push(item);
          } else if (t.name === "h3") {
            item.id = t.id;
            item.name = t.text;
            result[flag - 1].children[flag2] = item;
            flag2 += 1;
          }
        });
      }
      this.items = result;
      return toc;
    },
  },
  computed: {
    themeIcon() {
      return this.$store.state.theme ? "mdi-weather-night" : "mdi-weather-sunny";
    },
  },
  watch: {
    theme() {
      this.$store.dispatch('theme', this.theme);
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