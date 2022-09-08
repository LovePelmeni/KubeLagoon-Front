<template>
  <div @click="checkClick" ref="virtualMachineWrap" class="virtualMachineWrap flex flex-column">
    <form @submit.prevent="ValidateInput" class="virtual-machine-content">
      <loadingPage v-show="loading" />

      <h1 v-if="!updateVirtualMachine" @click="NewVirtualMachine">New Virtual Machine</h1>
      <h1 v-else @click="UpdateVirtualMachine">Update Virtual Machine</h1>

      <!-- Hardware Configuration  -->
      <hardwareConfiguration />

      <!-- resource Configuration -->
      <resourceConfiguration />

      <!-- SSH Configuration -->
      <sshConfiguration />

      <!-- Virtual Machine Work Details -->

      <div class="virtual-machine-work flex flex-column">
        <div class="payment flex">

          <div class="input flex flex-column">
            <label for="virtualMachineCreationDate">Creation Date</label>
            <input disabled type="text" id="virtualMachineCreationDate" v-model="virtualMachineCreationDate" />
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

        <div class="TotalCost flex">
          <p>In Total Per Month</p>
          <p>{{ getVirtualMachineCostTotal() }}</p>
        </div>

        <div class="work-items">
          <h3>Virtual Machines</h3>
          <table class="item-list">

            <tr class="table-heading flex">
              <th class="item-name">ID</th>
              <th class="qty">Name</th>
              <th class="price">Status</th>
              <th class="total">Price Per Day</th>
              <th class="total">Total this Month</th>
            </tr>

            <tr class="table-items flex" v-for="(VirtualMachine, index) in VirtualMachineItemList" :key="index">
              <td class="virtual-machine-id"><input type="text" v-model="VirtualMachine.VirtualMachineId" /></td>
              <td class="virtual-machine-name"><input type="text" v-model="VirtualMachine.VirtualMachineName" /></td>
              <td class="status"><input type="text" v-model="VirtualMachine.Status" /></td>
              <td class="price"><input type="text" v-model="VirtualMachine.Price" /></td>
              <td class="total flex">$ {{ VirtualMachine.TotalThisMonth }}</td>
              <img @click="deleteVirtualMachine(VirtualMachine.VirtualMachineId)" :src="require('@/assets/icon-delete.svg')" alt="icon-delete" />
            </tr>

          </table>

          <div @click="CreateNewVirtualMachine" class="flex button">
            <img :src="require('@/assets/icon-plus.svg')" alt="icon-plus" />
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
          <button v-if="!updateVirtualMachine" type="submit" @click="CreateNewVirtualMachine" class="purple">Create New Virtual Machine</button>
          <button v-if="updateVirtualMachine" type="sumbit" class="purple">Update Virtual Machine</button>
        </div>
      </div>
    </form>
  </div>

</template>
<script>

/* eslint-disable no-unused-vars */

import { mapActions, mapMutations, mapState } from "vuex";
import * as suggestions from "../../suggestions/suggestions.js"
import loadingPage from "./LoadingPage.vue"
import * as vm from "../../vm/vm.js"


export const hardwareConfiguration = {

  name: "hardwareConfiguration",
  props: {
    errors: {
      Datacenter: {},
      OS: {},
      Tool: {},
      LoadBalancer: {},
    },
  },
  data() {
    return {
      LoadBalancers: [],
      Datacenters: [],
      OperationalSystems: [],
      PreInstalledTools: [],

      AddedLoadBalancer: null,
      AddedDatacenter: null,
      AddedOperationalSystem: null,
      AddedPreInstalledTools: [],


      DatacenterRules: [
        username => !!username || 'Username is required',
        username => `^[a-z][A-Z][0-9]{1,100}$`.test(username) || 'Invalid Username',
        username => (username && username.length >= 10) || 'Username should be 10 characters or more!',
      ],

      OperationalSystemRules: [
        username => !!username || 'Username is required',
        username => `^[a-z][A-Z][0-9]{1,100}$`.test(username) || 'Invalid Username',
        username => (username && username.length >= 10) || 'Username should be 10 characters or more!',
      ],

      LoadBalancerRules: [
        lb => !!lb || 'Username should be 10 characters or more!',
      ],
    }
  },

  template: `
      <div class="hardwareConfiguration flex flex-column">
        <h4>Hardware Configuration</h4>

        <div class="input flex flex-column">
          <label for="LoadBalancer">Load Balancer</label>
        </div>

        <table v-if="LoadBalancers.length > 0" class="item-list">

            <tr class="table-heading flex">
              <th class="item-name"></th>
            </tr>

            <tr class="table-items flex" v-for="(LoadBalancer, index) in LoadBalancers" :key="index">
              <td class="item-name"><input type="text" v-model="LoadBalancer.Name" /></td>

              <img @click="selectLoadBalancer(LoadBalancer.Name)" v-if="LoadBalancer != AddedLoadBalancer" :src="LoadBalancer.Avatar" alt="" />
              <img @click="unSelectLoadBalancer(LoadBalancer.Name)" v-else :src="require('@/assets/icon-delete.svg')" alt="icon-delete" />

              <span v-if="errors['LoadBalancer'][LoadBalancer.Name]">{{ errors['LoadBalancer'][LoadBalancer.Name] }}</span>
            </tr>
          </table>

        <div class="input flex flex-column">
          <label for="Datacenter">Datacenter</label>
        </div>

        <table v-if="Datacenters.length > 0" class="item-list">

            <tr class="table-heading flex">
              <th class="item-name"></th>
            </tr>

            <tr class="table-items flex" v-for="(Datacenter, index) in Datacenters" :key="index">
              <td class="item-name"><input type="text" v-model="Datacenter.DatacenterName" /></td>

              <img @click="selectDatacenter(Datacenter.DatacenterName)" v-if="Datacenter != AddedDatacenter" :src="Datacenter.Avatar" alt="" />
              <img @click="unSelectDatacenter(Datacenter.DatacenterName)" v-else :src="require('@/assets/icon-delete.svg')" alt="icon-delete"/>

              <span v-if="errors['Datacenter'][Datacenter.DatacenterName]">{{ errors['Datacenter'][Datacenter.DatacenterName] }}</span>

            </tr>
          </table>

          <div class="input flex flex-column">
          <label for="OperationalSystem">Operational System</label>
          </div>

        <table v-if="OperationalSystems.length > 0" class="item-list">

              <tr class="table-heading flex">
              <th class="item-name">Name</th>
              <th class="item-name">Version</th>
              </tr>

              <tr class="table-items flex" v-for="(OperationalSystem, index) in OperationalSystems" :key="index">
                <td class="item-name"><input type="text" v-model="OperationalSystem.Name" /></td>
                <td class="item-name"><input type="text" v-model="OperationalSystem.Version" /></td>


                <img @click="selectOperationalSystem(OperationalSystem.Name)" v-if="OperationalSystem.SystemName" :src="OperationalSystem.Avatar" alt="" />
                <img @click="unSelectOperationalSystem(OperationalSystem.Name)" v-else :src="require('@/assets/icon-delete.svg')" alt="icon-delete" />

                <span v-if="errors['OS'][OperationalSystem.SystemName]">{{ errors['OS'][OperationalSystem.SystemName] }}</span>

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

                    <img @click="addPreInstalledTools(Tool.Name)" v-if="!(Tool in AddedPreInstalledTools)" :src="Tool.Avatar" alt="" />
                    <img @click="unSelectPreInstalledTool(Tool.Name)" v-else :src="require('@/assets/icon-delete.svg')" alt="icon-delete" />

                    <span v-if="errors['Tool'][Tool.Name]">{{ errors['Tool'][Tool.Name] }}</span>
                </tr>
          </table>
      </div>
  `,
  created() {
    this.GetSuggestedLoadBalancers()
    this.GetSuggestedDatacenters()
    this.GetSuggestedOperationalSystems()
    this.GetSuggestedPreInstalledTools()
  },

  methods: {
    // Validation Methods for the Form
    ValidateDatacenter(Datacenter) {
      // Validates Selected Datacenter by the Customer
      if (Datacenter.DatacenterName.length == 0) {
        this.errors['Datacenter'] = "This field is required"
      }
    },
    ValidateOs(OperationalSystem) {
        //  Validates Operational System, picked up by the Customer
        if (OperationalSystem.SystemName.length == 0) {
          this.errors["OS"] = "This field is required"
        }
    },

    ValidateLoadBalancer(LoadBalancer) {
      // Validates Load Balancer Configuration
      if (LoadBalancer.Type.length == 0) {
        this.errors["LoadBalancer"]["Type"] = "This field is required"
      }
      if (LoadBalancer.Port != 0) {
        this.errors["LoadBalancer"]["Port"] = "Please specify the default value"
      }
    },

    GetSuggestionsManager() {
      let SuggestionManager = new suggestions.SuggestionsManager()
      return SuggestionManager
    },

    GetSuggestedLoadBalancers() {
      // Returns Array of the Available Load Balancers
      let newManager = this.GetSuggestionsManager()
      let LoadBalancers, _ = newManager.GetSuggestedLoadBalancers()
      if (LoadBalancers != null) {this.LoadBalancers = LoadBalancers}
      this.LoadBalancers = LoadBalancers
    },

    GetSuggestedDatacenters() {
      // Returns Array of the Available Datacenters
      let newManager = this.GetSuggestionsManager()
      let Datacenters = newManager.GetSuggestedDatacenters()
      if (Datacenters != null) {
      this.Datacenters = Datacenters}
    },

    GetSuggestedOperationalSystems() {
      // Returns Array of the Available Distributions for the Virtual Machine  Server
      let newManager = this.GetSuggestionsManager()
      let OperationalSystems = newManager.GetSuggestedOperationalSystems()
      if (OperationalSystems != null) {
      this.OperationalSystems = OperationalSystems}
    },

    GetSuggestedPreInstalledTools() {
      // Returns Array of the Available Preinstalled Tools, that you can pre install, on your OS
      let newManager = this.GetSuggestionsManager()
      let PreInstalledTools = newManager.GetSuggestedPreInstalledTools()
      if (PreInstalledTools != null){
      this.PreInstalledTools = PreInstalledTools}
    },

    selectLoadBalancer(LoadBalancerName) {
      // Selects Load Balancer, that Is going to be Used for the Virtual Machine Server Deployment
      let LoadBalancer = this.GetLoadBalancer(LoadBalancerName)
      this.AddedLoadBalancer = LoadBalancer
    },

    selectDatacenter(DatacenterName) {
      // Selects Datacenter, that Is going to be Used for the Virtual Machine Server Deployment
      let Datacenter = this.GetDatacenter(DatacenterName)
      if (Datacenter != null){
      this.AddedDatacenter = Datacenter}
    },

    selectOperationalSystem(OSName, Version, Bit) {
      // Selects Operational System for the Virtual Machine Server
      let OperationalSystem = this.GetOperationalSystem(OSName, Version, Bit)
      this.selectOperationalSystem = {
      "SystemName": OperationalSystem.OSName + OperationalSystem.Version,
      "Version": OperationalSystem.Version,
      "Bit": OperationalSystem.Bit}
    },

    selectPreInstalledTools(ToolName) {
      // Adds pre Installed Tools to the Array
      this.AddedPreInstalledTools.push(ToolName)
    },

    unSelectLoadBalancer() {
      this.AddedLoadBalancer = null
    },

    unSelectDatacenter() {
      this.AddedDatacenter = null
    },

    unSelectOperationalSystem() {
      this.AddedOperationalSystem = null
    },

    unSelectPreInstalledTool(ToolName) {
      let NewSelectedItemTools = this.AddedPreInstalledTools.filter((Tool) => {
        return Tool.Name !== ToolName
      })
      this.AddedPreInstalledTools = NewSelectedItemTools
    },
  }
};


export const resourceConfiguration = {

  name: "resourceConfiguration",
  props: {
    errors: {
      Resources: {},
    },
  },
  data() {
    return {
      // CPU Resources
      CpuNum: null,
      MaxCpu: null,

      // Memory Resources
      MaxMemory: null,
      Memory: null,

      // Validation Rules

      StorageRules: [
        storageCapacity => !!storageCapacity || 'This field is required',
        storageCapacity => String(storageCapacity).length == 0 || 'This field is required',
        storageCapacity => Number(storageCapacity) == null || 'Invalid Storage Capacity',
      ],

      MaxCpuRules: [
        maxCpu => !!maxCpu || 'This field is required',
        maxCpu => String(maxCpu).length == 0 || 'This field is required',
        maxCpu => Number(maxCpu) == null || 'Invalid Storage Capacity',
      ],

      CpuRules: [
        Cpu => !!Cpu || 'This field is required',
        Cpu => String(Cpu).length == 0 || 'This field is required',
        Cpu => Number(Cpu) == null || 'Invalid Storage Capacity',
      ],

      MaxMemoryRules: [
        MaxMemory => !!MaxMemory || 'This field is required',
        MaxMemory => String(MaxMemory).length == 0 || 'This field is required',
        MaxMemory => Number(MaxMemory) == null || 'Invalid Storage Capacity',
      ],

      MemoryInMegabytesRules: [
        Memory => !!Memory || 'This field is required',
        Memory => String(Memory).length == 0 || 'This field is required',
        Memory => Number(Memory) == null || 'Invalid Storage Capacity',
      ],
    }
  },
  template: `
        <div class="resourceConfiguration flex flex-column">
            <h4>Resource Configuration</h4>
            <div class="input flex flex-column">
              <label for="CpuNum">CPU</label>
              <input
              :rules="CpuRules"
              required type="text" id="CpuNum" v-model="CpuNum" />
              <span v-if="errors['Resources']['CpuNum']">{{ errors['Resources']['CpuNum'] }}</span>
            </div>

            <div class="input flex flex-column">
              <label for="MaxCpu">Max CPU</label>
              <input
              :rules="MaxCpuRules"
              required type="text" id="MaxCpu" v-model="MaxCpu" />
              <span v-if="errors['Resources']['MaxCpu']">{{ errors['Resources']['MaxCpu'] }}</span>
            </div>

            <div class="input flex flex-column">
              <label for="MemoryInMegabytes">Memory</label>
              <input
              :rules="MemoryInMegabytesRules"
              required type="text" id="MemoryInMegabytes" v-model="MemoryInMegabytes" />
              <span v-if="errors['Resources']['MemoryInMegabytes']">{{ errors['Resources']['MemoryInMegabytes'] }}</span>
            </div>

            <div class="resources-details flex">
              <div class="input flex flex-column">
                <label for="MaxMemory">Max Memory</label>
                <input
                :rules="MaxMemoryRules"
                required type="text" id="maxMemory" v-model="maxMemory" />
                <span v-if="errors['Resources']['MaxMemory']">{{ errors['Resources']['MaxMemory'] }}</span>
              </div>

              <div class="input flex flex-column">
                <label for="Storage">Storage</label>
                <input
                :rules="StorageRules"
                required type="text" id="storageCapacity" v-model="storageCapacity" />
                <span v-if="errors['Resources']['StorageInKB']">{{ errors['Resources']['StorageINKB'] }}</span>
              </div>

            </div>
          </div>
  `,
  created() {
    this.GetVirtualMachineInfo()
  },
  methods: {

    ValidateCpuResources(MaxCpu, CpuUsage) {
        // Validates Resources, Selected by the Customer
        if (String(MaxCpu).length == 0) {
          this.errors["Resources"]["MaxCpu"] = "This field is required"
        }
        if (String(CpuUsage).length == 0) {
          this.errors["Resources"]["CpuUsage"] = "This field is required"
        }
        if (!MaxCpu.TypeOf() == Number) {
          this.errors["Resources"]["MaxCpu"] = "Invalid Value for Max CPU"
        }
        if (!CpuUsage.TypeOf() == Number) {
          this.errors["Resources"]["CpuUsage"] = "Invalid Value for CPU"
        }
    },
    ValidateMemoryResources(MaxMemory, MemoryUsage) {
      // Validates Operational Memory Configuration Resources
      if (String(MaxMemory).length == 0) {
        this.errors["Resources"]["MaxMemory"] = "This field is required"
      }
      if (String(MemoryUsage).length == 0) {
        this.errors["Resources"]["MemoryUsage"] = "This field is required"
      }
      if (!MaxMemory.TypeOf() == Number) {
        this.errors["Resources"]["MaxCpu"] = "Invalid Value for Max Memory"
      }
      if (!MemoryUsage.TypeOf() == Number) {
        this.errors["Resources"]["CpuUsage"] = "Invalid Value for Memory"
      }
    },
  }
};

export const sshConfiguration = {

  name: "sshConfiguration",
  props: {
    errors: {
      SSH: {},
    }
  },
  data() {
    return {
      // SSL Secure Info
      RootUsername: null,
      RootPassword: null,
      RootCertificate: null,
      Secure: null,
    }
  },
  template: `
  <div class="sshConfiguration flex flex-column">
      <h4>SSL Configuration</h4>
        <div class="input flex flex-column">
          <label for="secure">Secure</label>
          <input required type="text" id="Secure" v-model="Secure" />
          <span v-if="errors['SSH']['Secure']">{{ errors['SSH']['Secure'] }}</span>
        </div>
  </div>
  `,
  methods: {
    ValidateSsh(SshConfiguration) {
        // Validates SSH Option, selected by the Customer
        if (SshConfiguration.Type.length == 0) {
          this.errors["SSL"]["Type"] = "This field is required"
        }
    },
  },
};

export default {

  name: "initializationModal",
  data() {
    return {

      // General Extra Attributes
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      loading: null,

      virtualMachineCreationDate: null,
      virtualMachineDateUnix: null,
      paymentDueDate: null,
      paymentTerms: null,

      updateVirtualMachine: false,

      VirtualMachineRunning: null,
      VirtualMachineDeploying: null,
      VirtualMachineShutdown: null,

      VirtualMachineDraft: null,
      VirtualMachineItemList: [],
      TotalCost: 0,
    };
  },
  components: {
    loadingPage,
    hardwareConfiguration,
    resourceConfiguration,
    sshConfiguration,
  },
  created() {
    // get current date for invoice date field

    this.GetCustomerVirtualMachines()
    this.getVirtualMachineCostTotal()

    if (!this.updateVirtualMachine) {
      this.virtualMachineDateUnix = Date.now();
      this.virtualMachineCreationDate = new Date(this.virtualMachineDateUnix).toLocaleDateString("en-us", this.dateOptions);
      this.paymentDueDate = new Date(this.virtualMachineDateUnix).toLocaleDateString("en-us", this.dateOptions);
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
    ...mapMutations(["TOGGLE_VIRTUAL_MACHINE", "TOGGLE_UPDATE_VIRTUAL_MACHINE", "SHOW_ERROR"]),
    ...mapActions(["UPDATE_VIRTUAL_MACHINE", "GET_VIRTUAL_MACHINES", "GET_VIRTUAL_MACHINE"]),

    checkClick(e) {
      if (e.target === this.$refs.virtualMachineWrap) {
        this.TOGGLE_MODAL();
      }
    },

    ValidateInput() {
      // Validates The Whole Configuration Input
    },

    addVirtualMachineToList(NewVirtualMachine) {
      // Adds new Object to the Customer's Virtual Machine List
      this.VirtualMachineItemList.push({
        "ID": NewVirtualMachine.VirtualMachineId,
        "Name": NewVirtualMachine.VirtualMachineName,
        "Status": NewVirtualMachine.Status,
        "Price": NewVirtualMachine.Price,
        "TotalCost": NewVirtualMachine.TotalCost,
      })
    },

    removeVirtualMachineFromList(VirtualMachineId) {
      // Removes Virtual Machine Info Object from the Customer's Virtual Machines List
      let UpdatedVirtualMachineItemList = this.VirtualMachineItemList.filter((VirtualMachine) => {
          return VirtualMachine.VirtualMachineId === VirtualMachineId
      })
      this.VirtualMachineItemList = UpdatedVirtualMachineItemList
    },

    closeVirtualMachineSettings() {
      this.TOGGLE_VIRTUAL_MACHINE();
      if (this.updateVirtualMachine) {
        this.TOGGLE_UDPDATE_VIRTUAL_MACHINE();
      }
    },

    GetCustomerVirtualMachines() {
      // Returns Queryset of the Virtual Machines, related to the Customer
      let newVirtualMachineManager = new vm.VirtualMachineManager()
      let VirtualMachinesQueryset, GetError = newVirtualMachineManager.GetCustomerVirtualMachines()
      if (GetError != null) {this.SHOW_ERROR(GetError.error)}
      this.VirtualMachineItemList = VirtualMachinesQueryset
    },

    // Virtual Machine Functions Goes There
    CreateNewVirtualMachine(hardwareConfigurationData, customizedConfigurationData) {

      // Initializes New Virtual Machine
      // Initializing New Resources

      let VirtualMachineInfo, CreationError = this.CREATE_VIRTUAL_MACHINE(
      hardwareConfigurationData, customizedConfigurationData)

      // If the Virtual Machine Has been Successfully Initialized and Created
      // Adding it to the Customer's Virtual Machine Item List

      if (CreationError == null) {
        let VmManager = new vm.VirtualMachineManager()
        let VirtualMachine = VmManager.GetVirtualMachine(VirtualMachineInfo["VirtualMachineId"])
        this.addVirtualMachineToList(VirtualMachine)
      }
    },


    DeleteVirtualMachine(VirtualMachineId) {
      // Deletes Selected Virtual Machine, Activates Warning before doing that Operation
      this.DELETE_VIRTUAL_MACHINE(VirtualMachineId)
      this.VirtualMachineItemList = this.VirtualMachineItemList.filter((item) => item.id !== VirtualMachineId);
    },

    getVirtualMachineCostTotal() {
      // Returns Total Amount of the Money, that Customer will need to pay for All Virtual Machines Maintainance Monthly
      this.TotalCost = 0;
      for (let item in this.VirtualMachineItemList){
        this.VirtualMachineCostTotal += item.TotalCost;
      }
    },

    saveDraft() {
      this.VirtualMachineDraft = true;
    },

    UploadVirtualMachine() {
      if (this.VirtualMachineItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }
      this.loading = true;
      this.TOGGLE_VIRTUAL_MACHINE();
      this.loading = false;
      this.GET_VIRTUAL_MACHINES();
    },

    UpdateVirtualMachine(NewConfiguration) {
      if (this.VirtualMachineItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }
      const data = {
        VirtualMachineId: this.$route.params.VirtualMachineId,
        UpdatedConfiguration: NewConfiguration,
      };
      this.UPDATE_VIRTUAL_MACHINE(data);
    },

    submitForm() {
      if (this.updateVirtualMachine) {
        this.UpdateVirtualMachine();
        return;
      }
      this.UploadVirtualMachine();
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

            .virtual-machine-id {
              flex-basis: 50%;
            }
            .virtual-machine-name{
              flex-basis: 10%;
            }
            .status{
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
  .TotalCost {
    color: #fff;
    padding: 32px;
    background-color: rgba(12, 14, 22, 0.7);
    align-items: center;
    border-radius: 0 0 20px 20px;
    p {
      flex: 1;
      font-size: 12px;
    }
    p:nth-child(2) {
      font-size: 28px;
      text-align: right;
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
