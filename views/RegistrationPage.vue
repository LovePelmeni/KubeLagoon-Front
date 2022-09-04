<template>
  <div class="RegistrationPage flex">
    <form class="" action="" method="post">

    </form>
  </div>
</template>

<script>

/* eslint-disable no-unused-vars */

import * as customers from "../customers/customers.js"
import {mapMutations} from "vuex"

export const RegistrationValidator {
  name: "RegistrationValidator",
  methods: {
    Validate() {
      // Validates Input of the Registration Form
    }
  },
  created() {
    this.Validate()
  },
  data() {
    return {
      Username: null,
      Email: null,
      Password: null,

      Country: null,
      ZipCode: null,
      Street: null,
    }
  }
};

export default {
  name: "RegistrationPage",
  data() {
    return {
      // Customer Info
      Username: null,
      Email: null,
      Password: null,

      // Location Parameters
      Country: null,
      ZipCode: null,
      Street: null,
    }
  },
  components: {
    RegisrationValidator,
  },
  methods: {
    ...mapMutations(["SHOW_ERROR"])

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
