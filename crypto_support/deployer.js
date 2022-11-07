
class AbstractSmartContractInformationManager {
    // Management Class, for filling in the Smart Contract Structures with the Information 
    GetDataStructure() {
        // Method, which returns the appropriate formatted piece of the smart contract, that can be potentially 
        // used for it's initialization 
    }
}

class CustomerInformationSmartContractInformationManager extends AbstractSmartContractInformationManager {
    // Management Class, for filling in the Payment Session General Structure 

    GetDataStructure(FormData) {
        // Returns the JSON-Based Blob of Data, combined, based on the form
    }
}

class VirtualMachineServerSmartContractInformationManager extends AbstractSmartContractInformationManager {
    // Management Class, for filling in the Virtual Server Information General Structure

    GetDataStructure(FormData) {
        // Returns the JSON-Based Blob of Data, combined, based on the form 
    }
}

class PaymentSessionSmartContractInformationManager extends AbstractSmartContractInformationManager {
    // Management Class, for filling in the Payment Session General Structure 

    GetDataStructure(FormData) {
        // Returns the JSON-Based Blob of Data, combined, based on the form 
    }
}

class SmartContractPurchaserManager {
    // Smart Contract Purchaser 
    constructor(SmartContractAddress) {
        this.SmartContractAddress = SmartContractAddress
        this.OrganizationNftAddress = process.env.ORGANIZATION_NFT_ADDRESS
    }
    PurchaseSmartContract() {
        // Purchasing the Smart Contract, and approving the transaction state 
    }
}

class DeploymentSmartContractManager {
    // Management Class for Deploying Smart Contracts onto ethereum platform 
    constructor(SmartContractForm, SenderAddress) {
        this.SmartContractForm = SmartContractForm  // Smart Contract Form 
        this.SenderAddress = SenderAddress // NFT Address of the Sender (Customer)
    } 
    DeploySmartContract() {
    }
}