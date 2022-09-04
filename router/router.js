import * as virtual_machine from "../views/virtualMachine.vue";
import * as home_page from "../views/home.vue";

import * as customer_profile from "../views/CustomerProfile.vue";
import * as login_page from "../views/LoginPage.vue";
import * as register_page from "../views/RegistrationPage.vue";

import {createRouter, createWebHistory} from "vue-router";

/* eslint-disable no-unused-vars */


const routes = [
  {
    path: '/',
    name: 'main_page',
    component: home_page.HomePage,
  },
  {
    path: '/login/',
    name: 'login_page',
    component: login_page.LoginPage,
  },
  {
    path: '/register/',
    name: 'register_page',
    component: register_page.RegistrationPage,
  },
  {
    path: '/virtual/machine/:VirtualMachineId',
    name: 'virtual_machine',
    component: virtual_machine.VirtualMachine,
  },
  {
    path: '/customer/profile/',
    name: 'customer_profile',
    component: customer_profile.CustomerProfile,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export {router};
