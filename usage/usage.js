import * as metrics_rest from "../rest/metrics.js"


// schema = {

//     "metrics": {

//         "CpuMetrics": [],

//         "MemoryMetrics": [],

//         "StorageMetrics": [],

//     }

// }

class WeekResourceUsageManager {

    // Manages the Virtual Machine Server Metrics within the Week
    // so customer can get better view of the Resource Management of the Virtual Server 

    GetWeekResourceUsageMetrics(JwtToken, VirtualMachineId) {
        // Returns General Virtual Server Metrics made within the Week 
        let WeeklyMetrics, ResourceError = metrics_rest.GetVirtualMachineWeekResourceMetricsRestController(JwtToken, VirtualMachineId)
        if (ResourceError != null) {console.log(ResourceError)}
        return WeeklyMetrics
    }

    GetWeekStorageDiskUsageInfo(MetricsObj) {
        // Returns Storage Disk Metrics, made within the Week
        let Metrics = MetricsObj || {}
        let MetricsArray = new Array(Metrics.StorageMetrics) // Array 
        return MetricsArray
    }

    GetWeekCpuUsageInfo(MetricsObj) {
        // Returns Cpu Usage Metrics, made within the Week
        let Metrics = MetricsObj || {}
        let MetricsArray = new Array(Metrics.MemoryMetrics) 
        return MetricsArray
    }

    GetWeekMemoryUsageInfo(MetricsObj) {
        // Returns Memory Usage Metrics, made within the Week
        let Metrics = MetricsObj || {}
        let MetricsArray = new Array(Metrics.CpuMetrics)
        return MetricsArray
    }

}


class ResourceUsageManager {

    // Manager Class for getting information about the used resources, so it gives an opportunity 
    // to calculate the cost for the whole usage 
 
    GetResourceMetrics(JwtToken, VirtualMachineId) {
        // Returns Object full of Virtual Server Resource Usage Metrics (Storage Disk Usage, RAM, Cpu) for the Current Time
        // let ResourceMetrics, ResourceError = metrics_rest.GetVirtualMachineResourceMetricsRestController(JwtToken, VirtualMachineId)
        // if (ResourceError != null) {console.log(ResourceError)}
        console.log(JwtToken, VirtualMachineId)
        return {
            "CpuMetrics": [20, 24, 30, 37, 100, 99],
            "MemoryMetrics": [23, 75, 83, 99, 100, 100],
            "StorageMetrics": [23, 75, 83, 99, 100, 100],
        }
    }

    GetCpuUsageInfo(MetricsObj) {
        // Returns Info about the CPU, Memory and Storage Disk Usage at the Current Time
        let Metrics = MetricsObj || {}
        let NewMetric = Metrics.CpuMetrics // array of the CPU Usage Metrics 
        return NewMetric
    }

    GetMemoryUsageInfo(MetricsObj) {
        // Returns Info about the Operational Memory Usage at the Current Time
        let Metrics = MetricsObj || {}
        let NewMetric = Metrics.MemoryMetrics
        return NewMetric
    }
    
    GetStorageUsageInfo(MetricsObj) {
        // Returns Info abou the Storage Disk Usage at the Current Time
        let Metrics = MetricsObj || {}
        let NewMetric = Metrics.StorageMetrics // pattern { 'value': "some-number"}
        return NewMetric
    }
}

export {ResourceUsageManager, WeekResourceUsageManager}
