import * as ssh_rest from "../rest/ssh.js"


class VirtualMachineSshManager {
  // Manager Class, for managing the SSH of the Virtual Machine Server 
  GetSshCertificate(JwtToken, VirtualMachineId) {
    // Returns the SSH Certificate Content for the Virtual Machine Server 
    let CertificateContent, ContentError = ssh_rest.DownloadSshKeyRestController(
    JwtToken, VirtualMachineId)
    if (ContentError != null) {console.log("Failed to Download SSH Certificate," + ContentError.Error); return null, ''}
    return CertificateContent.CertificateContent, CertificateContent.CertificateFilename
  }
  UpdateSshCertificate(JwtToken, VirtualMachineId) {
    // Updates the SSH Certificate for the Virtual Machine Server 
    console.log(JwtToken, VirtualMachineId)
  }
}



export {VirtualMachineSshManager};