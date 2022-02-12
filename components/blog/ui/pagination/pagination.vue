<template>
  <div class="wrapper">
    <ul class="pager">
      <li v-if="current > 1" class="page arrow">
        <nuxt-link :to="getPath(current - 1)">
          <span class="material-icons"> chevron_left </span>
        </nuxt-link>
      </li>
      <li v-if="3 < current" class="page">
        <nuxt-link :to="getPath(1)"> 1 </nuxt-link>
      </li>
      <li v-if="4 < current" class="omission">...</li>
      <li
        v-for="p in pager"
        v-show="current - 3 <= p && p <= current + 1"
        :key="p"
        class="page"
        :class="{ active: current === p + 1 }"
      >
        <nuxt-link :to="getPath(p + 1)">
          {{ p + 1 }}
        </nuxt-link>
      </li>
      <li v-if="current + 3 < pager.length" class="omission">...</li>
      <li v-if="current + 2 < pager.length" class="page">
        <nuxt-link :to="getPath(pager.length)">
          {{ pager.length }}
        </nuxt-link>
      </li>
      <li v-if="current < pager.length" class="page arrow">
        <nuxt-link :to="getPath(current + 1)">
          <span class="material-icons"> chevron_right </span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pager: {
      type: Array,
      required: false,
      default: () => [],
    },
    current: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  methods: {
    getPath(p) {
      const categoryPath =
        !!this.category ? `/blog/category/${this.category}/` : "/blog/";
      return categoryPath + `pages/${p}`;
    },
  },
};
</script>
<style lang="scss" scoped >
.wrapper {
  padding: 16px 0;
}
li {
  list-style-type: none;
}
.pager {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 40px 0 0;
}
.omission {
  color: var(--color-text-off);
  margin: 4px 12px;
}
.page {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  margin: 4px;
  background-color: #fff;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  &.arrow {
    margin: 4px 12px;
  }
  &.active {
    background-color: #03a9f4;
    a {
      color: white;
    }
  }
  a {
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>