import $ from "jquery";
var BACKEND_APPLICATION_HOST = process.env.BACKEND_APPLICATION_HOST
var BACKEND_APPLICATION_PORT = process.env.BACKEND_APPLICATION_PORT

/* eslint-disable no-unused-vars */

var Url = require('url-parse');

function RemoveSshKeyRestController(SshKeyPath, VirtualMachineId) {
  // Rest Controller, that Removes SSH Key pair from the Virtual Machine Server
}

function UpdateSshKeyRestController(SshKeyPath, VirtualMachineId) {
  // Updates SSH Keys for the Customer's Virtual Machine Server
  return ApplySshSupportRestController()
}


function DownloadSshKeyRestController(SshKeyPath, VirtualMachineId) {
  // Downloads SSH Public Key File to the Customer's Desktop, if the Virtual Machine has One
}
