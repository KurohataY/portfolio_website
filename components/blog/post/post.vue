<template>
  <v-container class="pa-4 post">
    <h1>{{ title }}</h1>
    <Toc :blogContent="blogContent" />
    <div v-for="(bc, index) in blogContent" :key="index + bc.fieldId">
      <div v-html="bc.content"></div>
      <div v-html="bc.html"></div>
    </div>
  </v-container>
</template>
<script>
import Toc from "~/components/blog/ui/toc/toc.vue";
export default {
  props: {
    title: String,
    blogContent: Array,
  },
  components: {
    Toc,
  },
  mounted: function () {
    // https://github.com/google/code-prettify/issues/578
    this.$nextTick(function () {
      PR.prettyPrint();
      var pre = document.getElementsByTagName("pre");
      for (let i = 0; i < pre.length; i++) {
        pre[i].style.overflow = "auto";
        pre[i].style.border = "outset white";
      }
      var img = document.getElementsByTagName("img");
      for (let i = 0; i < img.length; i++) {
        img[i].classList.add("post-img");
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.toc_lists li a {
  text-decoration: none;
  color: black;
}
</style>