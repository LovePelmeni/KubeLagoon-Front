<template>
    
</template>

<script>

class PaymentIntentManager {
    // Class, for managing the Payment Intent Request 
    constructor(SessionId) {
        this.SessionId = SessionId
    }
    CreatePaymentIntent() {
        // Creating the Payment Intent, Based on the Checkout Information
    }
}

class PaymentSessionManager {
    // Class, for managing the Payment Session Request
    constructor(CheckoutInformation) {
        this.CheckoutInformation = CheckoutInformation
    }
    CreatePaymentSession() {
        // Creating the Payment Session, Based on the Checkout Information
    }
}

export default {
    name: "paymentForm",
    props: [
        "RecoverSession",
    ],
    computed: {
        ...mapState(["PaymentState"]),
    },
    mounted() {
        if (this.$props.RecoverSession === true) {
            for (let Property in Object.keys(this.PaymentState)) {
                this.$data[Property] = this.PaymentState[Property]
            }
        }
    },
    methods: {
        ProcessPaymentRequest() {
            // Processing the Payment Request
            // * Creating the Payment Session 
            // * After that, creating the Payment Intent Request, and making an approvement 
            // * Waiting for the Callack
        }
    }
}
</script>

<style lang="scss">

</style>
