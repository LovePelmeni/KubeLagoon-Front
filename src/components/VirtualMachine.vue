<template>
  <router-link class="virtualMachine flex" :Created By="{ name: virtualMachine.CustomerName">

    <div class="left flex">
      <span class="tracking-number">#{{ virtualMchine.VirtualMachineId }}</span>
      <span class="due-date">{{ virtualMachine.VirtualMachineName }}</span>
      <span class="person">{{ virtualMachine.IPAddress }}</span>
    </div>

    <div class="right flex">

      <h4>SSH Credentials</h4>
      <span class="price">${{ virtualMachine.SshCredentials }}</span>

      <div class="status-button flex">
        <span v-if="virtualMachine.invoicePaid">Paid</span>
        <span v-if="virtualMachine.invoiceDraft">Draft</span>
        <span v-if="virtualMachine.invoicePending">Pending</span>
        <span v-if="virtualMachine.invoicePaid">Paid</span>
        <span v-if="virtualMachine.invoiceDraft">Draft</span>
        <span v-if="virtualMachine.invoicePending">Pending</span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>

import "../healthcheck/healthcheck.js"
import "../../configuration_preparer/preparer.js"
import "../../vm/vm.js"

function GetCustomerName() {
  // Returns Customer Name
}

export default {
  name: "virtualMachine",
  data() {
    return {
      CustomerName: GetCustomerName(),
      // General Virtual Machine Info
      VirtualMachineId: 0,
      VirtualMachineName: null,
      IPAddress: null,
      SshCredentials: null,
      TotalCostThisMonth: null,
      PricePerDay: null,

      // Virtual Machine General Configuration
      DatacenterName: null,
      MaxCpuUsage: null,
      MaxMemoryUsage: null,

      // Health Metrics Attributes
      CpuUsage: null,
      MemoryUsage: null,
      State: null,
      OsState: null,
    }
  },
  methods: {

    function ShowError(ErrorMessage) {
      // Showing up and Error
    }

    function ShowCustomerVirtualMachineInfo(VirtualMachineId, CustomerId) {
      // Returns Virtual Machine Info
      VirtualMachineManager = new vm.VirtualMachineManager()
      VirtualMachineInfo, ErrorValue = VirtualMachineManager.GetVirtualMachine(VirtualMachineId, CustomerId)
      if (ErrorValue != null) {ShowError(ErrorValue.error)}
    },

    function ShowVirtualMachineResourceConfiguration(VirtualMachineId) {
      // Returns Virtual Machine Configuration Info
      newVirtualMachineManager = new vm.VirtualMachineManager()
      VirtualMachineConfiguration = newVirtualMachineManager.GetVirtualMachineConfiguration(VirtualMachineId)
      this.MaxCpuUsage = VirtualMachineConfiguration.Resources.MaxCpuUsage
      this.MaxMemoryUsage = VirtualMachineConfiguration.Resources.MaxMemoryUsage
    },

    function ShowVirtualMachineHealthMetrics(VirtualMachineId, CustomerId) {
      // Returns Health Metrics of the Virtual Machine
      HealthMetricsManager = new healthcheck.VirtualMachineHealthStateChecker()
      Started, StartError = HealthMetricsManager.StartHealthChecker(VirtualMachineId, CustomerId)
      if (StartError != null) {
        for (Item in [this.CpuUsage, this.MemoryUsage, this.State])  {
          Item = "Failed to Parse Item"
        }
      }
    },

    function ShutdownVirtualMachineHealthMetrics(JobUniqueName){
      // Shuts down the Health Metrics API Crontab Job by stopping it using Job Unique Name
      VirtualMachineId = document.getElementById("virtualMachineId")
      JobUniqueName = localStorage.getItem(VirtualMachineId + "-healthMetric")
      HealthMetricsManager = new healthcheck.VirtualMachineHealthStateChecker()
      Removed, RemoveError = HealthMetricsManager.RemoveHealthChecker(JobUniqueName)
    },
  }
}

</script>


<style lang="scss" scoped>
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
  align-items: center;
  span {
    font-size: 13px;
  }
  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;
    span {
      flex: 1;
    }
    .tracking-number {
      text-transform: uppercase;
    }
  }
  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;
    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600px;
    }
  }
}
