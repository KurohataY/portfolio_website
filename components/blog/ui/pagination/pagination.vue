<template>
  <div class="nav">
    <span class="prev" @click="clickPrevNewsPage()">前へ</span>
    <ul>
      <li
        v-for="(_, index) in paginationNums"
        :key="index"
        @click="clickNowPage(index)"
      >
        <div :class="{ selected: newsSection.nav.now === index }">
          {{ index + 1 }}
        </div>
      </li>
    </ul>
    <span class="next" @click="clickNextNewsPage()">次へ</span>
  </div>
</template>

<script>
export default {
  props: ["paginationNums"],
  data() {
    return {
      newsSection: {
        nav: {
          now: 0,
          last: 10,
        },
      },
    };
  },
  methods: {
    clickPrevNewsPage() {
      this.newsSection.nav.now =
        this.newsSection.nav.now - 1 < 0
          ? this.newsSection.nav.now
          : this.newsSection.nav.now - 1;
      this.sentNowPageNum();
    },
    clickNextNewsPage() {
      this.newsSection.nav.now =
        this.newsSection.nav.now + 1 > this.newsSection.nav.last - 1
          ? this.newsSection.nav.now
          : this.newsSection.nav.now + 1;
      this.sentNowPageNum();
    },
    clickNowPage(index) {
      this.newsSection.nav.now = index;
      this.sentNowPageNum();
    },
    sentNowPageNum() {
      this.$emit("pageNum", this.newsSection.nav.now + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  width: 80%;
  margin: 0 auto;
  //   max-width: 500px;
  text-align: center;
  ul {
    display: inline-block;
    padding-left: 0 !important;
    li {
      list-style-type: none;
      display: inline-block;
      margin: 0 10px;
      div {
        text-align: center;
        padding: 3px 5px;
        border: 1px solid #4b4b4b;
        width: 30px;
        &.selected {
          border: 2px solid #4b4b4b;
        }
      }
    }
  }
}
</style>