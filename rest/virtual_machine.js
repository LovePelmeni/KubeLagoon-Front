import "../../configuration_preparer/preparer.js"


function InitializeVirtualMachineRestController(Configuration: preparer.HardwareConfiguration) {
  // Rest Controller, that Initializes New Virtual Machine
}

function ApplyVirtualMachineConfigurationRestController(CustomConfiguration: preparer.CustomConfiguration) {
  // Rest Controller, that Applying Custom Configuration to the Initialized Virtual Machine
}



function StartVirtualMachineRestController(VirtualMachineId: String, CustomerId: String) {
  // Rest Controller, that Starts Virtual Machine
}

function ShutdownVirtualMachineRestController(VirtualMachineId: String, CustomerId: String) {
  // Rest Controller, that Shuts Down Virtual Machine
}

function RebootVirtualMachineRestController(VirtualMachineId: String, CustomerId: String) {
  // Rest Controller, that Reboots Virtual Machine
}




function StartVmOsRestController(VirtualMachineId: String, CustomerId: String) {
  // Rest Controller, that Starts Virtual Machine Os HostSystem
}

function ShutdownVmOsRestController(VirtualMachineId: String, CustomerId: String) {
  // Rest Controller, that Shuts Down Virtual Machine Os HostSystem
}

function RebootVmOsRestController(VirtualMachineId: String, CustomerId: String) {
  // Rest Controller, that Reboots Virtual Machine Os HostSystem
}
