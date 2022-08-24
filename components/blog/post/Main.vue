<template>
    <v-main>
        <BlogUiBreadcrumb :breadcrumbs="breadcrumbs" />
        <div id="post_box">
            <h1>{{ data.title }}</h1>
            <article v-for="c in data.blogContent">
                <div v-html="c.content"></div>
                <div v-html="c.html"></div>
            </article>
            <h2 id="realted_box_title">■関連記事(精度そんな良くないかもwww)</h2>
            <client-only>
                <ul id="related_title_list">
                    <li class="related_title" v-for="r in related_data"><a :href="'/blog/articles/' + r.id">{{ r.title
                    }}</a></li>
                </ul>
            </client-only>

            <h2 id="topic_box_title">■関連トピック</h2>
            <client-only>
                <v-chip-group v-model="amenities" column multiple>
                    <v-chip filter outlined v-for="topic in topic_list" :to="'/blog/search?word=' + topic">
                        {{ topic }}
                    </v-chip>
                </v-chip-group>
            </client-only>
        </div>
    </v-main>
</template>


<script setup>
import { hash } from "ohash"
import axios from "axios"

const route = useRoute()
const config = useRuntimeConfig()

const { data } = await useFetch("/api/microcms", {
    params: { id: route.params.post_id },
    initialCache: false,
    key: hash(['api-fetch', "/api/microcms", "BlogPost"])
});
const title = data.value.title;
const description = !!data.value.description ? data.value.description : data.value.blogContent[0].content.replace(/(<([^>]+)>)/gi, '').substr(0, 150) + "...";
const thumbnail = data.value.thumbnail.url;


let related_data = ref([])
axios.get(config.RELETE_TITLES_API_URL + data.value.id, {
}).then(function (response) {
    related_data.value = response.data;
}).catch(err => {
    console.log('err:', err);
});

let topic_list = ref([])
axios.get(config.TOPIC_API_URL + data.value.id, {
}).then(function (response) {
    topic_list.value = response.data["corpus"].split(",");
}).catch(err => {
    console.log('err:', err);
});



const url = config.HOMEPAGE_ROOT_URL + route.fullPath;

const breadcrumbs = [
    {
        text: 'TOP',
        disabled: false,
        href: '/',
    },
    {
        text: '記事一覧',
        disabled: false,
        href: '/blog/pages/1',
    },
    {
        text: title,
        disabled: true,
    },
];

useHead({
    title: title,
    meta: [
        { property: 'og:title', hid: 'og:title', content: title },
        { name: 'description', hid: 'description', content: description },
        { property: 'og:description', hid: 'og:description', content: description },
        { property: 'og:image', hid: 'og:image', content: thumbnail },
        { property: 'og:url', hid: 'og:url', content: url },
    ],
})


onMounted(() => {
    Prism.highlightAll();
})

</script>

<style lang="scss">
#post_box {
    padding: 50px 20vw;
    background-color: #edf2f6;


    h1 {
        margin-bottom: 75px;
    }

    h2 {
        margin: 45px 0;

        &#realted_box_title,
        &#topic_box_title {
            color: #59adf1;
            font-weight: bold;
        }

    }

    ul#related_title_list {
        background: inherit;
        border-radius: 0px;
        box-shadow: none;
    }

    h3,
    h4 {
        margin: 30px 0;
    }

    p {
        line-height: 3.5;
    }

    ul,
    ol {
        background: #fffcf4;
        border-radius: 8px;
        box-shadow: 0px 0px 5px silver;
        padding: 0.5em 0.5em 0.5em 2em;
    }

    ul li,
    ol li {
        line-height: 1.5;
        padding: 0.5em 0;
    }

    a:visited {
        color: #0707ED !important;
    }
}
</style>