<template>
<v-form ref="form" v-model="valid" class="formrun" action="https://form.run/api/v1/r/c7wiuizwka3nctwy0bilygcg" method="post" @submit="validate" lazy-validation>
  <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" name="お名前" required></v-text-field>

  <v-text-field v-model="email" :rules="emailRules" label="E-mail" name="メールアドレス" required></v-text-field>

  <v-text-field v-model="text" label="Text" name="コメント" required></v-text-field>

  <v-btn color="error" class="mr-4" @click="reset">
    Reset Form
  </v-btn>

  <v-btn color="success" type="submit">
    Submit
  </v-btn>
</v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    text: "",
    select: null,
  }),

  methods: {
    validate() {
      if (!this.$refs.form.validate()) {
        this.isError = true
        event.preventDefault()
      }

    },
    reset() {
      this.$refs.form.reset()
    },
  }
}
</script>
