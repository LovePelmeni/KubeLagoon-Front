import { createApp } from 'vue';
import App from './App.vue';

import router from "../router/router.js";
import store from "../store/store.js";

import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex)
const newStore = Vuex.Store(store)
Vue.prototype.$store = newStore;
module.exports = store;
createApp(App).use(router).mount('#app')
