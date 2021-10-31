<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list nav dense>
        <template v-for="(category, i) in categories">
          <nuxt-link
            :to="category.link"
            :key="`first-${i}`"
            @click.native="sentCategory(category.categoryQueryValue)"
          >
            <v-list-item>
              <v-list-item-action>
                <i class="material-icons">{{ category.iconName }}</i>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="category.name" />
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <v-switch
        v-model="theme"
        :prepend-icon="themeIcon"
        hide-details="false"
        v-if="darkButtonShow"
      ></v-switch>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: ["categories", "darkButtonShow"],
  data() {
    return {
      theme: this.$store.state.theme,
      clipped: false,
      drawer: false,
      miniVariant: false,
    };
  },
  methods: {
    sentCategory(categoryValue) {
      this.$emit("categoryValue", categoryValue);
    },
  },
  computed: {
    themeIcon() {
      return this.$store.state.theme
        ? "mdi-weather-night"
        : "mdi-weather-sunny";
    },
  },
  watch: {
    theme() {
      this.$store.dispatch("theme", this.theme);
      this.$vuetify.theme.dark = this.theme;
    },
  },
};
</script>

<style lang="css" scoped>
</style>
