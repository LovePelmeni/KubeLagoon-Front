import {VueRouter} from "vue-router";
import {Vue} from "vue";

Vue.use(VueRouter);

import {VirtualMachine} from "../views/virtualMachine.vue";
import {HomePage} from "../views/home.vue";

import {CustomerProfile} from "../views/CustomerProfile.vue";
import {LoginPage} from "../views/LoginPage.vue";
import {RegistrationPage} from "../views/RegistrationPage.vue";

/* eslint-disable no-unused-vars */

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: HomePage, name: "main_page"},
    { path: '/virtualMachine/:VirtualMachineId', component: VirtualMachine, name: "virtual_machine"},
    { path: '/login/', component: LoginPage, name: "login_page"},
    { path: '/register/', component: RegistrationPage, name: "register_page"},
    { path: '/customer/profile/', component: CustomerProfile, name: "customer_profile"},
  ],
});

new Vue({router}).$mount("#app");
export default router
