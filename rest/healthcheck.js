import "../healthcheck/healthcheck.js"

function GetHealthCheckMetricsRestController(VirtualMachineId) {
  // Rest Controller, that returns Metrics about the Health of the Virtual Machine Server
  var APIUrl = new url.URL("http://%s:8000/health/metrics/", BACKEND_APPLICATION_HOST)
  APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
  try {
      ResponseData, ResponseErrors = $.ajax({
        url: APIUrl,
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Authorization": $.getCookie("jwt-token"),
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
