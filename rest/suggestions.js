var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT

import $ from "jquery";

/* eslint-disable no-unused-vars */

var Url = require('url-parse');


function GetLoadBalancerSuggestionsRestController() {
  // Returns Array of the Available Load Balancers
  var APIUrl = new Url("http://%s:%s/suggestions/load/balancer/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))

  let LoadBalancers, ResponseError = $.ajax({
    url: APIUrl,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    async: false,
    method: "GET",
    success: function(Response) {
      // Processing an Response
      if (Response.StatusCode == 200) {
      return Response.QuerySet, null}
      return null, Error(Response.Error)
    },
    error: function(ResponseError) {
      // Processing an Response Exception
      return null, Error(ResponseError)
    }
  })
  return LoadBalancers, ResponseError
}

function GetDatacenterSuggestionsRestController() {
  //  Returns Array of the Available Datacenters, so Customer can pick up, which one to choose
  var APIUrl = new Url("http://%s:%s/suggestion/datacenter/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  let Datacenters, Error = $.ajax({
    async: false,
    url: APIUrl,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authentication": $.cookie("jwt-token"),
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

function GetOsSystemsSuggestionsRestController(){
  // Returns Array of the Available Os Systems + Distributions to them
  var APIUrl = new Url("http://%s:%s/suggestion/os/system/" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  let Datacenters, Error = $.ajax({
    async: false,
    url: APIUrl,
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Authentication": $.cookie("jwt-token"),
    },
    success: function(Response) {
      // Processing Datacenters Queryset
      if (Response.StatusCode != 200 && Response.StatusCode != 201) {
        return null, Error(Response.Error)
      }else{
      return Response.QuerySet, null}
    },
    error: function(ResponseError) {
      return null, Error(ResponseError)
    },
  })
  return Datacenters, Error
}

function GetPreInstallationToolSuggestionsRestController(){
  // Rest Controller, that returns array of the Tools, that can be pre-installed on the Virtual Machine
  var APIUrl = new Url("http://%s:%s/suggestion/preinstall/tools" % (
  BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
  let Datacenters, DatacentersError = $.ajax({
    async: false,
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
    error: function(ResponseError) {
      return null, Error(ResponseError)
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
