<template lang="">

   <v-container class="pa-4 post">
      <h1>{{title}}</h1>
      <ul class="toc_lists">
        <li :class="`list ${toc.name}`" v-for="toc in toc" :key="toc.id">
        <n-link v-scroll-to="`#${toc.id}`" to>
          {{ toc.text }}
        </n-link>
        </li>
      </ul>
      <div v-for="(bc, index) in blogContent" :key="index + bc.fieldId">
          <div v-html="bc.content"></div>
          <div v-html="bc.html"> </div>
      </div>
    </v-container>
</template>
<script>
export default {
  props: {
    title: String,
    blogContent: Array,
    toc: Array,
  },
  mounted: function () {
    // https://github.com/google/code-prettify/issues/578
    this.$nextTick(function () {
      PR.prettyPrint();
      var pre = document.getElementsByTagName('pre');
      for (let i=0;i<pre.length;i++) {
        pre[i].style.overflow = 'auto';
        pre[i].style.whiteSpace = "normal";
      }
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
.prettyprint{
  overflow: auto;
  white-space: nomal !important;
}
</style>