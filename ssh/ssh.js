import "../rest/ssh.js"

class SshPublicKey {
  // Represents SSH Public Key of the Virtual Machine Server
  constructor(VirtualMachineSSHPublicKeyContent: String, VirtualMachineIpAddress: String) {
    this.VirtualMachineSSHPublicKeyContent = PublicKeyContent
    this.VirtualMachineIPAddress = VirtualMachineIPAddress
  }
}

class SshManager {
  // Represents Ssh Manager Tool, that Generates and Applies SSH to the Virtual Machine
  // Server, so Customer can access to it Using SSH
  constructor(VirtualMachineId: String, CustomerId: String) {
    this.VirtualMachineId = VirtualMachineId
    this.CustomerId = CustomerId
  }
  function GetSSHConnectionCommand() {

  }
  function ApplySshSupport() -> Object {
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
