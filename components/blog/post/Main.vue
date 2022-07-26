<template>
    <v-main>
        <BlogUiBreadcrumb :breadcrumbs="breadcrumbs" />
        <div id="post_box">
            <h1>{{ data.title }}</h1>
            <article v-for="c in data.blogContent">
                <div v-html="c.content"></div>
                <div v-html="c.html"></div>
            </article>
        </div>
    </v-main>
</template>


<script setup>
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-properties'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-ruby'

import 'clipboard'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.css'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

import 'prismjs/plugins/show-language/prism-show-language'

import { hash } from "ohash"

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
// nextTick(async() => await Prism.highlightAll());

</script>

<style lang="scss">
#post_box {
    padding: 50px 15vw;
    background-color: #edf2f6;

    h1 {
        margin-bottom: 75px;
    }

    h2 {
        margin: 45px 0;
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
}
</style>