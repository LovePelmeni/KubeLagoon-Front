<script>

import * as stripe from "stripe";
import PaymentBehaviourBanner from "../components/PaymentBehaviourBanner.vue";

class PaymentIntentControllerManager {
    // Cotnroller for Managing the Payment Intent Requests 
    constructor(PaymentInformation) {
        this.PaymentInformation = PaymentInformation
    }
    GeneratePaymentIntentCode() {
        // Generates payment Intent Random code, for payment request identification 
    }
    InitializePaymentRequest() {
        // Initializing Payment Request 
        newPayment = new stripe.PaymentRequest({
            country: this.PaymentInformation["country"],
            currency: this.PaymentInformation["currency"],
            total: {
                label: `payment_bill_${this.GeneratePaymentIntentCode()}`,
                amount: this.PaymentInformation["amount"]
            },
            requestPayerName: true,
            requestPayerEmail: true
        })
        newPayment.on('cancel', function(){
            this.self.paymentCanceled = true
        })
        newPayment.on('success', function() {
            this.self.paymentSucceeded = true
        })
        newPayment.on('failure', function() {
            this.self.paymentFailed = true
        })
    }
}

class PaymentMethodControllerManager {
    // Controller for Managing the Payment Session Requests 
}

class RefundControllerManager {
    // Controller for managing the Refund Requests
}

export default {
    name: "PaymentWindowView",
    template: `
    <template>
        <div class="paymentForm"> 
            <!-- Payment Window -->
        </div>
        <button class="btn btn-pay" @click="Pay">
        <payment-behaviour-banner v-if="paymentCanceled" :ReasonError="You Canceled the Payment, Want to repeat?" /> 
        <payment-behaviour-banner v-if="paymentFailed" :ReasonError="paymentError" /> 
    </template>
    `,
    components: {
        PaymentBehaviourBanner,
    },
    data() {
        return {
            paymentSucceeded: false,
            paymentCanceled: false, 
            paymentFailed: false,
            paymentError: '',
        }
    },
    methods: {
        Pay() {
            // Method is being called, once the Payment has been Initialized Successfully
        },
    },
}
</script>


<style lang="scss">

.paymentForm {
    background-color: #141414;
}

</style>
