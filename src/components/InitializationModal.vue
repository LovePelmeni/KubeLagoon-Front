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

        <table v-if="Datacenters.length > 0" class="item-list">

            <tr class="table-heading flex">
              <th class="item-name"></th>
            </tr>

            <tr class="table-items flex" v-for="(Datacenter, index) in Datacenters" :key="index">
              <td class="item-name"><input type="text" v-model="Datacenter.DatacenterName" /></td>
              <img @click="hardwareConfiguration.selectDatacenter(Datacenter.ItemPath)" src="@/assets/icon-delete.svg" alt="" />
            </tr>
          </table>

          <div class="input flex flex-column">
          <label for="Datacenter">Operational System</label>
          <input required type="text" id="Datacenter" v-model="OperationalSystem" />
          </div>

        <table v-if="OperationalSystems.length > 0" class="item-list">

              <tr class="table-heading flex">
              <th class="item-name">Name</th>
              <th class="item-name">Version</th>
              </tr>

              <tr class="table-items flex" v-for="(OperationalSystem, index) in OperationalSystems" :key="index">
                <td class="item-name"><input type="text" v-model="OperationalSystem.Name" /></td>
                <td class="item-name"><input type="text" v-model="OperationalSystem.Version" /></td>
                <img @click="hardwareConfiguration.selectOperationalSystem(OperationalSystem.Name)" src="@/assets/icon-delete.svg" alt="" />
              </tr>
          </table>

        <div class="input flex flex-column">
          <label for="Datacenter">Pre Installed Tools</label>
          <input required type="text" id="Datacenter" v-model="PreInstalledTool" />
        </div>

        <table v-if="PreInstalledTools.length > 0" class="item-list">

                <tr class="table-heading flex">
                    <th class="item-name">Tool</th>
                    <th class="item-name">Version</th>
                </tr>
                <tr class="table-items flex" v-for="(Tool, index) in PreInstalledTools" :key="index">
                    <td class="item-name"><input type="text" v-model="Tool.Name"/></td>
                    <td class="item-name"><input type="text" v-model="Tool.Version" /></td>
                    <img @click="hardwareConfiguration.addPreInstalledTools(Tool.Name)" src="@/assets/icon-delete.svg" alt="" />
                </tr>
          </table>
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
          <button v-if="!updateVirtualMachine" type="submit" @click="createVirtualMachine" class="purple">Create New Virtual Machine</button>
          <button v-if="updateVirtualMachine" type="sumbit" class="purple">Update Virtual Machine</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>


/* eslint-disable no-unused-vars */

/* eslint-disable vue/no-unused-components */


import { mapActions, mapMutations, mapState } from "vuex";
import { uid } from "uid";

import * as vm from "../../vm/vm.js"
import * as preparer from "../../configuration_preparer/preparer.js"
import * as suggestions from "../../suggestions/suggestions.js"
import {loadingPage} from "./LoadingPage.vue"


export const hardwareConfiguration = {
  name: "hardwareConfiguration",
  data() {
    return {
      Datacenters: [],
      OperationalSystems: [],
      PreInstalledTools: [],

      AddedDatacenter: null,
      AddedOperationalSystem: null,
      AddedInstalledTools: [],
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

    selectDatacenter(DatacenterItemPath) {
      // Selects Datacenter, that Is going to be Used for the Virtual Machine Server Deployment
      this.AddedDatacenter = DatacenterItemPath
    },
    selectOperationalSystem(OSName, Version, Bit) {
      // Selects Operational System for the Virtual Machine Server
      this.selectOperationalSystem = {"SystemName": OSName + Version, "Bit": Bit}
    },
    addPreInstalledTools() {
      // Adds pre Installed Tools to the Array
    },
    markAsSelected() {
      // Marks Element as Selected
    }
  }
};

export const resourceConfiguration = {
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
        this.Memory = VirtualMachineInfo["Resources"]["Memory"]
      }
    }
  }
};

export const sslConfiguration = {

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
  },
  methods: {
    GetVirtualMachineSSLRootInfo() {
      // Returns Virtual Machines Info about the SSL Configuration
      let VirtualMachineId = this.$route.params.VirtualMachineId
      let VirtualMachineManager = new vm.VirtualMachineManager()
      let VirtualMachineInfo, VirtualMachineError = VirtualMachineManager.GetVirtualMachine(VirtualMachineId)

      if (VirtualMachineError == null) {
        this.RootUsername = VirtualMachineInfo["Ssl"]["RootUsername"],
        this.RootPassword = VirtualMachineInfo["Ssl"]["RootPassword"],
        this.RootCertificate = VirtualMachineInfo["Ssl"]["RootCertificate"],
        this.Secure = VirtualMachineInfo["Ssl"]["Secure"]
      }
    }
  }
};

export default {

  name: "initializationModal",
  data() {
    return {
      // General Extra Attributes
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      loading: null,
      VirtualMachinePending: null,
      VirtualMachineDraft: null,
      VirtualMachinesList: [],
      CostTotal: 0,
    };
  },
  components: {
    loadingPage,
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
    ...mapMutations(["TOGGLE_VIRTUAL_MACHINE", "TOGGLE_UPDATE_VIRTUAL_MACHINE"]),
    ...mapActions(["UPDATE_VIRTUAL_MACHINE", "GET_VIRTUAL_MACHINES", "GET_VIRTUAL_MACHINE"]),

    checkClick(e) {
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
    CreateNewVirtualMachine(hardwareConfigurationData, customizedConfigurationData) {
      // Initializes New Virtual Machine

      // Initializing New Resources
      let CpuResources = new preparer.CpuResources(
      customizedConfigurationData["Resources"]["Cpu"])

      let SslResources = new preparer.SshlResources(
      customizedConfigurationData["Ssh"])

      let MemoryResources = new preparer.MemoryResources(
      hardwareConfigurationData["Resources"]["Memory"])

      let DatacenterResources = new preparer.DatacenterResources(
      hardwareConfiguration["Datacenter"])

      let StorageResources = new preparer.StorageResources(
      customizedConfigurationData["Storage"]["Capacity"])

      let MetadataResources = new preparer.MetadataResources(
      customizedConfigurationData["Metadata"])

      let HardwareConfiguration = new preparer.HardwareConfiguration(DatacenterResources)
      let CustomizedConfiguration = new preparer.CustomizedConfiguration(CpuResources, MemoryResources, MetadataResources, StorageResources, SslResources)

      this.CREATE_VIRTUAL_MACHINE(
      HardwareConfiguration, CustomizedConfiguration)
    },

    deleteVirtualMachine(VirtualMachineId) {
      // Deletes Selected Virtual Machine, Activates Warning before doing that Operation
      this.DELETE_VIRTUAL_MACHINE(VirtualMachineId)
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
      this.TOGGLE_VIRTUAL_MACHINE();
      this.GET_VIRTUAL_MACHINES();
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

      this.UPDATE_VIRTUAL_MACHINE(data);
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
