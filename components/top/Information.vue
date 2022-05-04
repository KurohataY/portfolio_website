
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
                        <v-btn icon="mdi-twitter" color="light-blue" :href="'https://twitter.com/' + twitterUrl"
                            target="_blank" rel="noopener noreferrer" size="small" aria-label="Twitter Link"></v-btn>
                        <v-btn icon="mdi-calendar-account" size="small" @click="onClickLink" aria-label="Carender">
                            予定表
                        </v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-auto text-center" max-width="300" height="500">
                    <UiSearchForm :placeholder="placeholder" :tagsList="tagsList" />
                    <TopUiTags :tagsList="tagsList" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
const { stateValue, updateState } = useOverlayCalendar();

const placeholder = "ブログ内を検索"


let overlay = ref(stateValue.value);

const onClickLink = () => {
    updateState(!overlay.value);
};

const props = defineProps({
    tagsList: Object
})

const tagsList = props.tagsList;

const config = useRuntimeConfig();

const twitterUrl = config.TWITTER_MY_USER_ID

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