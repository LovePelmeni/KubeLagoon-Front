import App from './App.vue';
import { createApp } from "vue";
import router from "../router/router.js";
import store from "../store/store.js";

vue.$store = store
createApp(App).use(router).use(store).mount("#app")
