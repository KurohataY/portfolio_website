import LottieAnimation from "lottie-web-vue";

export default defineNuxtPlugin((app) => {
    app.vueApp.use(LottieAnimation);
});