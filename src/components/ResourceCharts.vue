<template>

<!-- Resource Chart -->
<div class="py-4 container-fluid">
    
   <div class="mt-4 row" style="justify-content: space-between; display: flex;">

    <div class="mb-4 col-lg-5 mb-lg-0" style="max-width: 100%; overflow: hidden;">
        <div class="card z-index-2">
          <div class="p-3 card-body" style="min-width: 500px; max-width: 100%; overflow: hidden;">

          <gradient-chart
            id="chart-line"
            title="Gradient Line Chart"
            :description='`<i class="fa-solid text-success" :class={
                "fa-arrow-up": Sign === "+",
                "fa-arrow-down": Sign === "-", 
            } ></i>
            <span class="font-weight-bold">${Sign}${AverageComparisationPercentage}%</span> than Yesterday`'

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

    <div class="mb-4 col-lg-5 mb-lg-0" style="   
    margin: 0;
    max-width: 100%; overflow: hidden;">
        <div class="card z-index-2">
          <div class="p-3 card-body" style="min-width: 500px; max-width: 100%; overflow: hidden;">
            <capacity-chart
              id="chart-bar"
              title="Total Resource Usage Per Day (CPU + Memory + Disk)"
              :description="`(<strong>${Sign + String(AverageComparisationPercentage) }%</strong>) of Usage than yesterday`"
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
                datasets: {
                  label: '',
                  data: totalResources, // list of total resource usage during the week
                },
              }"
              :items="[
                {
                  icon: { color: 'primary', component: faMicrochip },
                  label: 'CPU',
                  progress: { content: CurrentCpuCapacity, percentage: CpuCapacityPercentage },
                },
                {
                  icon: { color: 'info', component: faMemory },
                  label: 'RAM',
                  progress: { content: String(CurrentMemoryCapacity) + 'MB', percentage: MemoryCapacityPercentage },
                },
                {
                  icon: { color: 'warning', component: faHardDrive },
                  label: 'Storage',
                  progress: { content: String(CurrentStorageDiskCapacity) + 'GB', percentage: StorageCapacityPercentage },
                },
              ]"
            />
          </div>
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

import { 
    faMicrochip,
    faMemory,
    faHardDrive,
} from "@fortawesome/free-solid-svg-icons"

class CpuMetricsMountManager {
    // Manager, that Manages, Cpu Usage Resource Metrics 
    constructor(self) {
        this.self = self
        this.ResourceManager = new resources.ResourceUsageManager()
    }
    MountCpuMetrics(Metrics) {
        // Mounting CPU Metrics
        let CpuData = this.ResourceManager.GetCpuUsageInfo(Metrics)
        this.self.$data.CpuChartData = CpuData
    }
    GetCurrentCpuCapacity(Metrics) {
        // Returns Current Cpu Capacity for the Virtual Machine Server 
        let MetricsData = this.ResourceManager.GetCpuUsageInfo(Metrics)
        return MetricsData.at(-1)
    }
    GetCpuOverflowPercentage(CurrentUsage, MaxCapacity) {
        // Returns the Overflow Percentage of the CPU, depeding on the Current Usage and Max Capacity Specified 
        return (MaxCapacity / CurrentUsage) * 100
    }
}

class MemoryMetricsMountManager {

    // Manager, that Manages Memory Usage Resource Metrics

    constructor(self) {
        this.ResourceManager = new resources.ResourceUsageManager()
        this.self = self
    }
    MountMemoryMetrics(MemoryMetricsData) {
        // Mounting CPU Metrics
        let MemoryData = this.ResourceManager.GetMemoryUsageInfo(MemoryMetricsData)
        this.self.$data.MemoryChartData = MemoryData
    }
    GetCurrentMemoryCapacity(MemoryMetricsData) {
        // Returns Current Memory Capacity of the Virtual Machine Server
        let MemoryMetrics = this.ResourceManager.GetMemoryUsageInfo(MemoryMetricsData)
        return MemoryMetrics.at(-1)
    }
    GetMemoryOverflowPercentage(CurrentUsage, MaxMemoryCapacity) {
        // Returns Percentage of the RAM Memory Overflow, depending on the Current Usage and Max Capacity Specified 
        return (MaxMemoryCapacity / CurrentUsage) * 100
    }
}

class StorageMetricsMountManager {
    // Manager, that manages Storage Disk Resource Usage Metrics

    constructor(self) {
        // Initialization Parameters
        this.self = self
        this.ResourceManager = new resources.ResourceUsageManager()
    }

    MountStorageMetrics(Metrics) {
        // Mounting Storage Metrics Inside the Chart 
        let StorageData = this.ResourceManager.GetStorageUsageInfo(Metrics) 
        this.self.$data.StorageChartData = StorageData
    }
    GetCurrentStorageDiskCapacity(Metrics) {
        // Returns Current Storage Disk Capacity
        let CurrentStorageDiskUsage = this.ResourceManager.GetStorageUsageInfo(Metrics)
        return CurrentStorageDiskUsage.at(-1)
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
        this.MountResourceUsageMetrics()
        this.MountCurrentResourceCapacities()
        this.MountResourcePercentages()
        this.GetVirtualMachineServer()
        this.GetComparedAveragePercentage()
    },
    data() {
        return {

            // Avarage Usage Percentage 
            AverageComparisationPercentage: null,
            Sign: null, // can be + or - , depeding on the usage between the days

            // Font SVG Files 
        
            faHardDrive: faHardDrive,
            faMemory: faMemory,
            faMicrochip: faMicrochip,

            ResourceMetrics: {},

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
            CurrentStorageDiskCapacity: 30,

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

        MountResourceUsageMetrics() {
            // Mounts the Initial resource Metrics of the Virtual Machine Server 
            let ResourceManager = new resources.ResourceUsageManager()
            let Metrics = ResourceManager.GetResourceMetrics(this.JwtToken, this.VirtualMachineId)
            this.ResourceMetrics = Metrics
        },

        GetComparedAveragePercentage() {
            // Returns the Percentage of the Resource Usage, depending on the previous day

            let TodayTotalUsage = Number(this.totalResources.at(-1))
            let YesterdayTotalUsage = Number(this.totalResources.at(-2))
            let Average = 0
            let Sign = "~"

            // Compares Today's and Yesterday's Total Resource Usage and make an average
            if (TodayTotalUsage > YesterdayTotalUsage) {
                Average = Math.round(TodayTotalUsage - YesterdayTotalUsage)
                Sign = "+"
            }
            if (YesterdayTotalUsage > TodayTotalUsage) {
                Average = Math.round(YesterdayTotalUsage - TodayTotalUsage)
                Sign = "-"
            }
            this.AverageComparisationPercentage = Average
            this.Sign = Sign
        },

        GetVirtualMachineServer() {
            // Gets Info about the Virtual Machine Server 
            let VirtualMachine = this.virtualMachineData.filter((virtualMachine) => {
                return virtualMachine.VirtualMachineId === this.VirtualMachineId
            })
            return VirtualMachine 
        },

        MountCurrentResourceCapacities() {
            // Mounts Current Resource Capacities to the Chart 

        },

        MountResourcePercentages() {
            // Mounts Resource Percentage to the Chart
            let VirtualMachine = this.GetVirtualMachineServer()[0]

            let StorageDiskPercentage = Math.round(this.StorageManager.GetStorageDiskOverflowPercentage(Number(this.CurrentStorageDiskCapacity), Number(VirtualMachine["Capacities"].MaxStorageCapacity)))
            let MemoryPercentage = Math.round(this.MemoryManager.GetMemoryOverflowPercentage(Number(this.CurrentMemoryCapacity), Number(VirtualMachine["Capacities"].MaxMemory)))
            let CpuPercentage = Math.round(this.CpuManager.GetCpuOverflowPercentage(Number(this.CurrentCpuCapacity), Number(VirtualMachine["Capacities"].MaxCpuNum)))

            this.StorageCapacityPercentage = StorageDiskPercentage 
            this.MemoryCapacityPercentage = MemoryPercentage 
            this.CpuCapacityPercentage = CpuPercentage
        },

        MountMetrics() {
            // Mounting the Data inside the Charts
            let Metrics = this.GetResourceUsageMetrics()
            this.StorageManager.MountStorageMetrics(Metrics)
            this.MemoryManager.MountMemoryMetrics(Metrics)
            this.CpuManager.MountCpuMetrics(Metrics)
        }
    }
}; 

</script>


<style lang="scss">


.mb-2 {
    margin-bottom: 0.5rem!important;
}

.d-flex {
    display: flex!important;
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
    overflow: visible;
    box-sizing: content-box;
}

.border-radius-sm {
    border-radius: 0.25rem;
}

.svg-inline--fa.fa-xs {
    vertical-align: 0em;
}
.fa-xs {
    font-size: .75em;
}
.fa-xs {
    font-size: 0.75em;
    line-height: 0.0833333337em;
    vertical-align: 0.125em;
}

.svg-inline--fa {
    display: var(--fa-display, inline-block);
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
}

.bg-gradient-primary {
    background-image: linear-gradient(310deg,#7928ca,#ff0080);
}

.bg-gradient-warning {
    background-image: linear-gradient(310deg,#f53939,#fbcf33);
}

.bg-gradient-info {
    background-image: linear-gradient(310deg,#2152ff,#21d4fd);
}

.border-radius-sm {
    border-radius: 0.25rem;
}

.icon-xxs {
    width: 20px;
    height: 20px;
}
.icon-shape {
    width: 48px;
    height: 48px;
    background-position: 50%;
    border-radius: 0.75rem;
}

.text-center {
    text-align: center!important;
}
.me-2 {
    margin-right: 0.5rem!important;
}
.align-items-center {
    align-items: center!important;
}
.justify-content-center {
    justify-content: center!important;
}
.shadow {
    box-shadow: 0 .25rem .375rem -.0625rem rgba(20,20,20,.12),0 .125rem .25rem -.0625rem rgba(20,20,20,.07)!important;
}
.d-flex {
    display: flex!important;
}

.icon {
    fill: currentColor;
    stroke: none;
}

.icon {
    display: inline-block;
    color: #111;
    height: 2em;
    width: 2em;
}


.font-weight-bolder {
    font-weight: 700!important;
}

.h1, .h2, .h3, .h4 {
    letter-spacing: -.05rem;
}
.h4 {
    font-weight: 600;
}
.h4 {
    font-size: 1.5rem;
    line-height: 1.375;
}


.font-weight-bold {
    font-weight: 600!important;
}

.text-xs {
    font-size: .75rem!important;
}
.text-xs {
    line-height: 1.25;
}
.mb-0 {
    margin-bottom: 0!important;
}
.mt-1 {
    margin-top: 0.25rem!important;
}

.mb-lg-0 {
    margin-bottom: 0!important;
}
.mb-4 {
    margin-bottom: 1.5rem!important;
}
.col-lg-5 {
    flex: 0 0 auto;
}

.progress-bar {
    height: 6px;
    border-radius: 0.25rem;
    margin-top: -2px;
}
.bg-dark {
    background-color: #344767!important;
}

.w-30 {
    width: 30%!important;
}

.progress-bar {
    flex-direction: column;
    justify-content: center;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    background-color: #cb0c9f;
    transition: width .6s ease;
}

.progress, .progress-bar {
    display: flex;
}

.progress {
    overflow: visible;
}

.w-75 {
    width: 75%!important;
    background-color: black;
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
}

progress {
    overflow: visible;
}

.progress, .progress-bar {
    display: flex;
    overflow: hidden;
}
.progress {
    height: 3px;
    font-size: .75rem;
    background-color: #e9ecef;
    border-radius: 0.5rem;
}

text-sm {
    font-size: .875rem!important;
}

.ps-0 {
    padding-left: 0!important;
}

.py-3 {
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
}
.col-3 {
    flex: 0 0 auto;
    width: 25%;
}

.fa-arrow-up:before {
    content: "\f062";
}

.fa-arrow-down:before {
    content: "\f063"
}

*, :after, :before {
    box-sizing: border-box;
}

.border-radius-lg {
    border-radius: 0.75rem;
}

.bg-gradient-dark {
    background-image: linear-gradient(310deg,#141727,#3a416f);
}
.pe-1 {
    padding-right: 0.25rem!important;
}
.py-3 {
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
}
.mb-3 {
    margin-bottom: 1rem!important;
}

.mb-0 {
    margin-bottom: 0!important;
}
.mt-4 {
    margin-top: 1.5rem!important;
}
.h4, .h5, .h6, h4, h5, h6 {
    font-weight: 600;
}
.h6, h6 {
    font-size: 1rem;
    line-height: 1.625;
}

.text-sm {
    line-height: 1.5;
}
.ms-2 {
    margin-left: 0.5rem!important;
}
p {
    line-height: 1.625;
    font-weight: 400;
}
.p, p {
    font-size: 1rem;
}
.lead, .p, p {
    font-weight: 400;
}
.p, p {
    line-height: 1.6;
}

.ps-0 {
    padding-left: 0!important;
}
.py-3 {
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
}
.col-3 {
    flex: 0 0 auto;
    width: 25%;
}

card .card-header {
    padding: 1.5rem;
}

.card-header:first-child {
    border-radius: 1rem 1rem 0 0;
}

.card-header {
    padding: 0.5rem 1rem;
    margin-bottom: 0;
    background-color: #1e2238;;
    border-bottom: 0 solid rgba(0,0,0,.125);
}

body {
    font-weight: 400;
    line-height: 1.6;
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
.row>* {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    // display: flex;

    justify-content: space-between;
    
    flex-wrap: wrap;
    margin-top: calc(var(--bs-gutter-y)*-1);
    margin-right: calc(var(--bs-gutter-x)*-0.5);
    margin-left: calc(var(--bs-gutter-x)*-0.5);
    padding-top: calc(var(--bs-gutter-x)*0.5);
    padding-right: calc(var(--bs-gutter-x)*0.5);
    padding-left: calc(var(--bs-gutter-x)*0.5);
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

h4 {
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
</style>
