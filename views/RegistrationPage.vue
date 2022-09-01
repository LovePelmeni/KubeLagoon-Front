



<script>

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
    function showError(Error) {
      // Showing Up an Exception Banner
    },
    function ValidateInput(Username, Email, Password) {
      // Validates Registration Input
      newValidator = new customers.RegistrationValidationInput()
      newValidData, Error  = newValidator.ValidateInput(Username, Email, Password)
      return newValidData, Error
    },
    function CreateNewCustomer(Username, Email, Password) {
      // Once Customer has been Created, It redirects to the Main Page
      ValidatedData, Error = this.ValidateInput(Username, Email, Password)
      CustomerManager = new customers.CustomerManager()
      Created, Error = CustomerManager.CreateCustomer(Username, Email, Password)
      if (Error != null || Created != true) {this.showError(Error)}
      this.$router.push({name: "main_page"})
    }
  }
}

</script>

<style>

</style>
