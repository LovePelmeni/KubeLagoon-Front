import * as vm_rest from "../rest/virtual_machine.js"

class VirtualMachineManager {
  // Class That Manages Virtual Machine

    InitializeVirtualMachine = function(JwtToken, Configuration){
      // Initializes New Empty Virtual Machine Serve
      return vm_rest.InitializeVirtualMachineRestController(JwtToken, Configuration)
    }

    ApplyVirtualMachineConfiguration = function(JwtToken, CustomizedConfiguration, VirtualMachineId) {
      // Applying Configuration to the Virtual Machine
      return vm_rest.ApplyVirtualMachineConfigurationRestController(JwtToken, CustomizedConfiguration, VirtualMachineId)
    }

    DestroyVirtualMachine(JwtToken, VirtualMachineId) {
      // Destroyes the Virtual Machine Server 
      return vm_rest.DestroyVirtualMachineRestController(JwtToken, VirtualMachineId)
    }

    StartVirtualMachine(JwtToken, VirtualMachineId) {
      // Starts up the Virtual Machine Server 
      return vm_rest.StartVirtualMachineRestController(JwtToken, VirtualMachineId)
    }

    RebootVirtualMachine = function(JwtToken, VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
      return vm_rest.RebootVirtualMachineRestController(JwtToken, VirtualMachineId)
    }

    ShutdownVirtualMachine = function(JwtToken, VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
      return vm_rest.ShutdownVirtualMachineRestController(JwtToken, VirtualMachineId)
    }

    StartVirtualMachineOperationalSystem = function(JwtToken, VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
      return vm_rest.StartVirtualMachineRestController(JwtToken, VirtualMachineId)
    }

    RebootVirtualMachineOperationalSystem = function(JwtToken, VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
      return vm_rest.RebootVmOsRestController(JwtToken, VirtualMachineId)
    }

    ShutdownVirtualMachineOperationalSystem = function(JwtToken, VirtualMachineId) {
    // Applying Configuration to the Virtual Machine
      return vm_rest.ShutdownVmOsRestController(JwtToken, VirtualMachineId)
    }

    GetCustomerVirtualMachine = function(JwtToken, VirtualMachineId) {
      // Receives Info About Customers Virtual Machine
      return vm_rest.GetVirtualMachineRestController(JwtToken, VirtualMachineId)
    }

    GetCustomerVirtualMachines = function(JwtToken) {
      // Receives all Virtual Machine Servers, belongs to the Customer
        return vm_rest.GetVirtualMachinesRestController(JwtToken)
    }
  }

export {VirtualMachineManager};
