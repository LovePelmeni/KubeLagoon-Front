// THIS MODULE CURRENTLY IS UNDER DEVELOPMENT AND IS NOT USED 



import "../rest/healthcheck.js"
/* eslint-disable no-unused-vars */

var DEFAULT_CRONTAB_JOB_TIMEZONE=process.env.DEFAULT_CRONTAB_JOB_TIMEZONE
var CrontabJob = require("cron").CronJob



class VirtualMachineHealthStateChecker {
  // Class, that parses info about the Health State of the whole Virtual Machine Server

  constructor(VirtualMachineId) {
    // Inputs the  ID of the Virtual Machine as an argument
    this.VirtualMachineId = VirtualMachineId
    this.HealthComponentRefDictData = []
  }
  GetHealthMetrics = function() {
    // Returns Healtcheck State Metrics of the Virtual Machine
    let JSONData, Errors = healthcheck.GetHealthCheckMetricsRestController(VirtualMachineId)
    let DecodedData = JSON.Parse(JSONData)
    if (Errors != null) {this.RemoveHealthChecker()}
    // Adding data to the Component
    Object.assign(this.HealthComponentRefDictData, DecodedData)
  }
  AddHealthChecker = function() {
    // Adds HealthChecker Crontab Job, that is going to parse VM Server Health Metrics
    // Every 5 seconds
    let date = new Date()
    let NewHealthTask = new CrontabJob(
    "%s-%s-vm-checker" % (date, this.VirtualMachineId),
    function () {
      let newMetric = healthcheck.GetHealthCheckMetricsRestController(this.VirtualMachineId)
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
    let JobStopped = HealthJobs[JobUniqueName].stop()
    return JobStopped
  }
}

export {VirtualMachineHealthStateChecker};
