<template lang="">
    <div class="pa-4 post">
        <h1>{{title}}</h1>
        <ul class="lists">
          <li :class="`list ${toc.name}`" v-for="toc in toc" :key="toc.id">
          <n-link v-scroll-to="`#${toc.id}`" to>
            {{ toc.text }}
          </n-link>
          </li>
        </ul>
        <div v-for="(bc, index) in blogContent" :key="index">
            <div v-html="bc.content"></div>
            <div v-html="bc.html"> </div>
        </div>
    </div>
</template>
<script>
import cheerio from "cheerio";

export default {
  props: {
    title: String,
    blogContent: Array,
  },
  data() {
    return {
      toc: [],
    };
  },
  created() {
    // console.log(this.blogContent);
    this.toc = this.tableOfContents();
  },
  methods: {
    tableOfContents() {
      var body = "";
      for (let i = 0; i < this.blogContent.length; i++) {
        body = body + this.blogContent[i].content;
      }
      const $ = cheerio.load(body);
      const headings = $("h1, h2, h3").toArray();
      const toc = headings.map((data) => ({
        text: data.children[0].data,
        id: data.attribs.id,
        name: data.name,
      }));
      return toc;
    },
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