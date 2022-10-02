import * as customers_rest from "../rest/customers.js";

class CustomerRegistrationForm {
  // Base Class for the Registration Form 
  // Entity, that represents Customer Registration Form Data
  constructor(Username, Email, Password, Country, City, ZipCode, Street) {
    this.Username = Username
    this.Email = Email
    this.Password = Password
    this.Country = Country
    this.City = City 
    this.ZipCode = ZipCode 
    this.Street = Street 
  }
  ToBlob() {
    // Returns Blob of JSON of the Customer Registration Form
    return {
      "Username": this.Username, 
      "Password": this.Password, 
      "Email": this.Email, 
      "Country": this.Country,
      "City": this.City,
      "ZipCode": this.ZipCode, 
      "Street": this.Street
    }
  }
}

class CustomerLoginForm {
  // Base Class for the Login Form
  constructor(Email, Password) {
    this.Email = Email
    this.Password = Password
  }
  ToBlob() {
    // Returns the Blob of the JSON of the Customer login Form 
    return {"Email": this.Email, "Password": this.Password}
  }
}

class CustomerEditForm {
  // Validation Form For Editing Customer's Profile 
  constructor(Username, Email, Password, Country, City, ZipCode, Street) {
    this.Username = Username 
    this.Email = Email 
    this.Password = Password 
    this.Country = Country 
    this.City = City 
    this.ZipCode = ZipCode
    this.Street = Street
  }
  ToBlob() {
    return {
      "Username": this.Username, 
      "Email": this.Email, 
      "Password": this.Password, 
      "Country": this.Country, 
      "City": this.City, 
      "ZipCode": this.ZipCode, 
      "Street": this.Street,
    }
  }
}

class CustomerManager {
  // Class, represents Management tool for handling Customer's Operations

    LoginCustomer = function(Username, Password) {
      let LoginForm = new CustomerLoginForm(Username, Password)
      let LoggedIn, LoggedInError = customers_rest.LoginCustomerRestController(LoginForm.ToBlob())
      return LoggedIn, LoggedInError
    }

    LogoutCustomer = function(JwtToken) {
      let LoggedOut, LogoutError = customers_rest.LogoutCustomerRestController(JwtToken)
      return LoggedOut, LogoutError
    }

    EditCustomer = function(JwtToken, EditForm) {
      // Edits the Customer's Profile with Info that is available to edit
      let Edited, EditError = customers_rest.EditCustomerProfileRestController(JwtToken, EditForm)
      return Edited, EditError
    }

    CreateCustomer = function(Username, Email, Password, BillingAddress, ZipCode, Street) {

      // Creates New Customer
      let registrationForm = new CustomerRegistrationForm(
      Username, Email, Password, BillingAddress, ZipCode, Street)
      
      // Creates New Customer and Returns A Response 
      let newCustomer, CustomerError = customers_rest.CreateCustomerRestController(registrationForm.ToBlob())
      return newCustomer, CustomerError
    }

    DeleteCustomer = function(JwtToken) {
      // Deletes Existing Customer's Profile
      let Deleted, DeleteError = customers_rest.DeleteCustomerRestController(JwtToken)
      return Deleted, DeleteError
    }

    ResetPassword = function(JwtToken, newPassword) {
      // Resets password for the Customer's Profile
      let Reset, ResetError = customers_rest.ResetPasswordRestController(JwtToken, newPassword)
      return Reset, ResetError
    }
    GetCustomerProfile(JwtToken) {
      // Returns Customer's Profile of the User
      let Customer, CustomerError = customers_rest.GetCustomerProfileRestController(JwtToken)
      return Customer, CustomerError
    }
}

export {CustomerRegistrationForm, CustomerLoginForm, CustomerManager, CustomerEditForm};

