<template>
<transition name="fade">
  <section class="section" v-scroll="onScroll" v-show="fab">
    <div class="section__inner">
      <div class="section__button-wrapper">
        <button
          type="button"
          data-micromodal-trigger="modal-1"
          class="button material-icons modal__open"
          @click="$vuetify.goTo(target, options)"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </button>
      </div>
    </div>
  </section>
  </transition>
</template>

<script>
export default {
  props: {
    target: {
      type: String,
      required: true,
    },
    offset: {
      type: Number,
      required: false,
      default: 0,
    },
    duration: {
      type: Number,
      required: false,
      default: 1000,
    },
    easing: {
      type: String,
      required: false,
      default: "easeInOutCubic",
    },
  },
  data() {
    return {
      fab: false,
    };
  },
  computed: {
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 500;
    },
  },
};
</script>

<style lang="scss">
section.section {
  position: fixed;
  top: 85%;
  right: 10px;
  z-index: 5;
}
.button {
  i {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    border: solid;
    font-size: 50px !important;
  }
  &:hover,
  &:focus {
    background: transparent;
    color: #000;
  }
}

.fade-enter-active, .fade-leave-active {
  opacity: 1.0;
  transition: 0.5s;
} 
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>