<template>
<!-- <v-card class="mx-auto" relative min-width="50vw" tile>
  <v-img style="opacity: 0.5" height="100vh" src="images/profile_bg.webp">
    <v-row align="end" class="fill-height">
      <v-col class="py-6">
        <v-list-item color="white" dark>
          <v-list-item-content>
            <v-list-item-title class="title">
              イザナギ(Web Developer)
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-img>
  <v-row align="end" class="fill-height">
    <v-col align-self="start" class="pa-6" cols="12">
      <v-avatar class="profile" color="grey" size="324">
        <v-img src="images/profile.webp"></v-img>
      </v-avatar>
    </v-col>
    <v-col class="py-6">
      <v-list-item color="rgba(0, 0, 0, .4)" dark>
        <v-list-item-content>
          <v-list-item-title class="title">
            イザナギ(Web Developer)
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-col>
  </v-row>
</v-card> -->
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
@import url("https://use.typekit.net/ttj5ikc.css");
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
        font-size: 6rem;
        text-shadow: #000 2px 0, #000 -2px 0, #000 0 -2px, #000 0 2px, #000 2px 2px, #000 -2px 2px, #000 2px -2px, #000 -2px -2px, #000 1px 2px, #000 -1px 2px, #000 1px -2px, #000 -1px -2px, #000 2px 1px, #000 -2px 1px, #000 2px -1px, #000 -2px -1px, rgba(0, 0, 0, .5) 3px 3px 3px;
    }
}
</style>
