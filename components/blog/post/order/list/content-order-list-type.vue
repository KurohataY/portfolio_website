<template>
  <v-row justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="12"
      md="8"
      lg="8"
      xl="8"
      style="margin-bottom: 50px"
    >
      <v-card v-for="content in contents" :key="content.id">
        <div class="d-flex flex-no-wrap">
          <nuxt-link :to="'/blog/articles/' + content.id">
            <v-avatar
              class="ma-3"
              size="125"
              tile
              v-if="$vuetify.breakpoint.smAndUp"
            >
              <picture v-if="'thumbnail' in content">
                <source
                  :srcset="content.thumbnail.url + '?fm=webp&w=150&h=150'"
                />
                <img
                  :src="content.thumbnail.url + '?w=150&h=150'"
                />
              </picture>
              <img v-else :src="noImageUrl">
            </v-avatar>
            <v-card flat>
              <v-card-title
                v-text="content.title"
                :style="{ color: $vuetify.theme.themes[theme].text }"
              >
              </v-card-title>
              <v-card-subtitle
                v-text="content.description"
                v-if="content.description"
              ></v-card-subtitle>
              <v-card-subtitle
                v-text="cutText(content.blogContent[0].content)"
                v-else-if="
                  typeof content.blogContent !== 'undefined' &&
                  content.blogContent !== null &&
                  typeof content.blogContent[0] !== 'undefined' &&
                  !('content' in content.blogContent)
                "
              ></v-card-subtitle>
            </v-card>
          </nuxt-link>
        </div>
      </v-card>
    </v-col>
    <v-spacer v-if="sideMenu"></v-spacer>
    <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3" v-if="sideMenu">
      <SideMenu :order="order" />
    </v-col>
  </v-row>
</template>
<script>
import cheerio from "cheerio";
import SideMenu from "~/components/blog/ui/sidemenu/side-menu.vue";

export default {
  props: ["contents", "order", "sideMenu"],
  components: {
    SideMenu,
  },
  data() {
    return {
      noImageUrl: this.$config.NO_IMAGE_URL,
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "light" : "dark";
    },
  },
  methods: {
    cutText(text) {
      const $ = cheerio.load;
      return $(text).text().substr(0, 100) + "...";
    },
  },
};
</script>
<style lang="">
</style>