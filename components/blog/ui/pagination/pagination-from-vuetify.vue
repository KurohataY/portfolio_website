
<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="paginationNum"
      @input="sentNowPageNum"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  props: ["paginationNum"],
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    sentNowPageNum(number) {
      this.$emit("pageNum", number);
    },
  },
};
</script>