<template>

   <div class="nftPaymentFormBlock">
       <!-- Nft Payment Form Elements Goes There -->
        <v-card-text style="background-color: #1e2139; border-radius: 10px;">

        <v-icon style="color: green;">mdi-bitcoin</v-icon> 
        <label style="color: #fff; max-width: 60%; margin-top: 10px; margin-bottom: 20px; font-size: 1rem;" v-if="VirtualMachine?.Running === true">
        NFT Payment Support! Now you can pay for all of your KubeLagoon's Products, using NFT Crypto Wallet
        </label>

        <v-form class="nftPaymentForm">
            <!-- NFT Payment Form with Only Single Field `NFT Address`, which is the analogy for the Credit Card Number -->
            <v-text-field class="nftTextFormField" label="NFT Address" placeholder="NFT Address" />

            <div class="checkoutInformationBlock">
                <v-text-field class="nftTextFormField" disabled label="Total Amount" placeholder="Total Amount">{{ Checkout.TotalAmount }}$<v-text-field>
                <v-text-field class="nftTextFormField" disabled label="Total Items" placeholder="Total Items">{{ function(){return Checkout.Servers.length()}() }}<v-text-field>
            </div>

            <div class="checkoutItems" style="justify-content: space-between; display: flex;">
                <checkout-item-info :Show="false" :ServerInfo="Server"
                v-for="(Server, index) in Checkout.Servers" :key="index"/>
            <div>

        </v-form>
        <div class="apiButtons">

        <button @click="SubmitNftForm()" class="btn btn-upload-certificate" style="margin-top: 20px; margin-left: 30px; color: #fff; !important" v-if="VirtualMachine.Running === true">
        <label style="color: #fff !important; margin-bottom: 1px !important;">Pay</label>
        </button>

        </div>

        <server-error-banner :ReasonError="NftPaymentError" :v-show="NftPaymentFailed" />

        </v-card-text>
        
   </div>

</template>


<script>

import CheckoutItemInfo from './CheckoutItemInfo.vue';
import ServerErrorBanner from "../ServerErrorBanner.vue";

export default {
  components: { CheckoutItemInfo },
    name: "NftPaymentForm",
    props: ["ChechkoutInformation"],
    data() {
        return {
            NftPaymentFailed: false, 
            NftPaymentError: null,
        }
    },
    components: {
        ServerErrorBanner,
    },
    mounted() {
        this.FilloutCheckoutData()
    },
    methods: {
        FilloutCheckoutData() {
            // FIlling out the Checkout Data into the Form 
            for (let PropertyKey in Object.keys(this.ChechkoutInformation)) {
                this.$data[PropertyKey] = this.ChechkoutInformation[PropertyKey]
            }
        },
        SubmitNftForm() {
            // Submitting the Nft Form and Sending the Smart Contract 
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
