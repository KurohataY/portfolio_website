<template>
    <div id="suggest_list">
        <template v-for="(t, index) in tagsList">
            <div v-if="Number(index) < 10" @click="handleClick(t)">{{ t }}</div>
        </template>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    tagsList: Object,
    word: String
})
let tagsList = ref(props.tagsList);

const handleClick = (word) => {
    emit('update:modelValue', word);
    emit('submit', word);
}

const emit = defineEmits(['update:modelValue', 'submit']);



</script>
<style lang="scss" scoped>
#suggest_list {
    z-index: 10000;
    background: #fff;
    width: 85%;

    div {
        border: 0.1px solid;
    }
}
</style>
