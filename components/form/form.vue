<template>
<v-container>
  <div class="text-left display-1">
    <h1>お問い合わせ</h1>
  </div>
  <v-row id="form" no-gutter>
    <v-col cols="12" sm="2">
    </v-col>
    <v-col cols="12" sm="8">
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
    </v-col>
    <v-col cols="12" sm="2">
    </v-col>
  </v-row>
</v-container>
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
      var result = confirm('フォーム内容を送信しますか？OKを押すと送信されます！');
      if (result) {
        submit(this.$refs.form.validate())
      } else {
        alert('フォーム内容を送信しませんでした...')
      }
    },
    submit(validate) {
      if (!validate) {
        this.isError = true
        event.preventDefault()
        alert('フォーム内容を送信できませんでした...')
      }
    },
    reset() {
      this.$refs.form.reset()
    },
  }
}
</script>
