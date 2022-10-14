var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST || "localhost"
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT || "8000"

/* eslint-disable no-unused-vars */

function DownloadSshKeyRestController(JwtToken, VirtualMachineId) {
  // Downloads SSH Public Key File to the Customer's Desktop, if the Virtual Machine has One
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/get/ssh/certificate/`)
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
  
  let Response, ResponseError = global.jQuery.ajax({
    url: APIUrl, 
    type: "GET", 
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken,
    },
    success: function(Response) {
      if (Response.StatusCode == 200 || Response.StatusCode == 201) {
        return Response, null
      }
    },
    error: function(ResponseError){
      let newError = new Error(ResponseError)
      return null, newError
    }
  })
  return Response, ResponseError
}

function RegenerateSshCertificateRestController(JwtToken, VirtualMachineId) {
  // Rest Controller, for regenerating the SSH Certificate for the Virtual Machine Server 
  let APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/regenerate/ssh/certificate`)
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, ResponseError = global.jQuery.ajax({
    url: APIUrl.toString(),
    type: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Authorization": JwtToken,
    },
    success: function(response) {
      // Checking for the Success Response 
      console.log(response.responseJSON)
      if ('Error' in Object.keys(response.responseJSON) || response.StatusCode !== 200 || response.StatusCode !== 201) {
        let newError = new Error("Failed to regenerate SSH Certificate, UnknownError")
        return false, response.responseJSON["Error"] || newError 
      }
    },
    error: function(error) {
      // Checking for the Bad Response Errors 
      console.log(error)
      return false, error
    }
  })
  return Response, ResponseError
}

export {DownloadSshKeyRestController, RegenerateSshCertificateRestController}
