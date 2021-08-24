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
        <a
          v-for="(external, i) in external_link"
          :key="`second-${i}`"
          :href="external.link"
          target="_blank"
          rel="noopener noreferrer"
          style="text-decoration: none"
        >
          <v-list-item nuxt>
            <v-list-item-icon>
              <v-icon>{{ external.iconName }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="external.name" />
            </v-list-item-content>
          </v-list-item>
        </a>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: ["categories", "external_link"],
  data() {
    return {
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
};
</script>

<style lang="css" scoped>
</style>
