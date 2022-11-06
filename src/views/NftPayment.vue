<template>
    <nft-payment-form :CheckoutInformation="Checkout">
</template>

<script>

import { NftPaymentForm } from "../components/payments/NftPaymentForm.vue";

import  { mapState } from "vuex";

export default {
    components: {
        NftPaymentForm
    },
    name: "NftPaymentView",
    computed: {
        ...mapState(["Checkout"]),
    }
}

</script>
