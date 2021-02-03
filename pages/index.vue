<template>
<v-container v-if="loading">
  <article>
    <Lottie :options='lottieOptions' :loading="loading"></Lottie>
  </article>
</v-container>
<article v-else>
  <!-- <v-img lazy-src="images/bg_pic-m.webp" max-height="300" max-width="100%" src="images/bg_pic-m.webp"></v-img> -->
  <ProfileCard id="profile"/>
  <v-container>
    <Profile />
  </v-container>
  <div class="top_padding">
    <div class="blue lighten-4 ">
      <v-container>
        <SkillsCard />
      </v-container>
    </div>
  </div>
  <Form />
</article>
</template>

<script>
import Lottie from '~/components/animation/loadingLottie.vue'
import ProfileCard from '~/components/profile/profileCard.vue'
import Profile from '~/components/profile/profile.vue'
import SkillsCard from '~/components/skills.vue'
import Form from '~/components/form/form.vue'


export default {
  components: {
    Lottie,
    ProfileCard,
    Profile,
    SkillsCard,
    Form
  },
  data() {
    return {
      loading: true,
    }
  },
  asyncData() {
    return {
      lottieOptions: {
        animationData: require(`~/assets/animation/loadingAnimation.json`)
      }
    }
  },
}
</script>

<style media="screen" scoped>
.top_padding {
  padding-top: 20px;
}
</style>
