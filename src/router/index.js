import { createRouter, createWebHistory } from 'vue-router'

import virtualMachine from "../components/VirtualMachine.vue";
import VirtualMachinesPage from "../views/VirtualMachines.vue";

import EditCustomerProfile from "../views/EditCustomerProfile.vue";
import LoginPage from "../views/LoginPage.vue";
import RegistrationPage from "../views/RegistrationPage.vue";

import InitializationModalPage from "../views/InitializationModalPage.vue";
import EditInitializationModalPage from "../views/EditVirtualMachinePage.vue";

import ResetPassword from "../views/ResetPassword.vue";
import NotFoundPage from "../components/NotFoundWindow.vue";

import HomePage from "../views/home.vue";
import BillPage from "../views/BillPage.vue";
import ApplySubscriptionComponent from "../components/SubscriptionApplyComponent.vue";
import CheckoutView from "../views/CheckoutView.vue";


const routes = [
  {
    path: "/",
    name: "main_page",
    component: HomePage,
  },
  {
    path: "/checkout/",
    name: "bill_checkout",
    component: CheckoutView,
  },
  {
    path: "/virtual/machines/",
    name: "virtual_machines_page",
    component: VirtualMachinesPage,
  },
  {
    path: "/bills/",
    name: "bill_page",
    component: BillPage,
  },
  {
    path: "/reset/password/:CustomerId",
    component: ResetPassword, 
    name: "reset_password",
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
    path: "/virtual/machine/setup/",
    name: "virtual_machine_setup",
    component: InitializationModalPage,
  },
  {
    path: "/edit/virtual/machine/:VirtualMachineId",
    name: "edit_virtual_machine",
    component: EditInitializationModalPage,
  },
  {
    path: "/edit/customer/profile/",
    name: "edit_customer_profile",
    component: EditCustomerProfile,
  },
  {
    path: "/not/found/",
    name: "not_found_page",
    component: NotFoundPage,
  },
  {
    path: "/subscription/apply/:SubscriptionId",
    name: "apply_subscription_page",
    component: ApplySubscriptionComponent,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export { router };