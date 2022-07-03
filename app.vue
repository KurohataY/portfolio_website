<template>
  <v-app id="top">
    <NuxtPage />
    <UiGoToTopButton :target="'#top'" />
    <UiOverlayMenu />
    <UiOverlayCalendar />
  </v-app>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
#top:first-child > div:first-child > div:first-child {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}
</style>