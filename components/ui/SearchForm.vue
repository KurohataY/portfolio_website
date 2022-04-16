<template>
    <div class="search_box">
        <form method="get" action="/blog/search">
            <input name="word" type="text" required v-model="word" :placeholder="placeholder" />
            <v-btn icon="mdi-magnify" color="light-blue" rel="noopener noreferrer" size="small" type="submit">
            </v-btn>
        </form>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    placeholder: String
})

const placeholder = props.placeholder;

const word = ref('');
</script>

<style lang="scss" scoped>
.search_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 5px;

    form {
        input {
            width: 85%;
            height: 40px;
            border-style: double !important;

            &:focus {
                outline: 0;
            }
        }

        button {
            top: -3px;
        }
    }
}
</style>