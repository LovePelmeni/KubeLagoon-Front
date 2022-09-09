import * as vm_rest from "../rest/virtual_machine.js"

/* eslint-disable no-unused-vars */

var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT


import $ from "jquery";
var Url = require("url-parse");


class VirtualMachineManager {
  // Class That Manages Virtual Machine

    InitializeVirtualMachine = function(Configuration){
      // Initializes New Empty Virtual Machine Serve
      return vm_rest.InitializeVirtualMachineRestController(Configuration)
    }

    ApplyVirtualMachineConfiguration = function(CustomizedConfiguration, VirtualMachineId) {
      // Applying Configuration to the Virtual Machine
      return vm_rest.ApplyVirtualMachineConfigurationRestController(CustomizedConfiguration, VirtualMachineId)
    }

    RebootVirtualMachine = function(VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
      return vm_rest.RebootVirtualMachineRestController(VirtualMachineId)
    }

    ShutdownVirtualMachine = function(VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
      return vm_rest.ShutdownVirtualMachineRestController(VirtualMachineId)
    }

    StartVirtualMachineOperationalSystem = function(VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
      return vm_rest.StartVirtualMachineRestController(VirtualMachineId)
    }

    RebootVirtualMachineOperationalSystem = function(VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
      return vm_rest.RebootVmOsRestController(VirtualMachineId)
    }

    ShutdownVirtualMachineOperationalSystem = function(VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
      return vm_rest.ShutdownVmOsRestController(VirtualMachineId)
    }

    GetCustomerVirtualMachineInfo = function(VirtualMachineId) {
      // Receives Info About Customers Virtual Machine
      return vm_rest.GetVirtualMachineRestController(VirtualMachineId)
    }
    GetCustomerVirtualMachines = function() {
      // Receives all Virtual Machine Servers, belongs to the Customer
        return vm_rest.GetVirtualMachinesRestController()
    }
}

export {VirtualMachineManager};
