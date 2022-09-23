class BaseResourceManager {
    constructor() {
        this.VirtualMachineId = VirtualMachineId
    }
    GetResourceUsageInfo() {
        // Base Method, that is used for receiving the Resource Usage within the Specific Virtual Machine Server 
    }
}

class ResourceUsageManager extends BaseResourceManager {

    // Manager Class for getting information about the used resources, so it gives an opportunity 
    // to calculate the cost for the whole usage 

    constructor(VirtualMachineId) {
        this.VirtualMachineId = VirtualMachineId
    }

    GetCpuUsageInfo() {
        // Returns Info about the CPU, Memory and Storage Disk Usage at the Current Time
    }

    GetMemoryUsageInfo() {
        // Returns Info about the Operational Memory Usage at the Current Time
    }
    
    GetStorageUsageInfo() {
        // Returns Info abou the Storage Disk Usage at the Current Time
    }
}