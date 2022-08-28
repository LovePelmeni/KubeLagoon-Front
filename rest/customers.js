import "../configuration_preparer/preparer.js"

class UserData {
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
      "Email": new RegExp(""),
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

function CreateCustomerRestController(Username: String, Email: String, Password: String) -> (Bool, List) {
  // Rest Controller, that is responsible for creating new Customer Profile
    UserData = new UserData(Username=Username, Email=Email, Password=Password)
    ValidationErrors = UserData.ValidateInput()
    if len(ValidationErrors) != 0 {return false, ValidationErrors}
    var APIUrl := new url.URL("http://%s:8000/customer/create/", BACKEND_APPLICATION_HOST)
    var HttpResponse, HttpErrors := $.ajax({
      method: "POST",
      data: UserData.DataInput.Stringify(),
      url: APIUrl,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      async: false,
      success: function(Response) {
        if Response.StatusCode == 400 {
          return false, [Response.Error]
        }
        if Response.StatusCode == 201 {
          $.SetCookie("jwt-token", Response.getCookie("jwt-token"))
          return true, []
        }
        if Response.StatusCode == 500 {
          return false, ["Failed to Perform Operation, Please Call Support"]
        }
        if Response.StatusCode == 501 {
          return false, ["Failed to Perform Operation, Please Call Support"]
        }
      }
      error: function(error) {
        if Response.StatusCode == 400 {
          return false, [Response.Error]
        }
        if Response.StatusCode == 500 {
          return false, ["Failed to Perform Operation, Please Call Support"]
        }
        if Response.StatusCode == 501 {
          return false, ["Failed to Perform Operation, Please Call Support"]
        }
      }
    })
    return HttpResponse, HttpErrors
}


function ResetPasswordRestController() {
  // Rest Controller, that Is Responsible for Resetting Password
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
      if Response.StatusCode == 201 {
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
