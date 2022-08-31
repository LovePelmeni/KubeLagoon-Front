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
    el: "#customerProfile",
    data() {
      return {
        Username: CustomerProfile.Username,
        Email: CustomerProfile.Email,
        CreatedAt: CustomerProfile.CreatedAt,
      }
    }
  }
}

</script>


<style>
</style>
