

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
    function Login(Username, Password) {
      // Logs Customer Inside and Setting up new Refreshed JWT Token
      ValidData, Error = this.ValidateInput(Username, Password)
    },
    function showError() {
      // Shows up an Exceptions Banner on the Page
    }
    function ValidateInput(Username, Password) {
      CustomerInputValidator = new customers.CustomerLoginInputValidator()
      Valid, Error = CustomerInputValidator.ValidateLoginInput(Username, Password)
      if (Error != null){this.showError()}
    }
  }
}

</script>
