import "../configuration_preparer/preparer.js"

class VirtualMachineManager {

  function InitializeVirtualMachine(Configuration: preparer.HardwareConfiguration) {
    // Initializes New Empty Virtual Machine Server
  }
  function ApplyVirtualMachineConfiguration(Configuration: preparer.CustomConfiguration, VirtualMachineId: String, CustomerId: String) {
    // Applying Configuration to the Virtual Machine
  }
  function GetVirtualMachineInfo(VirtualMachineId: String, CustomerId: String) {
    // Receiving Virtual Machine Server
  }
  function GetVirtualMachines(CustomerId: String) {
    // Receives all Virtual Machine Servers, belongs to the Customer
  }
}
