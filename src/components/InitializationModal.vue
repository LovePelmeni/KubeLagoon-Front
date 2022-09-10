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

import { mapMutations, mapActions, mapState } from "vuex";
import * as suggestions from "../../suggestions/suggestions.js";
import loadingPage from "./LoadingPage.vue";
import * as vm from "../../vm/vm.js";
import { useCookies } from "vue3-cookies";


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
  mounted() {
    this.LoadBalancers = this.GetSuggestedLoadBalancers()
    this.Datacenters = this.GetSuggestedDatacenters()
    this.OperationalSystems = this.GetSuggestedOperationalSystems()
    this.PreInstalledTools = this.GetSuggestedPreInstalledTools()

    this.AddedLoadBalancer = null
    this.AddedDatacenter = null
    this.AddedOperationalSystem = null
    this.AddedPreInstalledTools = []

  },
  data() {
    return {
      // hardware Configuration Validation Rules

      LoadBalancers : [],
      Datacenters : [],
      OperationalSystems : [],
      PreInstalledTools : [],

      AddedLoadBalancer: null,
      AddedDatacenter: null,
      AddedOperationalSystem: null,
      AddedPreInstalledTools: [],


      DatacenterRules: [
       !!this.AddedDatacenter || 'Datacenter is required',
      ],

      OperationalSystemRules: [
        !!this.AddedOperationalSystem || 'Operational System is required',
      ],

      LoadBalancerRules: [
        !!this.AddedLoadBalancer || 'Load Balancer is required',
      ],
    }
  },

  template: `
      <div class="hardwareConfiguration flex flex-column">
        <h4>Hardware Configuration</h4>

        <div class="input flex flex-column">
          <label for="LoadBalancer">Load Balancer</label>
        </div>

        <table v-if="LoadBalancers?.length" class="item-list">

            <tr class="table-heading flex">
              <th class="item-name"></th>
            </tr>

            <tr class="table-items flex" v-for="(LoadBalancer, index) in LoadBalancers" :key="index">
              <td class="item-name"><input type="text" v-model="LoadBalancer.Name" /></td>

              <img @click="selectLoadBalancer(LoadBalancer.Name)" v-if="LoadBalancer != AddedLoadBalancer && AddedLoadBalancer == null" :src="require(LoadBalancer.LocalImageUrl)" alt="Select" />
              <img v-if="AddedLoadBalancer != null && LoadBalancer != AddedLoadBalancer" alt="Disabled" />
              <img @click="unSelectLoadBalancer(LoadBalancer.Name)" v-if="LoadBalancer == AddedLoadBalancer" :src="require('@/assets/icon-delete.svg')" alt="unSelect" />

              <span v-if="errors?.LoadBalancer[LoadBalancer.Name]">{{ errors?.LoadBalancer[LoadBalancer.Name] }}</span>
            </tr>
          </table>

        <div class="input flex flex-column">
          <label for="Datacenter">Datacenter</label>
        </div>

        <table v-if="Datacenters?.length > 0" class="item-list">

            <tr class="table-heading flex">
              <th class="item-name"></th>
            </tr>

            <tr class="table-items flex" v-for="(Datacenter, index) in Datacenters" :key="index">
              <td class="item-name"><input type="text" v-model="Datacenter.DatacenterName" /></td>

              <img @click="selectDatacenter(Datacenter.DatacenterName)" v-if="Datacenter != AddedDatacenter && AddedDatacenter == null" :src="require(Datacenter.LocalImageUrl)" alt="Select" />
              <img v-if="AddedDatacenter != null && Datacenter != AddedDatacenter" alt="Disabled" />
              <img @click="unSelectDatacenter(Datacenter.DatacenterName)" v-if="Datacenter == AddedDatacenter" :src="require('@/assets/icon-delete.svg')" alt="unSelect" />

              <span v-if="errors?.Datacenter[Datacenter.DatacenterName]">{{ errors?.Datacenter[Datacenter.DatacenterName] }}</span>

            </tr>
          </table>

          <div class="input flex flex-column">
          <label for="OperationalSystem">Operational System</label>
          </div>

        <table v-if="OperationalSystems?.length > 0" class="item-list">

              <tr class="table-heading flex">
              <th class="item-name">Name</th>
              <th class="item-name">Version</th>
              </tr>

              <tr class="table-items flex" v-for="(OperationalSystem, index) in OperationalSystems" :key="index">
                <td class="item-name"><input type="text" v-model="OperationalSystem.Name" /></td>
                <td class="item-name"><input type="text" v-model="OperationalSystem.Version" /></td>

                <img @click="selectOperationalSystem(OperationalSystem.SystemName, OperationalSystem.Version, OperationalSystem.Bit)" v-if="OperationalSystem != AddedOperationalSystem && OperationalSystem == null" :src="require(OperationalSystem.LocalImageUrl)" alt="Select" />
                <img v-if="AddedOperationalSystem != null && OperationalSystem != AddedOperationalSystem" alt="Disabled" />
                <img @click="unSelectOperationalSystem(OperationalSystem.SystemName)" v-if="OperationalSystem == AddedOperationalSystem" :src="require('@/assets/icon-delete.svg')" alt="unSelect" />

                <span v-if="errors?.OS[OperationalSystem.SystemName]">{{ errors?.OS[OperationalSystem.SystemName] }}</span>

              </tr>
          </table>

        <div class="input flex flex-column">
          <label for="PreInstalledTools">Pre Installed Tools</label>
        </div>

        <table v-if="PreInstalledTools?.length > 0" class="item-list">

                <tr class="table-heading flex">
                    <th class="item-name">Tool</th>
                    <th class="item-name">Version</th>
                </tr>
                <tr class="table-items flex" v-for="(Tool, index) in PreInstalledTools" :key="index">
                    <td class="item-name"><input type="text" v-model="Tool.Name"/></td>
                    <td class="item-name"><input type="text" v-model="Tool.Version" /></td>

                    <img @click="selectPreInstallTool(Tool.Name)" v-if="!Tool in AddedPreInstalledTools" :src="require(Tool.LocalImageUrl)" alt="Select" />
                    <img v-if="Tool in AddedPreInstalledTools" alt="Disabled" />
                    <img @click="unSelectPreInstallTool(Tool.Name)" v-if="Tool in AddedPreInstalledTools" :src="require('@/assets/icon-delete.svg')" alt="unSelect" />

                    <span v-if="errors?.Tool[Tool.Name]">{{ errors?.Tool[Tool.Name] }}</span>
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

    // Validation Methods for t he Form
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
        this.OperationalSystems = OperationalSystems
      }
    },

    GetSuggestedPreInstalledTools() {
      // Returns Array of the Available Preinstalled Tools, that you can pre install, on your OS
      let newManager = this.GetSuggestionsManager()
      let PreInstalledTools = newManager.GetSuggestedPreInstallTools()
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

    GetLoadBalancer(LoadBalancerName) {
      // Returns Load Balancers Object
      return this.LoadBalancers.filter((lb) => {
        return lb.LoadBalancerName === LoadBalancerName
      })[0]
    },

    GetDatacenter(DatacenterName) {
      // Returns Load Balancers Object
      return this.Datacenters.filter((dc) => {
        return dc.DatacenterName === DatacenterName
      })[0]
    },

    GetOperationalSystem(OperationalSystemName, Version, Bit) {
      // Returns Load Balancers Object
      return this.LoadBalancers.filter((os) => {
        return os.Name === OperationalSystemName && os.Version === Version && os.Bit === Bit
      })[0]
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
      CpuNum: null, // CPU Number
      MaxCpu: null, // Max Full Cpu Power Usage (for example: 5 full CPU's usage) means 500 % where each has 100 %

      // Memory Resources
      MaxMemory: null, // In Megabytes  !
      Memory: null, // In Megabytes !

      // Disk Resources
      storageCapacity: null, // In Kilabytes !
      maxStorageCapacity: null, // In Kilabytes as well !

      // Validation Rules

      StorageRules: [
        storageCapacity => !!storageCapacity || 'This field is required',
        storageCapacity => String(storageCapacity).length == 0 || 'This field is required',
        storageCapacity => Number(storageCapacity) == null || 'Invalid Storage Capacity',
      ],

      MaxCpuRules: [
        maxCpu => !!maxCpu || 'This field is required',
        maxCpu => String(maxCpu).length == 0 || 'This field is required',
        maxCpu => Number(maxCpu) == null || 'Invalid Max CPU Capacity',
      ],

      CpuRules: [
        Cpu => !!Cpu || 'This field is required',
        Cpu => String(Cpu).length == 0 || 'This field is required',
        Cpu => Number(Cpu) == null || 'Invalid CPU Capacity',
      ],

      MaxMemoryRules: [
        MaxMemory => !!MaxMemory || 'This field is required',
        MaxMemory => String(MaxMemory).length == 0 || 'This field is required',
        MaxMemory => Number(MaxMemory) == null || 'Invalid Max Memory Capacity',
      ],

      MemoryInMegabytesRules: [
        Memory => !!Memory || 'This field is required',
        Memory => String(Memory).length == 0 || 'This field is required',
        Memory => Number(Memory) == null || 'Invalid Memory Capacity',
      ],

      DiskCapacityRules: [
        DiskCapacity => !!DiskCapacity || 'This Field is required',
        DiskCapacity => String(DiskCapacity).length == 0 || 'This field is required',
        DiskCapacity => Number(DiskCapacity) == null || 'Invalid Disk Capacity'
      ],
      MaxDiskCapacityRules: [
        MaxDiskCapacity => !!MaxDiskCapacity || 'This field is required',
        MaxDiskCapacity => String(MaxDiskCapacity).length == 0 || 'This field is required',
        MaxDiskCapacity => Number(MaxDiskCapacity) == null || 'Invalid Disk Capacity',
      ]
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
              <span v-if="errors?.Resources['CpuNum']">{{ errors?.Resources['CpuNum'] }}</span>
            </div>

            <div class="input flex flex-column">
              <label for="MaxCpu">Max CPU</label>
              <input
              :rules="MaxCpuRules"
              required type="text" id="MaxCpu" v-model="MaxCpu" />
              <span v-if="errors?.Resources['MaxCpu']">{{ errors?.Resources['MaxCpu'] }}</span>
            </div>

            <div class="input flex flex-column">
              <label for="MemoryInMegabytes">Memory</label>
              <input
              :rules="MemoryInMegabytesRules"
              required type="text" id="MemoryInMegabytes" v-model="Memory" />
              <span v-if="errors?.Resources['MemoryInMegabytes']">{{ errors?.Resources['MemoryInMegabytes'] }}</span>
            </div>

            <div class="resources-details flex">
              <div class="input flex flex-column">
                <label for="MaxMemory">Max Memory Capacity</label>
                <input
                :rules="MaxMemoryRules"
                required type="text" id="maxMemory" v-model="MaxMemory" />
                <span v-if="errors?.Resources['MaxMemory']">{{ errors?.Resources['MaxMemory'] }}</span>
              </div>

              <div class="input flex flex-column">
                <label for="Storage">Storage</label>
                <input
                :rules="StorageRules"
                required type="text" id="storageCapacity" v-model="storageCapacity" />
                <span v-if="errors?.Resources['StorageInKB']">{{ errors?.Resources['StorageINKB'] }}</span>
              </div>

              <div class="input flex flex-column">
                <label for="Storage">Max Storage Capacity</label>
                <input
                :rules="StorageRules"
                required type="text" id="maxStorageCapacity" v-model="maxStorageCapacity" />
                <span v-if="errors?.Resources['MaxStorageInKB']">{{ errors?.Resources['MaxStorageINKB'] }}</span>
              </div>

            </div>
          </div>
  `,
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
          <span v-if="errors?.SSH['Secure']">{{ errors?.SSH['Secure'] }}</span>
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
  setup() {
    const { cookie } = useCookies();
    return { cookie };
  },
  mounted() {
    this.JwtToken = this.cookie?.get("jwt-token")
  },
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

    this.CheckIsDraft() // Checking if this is Saved Draft or Customer Want to Initialize New Configuration
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

    ...mapMutations([
      "TOGGLE_INITIALIZATION_MODAL",
      "TOGGLE_UPDATE_VIRTUAL_MACHINE",
      "TOGGLE_ERROR",
    ]),
    ...mapActions([
      "GET_VIRTUAL_MACHINE",
      "GET_VIRTUAL_MACHINES",
      "CREATE_VIRTUAL_MACHINE",
      "DELETE_VIRTUAL_MACHINE",
    ]),

    checkClick(e) {
      if (e.target === this.$refs.virtualMachineWrap) {
        this.TOGGLE_MODAL();
      }
    },

    CheckIsDraft() {
      //Checks if the Configuration is a Saved Draft
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
      this.TOGGLE_INITIALIZATION_MODAL();
      if (this.updateVirtualMachine) {
        this.TOGGLE_UPDATE_VIRTUAL_MACHINE();
      }
    },

    GetCustomerVirtualMachines() {
      // Returns Queryset of the Virtual Machines, related to the Customer
      let newVirtualMachineManager = new vm.VirtualMachineManager()
      let VirtualMachinesQueryset, GetError = newVirtualMachineManager.GetCustomerVirtualMachines(this.JwtToken)
      if (GetError != null) {this.TOGGLE_ERROR(GetError.error)}
      this.VirtualMachineItemList = VirtualMachinesQueryset
    },

    // Virtual Machine Functions Goes There
    CreateNewVirtualMachine(hardwareConfigurationData, customizedConfigurationData) {

      // Initializes New Virtual Machine
      // Initializing New Resources

      let VirtualMachineInfo, CreationError = this.CREATE_VIRTUAL_MACHINE(
      this.JwtToken, hardwareConfigurationData, customizedConfigurationData)

      // If the Virtual Machine Has been Successfully Initialized and Created
      // Adding it to the Customer's Virtual Machine Item List

      if (CreationError == null) {
        let VmManager = new vm.VirtualMachineManager()
        let VirtualMachine = VmManager.GetVirtualMachine(this.JwtToken, VirtualMachineInfo["VirtualMachineId"])
        this.addVirtualMachineToList(VirtualMachine)
      }
    },


    DeleteVirtualMachine(VirtualMachineId) {
      // Deletes Selected Virtual Machine, Activates Warning before doing that Operation
      this.DELETE_VIRTUAL_MACHINE(this.JwtToken, VirtualMachineId)
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
      this.TOGGLE_INITIALIZATION_MODAL();
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
