// Template Goes there

<template>

  <div class="card">
    <label>Username</label>
    <a> {{ customerProfile.Username }}</a>

    <label>Email</label>
    <a> {{ customerProfile.Email }}</a>

    <label>Created At</label>
    <a> {{ customerProfile.CreatedAt }}</a>
  </div>
</template>

<script>

import * as customers from "../customers/customers.js"

showProfile.addEventListener("onopen", function(event){
  showCustomerProfile()
})

function ShowCustomerProfile() {
  // Function Parses Customer Data and Shows Out Customer's Profile Component
  CustomerId = $.getCookie("jwt-token")["UserId"]
  newCustomerManager = new customers.CustomerManager()
  CustomerProfile = newCustomerManager.GetCustomerProfile(CustomerId)

  export default {
    name: "#customerProfile",
    data() {
      return {
        Username: CustomerProfile.Username,
        Email: CustomerProfile.Email,
        CreatedAt: CustomerProfile.CreatedAt,
      }
    },
    methods: {

      function ShowCustomerProfile() {
        // Function Parses Customer Data and Shows Out Customer's Profile Component
        CustomerId = $.getCookie("jwt-token")["UserId"]
        newCustomerManager = new customers.CustomerManager()
        CustomerProfile = newCustomerManager.GetCustomerProfile(CustomerId)
      },

      function Logout() {
        // Logging out the Customer from the Profile

        var LoginRedirectUrl = new url.URL("http://%s:%s/customer/login"
         % (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))

        if (len($.getCookie("jwt-token")) != 0) {
          Cookie = $.expireCookie("jwt-token")
          return window.location.replace(LoginRedirectUrl)
        }else{

        }
      },
      function Login() {
        // Logs Customer in the Profile
      }
    }
  }
}

</script>


<style>
</style>
