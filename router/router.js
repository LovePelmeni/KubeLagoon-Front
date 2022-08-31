import {createRouter, createWebHistory} import "vue-router"

import {VirtualMachine} from "../views/virtualMachine.vue"
import {Home} from "../views/home.vue"

import {CustomerProfile} from "../views/CustomerProfile.vue"
import {Login} from "../views/Login.vue"
import {Register} from "../views/Register.vue"


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
    component: Home,
  },
  {
    path: "/login/",
    name: "login",
    component: Login,
  },
  {
    path: "/register/",
    name: "register",
    component: Register,
  },
  {
    path: "/customer/profile/",
    name: "profile",
    component: CustomerProfile,
  }
]

const newRouter = createRouter({
  history: createWebHistory(BASE_ROOT_URL),
  Routers,
})

export default newRouter
