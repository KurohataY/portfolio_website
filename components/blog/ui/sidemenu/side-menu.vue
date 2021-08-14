<template>
<div>
  <v-card
    class="mx-auto"
    >
      <v-list three-line>
        <template v-for="(content, index) in orderContents">
          <nuxt-link :to="'/blog/' + content.id" :key="index + content.id">
              <v-list-item>
                <v-list-item-content>
                    <v-list-item-title v-html="content.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="content.description"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
          </nuxt-link>
          <v-divider
            v-if="index !== 4"
            :key="content.id"
          ></v-divider>
        </template>
      </v-list>
    </v-card>
    <div v-html="a8[getRandomInt(countJsonData(a8))].html.pc" v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"></div>
    <div v-html="a8[getRandomInt(countJsonData(a8))].html.sp" v-else></div>
  </div>
  
</template>
<script>
import a8 from "~/assets/affiliate/a8.json";
export default {
  props: ["content", "orderContents"],
  data() {
    return {
      a8: a8,
    };
  },
  methods: {
     getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    countJsonData(json) {
      return json.length;
    }
  },
};
</script>
<style lang="scss">
img {
  width: -webkit-fill-available;
  width: -moz-available;
  width: stretch;
  height: -webkit-fill-available;
  height: -moz-available;
  height: stretch;
}
</style>