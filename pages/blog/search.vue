<template>
  <div>
    <template>
      <v-form v-model="valid" @submit.prevent>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="searchWord"
                :counter="100"
                label="検索フォーム"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            検索
          </v-btn>
        </v-container>
      </v-form>
    </template>
    <template v-for="(list, index) in serachResultList">
      <nuxt-link color="orange lighten-2" :to="'/blog/' + list.id" :key="index">
        <v-card>
          <v-card-title>
            {{ list.title }}
          </v-card-title>
        </v-card>
      </nuxt-link>
    </template>
    <PaginationVuetify
      :paginationNum="paginationNum"
      @pageNum="emitPaginationEvent"
      style="margin-top: 50px"
    />
  </div>
</template>

<script>
import PaginationVuetify from "~/components/blog/ui/pagination/pagination-from-vuetify.vue";
import axios from "axios";

export default {
  components: {
    PaginationVuetify,
  },
  data: () => ({
    valid: false,
    searchWord: "",
    serachResultList: [],
    paginationNum: 0,
  }),
  async asyncData({ query }) {
    const searchWord = query.word;
    const url =
      searchWord !== undefined
        ? `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?q=${searchWord}`
        : `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog`;

    try {
      const { data } = await axios.get(url, {
        headers: {
          "X-API-KEY": process.env.MICRO_CMS_API_KEY,
        },
      });
      console.log(data.totalCount);
      return {
        serachResultList: data.contents,
        paginationNum: (data.totalCount / 10 + 1) | 0,
      };
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    submit() {
      this.getSearchData();
      this.$router.push({ path: "", query: { word: this.searchWord } });
    },
    async getSearchData() {
      const offset = this.pageNum * 10 - 10;
      const searchWord = this.searchWord;
      const url =
        searchWord !== undefined
          ? `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?offset=${offset}&q=${searchWord}`
          : `https://${process.env.MICRO_CMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog?offset=${offset}`;

      try {
        const { data } = await axios.get(url, {
          headers: {
            "X-API-KEY": process.env.MICRO_CMS_API_KEY,
          },
        });
        this.paginationNum = (data.totalCount / 10 + 1) | 0;
        this.serachResultList = data.contents;
        this.searchWord = searchWord;
      } catch (err) {
        console.log(err);
      }
    },
    emitPaginationEvent(pageNum) {
      this.pageNum = pageNum;
      this.getSearchData();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>