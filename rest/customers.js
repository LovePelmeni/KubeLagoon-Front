var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT
/* eslint-disable no-unused-vars */

import $ from "jquery";
var Url = require('url-parse')

import "../configuration_preparer/preparer.js"

function CreateCustomerRestController(CustomerData) {
  // Rest Controller, that is responsible for creating new Customer Profile

    var APIUrl = new Url("http://%s:%s/customer/create/" % (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
    var HttpResponse, HttpErrors = $.ajax({
      method: "POST",
      data: JSON.stringify(CustomerData),
      url: APIUrl,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      async: false,
      success: function(Response) {
        if (Response.StatusCode == 400) {
          return false, [Response.Error]
        }
        if (Response.StatusCode == 201) {
          $.SetCookie("jwt-token", Response.cookie("jwt-token"))
          return true, []
        }
        if (Response.StatusCode == 500) {
          return false, ["Failed to Perform Operation, Please Call Support"]
        }
        if (Response.StatusCode == 501) {
          return false, ["Failed to Perform Operation, Please Call Support"]
        }
      },
      error: function(error) {
        return false, Error(error)
      }
    })
    return HttpResponse, HttpErrors
}


function ResetPasswordRestController(NewPassword){
  // Rest Controller, that Is Responsible for Resetting Password

  var APIUrl = new Url("http://%s:%s/customer/reset/password" % (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  let ResponseStatus, ResponseErrors = $.ajax({
    data: JSON.stringify({"NewPassword": NewPassword}),
    url: APIUrl,
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": $.cookie("jwt-token")
    },
    success: function(Response){
      if (Response.StatusCode == 201) {
        return true, []
      }
      if (Response.StatusCode == 400 || Response.StatusCode == 501 || Response.StatusCode == 500) {
        return false, ["Failed to Apply New Password, Contact Support"]
      }
    },
    error: function(APIError) {
      return false, [APIError]
    }
  })
  return ResponseStatus, ResponseErrors
}

function DeleteCustomerRestController() {
  // Rest Controller, that is used to deleting the Customer Profile

  var APIUrl = new Url("http://%s:%s/customer/delete" % (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  var Response, Error = $.ajax({
    url: APIUrl,
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": $.cookie("jwt-token"),
      "Content-Type": "application/json",
    },
    success: function(Response) {
      // Handling Success Response
      if (Response.StatusCode == 201) {
        // Removing Jwt Cookie...
        let Expired = $.RemoveCookie("jwt-token")
        return Expired, []
      }
    },
    error: function(Error) {
      // Handling Exception
      if (Error != null) {return false, [Error]}
    }
  })
  return Response, Error
}

function LoginCustomerRestController(Username, Password) {
  // Logs in Customer into the Profile
  var APIUrl = Url("http://%s:%s/login/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  var Response, ResponseError = $.ajax({
    url: APIUrl,
    data: JSON.stringify({"Username": Username, "Password": Password}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
    },
    success: function(Response) {
      // Processing Success Login Request
      if (Response.StatusCode == 200 || Response.StatusCode == 201) {
        return true, null
      }
    },
    error: function(ResponseError) {
      // Processing Exception
      return false, ResponseError
    },
  })
  return Response, ResponseError
}

function LogoutCustomerRestController() {
  // Logouts Customer from their Profile
  let Removed = $.RemoveCookie("jwt-token")
  return Removed, null
}

export {CreateCustomerRestController,
DeleteCustomerRestController,
LoginCustomerRestController,
LogoutCustomerRestController,
ResetPasswordRestController}
