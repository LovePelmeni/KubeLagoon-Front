<template>

   <div class="nftPaymentFormBlock">
       <!-- Nft Payment Form Elements Goes There -->

        <v-card-text style="background-color: #1e2139; border-radius: 10px;">
        <v-icon style="color: green;">mdi-bitcoin</v-icon> 
        <label style="color: #fff; max-width: 60%; margin-top: 10px; margin-bottom: 20px; font-size: 1rem;">
        NFT Payment Support! Now you can pay for all of your KubeLagoon's Products, using NFT Crypto Wallet
        </label>

        <v-form class="nftPaymentForm">
            <!-- NFT Payment Form with Only Single Field `NFT Address`, which is the analogy for the Credit Card Number -->
            <v-text-field class="nftTextFormField" label="NFT Address" placeholder="NFT Address" />

            <div class="checkoutInformationBlock">
                <v-text-field class="nftTextFormField" disabled label="Total Amount" placeholder="Total Amount">
                <!-- Calculating Total Contract Cost -->
                {{ function(){
                let totalAmount = 0;
                for (let Server in Bill.Metadata.Servers) {
                    totalAmount += Server.TotalUsageCost;
                }
                return totalAmount
                }() }}$</v-text-field>
                <v-text-field class="nftTextFormField" disabled label="Total Items" placeholder="Total Items">{{ function(){return Bill.Metadata.Servers.length()}() }}</v-text-field>
            </div>

            <div class="checkoutItems" style="justify-content: space-between; display: flex;">
                <checkout-item-info :Show="false" :ServerInfo="Server"
                v-for="(Server, index) in Checkout.Metadata.Servers" :key="index"/>
            </div>

        </v-form>
        <div class="apiButtons">

        <v-btn @click="SubmitNftForm()" class="btn btn-upload-certificate" style="margin-top: 20px; margin-left: 30px; color: #fff; !important">
            <label style="color: #fff !important; margin-bottom: 1px !important;">Pay</label>
        </v-btn>

        </div>

        <server-error-banner :ReasonError="NftPaymentError" :v-show="NftPaymentFailed" />
        </v-card-text>
        
   </div>

</template>

<script>

import { mapState, mapMutations } from "vuex";

import CheckoutItemInfo from './CheckoutItemInfo.vue';
import ServerErrorBanner from "../ServerErrorBanner.vue";

export default {
    name: "NftPaymentForm",
    data() {
        return {
            NftPaymentFailed: false, 
            NftPaymentError: null,
            TransactionStatus: "",
        }
    },
    components: {
        ServerErrorBanner,
        CheckoutItemInfo,
    },
    methods: {
        ...mapMutations(["TOGGLE_PAYMENT_STATUS_UNPAID", "TOGGLE_PAYMENT_STATUS_PAID"]),
        SubmitNftForm() {
            // Submitting the Nft Form and Sending the Smart Contract 
        },
        CancelNftForm() {
            // Canceling the Transaction using NFT (only works while the transaction is not pending)
            this.$router.push({name: "cancel_page"})
        }
    },
    computed: {
        ...mapState(["Bill", "PaymentSucceeded"]),
    },
    watch: {
        PaymentSucceeded: function() { // Checking when the data is being changed after the 
            if (this.$state.PaymentSucceeded === true) {
                this.$router.push({name: "success_page"})
                async() => {
                    this.TOGGLE_PAYMENT_STATUS_UNPAID()
                }
            }
        }
    }
}

</script>


<style lang="scss">

.nftCheckoutForm {
    // NFT Form styles
    background-color: #111;
}

.nftTextFormField {
    // Nft Filling Field
    border-radius: 8px 8px 8px 8px;
    opacity: 1;
    background-color: #1e2238;
}
</style>
