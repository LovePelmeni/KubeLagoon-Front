<template>
    <h1 style="margin-top: 20px;">Hardware Configuration</h1>
    <div class="resourceSelectors">
    
            <v-col cols="10" lg="4" class="mx-auto" style="max-width: 90%">
                  <div class="text-center">
                    <h2 class="indigo--text" style="margin-bottom: 20px; margin-top: 30px;">Datacenters</h2>
                  </div>

                  <v-col
                  cols="10"
                  lg="4"
                  class="mx-auto"
                  style="max-width: 90%;">

                  <v-select
                  ref="datacenter"
                  item-value="datacenterValue"
                  item-title="datacenterName"
                  v-model="AddedDatacenter"
                  :items="[
                    'Europe/Moscow',
                    'Europe/Berlin',
                    'US/Washington'
                  ]"
                  label="Select Datacenter"
                  hint="* Select the Datacenter for your Server *"
                  persistent-hint />

                </v-col>

                <div class="text-center">
                  <h2 class="indigo--text" style="margin-bottom: 20px; margin-top: 30px">Operational Systems</h2>
                </div>


                <v-col
                    style="margin-top: 15px; max-width: 90%;"
                    cols="10"
                    lg="4"
                    class="mx-auto"
                  >

                  <v-select
                    ref="operational_system"
                    item-value="osValue"
                    item-title="osName"
                    v-model="AddedOperationalSystem"
                    :items='[
                      "Centos 7 64-bit",
                      "Centos 8 64-bit",
                      "Centos 9 64-bit",
                      "Ubuntu 9 64-bit",
                      "Ubuntu 10 64-bit",
                      "Ubuntu 11 64-bit",
                      "Debian 10 64-bit",
                      "Debian 10 64-bit",
                      "Debian 10 64-bit",
                    ]'
                    label="Select Operational System"
                    hint="* Select the OS for your Server *"
                    persistent-hint
                  />
                </v-col>

                  <div class="text-center">
                    <h2 class="indigo--text" style="margin-bottom: 20px; margin-top: 30px;">Tools</h2>
                  </div>

                  <v-col
                    style="margin-top: 15px; max-width: 90%;"
                    cols="10"
                    lg="4"
                    class="mx-auto">

                    <v-select
                      ref="tools"
                      item-value="toolValue"
                      item-title="toolName"
                      v-model="AddedPreInstalledTools"
                      :items="[
                        'Docker',
                        'Docker-Compose',
                        'VirtualBox',
                        'Kubernetes',
                      ]"
                      label="Select Tools"
                      multiple
                      chips
                      hint="* Select some Optional Tools for your Server *"
                      persistent-hint>
                    </v-select>
                    
                </v-col>
          </v-col>
    </div>

</template>

<script>

import { mapState } from "vuex";


/* eslint-disable */

export default {

  name: "hardwareConfiguration",
  mounted() {
    this.CheckIsDraft()
  },
  props: [
    "hardwareConfiguration",
    "updateVirtualMachine",
    "suggestionCard",
  ],
  data() {
    return {
      // hardware Configuration Validation Rules

      Datacenters: [
        "Europe/Moscow",
        "Europe/Berlin",
        "US/Washington"
      ],

      OperationalSystems: [
        "Centos 7 64-bit",
        "Centos 8 64-bit",
        "Centos 9 64-bit",
        "Ubuntu 9 64-bit",
        "Ubuntu 10 64-bit",
        "Ubuntu 11 64-bit",
        "Debian 10 64-bit",
        "Debian 10 64-bit",
        "Debian 10 64-bit",
      ],
      PreInstalledTools: [
        "Docker",
        "Docker-Compose",
        "VirtualBox",
        "Kubernetes"
      ],

      // Datacenters : [
      //   {
      //     "IconImageUrl": "@/assets/datacenters/europe_moscow.png",
      //     "DatacenterName": "Europe/Moscow",
      //   },
      //   {
      //     "IconImageUrl": "@/assets/datacenters/europe_berlin.png",
      //     "DatacenterName": "Europe/Berlin",
      //   },
      //   {
      //     "IconImageUrl": "@/assets/datacenters/us_washington.png",
      //     "DatacenterName": "US/Washington",
      //   }
      // ], // array of the Objects with attrs { 'DatacenterName', 'IconImageUrl' }

      // OperationalSystems : [
      //   {
      //     "SystemName": "Debian",
      //     "Version": "10",
      //     "bit": "64",
      //     "IconImageUrl": "@/assets/os/debian.svg"
      //   },
      //   {
      //     "SystemName": "Ubuntu",
      //     "Version": "10",
      //     "bit": "64",
      //     "IconImageUrl": "@/assets/os/ubuntu.svg"
      //   },
      //   {
      //     "SystemName": "CentOS",
      //     "Version": "10",
      //     "bit": "64",
      //     "IconImageUrl": "@/assets/os/centos.svg"
      //   },
      //   {
      //     "SystemName": "Windows",
      //     "Version": "10",
      //     "bit": "64",
      //     "IconImageUrl": "@/assets/os/windows.svg"
      //   }
      // ], // array of the Objects with attrs { 'OperationalSystems', 'IconImageUrl' }

      // PreInstalledTools : [
      //   {
      //     "ToolName": "Docker",
      //     "IconImageUrl": "@/assets/tools/docker.svg",
      //   },
      //   {
      //     "ToolName": "Docker Compose",
      //     "IconImageUrl": "@/assets/tools/docker_compose.svg",
      //   },
      //   {
      //     "ToolName": "VirtualBox",
      //     "IconImageUrl": "@/assets/tools/virtual_box.svg",
      //   },
      //   {
      //     "ToolName": "Podman",
      //     "IconImageUrl": "@/assets/tools/podman.png",
      //   },
      //   {
      //     "ToolName": "Kubernetes",
      //     "IconImageUrl": "@/assets/tools/kubernetes.png",
      //   }
      // ], // array of the Objects with attrs { 'ToolName', 'IconImageUrl' }

      // Datacenter Field 
      AddedDatacenter: function(object) {
        let hardwareConfiguration = object.$props.hardwareConfiguration || {}
        return {'datacenterName': hardwareConfiguration["Datacenter"] || '', 'datacenterValue': hardwareConfiguration || ''}
      }(this),
      
      // Operational System Field
      AddedOperationalSystem: function(object) {
        let hardwareConfiguration = object.$props.hardwareConfiguration || {}
        return {'osName': hardwareConfiguration["OperationalSystem"] || '',
        'osValue': hardwareConfiguration["OperationalSystem"] || ''}
      }(this),

      // Pre Installed Tools Field 
      AddedPreInstalledTools: [],
    }
  },

  created() {
    
    this.GetSuggestedDatacenters()
    this.GetSuggestedOperationalSystems()
    this.GetSuggestedPreInstalledTools()

    if (this.$props.updateVirtualMachine === true) {
      this.AddPreSelectedValues()
    }
    if (this.$props.suggestionCard === true) {
      this.AddPreSelectedValues()
    }
  },

  methods: {

    ...mapState([
      "virtualMachineSavedDraft",
    ]),

    AddPreSelectedValues() {
      // Adding the Pre Selected Values to the Initialization Modal Configuration, this 
      let PreInstalledTools = this.$props.hardwareConfiguration["PreInstalledTools"]
      for (let ToolIndex in PreInstalledTools) {
          console.log(PreInstalledTools[ToolIndex])
          this.AddedPreInstalledTools.push(
          {'toolName': PreInstalledTools[ToolIndex], 
          'toolValue': PreInstalledTools[ToolIndex]}
        )
      }
    },
    CheckIsDraft() {
      // Checks if there is some saved drafts before initializing a new one 
      if (this.virtualMachineSavedDraft != null) {
        for (let PropertyKey in Object.keys(this.virtualMachineSavedDraft)) {
          this.$data[PropertyKey] = this.virtualMachineSavedDraft[PropertyKey]
        }
      }
    },

    GetHardwareSubmittedFormData() {
      // Returns the Value, Converted to the Blob Object of the Hardware Configuration Form 
      let SubmittedFormData = {
        "Datacenter": this.AddedDatacenter, 
        "OperationalSystem": this.AddedOperationalSystem, 
        "Tools": this.Tools,
      }
      return SubmittedFormData
    },
    GetSuggestedDatacenters() {
      // Returns Array of the Available Datacenters
      let Datacenters = [
        {
          "IconImageUrl": "@/assets/datacenters/europe_moscow.png",
          "DatacenterName": "Europe/Moscow",
        },
        {
          "IconImageUrl": "@/assets/datacenters/europe_berlin.png",
          "DatacenterName": "Europe/Moscow",
        },
        {
          "IconImageUrl": "@/assets/datacenters/us_washington.png",
          "DatacenterName": "US/washington",
        }
      ]
      this.Datacenters = Datacenters
    },

    GetSuggestedOperationalSystems() {
      // Returns Array of the Available Distributions for the Virtual Machine  Server
      let OperationalSystems = [
        {
          "SystemName": "Debian",
          "Version": "10",
          "bit": "64",
          "IconImageUrl": "@/assets/os/debian.svg"
        },
        {
          "SystemName": "Ubuntu",
          "Version": "10",
          "bit": "64",
          "IconImageUrl": "@/assets/os/ubuntu.svg"
        },
        {
          "SystemName": "CentOS",
          "Version": "10",
          "bit": "64",
          "IconImageUrl": "@/assets/os/centos.svg"
        },
        {
          "SystemName": "Windows",
          "Version": "10",
          "bit": "64",
          "IconImageUrl": "@/assets/os/windows.svg"
        }
      ]
      this.OperationalSystems = OperationalSystems
    },

    GetSuggestedPreInstalledTools() {
      // Returns Array of the Available Preinstalled Tools, that you can pre install, on your OS
      let PreInstalledTools = [
        {
          "ToolName": "Docker",
          "IconImageUrl": "@/assets/tools/docker.svg",
        },
        {
          "ToolName": "Docker Compose",
          "IconImageUrl": "@/assets/tools/docker_compose.svg",
        },
        {
          "ToolName": "VirtualBox",
          "IconImageUrl": "@/assets/tools/virtual_box.svg",
        },
        {
          "ToolName": "Podman",
          "IconImageUrl": "@/assets/tools/podman.png",
        },
        {
          "ToolName": "Kubernetes",
          "IconImageUrl": "@/assets/tools/kubernetes.png",
        }
      ]
      this.PreInstalledTools = PreInstalledTools
    },

    GetDatacenterObject(DatacenterName) {
      // Converts Datacenter to the JSON Object 
      let Datacenter = this.Datacenters.filter((dc) => {
        return dc === DatacenterName
      })[0]
      let DatacenterObject = {"DatacenterName": Datacenter}
      return DatacenterObject 
    },

    GetOperationalSystemObject(OsName) {
      // Converts String with the Operational System Info, into an JSON object 
      let OperationalSystem = this.OperationalSystems.filter((os) => {
        return os === OsName
      })[0]
      let SystemName = OperationalSystem.split(" ")[0]
      let Version = OperationalSystem.split(" ")[1]
      let Bit = OperationalSystem.split(" ")[2].trim("bit")
      let OperationalSystemObject = {
        "SystemName": SystemName,
        "Version": Version, 
        "Bit": Bit,
      }
      return OperationalSystemObject
    },
    GetToolsObjects(Tools) {
      // Converts Tools Into an array of the JSON Objects
      let ToolsObjectsArray = [];
      for (let Tool in Tools) {
        ToolsObjectsArray.push({
          "ToolName": Tool
        })
      }
      return ToolsObjectsArray
    }
  }
};


</script>

<style lang="scss">


.v-select__selection-text {
  color: white;
}

.resourceSelectors {

.v-messages__message {
  margin-top: 10px;
  align-items: center;
  align-content: center;
  text-align: center;
  line-height: 12px;
  word-break: break-word;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  hyphens: auto;
  transition-duration: 150ms;
}
}

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
    h2 {
            color: #fff !important;
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

  .resourceSelectors {
    justify-content: space-around;
  }

  .modalField {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }
  input {
    background-color: #1e2139;
  }
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
    border-radius: 5px;
  }

  select .v-field.v-field {
    cursor: pointer;
    background-color: #1e2139;
}

.not_available {
  margin-top: 160px;
  align-items: center;
  img {
    width: 214px;
    height: 200px;
  }
  h3 {
    font-size: 20px;
    margin-top: 40px;
  }
  p {
    text-align: center;
    max-width: 224px;
    font-size: 12px;
    font-weight: 300;
    margin-top: 16px;
  }
}

button, input, select, textarea {
    background-color: none;
    border-style: none;
}

</style>
