<template>
  <v-container class="pa-4 post">
    <h1>{{ title }}</h1>
    <Toc :blogContent="blogContent" />
    <div v-for="(bc, index) in blogContent" :key="index + bc.fieldId">
      <div v-html="bc.content"></div>
      <div v-html="bc.html"></div>
    </div>
    <Tags :tags="tags" />
  </v-container>
</template>
<script>
import Toc from "~/components/blog/ui/toc/toc.vue";
import Tags from "~/components/blog/ui/tags.vue";
export default {
  props: {
    title: String,
    blogContent: Array,
    tags: String,
  },
  components: {
    Toc,
    Tags,
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
      for (let n = 0; n < img.length; n++) {
        img[n].style.display = "block";
        img[n].style.textAlign = "center";
        img[n].style.margin = "0 auto";
        img[n].style.maxWidth = "80%";
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