<template>
    <div id="toc_list">
        <h2>目次</h2>
        <BlogUiTocNode :tocList="tocList" />
    </div>
</template>

<script setup>
const props = defineProps({
    blogContent: String
});

let tag_val = "h.";

const pattern = new RegExp("<" + tag_val + "(?: .+?)?>.*?<\/" + tag_val + ">", "g");
const blogContent = props.blogContent.match(pattern)

let h2Flag = 0;
let h3Flag = 0;
let h4Flag = 0;
let tocList = [];

blogContent.forEach(function (t) {
    let item = {
        id: "",
        name: "",
        children: [],
    };
    item.name = t.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
    item.id = t.match(/\"(.+)\"/)[1]

    if (t.includes("h2")) {
        h2Flag++;
        tocList.push(item);
    } else if (t.includes("h3")) {
        tocList[h2Flag - 1].children[h3Flag] = item;
        h3Flag += 1;
    } else if (t.includes("h4")) {
        tocList[h2Flag - 1].children[h3Flag - 1].children[h4Flag] = item;
        h4Flag += 1;
    }
});

</script>


<style lang="scss" scoped>
</style>