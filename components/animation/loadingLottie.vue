<template>
<div class="animationItem" ref="animationContainer"></div>
</template>

<script>
import lottie from 'lottie-web'
export default {
  props: [
    'options',
    'loading',
  ],
  mounted() {
    const animationEvt = () => {
      const anim = lottie.loadAnimation({
        container: this.$refs.animationContainer,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: this.options.animationData
      })
      anim.addEventListener('complete', () => {this.$parent.loading = false})
    }
    const AnimStorage = () => {
      if (sessionStorage.getItem('access')) {
        // 初回アクセス以外の処理
        this.$parent.loading = false
      } else {
        // 初回アクセス時の処理
        animationEvt()
        sessionStorage.setItem('access', 0)
      }
    }
    AnimStorage()
  }
}
</script>
