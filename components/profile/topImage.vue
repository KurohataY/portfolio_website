<template>
<div class="img-relative">
  <v-img style="opacity: 0.5" height="100vh" src="images/profile_bg.webp" />
  <p>Izanagi HomePage</p>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.img-relative {
    position: relative;
    p {
        position: absolute;
        color: white;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        margin: 0;
        padding: 0;
        font-family: lust-script, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 10vw;
        text-shadow: #000 2px 0, #000 -2px 0, #000 0 -2px, #000 0 2px, #000 2px 2px, #000 -2px 2px, #000 2px -2px, #000 -2px -2px, #000 1px 2px, #000 -1px 2px, #000 1px -2px, #000 -1px -2px, #000 2px 1px, #000 -2px 1px, #000 2px -1px, #000 -2px -1px, rgba(0, 0, 0, .5) 3px 3px 3px;
    }
}
</style>
