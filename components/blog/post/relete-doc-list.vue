<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#29b6f6" dark>
          <v-card-title class="text-h5"> 関連記事(AI判定作成中)</v-card-title>
        </v-card>
      </v-col>

      <v-col v-for="(item, i) in relete" :key="i" cols="12">
        <nuxt-link color="orange lighten-2" :to="'/blog/' + item.id">
          <v-card>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h6"
                  v-text="item.title"
                ></v-card-title>

                <!-- <v-card-subtitle>関連度：{{ item.score }}</v-card-subtitle> -->
              </div>
            </div>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      relete: this.relete,
    };
  },
  mounted() {
    axios
      .get(`${this.$config.RELETE_DOC_API_URL}/${this.$route.params.p}`)
      .then((res) => {
        this.relete = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>