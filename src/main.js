import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { newRouter } from "../router/router.js"

/* eslint-disable no-unused-vars */

loadFonts()
createApp(App).use(vuetify).use(newRouter).mount('#mainApp')
