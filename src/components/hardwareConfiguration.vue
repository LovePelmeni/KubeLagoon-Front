<template>
  <div class="hardwareConfiguration flex flex-column">
    <h4>Hardware Configuration</h4>

    <div class="input flex flex-column">
      <label for="LoadBalancer">Load Balancers</label>
    </div>

    <table v-if="LoadBalancers?.length" class="item-list">

        <v-select :options="LoadBalancers" @click="validateLoadBalancer" @change="validateLoadBalancer"  label="Load Balancer">
            <template>
                <img :src="require(LoadBalancer.IconImageUrl)" style="height: 20%; width: 20%"/>
                {{ LoadBalancer.LoadBalancerName }}
            </template>
        </v-select>
    </table>

    <table v-else class="not_available flex flex-column">
      <img :src="require('@/assets/not_available.svg')" style="width: 20%; height: 20%; margin" alt="illustration-empty" />
      <h3>No Load Balancers Available</h3>
    </table>


    <div class="input flex flex-column">
      <label for="Datacenter">Datacenters</label>
    </div>

    <table v-if="Datacenters?.length" class="item-list">

        <v-select :options="Datacenters" @click="validateDatacenter" @change="validateDatacenter" label="title">
            <template>
                <img :src="require(Datacenter.IconImageUrl)" style="height: 20%; width: 20%" />
                {{ Datacenter.DatacenterName }}
            </template>
        </v-select>

      </table>

      <table v-else class="not_available flex flex-column">
        <img :src="require('@/assets/not_available.svg')" style="width: 20%; height: 20%; margin" alt="illustration-empty" />
        <h3>No Datacenters Available</h3>
      </table>

      <div class="input flex flex-column">
      <label for="OperationalSystem">Operational Systems</label>
      </div>

    <table v-if="OperationalSystems?.length" class="item-list">

          <v-select :options="OperationalSystems" @click="validateOperationalSystem" @change="validateOperationalSystem"  label="title">
              <template style="height: 20%; width: 20%">
                  <img :src="require(OperationalSystem.IconImageUrl)" style="height: 20%; width: 20%" />
                  {{ OperationalSystem.SystemName }}

              </template>
          </v-select>
      </table>

      <table v-else class='not_available flex flex-column'>
        <img :src="require('@/assets/not_available.svg')" style="width: 20%; height: 20%; margin" alt="illustration-empty" />
        <h3>No Operational Systems Available</h3>
      </table>

    <div class="input flex flex-column">
      <label for="PreInstalledTools">Pre Install Tools</label>
    </div>

    <table v-if="PreInstalledTools?.length" class="item-list">

            <v-select :options="Tools" @click="selectPreInstalledTool" @change="validatePreInstallTool" label="title">
                <template>
                    <img :src="require(Tool.IconImageUrl)" style="height: 20%; width: 20%" />
                    {{ Tool.ToolName + " " + Tool.Version + " " + Tool.Bit + "-bit" }}
                </template>
            </v-select>

      </table>
      <table v-else class="not_available flex flex-column">
        <img :src="require('@/assets/not_available.svg')" style="width: 20%; height: 20%; margin" alt="illustration-empty" />
        <h3>No Tools to pre-install is Available</h3>
      </table>
  </div>

</template>


<script>

import * as suggestions from "../../suggestions/suggestions.js";

export default {

  name: "hardwareConfiguration",
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

      // Error Context 
      errors: {
          Datacenter: {},
          OS: {},
          Tool: {},
          LoadBalancer: {},
      },

      // hardware Configuration Validation Rules

      LoadBalancers : [], // array of the Objects of the Type { 'LoadBalancerName' , 'IconImageUrl'}
      Datacenters : [], // array of the Objects with attrs { 'DatacenterName', 'IconImageUrl' }
      OperationalSystems : [], // array of the Objects with attrs { 'OperationalSystems', 'IconImageUrl' }
      PreInstalledTools : [], // array of the Objects with attrs { 'ToolName', 'IconImageUrl' }

      AddedLoadBalancer: null,
      AddedDatacenter: null,
      AddedOperationalSystem: null,
      AddedPreInstalledTools: [],
    }
  },

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
      this.selectDatacenter(Datacenter)
    },

    ValidateOperationalSystem(OperationalSystem) {
        //  Validates Operational System, picked up by the Customer
        if (OperationalSystem.SystemName.length == 0) {
          this.errors["OS"] = "This field is required"
        }
      this.selectOperationalSystem(OperationalSystem)
    },

    ValidateLoadBalancer(LoadBalancer) {
      // Validates Load Balancer Configuration
      if (LoadBalancer.Type.length == 0) {
        this.errors["LoadBalancer"]["Type"] = "This field is required"
      }
      if (LoadBalancer.Port != 0) {
        this.errors["LoadBalancer"]["Port"] = "Please specify the default value"
      }
      this.selectLoadBalancer(LoadBalancer)
    },

    GetSuggestionsManager() {
      let SuggestionManager = new suggestions.SuggestionsManager()
      return SuggestionManager
    },

    GetSuggestedLoadBalancers() {
      // Returns Array of the Available Load Balancers
      let newManager = this.GetSuggestionsManager()
      let LoadBalancers = newManager.GetSuggestedLoadBalancers()
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

    selectLoadBalancer(LoadBalancer) {
      // Selects Load Balancer, that Is going to be Used for the Virtual Machine Server Deployment
      this.AddedLoadBalancer = LoadBalancer
    },

    selectDatacenter(DatacenterName) {
      // Selects Datacenter, that Is going to be Used for the Virtual Machine Server Deployment
      let Datacenter = this.GetDatacenter(DatacenterName)
      if (Datacenter != null){
      this.AddedDatacenter = Datacenter}
    },

    selectOperationalSystem(OperationalSystem) {
      // Selects Operational System for the Virtual Machine Server
      this.AddedOperationalSystem = {
      "SystemName": OperationalSystem.OSName + OperationalSystem.Version,
      "Version": OperationalSystem.Version,
      "Bit": OperationalSystem.Bit}
    },

    selectPreInstalledTool(Tool) {
      // Adds pre Installed Tools to the Array
      this.AddedPreInstalledTools.push(Tool)
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

</script>
