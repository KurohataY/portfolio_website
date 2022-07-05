<template>
  <v-app id="top">
    <NuxtPage />
    <UiGoToTopButton :target="'#top'" />
    <UiOverlayMenu />
    <UiOverlayCalendar />
  </v-app>
</template>

<script lang="ts" setup>
useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Izanagi's site` : `Izanagi's site`;
    }
  })
</script>

<style lang="scss">
#top:first-child > div:first-child > div:first-child {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}
</style>