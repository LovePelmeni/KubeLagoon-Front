var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT || `8000`
var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST || `localhost`

/* eslint-disable no-unused-vars */

function GetVirtualMachineRestController(JwtToken, VirtualMachineId) {
  // Rest Controller, that returns Info about the Virtual Machine
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/vm/get/`);
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
  var Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl.toString(),
    type: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": JwtToken,
    },
    success: function() {
      // Returns Virtual Machine
      if (Response.StatusCode == 200 && Response.StatusCode == 201) {
        return Response.QuerySet, null
      }else{
        let newError = new Error(Response.Error)
        return {}, newError
      }
    },
    error: function(APIError) {
      // Returns Exception
      let newError = new Error(APIError)
      return {}, newError
    },
  })
  return Response, ResponseError
}

function GetVirtualMachinesRestController(JwtToken) {
  // Rest Controller, that returns Queryset of the Customer's Virtual Machines
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/vm/get/list/`);
  var Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl.toString(),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": JwtToken,
    },
    type: "get",
    success: function(Response) {
        if (Response.StatusCode == 201 && Response.StatusCode == 200) {
          return Response.QuerySet, null
        }else{
          let newError = new Error(Response.Error)
          return [], newError
        }
    },
    error: function(APIError) {
      let newError = new Error(APIError)
      return [], newError
    },
  })
  return Response, ResponseError
}



function InitializeVirtualMachineRestController(JwtToken, Configuration) {
  // Rest Controller, that Initializes New Virtual Machine
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/vm/initialize/`);
  let Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl.toString(),
    type: "POST",
    data: JSON.stringify({"HardwareConfiguration": Configuration}),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken,
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          let newError = new Error(Response.Error)
          return null, newError
        }else{
          return Response.VmInfo, null // Returns Info About Initialized Instance
        }
    },
    error: function(APIError) {
      // Processing Initialization Error
      let newError = new Error(APIError)
      return null, newError
    }
  })
  return Response, ResponseError
}

function ApplyVirtualMachineConfigurationRestController(JwtToken, CustomConfiguration, VirtualMachineId) {
  // Rest Controller, that Applying Custom Configuration to the Initialized Virtual Machine
  
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/vm/apply/configuration/`);
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl.toString(),
    type: "POST",
    data: JSON.stringify({"CustomizedConfiguration": CustomConfiguration}),
    dataType: "json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken,
      "Access-Control-Allow-Credentials": "true",
    },
    success: function (Response) {
      if (Response.StatusCode != 200 && Response.StatusCode != 201) {
        let newError = new Error(Response.Error)
        return null, newError
      }else{
        return Response.SshInfo, null
      }
    },
    error: function(APIError) {
      let newError = new Error(APIError)
      return null, newError
    }
  })
  return Response, ResponseError
}


function DestroyVirtualMachineRestController(JwtToken, VirtualMachineId) {
  // Rest Controller, deletes Virtual Machine Server, that Customer is desired to

  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/vm/destroy/`);
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
  let Response, ResponseError = global.jQuery.ajax({
    url: APIUrl.toString(),
    async: false,
    type: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authorization": JwtToken,
    },
    success: function(Response) {
      // Processing Success Response
      if (Response.StatusCode != 200 && Response.StatusCode != 201) {
        let newError = new Error(Response.Error)
        return false, newError
      }else{
        return true, null
      }
    },
    error: function(ResponseError) {
      // Processing Error Response
      return false, new Error(ResponseError)
    }
  })
  return Response, ResponseError
}

function StartVirtualMachineRestController(JwtToken, VirtualMachineId) {
  // Rest Controller, that Starts Virtual Machine
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/os/reboot/`);
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl.toString(),
    type: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken,
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          let newError = new Error(Response.Error)
          return false, newError
        }else{
          return true, null // Returns Info About Initialized Instance
        }
    },
    error: function(APIError) {
      // Processing Initialization Error
      let newError = new Error(APIError)
      return false, newError
    }
  })
  return Response, ResponseError
}

function ShutdownVirtualMachineRestController(JwtToken, VirtualMachineId) {
  // Rest Controller, that Shuts Down Virtual Machine
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/os/reboot/`);
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl.toString(),
    type: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken,
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
            let newError = new Error(Response.Error)
            return false, newError
        }else{
          return true, null // Returns Info About Initialized Instance
        }
    },
    error: function(APIError) {
      // Processing Initialization Error
      let newError = new Error(APIError)
      return false, newError
    }
  })
  return Response, ResponseError
}

function RebootVirtualMachineRestController(JwtToken, VirtualMachineId) {
  // Rest Controller, that Reboots Virtual Machine
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/os/reboot/`);
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl.toString(),
    type: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken,
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          let newError = new Error(Response.Error)
          return false, newError
        }else{
          return true, null // Returns Info About Initialized Instance
        }
    },
    error: function(APIError) {
      // Processing Initialization Error
      let newError = new Error(APIError)
      return false, newError
    }
  })
  return Response, ResponseError
}


function StartVmOsRestController(JwtToken, VirtualMachineId) {
  // Rest Controller, that Starts Virtual Machine Os HostSystem
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/os/start/`);
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl.toString(),
    type: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken,
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          let newError = new Error(Response.Error)
          return false, newError
        }else{
          return true, null // Returns Info About Initialized Instance
        }
    },
    error: function(APIError) {
      // Processing Initialization Error
      let newError = new Error(APIError)
      return false, newError
    }
  })
  return Response, ResponseError
}

function ShutdownVmOsRestController(JwtToken, VirtualMachineId) {
  // Rest Controller, that Shuts Down Virtual Machine Os HostSystem
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/os/shutdown/`);
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl.toString(),
    type: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken,
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          let newError = new Error(Response.Error)
          return false, newError
        }else{
          return true, null // Returns Info About Initialized Instance
        }
    },
    error: function(APIError) {
      // Processing Initialization Error
      let newError = new Error(APIError)
      return false, newError
    }
  })
  return Response, ResponseError
}

function RebootVmOsRestController(JwtToken, VirtualMachineId) {
  // Rest Controller, that Reboots Virtual Machine Os HostSystem
  var APIUrl = new URL(`http://${BACKEND_APPLICATION_HOST}:${BACKEND_APPLICATION_PORT}/os/reboot/`);
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  let Response, ResponseError = global.jQuery.ajax({
    async: false,
    url: APIUrl.toString(),
    type: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization": JwtToken,
      "Access-Control-Allow-Credentials": "true",
    },
    success: function(Response){
        // Processing Initialization Response
        if (Response.StatusCode != 201 && Response.StatusCode != 200) {
          let newError = new Error(Response.Error)
          return false, newError
        }else{
          return true, null // Returns Info About Initialized Instance
        }
    },
    error: function(APIError) {
      // Processing Initialization Error
      let newError = new Error(APIError)
      return false, newError
    }
  })
  return Response, ResponseError
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
