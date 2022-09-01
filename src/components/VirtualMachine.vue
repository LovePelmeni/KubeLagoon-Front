<template>
  <router-link class="virtualMachine flex" :Created By="{ name: virtualMachine.CustomerName }">

    <div class="left flex">
      <span class="tracking-number"># General Info</span>
      <span class="person">{{ VirtualMchine.VirtualMachineId }}</span>
      <span class="due-date">{{ VirtualMachine.VirtualMachineName }}</span>
      <span class="person">{{ VirtualMachine.IPAddress }}</span>
    </div>

    <div class="left flex">
      <span class="tracking-number"># SSH Info</span>
      <span class="tracking-number" v-if="VirtualMachine.RootUserName">Root User: {{ VirtualMachine.RootUserName }}</span>
      <span class="tracking-number" v-if="VirtualMachine.RootUserPassword">Root Password: {{ VirtualMachine.RootUserPassword }}</span>
      <span class="tracking-number" v-if="VirtualMachine.Ssl">SSL Enabled</span>
      <span class="tracking-number" v-if="VirtualMachine.Ssl">Certificate: {{ VirtualMachine.SslCertificate }}</span>
    </div>

    <div class="left flex">
      <span class="tracking-number"># Cost</span>
      <span class="tracking-number" v-if="VirtualMachine.TotalCostThisMonth">Total Cost This Month: {{ VirtualMachine.MaxCpuUsage}}</span>
      <span class="tracking-number" v-if="VirtualMachine.PricePerDay">Price Per Day: {{ VirtualMachine.MaxCpuUsage}}</span>
    </div>

    <div class="left flex">
      <span class="tracking-number"># Resources</span>
      <span class="tracking-number" v-if="VirtualMachine.MaxCpuUsage">MaxCpuUsage: {{ VirtualMachine.MaxCpuUsage}}</span>
      <span class="tracking-number" v-if="VirtualMachine.MaxMemoryUsage">MaxMemoryUsage: {{ VirtualMachine.MaxMemoryUsage }}</span>
    </div>


    <div class="left flex">
      <span class="tracking-number"># Health </span>
      <span class="tracking-number" v-if="VirtualMachine.CpuUsage">CPU Usage: {{ virtualMachine.CpuUsage }}</span>
      <span class="tracking-number" v-if="VirtualMachine.MemoryUsage">Memory Usage: {{ virtualMachine.MemoryUsage }}</span>
    </div>

    <div class="right flex">
      <div class="status-button flex">
        <span class="green" v-if="VirtualMachine.State=='Running'">Running</span>
        <span class="red" v-if="VirtualMachine.State=='Failure'">Failure</span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>

import * as healthcheck from "../healthcheck/healthcheck.js"
import * as vm from "../../vm/vm.js"

function GetCustomerName() {
  // Returns Customer Name
}

export default {
  name: "virtualMachine",
  data() {
    return {
      // Owner Name
      CustomerName: GetCustomerName(),

      // General Virtual Machine Info
      VirtualMachineId: 0,
      VirtualMachineName: null,
      IPAddress: null,

      // Ssh Info
      RootUserName: null,
      RootUserPassword: null,
      Ssl: null,

      // Cost Info
      TotalCostThisMonth: null,
      PricePerDay: null,

      // Virtual Machine General Configuration
      DatacenterName: null,
      MaxCpuUsage: null,
      MaxMemoryUsage: null,
      StorageCapacity: null,

      // Health Metrics Attributes
      CpuUsage: null,
      MemoryUsage: null,
      State: null,

      // Health Check API Class
      HealthAPICheckerJobName: null,
    }
  },
  methods: {

    ShowError(ErrorMessage) {
      // Showing up and Error
    },

    ShowCustomerVirtualMachineInfo(VirtualMachineId) {
      // Returns Virtual Machine Info, (is not being changed dynamically)

      let VirtualMachineManager = new vm.VirtualMachineManager()
      let VirtualMachineInfo, ErrorValue = VirtualMachineManager.GetVirtualMachine(VirtualMachineId)

      if (ErrorValue != null) {this.ShowError(ErrorValue.error)}
      this.CustomerName = this.GetCustomerName()

      this.VirtualMachineId = VirtualMachineInfo["Metadata"]["VirtualMachineId"]
      this.VirtualMachineName = VirtualMachineInfo["Metadata"]["VirtualMachineName"]
      this.IPAddress        = VirtualMachineInfo["Metadata"]["IPAddress"]

      this.RootUserName     = VirtualMachineInfo["SshCredentials"]["RootUserName"]
      this.RootUserPassword = VirtualMachineInfo["SshCredentials"]["RootUserPassword"]
      this.Ssl              = VirtualMachineInfo["SshCredentials"]["Ssl"]

      this.TotalCostThisMonth = VirtualMachineInfo["Cost"]["TotalCostThisMonth"] // Total Cost this Month, based on the VM Usage
      this.PricePerDay      = VirtualMachineInfo["Cost"]["PricePerDay"] // Price Per Day, based on the VM Setup

      this.DatacenterName = VirtualMachineInfo["Datacenter"]["DatacenterName"]
      this.MaxCpuUsage = VirtualMachineInfo["ResourcesLimits"]["MaxCpuUsage"]
      this.MaxCpuUsage = VirtualMachineInfo["ResourceLimits"]["MaxMemoryUsage"]
      this.StorageCapacity = VirtualMachineInfo["ResourceLimits"]["StorageCapacity"]
    },

    ShowVirtualMachineHealthMetrics(VirtualMachineId) {
      // Returns Health Metrics of the Virtual Machine
      let HealthMetricsManager = new healthcheck.VirtualMachineHealthStateChecker()
      let JobUniqueName, StartError = HealthMetricsManager.StartHealthChecker(VirtualMachineId)

      if (StartError != null) {
        for (let Item in [this.CpuUsage, this.MemoryUsage, this.State])  {
          Item.innerText = "Failed to Parse Item"
        }
      }else{
        this.HealthAPICheckerJobName = JobUniqueName
      }
    },
    ShutdownVirtualMachineHealthMetrics(JobUniqueName){
      // Shuts down the Health Metrics API Crontab Job by stopping it using Job Unique Name
      let HealthMetricsManager = new healthcheck.VirtualMachineHealthStateChecker()
      HealthMetricsManager.RemoveHealthChecker(JobUniqueName)
    },
  }
}

</script>

<style lang="scss" scoped>
.virtualMachine {
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
