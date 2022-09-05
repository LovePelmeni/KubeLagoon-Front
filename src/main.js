import App from './App.vue';
import router from "../router/router.js";
import store from "../store/store.js";

import Vuex from 'vuex'
import { createApp } from 'vue/dist/vue.esm-bundler'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Vuex)
app.mount('#app')
