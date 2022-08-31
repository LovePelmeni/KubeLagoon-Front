var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT

function GetDatacenterSuggestionsRestController() -> list {
  //  Returns Array of the Available Datacenters, so Customer can pick up, which one to choose
  var APIUrl = new url.URL("http://%s:%s/suggestion/datacenter/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  Datacenters, Error = $.ajax({
    url: APIUrl,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authentication": $.getCookie("jwt-token"),
    },
    success: function(Response) {
      // Processing Datacenters Queryset
      if (Response.StatusCode != 200 && Response.StatusCode != 201) {
        return null, Error(Response.Error)
      }else{
      return Response.QuerySet, null}
    },
    error: function(Error) {
      return null, Error(Error)
    },
  })
  return Datacenters, Error
}

function GetOsSystemsSuggestionsRestController() -> list {
  // Returns Array of the Available Os Systems + Distributions to them
  var APIUrl = new url.URL("http://%s:%s/suggestion/os/system/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  Datacenters, Error = $.ajax({
    url: APIUrl,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authentication": $.getCookie("jwt-token"),
    },
    success: function(Response) {
      // Processing Datacenters Queryset
      if (Response.StatusCode != 200 && Response.StatusCode != 201) {
        return null, Error(Response.Error)
      }else{
      return Response.QuerySet, null}
    },
    error: function(Error) {
      return null, Error(Error)
    },
  })
  return Datacenters, Error
}

function GetPreInstallationToolSuggestionsRestController() -> list {
  // Rest Controller, that returns array of the Tools, that can be pre-installed on the Virtual Machine
  var APIUrl = new url.URL("http://%s:%s/suggestion/preinstall/tools" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  Datacenters, Error = $.ajax({
    url: APIUrl,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authentication": $.getCookie("jwt-token"),
    },
    success: function(Response) {
      // Processing Datacenters Queryset
      if (Response.StatusCode != 200 && Response.StatusCode != 201) {
        return null, Error(Response.Error)
      }else{
      return Response.QuerySet, null}
    },
    error: function(Error) {
      return null, Error(Error)
    },
  })
  return Datacenters, Error
}
