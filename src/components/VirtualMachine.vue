// Template Goes there


<script>

import "../../configuration_preparer/preparer.js"
import "../../vm/vm.js"

function GetCustomerVirtualMachine(VirtualMachineId: String) -> (vm.VirtualMachineInfo, error){
  // Returns Virtual Machine Info
  try{
    VirtualMachineManager = new vm.VirtualMachineManager()
    VirtualMachineInfo, Error = VirtualMachineManager.GetVirtualMachine(VirtualMachineId)
    if Error != null {return null, Error}
    return VirtualMachineInfo, Error
  }
}

function ShowCustomerVirtualMachineComponent(VirtualMachineInfo: vm.VirtualMachineInfo) {
// Component Returns General Info about the Customer's Virtual Machine Server
    new Vue({
      el: "#virtualMachine",
      data: {
        name: VirtualMachineName,
        ip: VirtualMachineInfo.IP
        sshKey: VirtualMachineInfo.SshKey
        created_at:
      }
    })
}

function ShowVirtualMachineCostComponent(CostInfo: vm.VirtualMachineCostInfo) {
  CostComponent = new Vue({
    el: "#costs"
    totalSpendThisMonth: CostInfo.TotalMonthSpend,
    pricePerCpu: CostInfo.PricePerCpu,
    pricePerMemoryGigabyte: CostInfo.PricePerMemoryGigabyte,
  })
}

function ShowCustomerVirtualMachineResourceComponent(ResourcesInfo: vm.VirtualMachineResourcesInfo) {
  ResourceComponent = new Vue({
    el: "#resources",
    data: {
      MaxCpu: ResourcesInfo.MaxCpu,
      MaxMemory: ResourcesInfo.MaxMemory,
    }
  })
}

function ShowVirtualMachineHealthComponent(HealthInfo: healthcheck.HealthInfo) {
// Returns Component about the Virtual Machine Health Info
  HealthComponent = new Vue({
    el: "#health"
    data: {
      RuntimeState: HealthInfo.RuntimeState,
      CpuUsage: HealthInfo.CpuUsage,
      MemoryUsage: HealthInfo.MemoryUsage,
      OsRuntimeState: HealthInfo.OsRuntimeState,
    }
  })
}
</script>
