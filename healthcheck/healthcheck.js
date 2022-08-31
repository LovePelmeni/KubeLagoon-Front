import "../rest/healthcheck.js"

var DEFAULT_CRONTAB_JOB_TIMEZONE=process.env.DEFAULT_CRONTAB_JOB_TIMEZONE
var CrontabJob = require("cron").CronJob

class VirtualMachineHealthStateChecker {
  // Class, that parses info about the Health State of the whole Virtual Machine Server
  constructor(VirtualMachineId, CustomerId) {
    this.VirtualMachineId = VirtualMachineId
    this.CustomerId = CustomerId
    this.HealthComponentRefDictData = []
  }
  GetHealthMetrics = function() {
    // Returns Healtcheck State Metrics of the Virtual Machine
        JSONData, Errors = healthcheck.GetHealthCheckMetricsRestController(CustomerId, VirtualMachineId)
        DecodedData = JSON.Parse(JSONData)
        // Adding data to the Component
        Object.assign(this.HealthComponentRefDictData, DecodedData)
  }
  AddHealthChecker = function() {
    // Adds HealthChecker Crontab Job, that is going to parse VM Server Health Metrics
    // Every 5 seconds
    let NewHealthTask = new CrontabJob(
      "*******",
      function () {
        newMetric = healthcheck.GetHealthCheckMetricsRestController(this.VirtualMachineId)
        this.StorageClient.SaveMetric(newMetric)
      },
      null,
      true,
      DEFAULT_CRONTAB_JOB_TIMEZONE,
    )
    NewHealthTask.start()
  }
  RemoveHealthChecker = function(JobUniqueName){
    // Removes HealthChecker Crontab Job, once custom has left the page with the Virtual Machine Info
    JobStopped = HealthJobs[JobUniqueName].stop()
    return JobStopped
  }
}
