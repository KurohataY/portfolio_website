<template>
  <v-app>
    <v-main>
      <nuxt />
      <ContactModal />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    
  </v-app>
</template>

<script>
import ContactModal from '~/components/contact/contact-modal.vue'
export default {
  components: {
    ContactModal,
  },
  data() {
    return {
      fixed: false,
    }
  }
}
</script>
