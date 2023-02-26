import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";
import LottieAnimation from "lottie-web-vue";

const app = createApp(App);

app.use(router);
app.use(LottieAnimation);
app.mount("#app");
