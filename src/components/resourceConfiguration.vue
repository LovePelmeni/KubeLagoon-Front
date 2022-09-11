<template>
  <div class="resourceConfiguration flex flex-column">
      <h4>Resource Configuration</h4>
      <div class="input flex flex-column">
        <label for="CpuNum">CPU</label>
        <input
        :rules="CpuRules"
        required type="text" id="CpuNum" v-model="CpuNum" />
        <span v-if="errors?.Resources['CpuNum']">{{ errors?.Resources['CpuNum'] }}</span>
      </div>

      <div class="resourceInputField flex flex-column">
        <label for="MaxCpu">Max CPU</label>
        <input
        :rules="MaxCpuRules"
        required type="text" id="MaxCpu" v-model="MaxCpu" />
        <span v-if="errors?.Resources['MaxCpu']">{{ errors?.Resources['MaxCpu'] }}</span>
      </div>

      <div class="resourceInputField flex flex-column">
        <label for="MemoryInMegabytes">Memory</label>
        <input
        :rules="MemoryInMegabytesRules"
        required type="text" id="MemoryInMegabytes" v-model="Memory" />
        <span v-if="errors?.Resources['MemoryInMegabytes']">{{ errors?.Resources['MemoryInMegabytes'] }}</span>
      </div>

      <div class="resources-details flex">

        <div class="resourceInputField flex flex-column">
          <label for="MaxMemory">Max Memory Capacity</label>
          <input
          :rules="MaxMemoryRules"
          required type="text" id="MaxMemory" v-model="MaxMemory" />
          <span v-if="errors?.Resources['MaxMemory']">{{ errors?.Resources['MaxMemory'] }}</span>
        </div>

        <div class="resourceInputField flex flex-column">
          <label for="Storage">Storage</label>
          <input
          :rules="StorageRules"
          required type="text" id="StorageCapacity" v-model="storageCapacity" />
          <span v-if="errors?.Resources['StorageInKB']">{{ errors?.Resources['StorageInKB'] }}</span>
        </div>

        <div class="resourceInputField flex flex-column">
          <label for="Storage">Max Storage Capacity</label>
          <input
          :rules="StorageRules"
          required type="text" id="maxStorageCapacity" v-model="maxStorageCapacity" />
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

</script>
