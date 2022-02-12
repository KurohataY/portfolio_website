<template>
  <v-chip-group column active-class="primary--text">
    <template v-for="tag in tags.split(',')">
      <v-chip
        nuxt
        :to="'/blog/tag/' + tag + '/pages/1'"
        :key="tag"
        v-if="!(tag.length == 0)"
        :style="tagFontSize"
      >
        {{ tag }}
      </v-chip>
    </template>
  </v-chip-group>
</template>
<script>
export default {
  props: {
    tags: String,
    fontSize: {
      type: Number,
      required: false,
      default: 14,
    },
  },
  data: () => ({}),
  computed: {
    tagFontSize() {
      return {
        "font-size": this.fontSize + "px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>