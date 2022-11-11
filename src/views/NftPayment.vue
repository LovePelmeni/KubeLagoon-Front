<script>
import * as crypto_blockchain_view from "../../crypto_support/deployer.js";
import { NftPaymentForm } from "../components/payments/NftPaymentForm.vue";
import  { mapMutations, mapState } from "vuex";


export default {
    components: { NftPaymentForm },
    data() {
        return {
            ActivatePaymentFailedBanner: false
        }
    },
    template: `
        <div class="nftPaymentFormView">
            <nft-payment-form />
            <v-snackbar v-if="ActivatePaymentFailedBanner" top color="red">
                Failed to Perform Transaction
            </v-snackbar>
        </div>
    `,
    name: "NftPaymentView",
    methods: {
        ...mapMutations([
            "TOGGLE_PAYMENT_PAID", 
            "TOGGLE_PAYMENT_UNPAID", 
            "GET_BILL_DATA", 
            "GET_CUSTOMER_DATA"
        ]),
        ProcessPaymentFailed() {
            // Processing Payment Failed via Crypto Contract 
            this.ActivatePaymentFailedBanner = true
        },
        ProcessPaymentSuccess() {
            // Processing Payment Succeess via Crypto Contract 
            this.$router.push({name: "success_page"})
        },
        PerformTransaction() {
            // Performing the Blockchain Transaction 

            // * Setting up Payment Session And Deploying the Contract
            let PaymentSessionCredentials = {}

            let Bill = this.GET_BILL_DATA()  // Getting the Bill Data 
            let customer = this.GET_CUSTOMER_DATA() // Getting the Customer Data 

            PaymentSessionCredentials.Servers = Bill.Metadata.Servers // Inserting the Servers to the Payment Session 
            PaymentSessionCredentials.Owner = customer // Inserting the Owner to the Payment Session 

            let BlockchainTransactionManager = new crypto_blockchain_view.DeploymentSmartContractManager(
                this, PaymentSessionCredentials // Payment Session Credentials 
            ) 
            BlockchainTransactionManager.DeploySmartContract()  // Deploying the Smart Contract 
        },
        SubmitForm() {
            // Submitting the Blockchain Transaction Form 
            this.PerformTransaction()
        },
    },
    computed: {
        ...mapState([
        "PaymentSucceeded", 
        "PaymentFailed"
        ]),
    },
    watch: {
        PaymentSucceeded: function() {
            // Checking for the Payment Succeeded Event 
            if (this.PaymentSucceeded === true) {
                this.ProcessPaymentSuccess() 
            }
        },
        PaymentFailed: function() {
            // Checking for the Payment Failed Event
            if (this.PaymentFailed === true) {
                this.ProcessPaymentFailed()
            }
        }
    }
}
</script>
