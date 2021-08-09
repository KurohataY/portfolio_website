<template>
<div>
  <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
    <v-list>
      <div v-for="(item, i) in items" :key="`first-${i}`">
        <v-list-item :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </div>
      <a v-for="(item, i) in out_site_item" :key="`second-${i}`" :href="item.url" style="text-decoration: none;">
        <v-list-item router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
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
      items: [{
          icon: 'mdi-home-account',
          title: 'ホーム',
          to: '/'
        },
        {
          icon: 'mdi-clipboard-file-outline',
          title: 'プロフィール',
          to: '#profile'
        },
        {
          icon: 'mdi-electron-framework',
          title: '制作物',
          to: '#product'
        },
        {
          icon: 'mdi-file-question',
          title: 'お問い合わせ',
          to: '#form'
        },
      ],
      out_site_item: [{
          icon: 'mdi-post-outline',
          title: '開発ブログ',
          url: '/blog'
        },
        {
          icon: 'mdi-controller-classic',
          title: '趣味ブログ',
          url: 'https://izanagi-craft.com/'
        }
      ],
      miniVariant: false,
    }
  }
}
</script>

<style lang="css" scoped>
</style>
