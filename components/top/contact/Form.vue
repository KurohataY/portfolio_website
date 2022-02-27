<template>
    <v-container fluid>
        <form :action="formRunUrl" method="post">
            <v-row>
                <v-col cols="4">
                    <div>Your Full Name</div>
                </v-col>
                <v-col cols="8">
                    <div class="cp_iptxt">
                        <input name="お名前" class="ef" type="text" placeholder v-model="formData.name" required />
                        <span class="focus_line"></span>
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="4">
                    <div>Your Email</div>
                </v-col>
                <v-col cols="8">
                    <div class="cp_iptxt">
                        <input name="メールアドレス" class="ef" type="text" placeholder v-model="formData.email" required />
                        <span class="focus_line"></span>
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="4">
                    <div>Comment</div>
                </v-col>
                <v-col cols="8">
                    <div class="cp_iptxt">
                        <textarea name="コメント" v-model="formData.comment" required />
                    </div>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-btn color="secondary" type="submit"> submit </v-btn>
            </v-row>
        </form>
    </v-container>
</template>

<script setup>
let formData = ref({
    "name": '',
    "email": '',
    "comment": '',
})
const config = useRuntimeConfig()

const formRunUrl = "https://form.run/api/v1/r/" + config.FORM_RUN_URL;

</script>

<style lang="scss" scoped>
.cp_iptxt {
    position: relative;
}
.cp_iptxt input {
    font: 15px/24px sans-serif;
    box-sizing: border-box;
    width: 100%;
    letter-spacing: 1px;
}
.cp_iptxt input:focus {
    outline: none;
}
.ef {
    padding: 4px 0;
    border: 0;
    border-bottom: 1px solid #1b2538;
    background-color: transparent;
}
.ef ~ .focus_line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    transition: 0.4s;
    background-color: #3f3cda;
}
.ef:focus ~ .focus_line,
.cp_iptxt.ef ~ .focus_line {
    width: 100%;
    transition: 0.4s;
}

.v-row {
    margin: 60px 0;
}

textarea {
    resize: none;
    border: 1px solid;
    width: 100%;
    height: 200px;
}
</style>