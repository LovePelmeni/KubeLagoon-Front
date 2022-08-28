class BaseResource {
  function GetObject() -> String {
    // Returns Part of the Configuration Class "Configuration for the Specific Resource"
  }
}
class BaseConfiguration {
  function GetConfiguration() -> Object {
    // Returns Configuration Object
  }
}

class CpuResources extends BaseResource {
  // Represents Cpu Configuration for the Virtual Machine Server
  constructor(MaxCpuUsage: Int, CpuNum: Int) {
    this.MaxCpuUsage = MaxCpuUsage
    this.CpuNum = CpuNum
  }
  function GetObject() -> Object {
    return {"MaxCpu": this.MaxCpuUsage, "CpuNum": this.CpuNum}
  }
}

class MemoryResources extends BaseResource {
  // Represents Operational Memory Configuration for the Virtual Machine Server
  constructor(MaxMemory: int, Memory: int) {
    this.MaxMemory = MaxMemory
    this.Memory = Memory
  }
  function GetObject() -> Object {
    return {"MaxMemory": this.MaxMemory, "Memory": this.Memory}
  }
}

class DiskResources extends BaseResource {
  // Represents Disk Capacity Configuration for the Virtual Machine Server
  constructor(MemoryInKB: int) {
      this.MemoryInKB = MemoryInKB
  }
  function GetObject() -> Object {
    return {"MemoryInKB": this.MemoryInKB}
  }
}

class HostSystemResources extends BaseResource {
  // Represents Host System Configuration for the Virtual Machine Server
  constructor(SystemName: String, Bit: String) {
    this.SystemName = SystemName  // System Name should include OS Name + Distribution
    this.Bit = Bit // bit version of the OS, like 64 or 32
  }
  function GetObject() -> Object {
    return {"SystemName": this.SystemName, "Bit": this.Bit}
  }
}

class NetworkResources extends BaseResource {
  // Represents Network Configuration for the Virtual Machine Server
  constructor(NetworkIP: String=null, Gateway: String=null, Netmask: String=null) {
    this.NetworkIP = NetworkIP
    this.Gateway = Gateway
    this.Netmask = Netmask
  }
  function GetObject() -> Object {
    return {"NetworkIP": this.NetworkIP,
    "Netmask": this.Netmask, "Gateway": this.Gateway}
  }
}

class PreInstalledToolsResources extends BaseResource {
  // Represents Pre-Installed Tools Configuration for the Virtual Machine Server
  constructor(Tools: List[String]) {
    this.Tools = Tools
  }
  function GetObject() -> Object{
    return {"Tools": this.Tools}
  }
}


class CustomConfiguration extends BaseConfiguration {
  // Class Represents Customized Configuration for the Virtual Machine Server
  // where the Customer can pick up, how much memory and cpu's they want,
  // What OS and Network to pick up etc...
  constructor(
   CpuConfig: CpuResources,
   MemoryConfig: MemoryResources,
   NetworkConfig: NetworkResources,
   HostSystemConfig: HostSystemResources
   PreInstalledToolsConfig: PreInstalledToolsResources,
   DiskConfig: DiskResources,
 ) {
    this.CpuConfig = CpuConfig
    this.MemoryConfig = MemoryConfig
    this.NetworkConfig =  NetworkConfig
    this.HostSystemConfig = HostSystemConfig
    this.DiskConfig = DiskConfig
    // Array of the Configurations
    this.ConfigArray = [this.CpuConfig,
    this.MemoryConfig, this.NetworkConfig,
    this.HostSystemConfig, this.DiskConfig]
  }
  function GetConfiguration() String {
    // Returns Serialized Custom Configuration for the Virtual Machine Server
    var FullCustomConfiguration = {}
    for (Configuration in this.ConfigArray) {
      Object.assign(FullCustomConfiguration, Configuration.GetObject())
    }
    return FullCustomConfiguration
  }
}


class ConfigurationPreparer {
  // Class Returns Serialized Version of the Configurations
  function PrepareCustomConfiguration(Configuration: CustomConfiguration) String {
      // Returns Serialized Customized Configuration
      SerializedConfiguration = JSON.Stringify(Configuration)
      return SerializedConfiguration
  }
  function PrepareHardwareConfiguration(Configuration: HardwareConfiguration) String {
      // Returns Serialized Hardware Configuration
      SerializedConfiguration = JSON.Stringify(Configuration)
      return SerializedConfiguration
  }
}
