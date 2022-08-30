import "../../configuration_preparer/preparer.js"


function InitializeVirtualMachineRestController(Configuration) {
  // Rest Controller, that Initializes New Virtual Machine
}

function ApplyVirtualMachineConfigurationRestController(CustomConfiguration) {
  // Rest Controller, that Applying Custom Configuration to the Initialized Virtual Machine
}


function StartVirtualMachineRestController(VirtualMachineId, CustomerId) {
  // Rest Controller, that Starts Virtual Machine
}

function ShutdownVirtualMachineRestController(VirtualMachineId, CustomerId) {
  // Rest Controller, that Shuts Down Virtual Machine
}

function RebootVirtualMachineRestController(VirtualMachineId, CustomerId) {
  // Rest Controller, that Reboots Virtual Machine
}




function StartVmOsRestController(VirtualMachineId, CustomerId) {
  // Rest Controller, that Starts Virtual Machine Os HostSystem
}

function ShutdownVmOsRestController(VirtualMachineId, CustomerId) {
  // Rest Controller, that Shuts Down Virtual Machine Os HostSystem
}

function RebootVmOsRestController(VirtualMachineId, CustomerId) {
  // Rest Controller, that Reboots Virtual Machine Os HostSystem
}
