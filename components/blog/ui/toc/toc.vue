<template>
  <div style="margin: 50px 0; padding: 10px">
    <div v-if="tocCount > 0">
      <h2>目次</h2>
      <v-list>
        <v-treeview open-all shaped :items="tocList">
          <template v-slot:label="{ item }">
            <n-link
              style="margin-right: 1em; text-decoration: none; color: black"
              v-scroll-to="`#${item.id}`"
              to
              v-text="item.name"
              class="v-treeview-itme"
              :class="themeClasses()"
            >
            </n-link>
          </template>
        </v-treeview>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tocList", "tocCount"],
  methods: {
    themeClasses() {
      return this.$store.state.theme ? "theme--light" : "theme--dark";
    },
  },
};
</script>

<style lang="scss" scoped>
a.v-treeview-itme.theme--light {
  color: white !important;
}
a.v-treeview-itme.theme--dark {
  color: black !important;
}
</style>