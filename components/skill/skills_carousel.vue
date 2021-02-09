<template>
<v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hove>
  <template v-slot:prev="{ on, attrs }">
    <v-btn color="success" v-bind="attrs" v-on="on">Previous slide</v-btn>
  </template>
  <template v-slot:next="{ on, attrs }">
    <v-btn color="info" v-bind="attrs" v-on="on">Next slide</v-btn>
  </template>
  <v-carousel-item v-for="(skill,i) in skills" :key="`first-${i}`">
      <v-card class="mx-auto" max-width="400" height="400">
        <v-img :aspect-ratio="1/1" :src="skill.image" height="300px" class="light-green accent-2"></v-img>
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
  </v-carousel-item>
</v-carousel>
</template>

<script>
export default {
  data() {
    return {
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
    }
  },
}
</script>
