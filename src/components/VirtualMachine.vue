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
      <span class="back-text" @click="redirectToPreviousPage()">Go Back</span>
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
        <a class="download-ssh-key-button flex" :href="VirtualMachine.SshKeyFilePath" download><h1>Download SSH Keys</h1></a>
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
        <p class="date-label">Virtual Machine Date</p>
        <p class="date-body">{{ VirtualMachine.paymentDueDate }}</p>
      </div>
      <div class="name">
        <p class="name-label">Bill to:</p>
        <p class="name-body">{{ VirtualMachine.CustomerName }}</p>
      </div>
      <div class="mail">
        <p class="mail-label">Sent to:</p>
        <p class="mail-body">{{ VirtualMachine.CustomerEmail }}</p>
      </div>
      <div class="due">
        <p class="due-label">Virtual Machine Bill Due</p>
        <p class="due-body">{{ VirtualMachine.PaymentDue }}</p>
      </div>
      <div class="client-adress">
        <p class="client-street">{{ Customer.Street }}</p>
        <p class="client-city">{{ Customer.City }}</p>
        <p class="client-postcode">{{ Customer.ZipCode }}</p>
        <p class="client-country">{{ Customer.Country }}</p>
      </div>
      <div class="item-container">
        <p>Resource</p> 
        <p>Usage</p>
        <p>Total</p>
        <div
          class="project-item"
          v-for="(PropertyName, index) in Object.keys(
            {'Cpu': VirtualMachine.Cpu, 'Memory': VirtualMachine.Memory, 
            'Storage': VirtualMachine.StorageCapacity,
          })"
          :key="index"
        >
          <p class="prj-text">{{ PropertyName }}</p>
          <p class="prj-text">{{ VirtualMachine[PropertyName] }}</p>

          <!-- Receiving the Cost of the Specific Property  (Cpu, Memory, etc....)-->
          <p class="prj-text">
            &#8378; {{ GetPropertyCost(PropertyName, VirtualMachine[PropertyName]) }} 
          </p>
        </div>
      </div>
      <div class="amount">
        <p class="amount-text">Total Amount</p>
        <p class="amount-number">
          &#8378; {{ VirtualMachine.TotalCost }}
        </p>
      </div>
    </div>
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
    this.getVirtualMachineServerOwnerInfo()
  },
  data() {
    return {
      Customer: {}, // Object
      VirtualMachine: {}, // Object
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
      window.location.replace(document.referrer)
    },

    GetPropertyCost(PropertyName, PropertyValue) {
      // Returns the Cost of the Specific Property 

      if (PropertyName.toLowerCase() == "cpu") {
        // Calculating Price for the Cpu Property
        let calculator = new cost.CpuUsageBillCalculator(Number(PropertyValue))
        return calculator.Calculate()
      }
  
      if (PropertyName.toLowerCase() == "memory") {   
        // Calculating Price for the Memory Property 
                let calculator = new cost.MemoryUsageBillCalculator(Number(PropertyValue))
        return calculator.Calculate()
      }

      if (PropertyName.toLowerCase() == "storagecapacity") {
        // Calculating Price for the Storage Capacity Property
        let calculator = new cost.StorageUsageBillCalculator(Number(PropertyValue))
        return calculator.Calculate()
      }
    },

    getVirtualMachineServerInfo() {
      // Returns the Virtual Machine Object Info based on the ID passed at query params 
      let VirtualMachineId = this.$route.query.VirtualMachineId
      let VirtualMachine, VirtualMachineError = this.GET_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)
      if (VirtualMachineError != null) {let ErrorMessage = "Server Not Found";

      this.TOGGLE_ERROR(ErrorMessage); 
      this.$router.push({name: 'main_page'})}
      this.VirtualMachine = VirtualMachine
    },
    getVirtualMachineServerCustomer() {
      // Returns the Info about the Owner Of the Virtual Machine  
      let VirtualMachineId = this.$route.query.VirtualMachineId
      let Customer, CustomerError = this.GET_VIRTUAL_MACHINE_OWNER(VirtualMachineId)
      if (CustomerError != null) {
      let ErrorMessage = "Server Owner not found"; 
      this.TOGGLE_ERROR(ErrorMessage); this.$router.push({name: "main_page"})}
      this.Customer = Customer
    },
    deleteVirtualMachine() {
      // Deletes the Virtual Machine Server 
      let VirtualMachineId = this.VirtualMachine.VirtualMachineId 
      this.DELETE_VIRTUAL_MACHINE(VirtualMachineId)
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