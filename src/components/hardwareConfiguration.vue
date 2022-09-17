<template>

    <h1 style="margin-top: 20px;">Hardware Configuration</h1>
    <div class="resourceSelectors">
    
            <v-col cols="10" lg="4" class="mx-auto">
                <div class="text-center">
                  <h2 class="indigo--text" style="margin-bottom: 30px">Datacenters</h2>
                </div>

                    <v-select item-text="text" ref="Datacenter" v-model="AddedDatacenter" label="Datacenter" :items="Datacenters" return-object>

                           <template v-slot:selection="{ item, index }">
                              <input :required="AddedDatacenter" hidden :value="index">
                              <img :src="item.IconImageUrl">{{ item.DatacenterName }}
                            </template>

                            <template v-slot:item="{ item, index }">
                              <input hidden :value="index">
                              <img :src="item.IconImageUrl">{{ item.DatacenterName }}
                            </template>

                      </v-select>

                  <div class="text-center">
                  <h2 class="indigo--text" style="margin-bottom: 30px">Operational Systems</h2>
                  </div>

                  <v-select ref="OperationalSystem" v-model="AddedOperationalSystem" label="Operational System" :items="OperationalSystems" return-object>

                              <template v-slot:selection="{ item, index}">
                                  <input type="hidden" :value="index">
                                  <img :src="item.IconImageUrl">{{ item.SystemName }}
                              </template>

                              <template v-slot:item="{ item, index }">
                                  <input type="hidden" :value="index">
                                  <img :src="item.IconImageUrl">{{ item.SystemName }}
                              </template>

                      </v-select>

                <div class="text-center">
                  <h2 class="indigo--text" style="margin-bottom: 30px">Tools</h2>
                </div>
                    <v-select ref="Tools" v-model="AddedPreInstalledTools" label="Pre Install Tools" :items="PreInstalledTools" >

                          <template v-slot:selection="{ item, index }">
                                    <input type="hidden" :value="index">
                                    <img :src="item.IconImageUrl">{{ item.ToolName }}
                                  </template>

                                  <template v-slot:item="{ item }">
                                    <input hidden :value="index">
                                    <img :src="item.IconImageUrl">{{ item.ToolName }}
                          </template>
                    </v-select>
          </v-col>
    </div>

</template>

<script>


/* eslint-disable */

export default {

  name: "hardwareConfiguration",
  mounted() {
    this.GetSuggestedDatacenters()
    this.GetSuggestedOperationalSystems()
    this.GetSuggestedPreInstalledTools()

    this.AddedDatacenter = null
    this.AddedOperationalSystem = null
    this.AddedPreInstalledTools = []
  },
  data() {
    return {
      // hardware Configuration Validation Rules

      Datacenters : [
        {
          "IconImageUrl": "@/assets/datacenters/europe_moscow.png",
          "DatacenterName": "Europe/Moscow",
        },
        {
          "IconImageUrl": "@/assets/datacenters/europe_berlin.png",
          "DatacenterName": "Europe/Berlin",
        },
        {
          "IconImageUrl": "@/assets/datacenters/us_washington.png",
          "DatacenterName": "US/Washington",
        }
      ], // array of the Objects with attrs { 'DatacenterName', 'IconImageUrl' }

      OperationalSystems : [
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
      ], // array of the Objects with attrs { 'OperationalSystems', 'IconImageUrl' }

      PreInstalledTools : [
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
      ], // array of the Objects with attrs { 'ToolName', 'IconImageUrl' }

      AddedDatacenter: null,
      AddedOperationalSystem: null,
      AddedPreInstalledTools: [],
    }
  },

  created() {
    this.GetSuggestedDatacenters()
    this.GetSuggestedOperationalSystems()
    this.GetSuggestedPreInstalledTools()
  },

  methods: {

    GetHardwareSubmittedFormData() {
      // Returns the Value, Converted to the Blob Object of the Hardware Configuration Form 
      let SubmittedFormData = {
        "Datacenter": this.AddedDatacenter, 
        "OperationalSystem": this.AddedOperationalSystem, 
        "Tools": this.Tools,
      }
      return SubmittedFormData
    },

    ValidateOperationalSystem(OperationalSystem) {
        //  Validates Operational System, picked up by the Customer
        if (OperationalSystem.SystemName.length == 0) {
          this.errors["OS"] = "This field is required"
        }
        if (this.AddedOperationalSystem != null && this.AddedOperationalSystem == OperationalSystem) {
          this.AddedOperationalSystem = null
        }else{
        this.selectOperationalSystem(OperationalSystem)}
    },

    ValidateDatacenter(Datacenter) {
      // Validates Load Balancer Configuration
      if (Datacenter.Type.length == 0) {
        this.errors["LoadBalancer"]["Type"] = "This field is required"
      }
      if (Datacenter.Port != 0) {
        this.errors["LoadBalancer"]["Port"] = "Please specify the default value"
      }
      if (this.AddedDatacenter != null && this.AddedDatacenter == Datacenter) {
          this.AddedDatacenter = null
        }else{
        this.selectDatacenter(Datacenter)}
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
    
    GetDatacenter(DatacenterName) {
      // Returns Load Balancers Object
      return this.Datacenters.filter((dc) => {
        return dc.DatacenterName === DatacenterName
      })[0]
    },

    GetOperationalSystem(OperationalSystemName, Version, Bit) {
      // Returns Load Balancers Object
      return this.LoadBalancers.filter((os) => {
        return os.SystemName === OperationalSystemName && os.Version === Version && os.Bit === Bit
      })[0]
    },
  }
};



</script>

<style lang="scss">

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
