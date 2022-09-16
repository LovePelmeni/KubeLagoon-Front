import "../rest/ssh.js"

/* eslint-disable no-unused-vars */

class SshPublicKey {
  // Represents SSH Public Key of the Virtual Machine Server
  constructor(VirtualMachineSSHPublicKeyContent, VirtualMachineIpAddress) {
    this.VirtualMachineSSHPublicKeyContent = VirtualMachineSSHPublicKeyContent
    this.VirtualMachineIPAddress = VirtualMachineIpAddress
  }
  ToObject = function(){
    return {
    "PublicKey": this.VirtualMachineSSHPublicKeyContent,
    "IP": this.VirtualMachineIPAddress}
  }
}

class VirtualMachineSshManager {
  // Represents Ssh Manager Tool, that Generates and Applies SSH to the Virtual Machine
  // Server, so Customer can access to it Using SSH
  GetSSHConnectionCommand = function(CertPath, RootUser, IPAddress) {
    // Returns Prepared SSH Command to Perform SSH Connection
    // Is Going to be Used at `Inbuild SSH Console`
    return "ssh -i %s %s@%s" % (CertPath, RootUser, IPAddress)
  }
  GetDownloadSshKey = function(Token, SshKeyPath, VirtualMachineId){
    // Downloads SSH Key onto the Customer's Computer so customer can use it by themselves
    SshKeyFileContent, ContentError = ssh_rest.DownloadSshKeyRestController(Token, SshKeyPath, VirtualMachineId)
    return SshKeyFileContent, ContentError
  }
}


export { VirtualMachineSshManager, SshPublicKey };
