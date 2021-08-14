<template lang="">
  <v-card
    class="d-flex flex-wrap justify-space-around"
    color="lighten-2"
    flat
    tile
  >
    <v-card
      class="pa-2"
      max-width="344"
      height="300"
      outlined
      tile
      v-for="content in contents" :key="content.id"
      v-if="'thumbnail' in content"
    >
      <nuxt-link color="orange lighten-2" :to="'/blog/' + content.id">
        <v-img
          :src="content.thumbnail.url"
          class="white--text align-end"
          height="150px"
          max-width="344px"
          ></v-img>
          <v-card-title>
            {{content.title}}
          </v-card-title>
      </nuxt-link>
    </v-card>
  </v-card>
</template>
<script>
export default {
  props: ["contents"],
  data: () => ({
    show: false,
  }),
};
</script>
<style lang="scss">
</style>