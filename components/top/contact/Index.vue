<template>
    <v-main>
        <v-container>
            <h2 id="contact_title" class="text-center text-h2">{{ title }}</h2>
            <div id="form_box">
                <TopContactForm />
            </div>
        </v-container>
    </v-main>
</template>

<script lang="ts" setup>
const title: String = "Contents"
</script>


<style lang="scss" scoped>
h2 {
    margin-bottom: 10vw;
    font-family: Great Vibes !important;
}

#form_box {
    margin-bottom: 10vw;
}

#contact_title {
    margin-top: 100px;
}
</style>