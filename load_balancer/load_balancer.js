import * as lb from "../rest/load_balancer_rest.js"

class LoadBalancerInitParams {
  // Initialization Parameters for the Load Balancer
  constructor(VirtualMachineId) {
    this.VirtualMachineId = VirtualMachineId
  }
}

class LoadBalancerManager {
  // Interface represents Base Load Balancer Entity
  constructor(LoadBalancerInitParams) {
    this.LoadBalancerInitParams = LoadBalancerInitParams
  }
  Create = function() {
    // Creates New Load Balancer
    let LoadBalancerInfo, ResponseError = lb.CreateLoadBalancerRestController(
      this.LoadBalancerInitParams.VirtualMachineId
    )
    return LoadBalancerInfo, ResponseError
  }
  Recreate = function() {
    // Recreates Existing Load Balancer
    let LoadBalancerInfo, ResponseError = lb.RecreateLoadBalancerRestController(
      this.LoadBalancerInitParams.VirtualMachineId
    )
    return LoadBalancerInfo, ResponseError
  }
  Delete = function() {
    // Deletes the Existing Load Balancer
    let Deleted, ResponseError = lb.DeleteLoadBalancerRestController(
      this.LoadBalancerInitParams.VirtualMachineId
    )
    return Deleted, ResponseError
  }
}
