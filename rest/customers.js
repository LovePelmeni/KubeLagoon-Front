import "../configuration_preparer/preparer.js"

function CreateCustomerRestController(Username: String, Email: String, Password: String) -> (Bool, List) {
  // Rest Controller, that is responsible for creating new Customer Profile
    UserData = new UserData(Username=Username, Email=Email, Password=Password)
    ValidationErrors = UserData.ValidateInput()
    if len(ValidationErrors) != 0 {return false, ValidationErrors}
    var APIUrl := new url.URL("http://%s:8000/customer/create/", BACKEND_APPLICATION_HOST)
    var HttpResponse, HttpErrors := $.ajax({
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
      }
      error: function(error) {
        if (Response.StatusCode == 400) {
          return false, [Response.Error]
        }
        if (Response.StatusCode == 500) {
          return false, ["Failed to Perform Operation, Please Call Support"]
        }
        if (Response.StatusCode == 501) {
          return false, ["Failed to Perform Operation, Please Call Support"]
        }
      }
    })
    return HttpResponse, HttpErrors
}


function ResetPasswordRestController(CustomerId: String, NewPassword: String) -> bool, list {
  // Rest Controller, that Is Responsible for Resetting Password
  UserData = new UserData(Password=NewPassword)
  if UserData.DataInput["Password"].match(NewPassword) != true {
    return false, ["Invalid Password"]
  }
  var APIUrl = new url.URL("http://%s:8000/customer/reset/password?customer_id=%s", BACKEND_APPLICATION_HOST, CustomerId)
  ResponseStatus, ResponseErrors = $.ajax({
    data: {"NewPassword": NewPassword}.Stringify()
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
    }
    error: function(Error) {
      return false, [Error]
    }
  })
  return ResponseStatus, ResponseErrors
}

function DeleteCustomerRestController(CustomerId: String) {
  // Rest Controller, that is used to deleting the Customer Profile

  var APIUrl = new url.URL("http://%s:8000/customer/delete", BACKEND_APPLICATION_HOST)
  APIUrl.searchParams.append("CustomerId", CustomerId)

  var Response := $.ajax({
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
      if Error != null {return false, [Error]}
    }
  })
}
