import "../../configuration_preparer/preparer.js"
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT
var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST

import $ from "jquery";
var Url = require('url-parse');

/* eslint-disable no-unused-vars */

function InitializeVirtualMachineRestController(Configuration) {
  // Rest Controller, that Initializes New Virtual Machine
  var APIUrl = new Url("http://%s:%s/vm/initialize/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  Response, Error= $.ajax({
    url: APIUrl,
    method: "POST",
    data: JSON.stringify({"HardwareConfiguration": Configuration}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 || Response.StatusCode != 200) {
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

  Response, Error = $.ajax({
    url: APIUrl,
    method: "POST",
    data: {
      "CustomizedConfiguration": CustomConfiguration,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function (Response) {
      if (Response.StatusCode != 200 || Response.StatusCode != 201) {
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


function StartVirtualMachineRestController(VirtualMachineId) {
  // Rest Controller, that Starts Virtual Machine
  var APIUrl = new Url("http://%s:%s/os/reboot/" %
  (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  Response, Error= $.ajax({
    url: APIUrl,
    method: "POST",
    data: JSON.stringify({"HardwareConfiguration": Configuration}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 || Response.StatusCode != 200) {
          return null, Error(Response.Error)
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

function ShutdownVirtualMachineRestController(VirtualMachineId) {
  // Rest Controller, that Shuts Down Virtual Machine
  var APIUrl = new Url("http://%s:%s/os/reboot/" %
  (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  Response, Error= $.ajax({
    url: APIUrl,
    method: "POST",
    data: JSON.stringify({"HardwareConfiguration": Configuration}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 || Response.StatusCode != 200) {
          return null, Error(Response.Error)
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

  Response, Error= $.ajax({
    url: APIUrl,
    method: "POST",
    data: JSON.stringify({"HardwareConfiguration": Configuration}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 || Response.StatusCode != 200) {
          return null, Error(Response.Error)
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

  Response, Error = $.ajax({
    url: APIUrl,
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 || Response.StatusCode != 200) {
          return null, Error(Response.Error)
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

function ShutdownVmOsRestController(VirtualMachineId) {
  // Rest Controller, that Shuts Down Virtual Machine Os HostSystem
  var APIUrl = new Url("http://%s:%s/os/shutdown/" %
  (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  Response, Error= $.ajax({
    url: APIUrl,
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 || Response.StatusCode != 200) {
          return null, Error(Response.Error)
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

function RebootVmOsRestController(VirtualMachineId) {
  // Rest Controller, that Reboots Virtual Machine Os HostSystem
  var APIUrl = new Url("http://%s:%s/os/reboot/" %
  (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  Response, Error= $.ajax({
    url: APIUrl,
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": $.cookie("jwt-token"),
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 || Response.StatusCode != 200) {
          return null, Error(Response.Error)
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
