<template>
  <router-link class="virtualMachine flex" @onclick="RedirectHome()" :to="{name: 'main_page'}">
  <router-link :to="{ name: 'main_page'}">Go Back</router-link>

    <div class="left flex" v-if="virtualMachineLoaded">
      <span class="tracking-number"># General Info</span>
      <span class="person">{{ VirtualMachineId }}</span>
      <span class="due-date">{{ VirtualMachineName }}</span>
      <span class="person">{{ IPAddress }}</span>
    </div>

    <div class="left flex" v-if="virtualMachineLoaded">
      <span class="tracking-number"># SSH Info</span>
      <span class="tracking-number" v-if="RootUserName">Root User: {{ virtualMachine.RootUserName }}</span>
      <span class="tracking-number" v-if="RootUserPassword">Root Password: {{ virtualMachine.RootUserPassword }}</span>
      <span class="tracking-number" v-if="SslEnabled">SSL Enabled</span>
      <span class="tracking-number" v-if="RootCertificate">Certificate: {{ virtualMachine.SslCertificate }}</span>
    </div>

    <div class="left flex" v-if="virtualMachineLoaded">
      <span class="tracking-number"># Cost</span>
      <span class="tracking-number" v-if="TotalCostThisMonth">Total Cost This Month: {{ virtualMachine.MaxCpuUsage}}</span>
      <span class="tracking-number" v-if="PricePerDay">Price Per Day: {{ virtualMachine.MaxCpuUsage}}</span>
    </div>

    <div class="left flex" v-if="virtualMachineLoaded">
      <span class="tracking-number"># Resources</span>
      <span class="tracking-number" v-if="MaxCpuUsage">MaxCpuUsage: {{ virtualMachine.MaxCpuUsage}}</span>
      <span class="tracking-number" v-if="MaxMemoryUsage">MaxMemoryUsage: {{ virtualMachine.MaxMemoryUsage }}</span>
    </div>


    <div class="left flex" v-if="virtualMachineLoaded">
      <span class="tracking-number"># Health </span>
      <span class="tracking-number" v-if="CpuUsage">CPU Usage: {{ virtualMachine.CpuUsage }}</span>
      <span class="tracking-number" v-if="MemoryUsage">Memory Usage: {{ virtualMachine.MemoryUsage }}</span>
    </div>


    <div class="left flex" v-if="virtualMachineLoaded">
      <span class="tracking-number">#  </span>
      <span class="tracking-number" v-if="CpuUsage">CPU Usage: {{ virtualMachine.CpuUsage }}</span>
      <span class="tracking-number" v-if="MemoryUsage">Memory Usage: {{ virtualMachine.MemoryUsage }}</span>
    </div>

    <div class="right flex" v-if="virtualMachineLoaded">
      <div class="status-button flex">
        <span class="green" v-if="Status=='Running'">Running</span>
        <span class="red" v-if="Status=='Failure'">Failure</span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>

import * as healthcheck from "../healthcheck/healthcheck.js";
import { newRouter } from "../../router/router.js";
import { mapMutations } from "vuex";
import { useCookies } from "vue3-cookies";


export default {

  name: "virtualMachineInfo",
  setup() {
    const { cookie } = useCookies();
    return { cookie };
  },
  mounted() {
    this.JwtToken = this.cookie.get("jwt-token")
  },
  data() {
    return {
      // Authentication Credentials 
      JwtToken: this.cookie.get("jwt-token"),

      virtualMachineLoaded: false,
      // Owner Name
      CustomerName: GetCustomerName(),

      // General Virtual Machine Info
      VirtualMachineId: null,
      VirtualMachineName: null,
      IPAddress: null,

      // Ssh Info
      RootUserName: null,
      RootUserPassword: null,
      SslEnabled: null,

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
      Status: null,

      // Health Check API Class
      HealthAPICheckerJobName: null,
    }
  },
  created() {
    this.GetCustomerVirtualMachine()
    this.GetVirtualMachineHealthMetrics()
  },
  methods: {

    ...mapMutations(["TOGGLE_ERROR"]),

    RedirectHome() {
      // Redirect Back to the Main Page
      this.HideVirtualMachineHealthMetrics(this.HealthAPICheckerJobName)
      newRouter.push({name: "main_page"})
    },

    ShowError(ErrorMessage) {
      // Showing up and Error
      this.TOGGLE_ERROR(ErrorMessage)
    },

    GetCustomerVirtualMachine() {
      // Returns Virtual Machine Info, (is not being changed dynamically)

      let VirtualMachineId = this.$route.params.VirtualMachineId
      VirtualMachine, VirtualMachineError = this.GET_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)

      if (VirtualMachineError != null) {
          this.ShowError(VirtualMachineError.Error)
      }else{

          this.virtualMachineLoaded = true
          this.CustomerName = VirtualMachineInfo["Metadata"]["OwnerName"]

          this.VirtualMachineId = VirtualMachineInfo["Metadata"]["VirtualMachineId"]
          this.VirtualMachineName = VirtualMachineInfo["Metadata"]["VirtualMachineName"]
          this.IPAddress        = VirtualMachineInfo["Metadata"]["IPAddress"]

          this.RootUserName     = VirtualMachineInfo["SshCredentials"]["RootUserName"]
          this.RootUserPassword = VirtualMachineInfo["SshCredentials"]["RootUserPassword"]
          this.RootCertificate = VirtualMachineInfo["SshCredentials"]["RootCertificate"]
          this.SslEnabled       = VirtualMachineInfo["SshCredentials"]["SslEnabled"]

          this.TotalCostThisMonth = VirtualMachineInfo["Cost"]["TotalCostThisMonth"] // Total Cost this Month, based on the VM Usage
          this.PricePerDay      = VirtualMachineInfo["Cost"]["PricePerDay"] // Price Per Day, based on the VM Setup

          this.DatacenterName = VirtualMachineInfo["Datacenter"]["DatacenterName"]
          this.MaxCpuUsage = VirtualMachineInfo["ResourcesLimits"]["MaxCpuUsage"]
          this.MaxCpuUsage = VirtualMachineInfo["ResourceLimits"]["MaxMemoryUsage"]
          this.StorageCapacity = VirtualMachineInfo["ResourceLimits"]["StorageCapacity"]
        }
    },

    ShowVirtualMachineHealthMetrics() {
      // Returns Health Metrics of the Virtual Machine

      let VirtualMachineId = this.$route.params.VirtualMachineId
      let HealthMetricsManager = new healthcheck.VirtualMachineHealthStateChecker()
      let JobUniqueName, StartError = HealthMetricsManager.StartHealthChecker(VirtualMachineId)

      if (StartError != null) {
        for (let Item in [this.CpuUsage, this.MemoryUsage, this.Status])  {
          Item.innerText = "Failed to Parse Item"
        }
      }else{
        this.HealthAPICheckerJobName = JobUniqueName
      }
    },
    HideVirtualMachineHealthMetrics(JobUniqueName){
      // Shuts down the Health Metrics API Crontab Job by stopping it using Job Unique Name
      let HealthMetricsManager = new healthcheck.VirtualMachineHealthStateChecker()
      HealthMetricsManager.RemoveHealthChecker(JobUniqueName)
    },
  },
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
