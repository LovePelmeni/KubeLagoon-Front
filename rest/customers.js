var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST || 'localhost'
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT || '8000'

import { useCookies } from "vue3-cookies"
const Cookie = useCookies();

function CreateCustomerRestController(CustomerData) {
  // Rest Controller, that is responsible for creating new Customer Profile

    var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/customer/create/`)
    var HttpResponse, HttpError = global.jQuery.ajax({
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

        if (Response.status == 404) {
          let newError = new Error(Response.Error || "Server Didn't Respond")
          return false, newError
        }
        if (Response.status == 400) {
          let newError = new Error(Response.Error || 'Bad Credentials')
          return false, newError
        }
        if (Response.status == 201) {
          Cookie.cookies.set("jwt-token", Response.getResponseHeader("jwt-token"))
          return true, null
        }
        if (Response.status == 500) {
          let newError = new Error(Response.Error || 'Internal Server Error')
          return false, newError
        }
        if (Response.status == 501) {
          let newError = new Error(Response.Error || "Server Error")
          return false, newError
        }
        if (Response.status == 503) {
          let newError = new Error(Response.Error || "Server Unavailable")
          return false, newError
        }
      },
      error: function(error) {
        // Processing Exception 
        console.log(error)
        if (error.status == 404) {
          let newError = new Error("Server did not respond")
          return false, newError
        }else{
        let newError = new Error(error.statusText)
        return false, newError}
      }
    })
    return HttpResponse, HttpError
}


function ResetPasswordRestController(JwtToken, NewPassword){
  // Rest Controller, that Is Responsible for Resetting Password

  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/customer/reset/password`)
  let ResponseStatus, ResponseErrors = global.jQuery.ajax({
    async: false,
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
      if (Response.status == 201) {
        return true, null
      }
      if (Response.status == 400 || Response.StatusCode == 501 || Response.StatusCode == 500) {
        let newError = new Error("Failed to Apply New Password, Contact Support")
        return false, newError
      }
    },
    error: function(APIError) {
      let DecodedErrorData = JSON.parse(APIError)
      return false, new Error(DecodedErrorData.statusText)
    }
  })
  return ResponseStatus, ResponseErrors
}

function DeleteCustomerRestController(JwtToken) {
  // Rest Controller, that is used to deleting the Customer Profile

  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/customer/delete`)
  var Response, ResponseError = global.jQuery.ajax({
    async: false,
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
        return Expired, null
      }
    },
    error: function(Error) {
      // Handling Exception
      if (Error != null) {
        let newError = new Error(Response.Error)
        return null, newError}
    }
  })
  console.log(Response, ResponseError)
  return Response, ResponseError
}

function LoginCustomerRestController(LoginForm) {
  // Logs in Customer into the Profile
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/login/`)
  var Response, ResponseError = global.jQuery.ajax({
    async: false,
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
    async: false,
    url: APIUrl, 
    type: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken
    },
    success: function(Response) { 
      // Returning the Customer's Profile
      if (Response.StatusCode == 404) {
        let newError = new Error("Failed to Fetch Profile")
        return null, newError
      }
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

function EditCustomerProfileRestController(JwtToken, EditFormData) {
  // Rest Controller, that Updates the Customer with new Data 
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/customer/edit/profile/`); 
  var Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl, 
    type: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken,
    },
    data: JSON.stringify(EditFormData),
    success: function(Response) { 
      if (Response.StatusCode == 200 || Response.StatusCode == 201) {
        return true, null
      }else{
        let newError = new Error(Response.Error)
        return false, newError
      }
    },
    error: function(APIError) {
      let newError = new Error(APIError)
      return false, newError
    },
  })
  return Response, ResponseError
}


export {CreateCustomerRestController,
DeleteCustomerRestController,
LoginCustomerRestController,
ResetPasswordRestController,
EditCustomerProfileRestController,
GetCustomerProfileRestController}
