<template>
<v-container class="text-center" >
  <v-row no-gutter>
    <v-col v-for="skill of skills" cols="12" sm="3">
      <v-card class="mx-auto" max-width="150" height="250">
        <v-img :src="skill.image" height="100px"></v-img>
        <v-card-title>{{ skill.language }}</v-card-title>
        <v-card-subtitle>
          <span v-for="framework of skill.frameworks">
            {{ framework }}
          </span>
        </v-card-subtitle>
        <v-card-text>
          {{skill.text}}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  data: () => ({
    show: true,
    skills: [{
      language: "JavaScript",
      frameworks: ["Nuxt.js", "Vue.js", "Vuetify.js"],
      image: "images/skills/javascript.webp",
      text: "",
    }, {
      language: "HTML",
      frameworks: ["　"],
      image: "images/skills/html.webp",
      text: "",
    }, {
      language: "CSS",
      frameworks: ["　"],
      image: "images/skills/css.webp",
      text: "",
    }, {
      language: "Ruby",
      frameworks: ["RubyonRails"],
      image: "images/skills/ruby.webp",
      text: "",
    }, {
      language: "Python",
      frameworks: ["Flask"],
      image: "images/skills/python.webp",
      text: "",
    }, {
      language: "Java",
      frameworks: ["Spring"],
      image: "images/skills/java.webp",
      text: "",
    }, {
      language: "Swift",
      frameworks: ["UIkit", "SwiftUI"],
      image: "images/skills/swift.webp",
      text: "",
    }, {
      language: "Golang",
      frameworks: ["Gin"],
      image: "images/skills/go.webp",
      text: "",
    }, ],
  })
}
</script>

<style lang="scss" scoped>
</style>
