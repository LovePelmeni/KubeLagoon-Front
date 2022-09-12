<template>

      <h1>Resource Configuration</h1>

      <div class="modalField flex flex-column">
        <label for="CpuNum">CPU</label>
        <input
        @change="ValidateCpuResources"
        :rules="CpuRules"
        required type="text" id="CpuNum" v-model="CpuNum" />
        <span v-if="errors?.Resources['CpuNum']">{{ errors?.Resources['CpuNum'] }}</span>
      </div>

      <div class="modalField flex flex-column">
        <label for="MaxCpu">Max CPU</label>

        <input
        @change="ValidateMaxCpuResources"
        :rules="MaxCpuRules"
        required type="text" id="MaxCpu" v-model="MaxCpu" />
        <span v-if="errors?.Resources['MaxCpu']">{{ errors?.Resources['MaxCpu'] }}</span>
      </div>

      <div class="modalField flex flex-column">
        <label for="MemoryInMegabytes">Memory (MB)</label>

        <input
        @change="ValidateMemoryResources"
        :rules="MemoryInMegabytesRules"
        required type="text" id="MemoryInMegabytes" v-model="Memory" />

        <span v-if="errors?.Resources['MemoryInMegabytes']">{{ errors?.Resources['MemoryInMegabytes'] }}</span>
      </div>

      <div class="resources-details flex">

        <div class="modalField flex flex-column">
          <label for="MaxMemory">Max Memory Capacity (MB)</label>
          <input
          @change="ValidateMaxMemoryResources"
          :rules="MaxMemoryRules"
          required type="text" id="MaxMemory" v-model="MaxMemory" />

          <span v-if="errors?.Resources['MaxMemory']">{{ errors?.Resources['MaxMemory'] }}</span>
        </div>

        <div class="modalField flex flex-column">
          <label for="Storage">Storage</label>

          <input
          @change="ValidateStorageResources"
          :rules="StorageRules"
          required type="text" id="StorageCapacity" v-model="storageCapacity" />

          <span v-if="errors?.Resources['StorageInKB']">{{ errors?.Resources['StorageInKB'] }}</span>
        </div>

        <div class="modalField flex flex-column">
          <label for="Storage">Max Storage Capacity (GB)</label>

          <input
          @change="ValidateMaxStorageResources"
          :rules="StorageRules"
          required type="text" id="maxStorageCapacity" v-model="maxStorageCapacity" />
          <span v-if="errors?.Resources['MaxStorageInKB']">{{ errors?.Resources['MaxStorageInKB'] }}</span>
        </div>

      </div>

</template>

<script>

export default {

  name: "resourceConfiguration",
  data() {
    return {

      // Error Context
      errors: {
        Resources: {},
      },

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
  methods: {

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
        this.storageCapacity = Number(event.value) * 1024 * 1024
    },

    ProcessMaxStorageConvertation(event) {
        // Converts Max Storage value from the specified value to the kilabytes
        this.maxStorageCapacity = Number(event.value) * 1024 * 1024
    },

    ValidateCpuResources(CpuUsage) {
        // Validates Resources, Selected by the Customer

        if (String(CpuUsage).length == 0) {
          this.errors["Resources"]["CpuUsage"] = "This field is required"
        }
        if (!CpuUsage.TypeOf() == Number) {
          this.errors["Resources"]["CpuUsage"] = "Invalid Value for CPU"
        }
    },
    ValidateMaxCpuResources(MaxCpuUsage) {
      // Validates Value for Max CPU Usage 
      this.MaxCpu = MaxCpuUsage
    },

    ValidateMemoryResources(MemoryUsage) {
      // Validates Operational Memory Configuration Resources

      if (String(MemoryUsage.value).length == 0) {
        this.errors["Resources"]["MemoryUsage"] = "This field is required"
      }
      if (Number(MemoryUsage.value) == null) {
        this.errors["Resources"]["MemoryUsage"] = "Invalid Value for Memory"
      }
    },
    ValidateMaxMemoryResources(MaxMemory) {
      // Validates Max Memory Usage Value, specified by Customer
      if (String(MaxMemory.value).length == 0) {
        this.errors["Resources"]["MaxMemory"] = "This field is required"
      }
      if (Number(MaxMemory.value) == null) {
        this.errors["Resources"]["MaxMemory"] = "Invalid Value for Max Memory"
      }
    },
    ValidateStorageResources(Storage) {
      // Validates Value for the Storage Capacity, Specified by the Client
      if (String(Storage.value).length == 0) {
        this.errors["Resources"]["Storage"] = "This field is required"
      }
      if (Number(Storage.value) == null) {
        this.errors["Resources"]["Storage"] = "Invalid Value for Storage"
      }
    },
     ValidateMaxStorageResources(Storage) {
      // Validates Max Storage Capacity Value 
      if (String(Storage.value).length == 0) {
        this.errors["Resources"]["Storage"] = "This field is required"
      }
      if (Number(Storage.value) == null) {
        this.errors["Resources"]["Storage"] = "Invalid Value for Storage"
      }
     }
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
input#maxStorageCapacity {
  background-color: #1e2139;
  color: #fff;
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
