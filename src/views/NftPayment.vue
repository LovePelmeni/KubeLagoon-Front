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
        <nft-payment-form />
        <v-show></v-show>
    `,
    name: "NftPaymentView",
    methods: {
        ...mapMutations(["TOGGLE_PAYMENT_PAID", "TOGGLE_PAYMENT_UNPAID"]),
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
            PaymentSessionCredentials.Servers = Bill.Metadata.Servers 
            PaymentSessionCredentials.Owner = customer

            let BlockchainTransactionManager = new crypto_blockchain_view.DeploymentSmartContractManager(
                this, PaymentSessionCredentials
            ) 
            BlockchainTransactionManager.DeploySmartContract() 
        },
        SubmitForm() {
            // Submitting the Blockchain Transaction Form 
            this.PerformTransaction()
        },
    },
    computed: {
    ...mapState([
        "customer", 
        "Bill", 
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
