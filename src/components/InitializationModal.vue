<template>
  <div @click="checkClick" ref="virtualMachineWrap" class="virtualMachineWrap flex flex-column">
    <form @submit.prevent="submitForm" class="invoice-content">
      <Loading v-show="loading" />
      <h1 v-if="!updateVirtualMachine">New Virtual Machine</h1>
      <h1 v-else>Update VirtualMachine</h1>

      <!-- Hardware Configuration  -->
      <div class="hardwareConfiguration flex flex-column">
        <h4>Hardware Configuration</h4>
        <div class="input flex flex-column">
          <label for="Datacenter">Datacenter</label>
          <input required type="text" id="Datacenter" v-model="Datacenter" />
        </div>
      </div>

      <!-- resource Configuration -->

      <div class="resourceConfiguration flex flex-column">
        <h4>Resource Configuration</h4>
        <div class="input flex flex-column">
          <label for="Cpu">CPU</label>
          <input required type="text" id="cpuNum" v-model="cpuNum" />
        </div>

        <div class="input flex flex-column">
          <label for="MaxCpu">Max CPU</label>
          <input required type="text" id="maxCpu" v-model="maxCpu" />
        </div>
        <div class="input flex flex-column">
          <label for="Memory">Memory</label>
          <input required type="text" id="memoryInMegabytes" v-model="MemoryInMegabytes" />
        </div>

        <div class="resources-details flex">
          <div class="input flex flex-column">
            <label for="MaxMemory">Max Memory</label>
            <input required type="text" id="maxMemory" v-model="maxMemory" />
          </div>
          <div class="input flex flex-column">
            <label for="Storage">Storage</label>
            <input required type="text" id="storageCapacity" v-model="storageCapacity" />
          </div>

        </div>
      </div>

      <div class="sslConfiguration flex flex-column">
        <h4>SSL Configuration</h4>
        <div class="input flex flex-column">
          <label for="secure">Secure</label>
          <input required type="text" id="cpuNum" v-model="Secure" />
        </div>
        </div>

      <!-- Invoice Work Details -->
      <div class="virtual-machine-work flex flex-column">
        <div class="payment flex">

          <div class="input flex flex-column">
            <label for="virtualMachineCreationDate">Creation Date</label>
            <input disabled type="text" id="VirtualMachineCreationDate" v-model="VirtualMachineCreationDate" />
          </div>

          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
          </div>

        </div>

        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select required type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>

        <div class="input flex flex-column">
          <label for="VirtualMachineConfigInfo">Config Info</label>
          <input required type="text" id="VirtualMachineConfigInfo" v-model="VirtualMachineConfigInfo" />
        </div>
        <div class="work-items">
          <h3>Virtual Machines</h3>
          <table class="item-list">

            <tr class="table-heading flex">
              <th class="item-name">Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price per day</th>
              <th class="total">Total this Month</th>
            </tr>

            <tr class="table-items flex" v-for="(VirtualMachine, index) in VirtualMachineItemList" :key="index">
              <td class="item-name"><input type="text" v-model="item.VirtualMachineName" /></td>
              <td class="qty"><input type="text" v-model="VirtualMachine.qty" /></td>
              <td class="price"><input type="text" v-model="VirtualMachine.price" /></td>
              <td class="total flex">${{ (VirtualMachine.TotalCost = VirtualMachine.qty * VirtualMachine.ResourcePrice)}}</td>
              <img @click="deleteVirtualMachine(VirtualMachine.VirtualMachineId)" src="@/assets/icon-delete.svg" alt="" />
            </tr>

          </table>

          <div @click="initializeNewVirtualMachine" class="flex button">
            <img src="@/assets/icon-plus.svg" alt="" />
            Add New Virtual Machine
          </div>

        </div>
      </div>

      <!-- Save/Exit -->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeVirtualMachineSettings" class="red">Cancel</button>
        </div>
        <div class="right flex">
          <button v-if="!updateVirtualMachine" type="submit" @click="saveVirtualMachineDraft" class="dark-purple">Save Draft</button>
          <button v-if="!updateVirtualMachine" type="submit" @click="initializaVirtualMachine" class="purple">Create New Virtual Machine</button>
          <button v-if="updateVirtualMachine" type="sumbit" class="purple">Update Virtual Machine</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>


import { mapActions, mapMutations, mapState } from "vuex";
import { uid } from "uid";

import * as vm from "../vm/vm.js"
import * as preparer from "../configuration_preparer/preparer.js"


export default {
  name: "hardwareConfiguration",
  data() {
    return {
      Datacenters: [],
      OperationalSystems: [],
      PreInstalledTools: [],
    }
  },
  created() {
    this.GetSuggestedDatacenters()
    this.GetSuggestedOperationalSystems()
    this.GetSuggestedPreInstalledTools()
  },
  methods: {
    GetSuggestionsManager() {
      let SuggestionManager = new suggestions.NewSuggestManager()
      return SuggestionManager
    },
    GetSuggestedDatacenters() {
      // Returns Array of the Available Datacenters
      let newManager = this.GetSuggestionsManager()
      let Datacenters = newManager.GetAvailableDatacenters()
      this.Datacenters = Datacenters
    },
    GetSuggestedOperationalSystems() {
      // Returns Array of the Available Distributions for the Virtual Machine  Server
      let newManager = this.GetSuggestionsManager()
      let OperationalSystems = newManager.GetAvailableOperationalSystems()
      this.OperationalSystems = OperationalSystems
    },
    GetSuggestedPreInstalledTools() {
      // Returns Array of the Available Preinstalled Tools, that you can pre install, on your OS
      let newManager = this.GetSuggstionsManager()
      let PreInstalledTools = newManager.GetAvailablePreInstalledTools()
      this.PreInstalledTools = PreInstalledTools
    },
  }
},

export default {
  name: "resourceConfiguration",
  data() {
    return {
      // CPU Resources
      CpuNum: null,
      MaxCpu: null,

      // Memory Resources
      MaxMemory: null,
      Memory: null,
    }
  },
  created() {
    this.GetVirtualMachineInfo()
  },
  methods: {
    GetVirtualMachineInfo() {
      // Returns Info About the Resources of the Virtual Machine
      let VirtualMachineId = this.$route.params.VirtualMachineId
      let VirtualMachineManager = new vm.VirtualMachineManager()
      let VirtualMachineInfo, VirtualMachineError = VirtualMachineManager.GetVirtualMachine(VirtualMachineId)

      if (VirtualMachineError == null) {
        this.CpuNum = VirtualMachineInfo["Resources"]["CpuNum"],
        this.MaxCpu = VirtualMachineInfo["Resources"]["MaxCpu"],
        this.MaxMemory = VirtualMachineInfo["Resources"]["MaxMemory"],
        this.Memory = VirtualMachineInfo["Resources"]["Memory"],
      }
    },
  }
}

export default {
  name: "sslConfiguration",
  data() {
    return {
      // SSL Secure Info
      RootUsername: null,
      RootPassword: null,
      RootCertificate: null,
      Secure: null,
    }
  },
  created() {
    this.GetVirtualMachineInfo()
  }
  methods: {
    GetVirtualMachineInfo() {
      // Returns Virtual Machines Info about the SSL Configuration
      let VirtualMachineId = this.$route.params.VirtualMachineId
      let VirtualMachineManager = new vm.VirtualMachineManager()
      let VirtualMachineInfo, VirtualMachineError = VirtualMachineManager.GetVirtualMachine(VirtualMachineId)

      if (VirtualMachineError == null) {
        this.RootUsername = VirtualMachineInfo["Ssl"]["RootUsername"],
        this.RootPassword = VirtualMachineInfo["Ssl"]["RootPassword"],
        this.RootCertificate = VirtualMachineInfo["Ssl"]["RootCertificate"],
        this.Secure = VirtualMachineInfo["Ssl"]["Secure"],
      }
    },
  }
}
export default {

  name: "initializationModal",
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      loading: null,
      VirtualMachinePending: null,
      VirtualMachineDraft: null,
      VirtualMachinesList: [],
      CostTotal: 0,
    };
  },

  components: {
    Loading,
    hardwareConfiguration,
    resourceConfiguration,
    sslConfiguration,
  },
  created() {
    // get current date for invoice date field
    if (!this.updateVirtualMachine) {
      this.virtualMachineDateUnix = Date.now();
      this.virtualMachineCreationDate = new Date(this.virtualMachineDateUnix).toLocaleDateString("en-us", this.dateOptions);
    }
    if (this.updateVirtualMachine) {
      const currentVirtualMachine = this.currentVirtualMachineArray[0];
      this.VirtualMachineCreationDate = currentVirtualMachine.VirtualMachineCreationDate;
      this.VirtualMachinePending = currentVirtualMachine.VirtualMachinePending;
      this.VirtualMachineDraft = currentVirtualMachine.VirtualMachineDraft;
      this.VirtualMachineItemList = currentVirtualMachine.VirtualMachineItemList;
    }
  },

  methods: {
    ...mapMutations(["TOGGLE_VM_INITIALIZATIONMODAL", "TOGGLE_UPDATE_VIRTUAL_MACHINE"]),
    ...mapActions(["UPDATE_VIRTUAL_MACHINE", "GET_VIRTUAL_MACHINES", "GET_VIRTUAL_MACHINE"]),

    checkClick(e) {/
      if (e.target === this.$refs.virtualMachineWrap) {
        this.TOGGLE_MODAL();
      }
    },

    closeVirtualMachine() {
      this.TOGGLE_VM_INIITIALIZATION_MODAL();
      if (this.updateVirtualMachine) {
        this.TOGGLE_UDPDATE_VIRTUAL_MACHINE();
      }
    },

    GetVirtualMachines() {
      // Returns Queryset of the Virtual Machines, related to the Customer
      let newVirtualMachineManager = new vm.VirtualMachineManager()
      let VirtualMachinesQueryset, GetError = newVirtualMachineManager.GetCustomerVirtualMachines()
      if (GetError != null) {this.showError(GetError.error)}
      this.VirtualMachineItemList = VirtualMachinesQueryset
    },

    // Virtual Machine Functions Goes There
    CreateNewVirtualMachine(HardwareConfiguration, CustomizedConfiguration, Metadata) {
      // Initializes New Virtual Machine

      this.VirtualMachinePending = true;
      this.VirtualMachineItemList.push({
        VirtualMachineId: "null",
        VirtualMachineName: Metadata["VirtualMachineName"],
        Status: "Pending",
        qty: "",
        price: 0,
        totalThisMonth: 0,
      });
      // Initializing Virtual Machine

      // Initializing New Resources
      let CpuResources = new preparer.CpuResources()
      let MemoryResources = new preparer.MemoryResources()
      let DatacenterResources = new preparer.DatacenterResources()
      let MetadataResources = new preparer.MetadataResources()

      let HardwareConfiguration = new preparer.HardwareConfiguration()
      let newVirtualMachineManager = new vm.VirtualMachineManager()

      let InitializedVirtualMachineInfo, InitilizationError = newVirtualMachineManager.initializeNewVirtualMachine(
      let HardwareConfiguration)

      if (InitilizationError == null && IninitializedVirtualMachineInfo != null) {
        // Updating State of the Virtual Machine View
        this.VirtualMachineItemList[-1].Status = "Applying Configuration"
        let VirtualMachineCustomizationInfo, ApplyError = newVirtualMachineManager.ApplyConfiguration(CustomizedConfiguration)

        if (ApplyError == null) {
            // If Apply has become successful, it should redirect to the other Root
            this.VirtualMachineItemList[-1].Status = "Running"
            var VirtualMachineId = VirtualMachineCustomizationInfo["VirtualMachineId"]

            // Initializing New API Url
            var VirtualMachineAPIUrl = new url.URL("http://%s:%s/vm/get/",
            BACKEND_APPLICATION_HOST, BACKEND_APPLICATION_PORT)

            VirtualMachineAPIUrl.searchParams.append("VirtualMachineId", VirtualMachineId)
            return this.$router.push()

        }else{
          // If Applying Configuration failure has occurred, destroying Created Virtual Machine
          var VirtualMachineId = VirtualMachineCustomizationInfo["VirtualMachineId"]
          this.VirtualMachineItemList[-1].Status = "Failure"
          await newVirtualMachineManager.DeleteVirtualMachine(VirtualMachineId)
        }
      }
    },

    deleteVirtualMachine(VirtualMachineId) {
      // Deletes Selected Virtual Machine, Activates Warning before doing that Operation

      let newVirtualMachineManager = new vm.VirtualMachineManager()
      let Deleted, DeleteError = newVirtualMachineManager.DeleteCustomerVirtualMachine()
      this.VirtualMachineItemList = this.VirtualMachineItemList.filter((item) => item.id !== VirtualMachineId);

    },

    getVirtualMachinesCostTotal() {
      // Returns Total Amount of the Money, that Customer will need to pay for All Virtual Machines Maintainance Monthly
      this.CostTotal = 0;
      this.VirtualMachineItemList.forEach((item) => {
      this.VirtualMachineCostTotal += item.TotalCost;
      });
    },
    saveDraft() {
      this.VirtualMachineDraft = true;
    },
    async uploadVirtualMachine() {
      if (this.invoiceItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }
      this.loading = true;
      this.calInvoiceTotal();
      this.loading = false;
      this.TOGGLE_INVOICE();
      this.GET_INVOICES();
    },

    async updateVirtualMachine(NewConfiguration) {
      if (this.VirtualMachineItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }
      this.loading = true;
      this.VirtualMachineCostTotal();
      this.loading = false;

      const data = {
        VirtualMachineId: this.$route.params.VirtualMachineId,
        UpdatedConfiguration: NewConfiguration,
      };

      this.UPDATE_INVOICE(data);
    },
    submitForm() {
      if (this.editInvoice) {
        this.updateVirtualMachine();
        return;
      }
      this.uploadVirtualMachine();
    },
  },
  computed: {
    ...mapState(["updateVirtualMachine", "currentVirtualMachineArray"]),
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString("en-us", this.dateOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.virtual-machine-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
  }
  .virtual-machine-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    h1 {
      margin-bottom: 48px;
      color: #fff;
    }
    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }
    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }
    // Bill To / Bill From
    .hardwareConfiguration,
    .resourceConfiguration {
      margin-bottom: 48px;
      .location-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
    }
    .virtual-machine-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }
      .work-items {
        .item-list {
          width: 100%;
          // Item Table Styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;
            .item-name {
              flex-basis: 50%;
            }
            .qty {
              flex-basis: 10%;
            }
            .price {
              flex-basis: 20%;
            }
            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }
          .table-heading {
            margin-bottom: 16px;
            th {
              text-align: left;
            }
          }
          .table-items {
            position: relative;
            margin-bottom: 24px;
            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }
        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;
          img {
            margin-right: 4px;
          }
        }
      }
    }
    .save {
      margin-top: 60px;
      div {
        flex: 1;
      }
      .right {
        justify-content: flex-end;
      }
    }
  }
  .input {
    margin-bottom: 24px;
  }
  label {
    font-size: 12px;
    margin-bottom: 6px;
  }
  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
    &:focus {
      outline: none;
    }
  }
}
</style>
