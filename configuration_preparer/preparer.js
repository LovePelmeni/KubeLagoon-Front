class CustomConfiguration {
  constructor() {

  }
  function GetConfiguration() String {
    // Returns Serialized Custom Configuration for the Virtual Machine Server
  }
}


class ConfigurationPreparer {

  function PrepareCustomConfiguration(Configuration: CustomConfiguration) String {
      // Returns Serialized Configuration
  }
  function PrepareHardwareConfiguration(Configuration: HardwareConfiguration) String {
      // Returns Serialized Hardware Configuration
  }
}
