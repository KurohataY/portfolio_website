<template>
    <div id="search_page">
        <TheHeader />
        <BlogSearchMain />
        <TheFooter />
    </div>
</template>

<script lang="ts" setup>
useHead({
    meta: [
        { name: 'robots', content: 'noindex,nofollow' }
    ],
})
</script>
