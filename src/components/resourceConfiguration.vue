<template>
      <div class="resourceConfigurationBlock" style="justify-content: space-around;">

      <h1 style="margin-top: 20px;">Resource Configuration</h1>
      <div class="modalField flex flex-column">
        <label for="CpuNum">CPU</label>

        <v-text-field
        ref="CpuNum"
        v-if="!CpuNum"
        :rules="CpuRules"
        id="CpuNum" 
        v-model="CpuNum"
        required
        />

        <v-text-field
        required
        v-else
        :rules="CpuRules"
        id="CpuNum" 
        v-model="CpuNum"/>
      </div>

      <div class="modalField flex flex-column">
        <label for="MaxCpu">Max CPU</label>

        <v-text-field
        ref="MaxCpu"
        v-if="!MaxCpu"
        :rules="MaxCpuRules"
        required
        id="MaxCpu" 
        v-model="MaxCpu" />

        <v-text-field
        ref="MaxCpu"
        v-else
        :rules="MaxCpuRules"
        required
        id="MaxCpu" 
        v-model="MaxCpu"
        />
      </div>

      <div class="modalField flex flex-column">
        <label for="MemoryInMegabytes">Memory (MB)</label>

        <v-text-field
        ref="Memory"
        required
        v-if="!Memory"
        :rules="MemoryInMegabytesRules"
        id="MemoryInMegabytes"
        v-model="Memory" />

        <v-text-field
        ref="Memory"
        required
        v-else
        :rules="MemoryInMegabytesRules"
        id="MemoryInMegabytes"
        v-model="Memory"
        />
      </div>

      <div class="resources-details flex">

        <div class="modalField flex flex-column">
          <label for="MaxMemory">Max Memory Capacity (MB)</label>

          <v-text-field
          ref="MaxMemory"
          required
          v-if="!MaxMemory"
          :rules="MaxMemoryRules"
          id="MaxMemory" 
          v-model="MaxMemory" />

          <v-text-field
          ref="MaxMemory"
          required
          v-else
          :rules="MaxMemoryRules"
          id="MaxMemory" 
          v-model="MaxMemory"/>
        </div>

        <div class="modalField flex flex-column">
          <label for="Storage">Storage (GB)</label>

          <v-text-field
          ref="StorageCapacity"
          required
          v-if="!StorageCapacity"
          :rules="StorageRules"
          
          id="StorageCapacity"
          v-model="StorageCapacity" />

          <v-text-field
          ref="StorageCapacity"
          required
          v-else
          :rules="StorageRules"
          
          id="StorageCapacity"
          v-model="StorageCapacity"/>
        </div>

        <div class="modalField flex flex-column">
          <label for="MaxStorage">Max Storage Capacity (GB)</label>

          <v-text-field
          ref="MaxStorageCapacity"
          required
          v-if="!MaxStorageCapacity"
          :rules="MaxStorageRules"
          
          id="MaxStorageCapacity"
          v-model="MaxStorageCapacity" />

          <v-text-field
          ref="MaxStorageCapacity"
          v-else
          
          :rules="MaxStorageRules"
          required 
          
          id="MaxStorageCapacity"
          v-model="MaxStorageCapacity"/>
        </div>
      </div>

      </div>

</template>

<script>

import { mapState } from "vuex";

export default {

  name: "resourceConfiguration",
  mounted() {
    this.CheckIsDraft()
  },
  props: [
    "resourceConfiguration"
  ],
  data() {
    return {
      // CPU Resources 
      CpuNum: function(object) {
        let resourceConfiguration = object.$props.resourceConfiguration || {};
        return resourceConfiguration?.CpuNum || null}(this), // CPU Number
        
      MaxCpu: function(object) {
        let resourceConfiguration = object.$props.resourceConfiguration || {};
        return resourceConfiguration?.MaxCpu || null}(this), // Max Full Cpu Power Usage (for example: 5 full CPU's usage) means 500 % where each has 100 %

      // Memory Resources
      MaxMemory: function(object) {
      let resourceConfiguration = object.$props.resourceConfiguration || {};
      return resourceConfiguration?.MaxMemory || null}(this), // In Megabytes  !

      Memory: function(object) {
      let resourceConfiguration = object.$props.resourceConfiguration || {};
      return resourceConfiguration?.Memory || null}(this),// In Megabytes !

      // Disk Resources
      StorageCapacity: function(object) {
        let resourceConfiguration = object.$props.resourceConfiguration || {};
        return resourceConfiguration?.StorageCapacity || null
      }(this), // In Kilabytes !
      MaxStorageCapacity: function(object) {
        let resourceConfiguration = object.$props.resourceConfiguration || {};
        return resourceConfiguration?.MaxStorageCapacity || null}(this), // In Kilabytes as well !

      // Validation Rules

      StorageRules: [
        storageCapacity => String(storageCapacity).length != 0 || 'This is required',
        storageCapacity => !isNaN(storageCapacity) || 'Invalid Storage Capacity',
      ],

      MaxStorageRules: [
        storageCapacity => String(storageCapacity).length != 0 || 'This is required',
        storageCapacity => !isNaN(storageCapacity) || 'Invalid Max Storage Capacity',
      ],

      MaxCpuRules: [
        maxCpu => String(maxCpu).length != 0 || 'This field is required',
        maxCpu => !isNaN(maxCpu) || 'Invalid Max CPU Capacity',
      ],

      CpuRules: [
        Cpu => String(Cpu).length != 0 || 'This field is required',
        Cpu => !isNaN(Cpu) || 'Invalid CPU Capacity',
      ],

      MaxMemoryRules: [
        MaxMemory => String(MaxMemory).length != 0 || 'This field is required',
        MaxMemory => !isNaN(MaxMemory) || 'Invalid Max Memory Capacity',
      ],

      MemoryInMegabytesRules: [
        Memory => String(Memory).length != 0 || 'This field is required',
        Memory => !isNaN(Memory) || 'Invalid Memory Capacity',
      ],

      DiskCapacityRules: [
        DiskCapacity => String(DiskCapacity).length != 0 || 'This field is required',
        DiskCapacity => !isNaN(DiskCapacity) || 'Invalid Disk Capacity'
      ],
      MaxDiskCapacityRules: [
        MaxDiskCapacity => String(MaxDiskCapacity).length != 0 || 'This field is required',
        MaxDiskCapacity => !isNaN(MaxDiskCapacity)|| 'Invalid Disk Capacity',
      ]
    }
  },
  methods: {

    ...mapState([
      "virtualMachineSavedDraft",
    ]),

    GetResourceConfigurationSubmittedFormData() {
      // Returns the Form Data of the Resource Configuration serialized into the Object 
      let Data = {
        "CpuNum": this.CpuNum, 
        "MaxCpu": this.MaxCpu, 
        "Memory": this.Memory, 
        "MaxMemory": this.MaxMemory, 
        "StorageCapacity": this.storageCapacity, 
        "MaxStorageCapacity": this.MaxStorageCapacity,
      }
      return Data
    },

    CheckIsDraft() {
      // Checks if there is some saved drafts before initializing a new one 
      if (this.virtualMachineSavedDraft != null) {
        for (let PropertyKey in Object.keys(this.virtualMachineSavedDraft)) {
          this[PropertyKey] = this.virtualMachineSavedDraft[PropertyKey]
        }
      }
    },

    ProcessMaxMemoryConvertation(event) {
        // Converts Max Memory value from the specified value to the megabytes
        // Converting Value to the Megabytes
        this.MaxMemory = Number(event.value) * 1024
    },
    ProcessMemoryConvertation(event) {
        // Converts Memory value from the specified value to the megabytes
        // Converting value to the Megabytes
        this.Memory = Number(event.value) * 1024
    },

    ProcessStorageConvertation(event) {
        // Converts Storage value from the specified value to the kilabytes
        this.StorageCapacity = Number(event.value) * 1024 * 1024
    },

    ProcessMaxStorageConvertation(event) {
        // Converts Max Storage value from the specified value to the kilabytes
        this.MaxStorageCapacity = Number(event.value) * 1024 * 1024
    },
  }
};

</script>


<style lang="scss">


input#CpuNum {
  background-color: #1e2139;
  color: #fff;
}

input#MaxCpu {
  background-color: #1e2139;
  color: #fff;
}

input#MemoryInMegabytes {
  background-color: #1e2139;
  color: #fff;
}
input#MaxMemory {
  background-color: #1e2139;
  color: #fff;
}

input#StorageCapacity {
  background-color: #1e2139;
  color: #fff;
}
input#MaxStorageCapacity {
  background-color: #1e2139;
  color: #fff;
}


.resourceConfigurationBlock {
  .v-messages__message {
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
    color: red;
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

  .resources-details {
        gap: 16px;
        div {
          flex: 1;
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

  .modalField {
    margin-bottom: 24px;
    margin-left: 15px;
  }
  label {
    font-size: 12px;
    margin-bottom: 6px;
  }
  v-text-field,
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
</style>
