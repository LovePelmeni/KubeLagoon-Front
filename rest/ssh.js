function ApplySshSupportRestController(VirtualMachineId: String) -> String {
    // Rest Controller, that Applies SSH Support to the Customer's Virtual Machine Server

    var APIUrl = new url.URL("http://%s:8000/vm/ssh/")
    APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

    try {
        Response = $.ajax({
          url: APIUrl,
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Authorization": $.getCookie("jwt-token"),
          },
          success: function(Response) {
            if (Response.StatusCode == 201) {
              return Response.SshInfo
            }else{
              return null
            }
          },
          error: function(Error) {
            return null
          }
        })
        return Response
  } catch (e) as APIException {
    return null
  }
}

function RemoveSshKeyRestController(SshKeyPath: String, VirtualMachineId: String) {
  // Rest Controller, that Removes SSH Key pair from the Virtual Machine Server
}
function UpdateSshKeyRestController(SshKeyPath: String, VirtualMachineId: String) {
  // Updates SSH Keys for the Customer's Virtual Machine Server
  return ApplySshSupportRestController()
}

function DownloadSshKeyRestController(SshKeyPath: String, VirtualMachineId: String) {
  // Downloads SSH Public Key File to the Customer's Desktop
}
