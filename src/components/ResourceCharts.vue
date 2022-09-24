<template>

      <!-- Resource Chart -->
<div class="py-4 container" style="justify-content: space-between; flex-direction: row; display: flex;">
    
   <div class="mt-4 row">

      <div class="mb-3=4 col-lg-5 mb-lg-0">

        <div class="card z-index-2">
          <div class="p-3 card-body">

          <gradient-chart
            id="chart-line"
            title="Gradient Line Chart"
            description="<i class='fa fa-arrow-up text-success'></i>
            <span class='font-weight-bold'>4% more</span> in 2021"
            :chart="{
              labels: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thirsday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              datasets: [
                {
                  label: 'CPU',
                  data: CpuChartData,
                },
                {
                  label: 'RAM Memory',
                  data: MemoryChartData,
                },
              ],
            }"
          />
            </div>
          </div>
      </div>
      
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <capacity-chart
              id="chart-bar"
              title="Total Resource Usage Per Day (CPU + Memory + Disk)"
              description="(<strong>+23%</strong>) than last week"
              :chart="{
                labels: [
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                datasets: {
                  label: '',
                  data: totalResources, // list of total resource usage during the week
                },
              }"
              :items="[
                {
                  icon: { color: 'primary', component: faUsers },
                  label: 'CPU',
                  progress: { content: CurrentCpuCapacity, percentage: CpuCapacityPercentage },
                },
                {
                  icon: { color: 'info', component: faHandPointer },
                  label: 'RAM Memory',
                  progress: { content: CurrentMemoryCapacity, percentage: MemoryCapacityPercentage },
                },
                {
                  icon: { color: 'warning', component: faCreditCard },
                  label: 'Storage Disk',
                  progress: { content: CurrentStorageDiskCapacity, percentage: StorageCapacityPercentage },
                },
              ]"
            />
          </div>
        </div>
      </div> 
   </div>

</template>

<script>


/* eslint-disable no-extra-semi */

import * as resources from "../../usage/usage.js"
import GradientChart from "../components/charts/gradientChart.vue"
import CapacityChart from "../components/charts/capacityChart.vue"
import { mapState } from "vuex";

import {faUsers, faCreditCard, faHandPointer} from "@fortawesome/free-solid-svg-icons"


class CpuMetricsMountManager {
    // Manager, that Manages, Cpu Usage Resource Metrics 
    constructor(self) {
        this.self = self
    }
    MountCpuMetrics() {
        // Mounting CPU Metrics
        let CpuData = this.GetCpuUsageMetrics()
        this.self.$data.CpuChartData = CpuData.Metrics
    }
    GetCpuUsageMetrics() {
            // Returns CPU Usage Metrics Data 
        let VirtualMachineId = this.self.VirtualMachineId 
        let ResourceManager = new resources.ResourceUsageManager()
        let data = ResourceManager.GetCpuUsageInfo(this.self.JwtToken, VirtualMachineId) 
        console.log(data)
        return data
    }
    GetCurrentCpuCapacity(JwtToken, VirtualMachineId) {
        // Returns Current Cpu Capacity for the Virtual Machine Server 
        console.log(JwtToken, VirtualMachineId)
        return 5
    }
    GetCpuOverflowPercentage(CurrentUsage, MaxCapacity) {
        // Returns the Overflow Percentage of the CPU, depeding on the Current Usage and Max Capacity Specified 
        return (MaxCapacity / CurrentUsage) * 100
    }
}

class MemoryMetricsMountManager {
    // Manager, that Manages Memory Usage Resource Metrics 
    constructor(self) {
        this.self = self
    }
    MountMemoryMetrics() {
        // Mounting CPU Metrics
        let MemoryData = this.GetMemoryUsageMetrics()
        this.self.$data.MemoryChartData = MemoryData.Metrics
    }
    GetMemoryUsageMetrics() {
        // Returns CPU Usage Metrics Data 
        let VirtualMachineId = this.self.VirtualMachineId 
        let ResourceManager = new resources.ResourceUsageManager()
        let data  = ResourceManager.GetMemoryUsageInfo(this.self.JwtToken, VirtualMachineId) 
        return data
    }
    GetCurrentMemoryCapacity(JwtToken, VirtualMachineId) {
        // Returns Current Memory Capacity of the Virtual Machine Server
        console.log(JwtToken, VirtualMachineId) 
        return 100
    }
    GetMemoryOverflowPercentage(CurrentUsage, MaxMemoryCapacity) {
        // Returns Percentage of the RAM Memory Overflow, depending on the Current Usage and Max Capacity Specified 
        return (MaxMemoryCapacity / CurrentUsage) * 100
    }
}

class StorageMetricsMountManager {
    // Manager, that manages Storage Disk Resource Usage Metrics

    constructor(self) {
        this.self = self
    }

    MountStorageMetrics() {
        // Mounting Storage Metrics Inside the Chart 
        let StorageData = this.GetStorageUsageMetrics()
        this.self.$data.StorageChartData = StorageData.Metrics
    }

    GetStorageUsageMetrics() {
        // Returns Storage Usage Metrics Data 
        let VirtualMachineId = this.self.VirtualMachineId 
        let ResourceManager = new resources.ResourceUsageManager()
        let data  = ResourceManager.GetStorageUsageInfo(this.self.JwtToken, VirtualMachineId) 
        return data
    }
    GetCurrentStorageDiskCapacity(JwtToken, VirtualMachineId) {
        // Returns Current Storage Disk Capacity
        console.log(JwtToken, VirtualMachineId)
        return 150
    }
    GetStorageDiskOverflowPercentage(CurrentUsageDisk, MaxDiskCapacity) {
        // Returns the Percentage of the Storage Disk, Depending on the Current Usage
        return (MaxDiskCapacity / CurrentUsageDisk) * 100
    }
}

export default {
    // Component, Responsible for Showing up the Usage Metrics of the Disk Storage for the Virtual Machine Server
    name: "ChartPage",
    props: ["VirtualMachineId"],
    components: {
        GradientChart,
        CapacityChart,
    },
    mounted() {
        this.MountCurrentResourceCapacities()
        this.MountResourcePercentages()
        this.GetVirtualMachineServer()
    },
    data() {
        return {
            // Font SVG Files 

            faUsers: faUsers,
            faHandPointer: faHandPointer,
            faCreditCard: faCreditCard,

            // Resource Usage Chart Data 
            totalResources: [100, 200, 250, 100, 10, 130, 120, 110, 100], // total Resource Usage summary within the Week 
            CpuChartData: [100, 200, 300, 200, 100, 35, 36, 80, 79, 100],  // CPU Usage within the Week
            MemoryChartData: [50, 103, 235, 13, 100, 34, 21, 89, 93], // Memory Usage within the Week
      
            // Capacity Percentage %
            StorageCapacityPercentage: 0, 
            MemoryCapacityPercentage: 0,
            CpuCapacityPercentage: 0,

            // Current Resource Capacities
            CurrentMemoryCapacity: 10,
            CurrentCpuCapacity: 15,
            CurrentStorageCapacity: 30,

            VirtualMachine: {},

            // API Managers
            StorageManager: new StorageMetricsMountManager(this),
            MemoryManager: new MemoryMetricsMountManager(this),
            CpuManager: new CpuMetricsMountManager(this),

        }
    },
    computed: {
        ...mapState(["virtualMachineData"]),
    },
    methods: {

        GetVirtualMachineServer() {
            // Gets Info about the Virtual Machine Server 
            let VirtualMachine = this.virtualMachineData.filter((virtualMachine) => {
                return virtualMachine.VirtualMachineId === this.VirtualMachineId
            })
            this.VirtualMachine = VirtualMachine
        },

        MountCurrentResourceCapacities() {
            // Mounts Current Resource Capacities to the Chart 
        },

        MountResourcePercentages() {
            // Mounts Resource Percentage to the Chart

            let StorageDiskPercentage = this.StorageManager.GetStorageDiskOverflowPercentage(this.CurrentStorageCapacity, this.VirtualMachine.MaxStorageCapacity)
            let MemoryPercentage = this.MemoryManager.GetMemoryOverflowPercentage(this.CurrentMemoryCapacity, this.VirtualMachine.MaxMemory)
            let CpuPercentage = this.CpuManager.GetCpuOverflowPercentage(this.CurrentCpuCapacity, this.VirtualMachine.MaxCpu)

            this.StorageCapacityPercentage = StorageDiskPercentage 
            this.MemoryCapacityPercentage = MemoryPercentage 
            this.CpuCapacityPercentage = CpuPercentage
        },

        MountMetrics() {
            // Mounting the Data inside the Charts
            this.StorageManager.MountStorageMetrics()
            this.MemoryManager.MountMemoryMetrics()
            this.CpuManager.MountCpuMetrics()
        }
    }
}; 

</script>


<style lang="scss">

card .card-header {
    padding: 1.5rem;
}

.card-header:first-child {
    border-radius: 1rem 1rem 0 0;
}
.pb-0 {
    padding-bottom: 0!important;
}
.p-3 {
    padding: 1rem!important;
}
.card-header {
    padding: 0.5rem 1rem;
    margin-bottom: 0;
    background-color: #1e2238;;
    border-bottom: 0 solid rgba(0,0,0,.125);
}

.col-lg-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
}

.card .card-body {
    font-family: Open Sans;
    padding: 1.5rem;
}
.p-3 {
    padding: 1rem!important;
}
.card-body {
    flex: 1 1 auto;
    padding: 1rem;
}
html * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
*, :after, :before {
    box-sizing: border-box;
}

div {
    display: block;
}
.card {
    // position: relative;
    display: flex;
    // flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #1e2238;;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: 1rem;
}
.row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(var(--bs-gutter-y)*-1);
    margin-right: calc(var(--bs-gutter-x)*-0.5);
    margin-left: calc(var(--bs-gutter-x)*-0.5);
}
body {
    font-weight: 400;
    line-height: 1.6;
}
body {
    margin: 0;
    font-family: var(--bs-body-font-family);
    font-size: var(--bs-body-font-size);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
    color: var(--bs-body-color);
    text-align: var(--bs-body-text-align);
    background-color: var(--bs-body-bg);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
}
</style>