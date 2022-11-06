pragma solidity ^ 0.8.8;

contract VirtualServerPaymentContract {
    /// @title Base Abstraction Class, implementing the Payment Contract for the Virtual Machine Server
    /// @author Klimushin Kirill (kirklimushin@gmail.com) 
    /// @notice Base Contract Class for Implementing Payments for Virtual Server Resource Usage

    address constant private ORGANIZATION_NFT_ADDRESS = "";
    VirtualMachineInformation private VirtualMachineInformation; 
    VirtualMachineOwnerInformation private VirtualMachineOwnerInformation;
    PaymentSessionInformation private PaymentSessionInformation;

    struct VirtualMachineServerOwnerInformation {
    /// @title Virtual Machine Server Owner Information Credentials 
    /// @author Klimushin Kirill (kirklimushin@gmail.com)
    /// @notice This Structure is being used for Identifying the Customer
    /// @dev All of the Attributes is native ones, and is being used from the Jwt-token, stored in the Browser at the Frontend Application

    string Username;  /// Customer's Username at the Application.
    string Email; /// Customer's Email.
    string PhoneNumber; /// Customer's Phone Number.
    address NftAddress; /// Customer's NFT Address, entered at the Frontend Application via Submittion Form;
    }

    struct VirtualMachineInformation {
    /// @title Virtual Machine General Information 
    /// @author Klimushin Kirill (kirklimushin@gmail.com)
    /// @notice This Structure is used at the Checkout for the Payment Transaction 
    string VirtualServerName; // Virtual Server Name 
    string VirtualServerType; // Virtual Server Type 
    string VirtualServerIpAddress; // Virtual Server IP Address 
    VirtualMachineServerOwnerInformation VirtualServerOwnerInfo; // Virtual Machine Server Owner's Information
    }

    struct PaymentSessionInformation {
        /// @title Payment Session Information 
        /// @author Klimushin Kirill (kirklimushin@gmail.com)
        /// @notice This Structure is being used for Identifying the Payment Session

        VirtualMachineInformation VirtualMachineInfo;
        int TotalAmount; // Total Amount in cents, for the whole Payments
        int CreatedAt; // Date at where the Payment has been Created
    }

    struct CheckoutInformation {
        /// @title Structure, implemening Checkout 
        /// @author Klimushin Kirill (kirklimushin@gmail.com)
        address Receiver; // Receivers' NFT Address 
        address Sender; // Sender's NFT Address 
        string PaymentId; // Payment Id 
        string CreatedAt; // Creation Date 
    }

    function SetPaymentSessionInformation(mapping (string => string) PaymentSession) private returns (bool);
        // Setting up the Payment Session Information Structure
    
    function SetVirtualMachineInformation(mapping(string => string)) private returns (bool);
        // Setting up the Virtual Machine Information Structure
    
    function SetVirtualMachineOwnerInformation(mapping(string => string)) private returns (bool);
        // Setting up the Virtual Machine Owner Information Structure

    function GetPaymentInformation() private returns (PaymentSessionInformation); 
    // Method for Getting / Receving Payment Information

    function CreatePayment() public returns (CheckoutInformation); 
    // Method for Creating Payment 
}


contract VirtualMachineServerSmartContractPayment is VirtualServerPaymentContract {
    /// @title Contract for making Payments for the Virtual Machine Server Resource Usage (Basic Subscription Payments)
    /// @author Klimushin Kirill (kirklimushin@gmail.com) 
    /// @notice Contract is implementing the Payment for the Virtual Server Subscription (Resources Usage)

    event PaymentApprovement (address _sender, uint _value); // event, that has been sended, once the payment has been approvement, and successfully executed
    event PaymentFailed (string _reason); // event, that has been sended, once the payment has been failed to perform 

    function IsPayableAccount(string CustomerAccount) private returns (bool) {
        // Checking if the Account Is Payable or not 
        if( CustomerAccount.send(0)) {
            return true;
        }
        return false;
    }

    function CreatePayment(address CustomerAccount) public returns (CheckoutInformation) {
        // Creates New Payment  
        if (CustomerAccount.balance >= this.PaymentSessionInformation["TotalAmount"] && this.IsPayableAccount(CustomerAccount)) {
            this.TransferETH(CustomerAccount); // tranfering money from the Customer's Account to the Organization NFT Wallet 
        }
    }

    function TransferETH(address CustomerAccount) private {
        // Transfering ETH from Smart Contract, to the Organization's Crypto Wallet 
        bool sended = this.ORGANIZATION_NFT_ADDRESS.send(this.PaymentSessionInformation["TotalAmount"]); // in WEI 
        if (sended) {
            emit PaymentApprovement(msg.sender, msg.value);
        }else{
            emit PaymentFailed(sended.msg);
        }
    }

    function GetPaymentInformation() private returns (PaymentSessionInformation) {
        // Returns the Information about the Payment in the JSON Format 
        return this.PaymentSessionInformation
    }
}

