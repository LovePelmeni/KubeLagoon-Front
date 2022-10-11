<template>
    <div class="billingContainer">
        <h4 class="section-title_title__VEDfK" style="color: #fff; margin-top: 30px;">Our Billing Plan for Machine Resources</h4>
        <p class="geist-text p">As a guidline, we provide the cost in United States Dollars per Action, available in our Resource List. <br> You don't need to pay for the things you don't use, payment will be required, once resources will be necessary to perform the action.</p>
        <div class="billingContainerTableInfo" style="margin-top: 100px;">
        <table class="jsx-ee4d328d693e50e9 table" style="
        min-width: 800px; !important;
        border-collapse: separate; !important;
        border-spacing: 0; !important;
        ">
            <thead>
                <tr aria-roledescription="row" class="row" style="margin-left: 100px;">
                    <th class="head-cell"><div style="color: white; font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 1000;"></div></th>
                    <th class="head-cell"><div style="color: white; font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 1000;">Stock Price</div></th>
                    <th class="head-cell"><div style="color: white; font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 1000;">Day</div></th>
                    <th class="head-cell" style="border-right: 1px solid #eaeaea; border-radius: 0px 4px 4px 0px; font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 1000;"><div style="color: white;">Month</div>
                    </th>
                </tr>
            </thead>
            <tbody class="jsx-64c13424ca1bc52" style="background-color: #1e2139; border-radius: 8px 8px 8px 8px;">
                <tr aria-roledescription="row" class="row">
                <td class="table-cell"><div style="color: white;">CPU Per Number</div></td>
                <td class="table-cell"><div style="color: white;">{{ cpuStockPrice }}$ / per unit</div></td>
                <td class="table-cell"><div style="color: white;">{{ cpuPerDay }}$ / per day</div></td>
                <td class="table-cell"><div style="color: white;">{{ cpuPerMonth }}$ / per month</div></td>
                </tr>

                <tr aria-roledescription="row" class="row">
                <td class="table-cell"><div style="color: white;">RAM Memory (1GB)</div></td>
                <td class="table-cell"><div style="color: white;">{{ memoryStockPrice }}$ / per unit</div></td>
                <td class="table-cell"><div style="color: white;">{{ memoryPerDay}}$ / per day</div></td>
                <td class="table-cell"><div style="color: white;">{{ memoryPerMonth }}$ / per month</div></td>
                </tr>
                
                <tr aria-roledescription="row" class="row"><td class="table-cell">
                    <div style="color: white;">Storage Per 1GB</div></td>
                    <td class="table-cell"><div style="color: white;">{{ storageStockPrice }}$ / per unit</div></td>
                    <td class="table-cell"><div style="color: white;">{{ storagePerDay }}$ / per day</div></td>
                    <td class="table-cell"><div style="color: white;">{{ storagePerMonth }}$ / per month</div></td>
                </tr>
            </tbody>

        </table>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import * as bill from "../../cost/virtualMachineCost.js"


export default {
    name: "BillPage",
    data() {
        return {
            authenticated: false,
            // Stock Prices 
            cpuStockPrice: bill.CPU_STOCK_PRICE, 
            memoryStockPrice: bill.MEMORY_STOCK_PRICE, 
            storageStockPrice: bill.STORAGE_STOCK_PRICE, 

            // CPU Resource Billing Plan Info
            cpuPerMonth: 0,
            cpuPerDay: 0,

            // Memory Resource Billing Plan Info
            memoryPerDay: 0, 
            memoryPerMonth: 0,

            // Storage Resource Billing Info 
            storagePerDay: 0,
            storagePerMonth: 0
        }
    },
    mounted() {
        // Calculating Billing Plan for the Resources, within period of Month
        this.CalculateCpuPerMonth()
        this.CalculateMemoryPerMonth()
        this.CalculateStoragePerMonth()

        // Calculating Billing Plan for the Resources, within period of Day
        this.CalculateCpuPerDay()
        this.CalculateMemoryPerDay()
        this.CalculateStoragePerDay()
    },
    methods: {
        CalculateCpuPerMonth() {
            // Calculates the Storage Usage Per Month within the Stock Price 
            this.cpuPerMonth = Math.round(bill.CPU_STOCK_PRICE * 1 * 24 * 30)
        },
        CalculateMemoryPerMonth() {
            // Calculates the Storage Usage Per Month within the Stock Price 
            this.memoryPerMonth = Math.round(bill.MEMORY_STOCK_PRICE * 1 * 24 * 30)
        },
        CalculateStoragePerMonth() {
            // Calculates the Storage Usage Per Month within the Stock Price 
            this.storagePerMonth = Math.round(bill.STORAGE_STOCK_PRICE * 1 * 24 * 30)
        },
        CalculateCpuPerDay() {
            // Calculates the Storage Usage Per Day within the Stock Price 
            this.cpuPerDay = Math.round(bill.CPU_STOCK_PRICE * 1 * 24)

        },
        CalculateMemoryPerDay() {
            // Calculates the Storage Usage Per Day within the Stock Price 
            this.memoryPerDay = Math.round(bill.MEMORY_STOCK_PRICE * 1 * 24)
        },
        CalculateStoragePerDay() {
            // Calculates the Storage Usage Per Day within the Stock Price 
            this.storagePerDay = Math.round(bill.STORAGE_STOCK_PRICE * 1 * 24)
        },
    },
    computed: {
        ...mapState([
            "authenticated"
        ])
    }
}
</script>

<style lang="scss">

.billingContainerTableInfo {
    margin-left: 15% !important;
    margin-right: 15% !important;
}

.application__wrap {
    min-height: 0vh;
}

table.jsx-ee4d328d693e50e9 {
    min-width: 640px;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
}

table {
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: grey;
}

table.jsx-ee4d328d693e50e9 td>div {
    min-height: 50px;
    padding: 12px 0;
    line-height: 24px;
    color: white;
    font-family: Poppins, sans-serif;
    font-size: 1rem;
    font-weight: 1000;
}

table.jsx-ee4d328d693e50e9 thead th:nth-child(1) {
    border-bottom: 1px solid #eaeaea;
    border-left: 1px solid #fafafa;
    -webkit-border-radius: 4px 0px 0px 4px;
    -moz-border-radius: 4px 0px 0px 4px;
    border-radius: 4px 0px 0px 4px;
    border-top: 1px solid #fafafa;
}

table.jsx-ee4d328d693e50e9 thead th {
    background: #1e2139;
    border-bottom: 1px solid #eaeaea;
    border-top: 1px solid #eaeaea;
}
table.jsx-ee4d328d693e50e9 th {
    color: var(--accents-5);
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
    font-weight: 400;
    letter-spacing: 0;
}
table.jsx-ee4d328d693e50e9 th, table.jsx-ee4d328d693e50e9 td {
    padding: 0 10px;
    text-align: left;
    vertical-align: top;
}

th {
    display: table-cell;
    vertical-align: inherit;
    font-weight: bold;
    text-align: -internal-center;
}

table.jsx-ee4d328d693e50e9 th>div {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 10px 0;
    line-height: var(--line-height-small);
    font-size: var(--font-size-small);
}

.geist-text.p {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;
}

</style>
