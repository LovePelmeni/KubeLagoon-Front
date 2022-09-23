<template>
    <div class="charts-block"> 
  
    <!-- Chart Metrics for the CPU Usage -->

    <fusioncharts
    :type="CpuType"
    :width="width"
    :height="height"
    :dataFormat="dataFormat"
    :dataSource="dataSource"
    ></fusioncharts>

    <!-- Chart Metrics for the Operational Memory Usage -->

    <fusioncharts
    :type="MemoryType"
    :width="MemoryWidth"
    :height="MemoryHeight"
    :dataFormat="MemoryDataFormat"
    :dataSource="MemoryDataSource"
    ></fusioncharts>

    <!-- Chart Metrics for the Storage Disk Usage -->

    <fusioncharts   
    :type="StorageType"
    :width="StorageWidth"
    :height="StorageHeight"
    :dataFormat="StorageDataFormat"
    :dataSource="StorageDataSource"
    ></fusioncharts>

    </div>
</template>

<script>
import * as resources from "../../usage/usage.vue"

import FusionCharts from 'fusioncharts';

export const ResourceCpuChart = {
    name: "ResourceCpuChart",
    data() {
        return {
            CpuSchema: [], // Data Schema of the CPU Usage Metrics 
            CpuWidth: "30%",
            CpuHeight: "200",

            CpuType: "timeseries",
            CpuDataFormat: "json",

            CpuDataSource: {
                caption: { text: "Online Sales of a SuperStore in the US" },
                data: null,
                chart: {
                showLegend: 0
                },
                caption: {
                text: 'Daily Visitors Count of a Website'
                },
                yAxis: [
                {
                    plot: {
                    value: 'Daily Visitors',
                    type: 'area'
                    },
                    title: 'Daily Visitors (in thousand)'
                }
                ]
            }
        }
    },
    methods: {
        MountMemoryMetrics() {
        // Mounts the Memory Metrics inside the Charts 
        let data, error = this.GetCpuUsageMetrics()
        const fusionTable = new FusionCharts.DataStore().createDataTable(data, this.CpuSchema);
        this.dataSource.data = fusionTable;
        }, 
        GetCpuUsageMetrics() {
            // Returns the Metrics for the CPU for the Virtual Machine Server 
            let VirtualMachineId = this.$route.params.VirtualMachineId
            let ResourceManager = new resources.ResourceUsageManager()
            let data, dataError = ResourceManager.GetCpuUsageMetrics(this.JwtToken, VirtualMachineId)
            return data, dataError
        }
    }, 
    mounted() {
        this.MountMemoryMetrics()
    },
};


// Component, that Shows up the Chart Usage Metrics for the Operational Memory of the Virtual Machine Server
export const ResourceMemoryChart = {
    
    name: "ResourceMemoryChart",
    data() {
        return { 
            MemorySchema: null, // Data Schema of the Operational Memory Usage Metrics  
            MemoryWidth: "40%",
            MemoryHeight: "200",
            MemoryType: "timeseries",
            MemoryDataFormat: "json",
            MemoryDataSource: {
                caption: { text: "Online Sales of a SuperStore in the US" },
                data: null,
                chart: {
                showLegend: 0
                },
                caption: {
                text: 'Daily Visitors Count of a Website'
                },
                yAxis: [
                {
                    plot: {
                    value: 'Daily Visitors',
                    type: 'area'
                    },
                    title: 'CPU Usage'
                }
                ]
            }
        }
    },
    mounted() {
        this.MountCpuMetrics()
    },
    methods: { 
        MountCpuMetrics() {
            // Mounts Metrics Data Inside the Charts
            let data, error = this.GetMemoryResourceUsageMetrics()
            const fusionTable = new FusionCharts.DataStore().createDataTable(data, this.MemorySchema);
            this.dataSource.data = fusionTable;
        },
        GetMemoryResourceUsageMetrics() {
            // Returns Info about the Operational Memory Usage for the Virtual Machine Server 
            let VirtualMachineId = this.$route.params.VirtualMachineId 
            let ResourceManager = new resources.ResourceUsageManager()
            let data, dataError = ResourceManager.GetMemoryResourceUsageMetrics(this.JwtToken, VirtualMachineId)
            return data, dataError
        }
    },
};


export const ResourceStorageChart = {
    // Component, Responsible for Showing up the Usage Metrics of the Disk Storage for the Virtual Machine Server
    name: "ResourceStorageChart",
    data: {
      StorageDataSchema: [], // Data Schema of the Storage Disk Metrics 
      StorageWidth: "40%",
      StorageHeight: "200",
      StorageType: "timeseries",
      StorageDataFormat: "json",
      StorageDataSource: {
        caption: { text: "Storage Disk Usage during last week" },
        data: null,
        chart: {
          showLegend: 0
        },
        caption: {
          text: 'Daily Storage Disk Usage'
        },
        yAxis: [
          {
            plot: {
              value: 'Daily Visitors',
              type: 'area'
            },
            title: 'Storage Disk Usage'
          }
        ]
      }
    },
    methods: {
        MountStorageUsageMetrics() {
            // Mount Storage Usage Metrics inside the Chart
            let data, error = this.GetStorageUsageMetrics()
            const fusionTable = new FusionCharts.DataStore().createDataTable(data, this.StorageDataSchema);
            this.dataSource.data = fusionTable;
        },
        GetStorageUsageMetrics() {
            // Returns Storage Usage Metrics of the Virtual Machine Server
            let VirtualMachineId = this.$route.params.VirtualMachineId 
            let ResourceManager = new resources.ResourceUsageManager()
            let data, dataError = ResourceManager.GetStorageUsageMetrics(this.JwtToken, VirtualMachineId)
            return data, dataError
        }
    }
};

export default {
    name: "ChartComponent", 
    components: {
        ResourceCpuChart, 
        ResourceMemoryChart, 
        ResourceStorageChart,
    },
    data() {},

}


</script>


<style lang="scss">
    .charts-block {
        // Styles for the Charts block
        justify-content: space-between; 
        align-items: center;
        margin-top: 10px;
        margin-bottom: 20px;
        background-color: rgb(0, 0, 0);
    }
</style>