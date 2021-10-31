<template>
  <v-chip-group column active-class="primary--text">
    <v-chip v-for="tag in tags.split(',')" :key="tag" v-if="!(tag.length == 0)">
      {{ tag }}
    </v-chip>
  </v-chip-group>
</template>
<script>
export default {
  props: {
    tags: String,
  },
  data: () => ({}),
};
</script>