import "../configuration_preparer/preparer.js"
var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST

class VirtualMachineManager {
  // Class That Manages Virtual Machine
  function InitializeVirtualMachine(Configuration: preparer.HardwareConfiguration) -> Object {
    // Initializes New Empty Virtual Machine Server
    configurationPreparer = new preparer.ConfigurationPreparer()
    var APIUrl = new url.URL("http://%s:8000/vm/initialize/", BACKEND_APPLICATION_HOST)
    try {
    Response = $.ajax({
      async: false,
      method: "POST",
      data: configurationPreparer.PrepareHardwareConfiguration(),
      url: APIUrl,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Authorization": $.getCookie("jwt-token"),
      },
      success: function(Response) {
        // Processing Response
        if (Response.StatusCode == 201) {
          return Response.InitializedVmInfo // Consists of the Virtual Machine ID
        }else{
          return null
        }
      },
      error: function(Error) {
        return Error
      },
    })
    return Response
  }catch (e) as APIException {
    return null
  }
  }

  function ApplyVirtualMachineConfiguration(Configuration: preparer.CustomConfiguration, VirtualMachineId: String) -> Object {
    // Applying Configuration to the Virtual Machine
    var APIUrl = new url.URL("http://%s:8000/vm/apply/configuration/", BACKEND_APPLICATION_HOST)
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
              return Response.VmInfo
            }else{
              return null
            }
          },
          error: function(Error) {
            throw Error
          }
        })
    return Response
  } catch(e) as APIException {
      return null
    }
  }
  function GetVirtualMachineInfo(VirtualMachineId: String) -> Object {
    // Receiving Virtual Machine Server
    var APIUrl = new url.URL("http://%s:8000/vm/get/")
    APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
    try {
        Response = $.ajax({
          url: APIUrl,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Authorization": $.getCookie("jwt-token"),
          },
          success: function(Response) {
            if (Response.StatusCode == 201 || Response.StatusCode == 200) {
              Vm = JSON.Parse(Response.VirtualMachine)
              return Vm
            }else{
              return null
            }
          },
          error: function(Error) {
            throw Error
          }
        })
  } catch(e) as APIException {
    return null
  }
  }
  function GetVirtualMachines(CustomerId: String) -> Object {
    // Receives all Virtual Machine Servers, belongs to the Customer
    var APIUrl = new url.URL("http://%s:8000/vm/get/list/")
    try {
        Response = $.ajax({
          url: APIUrl,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Authorization": $.getCookie("jwt-token"),
          },
          success: function(Response) {
            if (Response.StatusCode == 201 || Response.StatusCode == 200) {
              VmQuerySet = JSON.Parse(Response.VirtualMachine)
              return Vm
            }else{
              return null
            }
          },
          error: function(Error) {
            throw Error
          }
        })
  } catch(e) as APIException {
    return null
  }
}
