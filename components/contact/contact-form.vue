<template>
<v-container>
  <div class="text-left display-1">
    <h1>お問い合わせ</h1>
  </div>

    
    <v-form ref="form" v-model="valid" class="formrun" action="https://form.run/api/v1/r/c7wiuizwka3nctwy0bilygcg" method="post" @submit="validate" lazy-validation>
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="お名前" name="お名前" required></v-text-field>
      <v-text-field v-model="email" :rules="emailRules" label="メールアドレス" name="メールアドレス" required></v-text-field>
      <v-textarea rows="2" v-model="text" label="コメント" name="コメント" required></v-textarea>
      <v-btn color="error" class="mr-4" @click="reset">
        フォームリセット
      </v-btn>
      <v-btn color="success" type="submit">
        送信
      </v-btn>
    </v-form>

</v-container>
</template>

<style lang="scss">
h1 {
  font-size: 20px;
  font-family: lust-script, sans-serif;
  font-style: normal;
  font-weight: 700;
  text-shadow: #fff 2px 0, #fff -2px 0, #fff 0 -2px, #fff 0 2px, #fff 2px 2px, #fff -2px 2px, #fff 2px -2px, #fff -2px -2px, #fff 1px 2px, #fff -1px 2px, #fff 1px -2px, #fff -1px -2px, #fff 2px 1px, #fff -2px 1px, #fff 2px -1px, #fff -2px -1px, rgba(0, 0, 0, .5) 3px 3px 3px;
}
</style>

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
