
<template>
    <v-container class="mx-auto" id="skils_box">
        <h2 class="text-center text-h2">Information</h2>
        <v-row justify="space-around">
            <v-col>
                <v-card class="mx-auto" width="300" height="500">
                    <v-img src="/images/profile/profile_image.png" height="300px"></v-img>

                    <v-card-title class="pt-4">プロフィール</v-card-title>
                    <v-card-text>
                        <div>サイト運営：Izanagi</div>
                        <div>趣味：温泉・日本酒・ラーメン巡り</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            icon="mdi-twitter"
                            color="light-blue"
                            href="https://twitter.com/izanagiblog"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                        ></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col v-show="display.width.value > 960">
                <v-card class="mx-auto text-center" max-width="500" height="500">
                    <TopUiCalendar />
                </v-card>
            </v-col>
            <v-col v-show="display.width.value > 960">
                <form method="get">
                    <input name="search" type="text" required v-model="word" />
                    <v-btn
                        icon="mdi-magnify"
                        color="light-blue"
                        @click="navigate"
                        rel="noopener noreferrer"
                        size="small"
                    ></v-btn>
                </form>

                <TopUiTags />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
const display = useDisplay();

const word = ref('');

const navigate = (() => {
    return navigateTo({
        path: '/blog/search',
        query: {
            word: word.value,
        }
    })
})

</script>

<style lang="scss" scoped>
#skils_box {
    margin-top: 20vw;
}
h2 {
    margin-bottom: 10vw;
    font-family: Great Vibes !important;
}
</style>