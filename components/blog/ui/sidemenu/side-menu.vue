<template lang="">
    <v-card
    max-width="450"
    class="mx-auto"
  >

    <v-list three-line>
      <template v-for="(content, index) in orderContents">

        <nuxt-link :to="'/blog/' + content.id">
            <v-list-item>
            <v-list-item-content>
                <v-list-item-title v-html="content.title"></v-list-item-title>
                <v-list-item-subtitle v-html="content.description"></v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </nuxt-link>
        <v-divider
          v-if="index !== 4"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: ["content", "orderContents"],
};
</script>
<style lang="">
</style>