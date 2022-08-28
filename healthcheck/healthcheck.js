import "../rest/healthcheck.js"

class VirtualMachineHealthStateChecker {
  // Class, that parses info about the Health State of the whole Virtual Machine Server
  constructor(VirtualMachineId: String, CustomerId: String) {
    this.VirtualMachineId = VirtualMachineId
    this.CustomerId = CustomerId
  }
  function GetHealthMetrics() -> HealthMetric {
    // Returns Healtcheck State Metrics of the Virtual Machine
        JSONData, Errors = healthcheck.GetHealthCheckMetricsRestController(CustomerId, VirtualMachineId)
        DecodedData = JSON.Parse(JSONData)
  }
  function AddHealthChecker() -> bool {
    // Adds HealthChecker Crontab Job, that is going to parse VM Server Health Metrics
    // Every 5 seconds
  }
  function RemoveHealthChecker(JobId: String) -> bool{
    // Removes HealthChecker Crontab Job, once custom has left the page with the Virtual Machine Info
  }
}
