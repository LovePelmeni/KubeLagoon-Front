import "../rest/healthcheck.js"
import {createClient} from "redis"

var BACKEND_APPLICATION_HOST=process.env.BACKEND_APPLICATION_HOST
var DEFAULT_CRONTAB_JOB_TIMEZONE=process.env.DEFAULT_CRONTAB_JOB_TIMEZONE

var CrontabJob = require("cron").CronJob

class VirtualMachineHealthStateChecker {
  // Class, that parses info about the Health State of the whole Virtual Machine Server
  constructor(VirtualMachineId: String, CustomerId: String) {
    this.VirtualMachineId = VirtualMachineId
    this.MetricCount = 0
    this.HealthComponentRefDictData = []
  }
  function GetHealthMetrics() -> HealthMetric {
    // Returns Healtcheck State Metrics of the Virtual Machine
        JSONData, Errors = healthcheck.GetHealthCheckMetricsRestController(CustomerId, VirtualMachineId)
        DecodedData = JSON.Parse(JSONData)
        // Adding data to the Component
        Object.assign(this.HealthComponentRefDictData, DecodedData)
  }
  function AddHealthChecker() -> bool {
    // Adds HealthChecker Crontab Job, that is going to parse VM Server Health Metrics
    // Every 5 seconds
    var NewHealthTask = new CrontabJob(
      "*******",
      function () {
        newMetric = healthcheck.GetHealthCheckMetricsRestController(this.VirtualMachineId)
        this.StorageClient.SaveMetric(newMetric)
      },
      null,
      true,
      DEFAULT_CRONTAB_JOB_TIMEZONE,
    )
  }
  function RemoveHealthChecker(JobUniqueName:  String) -> bool {
    // Removes HealthChecker Crontab Job, once custom has left the page with the Virtual Machine Info
    JobStopped = HealthJobs[JobUniqueName].stop()
    return JobStopped
  }
}
