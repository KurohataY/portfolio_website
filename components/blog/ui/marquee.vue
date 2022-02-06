<template>
  <div id="marquee-box" :style="durationTime">
    <div class="marquee d-flex flex-row">
      <div class="marquee-title text-center">
        <v-chip color="primary" label>
          <v-icon left> mdi-information-outline </v-icon>
          {{ title }}
        </v-chip>
      </div>
      <div class="marquee-text-box">
        <p class="marquee-text">
          <nuxt-link :to="'/blog/articles/' + this.list[0].id">
            {{ this.showText }}
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propsTextList: {
      type: Array,
      required: true,
    },
    time: {
      type: Number,
      required: false,
      default: 10000,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: this.propsTextList,
      showText: this.propsTextList[0].title,
      nextShowText: "",
    };
  },
  mounted() {
    setInterval(() => {
      this.showText = this.nextShowText;
      const tmp = this.list.shift();
      this.nextShowText = tmp.title;
      this.list.push(tmp);
    }, this.time);
  },
  computed: {
    durationTime() {
      return {
        "--duration-time": this.time + "ms",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
#marquee-box {
  width: 100%;

  div.marquee {
    div.marquee-title {
      height: 32px;
      margin: auto 0;
    }
    div.marquee-text-box {
      overflow: hidden;
      p.marquee-text {
        margin: 0;
        padding-left: 100vw;
        display: inline-block;
        white-space: nowrap;
        animation-name: marquee;
        animation-timing-function: linear;
        animation-duration: var(--duration-time);
        animation-iteration-count: infinite;
        color: black;
      }
    }
  }
}

@keyframes marquee {
  from {
    transform: translate(0%);
  }
  99%,
  to {
    transform: translate(-100%);
  }
}
</style>