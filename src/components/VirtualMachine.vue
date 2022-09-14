<template>
  <main class="detail">
    <router-link :to="{ name: 'main_page' }" class="link">
      <svg
        class="back-icon"
        color="hsl(252, 94%, 67%)"
        viewBox="0 0 1024 1024"
        style="stroke: currentcolor; fill: currentcolor"
      >
        <path
          d="M730.6 18.4l-505.4 505.2 505.4 505.4 144.8-144.8-360.6-360.6 360.6-360.4z"
        ></path>
      </svg>
      <span class="back-text">Go Back</span>
    </router-link>
    <div class="status-container">
      <p class="status-title">Status</p>
      <p
        class="status-body"
        :class="[
          VirtualMachine.Running === true
            ? 'running'
            : VirtualMachine.Shutdown === true
            ? 'shutdown'
            : 'deploying',
        ]"
      >
        <span class="status-circle">.</span> {{ VirtualMachine.status }}
      </p>
      <div class="btn-container">
        <button
          class="btn btn-edit"
          v-if="VirtualMachine.Running === true" 
          @click="startVirtualMachine"
        >
          Run
        </button>
        <button class="btn btn-delete" @click="deleteVirtualMachine">Delete</button>
        <button
          class="btn btn-mark"
          v-if="VirtualMachine.status === 'Running'"
          @click="Shutdown"
        >
          Shutdown
        </button>
      </div>
    </div>

    <div class="details">
      <div class="project-info">
        <p class="project-id">#{{ VirtualMachine.VirtualMachineId }}</p>
        <p class="project-desc">{{ VirtualMachine.VirtualMachineName }}</p>
      </div>
      <div class="adress">
        <p class="adress-street">{{ VirtualMachine.BillingAddress }}</p>
        <p class="adress-city">{{ VirtualMachine.city }}</p>
        <p class="adress-postcode">{{ VirtualMachine.postCode }}</p>
        <p class="adress-country">{{ VirtualMachine.country }}</p>
      </div>
      <div class="date">
        <p class="date-label">Invoice Date</p>
        <p class="date-body">{{ VirtualMachine.paymentDueDate }}</p>
      </div>
      <div class="name">
        <p class="name-label">Bill to:</p>
        <p class="name-body">{{ VirtualMachine.clientName }}</p>
      </div>
      <div class="mail">
        <p class="mail-label">Sent to:</p>
        <p class="mail-body">{{ VirtualMachine.clientEmail }}</p>
      </div>
      <div class="due">
        <p class="due-label">Invoice Due</p>
        <p class="due-body">{{ VirtualMachine.invoiceDue }}</p>
      </div>
      <div class="client-adress">
        <p class="client-street">{{ Customer.Street }}</p>
        <p class="client-city">{{ Customer.City }}</p>
        <p class="client-postcode">{{ Customer.ZipCode }}</p>
        <p class="client-country">{{ Customer.Country }}</p>
      </div>
      <div class="item-container">
        <p>ID</p>
        <p>Name</p>
        <p></p>
        <p>Total</p>
        <div
          class="project-item"
          v-for="(item, index) in invoice.projects"
          :key="index"
        >
          <p class="prj-text">{{ item.name }}</p>
          <p class="prj-text">{{ item.quantity }}</p>
          <p class="prj-text">
            &#8378; {{ VirtualMachine.TotalCost.toLocaleString("en-US") }}
          </p>
          <p class="prj-text">
            &#8378; {{ VirtualMachine.TotalCost.toLocaleString("en-US") }}
          </p>
        </div>
      </div>
      <div class="amount">
        <p class="amount-text">Total Amount</p>
        <p class="amount-number">
          &#8378; {{ VirtualMachine.TotalCost.toLocaleString("en-US") }}
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "InvoiceDetail",
  props: {
    id: String,
    index: Number,
  },
  computed: {
    ...mapState(["virtualMachines"]),
    ...mapGetters(["filteredData"]),
    invoice() {
      return this.filteredInvoices[this.index];
    },
  },
  methods: {
    ...mapActions([
      "DELETE_VIRTUAL_MACHINE",
    ]),
    deleteItem() {
      let index = this.VirtualMachines.findIndex(
        (item) => item.id === this.invoice.id
      );
      this.DELETE_VIRTUAL_MACHINE(index);
      this.$router.push({ name: "Home" });
    },
    markAsPaid() {
      let index = this.VirtualMachines.findIndex(
        (item) => item.id === this.invoice.id
      );
      this.MARK_INVOICE(index);
    },
    editInvoice() {
      this.SET_EDIT({ status: true, id: this.virtualMachine.id });
      this.SET_MENU_IS_OPEN();
    },
  },
};
</script>

<style scoped>
.detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px 150px 50px 220px;
  color: white;
}
.link {
  text-decoration: none;
}
.back-icon {
  width: 10px;
  height: 10px;
}
.back-text {
  color: white;
  font-weight: 700;
  margin-left: 20px;
}
.status-container {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  background-color: #1e2238;
  border-radius: 8px;
}
.status-title {
  font-weight: 600;
  color: hsl(231, 75%, 93%);
  flex-basis: 60px;
}
.status-body {
  width: 105px;
  padding: 13px 0 13px 40px;
  border-radius: 6px;
  font-weight: 700;
  display: flex;
  align-items: center;
  position: relative;
}
.status-circle {
  font-size: 40px;
  position: absolute;
  left: 15px;
  top: -14px;
}
.draft {
  background-color: #292c45;
  color: rgb(224, 228, 251);
}
.pending {
  background-color: rgba(255, 145, 0, 0.06);
  color: rgb(255, 145, 0);
}
.paid {
  background-color: rgba(51, 215, 160, 0.06);
  color: rgb(51, 215, 160);
}
.btn-container {
  margin-left: auto;
}
.btn {
  padding: 16px 24px;
  border: none;
  border-radius: 24px;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
.btn-edit {
  background-color: #252946;
  margin-left: auto;
}
.btn-edit:hover {
  background-color: #1b1d32;
}
.btn-delete {
  background-color: #ec5555;
  margin-left: 10px;
}
.btn-delete:hover {
  background-color: #fb999a;
}
.btn-mark {
  background-color: #7b5cfa;
  margin-left: 10px;
}
.btn-mark:hover {
  background-color: #9175ff;
}
.details {
  padding: 20px 30px;
  display: grid;
  background-color: #1e2238;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  border-radius: 8px;
}
.project-info {
  grid-column-start: 1;
  grid-column-end: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.project-id {
  font-size: 16px;
  font-weight: 700;
}
.date-body,
.due-body,
.name-body,
.mail-body {
  font-size: 15px;
  font-weight: 700;
}
.adress {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  grid-column-start: 3;
  grid-column-end: 4;
}
.date {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column-start: 1;
  grid-column-end: 2;
  gap: 10px;
}
.name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column-start: 2;
  grid-column-end: 3;
  gap: 10px;
}
.mail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column-start: 3;
  grid-column-end: 4;
  gap: 10px;
}
.due {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  grid-column-start: 1;
  grid-column-end: 2;
  gap: 10px;
}
.client-adress {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column-start: 2;
  grid-column-end: 3;
}
.item-container {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 5;
  padding: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #252946;
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  row-gap: 20px;
}
.project-item {
  grid-column-start: 1;
  grid-column-end: 5;
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
}
.prj-text {
  font-weight: 700;
}
.amount {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 5;
  grid-row-end: 6;
  padding: 20px 70px 20px 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #0d0e17;
  margin-top: -20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.amount-number {
  font-size: 20px;
  font-weight: 700;
}
@media screen and (max-width: 1024px) {
  .detail {
    padding: 100px 120px 20px 120px;
  }
}
@media screen and (max-width: 750px) {
  .detail {
    padding: 100px 20px 20px 20px;
  }
}
</style>


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
