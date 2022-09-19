<template>
  <main class="detail">
    <router-link :to="{ name: 'main_page' }" style="margin-right: 40px;" class="link">
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
      <span class="back-text" @click="redirectToPreviousPage()">Go Back</span>
    </router-link>
    <div class="status-container">
      <p class="status-title" style="margin-top: 6px; margin-right: 3px;">Status</p>
      <div style="margin-top: 6px; margin-left: 60px;"
         class="status-body"
        :class="[
          VirtualMachine.Running === true
            ? 'running'
            : VirtualMachine.Shutdown === true
            ? 'shutdown'
            ? VirtualMachine.Deploying === true
            : 'deploying'
            : 'unknown',
        ]"> <a style="margin-right: 10px;" v-if="VirtualMachine.Running === true">Running</a>
            <a style="margin-right: 10px;" v-if="VirtualMachine.Deploying === true">Running</a>
            <a style="margin-right: 10px;" v-if="VirtualMachine.Shutdown">Shutdown</a>
            <a style="margin-right: 10px;" v-if="VirtualMachine.Running === false && VirtualMachine.Deploying === false && VirtualMachine.Shutdown === false">Unknown</a>
            
        <span class="status-circle" style="margin-right: 5px" v-if="VirtualMachine.Running" />
        <span class="status-circle" style="margin-right: 5px" v-if="VirtualMachine.Deploying" />
        <span class="status-circle" style="margin-right: 5px" v-if="VirtualMachine.Shutdown" />
        <span class="status-circle" style="margin-right: 5px" v-if="!VirtualMachine.Running && !VirtualMachine.Deploying && !VirtualMachine.Shutdown" />

      </div>
      <div class="btn-container">
        <button
          class="btn btn-edit"
          v-if="VirtualMachine.Running === false" 
          @click="StartVirtualMachine"
        >
          Run
        </button>
        <button
          class="btn btn-edit"
          disabled
          v-else
        >
          Run
        </button>

        <button class="btn btn-delete" @click="deleteVirtualMachine">Delete</button>
        <button
          class="btn btn-mark"
          v-if="VirtualMachine.Shutdown === false"
          @click="ShutdownVirtualMachine"
        >
          Shutdown
        </button>
        <button
          class="btn btn-mark"
          v-else
          disabled
        >
          Shutdown
        </button>

        <button
          class="btn btn-reboot"
          v-if="VirtualMachine.Running == true || VirtualMachine.Shutdown == true"
          @click="RebootVirtualMachine"
        >
          Reboot
        </button>

        <button
          v-else
          class="btn btn-reboot"
          disabled
          >
          Reboot
        </button>
      </div>
    </div>

    <div class="details">
      <div class="project-info">
        <p class="project-id">#{{ VirtualMachine.VirtualMachineId }}</p>
        <p class="project-desc">{{ VirtualMachine.VirtualMachineName }}</p>
      </div>

      <div class="date">
        <p class="project-id" style="margin-bottom: 10px">Bill Due Date</p>
        <p class="date-body">{{ VirtualMachine.paymentDueDate || new Date() }}</p>

        <p class="project-id" style="margin-top: 30px">Bill Due Terms</p>
        <p class="due-body">{{ VirtualMachine.PaymentDue || 0 }} days</p>
      </div>
      <div class="name">
        <p class="project-id" style="margin-bottom: 10px">Bill to</p>
        <p class="name-body">{{ VirtualMachine.Owner.Username }}</p>
        <p class="name-body">{{ VirtualMachine.Owner.Email }}</p>
        <p class="name-body">{{ VirtualMachine.Owner.City }}, {{ VirtualMachine.Owner.Country }}</p>
        <p class="name-body">{{ VirtualMachine.Owner.ZipCode }}</p>
      </div>

      <div class="adress">
        <p class="project-id">Bill From</p>
        <p class="adress-street" style="margin-top: 10px">KubeLagoon, Inc</p>
        <p class="adress-city" style="margin-top: 10px">Vancoover, Canada</p>
        <p class="adress-postcode" style="margin-top: 10px">125167</p>
        <p class="adress-country" style="margin-top: 10px">Smith Street, 4</p>
      </div>
      <div class="item-container">
        <p>Resource</p> 
        <p>Usage</p>
        <p>Total Per Day</p>
        <div
          class="project-item"
          v-for="(PropertyName, index) in Object.keys(
            {'CpuNum': VirtualMachine.Cpu, 'Memory': VirtualMachine.Memory, 
            'StorageCapacity': VirtualMachine.StorageCapacity,
          })"
          :key="index"
        >
          <p class="prj-text" v-if="PropertyName.toLowerCase() !== 'storagecapacity'">{{ PropertyName }}</p>
          <p class="prj-text" v-else>Storage Capacity</p>
          <p class="prj-text" v-if="PropertyName.toLowerCase() == 'cpunum'">{{ VirtualMachine[PropertyName]|| 0 }}</p>
          <p class="prj-text" v-if="PropertyName.toLowerCase() == 'memory'">{{ VirtualMachine[PropertyName] || 0 }}MB</p>
          <p class="prj-text" v-if="PropertyName.toLowerCase() == 'storagecapacity'">{{ VirtualMachine[PropertyName] || 0 }}GB</p>

          <!-- Receiving the Cost of the Specific Property  (Cpu, Memory, etc....)-->
          <p class="prj-text">
            &#36;{{ GetPropertyCost(PropertyName, VirtualMachine[PropertyName]) }} 
          </p>
        </div>
      </div>
      <div class="amount">
        <p class="amount-text">Total Amount Per Month</p>
        <p class="amount-number">
          &#36;{{ GetTotalAmount(VirtualMachine["CpuNum"], VirtualMachine["Memory"], VirtualMachine["StorageCapacity"]) }}
        </p>
      </div>
    </div>
    <v-snackbar :v-if="VirtualMachineError" top color="red">
        Registration Failed, {{ RegisterError }}
      </v-snackbar>
  </main>
</template>

<script>

import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import { useCookies } from "vue3-cookies";
import * as cost from "../../cost/virtualMachineCost";

export default {
  name: "VirtualMachineInfo",
  setup() {
    const { cookie } = useCookies();
    return { cookie };
  },
  mounted() {
    this.JwtToken = this.cookie?.get("jwt-token")
    this.getVirtualMachineServerInfo()
  },
  data() {
    return {
      VirtualMachineError: null,
      VirtualMachine: {
        "VirtualMachineName": "virtual-server",
        "VirtualMachineId": "125",
        "CpuNum": 1,
        "Memory": 10,
        "StorageCapacity": 10,
        "paymentDueDate": "2020-02-02",
        "paymentDueTerms": "30",
        "Running": true, 
        "Deploying": false, 
        "Shutdown": false,
        Owner: {
        "Username": "some_username",
        "Email": "some_email@gmail.com",
        "BillingAddress": "some-address",
        "City": "Vancoover",
        "Country": "Canada",
        "ZipCode": "some-zip-code",
        "Street": "Smith Street, 4",
      }
      }, // Object
    }
  },
  methods: { 
    ...mapActions([
      "DELETE_VIRTUAL_MACHINE",
      "RUN_VIRTUAL_MACHINE",
      "SHUTDOWN_VIRTUAL_MACHINE",
      "REBOOT_VIRTUAL_MACHINE",
      "GET_VIRTUAL_MACHINE",
    ]),
    ...mapMutations([
      "TOGGLE_ERROR",
    ]),


    RedirectToPreviousPage() {
      // redirects customer to the Previous Page 
      this.$router.push({name: "main_page"})
    },

    GetPropertyCost(PropertyName, PropertyValue) {
      // Returns the Cost of the Specific Property for Per Day

      if (PropertyName.toLowerCase() == "cpunum") {
        // Calculating Price for the Cpu Property
        let calculator = new cost.CpuUsageBillCalculator(Number(PropertyValue) || 0)
        return Math.round(calculator.Calculate() / 30)
      }
  
      if (PropertyName.toLowerCase() == "memory") {   
        // Calculating Price for the Memory Property 
        let calculator = new cost.MemoryUsageBillCalculator(Number(PropertyValue) || 0)
        return Math.round(calculator.Calculate() / 30)
      }

      if (PropertyName.toLowerCase() == "storagecapacity") {
        // Calculating Price for the Storage Capacity Property
        let calculator = new cost.StorageUsageBillCalculator(Number(PropertyValue) || 0)
        return Math.round(calculator.Calculate() / 30)
      }
    },


    GetTotalAmount(CpuNum, MemoryUsage, StorageUsage) {
      // Returns the Full Total Amount for the Whole Virtual Machine Server Per Month
      let calculator = new cost.VirtualMachineCostCalculator(
      Number(CpuNum) || 0, Number(MemoryUsage) || 0, Number(StorageUsage) || 0)
      return calculator.CalculateCostPerMonth()
    },

    getVirtualMachineServerInfo() {
      // Returns the Virtual Machine Object Info based on the ID passed at query params 
      let VirtualMachineId = this.$route.query.VirtualMachineId
      let VirtualMachine, VirtualMachineError = this.GET_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)
      if (VirtualMachineError != null) {let ErrorMessage = "Server Not Found";

      this.TOGGLE_ERROR(ErrorMessage); 
      this.$router.push({name: 'main_page'})}else{
      this.VirtualMachine = VirtualMachine}
    },

    DeleteVirtualMachine() {
      // Deletes the Virtual Machine Server 
      let VirtualMachineId = this.$route.query.VirtualMachineId 
      this.DELETE_VIRTUAL_MACHINE(VirtualMachineId)
    },

    StartVirtualMachine() {
      let VirtualMachineId = this.$route.query.VirtualMachineId 
      this.RUN_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)
    },
    ShutdownVirtualMachine() {
      let VirtualMachineId = this.$route.query.VirtualMachineId 
      this.SHUTDOWN_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)
    },
    RebootVirtualMachine() {
      let VirtualMachineId = this.$route.query.VirtualMachineId 
      this.REBOOT_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)
    },
  },
};

</script>

<style lang="scss">


.download-ssh-key-button {
  // Button for downloading ssh key of the Virtual Machine Server
  background-color: green; 
  border-radius: 10px;
}

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
  padding: 13px 0 13px 13px;
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
.shutdown {
  background-color: #292c45;
  color: rgb(224, 228, 251);
}
.deploying {
  background-color: rgba(255, 145, 0, 0.06);
  color: rgb(255, 145, 0);
}
.running {
  background-color: rgba(51, 215, 160, 0.06);
  color: rgb(51, 215, 160);
}
.unknown {
  background-color: rgba(51, 215, 160, 0.06);
  color: white;
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
  background-color: green;
  margin-left: auto;
}
.btn-edit:hover {
  background-color: green;
}

.btn-edit:disabled {
  background-color: darkgreen;
}

.btn-delete {
  background-color: #ec5555;
  margin-left: 10px;
}

.btn-delete:disabled {
  background-color: darkred;
  margin-left: 10px;
}

.btn-reboot {
  background-color: orange;
  margin-left: 10px;
}
.btn-reboot:disabled {
  background-color: darkorange;
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
.btn-download-ssh-keys {
  background-color: green;
  margin-top: 10px;
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
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  grid-column-start: 3;
  grid-column-end: 3;
}
.date {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column-start: 1;
  grid-column-end: 2;
  gap: 10px;
}
.name {
  margin-top: 20px;
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