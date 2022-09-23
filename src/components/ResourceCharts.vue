<template>

    <div class="chartsBlock">

        <div className="column is-half-tablet is-one-third-desktop is-half-fullhd">
            <div className="card">
                <div className="card-content has-chart">
                    <div className="columns is-marginless is-mobile is-desktop has-block-display">
                        <div className="column header is-two-thirds-desktop is-full-tablet is-two-thirds-mobile has-text-left is-bottom-paddingless">CPU</div>
                        <div id="cac-changeper" className="column has-text-right has-text-left-tablet-only has-text-left-desktop-only is-bottom-paddingless"
                        data-up="↑" data-down="↓">...</div>
                    </div>
                <div id="cac-val">...</div>
                </div>
            <div id="cac-chart"></div>
            </div>
        </div>

          <div className="column is-half-tablet is-one-third-desktop is-half-fullhd">
            <div className="card">
                <div className="card-content has-chart">
                    <div className="columns is-marginless is-mobile is-desktop has-block-display">
                        <div className="column header is-two-thirds-desktop is-full-tablet is-two-thirds-mobile has-text-left is-bottom-paddingless">Memory</div>
                        <div id="cac-changeper" className="column has-text-right has-text-left-tablet-only has-text-left-desktop-only is-bottom-paddingless"
                        data-up="↑" data-down="↓">...</div>
                    </div>
                <div id="cac-val">...</div>
                </div>
            <div id="cac-chart"></div>
            </div>
        </div>

          <div className="column is-half-tablet is-one-third-desktop is-half-fullhd">
            <div className="card">
                <div className="card-content has-chart">
                    <div className="columns is-marginless is-mobile is-desktop has-block-display">
                        <div className="column header is-two-thirds-desktop is-full-tablet is-two-thirds-mobile has-text-left is-bottom-paddingless">Storage</div>
                        <div id="cac-changeper" className="column has-text-right has-text-left-tablet-only has-text-left-desktop-only is-bottom-paddingless"
                        data-up="↑" data-down="↓">...</div>
                    </div>
                <div id="cac-val">...</div>
                </div>
            <div id="cac-chart"></div>
            </div>
        </div>

    </div>

</template>

<script>

import * as resources from "../../usage/usage.js"
import * as chartCosmetics from "../components/chartCosmetics.js"

export const StorageResourceUsageChart = {
    name: "StorageResourceUsageChart",
    props: ["VirtualMachineId"],
    data() {
        return {
            type: "mscombi2d",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource: {
                chart: chartCosmetics.currencyChart,
                categories: [{
                    category: []
                }],
                dataset: [
                        {
                        renderAs: "spline",
                        lineThickness: "3",
                        alpha: process.env.CHART_STORAGE_RESOURCE_ALPHA || "10000",
                        data: []
                        },
                        {
                        renderAs: "splinearea",
                        showPlotBorder: "0",
                        plotToolText: " ",
                        data: []
                        }
                    ]
                }
        }
    },
    mounted() {
        this.MountStorageMetrics()
    },
    methods: {
        MountStorageMetrics() {
            // Mounting CPU Metrics
            let StorageData = this.GetStorageUsageMetrics()
            for (let StorageMetric in StorageData.Metrics) {
                this.$data.dataSource.dataset[0].data.push(
                    {
                        "value": StorageMetric["value"], 
                        "alpha": process.env.CHART_RESOURCE_STORAGE_ALPHA || "10000",
                    }
                )
                this.$data.dataSource.dataset[1].data.push(
                    {
                        "value": StorageMetric["value"],
                        "alpha": process.env.CHART_RESOURCE_STORAGE_ALPHA || "10000",
                    }
                )
            }
        },
        GetStorageUsageMetrics() {
            // Returns CPU Usage Metrics Data 

            let VirtualMachineId = this.VirtualMachineId 
            let ResourceManager = new resources.ResourceUsageManager()
            let data  = ResourceManager.GetStorageUsageInfo(this.JwtToken, VirtualMachineId) 
            return data
        },
    }
}


export const MemoryResourceUsageChart = {
    name: "MemoryResourceUsageChart",
    props: ["VirtualMachineId"],
    data() {
        return {
            type: "mscombi2d",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource: {
                chart: chartCosmetics.currencyChart,
                categories: [{
                    category: []
                }],
                dataset: [
                        {
                        renderAs: "spline",
                        lineThickness: "3",
                        alpha: process.env.CHART_MEMORY_RESOURCE_ALPHA || "128",
                        data: []
                        },
                        {
                        renderAs: "splinearea",
                        showPlotBorder: "0",
                        plotToolText: " ",
                        data: []
                        }
                    ]
                }
        }
    },
    mounted() {
        this.MountMemoryMetrics()
    },
    methods: {
        MountMemoryMetrics() {
            // Mounting CPU Metrics
            let MemoryData = this.GetMemoryUsageMetrics()
            for (let MemoryMetric in MemoryData.Metrics) {
                this.$data.dataSource.dataset[0].data.push(
                    {
                        "value": CpuMetric["value"], 
                        "alpha": process.env.CHART_RESOURCE_CPU_ALPHA || "10000",
                    }
                )
                this.$data.dataSource.dataset[1].data.push(
                    {
                        "value": MemoryMetric["value"],
                        "alpha": process.env.CHART_RESOURCE_MEMORY_ALPHA || "10000",
                    }
                )
            }
        },
        GetMemoryUsageMetrics() {
            // Returns CPU Usage Metrics Data 

            let VirtualMachineId = this.VirtualMachineId 
            let ResourceManager = new resources.ResourceUsageManager()
            let data  = ResourceManager.GetMemoryUsageInfo(this.JwtToken, VirtualMachineId) 
            console.log(data)
            return data
        },
    }
}


export const CpuResourceUsageChart = {
    name: "CpuResourceUsageChart",
    props: ["VirtualMachineId"],
    data() {
        return {
            type: "mscombi2d",
            width: "100%",
            height: "100%",
            dataFormat: "json",
            dataSource: {
                chart: chartCosmetics.currenyChart,
                categories: [{
                    category: []
                }],
                dataset: [
                        {
                        renderAs: "spline",
                        lineThickness: "3",
                        alpha: process.env.CHART_CPU_RESOURCE_ALPHA || "128",
                        data: []
                        },
                        {
                        renderAs: "splinearea",
                        showPlotBorder: "0",
                        plotToolText: " ",
                        data: []
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
            // Mounting CPU Metrics
            let CpuData = this.GetCpuUsageMetrics()
            for (let CpuMetric in CpuData.Metrics) {
                this.$data.dataSource.dataset[0].data.push(
                    {
                        "value": CpuMetric["value"], 
                        "alpha": process.env.CHART_RESOURCE_CPU_ALPHA || "128",
                    }
                )
                this.$data.dataSource.dataset[1].data.push(
                    {
                        "value": CpuMetric["value"],
                        "alpha": process.env.CHART_RESOURCE_CPU_ALPHA || "128",
                    }
                )
            }
        },
        GetCpuUsageMetrics() {
            // Returns CPU Usage Metrics Data 

            let VirtualMachineId = this.VirtualMachineId 
            let ResourceManager = new resources.ResourceUsageManager()
            let data  = ResourceManager.GetCpuUsageInfo(this.JwtToken, VirtualMachineId) 
            console.log(data)
            return data
        },
    }
}


export default {
    // Component, Responsible for Showing up the Usage Metrics of the Disk Storage for the Virtual Machine Server
    name: "ChartPage",
    props: ["VirtualMachineId"],
    components: {
        CpuResourceUsageChart, 
        MemoryResourceUsageChart, 
        StorageResourceUsageChart,
    },
    mounted() {
        this.MountUsageMetrics()
    },
    methods: {
        MountUsageMetrics() {
            // Mount Storage Usage Metrics inside the Chart
            this.MountCpuMetrics()
            this.MountMemoryMetrics()
            this.MountStorageMetrics()
        },
    },
}; 
</script>

<style lang="scss">
    .chartsBlock {
        // Styles for the Charts block
        justify-content: space-between; 
        align-items: center;
        margin-top: 10px;
        margin-bottom: 20px;
        background-color: rgb(0, 0, 0);
    }
</style>