import {createRouter, createWebHistory} from "vue-router"

import {VirtualMachine} from "../views/virtualMachine.vue"
import {HomePage} from "../views/home.vue"

import {CustomerProfile} from "../views/CustomerProfile.vue"
import {LoginPage} from "../views/LoginPage.vue"
import {RegistrationPage} from "../views/RegistrationPage.vue"


var BASE_ROOT_URL = process.env.BASE_ROOT_URL

const Routes = [
  {
    path: "/virtualMachine",
    name: "virtual_machine",
    component: VirtualMachine,
  },
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
    path: "/customer/profile/",
    name: "customer_profile",
    component: CustomerProfile,
  }
]

const newRouter = createRouter({
  history: createWebHistory(BASE_ROOT_URL),
  Routes,
})

export default newRouter
