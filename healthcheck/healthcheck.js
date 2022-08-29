import "../rest/healthcheck.js"
import {createClient} from "redis"

var BACKEND_APPLICATION_HOST=process.env.BACKEND_APPLICATION_HOST
var DEFAULT_CRONTAB_JOB_TIMEZONE=process.env.DEFAULT_CRONTAB_JOB_TIMEZONE
var HEALTH_METRIC_STORAGE=process.env.HEALTH_METRIC_STORAGE_HOST
var HEALTH_METRIC_STORAGE_PORT=process.env.HEALTH_METRIC_STORAGE_PORT

var CrontabJob = require("cron").CronJob



class HealthMetricStorage {
  // healthMetric Storage based on the Redis Database
  // Is Being Used for storing Info about the healt metrics of the Virtual Machines
  constructor(Host: String, Port: String) {
    this.Host = Host // Host of the Storage
    this.Port = Port // Port of the Storage
  }
  function GetConnection() {
    // Returns Storage Connection Entity
    newClient = createClient({
      url: "redis://:%s@%s:%s/%s" % (HEALTH_METRIC_STORAGE_PASSWORD,
      HEALTH_METRIC_STORAGE_HOST, HEALTH_METRIC_STORAGE_PORT)
    })
    newClient.on("error", (error) => return null)
    return newClient
  }
  function SaveMetric() -> bool {
    // Saved Serialized Blob Of JSON Into the health Metric Storage
  }
}
class VirtualMachineHealthStateChecker {
  // Class, that parses info about the Health State of the whole Virtual Machine Server
  constructor(VirtualMachineId: String, CustomerId: String) {
    this.VirtualMachineId = VirtualMachineId
    this.MetricCount = 0
    this.StorageClient = new HealthMetricStorage
  }
  function GetHealthMetrics() -> HealthMetric {
    // Returns Healtcheck State Metrics of the Virtual Machine
        JSONData, Errors = healthcheck.GetHealthCheckMetricsRestController(CustomerId, VirtualMachineId)
        DecodedData = JSON.Parse(JSONData)
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
