global.jQuery = require('jquery');

import App from './App.vue';
import store from "../store/store.js";
import VueCookies from "vue3-cookies";

import Vuex from 'vuex';
import { createApp } from 'vue/dist/vue.esm-bundler';
import { router } from './router/index';

import { globalCookiesConfig } from "vue3-cookies";
import Vuetify from './plugins/vuetify';

globalCookiesConfig({
  expireTimes: "30d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});

const app = createApp(App).use(router)
global.VuetifyModule = Vuetify

const corsModule = require("cors");
app.use(corsModule);

app.use(require("vue3-cookies"));
app.use(VueCookies);
app.use(store);
app.use(Vuex);
app.use(Vuetify);

app.mount('#app')
