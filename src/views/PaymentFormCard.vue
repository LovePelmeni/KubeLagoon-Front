<template>

<div class="paymentCardForm">

</div>
    
</template>

<script>

export default {
    name: "PaymentFormCard", 
    data() {
        return {
            CustomerEmail: null, 
            CustomerPhoneNumber: null, 
            CreditCardNumber: null, 
        }
    },
    created() {
        this.InitializePaymentElement()
    },
    methods: {
        InitializePaymentElement() {
            // Initializing the Payment Stripe Form Elements, once the template is being 
            // rendered
        },
        PaymentRedirect() {
            // Processing Payment Operation Redirect
        },
        ProcessPaymentSession() {
            // Processing the Payment Session 
        },
        ConfirmPayment() {
            // Confirming the Payment
        }
    }
}
</script>
