<template>
  <div class="LoginPage flex">
    <form class="" action="" method="post">

    </form>
  </div>
</template>

<script>

/* eslint-disable no-unused-vars */

import * as customers from "../customers/customers.js";
import {mapMutations} from "vuex";

export const LoginValidator {
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    Validate() {
      // Validates Input, that has been Passed to the Form
    }
  },
  computed: {
    this.Validate()
  },
};

export default {
  name: "LoginPage",
  data() {
    return {
      Username: null,
      Password: null,
    }
  },
  methods: {
    ...mapMutations(["SHOW_ERROR"])
    Login(Username, Password) {
      // Logs Customer Inside and Setting up new Refreshed JWT Token
      let ValidData, ValidError = this.ValidateInput(Username, Password)
      if (ValidError != null) {this.showError(ValidError)}
      let CustomerManager = new customers.CustomerManager()
      let LoginError = CustomerManager.Login(ValidData)
      if (LoginError != null) {this.showError(LoginError)}
    },
    showError(ExpectedError) {
      // Shows up an Exceptions Banner on the Page
      this.SHOW_ERROR(ExpectedError)
    },
    ValidateInput(Username, Password) {
      let CustomerInputValidator = new customers.CustomerLoginInputValidator()
      let Valid, ValidError = CustomerInputValidator.ValidateLoginInput(Username, Password)
      if (ValidError != null || Valid != true){return ValidError}
    }
  }
}

</script>
