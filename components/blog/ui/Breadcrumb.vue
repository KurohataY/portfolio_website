<template>
    <div id="breadcrumbs_box">
        <ul id="breadcrumbs_list" itemscope itemtype="https://schema.org/BreadcrumbList">
            <li
                v-for="(item, index) in breadcrumbs"
                class="breadcrumbs_item"
                itemscope
                itemtype="https://schema.org/ListItem"
            >
                <a v-if="!item.disabled" itemprop="item" :href="item.href">{{ item.text }}</a>
                <span v-else itemprop="item">{{ item.text }}</span>
                <v-icon v-if="!item.disabled" icon="mdi-chevron-right"></v-icon>
                <meta itemprop="position" :content="index + 1" />
            </li>
        </ul>
    </div>
</template>


<script setup lang="ts">

const props = defineProps({
    breadcrumbs: Object
})

const breadcrumbs: Object = props.breadcrumbs


</script>

<style lang="scss" scoped>
#breadcrumbs_box {
    background-color: #edf2f6;
    padding: 20px 0;
    ul#breadcrumbs_list {
        padding-left: 0 !important;
        font-size: 12px;
        li.breadcrumbs_item {
            display: inline-block;
            i {
                padding: 0 10px;
            }
            span {
                font-weight: bold;
            }
        }
    }
}
</style>