<template>

    <div class="paymentCheckBlock">
        <checkout-form-items :Items="Bill.Metadata.Server" />
    </div>
    <div class="paymentButtonRedirect">
        <v-btn class="btn payment-redirect-btn" 
        style="color: #fff; border-radius: 10px 10xp 10px 10px">Back to Payment</v-btn>
    </div>
    
</template>

<script>

import CheckoutFormItems from "@/components/payments/CheckoutFormItems.vue";
import { mapState } from "vuex";

export default {
    components: { CheckoutFormItems },
    name: "PaymentCheckView",
    methods: {
        RedirectToPaymentPage() {
            // Redirects to the Payment Page 
            this.$router.push({name: "payment_page"})
        }
    },
    computed: {
        ...mapState(["Bill"]),
    }
}

</script>

<style lang="scss">
.paymentCheckBlock {
    background-color: rgba(60, 6, 54, 0.6);
}
</style>
