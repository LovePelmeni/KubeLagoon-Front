import "../healthcheck/healthcheck.js"
import $ from "jquery";

/* eslint-disable no-unused-vars */

var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT

var Url = require('url-parse');

function GetHealthCheckMetricsRestController(VirtualMachineId) {
  // Rest Controller, that returns Metrics about the Health of the Virtual Machine Server
  var APIUrl = new Url("http://%s:%s/health/metrics/",
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT)
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
  try {
      ResponseData, ResponseErrors = $.ajax({
        url: APIUrl,
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Authorization": $.cookie("jwt-token"),
        },
        success: function(Response) {
          // Processing Success Healthchecks Model
          return NewMetric.Deserialize(), Response.Error
        },
        error: function(Error){
          return null, Error(Error)
        },
      })
      return ResponseData, ResponseErrors
  } catch (APIException) {
    return null, Error(APIException)
  }
}
