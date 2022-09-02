<template>
  <div class="RegistrationPage flex">
    <form class="" action="" method="post">

    </form>
  </div>
</template>

<script>

/* eslint-disable no-unused-vars */

import * as customers from "../customers/customers.js"

export default {
  name: "RegistrationPage",
  data() {
    return {
      Username: null,
      Email: null,
      Password: null,
    }
  },
  methods: {
    showError(Error) {
      // Showing Up an Exception Banner
    },
    ValidateInput(Username, Email, Password) {
      // Validates Registration Input
      let newValidator = new customers.RegistrationValidationInput()
      let newValidData, Error  = newValidator.ValidateInput(Username, Email, Password)
      return newValidData, Error
    },
    CreateNewCustomer(Username, Email, Password) {
      // Once Customer has been Created, It redirects to the Main Page

      let ValidationError = this.ValidateInput(Username, Email, Password)
      if (ValidationError != null) {this.showError("Invalid Data has been Passed")}

      let CustomerManager = new customers.CustomerManager()
      let Created, CreationError = CustomerManager.CreateCustomer(Username, Email, Password)
      if (CreationError != null || Created != true) {this.showError(Error)}
      this.$router.push({name: "main_page"})
    }
  }
}

</script>

<style>

</style>
