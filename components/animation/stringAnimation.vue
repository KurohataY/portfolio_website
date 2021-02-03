<template>
<div id="text-area"></div>
</template>

<script>
export default {
  props: [
    "frontMsg"
  ],
  data() {
    return {
      currentMsgArray: [],
    }
  },
  mounted() {
    //メッセージ一覧から取得する
    if (this.frontMsg.length === 0)
      return
    const currentTarget = this.frontMsg.slice(0, 1)
    //メッセージ一覧を一つ削除する
    this.frontMsg = this.frontMsg.slice(1)
    //メッセージを一文字ずつ分解して配列に入れる。
    this.currentMsgArray = Array.from(currentTarget[0])
    //メッセージを一文字ずつ表示する
    this.printChar()
  },
  methods: {
    printChar() {
      console.log("called!")
      if (this.currentMsgArray.length === 0)
        return
      let currentChar = this.currentMsgArray.slice(0, 1)
      document.getElementById('text-area').innerHTML += currentChar
      this.currentMsgArray = this.currentMsgArray.slice(1)
      setTimeout(this.printChar, 50)
    },

  },
}
</script>
