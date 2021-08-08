<template>
  <div class="nav">
    <div class="prev" @click="clickPrevNewsPage()">aa</div>
    <ul>
      <li
        v-for="(content, index) in contents" :key="content.id"
        @click="newsSection.nav.now = 0"
      >
        <div :class="{ selected: newsSection.nav.now  === index }">{{index + 1}}</div>
      </li>
    </ul>
    <div class="next" @click="clickNextNewsPage()">bb</div>
  </div>
</template>

<script>
export default {
  props: ["contents"],
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
    },
    clickNextNewsPage() {
      this.newsSection.nav.now =
        this.newsSection.nav.now + 1 > this.newsSection.nav.last - 1
          ? this.newsSection.nav.now
          : this.newsSection.nav.now + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  ul {
    li {
      div {
          &.selected {
            padding: 3px 5px;
            border: 1px solid #4b4b4b;
        }
      }
    }
  }
}
</style>