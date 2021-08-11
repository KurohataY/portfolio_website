<template lang="">
    <div>
        <h1>{{title}}</h1>
        <div v-for="(bc, index) in blogContent" :key="index">
            <div v-html="bc.content"></div>
            <div v-html="bc.html"> </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    title: String,
    blogContent: Array,
  },

  mounted: function () {
    // https://github.com/google/code-prettify/issues/578
    this.$nextTick(function () {
      PR.prettyPrint();
    });
  },
};
</script>
<style lang="scss">
img {
  width: 80%;
  text-align: center;
  margin: 0 auto;
  display: block;
}
</style>