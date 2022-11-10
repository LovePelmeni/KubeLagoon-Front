let ethers = require('ethers')
let jsonDecoder = require('fs')

const SmartContractFilePath = "./paymentSmartContract.sol";

class SmartContractPaymentSessionManager {
    // Defines the Payment Session Argument for the Smart Contract 
    constructor(PaymentSessionForm) {
        this.PaymentSessionForm = PaymentSessionForm 
    } 
    GetPaymentSessionData() {
        // Returns the JSON Data Structure, that is capable of with the Smart Contract Constructor Input 
    }
}
class SmartContractPurchaserManager {
    // Smart Contract Purchaser 
    constructor(SmartContractAddress) {
        this.SmartContractAddress = SmartContractAddress
        this.OrganizationNftAddress = process.env.ORGANIZATION_NFT_ADDRESS
    }
    async PurchaseSmartContract() {
        // Purchasing the Smart Contract, and approving the transaction state 
    }
}

class NftPaymentCheckoutInformation {
    // Class, represents Payment Checkout Information for the NFT Transactions 
    constructor(Sender, Receiver, Amount, CreatedAt) {
        this.Sender = Sender 
        this.Receiver = Receiver 
        this.Amount = Amount 
        this.CreatedAt = CreatedAt 
    }
    GetJsonInformation() {
        // Returns the Blob of JSON Structure 
        return {
            "Sender": this.Sender, 
            "Receiver": this.Receiver,
            "Amount": this.Amount, 
            "CreatedAt": this.CreatedAt
        }
    }
}

class SmartContractProviderManager {
    // Class, is used for picking up the Http Provider, based on the Customer Preference
    constructor(selectedProvider) {
        this.selectedProvider = selectedProvider
        this.CustomerNftAddress 
    }
    GetProvider() {
        // Returns the Appropriate Provider Based on the Customer Preference 
        // Raise the 
    }
    GetInfuraProvider() {
        // Returns the Infura Provider Abstraction for the Customer Wallet 
    }
}

class DeploymentSmartContractManager {
    // Management Class for Deploying Smart Contracts onto ethereum platform 
    constructor(self, SmartContractForm, SelectedProvider, SenderAddress) {
        this.self = self
        this.SmartContractForm = SmartContractForm  // Smart Contract Form 
        this.SenderAddress = SenderAddress // NFT Address of the Sender (Customer)
        this.OrganizationNftAddress = process.env.ORGANIZATION_NFT_ADDRESS // NFT Address of the Organization
        this.NftPaymentCheckoutInformation = {}; // Checkout Information
        this.SelectedProvider = SelectedProvider
    } 
    async TriggerSmartContractPurchaser() {
        // After the Customer's Smart Contract has been deployed, we need to purchase it 
        let PurchaserManager = new SmartContractPurchaserManager() 
        await PurchaserManager.PurchaseSmartContract() 
    }
    async GetSmartContractAbi() {
        // Returns the Binary output for the Smart Contract, converts the JSON Data to the Data, which 
        // will be valid for the Smart Contract to be processed 
        return jsonDecoder.readFileSync(SmartContractFilePath).toString()
    }
    async DeploySmartContract() {
        // Deploying the Smart Contract to the Network 

        let Provider = new SmartContractProviderManager(this.selectedProvider).GetInfuraProvider() // connecting to the provider network 
        let CustomerNftAddressWallet = new ethers.Wallet(this.SenderAddress, Provider) // Sender Address 
        let AbiBinaryData = await this.GetSmartContractAbi() // Receiving the Smart Contract ABI
        let ContractByteCode = await this.GetSmartContractByteCode() // Receving the Smart Contract Bytecode 

        let newSmartContract = new ethers.ContractFactory(AbiBinaryData, ContractByteCode, CustomerNftAddressWallet) // Constructing the Smart Contract 
        let InitialEtherBalance = new EtherBalanceManager().CalculateEtherBalance(this.SmartContractForm["Amount"])
        

        // Defining the Data for the Smart Contract, which directly goes to the Input Arguments 
        // * Checkout the Smart Contract's Schema at `./paymentSmartContract.sol` to get the point, what is going on there 
        let PaymentSessionData = new SmartContractPaymentSessionManager(this.SmartContractForm).GetPaymentSessionData()
        let VirtualMachineInformation = new SmartContractVirtualMachineManger(this.SmartContractForm).GetVirtualMachineData() 
        let VirtualMachineOwnerInformation = new SmartContractVirtualMachineOwnerManager(this.SmartContractForm).GetVirtualMachineOwnerData() 

        // Deploying the Smart Contract 
        await newSmartContract.deploy(
            PaymentSessionData,
            VirtualMachineInformation,
            VirtualMachineOwnerInformation, 
            {value: InitialEtherBalance}
        )

        await newSmartContract.deployed() // waiting, until it has been deployed

        async() => { /// Triggering Purchase of the Smart Contract, to transfer money to NFT Address of the Organization
            await this.TriggerSmartContractPurchaser() 
        }

        async() => {newSmartContract.on("paymentSucceeded", function(sender, event) {
            // Checking if the Smart Contract has been purchased successfully 
            if (sender.toLowerCase() === CustomerNftAddress.toLowerCase()) {
                // Marking the Payment as paid 
                this.self.TOGGLE_PAYMENT_STATUS_PAID()
                this.self.TOGGLE_PAYMENT_STATUS_UNPAID()
            }
        })}
        async() => {newSmartContract.on("paymentFailed", function(sender, event) {
            // Checking if the smart Contract has been Failed 
            if (sender.toLowerCase() === CustomerNftAddress.toLowerCase()) {
                // Marking the Payment as Failed
                this.self.TOGGLE_PAYMENT_STATUS_UNPAID()
                this.self.TOGGLE_PAYMENT_FAILED()
            }
        })}

    }
}

export { 
DeploymentSmartContractManager, 
SmartContractPurchaserManager, 
PaymentSessionSmartContractInformationManager, 
VirtualMachineServerSmartContractInformationManager,
CustomerInformationSmartContractInformationManager}