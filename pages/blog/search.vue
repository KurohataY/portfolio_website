<template>
  <div>
    <PCNavi
      :categories="categories"
      v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"
    />
    <SPNavi
      :categories="categories"
      :darkButtonShow="true"
      v-else
    />
    <v-parallax height="500" class="mask">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1>サイト内検索</h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-form v-model="valid" @submit.prevent>
        <v-container>
          <v-row>
            <v-col cols="11">
              <v-text-field
                v-model="searchWord"
                :counter="100"
                label="検索フォーム"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn
                :disabled="!valid"
                class="mr-4"
                @click="submit"
                absolute
                style="top: 24%"
                icon
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <ContentOrderListType
        :contents="serachContentList"
        :sideMenu="sideMenu"
      />
      <PaginationVuetify
        :paginationNum="paginationNum"
        @pageNum="emitPaginationEvent"
        style="margin-top: 50px"
      />
    </v-container>
  </div>
</template>

<script>
import PaginationVuetify from "~/components/blog/ui/pagination/pagination-from-vuetify.vue";
import ContentOrderListType from "~/components/blog/post/order/list/content-order-list-type.vue";
import PCNavi from "~/components/blog/ui/nav/navbar.vue";
import SPNavi from "~/components/nav/navbar.vue";

import gMenuList from "~/assets/menu/g-menu.json";

import axios from "axios";

export default {
  components: {
    PaginationVuetify,
    ContentOrderListType,
    PCNavi,
    SPNavi,
  },
  data: () => ({
    categories: gMenuList,
    valid: false,
    searchWord: "",
    serachContentList: [],
    paginationNum: 0,
    sideMenu: null,
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

      return {
        serachContentList: data.contents,
        paginationNum: Math.ceil(data.totalCount / 10),
        searchWord: searchWord,
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

        this.paginationNum = Math.ceil(data.totalCount / 10);

        this.serachContentList = data.contents;
        this.searchWord = searchWord;
      } catch (err) {
        console.log(err);
      }
    },
    emitPaginationEvent(pageNum) {
      this.pageNum = pageNum;
      this.getSearchData();
    },
    emitGetCategoryEvent(categoryValue) {
      this.category = categoryValue;
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