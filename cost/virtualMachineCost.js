/* eslint-disable no-unused-vars */


// THERE YOU CAN DEFINE THE STOCK PRICE FOR ANY RESOURCES OF THE VIRTUAL MACHINE SERVER 
// CPU, MEMORY, STORAGE DISK, RUNTIME USAGE etc... 

var STOCK_STORAGE_PRICE = process.env.STOCK_STORAGE_PRICE || 100
var STOCK_CPU_PRICE = process.env.STOCK_CPU_PRICE || 100
var STOCK_MEMORY_PRICE = process.env.STOCK_MEMORY_PRICE || 100

var STORAGE_STOCK_PRICE = STOCK_STORAGE_PRICE // per Megabyte in dollars
var CPU_STOCK_PRICE = STOCK_CPU_PRICE // per number in dollars
var MEMORY_STOCK_PRICE = STOCK_MEMORY_PRICE // for memory in Megabytes in dollars


class BillCalculator {
  // Default Bill Calculator Class for the Virtual Machine Server Resources 
  CalculateForCpu(StockPrice, UsedCpuNums) {
    // Calculates CPU Cost for the Virtual Machine, Depending on the Stock Price
    return StockPrice * UsedCpuNums
  }
  CalculateForMemory(StockPrice, UsedMemoryInMegabytes) {
    //  Calculating Memory Cost for the Virtual Machine, Depending on the Stock Price
    return StockPrice * UsedMemoryInMegabytes
  }
  CalculateForStorage(StockPrice, UsedStorageInMegabytes) {
    // Calculates Storage Cost for the Virtual Machine, Depending on the Stock Price
    // It is going to be a persistent volume and customer will only need to pay for it once,
    // and use it as many as they want
    return StockPrice * UsedStorageInMegabytes
  }
}


class StorageUsageBillCalculator extends BillCalculator {
  // Calculates Cost Usage for the Storage
  constructor(TotalUsage) {
    super();
    this.TotalUsage = TotalUsage
    this.StockPrice = STORAGE_STOCK_PRICE
  }
  Calculate() {
    return super.CalculateForCpu(this.StockPrice, this.TotalUsage)
  }
}

class MemoryUsageBillCalculator extends BillCalculator{ 
  // Calculates Cost Usage for the Memory
  constructor(TotalUsage){
    super();
    this.TotalUsage = TotalUsage
    this.StockPrice = MEMORY_STOCK_PRICE
  }
  Calculate() {
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
  Calculate() {
    return super.CalculateForCpu(this.StockPrice, this.TotalUsage)
  }
}

class VirtualMachineCostCalculator {

  // Calculates Total Bill for the Virtual Machine Cost Resource Usage

  constructor(CpuNumsUsage, MemoryUsageInMegabytes, StorageUsageInMegabytes) {
    // Initial Cost Parameters, to determine the Total Price
    this.CpuCalculator = new CpuUsageBillCalculator(CpuNumsUsage)
    this.MemoryCalculator = new MemoryUsageBillCalculator(MemoryUsageInMegabytes)
    this.StorageCalculator = new StorageUsageBillCalculator(StorageUsageInMegabytes)
  }
  CalculateCostPerDay() {
      // Calculates full Cost for the Virtual Machine For Now
      var TotalPrice = 0
      TotalPrice += this.CpuCalculator.Calculate()
      TotalPrice += this.MemoryCalculator.Calculate()
      TotalPrice += this.StorageCalculator.Calculate()
      return TotalPrice
   }
   CalculateCostPerMonth() {
     return this.CalculateCostPerDay() * 30
   }
   CalculatePerYear() {
     return this.CalculatePerYear() * 365
   }
}


export {
VirtualMachineCostCalculator,
CpuUsageBillCalculator, MemoryUsageBillCalculator,
StorageUsageBillCalculator,
};

