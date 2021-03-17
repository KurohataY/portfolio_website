<template>
  <v-app dark>
    <div class="outer">
      <div id="error_box" class="inner">
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
        <NuxtLink to="/">
          トップ画面へ
        </NuxtLink>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'お探しのページは見つかりませんでした！\nほかの検索方法をお試しください',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style lang="scss"scoped>
h1 {
  font-size: 20px;
}
#error_box {
  text-align: center;
  border: solid 3px #6091d3;
  border-radius: 10px;
  width: 70vw;
}

.inner{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

}

.outer{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
