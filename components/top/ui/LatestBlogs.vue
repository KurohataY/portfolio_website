<template>
    <div id="latestBlog">
        <h2>最新記事</h2>
        <ol>
            <li v-for="c in data['contents']">
                <a :href="`/blog/articles/${c.id}`">{{ c.title }}</a>
            </li>
        </ol>
    </div>
</template>

<script setup>
let { data } = useFetch("/api/microcms", {
    params: {
        limit: 5,
    },
})
</script>

<style lang="scss" scoped>
#latestBlog {
    h2 {
        padding-top: 10px;
    }
    ol {
        counter-reset: num;
        list-style-type: none !important;
        padding: 0;
        margin: 0;
        padding: 10px;

        li {
            position: relative;
            padding-left: 30px;
            line-height: 1.5em;
            padding: 0.5em 0.5em 0 30px;
            

            &:first-child {
                margin-top: 45px;
            }

            &:nth-child(n + 2) {
                margin: 45px 0;
            }

            a {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: inherit;
                

                &:before {
                    position: absolute;
                    counter-increment: num;
                    content: counter(num);
                    display: inline-block;
                    background: #39A9F4;
                    border: #39A9F4 1px solid;
                    color: #fff;
                    font-family: 'Arial', sans-serif;
                    font-weight: bold;
                    font-size: 14px;
                    border-radius: 50%;
                    left: 0;
                    width: 22px;
                    height: 22px;
                    line-height: 22px;
                    text-align: center;
                    top: 10px;
                }
                &:visited, &:hover, &:active {
                    color: inherit;
                }
            }


        }
    }
}
</style>