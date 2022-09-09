import "../configuration_preparer/preparer.js"
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT
var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST

var $ = global.jQuery;
window.$ = $;
var Url = require('url-parse');

/* eslint-disable no-unused-vars */

function GetVirtualMachineRestController(VirtualMachineId) {
  // Rest Controller, that returns Info about the Virtual Machine
  var APIUrl = new Url("http://%s:%s/vm/get/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
  var Response, ResponseError = $.ajax({
    URL: APIUrl,
    type: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": $.cookie("jwt-token"),
    },
    success: function() {
      // Returns Virtual Machine
      if (Response.StatusCode == 200 && Response.StatusCode == 201) {
        return Response.QuerySet, null
      }else{
        return {}, Error(Response.Error)
      }
    },
    error: function(Error) {
      // Returns Exception
      return {}, Error(Error)
    },
  })
  return Response, ResponseError
}

function GetVirtualMachinesRestController() {
  // Rest Controller, that returns Queryset of the Customer's Virtual Machines
  var APIUrl = new Url("http://%s:%s/vm/get/list/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  var Response, ResponseError = $.ajax({
    URL: APIUrl,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": $.cookie("jwt-token"),
    },
    type: "GET",
    success: function(Response) {
        if (Response.StatusCode == 201 && Response.StatusCode == 200) {
          return Response.QuerySet, null
        }else{
          return [], Error(Response.Error)
        }
    },
    error: function(Error) {
      return [], Error(Error)
    },
  })
  return Response, ResponseError
}



function InitializeVirtualMachineRestController(Configuration) {
  // Rest Controller, that Initializes New Virtual Machine
  var APIUrl = new Url("http://%s:%s/vm/initialize/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  let Response, Error= $.ajax({
    async: false,
    URL: APIUrl,
    type: "POST",
    data: JSON.stringify({"HardwareConfiguration": Configuration}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          return null, Error(Response.Error)
        }else{
          return Response.VmInfo, null // Returns Info About Initialized Instance
        }
    },
    error: function(Error) {
      // Processing Initialization Error
      return null, Error(Error)
    }
  })
  return Response, Error
}

function ApplyVirtualMachineConfigurationRestController(CustomConfiguration, VirtualMachineId) {
  // Rest Controller, that Applying Custom Configuration to the Initialized Virtual Machine
  var APIUrl = new Url("http://%s:%s/vm/apply/configuration/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, Error = $.ajax({
    async: false,
    URL: APIUrl,
    type: "POST",
    data: JSON.stringify({"CustomizedConfiguration": CustomConfiguration}),
    dataType: "json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function (Response) {
      if (Response.StatusCode != 200 && Response.StatusCode != 201) {
        return null, Error(Response.Error)
      }else{
        return Response.SshInfo, null
      }
    },
    error: function(Error) {
      return null, Error(Error)
    }
  })
  return Response, Error
}


function DestroyVirtualMachineRestController(VirtualMachineId) {
  // Rest Controller, deletes Virtual Machine Server, that Customer is desired to
  var APIUrl = new Url("http://%s:%s/vm/destroy/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  let Response, ResponseError = $.ajax({
    URL: APIUrl,
    async: false,
    type: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": $.cookie('jwt-token'),
    },
    success: function(Response) {
      // Processing Success Response
      if (Response.StatusCode != 200 && Response.StatusCode != 201) {
        return null, Error(Response.Error)
      }else{
        return "Successfully Removed", null
      }
    },
    error: function(ResponseError) {
      // Processing Error Response
      return null, Error(ResponseError)
    }
  })
  return Response, ResponseError
}

function StartVirtualMachineRestController(VirtualMachineId) {
  // Rest Controller, that Starts Virtual Machine
  var APIUrl = new Url("http://%s:%s/os/reboot/" %
  (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, Error = $.ajax({
    async: false,
    URL: APIUrl,
    type: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          return null, Error(Response.Error)
        }else{
          return "Successfully Started", null // Returns Info About Initialized Instance
        }
    },
    error: function(Error) {
      // Processing Initialization Error
      return null, Error(Error)
    }
  })
  return Response, Error
}

function ShutdownVirtualMachineRestController(VirtualMachineId) {
  // Rest Controller, that Shuts Down Virtual Machine
  var APIUrl = new Url("http://%s:%s/os/reboot/" %
  (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, Error = $.ajax({
    async: false,
    URL: APIUrl,
    type: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          return "Successfully Shutdown", Error(Response.Error)
        }else{
          return Response.Operation, null // Returns Info About Initialized Instance
        }
    },
    error: function(Error) {
      // Processing Initialization Error
      return null, Error(Error)
    }
  })
  return Response, Error
}

function RebootVirtualMachineRestController(VirtualMachineId) {
  // Rest Controller, that Reboots Virtual Machine
  var APIUrl = new Url("http://%s:%s/os/reboot/" %
  (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, Error = $.ajax({
    async: false,
    URL: APIUrl,
    type: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          return "Successfully Rebooted", Error(Response.Error)
        }else{
          return Response.Operation, null // Returns Info About Initialized Instance
        }
    },
    error: function(Error) {
      // Processing Initialization Error
      return null, Error(Error)
    }
  })
  return Response, Error
}




function StartVmOsRestController(VirtualMachineId) {
  // Rest Controller, that Starts Virtual Machine Os HostSystem
  var APIUrl = new Url("http://%s:%s/os/start/" %
  (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, Error = $.ajax({
    async: false,
    URL: APIUrl,
    type: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          return null, Error(Response.Error)
        }else{
          return "OS Successfully Started", null // Returns Info About Initialized Instance
        }
    },
    error: function(Error) {
      // Processing Initialization Error
      return null, Error(Error)
    }
  })
  return Response, Error
}

function ShutdownVmOsRestController(VirtualMachineId) {
  // Rest Controller, that Shuts Down Virtual Machine Os HostSystem
  var APIUrl = new Url("http://%s:%s/os/shutdown/" %
  (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, Error = $.ajax({
    async: false,
    URL: APIUrl,
    type: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          return null, Error(Response.Error)
        }else{
          return "OS Successfully Shutdown", null // Returns Info About Initialized Instance
        }
    },
    error: function(Error) {
      // Processing Initialization Error
      return null, Error(Error)
    }
  })
  return Response, Error
}

function RebootVmOsRestController(VirtualMachineId) {
  // Rest Controller, that Reboots Virtual Machine Os HostSystem
  var APIUrl = new Url("http://%s:%s/os/reboot/" %
  (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, Error = $.ajax({
    async: false,
    URL: APIUrl,
    type: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          return null, Error(Response.Error)
        }else{
          return "OS Successfully Reboot", null // Returns Info About Initialized Instance
        }
    },
    error: function(Error) {
      // Processing Initialization Error
      return null, Error(Error)
    }
  })
  return Response, Error
}

export {
  GetVirtualMachineRestController,
  GetVirtualMachinesRestController,
  InitializeVirtualMachineRestController,
  ApplyVirtualMachineConfigurationRestController,
  DestroyVirtualMachineRestController,
  StartVirtualMachineRestController,
  ShutdownVirtualMachineRestController,
  RebootVirtualMachineRestController,
  StartVmOsRestController,
  ShutdownVmOsRestController,
  RebootVmOsRestController,
}
