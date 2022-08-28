class HealthMetric {
  constructor(HealthMetric: String) {
      this.HealthMetric = HealthMetric
  }
  function Deserialize() -> {} {
    // Returns Deserialized Metric of the Health State
  }
}
class VirtualMachineHealthStateChecker {
  // Class, that parses info about the Health State of the whole Virtual Machine Server
  constructor(VirtualMachineId: String, CustomerId: String) {
    this.VirtualMachineId = VirtualMachineId
    this.CustomerId = CustomerId
  }
  function GetHealthMetrics() -> HealthMetric {
    // Returns Healtcheck State Metrics of the Virtual Machine
  }
  function AddHealthChecker() -> bool {
    // Adds HealthChecker Crontab Job, that is going to parse VM Server Health Metrics
    // Every 5 seconds
  }
  function RemoveHealthChecker(JobId: String) -> bool{
    // Removes HealthChecker Crontab Job, once custom has left the page with the Virtual Machine Info
  }
}
