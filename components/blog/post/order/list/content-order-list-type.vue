<template lang="">
  <div>
    <v-row no-gutters>
      <v-col cols="8" sm="12" md="8">
        <v-card v-for="content in contents" :key="content.id">
          <div
            v-if="'thumbnail' in content"
            class="d-flex flex-no-wrap "
          >
            <nuxt-link :to="'/blog/' + content.id">
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="content.thumbnail.url"></v-img>
              </v-avatar>
              <div>
                <v-card-title class="text-h5" v-text="content.title">
                </v-card-title>
                <v-card-subtitle
                  v-text="content.description"
                ></v-card-subtitle>
              </div>
            </nuxt-link>
          </div>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3" sm="0" md="3">
        <SideMenu :orderContents="orderpublishedAtContents" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import SideMenu from "~/components/blog/ui/sidemenu/side-menu.vue";
export default {
  props: ["contents", "orderpublishedAtContents"],
  components: {
    SideMenu,
  },
};
</script>
<style lang="">
</style>