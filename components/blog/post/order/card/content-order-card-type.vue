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
          <v-img
            :src="content.thumbnail.url"
            v-if="'thumbnail' in content"
            class="white--text align-end"
            height="150px"
            max-width="344px"
          ></v-img>
          <v-img
            v-else
            :src="noImageUrl"
            class="white--text align-end"
            height="150px"
            max-width="344px"
          ></v-img>
          <v-card-title>
            {{ content.title }}
          </v-card-title>
        </nuxt-link>
      </v-card>
      <v-card
        class="pa-2"
        max-width="344"
        height="300"
        outlined
        tile
        v-if="index === ramdom1 || index === ramdom2"
        v-html="a8[getRandomInt(countJsonData(a8))].html.pc"
        :key="index + 'rondom'"
      ></v-card>
    </template>
    <v-card
      class="pa-2"
      max-width="344"
      height="300"
      outlined
      tile
      v-if="ramdom1 === ramdom2"
      v-html="a8[getRandomInt(countJsonData(a8))].html.pc"
    ></v-card>
  </v-card>
</template>
<script>
import a8 from "~/assets/affiliate/a8.json";
export default {
  props: ["contents"],
  data() {
    return {
      show: false,
      noImageUrl: process.env.NO_IMAGE_URL,
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
<style lang="scss">
</style>