<template>
  <v-container>
    <v-card class="mx-auto under-water" width="100wv" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            <h1>{{profile_title}}</h1>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar tile size="150" color="grey">
          <v-img :src="avatar_img_path"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <TextAnimetion />
    </v-card>
  </v-container>
</template>

<script>
import TextAnimetion from "../animation/string-animation.vue";
export default {
  components: {
    TextAnimetion,
  },
  data: () => ({
    avatar_img_path: "images/profile.webp",
    profile_title: "Profile",
  }),
};
</script>

<style scoped>
#profile {
  white-space: pre-line;
  font-size: 20px;
}

h1 {
  font-size: 4vw;
  font-family: lust-script, sans-serif;
  font-style: normal;
  font-weight: 700;
  text-shadow: #fff 2px 0, #fff -2px 0, #fff 0 -2px, #fff 0 2px, #fff 2px 2px,
    #fff -2px 2px, #fff 2px -2px, #fff -2px -2px, #fff 1px 2px, #fff -1px 2px,
    #fff 1px -2px, #fff -1px -2px, #fff 2px 1px, #fff -2px 1px, #fff 2px -1px,
    #fff -2px -1px, rgba(0, 0, 0, 0.5) 3px 3px 3px;
}

.nuxtLink {
  text-decoration: none;
}
</style>
