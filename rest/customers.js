var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST || 'localhost'
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT || '8000'

import { useCookies } from "vue3-cookies"
const Cookie = useCookies();

function CreateCustomerRestController(CustomerData) {
  // Rest Controller, that is responsible for creating new Customer Profile

    var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/customer/create/`)
    var HttpResponse, HttpErrors = global.jQuery.ajax({
      type: "POST",
      data: JSON.stringify(CustomerData),
      dataType: "json",
      URL: APIUrl,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      async: false,
      success: function(Response) {
        if (Response.StatusCode == 400) {
          let newError = new Error(Response.Error)
          return false, newError
        }
        if (Response.StatusCode == 201) {
          Cookie.cookies.set("jwt-token", Response.getResponseHeader("jwt-token"))
          return true, null
        }
        if (Response.StatusCode == 500) {
          let newError = new Error(Response.Error)
          return false, newError
        }
        if (Response.StatusCode == 501) {
          let newError = new Error(Response.Error)
          return false, newError
        }
      },
      error: function(error) {
        let newError = new Error(error)
        return false, newError
      }
    })
    return HttpResponse, HttpErrors
}


function ResetPasswordRestController(JwtToken, NewPassword){
  // Rest Controller, that Is Responsible for Resetting Password

  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/customer/reset/password`)
  let ResponseStatus, ResponseErrors = global.jQuery.ajax({
    data: JSON.stringify({"NewPassword": NewPassword}),
    dataType: "json",
    URL: APIUrl,
    type: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": JwtToken,
    },
    success: function(Response){
      if (Response.StatusCode == 201) {
        return true, []
      }
      if (Response.StatusCode == 400 || Response.StatusCode == 501 || Response.StatusCode == 500) {
        return false, "Failed to Apply New Password, Contact Support"
      }
    },
    error: function(APIError) {
      return false, new Error(APIError)
    }
  })
  return ResponseStatus, ResponseErrors
}

function DeleteCustomerRestController(JwtToken) {
  // Rest Controller, that is used to deleting the Customer Profile

  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/customer/delete`)
  var Response, ResponseError = global.jQuery.ajax({
    URL: APIUrl,
    type: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": JwtToken,
      "Content-Type": "application/json",
    },
    success: function(Response) {
      // Handling Success Response
      if (Response.StatusCode == 201) {
        // Removing Jwt Cookie...
        let Expired = global.jQuery.RemoveCookie("jwt-token")
        return Expired, []
      }
    },
    error: function(Error) {
      // Handling Exception
      if (Error != null) {
        let newError = new Error(Response.Error)
        return null, newError}
    }
  })
  return Response, ResponseError
}

function LoginCustomerRestController(LoginForm) {
  // Logs in Customer into the Profile
  var APIUrl = URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/login/`)
  var Response, ResponseError = global.jQuery.ajax({
    type: "POST",
    URL: APIUrl,
    data: JSON.stringify(LoginForm),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    success: function(Response) {
      // Processing Success Login Request
      if (Response.StatusCode == 200 || Response.StatusCode == 201) {
        return true, null
      }else{
        let newError = new Error(Response.Error)
        return false, newError
      }
    },
    error: function(ResponseError) {
      // Processing Exception
      return false, ResponseError
    },
  })
  return Response, ResponseError
}


function GetCustomerProfileRestController(JwtToken) {
  // Returns the Customer Profile Info 

  let APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/customer/get/profile`) 
  let Response, ResponseError = global.jQuery.ajax({
    url: APIUrl, 
    type: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken
    },
    success: function(Response) { 
      // Returning the Customer's Profile
      if (Response.StatusCode == 200 || Response.StatusCode == 201){
        return Response["Customer"], null
      }else{
        let NewError = new Error(Response["Error"])
        return null, NewError
      }
    },
    error: function(ResponseError){
      // Returning Response Exception
      let NewError = new Error(ResponseError)
      return NewError
    }
  })
  return Response, ResponseError
}


export {CreateCustomerRestController,
DeleteCustomerRestController,
LoginCustomerRestController,
ResetPasswordRestController,
GetCustomerProfileRestController}
