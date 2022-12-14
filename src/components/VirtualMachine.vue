<script>

import { mapState } from "vuex";
import { mapActions } from "vuex";
import { useCookies } from "vue3-cookies";

import VirtualMachineConnectionInfo from "../components/ConnectionInfo.vue";
import VirtualServerNotFoundWindow from "./VirtualServerNotFoundWindow.vue";

import ChartPage from "../components/ResourceCharts.vue";
import NotAuthenticatedWindow from "../components/NotAuthenticatedWindow.vue";
import ForbiddenWindow from "../components/ForbiddenWindow.vue";
import PaymentRequiredBanner from "../components/PaymentRequiredBanner.vue";

import * as cost from "../../cost/virtualMachineCost";
import * as resources from "../../usage/usage.js";

export default {

  components: { 
    VirtualServerNotFoundWindow, 
    ChartPage, 
    VirtualMachineConnectionInfo, 
    NotAuthenticatedWindow,
    ForbiddenWindow,
    PaymentRequiredBanner,
  },
  name: "VirtualMachineInfo",
  setup() {
    const { cookie } = useCookies();
    return { cookie };
  },
  mounted() {
    this.JwtToken = this.cookie?.get("jwt-token")
    this.MountResourceUsageMetrics()
  },
  created() {
    this.getVirtualMachineServerInfo()
    if (this.VirtualMachine.paid === false) {
      this.BlockOperationButtons()
    }
  },
  template: `
  <div v-if="ServerDoesExist && Authenticated && HasPermissions">
  <main class="detail">

    <!-- Virtual Machine Server Connection Info  -->

    <div class="paymentRequiredBannerBlock" style="width: auto; min-width: 1010px;">
      <payment-required-banner v-if="VirtualMachine.paid === false" />
    </div>

    <div class="virtualMachineConnectionInfo" v-if="VirtualMachine.paid === true">

    <virtual-machine-connection-info :VirtualMachine="VirtualMachine" ref="VirtualMachineConnectionInfo" />

    </div>


    <!-- Charts with the Resource Usage  -->

    <chart-page :VirtualMachineId="VirtualMachine.VirtualMachineId"  />

    <!-- Block with other Info  -->
    <div class="status-container" style="max-width: 100%; overflow: hidden; min-width: 1030px;">

      <p class="status-title" style="margin-top: 6px; margin-right: 3px;">Status</p>
      <div style="margin-top: 6px; margin-left: 40px;"
        class="status-body"
        :class="{
          'running': VirtualMachine.Running === true, 
          'deploying': VirtualMachine.Deploying === true,
          'shutdown': VirtualMachine.Shutdown === true,
          'unknown': VirtualMachine.Running === false && VirtualMachine.Deploying === false && VirtualMachine.Shutdown === false,
        }"
        > <a v-if="VirtualMachine.Running === true">Running</a>
          <a v-if="VirtualMachine.Deploying === true">Deploying</a>
          <a v-if="VirtualMachine.Shutdown === true" style="color: #fff !important;">Shutdown</a>
          <a v-if="VirtualMachine.Running === false && VirtualMachine.Deploying === false && VirtualMachine.Shutdown === false">Unknown</a>
            
        <span class="status-circle" style="margin-right: 5px" v-if="VirtualMachine.Running" />
        <span class="status-circle" style="margin-right: 5px" v-if="VirtualMachine.Deploying" />
        <span class="status-circle" style="margin-right: 5px" v-if="VirtualMachine.Shutdown" />
        <span class="status-circle" style="margin-right: 5px" v-if="!VirtualMachine.Running && !VirtualMachine.Deploying && !VirtualMachine.Shutdown" />

      </div>
      <div class="btn-container">
        <button
          :class="{
            'btn btn-edit': paymentRequired === false, 
            'btn btn-edit disabledOperationButton': paymentRequired === true,
          }"
          v-if="VirtualMachine.Running === false" 
          @click="StartVirtualMachine">
          <label 
          style="
            color: #fff;
            opacity: 1;
            align-content: center;
            align-items: center; 
          " v-if="paymentRequired === false">Run</label>
          <v-icon style="color: red;" v-if="paymentRequired === true">mdi-close</v-icon>
        </button>
        
        <button
          :class="{
            'btn btn-edit': paymentRequired === false, 
            'btn btn-edit disabledOperationButton': paymentRequired === true,
          }"
          disabled
          v-else>
          <label style="
          color: #fff;
          opacity: 1;
          align-content: center;
          align-items: center; " v-if="paymentRequired === false">Run</label>
          <v-icon style="color: red;" v-if="paymentRequired === true">mdi-close</v-icon>
        </button>

        <button 
          :class="{
           'btn btn-delete': paymentRequired === false,
           'btn btn-delete disabledOperationButton': paymentRequired === true
          }" 
          @click="DeleteVirtualMachine">
          <label style="
          color: #fff;
          opacity: 1;
          align-content: center;
          align-items: center; " v-if="paymentRequired === false">Delete</label>
          <v-icon style="color: red;" v-if="paymentRequired === true">mdi-close</v-icon>
        </button>

        <button
          :class="{
            'btn btn-mark': paymentRequired === false, 
            'btn btn-mark disabledOperationButton': paymentRequired === true
          }"
          v-if="VirtualMachine.Shutdown === false"
          @click="ShutdownVirtualMachine"
        >
          <label style="
          color: #fff;
          opacity: 1;
          align-content: center;
          align-items: center; " v-if="paymentRequired === false">Shutdown</label>
          <v-icon style="color: red;" v-if="paymentRequired === true">mdi-close</v-icon>
        </button>

        <button
          :class="{
            'btn btn-mark': paymentRequired === false,
            'btn btn-mark disabledOperationButton': paymentRequired === true
          }"
          style="color: rgb(131, 127, 127)"
          v-else
          disabled
        >
          <label style="
          color: #fff;
          opacity: 1;
          align-content: center;
          align-items: center;" v-if="paymentRequired === false">Shutdown</label>
          <v-icon style="color: red;" v-if="paymentRequired === true">mdi-close</v-icon>
        </button>

        <button :class="{
          'btn': paymentRequired === false,
          'btn disabledOperationButton': paymentRequired === true,
        }"
        @click="UpdateVirtualMachine" style="
        background-color: #DE1D8D;
        margin-left: 10px;">

        <label style="
          color: #fff;
          opacity: 1;
          align-content: center;
          align-items: center; " v-if="paymentRequired === false">Edit</label>
        <v-icon style="color: red;" v-if="paymentRequired === true">mdi-close</v-icon>

        </button>

        <button :class="{
          'btn btn-reboot': paymentRequired === false, 
          'btn btn-reboot disabledOperationButton': paymentRequired === true,
          }"  
        v-if="VirtualMachine.Running == true || VirtualMachine.Shutdown == true"
        @click="RebootVirtualMachine">
          <label style="
          color: #fff;
          opacity: 1;
          align-content: center;
          align-items: center; " v-if="paymentRequired === false">Reboot</label>
          <v-icon style="color: red;" v-if="paymentRequired === true">mdi-close</v-icon>
        </button>

        <button
          v-else
          :class="{
            'btn btn-reboot': paymentRequired === false, 
            'btn btn-reboot disabledOperationButton': paymentRequired === true,
          }"
          disabled
          >
          <label style="
          color: #fff;
          opacity: 1;
          align-content: center;
          align-items: center; " v-if="paymentRequired === false">Reboot</label>
          <v-icon style="color: red;" v-if="paymentRequired === true">mdi-close</v-icon>
        </button>

      </div>
    </div>

    <div class="details" style="min-width: 1030px; max-width: 100%; overflow: hidden;">
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
        <p>Capacity</p>
        <p>Used</p>
        <p>Total Price</p>
        <div
          class="project-item"
          v-for="(PropertyName, index) in Object.keys(
            {
                'CpuNum': VirtualMachine.CpuNum, 
                'Memory': VirtualMachine.Memory, 
                'StorageCapacity': VirtualMachine.StorageCapacity,
            }
          )"
          :key="index"
        >
          <p class="prj-text" v-if="PropertyName.toLowerCase() === 'cpunum'">Used CPU</p>
          <p class="prj-text" v-if="PropertyName.toLowerCase() == 'cpunum'">{{ VirtualMachine['Resources'][PropertyName] || 0 }}</p> 
          <p class="prj-text" v-if="PropertyName.toLowerCase() == 'cpunum'">{{ GetCpuUsage(ResourceUsageMetrics) || 0 }}</p>
          
          <p class="prj-text" v-if="PropertyName.toLowerCase() === 'memory'">Used Memory</p>
          <p class="prj-text" v-if="PropertyName.toLowerCase() == 'memory'">{{ VirtualMachine['Resources'][PropertyName] || 0 }}MB</p>
          <p class="prj-text" v-if="PropertyName.toLowerCase() == 'memory'">{{ GetMemoryUsage(ResourceUsageMetrics) || 0 }}MB</p>
          
          <p class="prj-text" v-if="PropertyName.toLowerCase() === 'storagecapacity'">Used Storage</p>
          <p class="prj-text" v-if="PropertyName.toLowerCase() == 'storagecapacity'">{{ VirtualMachine['Resources'][PropertyName] || 0 }}GB</p>
          <p class="prj-text" v-if="PropertyName.toLowerCase() == 'storagecapacity'">{{ GetStorageDiskUsage(ResourceUsageMetrics) || 0 }}GB</p>
          <!-- Receiving the Cost of the Specific Property  (Cpu, Memory, etc....)-->
          <p class="prj-text">
            &#36;{{ GetPropertyCost(PropertyName, VirtualMachine['Resources'][PropertyName]) }} 
          </p>

        </div>
      </div>
      <div class="amount">
        <p class="amount-text">Total Amount</p>
        <p class="amount-number">
          &#36;{{  // getting total amount for the used resources of the Virtual Machine Server 
          GetTotalAmount(
          VirtualMachine['Resources']["CpuNum"], 
          VirtualMachine['Resources']["Memory"], 
          VirtualMachine['Resources']["StorageCapacity"]
          ) }}
        </p>
      </div>
    </div>

    <v-snackbar v-model="OperationFailed" top color="red">
        Operation Failed, {{ VirtualMachineServerError }}
    </v-snackbar>

    <v-snackbar v-model="OperationSucceeded" top color="red">
      {{ OperationSuccessMessage }}
    </v-snackbar>

  </main>
  </div>


  <div v-else-if="Authenticated === false"> 
    <not-authenticated-window />
  </div>

  <div v-else-if="HasPermissions === false"> 
    <forbidden-window />
  </div>

  <div v-else-if="ServerDoesExist === false"> 
    <virtual-server-not-found-window />
  </div>`,

  data() {
    return {

      ResourceUsageMetrics: {
        "CpuMetrics": "-",
        "MemoryMetrics": "-",
        "StorageMetrics": "-",
      }, // Initial Object
      ResourceManager: new resources.ResourceUsageManager(),

      // Current Resource Usage Metrics 

      CurrentCpuUsageMetrics: {}, 
      CurrentMemoryUsageMetrics: {}, 
      CurrentStorageDiskUsageMetrics: {},

      // Week Resource Usage Metrics 

      WeekResourceUsageMetrics: [], 
      WeekMemoryUsageMetrics: [],
      WeekStorageDiskMetrics: [],

      // Extra Statuses

      ServerDoesExist: false, // Status, that indicates, that the Virtual Machine Server, that customer is trying to get info about, does not exist // 
      OperationFailed: false, // Status, that indicates, that operation was failed to be performed // 
      OperationSucceeded: false, // Status, that indicates, that operation has been performed successfully //
      HasPermissions: true, // The Customer, who's trying to access this page with the Virtual Machine Server Info, does not have access permissions by default //

      // Operations Messages Parameters
      OperationSuccessMessage: null,
      VirtualMachineServerError: null, 
      VirtualMachine: {},
      VirtualMachineId: this.$route.params.VirtualMachineId,
      paymentRequired: false, // status of the payout for the resource usage 
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

    BlockOperationButtons() {
      // Blocks the Operational Buttons, if the payment is required to continue Virtual Server Usage
      this.paymentRequired = true
    },

    toggleError(ErrorMessage) {
      // Shows up Banner with an Exception
      this.VirtualMachineServerError = ErrorMessage
      this.OperationFailed = true
    },

    toggleSuccess(SuccessMessage) {
      // Shows up Banner with Success Operation 
      this.OperationSuccessMessage = SuccessMessage
      this.OperationSucceeded = true 
    },

    RedirectToPreviousPage() {
      // redirects customer to the Previous Page 
      this.$router.push({name: "main_page"})
    },

    GetPropertyCost(PropertyName, PropertyValue) {
      // Returns the Cost of the Specific Property for Per Day

      if (PropertyName.toLowerCase() == "cpunum") {
        // Calculating Price for the Cpu Property
        let calculator = new cost.CpuUsageBillCalculator(Number(PropertyValue) || 0)
        let Value = calculator.Calculate() / 30
        let SplitedValue = Value.toString().split(".")
        return SplitedValue[0] + "." + SplitedValue[1][0] || 0
      }
  
      if (PropertyName.toLowerCase() == "memory") {   
        // Calculating Price for the Memory Property 
        let calculator = new cost.MemoryUsageBillCalculator(Number(PropertyValue) || 0)
        let Value = calculator.Calculate() / 30
        let SplitedValue = Value.toString().split(".")
        return SplitedValue[0] + "." + SplitedValue[1][0] || 0
      }

      if (PropertyName.toLowerCase() == "storagecapacity") {
        // Calculating Price for the Storage Capacity Property
        let calculator = new cost.StorageUsageBillCalculator(Number(PropertyValue) || 0)
        let Value = calculator.Calculate() / 30
        let SplitedValue = Value.toString().split(".")
        return SplitedValue[0] + "." + SplitedValue[1][0] || 0
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

      let VirtualMachineId = this.$route.params.VirtualMachineId
      let VirtualMachines = this.virtualMachineData.filter((virtualMachine) => {
        return virtualMachine.VirtualMachineId === VirtualMachineId
      })
      this.VirtualMachine = VirtualMachines[0]
      if (this.VirtualMachine != null) {this.ServerDoesExist = true}
    },

    UpdateVirtualMachine() {
      // Redirects to the Virtual Machine Edit Configuration Page
      this.$router.push({name: "edit_virtual_machine", 
      params: {"VirtualMachineId": this.VirtualMachineId}})
    },

    DeleteVirtualMachine() {
      // Deletes the Virtual Machine Server by calling Rest API on the Backend
      let VirtualMachineId = this.$route.query.VirtualMachineId 
      let Deleted, DeleteError = this.DELETE_VIRTUAL_MACHINE(VirtualMachineId)
      if (Deleted != true || DeleteError != null) {
        this.toggleError("Failed to Delete Virtual Server")
      }else{
        this.toggleSuccess("Server Deleted Successfully")
      }
    },

    StartVirtualMachine() {
      // Starts the Virtual Machine Server by calling Rest API on the Backend
      let VirtualMachineId = this.$route.query.VirtualMachineId 
      let Started, StartError = this.RUN_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)
      if (Started != true || StartError != null) {
        this.toggleError("Failed to Start Virtual Server")
      }else{
        this.toggleSuccess("Server Started Successfully")
      }
    },

    ShutdownVirtualMachine() {
      // Shuts down the Virtual Machine Server by calling Rest API on the Backend
      let VirtualMachineId = this.$route.query.VirtualMachineId 
      let Shutdowned, ShutdownError = this.SHUTDOWN_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)
      if (Shutdowned != true || ShutdownError != null) {
        this.toggleError("Failed to Shutdown Virtual Server")
      }else{
        this.toggleSuccess("Server Shutdown Successfully")
      }
    },

    RebootVirtualMachine() {
      // Reboots Virtual Machine Server by calling Rest API on the Backend
      let VirtualMachineId = this.$route.query.VirtualMachineId 
      let Rebooted, RebootError = this.REBOOT_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)
      if (Rebooted != true || RebootError != null) {
        this.toggleError("Failed to Reboot Virtual Server")
      }else{
        this.toggleSuccess("Server Rebooted Successfully")
      }
    },

    MountResourceUsageMetrics() {
      // Mounts General Resource Metrics, before page loading 
      let Metrics = this.GetResourceMetrics()
      this.ResourceUsageMetrics = Metrics
    },
     
    GetResourceMetrics() {

      // Mounts Initial Resource Usage Metrics 

      let VirtualMachineId = this.$route.params.VirtualMachineId 
      let JwtToken = this.JwtToken 

      let Resources, ResourceError = this.ResourceManager.GetResourceMetrics(JwtToken, VirtualMachineId)
      if (ResourceError != null) {console.log(ResourceError)}
      return Resources
    },

    GetStorageDiskUsage(Metrics) {
      // Returns Storage Disk Usage Capacity of the Virtual Machine Server 

      let CurrentUsage = this.ResourceManager.GetStorageUsageInfo(Metrics) || "0"
      return CurrentUsage
    }, 

    GetCpuUsage(Metrics) {
      // Returns CPU Usage of the Virtual Machine Server 

      let CurrentUsage = this.ResourceManager.GetCpuUsageInfo(Metrics) || "0"
      return CurrentUsage
    },

    GetMemoryUsage(Metrics) {
      // Returns Memory Usage of the Virtual Machine Server 

      let CurrentUsage = this.ResourceManager.GetMemoryUsageInfo(Metrics) || "0"
      return CurrentUsage
    }, 
  },
  computed: {
    ...mapState([
      "virtualMachineData",
      "authenticated",
    ]),
    Authenticated() {
      return this.$store.state.authenticated
    }
  },
};

</script>

<style lang="scss">


.label {
  color: #fff;
  opacity: 1;
  align-content: center;
  align-items: center; 
}
.disabledOperationButton {
  // Button Class, that disables any interaction with the buttons 
  pointer-events: none;
}

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
  border-radius: 10px;
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
  background-color: rgba(51, 215, 160, 0.06);
  color: rgb(255, 145, 0);
}

.running {
  background-color: rgba(51, 215, 160, 0.06);
  color: rgb(51, 215, 160);
}

.unknown {
  background-color: rgba(51, 215, 160, 0.06);
  color: rgb(252, 2, 2);
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
  background-color: rgb(179, 100, 3);
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

html {width:100%; overflow:hidden}
body {width: 100%;}

</style>