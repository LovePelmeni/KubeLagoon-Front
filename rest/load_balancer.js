var Url = require("url-parse")
var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT


function CreateLoadBalancerRestController(VirtualMachineId) {
  // Rest Controller, that creates new Load Balancer
  var APIUrl = new Url("http://%s:%s/load/balancer/create/" % (
  BACKEND_APPLICATION_HOST, BACKNEND_APPLICATION_PORT))

  var Response, ResponseError = $.ajax({
    async: false,
    url: APIUrl,
    success: function(Response) {
      // Processing Response
      if (Response.StatusCode == 201) {
        return Response.LoadBalancerInfo, null
      }
    },
    error: function(ResponseError) {
      return false, Error(ResponseError)
    }
  })
  return Response, ResponseError
}

function GetLoadBalancerInfoRestController(VirtualMachineId) {
  // Rest Controller, that returns Info about the Load Balancer
  // Including IP, Health Info, etc....
  var APIUrl = new Url("http://%s:%s/load/balancer/get/info/" % (
  BACKEND_APPLICATION_HOST, BACKNEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  var Response, ResponseError = $.ajax({
    async: false,
    url: APIUrl,
    success: function(Response) {
      // Processing Response
      if (Response.StatusCode == 201) {
        return true, null
      }
    },
    error: function(ResponseError) {
      return false, Error(ResponseError)
    }
  })
  return Response, ResponseError
}
function RecreateLoadBalancerRestController(VirtualMachineId) {
  // Rest Controller, that Recreates Existing Load Balancer
  var APIUrl = new Url("http://%s:%s/load/balancer/recreate/" % (
  BACKEND_APPLICATION_HOST, BACKNEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  var Response, ResponseError = $.ajax({
    async: false,
    url: APIUrl,
    success: function(Response) {
      // Processing Response
      if (Response.StatusCode == 201) {
        return true, null
      }
    },
    error: function(ResponseError) {
      return false, Error(ResponseError)
    }
  })
  return Response, ResponseError
}

function DeleteLoadBalancerRestController(VirtualMachineId) {
  // Rest Controller, that Deletes Existing Load Balancer
  var APIUrl = new Url("http://%s:%s/load/balancer/delete/" % (
  BACKEND_APPLICATION_HOST, BACKNEND_APPLICATION_PORT))
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)

  var Response, ResponseError = $.ajax({
    async: false,
    url: APIUrl,
    success: function(Response) {
      // Processing Response
      if (Response.StatusCode == 201) {
        return true, null
      }
    },
    error: function(ResponseError) {
      return false, Error(ResponseError)
    }
  })
  return Response, ResponseError
}

export {CreateLoadBalancerRestController,
DeleteLoadBalancerRestController,
GetLoadBalancerInfoRestController}
