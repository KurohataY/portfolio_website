<template>
  <v-card
    class="d-flex flex-wrap justify-space-around"
    color="lighten-2"
    flat
    tile
  >
    <template v-for="(content, index) in contents">
      <v-card
        class="pa-2"
        max-width="344"
        height="300"
        outlined
        tile
        :key="index"
      >
        <nuxt-link color="orange lighten-2" :to="'/blog/' + content.id">
          <picture v-if="'thumbnail' in content">
            <source
              :srcset="content.thumbnail.url + '?fm=webp'"
              class="white--text align-end"
            />
            <img
              :src="content.thumbnail.url"
              class="white--text align-end"
              style="height: 150px; max-width: 344px"
            />
          </picture>
          <v-img
            v-else
            :src="noImageUrl"
            class="white--text align-end"
            height="150px"
            max-width="344px"
          ></v-img>
          <v-card flat>
            <v-card-title v-text="content.title"> </v-card-title>
          </v-card>
        </nuxt-link>
      </v-card>
      <client-only>
        <v-card
          class="pa-2 affiliate"
          max-width="344"
          height="300"
          tile
          v-show="index === ramdom1 || index === ramdom2"
          v-html="a8[getRandomInt(countJsonData(a8))].html.pc"
          :key="index + 'rondom'"
        >
        </v-card>
      </client-only>
    </template>
    <client-only>
      <v-card
        class="pa-2 affiliate"
        max-width="344"
        height="300"
        tile
        v-show="ramdom1 === ramdom2"
        v-html="a8[getRandomInt(countJsonData(a8))].html.pc"
      >
      </v-card>
    </client-only>
  </v-card>
</template>
<script>
import a8 from "~/assets/affiliate/a8.json";
export default {
  props: ["contents"],
  data() {
    return {
      show: false,
      noImageUrl: this.$config.NO_IMAGE_URL,
      a8: a8,
      ramdom1: this.getRandomInt(10),
      ramdom2: this.getRandomInt(10),
    };
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    countJsonData(json) {
      return json.length;
    },
  },
};
</script>
<style lang="scss" scoped>
@media screen and(max-width: 960px) {
  .affiliate {
    padding: 40px !important;
    border: none !important;
    box-shadow: none !important;
  }
}
</style>