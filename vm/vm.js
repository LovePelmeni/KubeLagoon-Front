import * as preparer from "../configuration_preparer/preparer.js"

var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT

import $ from "jquery";
var Url = require("url-parse");

class VirtualMachineManager {
  // Class That Manages Virtual Machine
  InitializeVirtualMachine = function(Configuration){
    // Initializes New Empty Virtual Machine Server
    let configurationPreparer = new preparer.ConfigurationPreparer()
    var APIUrl = new Url("http://%s:%s/vm/initialize/",
    BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT)
    try {
    let Response, Error = $.ajax({
      async: false,
      method: "POST",
      data: JSON.stringify(configurationPreparer.PrepareHardwareConfiguration(Configuration)),
      url: APIUrl,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Authorization": $.cookie("jwt-token"),
      },
      success: function(Response) {
        // Processing Response
        if (Response.StatusCode == 201) {
          return Response.InitializedVmInfo // Consists of the Virtual Machine ID
        }else{
          return null, Error(Response.Error)
        }
      },
      error: function(Error) {
        return null, Error(Error)
      },
    })
    return Response
  }catch (APIException){
    return null, Error(APIException)
  }
  }

  ApplyVirtualMachineConfiguration = function(CustomizedConfiguration, VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
    var APIUrl = new Url("http://%s:%s/vm/apply/configuration/" % (
    BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
    APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
    try {
        let Response, Error = $.ajax({
          url: APIUrl,
          method: "POST",
          data: JSON.stringify({"CustomizedConfiguration": CustomizedConfiguration}),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Authorization": $.cookie("jwt-token"),
          },
          success: function(Response) {
            if (Response.StatusCode == 201) {
              return Response.VmInfo, null
            }else{
              return null, Error(Response.Error)
            }
          },
          error: function(Error) {
            return null, Error(Error)
          }
        })
    return Response, Error
  } catch(APIException){
      return null, APIException
    }
  }
  GetVirtualMachineInfo = function(VirtualMachineId) {
    // Receiving Virtual Machine Server
    var APIUrl = new Url("http://%s:%s/vm/get/" % (
    BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
    APIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
    try {
        Response = $.ajax({
          url: APIUrl,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Authorization": $.cookie("jwt-token"),
          },
          success: function(Response) {
            if (Response.StatusCode == 201 || Response.StatusCode == 200) {
              let Vm = JSON.Parse(Response.VirtualMachine)
              return Vm
            }else{
              return null, Error(Response.Error)
            }
          },
          error: function(Error) {
            return null, Error(Error)
          }
        })
        return Response, Error
  } catch(APIException){
    return null, APIException
  }
  }
  GetVirtualMachines = function() {
    // Receives all Virtual Machine Servers, belongs to the Customer
    var APIUrl = new Url("http://%s:%s/vm/get/list/" %
    (BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT))
    try {
        let Response, Error = $.ajax({
          url: APIUrl,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Authorization": $.cookie("jwt-token"),
          },
          success: function(Response) {
            if (Response.StatusCode == 201 || Response.StatusCode == 200) {
              let VmQuerySet = JSON.Parse(Response.VirtualMachine)
              return VmQuerySet, null
            }else{
              return null, Error(Response.Error)
            }
          },
          error: function(Error) {
            return null, Error(Error)
          }
        })
        return Response, Error
  } catch(APIException)  {
    return null, APIException
  }
}}
