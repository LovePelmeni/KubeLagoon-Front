import * as ssh_rest from "../rest/ssh.js"

let winston = require('winston')
let SshLogger = winston.createLogger({
  level: 'ERROR',
  format: winston.format.json(),
})

class VirtualMachineSshManager {
  // Manager Class, for managing the SSH of the Virtual Machine Server 
  GetSshCertificate(JwtToken, VirtualMachineId) {
    // Returns the SSH Certificate Content for the Virtual Machine Server 
    let CertificateContent, ContentError = ssh_rest.DownloadSshKeyRestController(
    JwtToken, VirtualMachineId)
    if (ContentError != null) {SshLogger.log("Failed to Download SSH Certificate," + ContentError.Error); return null, ''}
    return CertificateContent.CertificateContent, CertificateContent.CertificateFilename
  }
  UpdateSshCertificate(JwtToken, VirtualMachineId) {
    // Updates the SSH Certificate for the Virtual Machine Server 
    let Updated, UpdateError = ssh_rest.UpdateSshKeyRestController(
    JwtToken, VirtualMachineId)
    if (UpdateError != null) {SshLogger.log(
    "Failed to Update SSL Certificate for the Virtual Server with Identifier: " 
    + VirtualMachineId + " " + UpdateError)}
    return Updated, UpdateError
  }
}

export {VirtualMachineSshManager};