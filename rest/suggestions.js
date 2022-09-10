var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT

var Url = require('url-parse');

  function GetLoadBalancerSuggestionsRestController() {
    // Returns Array of the Available Load Balancers
    var APIUrl = new Url("http://%s:%s/suggestions/load/balancer/" % (
    BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))

    let LoadBalancers, ResponseError = global.jQuery.ajax({
      URL: APIUrl,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
      async: false,
      type: "GET",
      success: function(Response) {
        // Processing an Response
        if (Response.StatusCode == 200) {
        return Response.QuerySet, null}
        let newError = new Error(Response.Error)
        return [], newError
      },
      error: function(APIError) {
        // Processing an Response Exception
        let NewError = new Error(APIError)
        return [], NewError
      }
    })
    return LoadBalancers, ResponseError
  }

  function GetDatacenterSuggestionsRestController() {
    //  Returns Array of the Available Datacenters, so Customer can pick up, which one to choose
    var APIUrl = new Url("http://%s:%s/suggestion/datacenter/" % (
    BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
    let Datacenters, ResponseError = global.jQuery.ajax({
      async: false,
      URL: APIUrl,
      type: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      success: function(Response) {
        // Processing Datacenters Queryset
        if (Response.StatusCode != 200 && Response.StatusCode != 201) {
          let NewError = new Error(Response.Error)
          return null, NewError
        }else{
        return Response.QuerySet, null}
      },
      error: function(APIError) {
        return [], new Error(APIError)
      },
    })
    return Datacenters, ResponseError
  }

  function GetOsSystemsSuggestionsRestController(){
    // Returns Array of the Available Os Systems + Distributions to them
    var APIUrl = new Url("http://%s:%s/suggestion/os/system/" % (
    BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
    let Datacenters, OsSystemsError = global.jQuery.ajax({
      async: false,
      URL: APIUrl,
      type: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      success: function(Response) {
        // Processing Datacenters Queryset
        if (Response.StatusCode != 200 && Response.StatusCode != 201) {
          let NewError = new Error(Response.Error)
          return null, NewError
        }else{
        return Response.QuerySet, null}
      },
      error: function(ResponseError) {
        let NewError = new Error(ResponseError)
        return [], NewError
      },
    })
    return Datacenters, OsSystemsError
  }

  function GetPreInstallationToolSuggestionsRestController(){
    // Rest Controller, that returns array of the Tools, that can be pre-installed on the Virtual Machine
    var APIUrl = new Url("http://%s:%s/suggestion/preinstall/tools" % (
    BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
    let Datacenters, DatacentersError = global.jQuery.ajax({
      async: false,
      URL, APIUrl,
      type: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      success: function(Response) {
        // Processing Datacenters Queryset
        if (Response.StatusCode != 200 && Response.StatusCode != 201) {
          let NewError = new Error(Response.Error)
          return [], NewError
        }else{
        return Response.QuerySet, null}
      },
      error: function(ResponseError) {
        let NewError = new Error(ResponseError)
        return [], NewError
      },
    })
    return Datacenters, DatacentersError
  }

export {
  GetPreInstallationToolSuggestionsRestController,
  GetOsSystemsSuggestionsRestController,
  GetDatacenterSuggestionsRestController,
  GetLoadBalancerSuggestionsRestController,
}
