<template>
  <div>
    <Profile />
    <AffiliateA8 />
    <v-card class="mx-auto">
      <v-list three-line>
        <template v-for="(content, index) in sideMenuContents">
          <nuxt-link :to="'/blog/articles/' + content.id" :key="index + content.id">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-html="content.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="content.description"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
          <v-divider v-if="index !== 4" :key="content.id"></v-divider>
        </template>
      </v-list>
    </v-card>
    <AffiliateA8 />
  </div>
</template>
<script>
import Profile from "~/components/blog/ui/profile/profile.vue"
import AffiliateA8 from "~/components/blog/ui/affiliate/affiliate-a8.vue";
export default {
  props: ["content", "sideMenuContents"],
  components:{
    Profile,
    AffiliateA8
  },
};
</script>
<style lang="scss">
</style>