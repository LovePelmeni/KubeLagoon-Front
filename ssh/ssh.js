import "../rest/ssh.js"

/* eslint-disable no-unused-vars */

class SshPublicKey {
  // Represents SSH Public Key of the Virtual Machine Server
  constructor(VirtualMachineSSHPublicKeyContent, VirtualMachineIpAddress) {
    this.VirtualMachineSSHPublicKeyContent = VirtualMachineSSHPublicKeyContent
    this.VirtualMachineIPAddress = VirtualMachineIpAddress
  }
  ToObject = function(){
    return {"PublicKey": this.VirtualMachineSSHPublicKeyContent,
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
  DownloadSshKey = function(SshKeyPath, VirtualMachineId){
    // Downloads SSH Key onto the Customer's Computer so customer can use it by themselves
  }
  RemoveSshKey = function(SshKeyPath, VirtualMachineId){
    // Removes SSH Keys from the Virtual Machine by the Key Path
  }
  UpdateSshKey = function(SshKeyPath, VirtualMachineId){
    // Updates and Initializes New SSH Key for the Virtual Machine
    Updated = ssh.UpdateVirtualMachineSshKeyRestController(SshKeyPath, VirtualMachineId)
  }
  ApplySshSupport = function(){
    // Applies SSH Support to the Customer's VM Server and returns back SSH Public Key
    // So User can easily connect to it
    var SshPublicKey
    Generated, JSONSshPublicKey = ssh.ApplySshSupportRestController(
    this.VirtualMachineId, this.CustomerId)
    if (Generated == true && len(SshPublicKey) != 0) {
      SshPublicKey = JSON.Parse(JSONSshPublicKey)
      return SshPublicKey
    }else{
      return null
    }
  }
}


export { VirtualMachineSshManager, SshPublicKey };
