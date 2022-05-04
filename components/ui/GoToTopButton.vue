<template>
  <transition name="fade">
    <section class="section">
      <div class="section__inner">
        <div class="section__button-wrapper">
          <button
            type="button"
            data-micromodal-trigger="modal-1"
            class="button material-icons modal__open"
            @click="scrollTop"
            :class="{ 'show-scroll': scrollHeader }"
            aria-label="Go To Top"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </button>
        </div>
      </div>
    </section>
  </transition>
</template>

<script setup>

let scrollHeader = ref(false)

function showScrollTop() {
  if (window.scrollY >= 560) {
    scrollHeader.value = true
  } else {
    scrollHeader.value = false
  }
}

function scrollTop() {
  if (window.scrollY >= 560) {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
onMounted(() => {
  window.addEventListener("scroll", showScrollTop, { passive: true })
})



</script>

<style lang="scss">
section.section {
  position: fixed;
  top: 85%;
  right: 10px;
  z-index: 1000;
}
.button {
  opacity: 0;
  transition: 0.5s;
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
.show-scroll {
  opacity: 1;
}
</style>