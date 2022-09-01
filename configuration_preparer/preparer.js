class BaseResource {
  // Represents Resource (part of the CustomizedConfiguration)
  // * Explanation ---
  // Customized Configuration consists of a bunch of parts such as
  // Configuration for the Network, Configuration for the OS,
  //  Configuration for the Cpu and Memory, etc....
  // So In order to make it as a puzzle and make it easy to serialize the whole CustomizedConfiguration
  // there is class called `Resource`, that basically represents the part of this CustomizedConfiguration
  // it can be: Network Resource, OsResource, etc.....
  static GetObject(){
    // Returfunctionns Part of the Configuration Class "Configuration for the Specific Resource"
  }
}

class BaseConfiguration {
  // Represents base Configuration Class, for both `Hardware Configuration` and
  // `Customized Configuration`, defines basic methods to make performance easier
  static GetConfiguration() {
    // Returns Full Configuration or Part of it
  }
}


class Metadata extends BaseResource {
  // Part of the `CustomizedConfiguration`.
  // Metadata, about who performs the Request
  // is going to be put inside the Configuration
  // so the backend would recognize what VM Server to apply configuration to
  constructor(VirtualMachineId, VmOwnerId) {
    super();
    this.VirtualMachineId = VirtualMachineId
    this.VirtualMachineOwnerId = VmOwnerId
  }
  GetObject = function() {
      // Retfunctionurns Metadata converted into Object
      return {"Metadata": {
      "VirtualMachineId": this.VirtualMachineId,
      "VmOwnerId": this.VirtualMachineOwnerId}}
  }
}
// Resources goes there

class Resources extends BaseResource {
  // Represents Cpu Configuration for the Virtual Machine Server
  constructor(MaxCpuUsage, CpuNum, MaxMemoryUsage, MemoryInMegabytes) {
    super();
    this.MaxCpuUsage = MaxCpuUsage
    this.CpuNum = CpuNum
    this.MaxMemory = MaxMemoryUsage
    this.MinMemory = MemoryInMegabytes
  }
  GetObject = function() {
    // Returfunctionns Resource Part of the CustomizedConfiguration, serialized into Object
    return {
    "Resources": {
        "MaxMemoryUsage": this.MaxMemory,
        "MemoryInMegabytes": this.Memory,
        "CpuNum": this.CpuNum,
        "MaxCpuUsage": this.MaxCpu,
    }}
  }
}

class SSlResources extends BaseResource {
  // SSL Management for the Virtual Machine, Provides ability to setup SSL Certificate
  // To Secure SSH Connection
  constructor(Type) {
    super();
    this.Type = Type
  }
  GetObject = function() {
    // Returfunctionns Serialized Object of the Ssh Parameters for the Virtual Machine Server
    return {"Ssh": {"Type": this.Type}}
  }
}

class DiskResources extends BaseResource {
  // Represents Disk Capacity Configuration for the Virtual Machine Server
  constructor(MemoryInKB) {
      super();
      this.MemoryInKB = MemoryInKB
  }
  GetObject = function(){
    return {"functionDisk": {"MemoryInKB": this.MemoryInKB}}
  }
}

class HostSystemResources extends BaseResource {
  // Represents Host System Configuration for the Virtual Machine Server
  constructor(SystemName, Bit) {
    super();
    this.SystemName = SystemName  // System Name should include OS Name + Distribution
    this.Bit = Bit // bit version of the OS, like 64 or 32
  }
  GetObject = function() {
    return {"HostSystem": {"SystemName": this.SystemName, "Bit": this.Bit}}
  }
}

class NetworkResources extends BaseResource {
  // Represents Network Configuration for the Virtual Machine Server
  constructor(
  NetworkIP=null,
  Hostname=null,
  Gateway=null,
  Netmask=null,
  Enablev6=true,
  ) {
    super();
    this.NetworkIP = NetworkIP
    this.Gateway = Gateway
    this.Netmask = Netmask
    this.Hostname = Hostname
    this.Enablev4 = true
    this.Enablev6 = Enablev6
  }

  GetObject = function() {
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
  constructor(Tools) {
    super();
    this.Tools = Tools
  }
  GetObject = function(){
    return {"Tools": {"ExtraTools": this.Tools}}
  }
}

class CustomConfiguration extends BaseConfiguration {
  // Class Represents Customized Configuration for the Virtual Machine Server
  // where the Customer can pick up, how much memory and cpu's they want,
  // What OS and Network to pick up etc...

  SetupConfiguration = function(MetadataConfig, ResourceConfig, NetworkConfig, HostSystemConfig, SslConfig, PreInstalledToolsConfig) {
    // Setting up the Configuration parts and putting them inside the array

    let Metadata = new Metadata(MetadataConfig["VirtualMachineId"], Metadata["VirtualMachineOwnerId"])
    let Resources = new Resources(ResourceConfig["MaxCpuUsage"], ResourceConfig["CpuUsage"],
    ResourceConfig["MaxMemoryUsage"], ResourceConfig["MemoryUsage"])

    let Network = new NetworkResources(NetworkConfig["NetworkIP"], NetworkConfig["Hostname"], NetworkConfig["Gateway"],
    NetworkConfig["Netmask"], NetworkConfig["Enablev6"])

    let HostSystem = new HostSystemResources(HostSystemConfig["SystemName"], HostSystemConfig["Bit"])
    let Ssl = new SslConfig(SslConfig["Type"])
    let PreInstalledTools = new PreInstalledToolsResources(PreInstalledToolsConfig["Tools"])

    let Configurations = [Metadata, Resources, Ssl, PreInstalledTools, Network, HostSystem]
    return Configurations
  }

  GetConfiguration = function(ConfigurationParts){
    //function Returns Serialized Custom Configuration for the Virtual Machine Server

    var FullCustomConfiguration = {}
    for (let Configuration in ConfigurationParts) {
      Object.assign(FullCustomConfiguration, Configuration.GetObject())
    }
    return FullCustomConfiguration
  }
}


class ConfigurationPreparer {
  // Class Returns Serialized Version of the Configurations
  constructor(Configuration) {
    super();
    this.Configuration = Configuration
  }
  PrepareCustomConfiguration = function(){
      // Returns Serialized Customized Configuration
      let SerializedConfiguration = JSON.stringify(this.Configuration)
      return SerializedConfiguration
  }
  PrepareHardwareConfiguration = function(){
      // Returns Serialized Hardware Configuration
      let SerializedConfiguration = JSON.stringify(this.Configuration)
      return SerializedConfiguration
  }
}
