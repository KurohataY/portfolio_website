<template>
  <v-row justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="12"
      md="8"
      lg="8"
      xl="8"
      style="margin-bottom: 50px"
    >
      <v-card v-for="content in contents" :key="content.id">
        <div class="d-flex flex-no-wrap">
          <nuxt-link :to="'/blog/' + content.id">
            <v-avatar class="ma-3" size="125" tile v-if="$vuetify.breakpoint.smAndUp">
              <v-img
                v-if="'thumbnail' in content"
                :src="content.thumbnail.url"
              ></v-img>
              <v-img v-else :src="noImageUrl"></v-img>
            </v-avatar>
            <v-card flat>
              <v-card-title v-text="content.title" :style="{color: $vuetify.theme.themes[theme].text}">
              </v-card-title>
              <v-card-subtitle v-text="content.description"></v-card-subtitle>
            </v-card>
          </nuxt-link>
        </div>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
      <SideMenu :order="order" />
    </v-col>
  </v-row>
</template>
<script>
import SideMenu from "~/components/blog/ui/sidemenu/side-menu.vue";
export default {
  props: ["contents", "order"],
  components: {
    SideMenu,
  },
  data() {
    return {
      noImageUrl: process.env.NO_IMAGE_URL,
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ?  "light" : "dark";
    },
  },
};
</script>
<style lang="">
</style>