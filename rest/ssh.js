var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT

/* eslint-disable no-unused-vars */

var Url = require('url-parse');

function DownloadSshKeyRestController(JwtToken, SshKeyPath, VirtualMachineId) {
  // Downloads SSH Public Key File to the Customer's Desktop, if the Virtual Machine has One
  var APIUrl = new URL("http://%s:%s/download/ssh/key" % BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT)
  let Response, ResponseError = global.jQuery.ajax({
    url: APIUrl, 
    type: "GET", 
    headers: {
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

export {RemoveSshKeyRestController,
UpdateSshKeyRestController,
DownloadSshKeyRestController}
