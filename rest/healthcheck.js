import "../healthcheck/healthcheck.js"
/* eslint-disable no-unused-vars */

var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT


var Url = require('url-parse');

function GetHealthCheckMetricsRestController(jwtToken, VirtualMachineId) {
  // Rest Controller, that returns Metrics about the Health of the Virtual Machine Server
  var APIUrl = new Url("http://%s:%s/health/metrics/",
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT)
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
  try {
      ResponseData, ResponseErrors = global.jQuery.ajax({
        URL: APIUrl,
        type: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Authorization": jwtToken,
        },
        success: function(Response) {
          // Processing Success Healthchecks Model
          return NewMetric.Deserialize(), Response.Error
        },
        error: function(Error){
          return null, new Error(Error)
        },
      })
      return ResponseData, ResponseErrors
  } catch (APIException) {
    return null, new Error(APIException)
  }
}

export {GetHealthCheckMetricsRestController}
