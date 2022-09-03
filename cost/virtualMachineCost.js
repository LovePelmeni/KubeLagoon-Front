/* eslint-disable no-unused-vars */

var STORAGE_STOCK_PRICE = "" // per Megabyte
var CPU_STOCK_PRICE = "" // per number
var MEMORY_STOCK_PRICE = "" // memory in Megabytes


class BillCalculator {
  //
  static CalculateForCpu(StockPrice, UsedCpuNums) {
    // Calculates CPU Cost for the Virtual Machine, Depending on the Stock Price
  }
  static CalculateForMemory(StockPrice, UsedMemoryInMegabytes) {
    //  Calculating Memory Cost for the Virtual Machine, Depending on the Stock Price
  }
  static CalculateForStorage(StockPrice, UsedStorageInMegabytes) {
    // Calculates Storage Cost for the Virtual Machine, Depending on the Stock Price
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
