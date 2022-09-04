<template>

  <div class="card">
    <label>Username</label>
    <a> {{ Username }}</a>

    <label>Email</label>
    <a> {{ Email }}</a>

    <label>Created At</label>
    <a> {{ CreatedAt }}</a>
  </div>
  <router-view/>

</template>

<script>

/* eslint-disable no-unused-vars */

import * as customers from "../customers/customers.js"
import $ from "jquery"


var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT

var Url = require("url-parse")

export default {
      name: "CustomerProfile",
      data() {
        return {
          Username: null,
          Email: null,
          CreatedAt: null,
        }
      },
        methods: {

          ShowCustomerProfile() {
            // Function Parses Customer Data and Shows Out Customer's Profile Component
            let CustomerId = $.getCookie("jwt-token")["UserId"]
            let newCustomerManager = new customers.CustomerManager()
            let CustomerProfile = newCustomerManager.GetCustomerProfile(CustomerId)
          },

          Logout() {
            // Logging out the Customer from the Profile

            var LoginRedirectUrl = new Url("http://%s:%s/customer/login"
             % (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))

            if ($.cookie("jwt-token").length != 0) {
              let Cookie = $.expireCookie("jwt-token")
              return this.$router.push({name: "login_page"})
            }
          },
          Login() {
            // Logs Customer in the Profile
            return this.$router.push({name: "login_page"})
          }
        },
      }


</script>


<style>
</style>
