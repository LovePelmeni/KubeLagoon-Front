var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT


import "../configuration_preparer/preparer.js"

function CreateCustomerRestController(Username, Email, Password) {
  // Rest Controller, that is responsible for creating new Customer Profile
    UserData = new UserData(Username=Username, Email=Email, Password=Password)
    ValidationErrors = UserData.ValidateInput()
    if (len(ValidationErrors) != 0) {return false, ValidationErrors}
    var APIUrl = new url.URL("http://%s:%s/customer/create/" % (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
    var HttpResponse, HttpErrors = $.ajax({
      method: "POST",
      data: JSON.Stringify(UserData.DataInput),
      url: APIUrl,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      async: false,
      success: function(Response) {
        if (Response.StatusCode == 400) {
          return false, [Response.Error]
        }
        if (Response.StatusCode == 201) {
          $.SetCookie("jwt-token", Response.getCookie("jwt-token"))
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


  UserData = new UserData(Password=NewPassword)
  if (UserData.DataInput["Password"].match(NewPassword) != true) {
    return false, ["Invalid Password"]
  }
  var APIUrl = new url.URL("http://%s:%s/customer/reset/password" % (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  ResponseStatus, ResponseErrors = $.ajax({
    data: JSON.stringify({"NewPassword": NewPassword}),
    url: APIUrl,
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": $.getCookie("jwt-token")
    },
    success: function(Response){
      if (Response.StatusCode == 201) {
        return true, []
      }
      if (Response.StatusCode == 400 || Response.StatusCode == 501 || Response.StatusCode == 500) {
        return false, ["Failed to Apply New Password, Contact Support"]
      }
    },
    error: function(Error) {
      return false, [Error]
    }
  })
  return ResponseStatus, ResponseErrors
}

function DeleteCustomerRestController(CustomerId) {
  // Rest Controller, that is used to deleting the Customer Profile

  var APIUrl = new url.URL("http://%s:%s/customer/delete" % (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("CustomerId", CustomerId)

  var Response, Error = $.ajax({
    url: APIUrl,
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": $.getCookie("jwt-token"),
      "Content-Type": "application/json",
    },
    success: function(Response) {
      // Handling Success Response
      if (Response.StatusCode == 201) {
        // Removing Jwt Cookie...
        Expired = $.ExpireCookie("jwt-token")
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
