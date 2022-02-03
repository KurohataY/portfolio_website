
<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="paginationNum"
      @input="goToPage"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  props: {
    paginationNum: {
      type: Number,
      required: false,
      default: () => [],
    },
    pageNum: {
      type: Number,
      required: false,
      default: () => [],
    },
    category: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      page: this.pageNum,
    };
  },
  methods: {
    goToPage(number) {
      const categoryPath = this.category === undefined ? "/" : `/category/${this.category}/`
      this.$router.push({ path: `/blog${categoryPath}pages/${number}` });
    },
  },
};
</script>