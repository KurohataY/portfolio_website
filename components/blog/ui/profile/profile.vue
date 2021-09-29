
<template>
  <v-card class="mx-auto" style="text-align: center">
    <v-avatar class="profile" size="164" rounded>
      <v-img :src="imgUrl"></v-img>
    </v-avatar>

    <v-card-title style="display: block"> {{ profileName }} </v-card-title>

    <v-card-subtitle>{{ profileSubText }}</v-card-subtitle>
    <v-btn
      icon
      color="light-blue"
      :href="twitterUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      <v-icon>mdi-twitter</v-icon>
    </v-btn>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text v-html="profileText"> </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      imgUrl: "/images/profile/profile_image.png",
      profileName: "イザナギ",
      profileSubText: " 趣味：漫画、アニメ鑑賞、温泉旅行 ",
      profileText:
        "日々学習したことや気になったことを気まぐれに投稿しています。<br>趣味ブログ：https://izanagi-craft.com/",
      twitterUrl: process.env.TWITTER_URL,
    };
  },
};
</script>
