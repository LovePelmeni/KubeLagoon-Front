import * as customers_rest from "../rest/customers.js";

/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */


class CustomerRegistrationForm {
  // Entity, that represents Customer Registration Form Data
  constructor(Username, Email, Password) {
    this.Username = Username
    this.Email = Email
    this.Password = Password
  }
}

class CustomerLoginForm {
  constructor(Username, Password) {
    this.Username = Username
    this.Password = Password
  }
}

class CustomerInputValidator {
  // User Info Validation Form
  constructor(Username, Email, Password) {
    this.Username = Username
    this.Email = Email
    this.Password = Password
    this.DataInput = {"Username": this.Username,
    "Email": this.Email, "Password": this.Password}
  }
  ValidateLoginInput = function() {
    // Validates Login Input
  }
  ValidateRegistrationInput = function() {
    // Validates Registration Input
  }

  ValidateInput = function() {
    // Validates Initial Property Input
    var InvalidFields = []
    var RegexsPatterns = {
      "Username": new RegExp("^[0-9a-zA-Z]{1,100}$"),
      "Email": new RegExp("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$"),
      "Password": new RegExp("^[0-9a-zA-Z]{1,100}$")}
    for (let PropertyKey in Object(this.DataInput).Keys()){
        let Matches = RegexsPatterns[PropertyKey].match(this.DataInput[PropertyKey])
        if (Matches != true){
          InvalidFields = InvalidFields.append(
          "Invalid Value for Field `%s`", PropertyKey)
        }
        continue
    }
    return InvalidFields
  }
}

class CustomerManager {
  // Class, represents Management tool for handling Customer's Operations

    LoginCustomer = function(Username, Password) {
      let LoggedIn, LoggedInError = customers_rest.LoginCustomerRestController(Username, Password)
      return LoggedIn, LoggedInError
    }

    LogoutCustomer = function() {
      let LoggedOut, LoggoutError = customers_rest.LogoutCustomerRestController()
      return LoggedOut, LoggoutError
    }

    CreateCustomer = function() {
      // Creates New Customer
      let newRegistrationForm = new CustomerRegistrationForm()
      let newCustomer, CustomerError = customers_rest.CreateCustomerRestController(CustomerRegistrationForm)
      if (CustomerError != null){return null, CustomerError}
      return newCustomer, CustomerError
    }

    DeleteCustomer = function() {
      // Deletes Existing Customer's Profile
      let Deleted, DeleteError = customers_rest.DeleteCustomerRestController()
      if (DeleteError != null) {return null, DeleteError}
      return Deleted, DeleteError
    }

    ResetPassword = function(newPassword) {
      // Resets password for the Customer's Profile
      let Reset, ResetError = customers_rest.ResetPasswordRestController(newPassword)
      if (ResetError != null){return null, ResetError}
      return Reset, ResetError
    }
}

export {CustomerManager, CustomerInputValidator, CustomerRegistrationForm, CustomerLoginForm};
