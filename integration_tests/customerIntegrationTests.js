import * as customers_rest from "../rest/customers.js"

const CustomerSchemeData = {}

const GeneratedJwtToken = jwt.generateToken(CustomerSchemeData)

function TestCreateCustomer() {
    // Testing the Customer Creation Rest Controller 
    let CustomerData = {}
    let HttpResponse, HttpResponseError = customers_rest.CreateCustomerRestController(CustomerData) // Rest Controller for Customer Creation 
    expect(HttpResponse, Object) // Checking if the Http Response Is Not Null 
    expect(HttpResponseError, null) // Checking if the Http Response Error equals to null
}

function TestDeleteCustomer() {
    // Testing the Customer Deletion Rest Controller 
    let JwtToken = GeneratedJwtToken // Jwt Token 
    let HttpResponse, HttpResponseError = customers_rest.DeleteCustomerRestController(JwtToken) // Rest Controller for Customer Deletion 
    expect(HttpResponse, Object) // Checking if the Http Response Is Not Null 
    expect(HttpResponseError, null) // Checking if the Http Response Error equals to Null
}

function TestEditCustomer() {
    // Testing the Customer Edit Rest Controller 
    let HttpResponse, HttpResponseError = customers_rest.EditCustomerProfileRestController(GeneratedJwtToken, CustomerSchemeData)
    expect(HttpResponse, Object)
    expect(HttpResponseError, null)
}

function TestLoginCustomer() {
    // Testing the Login Rest Controller, that provides the functionality for the Customer to Login inside the system 
    let HttpResponse, HttpResponseError = customers_rest.LoginCustomerRestController(
    {"Username": CustomerSchemeData["Username"], "Password": CustomerSchemeData["Password"]})
    expect(HttpResponse, Object) // Checking if the Http Response is not null
    expect(HttpResponseError, null) // Checking if the Http Response Error equals to the Null
}


function TestResetCustomerPassword() {
    // Testing the Rest Controller, that provides functionality for Resetting the Customer's Passoword
    let HttpResponse, HttpResponseError = customers_rest.ResetPasswordRestController(GeneratedJwtToken, "New-Password")
    expect(HttpResponse, Object) // Checking if the Response Object is not null
    expect(HttpResponseError, null) // Checking if the Response Error does not equals to null
}

TestCreateCustomer()
TestDeleteCustomer() 
TestEditCustomer() 
TestResetCustomerPassword()
