<template>
    <div id="post">
        <v-layout>
            <TheHeader />
            <BlogPostMain />
        </v-layout>
        <TheFooter />
    </div>
</template>

<!-- <script setup>
const route = useRoute()
console.log(route.params.post_id)
</script> -->

<style lang="scss" scoped>
#post {
    background-color: #EDF2F6;
}
</style>