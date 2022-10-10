<template>
    <div class="post_box">
        <v-main>
            <div id="content_box">
                <BlogUiBreadcrumb :breadcrumbs="breadcrumbs" />
                <h1>{{ data.title }}</h1>
                <img :src="data.thumbnail.url" alt="" />
                <time id="date" :datetime="data.updatedAt">更新日: {{dateFormat}}</time>
                <article v-for="c in data.blogContent">
                    <div v-html="c.content"></div>
                    <div v-html="c.html"></div>
                </article>

                <client-only placeholder="読み込み中...">
                    <h2 id="realted_box_title">■関連記事(精度そんな良くないかもwww)</h2>
                    <ul id="related_title_list">
                        <li class="related_title" v-for="r in related_data"><a :href="'/blog/articles/' + r.id">{{
                        r.title
                        }}</a></li>
                    </ul>
                    <h2 id="topic_box_title">■関連トピック</h2>
                    <v-chip-group v-model="amenities" column multiple>
                        <v-chip filter outlined v-for="topic in topic_list" :to="'/blog/search?word=' + topic">
                            {{ topic }}
                        </v-chip>
                    </v-chip-group>
                </client-only>
            </div>
        </v-main>
        <aside id="toc_box">
            <BlogUiToc :blogContent='text' />
        </aside>
    </div>
</template>


<script setup>
import { hash } from "ohash"

const route = useRoute()
const config = useRuntimeConfig()

const { data } = await useFetch("/api/microcms", {
    params: { id: route.params.post_id },
    initialCache: false,
    key: hash(['api-fetch', "/api/microcms", "BlogPost"])
});

const date = new Date(data.value.updatedAt);
const dateFormat = date.getFullYear() + "年" + date.getMonth() + "月" + date.getDay() + "日";



let related_data = ref([]);
let topic_list = ref([]);

const amenomuboko = async () => {
    const related_title_url = config.RELETE_TITLES_API_URL_V2 + route.params.post_id;
    $fetch(related_title_url, {
        method: "GET",
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }).then((response) => {
        related_data.value = response;
    })

    const topic_url = config.TOPIC_API_URL + route.params.post_id;
    $fetch(topic_url, {
        method: "GET",
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }).then((response) => {
        topic_list.value = response["corpus"].split(",");
    });

}
amenomuboko()


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

let text = "";

for (const c of data.value.blogContent) {
    text += c.content
}

onMounted(() => {
    Prism.highlightAll();
})

</script>

<style lang="scss">
.post_box {
    background-color: #edf2f6;
    padding-top: 50px;
    display: flex;

    main {
        width: 70%;
        padding-left: 80px;

        #content_box {
            padding: 0 3vw;

            #date {
                display: block;
                padding-bottom: 20px;
                font-weight: bold;
                opacity: 0.5;
            }

            h1 {
                margin-bottom: 10px;
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
                padding-left: 20px;
            }

            h3,
            h4 {
                margin: 30px 0;
            }

            p {
                line-height: 3.5;
            }

            a:visited {
                color: #0707ED !important;
            }
        }
    }

    #toc_box {
        padding: 80px 20px 0 20px;
        width: 30%;
    }

    @media screen and (max-width: 640px) {
        main {
            width: 100%;
            padding-left: 0 !important;
        }

        #toc_box {
            width: 0;
            display: none;
        }
    }
}
</style>