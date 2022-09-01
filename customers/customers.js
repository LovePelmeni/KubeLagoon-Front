/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */

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
    CreateCustomer = function() {
      // Creates New Customer
    }
    DeleteCustomer = function() {
      // Deletes Existing Customer's Profile
    }
    ResetPassword = function() {
      // Resets password
    }
}
