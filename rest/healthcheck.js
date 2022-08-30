import "../healthcheck/healthcheck.js"

function GetHealthCheckMetricsRestController(CustomerId, VmId) {
  // Rest Controller, that returns Metrics about the Health of the Virtual Machine Server
  var APIUrl = new url.URL("http://%s:8000/health/metrics/", BACKEND_APPLICATION_HOST)
  APIUrl.searchParams.append("CustomerId", CustomerId)
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
        success: function(Response) -> String, list {
          // Processing Success Healthchecks Model
          return NewMetric.Deserialize(), []
        },
        error: function(Error) -> Object, list {
          return null, [Error]
        },
      })
      return ResponseData, ResponseErrors
  } catch (e) as APIException {
    return null
  }
}
