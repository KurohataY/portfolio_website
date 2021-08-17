<template>
  <v-treeview open-all shaped :items="tocList">
    <template v-slot:label="{ item }">
      <n-link
        style="margin-right: 1em; text-decoration: none; color: black"
        v-scroll-to="`#${item.id}`"
        to
      >
        {{ item.name }}
      </n-link>
    </template>
  </v-treeview>
  <!-- カスタマイズバージョン -->
  <!-- <ul class="toc_lists">
    <li :class="`list ${toc.name}`" v-for="toc in toc" :key="toc.id">
      <n-link v-scroll-to="`#${toc.id}`" to>
        {{ toc.text }}
      </n-link>
    </li>
  </ul> -->
</template>

<script>
export default {
    props:["tocList"],
};
</script>

<style lang="scss" scoped>
</style>