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
        <template v-for="(item, i) in items">
          <nuxt-link :to="item.to" :key="`first-${i}`">
            <v-list-item>
              <v-list-item-action>
                <i class="material-icons">{{ item.icon }}</i>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
        </template>
        <a
          v-for="(item, i) in out_site_item"
          :key="`second-${i}`"
          :href="item.url"
          style="text-decoration: none"
        >
          <v-list-item nuxt>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
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
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: "home",
          title: "ホーム",
          to: "/",
        },
        {
          icon: "account_circle",
          title: "プロフィール",
          to: "#profile",
        },
        {
          icon: "web",
          title: "制作物",
          to: "#product",
        },
      ],
      out_site_item: [
        {
          icon: "code",
          title: "開発ブログ",
          url: "/blog",
        },
        {
          icon: "sports_esports",
          title: "趣味ブログ",
          url: "https://izanagi-craft.com/",
        },
      ],
      miniVariant: false,
    };
  },
};
</script>

<style lang="css" scoped>
</style>
