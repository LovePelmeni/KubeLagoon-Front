import { createRouter, createWebHistory } from 'vue-router'

import virtualMachine from "../views/virtualMachine.vue";
import HomePage from "../views/home.vue";

import CustomerProfile from "../views/CustomerProfile.vue";
import LoginPage from "../views/LoginPage.vue";
import RegistrationPage from "../views/RegistrationPage.vue";

const routes = [
  {
    path: "/",
    name: "main_page",
    component: HomePage,
  },
  {
    path: "/login/",
    name: "login_page",
    component: LoginPage,
  },
  {
    path: "/register/",
    name: "register_page",
    component: RegistrationPage,
  },
  {
    path: "/virtual/machine/:VirtualMachineId",
    name: "virtual_machine",
    component: virtualMachine,
  },
  {
    path: "/customer/profile/",
    name: "customer_profile",
    component: CustomerProfile,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export { router };
