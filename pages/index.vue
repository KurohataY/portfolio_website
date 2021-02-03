<template>
<v-container v-if="loading">
  <article>
    <Lottie :options='lottieOptions' :loading="loading"></Lottie>
  </article>
</v-container>
<article v-else>
  <Navi />
  <ProfileCard id="profile" />
  <v-container>
    <Profile />
  </v-container>
  <div class="top_padding">
    <div class="blue lighten-4">
      <v-container>
        <SkillsCard />
      </v-container>
    </div>
  </div>
  <v-container>
    <Products calss="top_padding" />
  </v-container>
  <Form class="top_padding" />
  </div>

</article>
</template>

<script>
import Navi from '~/components/nav/navbar.vue'
import Lottie from '~/components/animation/loadingLottie.vue'
import ProfileCard from '~/components/profile/profileCard.vue'
import Profile from '~/components/profile/profile.vue'
import Products from '~/components/product/product.vue'
import SkillsCard from '~/components/skill/skills.vue'
import Form from '~/components/form/form.vue'


export default {
  components: {
    Navi,
    Lottie,
    ProfileCard,
    Profile,
    Products,
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
