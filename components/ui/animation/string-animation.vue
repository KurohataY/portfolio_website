<template>
  <div class="TextAnime1">
    <span
      v-for="(t, index) in text"
      :key=t
      class="item mb-5"
      :style="{animationDelay: index*50+'ms'}"
      v-text="t"
      />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'みなさんこんにちは！今年上京してきました。イザナギと申します。このサイトは、ポートフォリオサイトです。簡単に自己紹介するために作成しました。私の趣味は漫画・アニメ・動画鑑賞やバイクでのツーリングや温泉など様々ありますが、温泉が一番好きですね！温泉に入ると肩こりが治りやすく、心が落ち着きますwww。現在は様々なWebサイトを作成したりしております。開発したものはGitHubに、開発中の記録はブログに上げています。',
    }
  }
}
</script>

<style scoped>
@keyframes text-in {
  0% {
    transform: translate(0, -20px);
    opacity: 0;
  }
}
.item {
  display: inline-block;
  font-size: 2vw;
  color: #000;
  font-weight: bold;
  animation: text-in .8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
}
</style>
