<template>
  <v-app>
    <v-main id="top">
      <nuxt />
      <!-- <ContactModal /> -->
      <GoToTopButton :target="'#top'" />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    
  </v-app>
</template>

<script>
import ContactModal from '~/components/contact/contact-modal.vue'
import GoToTopButton from "~/components/ui/goToTopButton.vue";
export default {
  components: {
    // ContactModal,
    GoToTopButton,
  },
  data() {
    return {
      fixed: false,
    }
  }
}
</script>
