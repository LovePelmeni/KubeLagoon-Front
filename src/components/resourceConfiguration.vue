<template>
  <div class="resourceConfiguration flex flex-column">
      <h4>Resource Configuration</h4>

      <div class="input flex flex-column">
        <label for="CpuNum">CPU</label>
        <input
        @change="ValidateCpuResources"
        :rules="CpuRules"
        required type="text" id="CpuNum" v-model="CpuNum" />
        <span v-if="errors?.Resources['CpuNum']">{{ errors?.Resources['CpuNum'] }}</span>
      </div>

      <div class="input flex flex-column">
        <label for="MaxCpu">Max CPU</label>

        <input
        @change="ValidateMaxCpuResources"
        :rules="MaxCpuRules"
        required type="text" id="MaxCpu" v-model="MaxCpu" />
        <span v-if="errors?.Resources['MaxCpu']">{{ errors?.Resources['MaxCpu'] }}</span>
      </div>

      <div class="input flex flex-column">
        <label for="MemoryInMegabytes">Memory</label>

        <input
        @change="ValidateMemoryResources"
        :rules="MemoryInMegabytesRules"
        required type="text" id="MemoryInMegabytes" v-model="Memory" />

        <select  @change="ProcessMemoryConvertation" type="text" id="paymentTerms" v-model="paymentTerms">
          <option value="GB">GB</option>
          <option value="MB">MB</option>
          <option value="KB">KB</option>
        </select>

        <span v-if="errors?.Resources['MemoryInMegabytes']">{{ errors?.Resources['MemoryInMegabytes'] }}</span>
      </div>

      <div class="resources-details flex">

        <div class="input flex flex-column">
          <label for="MaxMemory">Max Memory Capacity</label>

          <input
          @change="ValidateMaxMemoryResources"
          :rules="MaxMemoryRules"
          required type="text" id="MaxMemory" v-model="MaxMemory" />

          <select  @change="ProcessMaxMemoryConvertation" type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="GB">GB</option>
            <option value="MB">MB</option>
            <option value="KB">KB</option>
          </select>

          <span v-if="errors?.Resources['MaxMemory']">{{ errors?.Resources['MaxMemory'] }}</span>
        </div>

        <div class="input flex flex-column">
          <label for="Storage">Storage</label>

          <input
          @change="ValidateStorageResources"
          :rules="StorageRules"
          required type="text" id="StorageCapacity" v-model="storageCapacity" />

          <select  @change="ProcessStorageConvertation" type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="GB">GB</option>
            <option value="MB">MB</option>
            <option value="KB">KB</option>
          </select>

          <span v-if="errors?.Resources['StorageInKB']">{{ errors?.Resources['StorageInKB'] }}</span>
        </div>

        <div class="input flex flex-column">
          <label for="Storage">Max Storage Capacity</label>

          <input
          @change="ValidateMaxStorageResources"
          :rules="StorageRules"
          required type="text" id="maxStorageCapacity" v-model="maxStorageCapacity" />

          <select  @change="ProcessMaxStorageConvertation" type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="GB">GB</option>
            <option value="MB">MB</option>
            <option value="KB">KB</option>
          </select>

          <span v-if="errors?.Resources['MaxStorageInKB']">{{ errors?.Resources['MaxStorageInKB'] }}</span>
        </div>

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

    ProcessMaxMemoryConvertation() {
        // Converts Max Memory value from the specified value to the megabytes
    },
    ProcessMemoryConvertation() {
        // Converts Memory value from the specified value to the megabytes
    },

    ProcessStorageConvertation() {
        // Converts Storage value from the specified value to the kilabytes
    },
    ProcessMaxStorageConvertation() {
        // Converts Max Storage value from the specified value to the kilabytes
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
    },

    ValidateMemoryResources(MemoryUsage) {
      // Validates Operational Memory Configuration Resources

      if (String(MemoryUsage.value).length == 0) {
        this.errors["Resources"]["MemoryUsage"] = "This field is required"
      }
      if (Number(MemoryUsage.value == null) {
        this.errors["Resources"]["CpuUsage"] = "Invalid Value for Memory"
      }
    },
    ValidateMaxMemoryResources(MaxMemory) {
      // Validates Max Memory Usage Value, specified by Customer
    },
    ValidateStorageResources(Storage) {
      // Validates Value for the Storage Capacity, Specified by the Client
    }
  }
};

</script>


<style lang="scss">

    .resourceConfiguration {
      margin-bottom: 48px;
      h4 {
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
      .resources-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
      .input {
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