// Template Goes there

<script>

import "../healthcheck/healthcheck.js"

getVirtualMachine.addEventListener("click", function(event){
  // Showing up Virtual Machine 
  virtualMachineId = document.getElementById("virtualMachineId")
  VirtualMachine = GetCustomerVirtualMachine(virtualMachineId)
  ShowCustomerVirtualMachineComponent(VirtualMachine)
})

showResources.addEventListener("click", function(event){
  // Showing Up Virtual Machine Resouces Configuration
  VirtualMachineId = document.getElementById("virtualMachineId") 
  ResourcesInfo = GetVirtualMachineResourceConfiguration(VirtualMachineId)
  Resources = ShowCustomerVirtualMachineResourceComponent(ResourcesInfo)
  ShowCustomerVirtualMachineResourceComponent(Resources)
})

showCost.addEventListener("click", function(event){
  VirtualMachineId = document.getElementById("virtualMachineId")
  CostsInfo = GetVirtualMachineCostInfo(VirtualMachineId)
  ShowVirtualMachineCostComponent(CostsInfo)
})

showHealth.addEventListener("click", function(event){
  // Showing Up Virtual Machine Health Info
  VirtualMachineId = document.getElementById("virtualMachineId")
  CustomerId = $.getCookie("jwt-token")["UserId"]
  HealthInfo = GetVirtualMachineHealthMetrics(VirtualMachineId)
  ShowVirtualMachineHealthComponent(HealthInfo)
})

shutdownHealth.addEventListener("click", function(event){
  // Shuts down Health Metrics API 
  VirtualMachineId = document.getElementById("virtualMachineId")
  JobUniqueName = localStorage.getItem(VirtualMachineId + "-healthMetric") 
  ShutdownVirtualMachineHealthMetrics(JobUniqueName)
})



import "../../configuration_preparer/preparer.js"
import "../../vm/vm.js"

function GetCustomerVirtualMachine(VirtualMachineId, CustomerId) {
  // Returns Virtual Machine Info
  try{
    VirtualMachineManager = new vm.VirtualMachineManager()
    VirtualMachineInfo, ErrorValue = VirtualMachineManager.GetVirtualMachine(VirtualMachineId, CustomerId)
    if (ErrorValue != null) {return null, Error}
    return VirtualMachineInfo, Error
  }catch(Exception) {
    return null, Error("Virtual Machine Not Found :(")
  }
}
function GetVirtualMachineResourceConfiguration(VirtualMachineId) {
  // Returns Virtual Machine Configuration Info

}

function GetVirtualMachineHealthMetrics(VirtualMachineId, CustomerId) {
  // Returns Health Metrics of the Virtual Machine
  HealthMetricsManager = new healthcheck.VirtualMachineHealthStateChecker()
  HealthMetricsManager.StartHealthChecker(VirtualMachineId, CustomerId)
}

function ShutdownVirtualMachineHealthMetrics(JobUniqueName){
  // Shuts down the Health Metrics API Crontab Job by stopping it using Job Unique Name
  VirtualMachineId = document.getElementById("virtualMachineId")
  JobUniqueName = localStorage.getItem(VirtualMachineId + "-healthMetric") 
  HealthMetricsManager = new healthcheck.VirtualMachineHealthStateChecker()
  HealthMetricsManager.RemoveHealthChecker(JobUniqueName)
}

function ShowCustomerVirtualMachineComponent(VirtualMachineInfo) {
// Component Returns General Info about the Customer's Virtual Machine Server
    new Vue({
      el: "#virtualMachine",
      data() {
        return {
        name: VirtualMachineName,
        ip: VirtualMachineInfo.IP,
        sshKey: VirtualMachineInfo.SshKey,
        created_at: VirtualMachineInfo.CreatedAt,
        }
      }
    })
}

function ShowVirtualMachineCostComponent(CostInfo) {
  CostComponent = new Vue({
    el: "#costs",
    data() {
      return {
        totalSpendThisMonth: CostInfo.TotalMonthSpend,
        pricePerCpu: CostInfo.PricePerCpu,
        pricePerMemoryGigabyte: CostInfo.PricePerMemoryGigabyte,
      }
    }
  })
}

function ShowCustomerVirtualMachineResourceComponent(ResourcesInfo) {
  ResourceComponent = new Vue({
    el: "#resources",
    data() {
      return {
      MaxCpu: ResourcesInfo.MaxCpu,
      MaxMemory: ResourcesInfo.MaxMemory,
      }
    }
  })
}

function ShowVirtualMachineHealthComponent(HealthInfo) {
// Returns Component about the Virtual Machine Health Info
  HealthComponent = new Vue({
    el: "#health",
    data() {
      return {
      RuntimeState: HealthInfo.RuntimeState,
      CpuUsage: HealthInfo.CpuUsage,
      MemoryUsage: HealthInfo.MemoryUsage,
      OsRuntimeState: HealthInfo.OsRuntimeState,
      }
    }
  })
}
</script>

