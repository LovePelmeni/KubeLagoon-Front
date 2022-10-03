var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST || "localhost"
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT || "8000"

/* eslint-disable no-unused-vars */

function DownloadSshKeyRestController(JwtToken, SshKeyPath, VirtualMachineId) {
  // Downloads SSH Public Key File to the Customer's Desktop, if the Virtual Machine has One
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/download/ssh/key/`)
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
  APIUrl.searchParams.append("SshKeyPath", SshKeyPath)
  
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

export {DownloadSshKeyRestController}
