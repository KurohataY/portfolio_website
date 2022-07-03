<template>
    <v-app id="top">
        <div id="error_page">
            <TheHeader />
            <v-main>
                <div id="error_box">
                    <h1>404</h1>
                    <h2>お探しのページは見つかりませんでした。</h2>
                    <div class="button_list">
                        <v-btn rounded="pill" onclick="location.href='/'">トップページに戻る</v-btn>
                        <v-btn rounded="pill" onclick="location.href='/blog/pages/1'">ブログトップページに戻る</v-btn>
                    </div>
                </div>
            </v-main>
            <TheFooter />
        </div>
    </v-app>
</template>


<script lang="ts" setup>

</script>



<style lang="scss" scoped>
#error_box {
    display: table;
    position: fixed;
    inset: 0;
    margin: 100px auto;


    h1,
    h2 {
        text-align: center;
    }

    h1 {
        margin-bottom: 25px;
        font-size: 60px;
    }

    h2 {
        font-size: 30px;
    }
}

.button_list {
    display: flex;
    justify-content: space-around;
    margin-top: 100px;
}
</style>


