/* eslint-disable no-unused-vars */

var STORAGE_STOCK_PRICE = "" // per Megabyte
var CPU_STOCK_PRICE = "" // per number
var MEMORY_STOCK_PRICE = "" // memory in Megabytes

var CronJob = require("cron");

class VirtualMachineCostCalculator {
  CalculateCurrentTotalCost() {
  }
}


class BillCalculator {
  //
  static CalculateForCpu(StockPrice, UsedCpuNums) {
    // Calculates CPU Cost for the Virtual Machine, Depending on the Stock Price
    return StockPrice * UsedCpuNums
  }
  static CalculateForMemory(StockPrice, UsedMemoryInMegabytes) {
    //  Calculating Memory Cost for the Virtual Machine, Depending on the Stock Price
    return StockPrice * UsedMemoryInMegabytes
  }
  static CalculateForStorage(StockPrice, UsedStorageInMegabytes) {
    // Calculates Storage Cost for the Virtual Machine, Depending on the Stock Price
    // It is going to be a persistent volume and customer will only need to pay for it once,
    // and use it as many as they want
    return StockPrice * UsedStorageInMegabytes
  }
}


class StorageUsageBillCalculator extends BillCalculator{
  // Calculates Cost Usage for the Storage
  constructor(TotalUsage) {
    super();
    this.TotalUsage = TotalUsage
    this.StockPrice = STORAGE_STOCK_PRICE
  }
  static Calculate() {
    return super.CalculateForStorage(this.TotalUsage)
  }
}

class MemoryUsageBillCalculator extends BillCalculator{
  // Calculates Cost Usage for the Memory
  constructor(TotalUsage){
    super();
    this.TotalUsage = TotalUsage
    this.StockPrice = MEMORY_STOCK_PRICE
  }
  static Calculate() {
    return super.CalculateForMemory(this.StockPrice, this.TotalUsage)
  }
}

class CpuUsageBillCalculator extends BillCalculator {
  // Calculates Cost Usage for the CPU
  constructor(TotalUsedNums) {
    super();
    this.TotalUsage = TotalUsedNums
    this.StockPrice = CPU_STOCK_PRICE
  }
  static Calculate() {
    return super.CalculateForCpu(this.StockPrice, this.TotalUsage)
  }
}

class VirtualMachineCostCalculator {

  // Calculates Total Bill for the Virtual Machine Cost Resource Usage

  constructor(CpuNumsUsage, MemoryUsageInMegabytes, StorageUsageInMegabytes) {
    // Initial Cost Parameters, to determine the Total Price
    let CpuCalculator = new CpuUsageBillCalculator(CpuNumsUsage)
    let MemoryCalculator = new MemoryUsageBillCalculator(MemoryUsageInMegabytes)
    let StorageCalculator = new StorageUsageBillCalculator(StorageUsageInMegabytes)
    this.CostCalculators = [CpuCalculator, MemoryCalculator, StorageCalculator]
  }

  CalculateCost = function(VirtualMachineId) {
      // Calculates full Cost for the Virtual Machine For Now
      var TotalBillCheck = {}
      for (let costCalculatorKey in Object.Keys(this.CostCalculators)) {
          TotalBillCheck[costCalculatorKey] = this.CostCalculators[costCalculatorKey].Calculate()
      }
      return TotalBillCheck
   }
}


export {VirtualMachineCostCalculator,
CpuUsageBillCalculator, MemoryUsageBillCalculator,
StorageUsageBillCalculator};
