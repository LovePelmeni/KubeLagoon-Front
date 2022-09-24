class ResourceMetric {
    constructor(MetricInfo) {
        this.MetricInfo = MetricInfo // array of metrics
    }
    ToBlob() {
        // Returns Serialized Version of the JSON Block
        return {"Metrics": this.MetricInfo}
    }
}

class ResourceUsageManager {

    // Manager Class for getting information about the used resources, so it gives an opportunity 
    // to calculate the cost for the whole usage 

    GetCpuUsageInfo(JwtToken, VirtualMachineId) {
        // Returns Info about the CPU, Memory and Storage Disk Usage at the Current Time
        console.log(JwtToken, VirtualMachineId)
        let NewMetric = new ResourceMetric([{"value": "10"}])
        console.log(NewMetric.ToBlob())
        return NewMetric.ToBlob()
    }

    GetMemoryUsageInfo(JwtToken, VirtualMachineId) {
        // Returns Info about the Operational Memory Usage at the Current Time
        console.log(JwtToken, VirtualMachineId)
        let NewMetric = new ResourceMetric([{"value": "1000"}])
        console.log(NewMetric.ToBlob())
        return NewMetric.ToBlob()
    }
    
    GetStorageUsageInfo(JwtToken, VirtualMachineId) {
        // Returns Info abou the Storage Disk Usage at the Current Time
        console.log(JwtToken, VirtualMachineId)
        let NewMetric = new ResourceMetric([{"value": "1000"}])
        console.log(NewMetric.ToBlob())
        return NewMetric.ToBlob()
    }
}

export {ResourceUsageManager}
