<template>
   <v-container class="pa-4 post">
      <h1>{{title}}</h1>
      <div style="margin: 50px 0;padding: 10px">
          <h2>目次</h2>
          <Toc :tocList="tocList" />
      </div>
      <div v-for="(bc, index) in blogContent" :key="index + bc.fieldId">
          <div v-html="bc.content"></div>
          <div v-html="bc.html"> </div>
      </div>
    </v-container>
</template>
<script>
import Toc from "~/components/blog/ui/toc/toc.vue";
export default {
  props: {
    title: String,
    blogContent: Array,
    tocList: Array,
  },
  components: {
    Toc,
  },
  create() {

  },
  mounted: function () {
    // https://github.com/google/code-prettify/issues/578
    this.$nextTick(function () {
      PR.prettyPrint();
      var pre = document.getElementsByTagName("pre");
      for (let i = 0; i < pre.length; i++) {
        pre[i].style.overflow = "auto";
      };
    });
  },
};
</script>
<style lang="scss" scoped>
img {
  width: 80%;
  text-align: center;
  margin: 0 auto;
  display: block;
}
.toc_lists li a {
  text-decoration: none;
  color: black;
}
.prettyprint {
  overflow: auto;
  white-space: nomal !important;
}

</style>