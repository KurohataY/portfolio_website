<template>
    <div class="scrolldown3">
        <span>{{ text }}</span>
    </div>
</template>

<script setup lang="ts">
const text: string = "Scroll"
</script>

<style lang="scss" scoped>
/*========= スクロールダウンのためのCSS ===============*/

/*=== 9-1-3 マウスが動いてスクロールを促す ====*/

/*スクロールダウン全体の場所*/
.scrolldown3 {
    /*描画位置※位置は適宜調整してください*/
    position: absolute;
    bottom: 0;
    right: 50%;
    /*マウスの動き1.6秒かけて動く永遠にループ*/
    animation: mousemove 1.6s ease-in-out infinite;
    z-index: 10;
}

@media (max-width: 768px) {
    .scrolldown3 {
        display: none;
    }
}

/*下からの距離が変化して上から下に動く*/
@keyframes mousemove {
    0% {
        bottom: 20vw;
    }

    50% {
        bottom: 19vw;
    }

    100% {
        bottom: 20vw;
    }
}

/*Scrollテキストの描写*/
.scrolldown3 span {
    /*描画位置*/
    position: absolute;
    left: -15px;
    top: 85px;
    /*テキストの形状*/
    color: #fff;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
}

/*マウスの中の線描写 */
.scrolldown3 span::after {
    content: "";
    /*描画位置*/
    position: absolute;
    left: 17px;
    /*線の形状*/
    width: 1px;
    height: 15px;
    background: #fff;
    /*線の動き1.4秒かけて動く。永遠にループ*/
    animation: mousepathmove 1.4s linear infinite;
    opacity: 0;
}

/*上からの距離・不透明度・高さが変化して上から下に流れる*/
@keyframes mousepathmove {
    0% {
        height: 0;
        top: 10px;
        opacity: 0;
    }

    50% {
        height: 15px;
        opacity: 1;
    }

    100% {
        height: 0;
        top: 30px;
        opacity: 0;
    }
}

/*マウスの描写 */
.scrolldown3:before {
    content: "";
    /*描画位置*/
    position: absolute;
    top: 115px;
    left: -10px;
    /*マウスの形状*/
    width: 25px;
    height: 37px;
    border-radius: 10px;
    border: 3px solid #fff;
}

/*マウスの中の丸の描写*/
.scrolldown3:after {
    content: "";
    /*描画位置*/
    position: absolute;
    top: 120px;
    left: 0;
    /*丸の形状*/
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: 3px solid #fff;
}
</style>