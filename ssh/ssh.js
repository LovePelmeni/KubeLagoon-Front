import "../rest/ssh.js"

class SshPublicKey {
  // Represents SSH Public Key of the Virtual Machine Server
  constructor(VirtualMachineSSHPublicKeyContent: String, VirtualMachineIpAddress: String) {
    this.VirtualMachineSSHPublicKeyContent = PublicKeyContent
    this.VirtualMachineIPAddress = VirtualMachineIPAddress
  }
  function ToObject() -> Object{
    return {"PublicKey": this.VirtualMachineSSHPublicKeyContent,
    "IP": this.VirtualMachineIPAddress}
  }
}

class VirtualMachineSshManager {
  // Represents Ssh Manager Tool, that Generates and Applies SSH to the Virtual Machine
  // Server, so Customer can access to it Using SSH
  constructor(VirtualMachineId: String, CustomerId: String) {
    this.VirtualMachineId = VirtualMachineId
    this.CustomerId = CustomerId
  }
  function GetSSHConnectionCommand(CertPath, RootUser, IPAddress) -> String {
    // Returns Prepared SSH Command to Perform SSH Connection
    // Is Going to be Used at `Inbuild SSH Console`
    return "ssh -i %s %s@%s" % (CertPath, RootUser, IPAddress)
  }
  function DownloadSshKey(SshKeyPath: String, VirtualMachineId: String) -> Object {
    // Downloads SSH Key onto the Customer's Computer so customer can use it by themselves
  }
  function RemoveSshKey(SshKeyPath: String, VirtualMachineId: String) -> Object {
    // Removes SSH Keys from the Virtual Machine by the Key Path
  }
  function UpdateSshKey(SshKeyPath: String, VirtualMachineId: String) -> Object {
    // Updates and Initializes New SSH Key for the Virtual Machine
    Updated = ssh.UpdateVirtualMachineSshKeyRestController(SshKeyPath, VirtualMachineId: String)
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
