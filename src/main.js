global.jQuery = require('jquery');

import App from './App.vue';
import store from "../store/store.js";

import Vuex from 'vuex'
import { createApp } from 'vue/dist/vue.esm-bundler';
import { router } from './router/index'

const app = createApp(App).use(router)
app.use(store)
app.use(Vuex)

app.mount('#app')
