
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
                        <v-btn icon="mdi-twitter" color="light-blue" href="https://twitter.com/izanagiblog"
                            target="_blank" rel="noopener noreferrer" size="small"></v-btn>
                        <div class="text-center">
                            <v-dialog v-model="dialog" max-height="500px">
                                <template v-slot:activator="{ props }">
                                    <v-btn icon="mdi-calendar-account" size="small" v-bind="props">
                                        予定表
                                    </v-btn>
                                </template>
                                <v-card class="pa-4">
                                    <TopUiCalendar />
                                </v-card>
                            </v-dialog>
                        </div>

                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-auto text-center" max-width="300" height="500">
                    <UiSearchForm :placeholder="placeholder" />
                    <TopUiTags />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const dialog = ref(false)
const display = useDisplay();
const placeholder = "ブログ内を検索"

</script>

<style lang="scss" scoped>
#skils_box {
    margin-top: 20vw;
}

h2 {
    margin-bottom: 10vw;
    font-family: Great Vibes !important;
}

.v-overlay__content {
    max-width: 500px;
}
</style>