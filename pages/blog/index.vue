<template>
  <div>
    <Navi />
    <div>
      <Swiper :contents="contents" />
    </div>

    <v-container class="grey lighten-5" fluid="true">
      <v-row no-gutters>
        <v-col cols="8" sm="12" md="8">
          <v-card v-for="content in contents" :key="content.id">
            <div
              v-if="'thumbnail' in content"
              class="d-flex flex-no-wrap justify-space-between"
            >
              <nuxt-link :to="'/blog/' + content.id">
                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="content.thumbnail.url"></v-img>
                </v-avatar>
                <div>
                  <v-card-title class="text-h5" v-text="content.title">
                  </v-card-title>
                  <v-card-subtitle
                    v-text="content.description"
                  ></v-card-subtitle>
                </div>
              </nuxt-link>
            </div>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3" sm="0" md="3">
          <v-card class="pa-2" outlined tile> サイドメニュー </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Pagination :contents="contents" @pageNum="emitEvent" />
  </div>
</template>
<script>
import Swiper from "~/components/blog/ui/carousel/swiper.vue";
import Navi from "~/components/blog/ui/nav/navbar.vue";
import Pagination from "~/components/blog/ui/pagination/pagination.vue";
import axios from 'axios'

export default {
  components: {
    Swiper,
    Navi,
    Pagination,
  },
  async asyncData({ $microcms }) {
    const page = "1";
    const limit = 10;
    const range = (start, end) =>
      [...Array(end - start + 1)].map((_, i) => start + i);
    const data = await $microcms.get({
      endpoint: `blog`,
      // queries: {limit: 1},
    });
    return data;
  },
  data() {
    return {
      pageNum: 1,
    };
  },
  methods: {
    emitEvent(pageNum) {
      this.pageNum = pageNum;
      console.log(this.pageNum);
      this.getContentData();
    },
    async getContentData() {
      const offset = this.pageNum * 10 - 9;
      try {
        const data = await this.$axios.$get(
          `https://izanagiblog.microcms.io/api/v1/blog?offset=${offset}`,
          {
            headers: {
              "X-API-KEY": process.env.MICRO_CMS_API_KEY,
            },
          }
        );
        this.contents = data.contents
        console.log(data);
        return data;
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