class CustomerInputValidator {
  // User Info Validation Form
  constructor(Username: String, Email: String, Password: String) {
    this.Username = Username
    this.Email = Email
    this.Password = Password
    this.DataInput = {"Username": this.Username,
    "Email": this.Email, "Password": this.Password}
  }
  function ValidateInput() -> List {
    // Validates Initial Property Input
    var InvalidFields = []
    var RegexsPatterns = {
      "Username": new RegExp("^[0-9a-zA-Z]{1,100}$"),
      "Email": new RegExp("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$"),
      "Password": new RegExp("^[0-9a-zA-Z]{1,100}$")}
    for (PropertyKey in Object(this.DataInput).Keys()){
        Matches = RegexsPatterns[PropertyKey].match(this.DataInput[PropertyKey])
        if Matches != true {
          InvalidFields = InvalidFields.append(
          "Invalid Value for Field `%s`", PropertyKey)
        }
        continue
    }
    return InvalidFields
  }
}

class CustomerManager {
    function CreateCustomer() {
      // Creates New Customer
    }
    function DeleteCustomer() {
      // Deletes Existing Customer's Profile
    }
    function ResetPassword() {
      // Resets password
    }
}
