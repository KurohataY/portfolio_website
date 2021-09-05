<template>
  <div style="margin: 50px 0; padding: 10px">
    <div v-if="tocCount > 0">
      <h2>目次</h2>
      <v-list>
        <v-treeview open-all shaped :items="tocList">
          <template v-slot:label="{ item }">
            <n-link
              style="margin-right: 1em; text-decoration: none; color: black"
              v-scroll-to="`#${item.id}`"
              to
              v-text="item.name"
              class="v-treeview-itme"
              :class="themeClasses()"
            >
            </n-link>
          </template>
        </v-treeview>
      </v-list>
    </div>
  </div>
</template>

<script>
import cheerio from "cheerio";
export default {
  data() {
    return {
      tocList: [],
      tocCount: 0,
    };
  },
  created() {
    this.tableOfContents();
  },
  props: ["blogContent"],
  methods: {
    themeClasses() {
      return this.$store.state.theme ? "theme--light" : "theme--dark";
    },
    tableOfContents() {
      const contentList = this.blogContent;
      const contentListCount = contentList !== null ? contentList.length : 0;

      const headings = this.searchHeadingTags(contentList, contentListCount);
      if (contentListCount !== 0) {
        var h2Flag = 0;
        var h3Flag = 0;
        var h4Flag = 0;
        var result = [];
        headings.forEach(function (t) {
          var item = {
            id: "",
            name: "",
            children: [],
          };

          item.id = t.attribs.id;
          item.name = t.children[0].data;
          if (t.name === "h2") {
            h2Flag++;
            result.push(item);
          } else if (t.name === "h3") {
            result[h2Flag - 1].children[h3Flag] = item;
            h3Flag += 1;
          } else if (t.name === "h4") {
            result[h2Flag - 1].children[h3Flag - 1].children[h4Flag] = item;
            h4Flag += 1;
          }
        });
      }
      this.tocCount = h2Flag;
      this.tocList = result;
    },
    searchHeadingTags(contentList, contentListCount) {
      var body = "";
      for (let i = 0; i < contentListCount; i++) {
        body = body + contentList[i].content;
      }
      const $ = cheerio.load(body);
      return $("h2, h3, h4").toArray();
    },
  },
};
</script>

<style lang="scss" scoped>
a.v-treeview-itme.theme--light {
  color: white !important;
}
a.v-treeview-itme.theme--dark {
  color: black !important;
}
</style>