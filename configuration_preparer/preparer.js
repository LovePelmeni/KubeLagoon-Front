class BaseResource {
  // Represents Resource (part of the CustomizedConfiguration)
  // * Explanation ---
  // Customized Configuration consists of a bunch of parts such as
  // Configuration for the Network, Configuration for the OS,
  //  Configuration for the Cpu and Memory, etc....
  // So In order to make it as a puzzle and make it easy to serialize the whole CustomizedConfiguration
  // there is class called `Resource`, that basically represents the part of this CustomizedConfiguration
  // it can be: Network Resource, OsResource, etc.....
  function GetObject() -> String {
    // Returns Part of the Configuration Class "Configuration for the Specific Resource"
  }
}

class BaseConfiguration {
  // Represents base Configuration Class, for both `Hardware Configuration` and
  // `Customized Configuration`, defines basic methods to make performance easier
  function GetConfiguration() -> Object {
    // Returns Configuration Object
  }
}


class Metadata extends BaseResource {
  // Part of the `CustomizedConfiguration`.
  // Metadata, about who performs the Request
  // is going to be put inside the Configuration
  // so the backend would recognize what VM Server to apply configuration to
  constructor(VirtualMachineId: String, VmOwnerId: String) {
    this.VirtualMachineId = VirtualMachineId
    this.VmOwnerId = VmOwnerId
  }
  function GetObject() -> Object {
    // Returns Metadata converted into Object
    return {"Metadata": {
    "VirtualMachineId": this.VirtualMachineId,
    "VmOwnerId": this.VmOwnerId}}
  }
}

// Resources goes there

class Resources extends BaseResource {
  // Represents Cpu Configuration for the Virtual Machine Server
  constructor(MaxCpuUsage: Int, CpuNum: Int, MaxMemoryUsage: Int, MemoryInMegabytes: Int) {
    this.MaxCpuUsage = MaxCpuUsage
    this.CpuNum = CpuNum
    this.MaxMemory = MaxMemory
    this.Memory = MinMemory
  }
  function GetObject() -> Object {
    // Returns Resource Part of the CustomizedConfiguration, serialized into Object
    return {
    "Resources": {
        "MaxMemoryUsage": this.MaxMemory,
        "MemoryInMegabytes": this.Memory,
        "CpuNum": this.CpuNum,
        "MaxCpuUsage": this.MaxCpu,
    }}
  }
}

class DiskResources extends BaseResource {
  // Represents Disk Capacity Configuration for the Virtual Machine Server
  constructor(MemoryInKB: int) {
      this.MemoryInKB = MemoryInKB
  }
  function GetObject() -> Object {
    return {"Disk": {"MemoryInKB": this.MemoryInKB}}
  }
}

class HostSystemResources extends BaseResource {
  // Represents Host System Configuration for the Virtual Machine Server
  constructor(SystemName: String, Bit: String) {
    this.SystemName = SystemName  // System Name should include OS Name + Distribution
    this.Bit = Bit // bit version of the OS, like 64 or 32
  }
  function GetObject() -> Object {
    return {"HostSystem": {"SystemName": this.SystemName, "Bit": this.Bit}}
  }
}

class NetworkResources extends BaseResource {
  // Represents Network Configuration for the Virtual Machine Server
  constructor(
  NetworkIP: String=null,
  Hostname: String=null,
  Gateway: String=null,
  Netmask: String=null,
  Enablev4: bool = true,
  Enablev6: bool = true,
  ) {
    this.NetworkIP = NetworkIP
    this.Gateway = Gateway
    this.Netmask = Netmask
    this.Hostname = Hostname
    this.Enablev4 = Enablev4
    this.Enablev6 = Enablev6
  }
  function GetObject() -> Object {
    return {"Network":
        {
          "IP": this.NetworkIP,
          "Netmask": this.Netmask,
          "Gateway": this.Gateway,
          "Hostname": this.Hostname,
          "Enablev4": this.Enablev4,
          "Enablev6": this.Enablev6,
    }}
  }
}

class PreInstalledToolsResources extends BaseResource {
  // Represents Pre-Installed Tools Configuration for the Virtual Machine Server
  constructor(Tools: List[String]) {
    this.Tools = Tools
  }
  function GetObject() -> Object{
    return {"ExtraTools": this.Tools}
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
  constructor(Configuration: BaseConfiguration) {
    this.Configuration = Configuration
  }
  function PrepareCustomConfiguration() String {
      // Returns Serialized Customized Configuration
      SerializedConfiguration = JSON.Stringify(this.Configuration)
      return SerializedConfiguration
  }
  function PrepareHardwareConfiguration() String {
      // Returns Serialized Hardware Configuration
      SerializedConfiguration = JSON.Stringify(this.Configuration)
      return SerializedConfiguration
  }
}
