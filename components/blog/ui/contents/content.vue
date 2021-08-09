<template lang="">
    <div>
        <h1>{{title}}</h1>
        <div v-for="bc in blogContent" :key="bc.fluid">
            <div v-html="bc.content"></div>
            <div v-html="bc.html"> </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String, 
        blogContent: Object,
    },
};
</script>
<style lang="">
</style>