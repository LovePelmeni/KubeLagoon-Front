
import $ from "jquery";
var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT


var Url = require('url-parse');



function ApplySshSupportRestController(VirtualMachineId){
    // Rest Controller, that Applies SSH Support to the Customer's Virtual Machine Server

    var APIUrl = new Url("http://%s:8000/vm/ssh/")
    APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

    try {
        Response, Error = $.ajax({
          url: APIUrl,
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Authorization": $.cookie("jwt-token"),
          },
          success: function(Response) {
            if (Response.StatusCode == 201) {
              return Response.SshInfo
            }else{
              return null, Error(Response.Error)
            }
          },
          error: function(Error) {
            return null, Error(Error)
          }
        })
        return Response, Error
  } catch (APIException) {
    return null, APIException
  }
}

function RemoveSshKeyRestController(SshKeyPath, VirtualMachineId) {
  // Rest Controller, that Removes SSH Key pair from the Virtual Machine Server
}
function UpdateSshKeyRestController(SshKeyPath, VirtualMachineId) {
  // Updates SSH Keys for the Customer's Virtual Machine Server
  return ApplySshSupportRestController()
}

function DownloadSshKeyRestController(SshKeyPath, VirtualMachineId) {
  // Downloads SSH Public Key File to the Customer's Desktop
}
