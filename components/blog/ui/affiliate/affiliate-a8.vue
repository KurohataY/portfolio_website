<template>
  <div>
    <div
      v-html="a8[getRandomInt(countJsonData(a8))].html.pc"
      v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.lg"
    ></div>
    <div v-html="a8[getRandomInt(countJsonData(a8))].html.sp" v-else></div>
  </div>
</template>

<script>
import a8 from "~/assets/affiliate/a8.json";
export default {
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
    },
  },
};
</script>

<style lang="scss">
</style>