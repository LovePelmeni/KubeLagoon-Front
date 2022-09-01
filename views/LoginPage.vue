

<script>

import * as customers from "../customers/customers.js"

export default {
  name: "LoginPage",
  data() {
    return {
      Username: null,
      Password: null,
    }
  },
  methods: {
    Login(Username, Password) {
      // Logs Customer Inside and Setting up new Refreshed JWT Token
      let ValidData, ValidError = this.ValidateInput(Username, Password)
      if (ValidError != null) {this.showError(ValidError)}
      CustomerManager = new customers.CustomerManager()
      let LoginError = CustomerManager.Login(ValidData)
      if (LoginError != null) {this.showError(LoginError)}
    },
    showError(ExpectedError) {
      // Shows up an Exceptions Banner on the Page
      console.log(ExpectedError)
    },
    ValidateInput(Username, Password) {
      let CustomerInputValidator = new customers.CustomerLoginInputValidator()
      let Valid, ValidError = CustomerInputValidator.ValidateLoginInput(Username, Password)
      if (ValidError != null || Valid != true){return ValidError}
    }
  }
}

</script>
