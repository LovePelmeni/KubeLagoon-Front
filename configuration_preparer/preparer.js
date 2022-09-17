/* eslint-disable no-unused-vars */

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

class BaseConfigurationValidator {
  static ValidateInput(Configuration) {
    // Validates Input Configuration and Returns Error Strings
    // if the Value for the Field is not valid.
  }
}

class BaseConfiguration {
  // Represents base Configuration Class, for both `Hardware Configuration` and
  // `Customized Configuration`, defines basic methods to make performance easier
  static GetConfiguration() {
    // Returns Full Configuration or Part of it
  }
}


class HardwareConfigurationValidator extends BaseConfigurationValidator {
  // Validator for the hardware Configuration
  ValidateInput = function(Configuration) {
    // Validates Hardware Configuration, Customized by the Client
  }
}

class CustomizedConfigurationValidator extends BaseConfigurationValidator {
  ValidateInput = function(Configuration) {
    // Validates Customized Configuration by the Client
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
    // Returns Serialized Object of the Ssh Parameters for the Virtual Machine Server
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
    // Returns JSON Blob of the Configuration 
    return {"functionDisk": {"MemoryInKB": this.MemoryInKB}}
  }
}

class HostSystemResources extends BaseResource {
  // Represents Host System Configuration for the Virtual Machine Server
  constructor(SystemName, Version, Bit) {
    super();
    this.SystemName = SystemName  // System Name should include OS Name + Distribution
    this.Version = Version // Optional Argument is the Version of the OS, (if it has one)
    this.Bit = Bit // bit version of the OS, like 64 or 32
  }

  GetHostSystemName() {
    // Returns prepared OS System name, that is going to be properly recongnized at the backend
    return "%s_%s_%s" % this.SystemName, this.Version, this.Bit
  }
  GetObject = function() {
    // Returns JSON Blob of the Configuration 
    return {"HostSystem": {"SystemName": this.SystemName, "Bit": this.Bit}}
  }
}

class DatacenterResources extends BaseResource {
  constructor(DatacenterName) {
    super();
    this.DatacenterName = DatacenterName
  }
  GetObject() {
    // return json blob of the Configuration 
    return {"Datacenter": {"DatacenterName": this.DatacenterName}}
  }
}

class PreInstalledToolsResources extends BaseResource {
  // Represents Pre-Installed Tools Configuration for the Virtual Machine Server
  constructor(Tools) {
    super();
    this.Tools = Tools
  }
  GetObject = function(){
    // Returns JSON blob of the Configuration 
    return {"Tools": {"ExtraTools": this.Tools}}
  }
}


class HardwareConfiguration extends BaseConfiguration {
  // Class Represents Hardware Configuration for the Virtual Machine Server 
  constructor(Datacenter, OperationalSystem, Tools) {
    super();
    this.Datacenter = Datacenter
    this.OperationalSystem = OperationalSystem 
    this.Tools = Tools
  }
  SetupConfiguration() {
    // Merging the Whole Parts into one single Configuration 
    let Datacenter = new DatacenterResources(this.Datacenter).GetObject()
    let OperationalSystem = new HostSystemResources(this.OperationalSystem.SystemName, 
    this.OperationalSystem.Version, this.OperationalSystem.Bit).GetObject()
    let Tools = new PreInstalledToolsResources(this.Tools).GetObject()
    return {
     "Datacenter": Datacenter,
     "OperationalSystem": OperationalSystem,
     "Tools": Tools
    }
  }
}

class CustomConfiguration extends BaseConfiguration {

  // Class Represents Customized Configuration for the Virtual Machine Server
  // where the Customer can pick up, how much memory and cpu's they want,
  // What OS and Network to pick up etc...

  constructor(MetadataConfig, ResourceConfig, HostSystemConfig, SslConfig, Tools) {
    super();

    // Setting up the Configurations 
    this.MetadataConfig = MetadataConfig 
    this.ResourceConfig = ResourceConfig 
    this.HostSystemConfig = HostSystemConfig 
    this.SslConfig = SslConfig
    this.Tools = Tools
  }

  SetupConfiguration = function() {

    // Setting up the Configuration parts and putting them inside the array

    let Metadata = new Metadata(this.MetadataConfig["VirtualMachineId"], this.MetadataConfig["VirtualMachineOwnerId"]).GetObject()
    let Resources = new Resources(this.ResourceConfig["MaxCpuUsage"], this.ResourceConfig["CpuUsage"],
    this.ResourceConfig["MaxMemoryUsage"], this.ResourceConfig["MemoryUsage"]).GetObject()

    let Tools = new PreInstalledToolsResources(this.Tools).GetObject()

    // Setting up Configurations for the Other Hardware Parts 
    let HostSystem = new HostSystemResources(this.HostSystemConfig["SystemName"], this.HostSystemConfig["Bit"]).GetObject()
    let Ssl = new SSlResources(this.SslConfig["Type"]).GetObject()
    let PreInstalledTools = new PreInstalledToolsResources(this.PreInstalledToolsConfig["Tools"]).GetObject()

    let Configurations = [Metadata, Resources, Ssl, PreInstalledTools, HostSystem, Tools]
    return Configurations
  }

  GetConfiguration = function(ConfigurationParts){

    // function Returns Serialized Custom Configuration for the Virtual Machine Server

    var FullCustomConfiguration = {}
    for (let Configuration in ConfigurationParts) {
      Object.assign(FullCustomConfiguration, Configuration.GetObject())
    }
    return FullCustomConfiguration
  }
}

export {

  CustomConfiguration, 
  HardwareConfiguration, 
  
  DatacenterResources,
  DiskResources,
  SSlResources, 
  HostSystemResources, 
  Resources, // CPU, Memory etc...
  PreInstalledToolsResources, 
  Metadata,

}
