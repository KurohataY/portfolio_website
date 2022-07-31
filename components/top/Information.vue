
<template>
    <v-container class="mx-auto" id="skils_box">
        <h2 class="text-center text-h2">{{ information.title }}</h2>
        <v-row justify="space-around">
            <v-col>
                <v-card class="mx-auto" max-width="250" height="500">
                    <v-img :src="information.imgUrl" height="250px"></v-img>

                    <v-card-title class="pt-4">{{ information.profile.title }}</v-card-title>
                    <v-card-text>
                        <div v-for="c in information.profile.contents" :key="c">{{ c }}</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn icon="mdi-twitter" color="light-blue" :href="information.twitterUrl" target="_blank"
                            rel="noopener noreferrer" size="small" aria-label="Twitter Link"></v-btn>
                        <v-btn icon="mdi-calendar-account" size="small" @click="onClickLink" aria-label="Carender">

                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col class="d-none d-md-flex">
                <v-card class="mx-auto text-center" max-width="250" height="500">
                    <TopUiLatestBlogs :contents="blogContents" />
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-auto text-center" max-width="250" height="500">
                    <UiSearchForm :placeholder="information.search.placeholder" :suggest-num="information.search.suggest.num" />
                    <TopUiTags :tag-list="tagList" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { hash } from 'ohash'

const config = useRuntimeConfig();
const { stateValue, updateState } = useOverlayCalendar();


const information = {
    title: "Information",
    imgUrl: "/images/profile/profile_image.png",
    profile: {
        title: "プロフィール",
        contents: ["サイト運営：Izanagi", "趣味：温泉・日本酒・ラーメン巡り"],
    },
    twitterUrl: 'https://twitter.com/' + config.TWITTER_MY_USER_ID,
    search: {
        placeholder: "ブログ内を検索",
        suggest: {
            num: 5,
            tags: ""
        },
    },
    overlayCalendar: ref(stateValue.value),
    latestBlogContentNum: 5,
}


const onClickLink = () => {
    updateState(!information.overlayCalendar.value);
};


const { data } = await useFetch("/api/microcms", {
    params: {
        limit: 1000,
    },
    initialCache: false,
    key: hash(['api-fetch', "/api/microcms", "Information"])
});

data.value["contents"].forEach((element) => information.search.suggest.tags += element.tags)
const tagList = Array.from(new Set(information.search.suggest.tags.split(","))).join(",").split(",");

const blogContents = data.value["contents"].slice(0, information.latestBlogContentNum)

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